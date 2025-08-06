import type { IArrayable, INullable } from "src/types/global.type.js";

export type IChoiceValue = INullable<IArrayable<string | number | boolean | object>>;
