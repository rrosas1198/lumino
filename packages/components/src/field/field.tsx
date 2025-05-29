import { defineComponent, useModel } from "vue";
import { buildFieldProps } from "./field.props";
import { useRender } from "@lumino/kit";

export const VField = defineComponent({
    name: "VField",
    props: buildFieldProps(),
    setup(props, { slots }) {
        const focused = useModel(props, "focused");
        const invalid = useModel(props, "invalid");
        const disabled = useModel(props, "disabled");

        useRender(() => {
            const hasPrepend = typeof slots.prepend === "function";
            const hasAppend = typeof slots.append === "function";

            const _renderPrepend = () => (
                <div class="field__prepend">{slots.prepend?.({})}</div>
            );

            const _renderAppend = () => (
                <div class="field__append">{slots.append?.({})}</div>
            );

            const _renderLabel = () => (
                <label id={`${props.id}_label`} for={props.name || props.id} class="field__label">
                    {slots.label?.({}) || props.label}
                </label>
            );

            return (
                <div
                    id={props.id}
                    class={{
                        "field": true,
                        "field--focused": focused.value,
                        "field--invalid": invalid.value ?? false,
                        "field--disabled": disabled.value ?? false
                    }}
                >
                    <div class="field__content">
                        {hasPrepend && _renderPrepend()}
                        <div class="field__control">{slots.default?.({})}</div>
                        {hasAppend && _renderAppend()}
                    </div>

                    <div class="field__outline">
                        <div class="field__outline-prepend" />
                        <div class="field__outline-notch">{_renderLabel()}</div>
                        <div class="field__outline-append" />
                    </div>
                </div>
            );
        });

        return {};
    }
});
