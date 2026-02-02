import { Test, TestContext } from "@japa/runner/core";
import { Assertion, assert as assert$1 } from "chai";
import Macroable from "@poppinss/macroable";
import { AssertionError } from "assertion-error";
var Assert = class extends Macroable {
	assertions = {
		total: 0,
		mismatchError: null,
		validate() {
			if (this.planned === void 0) return;
			if (this.planned !== this.total) {
				const suffix = this.planned === 1 ? "" : "s";
				const message = `Planned for ${this.planned} assertion${suffix}, but ran ${this.total}`;
				this.mismatchError.message = message;
				throw this.mismatchError;
			}
		}
	};
	Assertion = Assertion;
	AssertionError = AssertionError;
	#luxonToJSDate(value) {
		if (typeof value?.toJSDate === "function") return value.toJSDate();
		return value;
	}
	incrementAssertionsCount() {
		this.assertions.total += 1;
	}
	plan(assertionsToExpect) {
		const error = /* @__PURE__ */ new Error();
		if (Error.captureStackTrace) Error.captureStackTrace(error);
		this.assertions.planned = assertionsToExpect;
		this.assertions.mismatchError = error;
		return this;
	}
	evaluate(expression, message, stackProps) {
		this.Assertion.prototype.assert.call({ __flags: {
			operator: stackProps.operator,
			message: stackProps.prefix,
			object: stackProps.thisObject
		} }, expression, message, "", stackProps.expected, stackProps.actual, stackProps.showDiff === void 0 ? true : stackProps.showDiff);
	}
	assert(expression, message) {
		this.incrementAssertionsCount();
		return assert$1(expression, message);
	}
	fail(actual, expected, message, operator) {
		this.incrementAssertionsCount();
		if (arguments.length === 1 && typeof actual === "string") return assert$1.fail(actual);
		return assert$1.fail(actual, expected, message, operator);
	}
	isOk(...args) {
		this.incrementAssertionsCount();
		return assert$1.isOk(...args);
	}
	ok(...args) {
		this.incrementAssertionsCount();
		return assert$1.ok(...args);
	}
	isNotOk(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotOk(...args);
	}
	notOk(...args) {
		this.incrementAssertionsCount();
		return assert$1.notOk(...args);
	}
	equal(...args) {
		this.incrementAssertionsCount();
		return assert$1.equal(...args);
	}
	notEqual(...args) {
		this.incrementAssertionsCount();
		return assert$1.notEqual(...args);
	}
	strictEqual(...args) {
		this.incrementAssertionsCount();
		return assert$1.strictEqual(...args);
	}
	notStrictEqual(...args) {
		this.incrementAssertionsCount();
		return assert$1.notStrictEqual(...args);
	}
	deepEqual(...args) {
		this.incrementAssertionsCount();
		return assert$1.deepEqual(...args);
	}
	notDeepEqual(...args) {
		this.incrementAssertionsCount();
		return assert$1.notDeepEqual(...args);
	}
	isAbove(valueToCheck, valueToBeAbove, message) {
		valueToCheck = this.#luxonToJSDate(valueToCheck);
		valueToBeAbove = this.#luxonToJSDate(valueToBeAbove);
		this.incrementAssertionsCount();
		return assert$1.isAbove(valueToCheck, valueToBeAbove, message);
	}
	isAtLeast(valueToCheck, valueToBeAtLeast, message) {
		valueToCheck = this.#luxonToJSDate(valueToCheck);
		valueToBeAtLeast = this.#luxonToJSDate(valueToBeAtLeast);
		this.incrementAssertionsCount();
		return assert$1.isAtLeast(valueToCheck, valueToBeAtLeast, message);
	}
	isBelow(valueToCheck, valueToBeBelow, message) {
		valueToCheck = this.#luxonToJSDate(valueToCheck);
		valueToBeBelow = this.#luxonToJSDate(valueToBeBelow);
		this.incrementAssertionsCount();
		return assert$1.isBelow(valueToCheck, valueToBeBelow, message);
	}
	isAtMost(valueToCheck, valueToBeAtMost, message) {
		valueToCheck = this.#luxonToJSDate(valueToCheck);
		valueToBeAtMost = this.#luxonToJSDate(valueToBeAtMost);
		this.incrementAssertionsCount();
		return assert$1.isAtMost(valueToCheck, valueToBeAtMost, message);
	}
	isTrue(...args) {
		this.incrementAssertionsCount();
		return assert$1.isTrue(...args);
	}
	isNotTrue(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotTrue(...args);
	}
	isFalse(...args) {
		this.incrementAssertionsCount();
		return assert$1.isFalse(...args);
	}
	isNotFalse(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotFalse(...args);
	}
	isNull(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNull(...args);
	}
	isNotNull(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotNull(...args);
	}
	isNaN(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNaN(...args);
	}
	isNotNaN(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotNaN(...args);
	}
	exists(...args) {
		this.incrementAssertionsCount();
		return assert$1.exists(...args);
	}
	notExists(...args) {
		this.incrementAssertionsCount();
		return assert$1.notExists(...args);
	}
	isUndefined(...args) {
		this.incrementAssertionsCount();
		assert$1.isUndefined(...args);
	}
	isDefined(...args) {
		this.incrementAssertionsCount();
		return assert$1.isDefined(...args);
	}
	isFunction(...args) {
		this.incrementAssertionsCount();
		return assert$1.isFunction(...args);
	}
	isNotFunction(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotFunction(...args);
	}
	isObject(...args) {
		this.incrementAssertionsCount();
		return assert$1.isObject(...args);
	}
	isNotObject(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotObject(...args);
	}
	isArray(...args) {
		this.incrementAssertionsCount();
		return assert$1.isArray(...args);
	}
	isNotArray(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotArray(...args);
	}
	isString(...args) {
		this.incrementAssertionsCount();
		return assert$1.isString(...args);
	}
	isNotString(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotString(...args);
	}
	isNumber(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNumber(...args);
	}
	isNotNumber(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotNumber(...args);
	}
	isFinite(...args) {
		this.incrementAssertionsCount();
		return assert$1.isFinite(...args);
	}
	isBoolean(...args) {
		this.incrementAssertionsCount();
		return assert$1.isBoolean(...args);
	}
	isNotBoolean(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotBoolean(...args);
	}
	typeOf(...args) {
		this.incrementAssertionsCount();
		return assert$1.typeOf(...args);
	}
	notTypeOf(...args) {
		this.incrementAssertionsCount();
		return assert$1.notTypeOf(...args);
	}
	instanceOf(...args) {
		this.incrementAssertionsCount();
		return assert$1.instanceOf(...args);
	}
	notInstanceOf(...args) {
		this.incrementAssertionsCount();
		return assert$1.notInstanceOf(...args);
	}
	include(...args) {
		this.incrementAssertionsCount();
		return assert$1.include(...args);
	}
	notInclude(...args) {
		this.incrementAssertionsCount();
		return assert$1.notInclude(...args);
	}
	deepInclude(...args) {
		this.incrementAssertionsCount();
		return assert$1.deepInclude(...args);
	}
	notDeepInclude(...args) {
		this.incrementAssertionsCount();
		return assert$1.notDeepInclude(...args);
	}
	match(...args) {
		this.incrementAssertionsCount();
		return assert$1.match(...args);
	}
	notMatch(...args) {
		this.incrementAssertionsCount();
		return assert$1.notMatch(...args);
	}
	property(...args) {
		this.incrementAssertionsCount();
		return assert$1.nestedProperty(...args);
	}
	notProperty(...args) {
		this.incrementAssertionsCount();
		return assert$1.notNestedProperty(...args);
	}
	propertyVal(...args) {
		this.incrementAssertionsCount();
		return assert$1.nestedPropertyVal(...args);
	}
	notPropertyVal(...args) {
		this.incrementAssertionsCount();
		return assert$1.notNestedPropertyVal(...args);
	}
	deepPropertyVal(...args) {
		this.incrementAssertionsCount();
		return assert$1.deepNestedPropertyVal(...args);
	}
	notDeepPropertyVal(...args) {
		this.incrementAssertionsCount();
		return assert$1.notDeepNestedPropertyVal(...args);
	}
	lengthOf(object, length, message) {
		this.incrementAssertionsCount();
		return assert$1.lengthOf(object, length, message);
	}
	properties(...args) {
		this.incrementAssertionsCount();
		return assert$1.containsAllKeys(...args);
	}
	anyProperties(...args) {
		this.incrementAssertionsCount();
		return assert$1.hasAnyKeys(...args);
	}
	onlyProperties(...args) {
		this.incrementAssertionsCount();
		return assert$1.hasAllKeys(...args);
	}
	notAnyProperties(...args) {
		this.incrementAssertionsCount();
		return assert$1.doesNotHaveAnyKeys(...args);
	}
	notAllProperties(...args) {
		this.incrementAssertionsCount();
		return assert$1.doesNotHaveAllKeys(...args);
	}
	throws(fn, errType, regExp, message) {
		this.incrementAssertionsCount();
		const args = [
			fn,
			errType,
			regExp,
			message
		];
		return assert$1.throws(...args);
	}
	doesNotThrow(fn, errType, regExp, message) {
		this.incrementAssertionsCount();
		const args = [
			fn,
			errType,
			regExp,
			message
		];
		return assert$1.doesNotThrow(...args);
	}
	doesNotThrows = this.doesNotThrow.bind(this);
	closeTo(...args) {
		this.incrementAssertionsCount();
		return assert$1.closeTo(...args);
	}
	approximately(...args) {
		this.incrementAssertionsCount();
		return assert$1.approximately(...args);
	}
	sameMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.sameMembers(...args);
	}
	notSameMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1["notSameMembers"](...args);
	}
	sameDeepMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.sameDeepMembers(...args);
	}
	notSameDeepMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notSameDeepMembers(...args);
	}
	sameOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.sameOrderedMembers(...args);
	}
	notSameOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notSameOrderedMembers(...args);
	}
	sameDeepOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.sameDeepOrderedMembers(...args);
	}
	notSameDeepOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notSameDeepOrderedMembers(...args);
	}
	includeMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.includeMembers(...args);
	}
	notIncludeMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notIncludeMembers(...args);
	}
	includeDeepMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.includeDeepMembers(...args);
	}
	notIncludeDeepMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notIncludeDeepMembers(...args);
	}
	includeOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.includeOrderedMembers(...args);
	}
	notIncludeOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notIncludeOrderedMembers(...args);
	}
	includeDeepOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.includeDeepOrderedMembers(...args);
	}
	notIncludeDeepOrderedMembers(...args) {
		this.incrementAssertionsCount();
		return assert$1.notIncludeDeepOrderedMembers(...args);
	}
	isSealed(...args) {
		this.incrementAssertionsCount();
		return assert$1.isSealed(...args);
	}
	sealed(...args) {
		this.incrementAssertionsCount();
		return assert$1.sealed(...args);
	}
	isNotSealed(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotSealed(...args);
	}
	notSealed(...args) {
		this.incrementAssertionsCount();
		return assert$1.notSealed(...args);
	}
	isFrozen(...args) {
		this.incrementAssertionsCount();
		return assert$1.isFrozen(...args);
	}
	frozen(...args) {
		this.incrementAssertionsCount();
		return assert$1.frozen(...args);
	}
	isNotFrozen(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotFrozen(...args);
	}
	notFrozen(...args) {
		this.incrementAssertionsCount();
		return assert$1.notFrozen(...args);
	}
	isEmpty(...args) {
		this.incrementAssertionsCount();
		return assert$1.isEmpty(...args);
	}
	empty(...args) {
		this.incrementAssertionsCount();
		return assert$1.isEmpty(...args);
	}
	isNotEmpty(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotEmpty(...args);
	}
	notEmpty(...args) {
		this.incrementAssertionsCount();
		return assert$1.isNotEmpty(...args);
	}
	containSubset(haystack, needle, message) {
		this.incrementAssertionsCount();
		return assert$1.containSubset(haystack, needle, message);
	}
	doesNotContainSubset(haystack, needle, message) {
		this.incrementAssertionsCount();
		return assert$1.doesNotContainSubset(haystack, needle, message);
	}
	containsSubset(haystack, needle, message) {
		return this.containSubset(haystack, needle, message);
	}
	notContainsSubset(haystack, needle, message) {
		return this.doesNotContainSubset(haystack, needle, message);
	}
	oneOf(...args) {
		this.incrementAssertionsCount();
		return assert$1.oneOf(...args);
	}
	async rejects(fn, errType, regExp, message) {
		let raisedException = null;
		this.incrementAssertionsCount();
		if (typeof fn !== "function") return this.evaluate(false, "expected #{this} to be a function", {
			thisObject: fn,
			expected: "",
			actual: "",
			prefix: message,
			operator: "rejects"
		});
		try {
			await fn();
		} catch (error) {
			raisedException = error;
		}
		const expectedExceptionClass = errType && typeof errType === "function" ? errType : null;
		let expectedErrorMessageRegex = regExp && regExp instanceof RegExp ? regExp : null;
		let expectedErrorMessage = regExp && typeof regExp === "string" ? regExp : null;
		if (!expectedErrorMessageRegex && !expectedErrorMessage && errType) {
			if (errType instanceof RegExp) expectedErrorMessageRegex = errType;
			else if (typeof errType === "string") expectedErrorMessage = errType;
		}
		if (!raisedException) return this.evaluate(false, "expected #{this} to throw an error", {
			thisObject: fn,
			expected: "",
			actual: "",
			prefix: message,
			operator: "rejects"
		});
		if (expectedExceptionClass && raisedException instanceof expectedExceptionClass === false) return this.evaluate(false, "expected #{this} to throw #{exp} but #{act} was thrown", {
			thisObject: fn,
			expected: expectedExceptionClass,
			actual: raisedException,
			prefix: message,
			operator: "rejects"
		});
		if (expectedErrorMessageRegex && !expectedErrorMessageRegex.test(raisedException.message)) return this.evaluate(false, "expected #{this} to throw error matching #{exp} but got #{act}", {
			thisObject: fn,
			expected: expectedErrorMessageRegex,
			actual: raisedException.message,
			prefix: message,
			operator: "rejects"
		});
		if (expectedErrorMessage && raisedException.message !== expectedErrorMessage) return this.evaluate(false, "expected #{this} to throw error including #{exp} but got #{act}", {
			thisObject: fn,
			expected: expectedErrorMessage,
			actual: raisedException.message,
			prefix: message,
			operator: "rejects"
		});
	}
	async doesNotReject(fn, errType, regExp, message) {
		this.incrementAssertionsCount();
		let raisedException = null;
		if (typeof fn !== "function") return this.evaluate(false, "expected #{this} to be a function", {
			thisObject: fn,
			expected: "",
			actual: "",
			prefix: message,
			operator: "doesNotReject"
		});
		try {
			await fn();
		} catch (error) {
			raisedException = error;
		}
		if (!raisedException) return;
		const expectedExceptionClass = errType && typeof errType === "function" ? errType : void 0;
		let expectedErrorMessageRegex = regExp && regExp instanceof RegExp ? regExp : void 0;
		let expectedErrorMessage = regExp && typeof regExp === "string" ? regExp : void 0;
		const hasMatchingErrorClass = expectedExceptionClass && raisedException instanceof expectedExceptionClass;
		if (!expectedErrorMessageRegex && expectedErrorMessage === void 0 && errType) {
			if (errType instanceof RegExp) expectedErrorMessageRegex = errType;
			else if (typeof errType === "string") expectedErrorMessage = errType;
		}
		if (!expectedErrorMessage && !expectedErrorMessageRegex && !expectedExceptionClass) return this.evaluate(false, "expected #{this} to not throw an error but #{act} was thrown", {
			thisObject: fn,
			expected: expectedExceptionClass,
			actual: raisedException,
			prefix: message,
			operator: "doesNotReject"
		});
		if (hasMatchingErrorClass && !expectedErrorMessage && !expectedErrorMessageRegex) return this.evaluate(false, "expected #{this} to not throw #{exp} but #{act} was thrown", {
			thisObject: fn,
			expected: expectedExceptionClass,
			actual: raisedException,
			prefix: message,
			operator: "doesNotReject"
		});
		if (expectedErrorMessageRegex && expectedErrorMessageRegex.test(raisedException.message)) return this.evaluate(false, "expected #{this} to throw error not matching #{exp}", {
			thisObject: fn,
			expected: expectedErrorMessageRegex,
			actual: raisedException.message,
			prefix: message,
			operator: "doesNotReject"
		});
		if (expectedErrorMessage && raisedException.message === expectedErrorMessage) return this.evaluate(false, hasMatchingErrorClass ? "expected #{this} to not throw #{exp} but #{act} was thrown" : "expected #{this} to throw error not including #{act}", {
			thisObject: fn,
			expected: hasMatchingErrorClass ? expectedExceptionClass : expectedErrorMessage,
			actual: hasMatchingErrorClass ? raisedException : raisedException.message,
			prefix: message,
			operator: "doesNotReject"
		});
	}
	doesNotRejects = this.doesNotReject.bind(this);
};
function assert(_options) {
	return function() {
		TestContext.getter("assert", () => new Assert(), true);
		Test.executed(function(test, hasError) {
			if (test.options.isFailing) return;
			if (!hasError) test.context?.assert.assertions.validate();
		});
	};
}
export { Assert, assert };
