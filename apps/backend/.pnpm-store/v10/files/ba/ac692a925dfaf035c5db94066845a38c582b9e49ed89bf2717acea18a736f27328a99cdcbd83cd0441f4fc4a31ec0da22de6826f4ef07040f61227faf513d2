import Hooks from '@poppinss/hooks';
import type { Assert } from '@japa/assert';
import Macroable from '@poppinss/macroable';
import { type SuperAgentRequest } from 'superagent';
import { ApiResponse } from './response.js';
import type { SetupHandler, RequestConfig, MultipartValue, RequestCookies, TeardownHandler, SuperAgentParser, SuperAgentSerializer, ApiRequestHooks } from './types.js';
/**
 * ApiRequest represents an HTTP request in the context of API testing.
 * It extends Macroable to allow adding custom methods at runtime.
 * The class provides a fluent interface for building and sending HTTP requests.
 *
 * @example
 * const request = new ApiRequest({
 *   method: 'GET',
 *   endpoint: '/users',
 *   baseUrl: 'http://localhost:3000'
 * })
 * await request.send()
 */
export declare class ApiRequest<TBody = any, TResponse = any, TQuery = any> extends Macroable {
    #private;
    config: RequestConfig;
    /**
     * The serializer to use for serializing request query params
     */
    static qsSerializer: SuperAgentSerializer;
    /**
     * Register a custom superagent parser. Parsers are used
     * to parse the incoming response based on content type.
     *
     * @param contentType - The content type to register the parser for
     * @param parser - The parser function to handle the response
     */
    static addParser: (contentType: string, parser: SuperAgentParser) => void;
    /**
     * Remove a custom superagent parser.
     *
     * @param contentType - The content type to remove the parser for
     */
    static removeParser: (contentType: string) => void;
    /**
     * Register a custom superagent serializer. Serializers are used
     * to serialize the request body based on content type.
     *
     * @param contentType - The content type to register the serializer for
     * @param serializer - The serializer function to handle the request body
     */
    static addSerializer: (contentType: string, serializer: SuperAgentSerializer) => void;
    /**
     * Remove a custom superagent serializer.
     *
     * @param contentType - The content type to remove the serializer for
     */
    static removeSerializer: (contentType: string) => void;
    /**
     * Specify the serializer for query strings. Serializers are used to convert
     * request querystring values to a string.
     *
     * @param serializer - The serializer function to convert query params
     */
    static setQsSerializer: (serializer: SuperAgentSerializer) => void;
    /**
     * Remove the custom query string serializer and restore the default.
     */
    static removeQsSerializer: () => void;
    /**
     * Reference to registered hooks
     */
    hooks: Hooks<ApiRequestHooks>;
    /**
     * The underlying super agent request
     */
    request: SuperAgentRequest;
    /**
     * Cookies to be sent with the request
     */
    cookiesJar: RequestCookies;
    constructor(config: RequestConfig, assert?: Assert);
    /**
     * Register a setup hook. Setup hooks are called before
     * making the request.
     *
     * @param handler - The setup handler function to register
     *
     * @example
     * request.setup((req) => {
     *   req.header('Authorization', 'Bearer token')
     * })
     */
    setup(handler: SetupHandler): this;
    /**
     * Register a teardown hook. Teardown hooks are called after
     * making the request.
     *
     * @param handler - The teardown handler function to register
     *
     * @example
     * request.teardown((response) => {
     *   console.log('Request completed with status:', response.status())
     * })
     */
    teardown(handler: TeardownHandler): this;
    /**
     * Set cookie as a key-value pair to be sent to the server.
     *
     * @param key - The cookie name
     * @param value - The cookie value
     *
     * @example
     * request.cookie('session_id', 'abc123')
     */
    cookie(key: string, value: any): this;
    /**
     * Set cookies as an object to be sent to the server.
     *
     * @param cookies - An object containing cookie key-value pairs
     *
     * @example
     * request.cookies({
     *   session_id: 'abc123',
     *   user_token: 'xyz789'
     * })
     */
    cookies(cookies: Record<string, any>): this;
    /**
     * Define request header as a key-value pair.
     *
     * @example
     * request.header('x-foo', 'bar')
     * request.header('x-foo', ['bar', 'baz'])
     */
    header(key: string, value: string | string[]): this;
    /**
     * Define request headers as an object.
     *
     * @example
     * request.headers({ 'x-foo': 'bar' })
     * request.headers({ 'x-foo': ['bar', 'baz'] })
     */
    headers(headers: Record<string, string | string[]>): this;
    /**
     * Define the field value for a multipart request.
     *
     * @note: This method makes a multipart request. See [[this.form]] to
     * make HTML style form submissions.
     *
     * @param name - The field name
     * @param value - The field value(s)
     *
     * @example
     * request.field('name', 'virk')
     * request.field('age', 22)
     */
    field(name: string, value: MultipartValue | MultipartValue[]): this;
    /**
     * Define fields as an object for a multipart request.
     *
     * @note: This method makes a multipart request. See [[this.form]] to
     * make HTML style form submissions.
     *
     * @param values - An object containing field key-value pairs
     *
     * @example
     * request.fields({'name': 'virk', age: 22})
     */
    fields(values: {
        [name: string]: MultipartValue | MultipartValue[];
    }): this;
    /**
     * Upload file for a multipart request. Either you can pass path to a
     * file, a readable stream, or a buffer.
     *
     * @param name - The field name for the file
     * @param value - The file path, stream, or buffer
     * @param options - Optional filename or configuration object
     *
     * @example
     * request.file('avatar', 'absolute/path/to/file')
     * request.file('avatar', createReadStream('./path/to/file'))
     */
    file(name: string, value: MultipartValue, options?: string | {
        filename?: string | undefined;
        contentType?: string | undefined;
    }): this;
    /**
     * Set form values. Calling this method will set the content type
     * to "application/x-www-form-urlencoded".
     *
     * @param values - The form data to send
     *
     * @example
     * request.form({
     *   email: 'virk@adonisjs.com',
     *   password: 'secret'
     * })
     */
    form(values: TBody): this;
    /**
     * Set form values without type checking.
     * Useful for testing invalid form data.
     *
     * @param values - The form data to send (untyped)
     */
    unsafeForm(values: string | object): this;
    /**
     * Set JSON body for the request. Calling this method will set
     * the content type to "application/json".
     *
     * @param values - The JSON data to send
     *
     * @example
     * request.json({
     *   email: 'virk@adonisjs.com',
     *   password: 'secret'
     * })
     */
    json(values: TBody): this;
    /**
     * Set JSON body for the request without type checking.
     * Useful for testing invalid JSON payloads.
     *
     * @param values - The JSON data to send (untyped)
     */
    unsafeJson(values: string | object): this;
    /**
     * Set querystring for the request.
     *
     * @param key - The query parameter key or an object of query parameters
     * @param value - The query parameter value (when key is a string)
     *
     * @example
     * request.qs('order_by', 'id')
     * request.qs({ order_by: 'id' })
     */
    qs(key: string, value: any): this;
    qs(values: TQuery): this;
    /**
     * Set querystring for the request without type checking.
     * Useful for testing invalid query parameters.
     *
     * @param key - The query parameter key or an object of query parameters
     * @param value - The query parameter value (when key is a string)
     */
    unsafeQs(key: string, value: any): this;
    unsafeQs(values: string | object): this;
    /**
     * Set timeout for the request.
     *
     * @param ms - Timeout in milliseconds or object with response/deadline timeouts
     *
     * @example
     * request.timeout(5000)
     * request.timeout({ response: 5000, deadline: 60000 })
     */
    timeout(ms: number | {
        deadline?: number | undefined;
        response?: number | undefined;
    }): this;
    /**
     * Set content-type for the request.
     *
     * @param value - The content type
     *
     * @example
     * request.type('json')
     */
    type(value: string): this;
    /**
     * Set "accept" header in the request.
     *
     * @param type - The accept type
     *
     * @example
     * request.accept('json')
     */
    accept(type: string): this;
    /**
     * Follow redirects from the response.
     *
     * @param count - Maximum number of redirects to follow
     *
     * @example
     * request.redirects(3)
     */
    redirects(count: number): this;
    /**
     * Set basic auth header from user and password.
     *
     * @param user - The username
     * @param password - The password
     *
     * @example
     * request.basicAuth('foo@bar.com', 'secret')
     */
    basicAuth(user: string, password: string): this;
    /**
     * Pass auth bearer token as authorization header.
     *
     * @param token - The bearer token
     *
     * @example
     * request.bearerToken('tokenValue')
     */
    bearerToken(token: string): this;
    /**
     * Set the CA certificates to trust.
     *
     * @param certificate - The certificate(s) to trust
     */
    ca(certificate: string | string[] | Buffer | Buffer[]): this;
    /**
     * Set the client certificates.
     *
     * @param certificate - The client certificate(s)
     */
    cert(certificate: string | string[] | Buffer | Buffer[]): this;
    /**
     * Set the client private key(s).
     *
     * @param key - The private key(s)
     */
    privateKey(key: string | string[] | Buffer | Buffer[]): this;
    /**
     * Set the client PFX or PKCS12 encoded private key and certificate chain.
     *
     * @param key - The PFX/PKCS12 key(s) or object with pfx and passphrase
     */
    pfx(key: string | string[] | Buffer | Buffer[] | {
        pfx: string | Buffer;
        passphrase: string;
    }): this;
    /**
     * Does not reject expired or invalid TLS certs. Sets internally rejectUnauthorized=true.
     */
    disableTLSCerts(): this;
    /**
     * Trust broken HTTPs connections on localhost.
     *
     * @param trust - Whether to trust localhost connections (default: true)
     */
    trustLocalhost(trust?: boolean): this;
    /**
     * Dump request headers to the console when the request is sent.
     */
    dumpHeaders(): this;
    /**
     * Dump request cookies to the console when the request is sent.
     */
    dumpCookies(): this;
    /**
     * Dump request body to the console when the request is sent.
     */
    dumpBody(): this;
    /**
     * Dump request details (headers, cookies, body) to the console when the request is sent.
     */
    dump(): this;
    /**
     * Retry a failing request. Along with the count, you can also define
     * a callback to decide how long the request should be retried.
     *
     * The max count is applied regardless of whether callback is defined
     * or not.
     *
     * The following response codes are considered failing:
     * - 408, 413, 429, 500, 502, 503, 504, 521, 522, 524
     *
     * The following error codes are considered failing:
     * - 'ETIMEDOUT', 'ECONNRESET', 'EADDRINUSE', 'ECONNREFUSED', 'EPIPE', 'ENOTFOUND', 'ENETUNREACH', 'EAI_AGAIN'
     *
     * @param count - Maximum number of retry attempts
     * @param retryUntilCallback - Optional callback to determine if retry should continue
     *
     * @example
     * request.retry(3)
     * request.retry(5, (error, response) => response.status() >= 500)
     */
    retry(count: number, retryUntilCallback?: (error: any, response: ApiResponse<TResponse>) => boolean): this;
    /**
     * Make the API request and return the response.
     * This method executes all setup hooks, sends the request,
     * and runs all teardown hooks.
     *
     * @example
     * const response = await request.send()
     */
    send(): Promise<ApiResponse<TResponse>>;
    /**
     * Implementation of `then` for the promise API.
     * Allows ApiRequest to be used as a promise.
     *
     * @param resolve - The resolve callback
     * @param reject - The reject callback
     */
    then<TResult1 = ApiResponse<TResponse>, TResult2 = never>(resolve?: ((value: ApiResponse<TResponse>) => TResult1 | PromiseLike<TResult1>) | undefined | null, reject?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Implementation of `catch` for the promise API.
     * Allows ApiRequest to be used as a promise.
     *
     * @param reject - The reject callback
     */
    catch<TResult = never>(reject?: ((reason: ApiResponse<TResponse>) => TResult | PromiseLike<TResult>) | undefined | null): Promise<ApiResponse<TResponse> | TResult>;
    /**
     * Implementation of `finally` for the promise API.
     * Allows ApiRequest to be used as a promise.
     *
     * @param fullfilled - The callback to execute when the promise is settled
     */
    finally(fullfilled?: (() => void) | undefined | null): Promise<ApiResponse<TResponse>>;
    /**
     * Required when Promises are extended
     */
    get [Symbol.toStringTag](): string;
}
