import type { IDeepPartial, IDeepReadonly, INullable } from "@lumino/kit";
import { LogLevelEnum, merge, useLogger } from "@lumino/kit";
import { createContext } from "unctx";
import { reactive, readonly } from "vue";

export interface ILuminoContext {
    get: () => IDeepReadonly<ILuminoState>;
    set: (newState: IDeepPartial<ILuminoState>) => void;
}

export interface ILuminoState {
    logLevel: LogLevelEnum;
}

const logger = useLogger();
const luminoContext = createContext<ILuminoContext>();

export function useLumino(): ILuminoContext {
    const context = luminoContext.use();
    if (!context) {
        throw new Error('useLumino must be used within a LuminoProvider');
    }
    return context;
}

let _luminoState: INullable<ILuminoState> = null;

export function createLumino(init: IDeepPartial<ILuminoContext> = {}): void {
    if (!!_luminoState) {
        logger.warn("Lumino context has already been created. Skipping re-creation.");
        return;
    }

    const defaultContext: ILuminoState = {
        logLevel: LogLevelEnum.DEBUG
    };

    _luminoState = reactive(merge(defaultContext, init));

    luminoContext.set({
        get: () => readonly(_luminoState!),
        set: (newState: IDeepPartial<ILuminoState>) => {
            if (!!_luminoState) {
                merge(_luminoState, newState);
            } else {
                logger.error("Lumino context state not initialized. Call createLumino first.");
            }
        }
    });
}
