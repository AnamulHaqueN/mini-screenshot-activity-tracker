import { type Assert } from '@japa/assert';
import Macroable from '@poppinss/macroable';
import { type HTTPError, type Response } from 'superagent';
import { type ApiRequest } from './request.js';
import { type RequestConfig, type ResponseCookie, type ResponseCookies, type SuperAgentResponseFile } from './types.js';
/**
 * ApiResponse represents an HTTP response in the context of API testing.
 * It extends Macroable to allow adding custom methods at runtime.
 * The class provides methods for accessing response data and making assertions.
 *
 * @example
 * const response = await request.send()
 * response.assertStatus(200)
 * console.log(response.body())
 */
export declare class ApiResponse<TResponse = any> extends Macroable {
    #private;
    request: ApiRequest;
    response: Response;
    protected config: RequestConfig;
    assert?: Assert | undefined;
    /**
     * Parsed cookies from the response
     */
    cookiesJar: ResponseCookies;
    constructor(request: ApiRequest, response: Response, config: RequestConfig, assert?: Assert | undefined);
    /**
     * Get the response content-type charset.
     *
     * @example
     * response.charset() // 'utf-8'
     */
    charset(): string | undefined;
    /**
     * Get parsed files from the multipart response.
     *
     * @example
     * const files = response.files()
     * console.log(files.avatar)
     */
    files<Properties extends string>(): {
        [K in Properties]: SuperAgentResponseFile;
    };
    /**
     * Returns an object of links by parsing the "Link" header.
     *
     * @example
     * // Link: <https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preload"
     * response.links()
     * // {
     * //   preconnect: 'https://one.example.com',
     * //   preload: 'https://two.example.com',
     * // }
     */
    links(): Record<string, string>;
    /**
     * Get the response status type (1xx, 2xx, 3xx, 4xx, 5xx).
     *
     * @example
     * response.statusType() // 2
     */
    statusType(): number;
    /**
     * Get the response raw parsed text.
     *
     * @example
     * const text = response.text()
     */
    text(): string;
    /**
     * Get the response body (parsed JSON, form data, or buffer).
     *
     * @example
     * const body = response.body()
     */
    body(): TResponse;
    /**
     * Get the value for a given response header.
     *
     * @param key - The header name (case-insensitive)
     *
     * @example
     * const contentType = response.header('content-type')
     */
    header(key: string): string | undefined;
    /**
     * Get all response headers as an object.
     *
     * @example
     * const headers = response.headers()
     */
    headers(): Record<string, string>;
    /**
     * Get the response HTTP status code.
     *
     * @example
     * response.status() // 200
     */
    status(): number;
    /**
     * Get the response content-type.
     *
     * @example
     * response.type() // 'application/json'
     */
    type(): string;
    /**
     * Get redirect URLs the request has followed before
     * receiving the response.
     *
     * @example
     * const redirects = response.redirects()
     */
    redirects(): string[];
    /**
     * Check if the response has a parsed body. Returns true when
     * content-type is one of: application/json, application/x-www-form-urlencoded,
     * multipart/form-data, or when the response body is a buffer.
     *
     * @example
     * if (response.hasBody()) {
     *   console.log(response.body())
     * }
     */
    hasBody(): boolean;
    /**
     * Check if the response body contains files.
     *
     * @example
     * if (response.hasFiles()) {
     *   console.log(response.files())
     * }
     */
    hasFiles(): boolean;
    /**
     * Check if the response is an error.
     *
     * @example
     * if (response.hasError()) {
     *   console.error(response.error())
     * }
     */
    hasError(): boolean;
    /**
     * Check if the response is a fatal error (status >= 500).
     *
     * @example
     * if (response.hasFatalError()) {
     *   console.error('Server error')
     * }
     */
    hasFatalError(): boolean;
    /**
     * Check if the request client failed to make the request.
     *
     * @example
     * if (response.hasClientError()) {
     *   console.error('Client error')
     * }
     */
    hasClientError(): boolean;
    /**
     * Check if the server responded with an error.
     *
     * @example
     * if (response.hasServerError()) {
     *   console.error('Server error')
     * }
     */
    hasServerError(): boolean;
    /**
     * Get the response error object, or false if no error.
     *
     * @example
     * const error = response.error()
     */
    error(): false | HTTPError;
    /**
     * Get a cookie by name from the response.
     *
     * @param name - The cookie name
     *
     * @example
     * const sessionCookie = response.cookie('session_id')
     */
    cookie(name: string): ResponseCookie | undefined;
    /**
     * Get all parsed response cookies.
     *
     * @example
     * const cookies = response.cookies()
     */
    cookies(): ResponseCookies;
    /**
     * Dump response headers to the console.
     */
    dumpHeaders(): this;
    /**
     * Dump response cookies to the console.
     */
    dumpCookies(): this;
    /**
     * Dump response body to the console.
     */
    dumpBody(): this;
    /**
     * Dump response error to the console.
     */
    dumpError(): this;
    /**
     * Dump response details (status, headers, cookies, body, errors) to the console.
     */
    dump(): this;
    /**
     * Assert response status to match the expected status.
     *
     * @param expectedStatus - The expected HTTP status code
     *
     * @example
     * response.assertStatus(200)
     */
    assertStatus(expectedStatus: number): void;
    /**
     * Assert response body to match the expected body.
     *
     * @param expectedBody - The expected response body
     *
     * @example
     * response.assertBody({ id: 1, name: 'John' })
     */
    assertBody(expectedBody: TResponse): void;
    /**
     * Assert response body contains a subset of the expected body.
     *
     * @param expectedBody - The expected body subset
     *
     * @example
     * response.assertBodyContains({ name: 'John' })
     */
    assertBodyContains(expectedBody: any): void;
    /**
     * Assert response body does not contain a subset of the expected body.
     *
     * @param expectedBody - The body subset that should not be present
     *
     * @example
     * response.assertBodyNotContains({ password: 'secret' })
     */
    assertBodyNotContains(expectedBody: any): void;
    /**
     * Assert response contains a given cookie and optionally
     * has the expected value.
     *
     * @param name - The cookie name
     * @param value - Optional expected cookie value
     *
     * @example
     * response.assertCookie('session_id')
     * response.assertCookie('session_id', 'abc123')
     */
    assertCookie(name: string, value?: any): void;
    /**
     * Assert response does not contain a given cookie.
     *
     * @param name - The cookie name
     *
     * @example
     * response.assertCookieMissing('old_session')
     */
    assertCookieMissing(name: string): void;
    /**
     * Assert response contains a given header and optionally
     * has the expected value.
     *
     * @param name - The header name
     * @param value - Optional expected header value
     *
     * @example
     * response.assertHeader('content-type')
     * response.assertHeader('content-type', 'application/json')
     */
    assertHeader(name: string, value?: any): void;
    /**
     * Assert response does not contain a given header.
     *
     * @param name - The header name
     *
     * @example
     * response.assertHeaderMissing('x-deprecated-header')
     */
    assertHeaderMissing(name: string): void;
    /**
     * Assert response text includes the expected substring.
     *
     * @param expectedSubset - The expected substring
     *
     * @example
     * response.assertTextIncludes('Welcome')
     */
    assertTextIncludes(expectedSubset: string): void;
    /**
     * Assert response body is valid as per the OpenAPI spec.
     * Requires @japa/openapi-assertions plugin.
     *
     * @example
     * response.assertAgainstApiSpec()
     */
    assertAgainstApiSpec(): void;
    /**
     * Assert the response redirected to a given pathname.
     *
     * @param pathname - The expected redirect pathname
     *
     * @example
     * response.assertRedirectsTo('/dashboard')
     */
    assertRedirectsTo(pathname: string): void;
    /**
     * Assert that response has an ok (200) status.
     *
     * @example
     * response.assertOk()
     */
    assertOk(): void;
    /**
     * Assert that response has a created (201) status.
     *
     * @example
     * response.assertCreated()
     */
    assertCreated(): void;
    /**
     * Assert that response has an accepted (202) status.
     *
     * @example
     * response.assertAccepted()
     */
    assertAccepted(): void;
    /**
     * Assert that response has a no content (204) status.
     *
     * @example
     * response.assertNoContent()
     */
    assertNoContent(): void;
    /**
     * Assert that response has a moved permanently (301) status.
     *
     * @example
     * response.assertMovedPermanently()
     */
    assertMovedPermanently(): void;
    /**
     * Assert that response has a found (302) status.
     *
     * @example
     * response.assertFound()
     */
    assertFound(): void;
    /**
     * Assert that response has a bad request (400) status.
     *
     * @example
     * response.assertBadRequest()
     */
    assertBadRequest(): void;
    /**
     * Assert that response has an unauthorized (401) status.
     *
     * @example
     * response.assertUnauthorized()
     */
    assertUnauthorized(): void;
    /**
     * Assert that response has a payment required (402) status.
     *
     * @example
     * response.assertPaymentRequired()
     */
    assertPaymentRequired(): void;
    /**
     * Assert that response has a forbidden (403) status.
     *
     * @example
     * response.assertForbidden()
     */
    assertForbidden(): void;
    /**
     * Assert that response has a not found (404) status.
     *
     * @example
     * response.assertNotFound()
     */
    assertNotFound(): void;
    /**
     * Assert that response has a method not allowed (405) status.
     *
     * @example
     * response.assertMethodNotAllowed()
     */
    assertMethodNotAllowed(): void;
    /**
     * Assert that response has a not acceptable (406) status.
     *
     * @example
     * response.assertNotAcceptable()
     */
    assertNotAcceptable(): void;
    /**
     * Assert that response has a request timeout (408) status.
     *
     * @example
     * response.assertRequestTimeout()
     */
    assertRequestTimeout(): void;
    /**
     * Assert that response has a conflict (409) status.
     *
     * @example
     * response.assertConflict()
     */
    assertConflict(): void;
    /**
     * Assert that response has a gone (410) status.
     *
     * @example
     * response.assertGone()
     */
    assertGone(): void;
    /**
     * Assert that response has a length required (411) status.
     *
     * @example
     * response.assertLengthRequired()
     */
    assertLengthRequired(): void;
    /**
     * Assert that response has a precondition failed (412) status.
     *
     * @example
     * response.assertPreconditionFailed()
     */
    assertPreconditionFailed(): void;
    /**
     * Assert that response has a payload too large (413) status.
     *
     * @example
     * response.assertPayloadTooLarge()
     */
    assertPayloadTooLarge(): void;
    /**
     * Assert that response has a URI too long (414) status.
     *
     * @example
     * response.assertURITooLong()
     */
    assertURITooLong(): void;
    /**
     * Assert that response has an unsupported media type (415) status.
     *
     * @example
     * response.assertUnsupportedMediaType()
     */
    assertUnsupportedMediaType(): void;
    /**
     * Assert that response has a range not satisfiable (416) status.
     *
     * @example
     * response.assertRangeNotSatisfiable()
     */
    assertRangeNotSatisfiable(): void;
    /**
     * Assert that response has an im a teapot (418) status.
     *
     * @example
     * response.assertImATeapot()
     */
    assertImATeapot(): void;
    /**
     * Assert that response has an unprocessable entity (422) status.
     *
     * @example
     * response.assertUnprocessableEntity()
     */
    assertUnprocessableEntity(): void;
    /**
     * Assert that response has a locked (423) status.
     *
     * @example
     * response.assertLocked()
     */
    assertLocked(): void;
    /**
     * Assert that response has a too many requests (429) status.
     *
     * @example
     * response.assertTooManyRequests()
     */
    assertTooManyRequests(): void;
}
