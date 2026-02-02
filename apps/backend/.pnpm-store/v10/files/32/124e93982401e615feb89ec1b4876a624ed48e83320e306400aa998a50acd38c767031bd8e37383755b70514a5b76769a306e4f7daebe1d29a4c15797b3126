import Macroable from "@poppinss/macroable";
import { debuglog, inspect } from "node:util";
import string from "@poppinss/string";
import stringWidth from "string-width";
import Hooks from "@poppinss/hooks";
import retry from "async-retry";
import Emittery from "emittery";
var debug_default = debuglog("japa:core");
function convertHrtime(hrtime) {
	const nanoseconds = hrtime;
	const number = Number(nanoseconds);
	const milliseconds = number / 1e6;
	return {
		seconds: number / 1e9,
		milliseconds,
		nanoseconds
	};
}
function timeSpan() {
	const start = process.hrtime.bigint();
	const end = (type) => convertHrtime(process.hrtime.bigint() - start)[type];
	const returnValue = () => end("milliseconds");
	returnValue.rounded = () => Math.round(end("milliseconds"));
	returnValue.seconds = () => end("seconds");
	returnValue.nanoseconds = () => end("nanoseconds");
	return returnValue;
}
var Tracker = class {
	#timeTracker;
	#currentSuite;
	#currentGroup;
	#hasError = false;
	#aggregates = {
		total: 0,
		failed: 0,
		passed: 0,
		regression: 0,
		skipped: 0,
		todo: 0
	};
	#duration = 0;
	#failureTree = [];
	#failedTestsTitles = [];
	#onSuiteStart(payload) {
		this.#currentSuite = {
			name: payload.name,
			type: "suite",
			errors: [],
			children: []
		};
	}
	#onSuiteEnd(payload) {
		if (payload.hasError) {
			this.#currentSuite.errors = payload.errors;
			this.#failureTree.push(this.#currentSuite);
		}
	}
	#onGroupStart(payload) {
		this.#currentGroup = {
			name: payload.title,
			type: "group",
			errors: [],
			children: []
		};
	}
	#onGroupEnd(payload) {
		if (payload.hasError) {
			this.#currentGroup.errors = payload.errors;
			this.#currentSuite.children.push(this.#currentGroup);
		}
	}
	#onTestEnd(payload) {
		this.#aggregates.total++;
		if (payload.isSkipped) {
			this.#aggregates.skipped++;
			return;
		}
		if (payload.isTodo) {
			this.#aggregates.todo++;
			return;
		}
		if (!payload.hasError) {
			if (payload.isFailing) this.#aggregates.regression++;
			else this.#aggregates.passed++;
			return;
		}
		this.#markTestAsFailed(payload);
	}
	#markTestAsFailed(payload) {
		this.#aggregates.failed++;
		const testPayload = {
			type: "test",
			title: payload.title.expanded,
			errors: payload.errors
		};
		if (this.#currentGroup) this.#currentGroup.children.push(testPayload);
		else if (this.#currentSuite) this.#currentSuite.children.push(testPayload);
		this.#failedTestsTitles.push(payload.title.original);
	}
	processEvent(event, payload) {
		switch (event) {
			case "suite:start":
				this.#onSuiteStart(payload);
				break;
			case "suite:end":
				this.#onSuiteEnd(payload);
				break;
			case "group:start":
				this.#onGroupStart(payload);
				break;
			case "group:end":
				this.#onGroupEnd(payload);
				break;
			case "test:end":
				this.#onTestEnd(payload);
				break;
			case "runner:start":
				this.#timeTracker = timeSpan();
				break;
			case "runner:end":
				this.#hasError = payload.hasError;
				this.#duration = this.#timeTracker?.rounded() ?? 0;
				break;
		}
	}
	getSummary() {
		return {
			aggregates: this.#aggregates,
			hasError: this.#hasError,
			duration: this.#duration,
			failureTree: this.#failureTree,
			failedTestsTitles: this.#failedTestsTitles
		};
	}
};
var SummaryBuilder = class {
	#reporters = [];
	use(reporter) {
		this.#reporters.push(reporter);
		return this;
	}
	build() {
		const keys = [];
		const keysLengths = [];
		const values = [];
		this.#reporters.forEach((reporter) => {
			reporter().forEach((report) => {
				keys.push(report.key);
				values.push(Array.isArray(report.value) ? report.value : [report.value]);
				keysLengths.push(stringWidth(report.key));
			});
		});
		const largestKey = Math.max(...keysLengths);
		return string.justify(keys, {
			width: largestKey,
			align: "right",
			indent: " ",
			getLength: (chunk) => stringWidth(chunk)
		}).map((key, index) => {
			return `${key}${values[index].map((line, i) => {
				return i === 0 ? `  ${line}` : `${" ".repeat(largestKey)}  ${line}`;
			}).join("\n")}`;
		});
	}
};
var GroupRunner = class {
	#options;
	#group;
	#emitter;
	#setupRunner;
	#teardownRunner;
	#errors = [];
	#hasError = false;
	get failed() {
		return this.#hasError;
	}
	constructor(group, hooks, emitter, options) {
		this.#group = group;
		this.#emitter = emitter;
		this.#options = options;
		this.#setupRunner = hooks.runner("setup");
		this.#teardownRunner = hooks.runner("teardown");
	}
	#notifyStart() {
		const startOptions = { ...this.#group.options };
		this.#emitter.emit("group:start", startOptions);
	}
	#notifyEnd() {
		const endOptions = {
			...this.#group.options,
			hasError: this.#hasError,
			errors: this.#errors
		};
		this.#emitter.emit("group:end", endOptions);
	}
	async #runSetupHooks() {
		try {
			debug_default("running \"%s\" group setup hooks", this.#group.title);
			await this.#setupRunner.run(this.#group);
		} catch (error) {
			debug_default("group setup hooks failed, group: %s, error: %O", this.#group.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "setup",
				error
			});
		}
	}
	async #runTeardownHooks() {
		try {
			debug_default("running \"%s\" group teardown hooks", this.#group.title);
			await this.#teardownRunner.run(this.#group);
		} catch (error) {
			debug_default("group teardown hooks failed, group: %s, error: %O", this.#group.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "teardown",
				error
			});
		}
	}
	async #runSetupCleanupFunctions() {
		try {
			debug_default("running \"%s\" group setup cleanup functions", this.#group.title);
			await this.#setupRunner.cleanup(this.#hasError, this.#group);
		} catch (error) {
			debug_default("group setup cleanup function failed, group: %s, error: %O", this.#group.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "setup:cleanup",
				error
			});
		}
	}
	async #runTeardownCleanupFunctions() {
		try {
			debug_default("running \"%s\" group teardown cleanup functions", this.#group.title);
			await this.#teardownRunner.cleanup(this.#hasError, this.#group);
		} catch (error) {
			debug_default("group teardown cleanup function failed, group: %s, error: %O", this.#group.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "teardown:cleanup",
				error
			});
		}
	}
	async run() {
		debug_default("starting to run \"%s\" group", this.#group.title);
		this.#notifyStart();
		await this.#runSetupHooks();
		if (this.#hasError) {
			await this.#runSetupCleanupFunctions();
			this.#notifyEnd();
			return;
		}
		for (let test of this.#group.tests) {
			if (this.#options.bail && this.#hasError) test.skip(true, "Skipped due to bail mode");
			await test.exec();
			if (!this.#hasError && test.failed) this.#hasError = true;
		}
		await this.#runSetupCleanupFunctions();
		await this.#runTeardownHooks();
		await this.#runTeardownCleanupFunctions();
		this.#notifyEnd();
	}
};
var Group = class extends Macroable {
	#emitter;
	#refiner;
	#failed = false;
	#bail;
	#hooks = new Hooks();
	#tapsCallbacks = [];
	#testsTimeout;
	#testsRetries;
	#testSetupHooks = [];
	#testTeardownHooks = [];
	#testsSkip;
	get failed() {
		return this.#failed;
	}
	options;
	tests = [];
	each = {
		setup: (handler) => {
			this.#testSetupHooks.push(handler);
		},
		teardown: (handler) => {
			this.#testTeardownHooks.push(handler);
		},
		timeout: (timeout) => {
			this.#testsTimeout = timeout;
		},
		disableTimeout: () => {
			this.#testsTimeout = 0;
		},
		retry: (retries) => {
			this.#testsRetries = retries;
		},
		skip: (skip, skipReason) => {
			this.#testsSkip = {
				skip: skip ?? true,
				skipReason
			};
		}
	};
	constructor(title, emitter, refiner) {
		super();
		this.title = title;
		this.#emitter = emitter;
		this.#refiner = refiner;
		this.options = {
			title: this.title,
			meta: {}
		};
	}
	bail(toggle = true) {
		if (this.#bail === void 0) this.#bail = toggle;
		return this;
	}
	add(test) {
		debug_default("adding \"%s\" test to \"%s\" group", test.title, this.title);
		if (this.#testsTimeout !== void 0) test.timeout(this.#testsTimeout);
		if (this.#testsRetries !== void 0) test.retry(this.#testsRetries);
		if (this.#testSetupHooks.length) this.#testSetupHooks.forEach((handler) => test.setup(handler));
		if (this.#testTeardownHooks.length) this.#testTeardownHooks.forEach((handler) => test.teardown(handler));
		if (this.#testsSkip) test.skip(this.#testsSkip.skip, this.#testsSkip.skipReason);
		this.#tapsCallbacks.forEach((callback) => callback(test));
		this.tests.push(test);
		return this;
	}
	tap(callback) {
		this.tests.forEach((test) => callback(test));
		this.#tapsCallbacks.push(callback);
		return this;
	}
	setup(handler) {
		debug_default("registering \"%s\" group setup hook %s", this.title, handler);
		this.#hooks.add("setup", handler);
		return this;
	}
	teardown(handler) {
		debug_default("registering \"%s\" group teardown hook %s", this.title, handler);
		this.#hooks.add("teardown", handler);
		return this;
	}
	async exec() {
		if (!this.#refiner.allows(this)) {
			debug_default("group skipped by refined %s", this.title);
			return;
		}
		const runner = new GroupRunner(this, this.#hooks, this.#emitter, { bail: this.#bail ?? false });
		await runner.run();
		this.#failed = runner.failed;
	}
};
var Runner = class extends Macroable {
	#emitter;
	#failed = false;
	#bail = false;
	#configureSuiteCallbacks = [];
	#tracker;
	summaryBuilder = new SummaryBuilder();
	suites = [];
	reporters = /* @__PURE__ */ new Set();
	constructor(emitter) {
		super();
		this.#emitter = emitter;
	}
	#notifyStart() {
		return this.#emitter.emit("runner:start", {});
	}
	#notifyEnd() {
		return this.#emitter.emit("runner:end", { hasError: this.#failed });
	}
	#boot() {
		this.#tracker = new Tracker();
		this.#emitter.on("runner:start", (payload) => this.#tracker?.processEvent("runner:start", payload));
		this.#emitter.on("runner:end", (payload) => this.#tracker?.processEvent("runner:end", payload));
		this.#emitter.on("suite:start", (payload) => this.#tracker?.processEvent("suite:start", payload));
		this.#emitter.on("suite:end", (payload) => this.#tracker?.processEvent("suite:end", payload));
		this.#emitter.on("group:start", (payload) => this.#tracker?.processEvent("group:start", payload));
		this.#emitter.on("group:end", (payload) => this.#tracker?.processEvent("group:end", payload));
		this.#emitter.on("test:start", (payload) => this.#tracker?.processEvent("test:start", payload));
		this.#emitter.on("test:end", (payload) => this.#tracker?.processEvent("test:end", payload));
	}
	get failed() {
		return this.#failed;
	}
	add(suite) {
		this.#configureSuiteCallbacks.forEach((callback) => callback(suite));
		this.suites.push(suite);
		debug_default("registering suite %s", suite.name);
		return this;
	}
	onSuite(callback) {
		this.suites.forEach((suite) => callback(suite));
		this.#configureSuiteCallbacks.push(callback);
		return this;
	}
	bail(toggle = true) {
		this.#bail = toggle;
		this.onSuite((suite) => suite.bail(toggle));
		return this;
	}
	registerReporter(reporter) {
		this.reporters.add(reporter);
		return this;
	}
	getSummary() {
		return this.#tracker.getSummary();
	}
	async start() {
		this.#boot();
		debug_default("starting to run tests");
		for (let reporter of this.reporters) if (typeof reporter === "function") await reporter(this, this.#emitter);
		else await reporter.handler(this, this.#emitter);
		await this.#notifyStart();
	}
	async exec() {
		for (let suite of this.suites) {
			if (this.#bail && this.#failed) suite.stack.forEach((groupOrTest) => {
				if (groupOrTest instanceof Group) groupOrTest.tap((t) => t.skip(true, "Skipped due to bail mode"));
				else groupOrTest.skip(true, "Skipped due to bail mode");
			});
			await suite.exec();
			if (!this.#failed && suite.failed) this.#failed = true;
		}
	}
	async end() {
		await this.#notifyEnd();
	}
};
function parseProp(data, key) {
	const tokens = key.split(".");
	while (tokens.length) {
		if (data === null || typeof data !== "object") return;
		const token = tokens.shift();
		data = Object.hasOwn(data, token) ? data[token] : void 0;
	}
	return data;
}
function interpolate(input, data, index) {
	return input.replace(/(\\)?{(.*?)}/g, (_, escapeChar, key) => {
		if (escapeChar) return `{${key}}`;
		key = key.trim();
		if (key === "$i") return index;
		if (key === "$self") return data;
		return parseProp(data, key);
	});
}
var DummyRunner = class {
	#test;
	#emitter;
	get failed() {
		return false;
	}
	constructor(test, emitter) {
		this.#test = test;
		this.#emitter = emitter;
	}
	#notifyStart() {
		const startOptions = {
			...this.#test.options,
			title: {
				original: this.#test.options.title,
				expanded: this.#test.options.title
			},
			isPinned: this.#test.isPinned
		};
		this.#emitter.emit("test:start", startOptions);
	}
	#notifyEnd() {
		const endOptions = {
			...this.#test.options,
			title: {
				original: this.#test.options.title,
				expanded: this.#test.options.title
			},
			isPinned: this.#test.isPinned,
			hasError: false,
			duration: 0,
			errors: []
		};
		this.#emitter.emit("test:end", endOptions);
	}
	run() {
		this.#notifyStart();
		this.#notifyEnd();
	}
};
var TestRunner = class {
	#emitter;
	#debuggingError;
	#timeout;
	#timeTracker;
	#setupRunner;
	#teardownRunner;
	#errors = [];
	#hasError = false;
	#datasetCurrentIndex;
	#callbacks;
	#test;
	#hooks;
	get failed() {
		return this.#hasError;
	}
	constructor(test, hooks, emitter, callbacks, debuggingError, datasetCurrentIndex) {
		this.#test = test;
		this.#hooks = hooks;
		this.#emitter = emitter;
		this.#callbacks = callbacks;
		this.#debuggingError = debuggingError;
		this.#datasetCurrentIndex = datasetCurrentIndex;
		this.#setupRunner = hooks.runner("setup");
		this.#teardownRunner = hooks.runner("teardown");
	}
	#getDatasetNode() {
		if (this.#datasetCurrentIndex !== void 0 && this.#test.dataset) return { dataset: {
			row: this.#test.dataset[this.#datasetCurrentIndex],
			index: this.#datasetCurrentIndex,
			size: this.#test.dataset.length
		} };
	}
	#getTitle(dataset) {
		const title = this.#test.options.title;
		return {
			original: title,
			expanded: dataset ? interpolate(title, dataset.row, dataset.index + 1) : title
		};
	}
	#notifyStart() {
		this.#timeTracker = timeSpan();
		const dataset = this.#getDatasetNode();
		const startOptions = {
			...this.#test.options,
			...dataset,
			isPinned: this.#test.isPinned,
			title: this.#getTitle(dataset ? dataset.dataset : void 0)
		};
		this.#emitter.emit("test:start", startOptions);
	}
	#createError(message) {
		if (this.#debuggingError) {
			this.#debuggingError.message = message;
			return this.#debuggingError;
		}
		return new Error(message);
	}
	#notifyEnd() {
		const dataset = this.#getDatasetNode();
		const endOptions = {
			...this.#test.options,
			...dataset,
			isPinned: this.#test.isPinned,
			title: this.#getTitle(dataset ? dataset.dataset : void 0),
			hasError: this.#hasError,
			errors: this.#errors,
			retryAttempt: this.#test.options.retryAttempt,
			duration: this.#timeTracker?.() ?? 0
		};
		this.#emitter.emit("test:end", endOptions);
	}
	async #runSetupHooks() {
		try {
			debug_default("running \"%s\" test setup hooks", this.#test.title);
			await this.#setupRunner.run(this.#test);
		} catch (error) {
			debug_default("test setup hooks failed, test: %s, error: %O", this.#test.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "setup",
				error
			});
		}
	}
	async #runTeardownHooks() {
		try {
			debug_default("running \"%s\" test teardown hooks", this.#test.title);
			await this.#teardownRunner.run(this.#test);
		} catch (error) {
			debug_default("test teardown hooks failed, test: %s, error: %O", this.#test.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "teardown",
				error
			});
		}
	}
	async #runTestCleanupFunctions() {
		const cleanupRunner = this.#hooks.runner("cleanup");
		this.#hooks.clear("cleanup");
		try {
			debug_default("running \"%s\" test cleanup functions", this.#test.title);
			await cleanupRunner.runReverse(this.#hasError, this.#test);
		} catch (error) {
			debug_default("test cleanup functions failed, test: %s, error: %O", this.#test.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "test:cleanup",
				error
			});
		}
	}
	async #runSetupCleanupFunctions() {
		try {
			debug_default("running \"%s\" test setup cleanup functions", this.#test.title);
			await this.#setupRunner.cleanup(this.#hasError, this.#test);
		} catch (error) {
			debug_default("test setup cleanup functions failed, test: %s, error: %O", this.#test.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "setup:cleanup",
				error
			});
		}
	}
	async #runTeardownCleanupFunctions() {
		try {
			debug_default("running \"%s\" test teardown cleanup functions", this.#test.title);
			await this.#teardownRunner.cleanup(this.#hasError, this.#test);
		} catch (error) {
			debug_default("test teardown cleanup functions failed, test: %s, error: %O", this.#test.title, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "teardown:cleanup",
				error
			});
		}
	}
	async #runTest(done) {
		const datasetRow = this.#datasetCurrentIndex !== void 0 && this.#test.dataset ? this.#test.dataset[this.#datasetCurrentIndex] : void 0;
		return datasetRow !== void 0 ? this.#test.options.executor(this.#test.context, datasetRow, done) : this.#test.options.executor(this.#test.context, done);
	}
	#runTestWithDone() {
		return new Promise((resolve, reject) => {
			const done = (error) => {
				if (error) reject(error);
				else resolve();
			};
			debug_default("running test \"%s\" and waiting for done method call", this.#test.title);
			this.#runTest(done).catch(reject);
		});
	}
	#createTimeoutTimer(duration) {
		return new Promise((_, reject) => {
			debug_default("wrapping test in timeout timer");
			this.#timeout = {
				reject,
				timer: setTimeout(() => this.#timeout.reject(this.#createError("Test timeout")), duration)
			};
		});
	}
	#resetTimer(duration) {
		if (this.#timeout) {
			debug_default("resetting timer");
			clearTimeout(this.#timeout.timer);
			this.#timeout.timer = setTimeout(() => this.#timeout.reject(this.#createError("Test timeout")), duration);
		}
	}
	#clearTimer() {
		if (this.#timeout) {
			debug_default("clearing timer");
			clearTimeout(this.#timeout.timer);
			this.#timeout = void 0;
		}
	}
	#wrapRegressionTest() {
		if (!this.#test.options.isFailing) return this.#test.options.waitsForDone ? this.#runTestWithDone() : this.#runTest();
		return new Promise((resolve, reject) => {
			(this.#test.options.waitsForDone ? this.#runTestWithDone() : this.#runTest()).then(() => {
				reject(this.#createError("Expected regression test to fail, instead it finished without any errors"));
			}).catch(() => resolve());
		});
	}
	async #wrapTestInTimeout() {
		if (!this.#test.options.timeout) return this.#wrapRegressionTest();
		try {
			await Promise.race([this.#createTimeoutTimer(this.#test.options.timeout), this.#wrapRegressionTest()]);
		} finally {
			this.#clearTimer();
		}
	}
	#wrapTestInRetries() {
		if (!this.#test.options.retries) return this.#wrapTestInTimeout();
		return retry((_, attempt) => {
			this.#test.options.retryAttempt = attempt;
			return this.#wrapTestInTimeout();
		}, {
			retries: this.#test.options.retries,
			factor: 1
		});
	}
	resetTimeout(duration) {
		if (!duration) this.#clearTimer();
		else this.#resetTimer(duration);
	}
	async run() {
		debug_default("starting to run \"%s\" test", this.#test.title);
		this.#notifyStart();
		await this.#runSetupHooks();
		if (this.#hasError) {
			await this.#runSetupCleanupFunctions();
			this.#notifyEnd();
			return;
		}
		try {
			this.#callbacks.executing.forEach((callback) => callback(this.#test));
			await this.#wrapTestInRetries();
		} catch (error) {
			this.#hasError = true;
			this.#errors.push({
				phase: "test",
				error
			});
		}
		this.#callbacks.executed.forEach((callback) => {
			try {
				callback(this.#test, this.#hasError, this.#errors);
			} catch (error) {
				this.#hasError = true;
				this.#errors.push({
					phase: "test",
					error
				});
			}
		});
		await this.#runTestCleanupFunctions();
		await this.#runSetupCleanupFunctions();
		await this.#runTeardownHooks();
		await this.#runTeardownCleanupFunctions();
		this.#notifyEnd();
	}
};
var Test = class extends Macroable {
	static executingCallbacks = [];
	static executedCallbacks = [];
	static executing(callback) {
		this.executingCallbacks.push(callback);
	}
	static executed(callback) {
		this.executedCallbacks.push(callback);
	}
	#refiner;
	#emitter;
	#activeRunner;
	#executed = false;
	#failed = false;
	#debuggingError = null;
	#hooks = new Hooks();
	#contextAccumlator;
	#skipAccumulator;
	#datasetAccumlator;
	get executed() {
		return this.#executed;
	}
	get failed() {
		return this.#failed;
	}
	options;
	dataset;
	context;
	get isPinned() {
		return this.#refiner.isPinned(this);
	}
	constructor(title, context, emitter, refiner, parent) {
		super();
		this.title = title;
		this.parent = parent;
		this.#emitter = emitter;
		this.#refiner = refiner;
		this.options = {
			title: this.title,
			tags: [],
			timeout: 2e3,
			meta: {}
		};
		if (!this.constructor.hasOwnProperty("executingCallbacks")) throw new Error(`Define static property "executingCallbacks = []" on ${this.constructor.name} class`);
		if (!this.constructor.hasOwnProperty("executedCallbacks")) throw new Error(`Define static property "executedCallbacks = []" on ${this.constructor.name} class`);
		if (typeof context === "function") this.#contextAccumlator = context;
		else this.context = context;
	}
	async #computeShouldSkip() {
		if (this.#skipAccumulator) this.options.isSkipped = await this.#skipAccumulator();
	}
	#computeisTodo() {
		this.options.isTodo = !this.options.executor;
	}
	async #computeDataset() {
		if (typeof this.#datasetAccumlator === "function") this.dataset = await this.#datasetAccumlator();
		return this.dataset;
	}
	async #computeContext() {
		if (typeof this.#contextAccumlator === "function") this.context = await this.#contextAccumlator(this);
		return this.context;
	}
	skip(skip = true, skipReason) {
		if (typeof skip === "function") this.#skipAccumulator = skip;
		else this.options.isSkipped = skip;
		this.options.skipReason = skipReason;
		return this;
	}
	fails(failReason) {
		this.options.isFailing = true;
		this.options.failReason = failReason;
		return this;
	}
	timeout(timeout) {
		this.options.timeout = timeout;
		return this;
	}
	disableTimeout() {
		return this.timeout(0);
	}
	resetTimeout(duration) {
		if (this.#activeRunner) this.#activeRunner.resetTimeout(duration);
		else if (duration) this.timeout(duration);
		else this.disableTimeout();
		return this;
	}
	tags(tags, strategy = "replace") {
		if (strategy === "replace") {
			this.options.tags = tags;
			return this;
		}
		if (strategy === "prepend") {
			this.options.tags = tags.concat(this.options.tags);
			return this;
		}
		this.options.tags = this.options.tags.concat(tags);
		return this;
	}
	retry(retries) {
		this.options.retries = retries;
		return this;
	}
	waitForDone() {
		this.options.waitsForDone = true;
		return this;
	}
	pin() {
		this.#refiner.pinTest(this);
		return this;
	}
	with(dataset) {
		if (Array.isArray(dataset)) {
			this.dataset = dataset;
			return this;
		}
		if (typeof dataset === "function") {
			this.#datasetAccumlator = dataset;
			return this;
		}
		throw new Error("dataset must be an array or a function that returns an array");
	}
	run(executor, debuggingError) {
		this.#debuggingError = debuggingError || /* @__PURE__ */ new Error();
		this.options.executor = executor;
		return this;
	}
	setup(handler) {
		debug_default("registering \"%s\" test setup hook %s", this.title, handler);
		this.#hooks.add("setup", handler);
		return this;
	}
	teardown(handler) {
		debug_default("registering \"%s\" test teardown hook %s", this.title, handler);
		this.#hooks.add("teardown", handler);
		return this;
	}
	cleanup(handler) {
		debug_default("registering \"%s\" test cleanup function %s", this.title, handler);
		this.#hooks.add("cleanup", handler);
		return this;
	}
	async exec() {
		const self = this.constructor;
		if (!this.#refiner.allows(this)) {
			debug_default("test \"%s\" skipped by refiner", this.title);
			return;
		}
		if (this.#executed) return;
		this.#executed = true;
		this.#computeisTodo();
		if (this.options.isTodo) {
			debug_default("skipping todo test \"%s\"", this.title);
			new DummyRunner(this, this.#emitter).run();
			return;
		}
		await this.#computeShouldSkip();
		if (this.options.isSkipped) {
			debug_default("skipping test \"%s\", reason (%s)", this.title, this.options.skipReason || "Skipped using .skip method");
			new DummyRunner(this, this.#emitter).run();
			return;
		}
		await this.#computeDataset();
		if (Array.isArray(this.dataset) && this.dataset.length) {
			let index = 0;
			for (let _ of this.dataset) {
				await this.#computeContext();
				this.#activeRunner = new TestRunner(this, this.#hooks, this.#emitter, {
					executing: self.executingCallbacks,
					executed: self.executedCallbacks
				}, this.#debuggingError, index);
				await this.#activeRunner.run();
				if (!this.#failed && this.#activeRunner.failed) this.#failed = true;
				index++;
			}
			this.#activeRunner = void 0;
			return;
		}
		await this.#computeContext();
		this.#activeRunner = new TestRunner(this, this.#hooks, this.#emitter, {
			executing: self.executingCallbacks,
			executed: self.executedCallbacks
		}, this.#debuggingError);
		await this.#activeRunner.run();
		this.#failed = this.#activeRunner.failed;
		this.#activeRunner = void 0;
	}
};
var Emitter = class extends Emittery {
	#errorHandler;
	onError(errorHandler) {
		this.#errorHandler = errorHandler;
	}
	async emit(eventName, eventData, allowMetaEvents) {
		try {
			await super.emit(eventName, eventData, allowMetaEvents);
		} catch (error) {
			if (this.#errorHandler) await this.#errorHandler(error);
			else throw error;
		}
	}
};
var Refiner = class {
	#shouldMatchAllTags = false;
	#pinnedTests = /* @__PURE__ */ new Set();
	#filters = {
		tags: [],
		tests: [],
		groups: [],
		negatedTags: []
	};
	constructor(filters = {}) {
		if (filters.tags) this.add("tags", filters.tags);
		if (filters.tests) this.add("tests", filters.tests);
		if (filters.groups) this.add("groups", filters.groups);
	}
	#isGroupAllowed(group) {
		const groupFilters = this.#filters.groups;
		if (groupFilters.length && !groupFilters.includes(group.title)) return false;
		let allowGroup = false;
		for (let test of group.tests) {
			allowGroup = this.allows(test);
			if (allowGroup) break;
		}
		return allowGroup;
	}
	#isTestTitleAllowed(test) {
		if (!this.#filters.tests.length) return true;
		return this.#filters.tests.includes(test.title);
	}
	#allowedByNegatedTags(test) {
		if (!this.#filters.negatedTags.length) return true;
		return this.#filters.negatedTags.every((tag) => !test.options.tags.includes(tag));
	}
	#allowedByTags(test) {
		if (!this.#filters.tags.length) return true;
		if (this.#shouldMatchAllTags) return this.#filters.tags.every((tag) => test.options.tags.includes(tag));
		return this.#filters.tags.some((tag) => test.options.tags.includes(tag));
	}
	#areTestTagsAllowed(test) {
		return this.#allowedByTags(test) && this.#allowedByNegatedTags(test);
	}
	#isAllowedByPinnedTest(test) {
		if (!this.#pinnedTests.size) return true;
		return this.#pinnedTests.has(test);
	}
	matchAllTags(state) {
		this.#shouldMatchAllTags = state;
		return this;
	}
	pinTest(test) {
		this.#pinnedTests.add(test);
	}
	isPinned(test) {
		return this.#pinnedTests.has(test);
	}
	add(layer, values) {
		if (layer === "tags") values.forEach((tag) => {
			if (tag.startsWith("!") || tag.startsWith("~")) this.#filters.negatedTags.push(tag.slice(1));
			else this.#filters.tags.push(tag);
		});
		else this.#filters[layer].push(...values);
	}
	allows(testOrGroup) {
		if (testOrGroup instanceof Group) return this.#isGroupAllowed(testOrGroup);
		if (this.#filters.groups.length && !testOrGroup.parent) return false;
		if (!this.#isTestTitleAllowed(testOrGroup)) return false;
		if (!this.#areTestTagsAllowed(testOrGroup)) return false;
		return this.#isAllowedByPinnedTest(testOrGroup);
	}
};
var SuiteRunner = class {
	#emitter;
	#options;
	#suite;
	#setupRunner;
	#teardownRunner;
	#errors = [];
	#hasError = false;
	get failed() {
		return this.#hasError;
	}
	constructor(suite, hooks, emitter, options) {
		this.#suite = suite;
		this.#emitter = emitter;
		this.#options = options;
		this.#setupRunner = hooks.runner("setup");
		this.#teardownRunner = hooks.runner("teardown");
	}
	#notifyStart() {
		const startOptions = { name: this.#suite.name };
		this.#emitter.emit("suite:start", startOptions);
	}
	#notifyEnd() {
		const endOptions = {
			name: this.#suite.name,
			hasError: this.#hasError,
			errors: this.#errors
		};
		this.#emitter.emit("suite:end", endOptions);
	}
	async #runSetupHooks() {
		debug_default("running \"%s\" suite setup hooks", this.#suite.name);
		try {
			await this.#setupRunner.run(this.#suite);
		} catch (error) {
			debug_default("suite setup hooks failed, suite: %s, error: %O", this.#suite.name, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "setup",
				error
			});
		}
	}
	async #runTeardownHooks() {
		debug_default("running \"%s\" suite teardown hooks", this.#suite.name);
		try {
			await this.#teardownRunner.run(this.#suite);
		} catch (error) {
			debug_default("suite teardown hooks failed, suite: %s, error: %O", this.#suite.name, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "teardown",
				error
			});
		}
	}
	async #runSetupCleanupFunctions() {
		debug_default("running \"%s\" suite setup cleanup functions", this.#suite.name);
		try {
			await this.#setupRunner.cleanup(this.#hasError, this.#suite);
		} catch (error) {
			debug_default("suite setup cleanup functions failed, suite: %s, error: %O", this.#suite.name, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "setup:cleanup",
				error
			});
		}
	}
	async #runTeardownCleanupFunctions() {
		debug_default("running \"%s\" suite teardown cleanup functions", this.#suite.name);
		try {
			await this.#teardownRunner.cleanup(this.#hasError, this.#suite);
		} catch (error) {
			debug_default("suite teardown cleanup functions failed, suite: %s, error: %O", this.#suite.name, error);
			this.#hasError = true;
			this.#errors.push({
				phase: "teardown:cleanup",
				error
			});
		}
	}
	async run() {
		debug_default("starting to run \"%s\" suite", this.#suite.name);
		this.#notifyStart();
		await this.#runSetupHooks();
		if (this.#hasError) {
			await this.#runSetupCleanupFunctions();
			this.#notifyEnd();
			return;
		}
		for (let groupOrTest of this.#suite.stack) {
			if (this.#options.bail && this.#hasError) if (groupOrTest instanceof Group) groupOrTest.tap((t) => t.skip(true, "Skipped due to bail mode"));
			else groupOrTest.skip(true, "Skipped due to bail mode");
			await groupOrTest.exec();
			if (!this.#hasError && groupOrTest.failed) this.#hasError = true;
		}
		await this.#runSetupCleanupFunctions();
		await this.#runTeardownHooks();
		await this.#runTeardownCleanupFunctions();
		this.#notifyEnd();
	}
};
var Suite = class extends Macroable {
	#refiner;
	#emitter;
	#failed = false;
	#bail;
	#hooks = new Hooks();
	#configureTestCallbacks = [];
	#configureGroupCallbacks = [];
	stack = [];
	get failed() {
		return this.#failed;
	}
	constructor(name, emitter, refiner) {
		super();
		this.name = name;
		this.#emitter = emitter;
		this.#refiner = refiner;
	}
	add(testOrGroup) {
		if (testOrGroup instanceof Group) this.#configureGroupCallbacks.forEach((callback) => callback(testOrGroup));
		if (testOrGroup instanceof Test) this.#configureTestCallbacks.forEach((callback) => callback(testOrGroup));
		this.stack.push(testOrGroup);
		return this;
	}
	onTest(callback) {
		this.stack.forEach((testOrGroup) => {
			if (testOrGroup instanceof Test) callback(testOrGroup);
		});
		this.#configureTestCallbacks.push(callback);
		return this;
	}
	onGroup(callback) {
		this.stack.forEach((testOrGroup) => {
			if (testOrGroup instanceof Group) callback(testOrGroup);
		});
		this.#configureGroupCallbacks.push(callback);
		return this;
	}
	bail(toggle = true) {
		if (this.#bail === void 0) {
			this.#bail = toggle;
			this.onGroup((group) => group.bail(toggle));
		}
		return this;
	}
	setup(handler) {
		debug_default("registering suite setup hook %s", handler);
		this.#hooks.add("setup", handler);
		return this;
	}
	teardown(handler) {
		debug_default("registering suite teardown hook %s", handler);
		this.#hooks.add("teardown", handler);
		return this;
	}
	async exec() {
		let allowSuite = false;
		for (let item of this.stack) {
			allowSuite = this.#refiner.allows(item);
			if (allowSuite) break;
		}
		if (!allowSuite) {
			debug_default("suite disabled by refiner %s", this.name);
			return;
		}
		const runner = new SuiteRunner(this, this.#hooks, this.#emitter, { bail: this.#bail ?? false });
		await runner.run();
		this.#failed = runner.failed;
	}
};
var TestContext = class extends Macroable {
	[inspect.custom]() {
		return inspect(this, {
			showHidden: false,
			depth: 1,
			colors: true,
			customInspect: false
		});
	}
};
export { Emitter, Group, Refiner, Runner, Suite, Test, TestContext, Tracker };
