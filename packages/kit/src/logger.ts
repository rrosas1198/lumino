import { MaybeRef, unref } from "vue";
import { isBrowser } from "./context";

export enum LogLevelEnum {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

const ANSI_RESET = "\x1b[0m";
const ANSI_CODES: Record<LogLevelEnum, string> = {
    [LogLevelEnum.DEBUG]: "\x1b[38;2;13;110;253m",  // #0d6efd
    [LogLevelEnum.INFO]:  "",                       // default terminal color
    [LogLevelEnum.WARN]:  "\x1b[38;2;255;193;7m",   // #ffc107
    [LogLevelEnum.ERROR]: "\x1b[38;2;220;52;70m"    // #dc3546
};

const BROWSER_STYLES: Record<LogLevelEnum, string> = {
    [LogLevelEnum.DEBUG]: "color: #0d6efd;",  
    [LogLevelEnum.INFO]:  "",                       // default browser color
    [LogLevelEnum.WARN]:  "color: #ffc107;", 
    [LogLevelEnum.ERROR]: "color: #dc3546;"
};

export function useLogger(namespace?: string, logLevel: MaybeRef<LogLevelEnum> = LogLevelEnum.DEBUG) {
    const debug = (...params: any[]) => _printLog(LogLevelEnum.DEBUG, params);
    const info = (...params: any[]) => _printLog(LogLevelEnum.INFO, params);
    const warn = (...params: any[]) => _printLog(LogLevelEnum.WARN, params);
    const error = (...params: any[]) => _printLog(LogLevelEnum.ERROR, params);

    const _printLog = (level: LogLevelEnum, params: any[]) => {
        if (!_shouldLog(level)) return;

        const name = level === LogLevelEnum.DEBUG ? "log" : LogLevelEnum[level].toLowerCase();
        const badge = !!namespace ? `[${namespace}] ` : "";
        const consola = Reflect.get(console, name) || console.log;

        if (isBrowser()) {
            consola(`%c${badge}${params[0]}`, BROWSER_STYLES[level], ...params.slice(1));
        } else {
            consola(`${ANSI_CODES[level]}${badge}${params[0]}${ANSI_RESET}`, ...params.slice(1));
        }
    };

    const _shouldLog = (level: LogLevelEnum) => {
        return level.valueOf() >= unref(logLevel).valueOf();
    }

    return { debug, info, warn, error };
}
