import type Hooks from '@poppinss/hooks';
import { type Group } from './main.ts';
import { type Emitter } from '../emitter.ts';
import type { GroupHooks } from '../types.ts';
/**
 * Run all tests for a given group
 */
export declare class GroupRunner {
    #private;
    /**
     * Know if any of the tests/hooks have failed
     */
    get failed(): boolean;
    constructor(group: Group<any>, hooks: Hooks<GroupHooks<Record<any, any>>>, emitter: Emitter, options: {
        bail: boolean;
    });
    /**
     * Run the test
     */
    run(): Promise<void>;
}
