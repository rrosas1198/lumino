import { LogLevelEnum } from "./logger.enum";

export const ANSI_RESET = "\x1b[0m";
export const ANSI_CODES: Record<LogLevelEnum, string> = {
    [LogLevelEnum.DEBUG]: "\x1b[38;2;13;110;253m", // #0d6efd
    [LogLevelEnum.INFO]: "", // default terminal color
    [LogLevelEnum.WARN]: "\x1b[38;2;255;193;7m", // #ffc107
    [LogLevelEnum.ERROR]: "\x1b[38;2;220;52;70m", // #dc3546
    [LogLevelEnum.TRACE]: "",
    [LogLevelEnum.SILENT]: ""
};

export const BROWSER_STYLES: Record<LogLevelEnum, string> = {
    [LogLevelEnum.DEBUG]: "color: #0d6efd;",
    [LogLevelEnum.INFO]: "", // default browser color
    [LogLevelEnum.WARN]: "color: #ffc107;",
    [LogLevelEnum.ERROR]: "color: #dc3546;",
    [LogLevelEnum.TRACE]: "",
    [LogLevelEnum.SILENT]: ""
};
