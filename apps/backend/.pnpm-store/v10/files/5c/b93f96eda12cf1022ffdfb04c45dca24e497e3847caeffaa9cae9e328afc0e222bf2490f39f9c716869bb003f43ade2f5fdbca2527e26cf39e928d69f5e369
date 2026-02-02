import Emittery from 'emittery';
import { type RunnerEvents } from './types.ts';
/**
 * Runner emitter
 */
export declare class Emitter extends Emittery<RunnerEvents> {
    #private;
    /**
     * Define onError handler invoked when `emit` fails
     */
    onError(errorHandler: (error: any) => void | Promise<void>): void;
    /**
     * Emit event
     */
    emit<Name extends keyof RunnerEvents>(eventName: Name, eventData?: RunnerEvents[Name], allowMetaEvents?: boolean): Promise<void>;
}
