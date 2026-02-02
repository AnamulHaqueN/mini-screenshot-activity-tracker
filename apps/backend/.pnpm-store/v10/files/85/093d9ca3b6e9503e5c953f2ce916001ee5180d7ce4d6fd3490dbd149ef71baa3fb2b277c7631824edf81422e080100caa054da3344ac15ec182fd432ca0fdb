import Macroable from "@poppinss/macroable";
import Hooks from "@poppinss/hooks";
import { serialize } from "cookie-es";
import superagent from "superagent";
import setCookieParser from "set-cookie-parser";
import { inspect } from "node:util";
import { parse } from "@poppinss/qs";
import { TestContext } from "@japa/runner/core";
const INSPECT_OPTIONS = {
	colors: true,
	depth: 2,
	showHidden: false
};
function stackToError(errorStack) {
	if (typeof errorStack === "string" && /^\s*at .*(\S+:\d+|\(native\))/m.test(errorStack)) {
		const customError = new Error(errorStack.split("\n")[0]);
		customError.stack = errorStack;
		return customError;
	}
	return errorStack;
}
function dumpResponseError(response) {
	if (response.status() >= 500 && response.hasError()) {
		console.log(`"error"   => ${inspect(stackToError(response.text()))}`);
		return;
	}
}
function dumpRequestCookies(request) {
	console.log(`"cookies"  => ${inspect(request.cookiesJar, INSPECT_OPTIONS)}`);
}
function dumpResponseCookies(response) {
	console.log(`"cookies"   => ${inspect(response.cookies(), INSPECT_OPTIONS)}`);
}
function dumpRequestHeaders(request) {
	console.log(`"headers"  => ${inspect(request.request["header"], INSPECT_OPTIONS)}`);
}
function dumpResponseHeaders(response) {
	console.log(`"headers"   => ${inspect(response.headers(), INSPECT_OPTIONS)}`);
}
function dumpRequestBody(request) {
	const data = request.request["_data"];
	if (data) console.log(`"body"     => ${inspect(data, INSPECT_OPTIONS)}`);
}
function dumpResponseBody(response) {
	if (response.status() >= 500) return;
	if (response.hasBody()) console.log(`"body"     => ${inspect(response.body(), INSPECT_OPTIONS)}`);
	else if (response.text()) console.log(`"text"     => ${inspect(response.text(), INSPECT_OPTIONS)}`);
	if (response.hasFiles()) {
		const files = Object.keys(response.files()).reduce((result, fileName) => {
			result[fileName] = response.files()[fileName].toJSON();
			return result;
		}, {});
		console.log(`"files"    => ${inspect(files, INSPECT_OPTIONS)}`);
	}
}
function dumpRequest(request) {
	console.log(`"request"  => ${inspect({
		method: request.request.method,
		endpoint: request.config.endpoint
	}, INSPECT_OPTIONS)}`);
	if ("qsRaw" in request.request && Array.isArray(request.request.qsRaw)) console.log(`"qs"       => ${inspect(parse(request.request.qsRaw.join("&")), INSPECT_OPTIONS)}`);
}
function dumpResponse(response) {
	console.log(`"response"  => ${inspect({ status: response.status() }, INSPECT_OPTIONS)}`);
}
var ApiResponse = class extends Macroable {
	#valuesDumped = /* @__PURE__ */ new Set();
	cookiesJar;
	constructor(request, response, config, assert) {
		super();
		this.request = request;
		this.response = response;
		this.config = config;
		this.assert = assert;
		this.cookiesJar = this.#parseCookies();
		this.#processCookies();
	}
	#parseCookies() {
		const cookieHeader = this.header("set-cookie");
		if (!cookieHeader) return {};
		return setCookieParser.parse(cookieHeader, { map: true });
	}
	#processCookies() {
		const processMethod = (this.config.serializers?.cookie)?.process;
		if (!processMethod) return;
		Object.keys(this.cookiesJar).forEach((key) => {
			const cookie = this.cookiesJar[key];
			const processedValue = processMethod(cookie.name, cookie.value, this);
			if (processedValue !== void 0) cookie.value = processedValue;
		});
	}
	#ensureHasAssert() {
		if (!this.assert) throw new Error("Response assertions are not available. Make sure to install the @japa/assert plugin");
	}
	#ensureHasOpenAPIAssertions() {
		this.#ensureHasAssert();
		if ("isValidApiResponse" in this.assert === false) throw new Error("OpenAPI assertions are not available. Make sure to install the @japa/openapi-assertions plugin");
	}
	charset() {
		return this.response.charset;
	}
	files() {
		return this.response.files;
	}
	links() {
		return this.response.links;
	}
	statusType() {
		return this.response.statusType;
	}
	text() {
		return this.response.text;
	}
	body() {
		return this.response.body;
	}
	header(key) {
		key = key.toLowerCase();
		return this.response.headers[key];
	}
	headers() {
		return this.response.headers;
	}
	status() {
		return this.response.status;
	}
	type() {
		return this.response.type;
	}
	redirects() {
		return this.response.redirects;
	}
	hasBody() {
		return this.type() === "application/json" || this.type() === "application/x-www-form-urlencoded" || this.type() === "multipart/form-data" || Buffer.isBuffer(this.response.body);
	}
	hasFiles() {
		return this.files() && Object.keys(this.files()).length > 0;
	}
	hasError() {
		return this.error() ? true : false;
	}
	hasFatalError() {
		return this.status() >= 500;
	}
	hasClientError() {
		return this.response.clientError;
	}
	hasServerError() {
		return this.response.serverError;
	}
	error() {
		return this.response.error;
	}
	cookie(name) {
		return this.cookiesJar[name];
	}
	cookies() {
		return this.cookiesJar;
	}
	dumpHeaders() {
		if (this.#valuesDumped.has("headers")) return this;
		this.#valuesDumped.add("headers");
		dumpResponseHeaders(this);
		return this;
	}
	dumpCookies() {
		if (this.#valuesDumped.has("cookies")) return this;
		this.#valuesDumped.add("cookies");
		dumpResponseCookies(this);
		return this;
	}
	dumpBody() {
		if (this.#valuesDumped.has("body")) return this;
		this.#valuesDumped.add("body");
		dumpResponseBody(this);
		return this;
	}
	dumpError() {
		if (this.#valuesDumped.has("error")) return this;
		this.#valuesDumped.add("error");
		dumpResponseError(this);
		return this;
	}
	dump() {
		if (this.#valuesDumped.has("response")) return this;
		this.#valuesDumped.add("response");
		dumpResponse(this);
		this.dumpCookies();
		this.dumpHeaders();
		this.dumpBody();
		this.dumpError();
		return this;
	}
	assertStatus(expectedStatus) {
		this.#ensureHasAssert();
		this.assert.equal(this.status(), expectedStatus);
	}
	assertBody(expectedBody) {
		this.#ensureHasAssert();
		this.assert.deepEqual(this.body(), expectedBody);
	}
	assertBodyContains(expectedBody) {
		this.#ensureHasAssert();
		this.assert.containsSubset(this.body(), expectedBody);
	}
	assertBodyNotContains(expectedBody) {
		this.#ensureHasAssert();
		this.assert.notContainsSubset(this.body(), expectedBody);
	}
	assertCookie(name, value) {
		this.#ensureHasAssert();
		this.assert.property(this.cookies(), name);
		if (value !== void 0) this.assert.deepEqual(this.cookie(name).value, value);
	}
	assertCookieMissing(name) {
		this.#ensureHasAssert();
		this.assert.notProperty(this.cookies(), name);
	}
	assertHeader(name, value) {
		name = name.toLowerCase();
		this.#ensureHasAssert();
		this.assert.property(this.headers(), name);
		if (value !== void 0) this.assert.deepEqual(this.header(name), value);
	}
	assertHeaderMissing(name) {
		name = name.toLowerCase();
		this.#ensureHasAssert();
		this.assert.notProperty(this.headers(), name);
	}
	assertTextIncludes(expectedSubset) {
		this.#ensureHasAssert();
		this.assert.include(this.text(), expectedSubset);
	}
	assertAgainstApiSpec() {
		this.#ensureHasOpenAPIAssertions();
		this.assert.isValidApiResponse(this.response);
	}
	assertRedirectsTo(pathname) {
		this.#ensureHasAssert();
		const redirects = this.redirects().map((url) => new URL(url).pathname);
		this.assert.evaluate(redirects.find((one) => one === pathname), `Expected #{exp} to be one of #{act}`, {
			expected: [pathname],
			actual: redirects,
			operator: "includes"
		});
	}
	assertOk() {
		this.assertStatus(200);
	}
	assertCreated() {
		this.assertStatus(201);
	}
	assertAccepted() {
		this.assertStatus(202);
	}
	assertNoContent() {
		this.assertStatus(204);
	}
	assertMovedPermanently() {
		this.assertStatus(301);
	}
	assertFound() {
		this.assertStatus(302);
	}
	assertBadRequest() {
		this.assertStatus(400);
	}
	assertUnauthorized() {
		this.assertStatus(401);
	}
	assertPaymentRequired() {
		this.assertStatus(402);
	}
	assertForbidden() {
		this.assertStatus(403);
	}
	assertNotFound() {
		this.assertStatus(404);
	}
	assertMethodNotAllowed() {
		this.assertStatus(405);
	}
	assertNotAcceptable() {
		this.assertStatus(406);
	}
	assertRequestTimeout() {
		this.assertStatus(408);
	}
	assertConflict() {
		this.assertStatus(409);
	}
	assertGone() {
		this.assertStatus(410);
	}
	assertLengthRequired() {
		this.assertStatus(411);
	}
	assertPreconditionFailed() {
		this.assertStatus(412);
	}
	assertPayloadTooLarge() {
		this.assertStatus(413);
	}
	assertURITooLong() {
		this.assertStatus(414);
	}
	assertUnsupportedMediaType() {
		this.assertStatus(415);
	}
	assertRangeNotSatisfiable() {
		this.assertStatus(416);
	}
	assertImATeapot() {
		this.assertStatus(418);
	}
	assertUnprocessableEntity() {
		this.assertStatus(422);
	}
	assertLocked() {
		this.assertStatus(423);
	}
	assertTooManyRequests() {
		this.assertStatus(429);
	}
};
const DUMP_CALLS = {
	request: dumpRequest,
	body: dumpRequestBody,
	cookies: dumpRequestCookies,
	headers: dumpRequestHeaders
};
var ApiRequest = class ApiRequest extends Macroable {
	static qsSerializer = (value) => value;
	static addParser = (contentType, parser) => {
		superagent.parse[contentType] = parser;
	};
	static removeParser = (contentType) => {
		delete superagent.parse[contentType];
	};
	static addSerializer = (contentType, serializer) => {
		superagent.serialize[contentType] = serializer;
	};
	static removeSerializer = (contentType) => {
		delete superagent.serialize[contentType];
	};
	static setQsSerializer = (serializer) => {
		ApiRequest.qsSerializer = serializer;
	};
	static removeQsSerializer = () => {
		ApiRequest.qsSerializer = (value) => value;
	};
	hooks = new Hooks();
	#setupRunner;
	#teardownRunner;
	#assert;
	#valuesToDump = /* @__PURE__ */ new Set();
	request;
	cookiesJar = {};
	constructor(config, assert) {
		super();
		this.config = config;
		this.#assert = assert;
		this.request = this.#createRequest();
		this.config.hooks?.setup.forEach((handler) => this.setup(handler));
		this.config.hooks?.teardown.forEach((handler) => this.teardown(handler));
	}
	#setCookiesHeader() {
		const prepareMethod = this.config.serializers?.cookie?.prepare;
		const cookies = Object.keys(this.cookiesJar).map((key) => {
			let { name, value } = this.cookiesJar[key];
			if (prepareMethod) value = prepareMethod(name, value, this);
			return serialize(name, value);
		});
		if (!cookies.length) return;
		this.header("Cookie", cookies);
	}
	#instantiateHooksRunners() {
		this.#setupRunner = this.hooks.runner("setup");
		this.#teardownRunner = this.hooks.runner("teardown");
	}
	async #runSetupHooks() {
		try {
			await this.#setupRunner.run(this);
		} catch (error) {
			await this.#setupRunner.cleanup(error, this);
			throw error;
		}
	}
	async #runTeardownHooks(response) {
		try {
			await this.#teardownRunner.run(response);
		} catch (error) {
			await this.#teardownRunner.cleanup(error, response);
			throw error;
		}
		await this.#teardownRunner.cleanup(null, response);
	}
	async #sendRequest() {
		let response;
		try {
			this.#setCookiesHeader();
			this.#dumpValues();
			response = await this.request.buffer(true);
		} catch (error) {
			this.request.abort();
			if (!error.response) {
				await this.#setupRunner.cleanup(error, this);
				throw error;
			}
			response = error.response;
		}
		await this.#setupRunner.cleanup(null, this);
		return new ApiResponse(this, response, this.config, this.#assert);
	}
	#dumpValues() {
		if (!this.#valuesToDump.size) return;
		try {
			this.#valuesToDump.forEach((key) => {
				DUMP_CALLS[key](this);
			});
		} catch (error) {
			console.log(error);
		}
	}
	#isUrl(url) {
		return url.startsWith("http://") || url.startsWith("https://");
	}
	#prependBaseUrl(url) {
		if (!this.config.baseUrl) return url;
		return `${this.config.baseUrl}/${url.replace(/^\//, "")}`;
	}
	#createRequest() {
		let url = this.config.endpoint;
		if (!this.#isUrl(url)) url = this.#prependBaseUrl(url);
		return superagent(this.config.method, url);
	}
	setup(handler) {
		this.hooks.add("setup", handler);
		return this;
	}
	teardown(handler) {
		this.hooks.add("teardown", handler);
		return this;
	}
	cookie(key, value) {
		this.cookiesJar[key] = {
			name: key,
			value
		};
		return this;
	}
	cookies(cookies) {
		Object.keys(cookies).forEach((key) => this.cookie(key, cookies[key]));
		return this;
	}
	header(key, value) {
		this.headers({ [key]: value });
		return this;
	}
	headers(headers) {
		this.request.set(headers);
		return this;
	}
	field(name, value) {
		this.request.field(name, value);
		return this;
	}
	fields(values) {
		this.request.field(values);
		return this;
	}
	file(name, value, options) {
		this.request.attach(name, value, options);
		return this;
	}
	form(values) {
		this.type("form");
		this.request.send(values);
		return this;
	}
	unsafeForm(values) {
		this.type("form");
		this.request.send(values);
		return this;
	}
	json(values) {
		this.type("json");
		this.request.send(values);
		return this;
	}
	unsafeJson(values) {
		this.type("json");
		this.request.send(values);
		return this;
	}
	qs(key, value) {
		if (!value) this.request.query(typeof key === "string" ? key : ApiRequest.qsSerializer(key));
		else this.request.query(ApiRequest.qsSerializer({ [key]: value }));
		return this;
	}
	unsafeQs(key, value) {
		if (!value) this.request.query(typeof key === "string" ? key : ApiRequest.qsSerializer(key));
		else this.request.query(ApiRequest.qsSerializer({ [key]: value }));
		return this;
	}
	timeout(ms) {
		this.request.timeout(ms);
		return this;
	}
	type(value) {
		this.request.type(value);
		return this;
	}
	accept(type) {
		this.request.accept(type);
		return this;
	}
	redirects(count) {
		this.request.redirects(count);
		return this;
	}
	basicAuth(user, password) {
		this.request.auth(user, password, { type: "basic" });
		return this;
	}
	bearerToken(token) {
		this.request.auth(token, { type: "bearer" });
		return this;
	}
	ca(certificate) {
		this.request.ca(certificate);
		return this;
	}
	cert(certificate) {
		this.request.cert(certificate);
		return this;
	}
	privateKey(key) {
		this.request.key(key);
		return this;
	}
	pfx(key) {
		this.request.pfx(key);
		return this;
	}
	disableTLSCerts() {
		this.request.disableTLSCerts();
		return this;
	}
	trustLocalhost(trust = true) {
		this.request.trustLocalhost(trust);
		return this;
	}
	dumpHeaders() {
		this.#valuesToDump.add("headers");
		return this;
	}
	dumpCookies() {
		this.#valuesToDump.add("cookies");
		return this;
	}
	dumpBody() {
		this.#valuesToDump.add("body");
		return this;
	}
	dump() {
		this.#valuesToDump.add("request");
		this.dumpCookies();
		this.dumpHeaders();
		this.dumpBody();
		return this;
	}
	retry(count, retryUntilCallback) {
		if (retryUntilCallback) {
			this.request.retry(count, (error, response) => {
				return retryUntilCallback(error, new ApiResponse(this, response, this.config, this.#assert));
			});
			return this;
		}
		this.request.retry(count);
		return this;
	}
	async send() {
		this.#instantiateHooksRunners();
		await this.#runSetupHooks();
		const response = await this.#sendRequest();
		await this.#runTeardownHooks(response);
		return response;
	}
	then(resolve, reject) {
		return this.send().then(resolve, reject);
	}
	catch(reject) {
		return this.send().catch(reject);
	}
	finally(fullfilled) {
		return this.send().finally(fullfilled);
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
};
var ApiClient = class extends Macroable {
	static #onRequestHandlers = [];
	static #hooksHandlers = {
		setup: [],
		teardown: []
	};
	static #routerBuilder;
	static #customCookiesSerializer;
	#baseUrl;
	#assert;
	constructor(baseUrl, assert) {
		super();
		this.#baseUrl = baseUrl;
		this.#assert = assert;
	}
	static clearSetupHooks() {
		this.#hooksHandlers.setup = [];
		return this;
	}
	static clearTeardownHooks() {
		this.#hooksHandlers.teardown = [];
		return this;
	}
	static clearRequestHandlers() {
		this.#onRequestHandlers = [];
		return this;
	}
	static onRequest(handler) {
		this.#onRequestHandlers.push(handler);
		return this;
	}
	static setup(handler) {
		this.#hooksHandlers.setup.push(handler);
		return this;
	}
	static teardown(handler) {
		this.#hooksHandlers.teardown.push(handler);
		return this;
	}
	static cookiesSerializer(serailizer) {
		this.#customCookiesSerializer = serailizer;
		return this;
	}
	static setRouteBuilder(routerBuilder) {
		this.#routerBuilder = routerBuilder;
		return this;
	}
	static clearRouteBuilder() {
		this.#routerBuilder = void 0;
		return this;
	}
	request(endpoint, method) {
		const hooks = this.constructor.#hooksHandlers;
		const requestHandlers = this.constructor.#onRequestHandlers;
		const cookiesSerializer = this.constructor.#customCookiesSerializer;
		let baseUrl = this.#baseUrl;
		const envHost = process.env.HOST;
		const envPort = process.env.PORT;
		if (!baseUrl && envHost && envPort) baseUrl = `http://${envHost}:${envPort}`;
		const request = new ApiRequest({
			baseUrl,
			method,
			endpoint,
			hooks,
			serializers: { cookie: cookiesSerializer }
		}, this.#assert);
		requestHandlers.forEach((handler) => handler(request));
		return request;
	}
	get(endpoint) {
		return this.request(endpoint, "GET");
	}
	post(endpoint) {
		return this.request(endpoint, "POST");
	}
	put(endpoint) {
		return this.request(endpoint, "PUT");
	}
	patch(endpoint) {
		return this.request(endpoint, "PATCH");
	}
	delete(endpoint) {
		return this.request(endpoint, "DELETE");
	}
	head(endpoint) {
		return this.request(endpoint, "HEAD");
	}
	options(endpoint) {
		return this.request(endpoint, "OPTIONS");
	}
	visit(...args) {
		const name = args[0];
		const params = args[1] ?? {};
		const routerBuilder = this.constructor.#routerBuilder;
		if (!routerBuilder) throw new Error(`Route builder not configured. Use ApiClient.setRouteBuilder() to configure a routes builder`);
		const routeDef = routerBuilder(name, params);
		return this.request(routeDef.url, routeDef.method);
	}
};
function apiClient(options) {
	return function() {
		const normalizedOptions = typeof options === "string" ? { baseURL: options } : options;
		TestContext.getter("client", function() {
			return new ApiClient(normalizedOptions?.baseURL, this.assert);
		}, true);
	};
}
export { ApiClient, ApiRequest, ApiResponse, apiClient };
