import { createContext as createSingleton } from "unctx";
import { reactive, readonly } from "vue";
import { LogLevelEnum, useLogger } from "./logger";
import { IDeepReadonly, IDeepPartial, INullable } from "./types";
import { merge } from "./utils";

export interface IContext {
    get: () => IDeepReadonly<IContextState>;
    set: (newState: IDeepPartial<IContextState>) => void;
}

export interface IContextState {
    logLevel: LogLevelEnum;
}

const logger = useLogger();
const context = createSingleton<IContext>();

export function useContext(): IContext {
    const instance = context.use();
    if (!instance) {
        throw new Error("Context not initialized. Call createContext first.");
    }
    return instance;
}

let _contextState: INullable<IContextState> = null;

export function createContext(init: IDeepPartial<IContext> = {}): void {
    if (!!_contextState) {
        logger.warn("Context has already been created. Skipping re-creation.");
        return;
    }

    const defaultContext: IContextState = {
        logLevel: LogLevelEnum.DEBUG
    };

    _contextState = reactive(merge(defaultContext, init));

    context.set({
        get: () => readonly(_contextState!),
        set: (newState: IDeepPartial<IContextState>) => {
            if (!!_contextState) {
                merge(_contextState, newState);
            } else {
                logger.error("Context state not initialized. Call createContext first.");
            }
        }
    });
}
