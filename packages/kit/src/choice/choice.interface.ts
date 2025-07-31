import type { IArrayable, INullable } from "src/types";

export type IChoiceValue = INullable<IArrayable<string | number | boolean | object>>;
