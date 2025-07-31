import { type UnwrapRef, shallowRef } from "vue";
import { LogLevelEnum } from "./logger";

export type ConfigProvider = UnwrapRef<typeof ConfigProvider>;

export const ConfigProvider = shallowRef({
    locale: window?.navigator.language || "es-PE",
    logLevel: LogLevelEnum.DEBUG,
    timezone: window?.Intl.DateTimeFormat().resolvedOptions()?.timeZone || "America/Lima"
});
