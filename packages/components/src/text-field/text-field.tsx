import { defineComponent, Fragment, onMounted, useModel, useTemplateRef } from "vue";
import { buildTextFieldProps } from "./text-field.props";
import { useRender } from "@lumino/kit";
import { VField } from "src/field";

export const VTextField = defineComponent({
    name: "VTextField",
    props: buildTextFieldProps(),
    emits: {
        "input": (_value: string, _event: Event) => void 0,
        "update:modelValue": (_value: string) => void 0
    },
    setup(props, { emit, slots }) {
        const model = useModel(props, "modelValue");
        const proxy = useTemplateRef<HTMLElement>("proxy");

        const onInput = (event: Event) => {
            if (props.disabled) return;
            const target = event.target as HTMLInputElement;
            model.value = target.value;
            emit("input", target.value, event);
        };

        onMounted(() => {
            if (props.autofocus) {
                proxy.value?.focus();
            }
        });

        useRender(() => {
            const _renderInput = () => (
                <input
                    ref={proxy}
                    id={`${props.id}_native`}
                    name={`${props.id}_native`}
                    class="text-field__native input"
                    type={props.type}
                    value={model.value}
                    disabled={props.disabled}
                    readonly={props.readonly}
                    required={props.required}
                    inputmode={props.inputMode}
                    placeholder={props.placeholder}
                    autocomplete={props.autocomplete ? "on" : "off"}
                    aria-invalid={props.invalid}
                    aria-labelledby={`${props.id}_field_label`}
                    onInput={onInput}
                />
            );

            const _renderMessage = () => (
                <div class="message">{props.errorMessage}</div>
            );

            return (
                <div id={props.id} class="text-field">
                    <VField id={`${props.id}_field`} label={props.label}>
                        {{
                            ...slots,
                            default: () => {
                                <Fragment>
                                    {_renderInput()}
                                    {!props.hideMessage && _renderMessage()}
                                </Fragment>
                            }
                        }}
                    </VField>
                </div>
            );
        });

        return {};
    }
});
