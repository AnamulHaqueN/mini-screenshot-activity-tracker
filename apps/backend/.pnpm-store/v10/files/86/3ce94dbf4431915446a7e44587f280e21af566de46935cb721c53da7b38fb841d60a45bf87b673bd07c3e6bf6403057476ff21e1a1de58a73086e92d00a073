import type Hooks from '@poppinss/hooks';
import { type Suite } from './main.ts';
import { type Emitter } from '../emitter.ts';
import type { SuiteHooks } from '../types.ts';
/**
 * Run all groups or tests inside the suite stack
 */
export declare class SuiteRunner {
    #private;
    /**
     * Know if any of the tests/hooks have failed
     */
    get failed(): boolean;
    constructor(suite: Suite<any>, hooks: Hooks<SuiteHooks<Record<any, any>>>, emitter: Emitter, options: {
        bail: boolean;
    });
    /**
     * Run the test
     */
    run(): Promise<void>;
}
