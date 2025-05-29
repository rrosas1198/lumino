import type { ISelectionControlProps } from "./selection-control.props";
import type { ISelectionControlValue } from "./selection-control.interface";
import { computed, useModel } from "vue";
import { equal } from "src/utils";

export function useSelectionControl(props: ISelectionControlProps) {
    const modelValue = useModel(props, "modelValue");

    const trueValue = computed(() => {
        if (props.trueValue !== undefined) return props.trueValue;
        return props.value !== undefined ? props.value : true;
    });

    const falseValue = computed(() => {
        return props.falseValue !== undefined ? props.falseValue : false;
    });

    const value = computed(() => (model.value ? trueValue.value : falseValue.value));

    const model = computed({
        get: () => {
            return Array.isArray(modelValue.value)
                ? modelValue.value.some((value) => equal(value, trueValue.value))
                : equal(modelValue.value, trueValue.value);
        },
        set: (value: boolean) => {
            if (props.readonly) return;

            const current = value ? trueValue.value : falseValue.value;
            const newValue = _getSetterValue(current);
            modelValue.value = newValue as any;
        }
    });

    const _getSetterValue = (value: ISelectionControlValue) => {
        if (!Array.isArray(modelValue.value)) return value;

        return value
            ? [..._getModelValue(modelValue.value), value]
            : _getModelValue(modelValue.value).filter((item) => !equal(item, trueValue.value));
    };

    const _getModelValue = (value: ISelectionControlValue) => {
        if (Array.isArray(value)) return value;
        return value === null || value === undefined ? [] : [value];
    };

    return { trueValue, falseValue, model, value, modelValue };
}
