import { isBrowser, isDevelopment } from "src/environment";
import { ANSI_CODES, ANSI_RESET, BROWSER_STYLES } from "./logger.constants";
import { LogLevelEnum } from "./logger.enum";

export const globalLogLevel = LogLevelEnum.SILENT;

export function useLogger(namespace?: string, level?: LogLevelEnum) {
    let logLevel = level ?? globalLogLevel;

    const _print = (level: LogLevelEnum, method: keyof Console, params: string[]) => {
        if (level < logLevel) return;
        const badge = namespace ? `[${namespace}] ` : "";

        if (isBrowser) {
            (console as any)[method](`%c${badge}${params[0]}`, BROWSER_STYLES[level], ...params.slice(1));
        } else {
            (console as any)[method](`${ANSI_CODES[level]}${badge}${params[0]}${ANSI_RESET}`, ...params.slice(1));
        }
    };

    if (isDevelopment && level) {
        logLevel = level;
    }

    return {
        get logLevel() {
            return logLevel ?? globalLogLevel;
        },
        log(message: string, ...params: any[]): void {
            _print(LogLevelEnum.INFO, "log", [message, ...params]);
        },
        trace(message: string, ...params: any[]): void {
            _print(LogLevelEnum.TRACE, "debug", [message, ...params]);
        },
        debug(message: string, ...params: any[]): void {
            _print(LogLevelEnum.DEBUG, "debug", [message, ...params]);
        },
        warn(message: string, ...params: any[]): void {
            _print(LogLevelEnum.WARN, "warn", [message, ...params]);
        },
        error(message: string, ...params: any[]): void {
            _print(LogLevelEnum.ERROR, "error", [message, ...params]);
        },
        setLevel(level: LogLevelEnum): void {
            logLevel = level;
        }
    };
}
