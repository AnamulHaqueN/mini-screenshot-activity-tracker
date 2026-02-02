import { type ApiRequest } from './request.js';
import { type ApiResponse } from './response.js';
/**
 * Convert error stack string to an error object.
 *
 * It is an expirement to use server error stack and convert
 * it to an actual error object.
 *
 * @param errorStack - The error stack string or any value to process
 */
export declare function stackToError(errorStack: any): string | Error;
/**
 * Default implementation to print request errors.
 * Attempts to convert error stack to an error object when status >= 500.
 *
 * @param response - The API response to dump errors from
 *
 * @example
 * dumpResponseError(response)
 */
export declare function dumpResponseError(response: ApiResponse): void;
/**
 * Default implementation to log request cookies.
 * Outputs the cookies jar to the console.
 *
 * @param request - The API request containing cookies to dump
 *
 * @example
 * dumpRequestCookies(request)
 */
export declare function dumpRequestCookies(request: ApiRequest): void;
/**
 * Default implementation to log response cookies.
 * Outputs the response cookies to the console.
 *
 * @param response - The API response containing cookies to dump
 *
 * @example
 * dumpResponseCookies(response)
 */
export declare function dumpResponseCookies(response: ApiResponse): void;
/**
 * Default implementation to log request headers.
 * Outputs the request headers to the console.
 *
 * @param request - The API request containing headers to dump
 *
 * @example
 * dumpRequestHeaders(request)
 */
export declare function dumpRequestHeaders(request: ApiRequest): void;
/**
 * Default implementation to log response headers.
 * Outputs the response headers to the console.
 *
 * @param response - The API response containing headers to dump
 *
 * @example
 * dumpResponseHeaders(response)
 */
export declare function dumpResponseHeaders(response: ApiResponse): void;
/**
 * Default implementation to log request body.
 * Outputs the request body data to the console.
 *
 * @param request - The API request containing body to dump
 *
 * @example
 * dumpRequestBody(request)
 */
export declare function dumpRequestBody(request: ApiRequest): void;
/**
 * Default implementation to log response body.
 * Outputs the response body, text, and files to the console.
 * Skips body output for server errors (status >= 500).
 *
 * @param response - The API response containing body to dump
 *
 * @example
 * dumpResponseBody(response)
 */
export declare function dumpResponseBody(response: ApiResponse): void;
/**
 * Default implementation to log request.
 * Outputs the request method, endpoint, and query string to the console.
 *
 * @param request - The API request to dump
 *
 * @example
 * dumpRequest(request)
 */
export declare function dumpRequest(request: ApiRequest): void;
/**
 * Default implementation to log response.
 * Outputs the response status to the console.
 *
 * @param response - The API response to dump
 *
 * @example
 * dumpResponse(response)
 */
export declare function dumpResponse(response: ApiResponse): void;
