import Macroable from '@poppinss/macroable';
import type { Assert } from '@japa/assert';
import { ApiRequest } from './request.js';
import { type SetupHandler, type TeardownHandler, type CookiesSerializer, type InferBody, type InferResponse, type InferQuery, type RoutesRegistry, type InferRouteBody, type InferRouteQuery, type InferRouteResponse, type InferRouteParams, type IsEmptyObject, type RouteBuilder } from './types.js';
/**
 * ApiClient provides a fluent interface for making HTTP requests in the context of testing.
 * It supports type-safe routing, custom serializers, and global hooks.
 *
 * @example
 * const client = new ApiClient('http://localhost:3000')
 * const response = await client.get('/users').send()
 */
export declare class ApiClient extends Macroable {
    #private;
    constructor(baseUrl?: string, assert?: Assert);
    /**
     * Remove all globally registered setup hooks.
     */
    static clearSetupHooks(): typeof ApiClient;
    /**
     * Remove all globally registered teardown hooks.
     */
    static clearTeardownHooks(): typeof ApiClient;
    /**
     * Clear all request handlers registered using the `onRequest` method.
     */
    static clearRequestHandlers(): typeof ApiClient;
    /**
     * Register a handler to be invoked every time a new request instance is created.
     *
     * @param handler - The callback to invoke with the request instance
     *
     * @example
     * ApiClient.onRequest((request) => {
     *   request.header('X-Custom', 'value')
     * })
     */
    static onRequest(handler: (request: ApiRequest) => void): typeof ApiClient;
    /**
     * Register a global setup hook that runs before every request.
     *
     * @param handler - The setup handler function
     *
     * @example
     * ApiClient.setup((request) => {
     *   request.header('Authorization', 'Bearer token')
     * })
     */
    static setup(handler: SetupHandler): typeof ApiClient;
    /**
     * Register a global teardown hook that runs after every request.
     *
     * @param handler - The teardown handler function
     *
     * @example
     * ApiClient.teardown((response) => {
     *   console.log('Response status:', response.status())
     * })
     */
    static teardown(handler: TeardownHandler): typeof ApiClient;
    /**
     * Register a custom cookies serializer for processing request and response cookies.
     *
     * @param serailizer - The cookies serializer implementation
     *
     * @example
     * ApiClient.cookiesSerializer({
     *   prepare: (key, value) => encrypt(value),
     *   process: (key, value) => decrypt(value)
     * })
     */
    static cookiesSerializer(serailizer: CookiesSerializer): typeof ApiClient;
    /**
     * Set a route builder for type-safe routing with named routes.
     *
     * @param routerBuilder - The route builder function
     *
     * @example
     * ApiClient.setRouteBuilder((name, params) => {
     *   return routes.make(name, params)
     * })
     */
    static setRouteBuilder(routerBuilder: RouteBuilder): typeof ApiClient;
    /**
     * Clear the configured route builder.
     */
    static clearRouteBuilder(): typeof ApiClient;
    /**
     * Create a new HTTP request instance for the given endpoint and method.
     *
     * @param endpoint - The endpoint or URL path
     * @param method - The HTTP method
     *
     * @example
     * const request = client.request('/users', 'GET')
     */
    request(endpoint: string, method: string): ApiRequest<any, any, any>;
    /**
     * Create a new GET request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.get('/users').send()
     */
    get<P extends string>(endpoint: P): ApiRequest<never, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a new POST request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.post('/users').json({ name: 'John' }).send()
     */
    post<P extends string>(endpoint: P): ApiRequest<InferBody<P>, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a new PUT request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.put('/users/1').json({ name: 'John' }).send()
     */
    put<P extends string>(endpoint: P): ApiRequest<InferBody<P>, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a new PATCH request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.patch('/users/1').json({ name: 'Jane' }).send()
     */
    patch<P extends string>(endpoint: P): ApiRequest<InferBody<P>, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a new DELETE request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.delete('/users/1').send()
     */
    delete<P extends string>(endpoint: P): ApiRequest<InferBody<P>, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a new HEAD request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.head('/users').send()
     */
    head<P extends string>(endpoint: P): ApiRequest<never, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a new OPTIONS request for the given endpoint.
     *
     * @param endpoint - The endpoint or URL path
     *
     * @example
     * const response = await client.options('/users').send()
     */
    options<P extends string>(endpoint: P): ApiRequest<never, InferResponse<P>, InferQuery<P>>;
    /**
     * Create a type-safe request using a named route from the registry.
     * The route name must be registered via `ApiClient.setRouteBuilder()`.
     *
     * @param args - The route name and optional parameters
     *
     * @example
     * const response = await client.visit('users.show', { id: '1' }).send()
     */
    visit<Name extends keyof RoutesRegistry>(...args: IsEmptyObject<InferRouteParams<Name>> extends true ? [name: Name] : [name: Name, params: InferRouteParams<Name>]): ApiRequest<InferRouteBody<Name>, InferRouteResponse<Name>, InferRouteQuery<Name>>;
}
