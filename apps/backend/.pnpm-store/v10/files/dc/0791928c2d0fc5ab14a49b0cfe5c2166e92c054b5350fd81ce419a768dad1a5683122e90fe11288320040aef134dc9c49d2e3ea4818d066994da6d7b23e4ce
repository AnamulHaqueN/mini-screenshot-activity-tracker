import type Hooks from '@poppinss/hooks';
import { type Test } from './main.ts';
import { type Emitter } from '../emitter.ts';
import type { TestEndNode, TestHooks } from '../types.ts';
/**
 * Dummy test runner that just emits the required events
 */
export declare class DummyRunner {
    #private;
    /**
     * Know if the test has failed
     */
    get failed(): boolean;
    constructor(test: Test<any, any>, emitter: Emitter);
    /**
     * Run test
     */
    run(): void;
}
/**
 * Run an instance of test
 */
export declare class TestRunner {
    #private;
    /**
     * Know if the test has failed
     */
    get failed(): boolean;
    constructor(test: Test<any, any>, hooks: Hooks<TestHooks<Record<any, any>>>, emitter: Emitter, callbacks: {
        executing: ((test: Test<any, any>) => void)[];
        executed: ((test: Test<any, any>, hasError: boolean, errors: TestEndNode['errors']) => void)[];
    }, debuggingError: Error | null, datasetCurrentIndex?: number);
    /**
     * Reset test timeout. The timeout will be removed, if
     * no duration value is provided
     */
    resetTimeout(duration?: number): void;
    /**
     * Run the test
     */
    run(): Promise<void>;
}
