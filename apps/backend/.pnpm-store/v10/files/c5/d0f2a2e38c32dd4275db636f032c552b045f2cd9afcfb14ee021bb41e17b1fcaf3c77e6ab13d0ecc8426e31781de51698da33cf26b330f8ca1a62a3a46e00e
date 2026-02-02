import type { PluginFn } from '@japa/runner/types';
import { ApiClient } from './src/client.js';
import type { ApiClientPluginOptions } from './src/types.js';
export { ApiClient };
export { ApiRequest } from './src/request.js';
export { ApiResponse } from './src/response.js';
/**
 * API client plugin registers an HTTP request client that
 * can be used for testing API endpoints.
 */
export declare function apiClient(options?: string | ApiClientPluginOptions): PluginFn;
declare module '@japa/runner/core' {
    interface TestContext {
        client: ApiClient;
    }
}
