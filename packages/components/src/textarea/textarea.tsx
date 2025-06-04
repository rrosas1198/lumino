import { useRender } from "@lumino/kit";
import { VField } from "src/field";
import { defineComponent, onMounted, ref, useModel } from "vue";
import { buildTextareaProps } from "./textarea.props";

export const VTextarea = defineComponent({
    name: "VTextarea",
    props: buildTextareaProps(),
    emits: {
        "input": (_value: string, _event: Event) => void 0
    },
    setup(props, { emit, slots }) {
        const proxy = ref<HTMLElement>();
        const model = useModel(props, "modelValue");

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
            const _renderTextarea = () => (
                <textarea
                    ref={proxy}
                    id={`${props.id}_native`}
                    name={`${props.id}_native`}
                    class="textarea__native input"
                    value={model.value}
                    rows={props.rows}
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
                <div id={props.id} class="textarea">
                    <VField
                        id={`${props.id}_field`}
                        label={props.label}
                        focused={!!model.value}
                        disabled={props.disabled}
                        invalid={props.invalid}
                    >
                        {/* {{
                            ...slots,
                            default: () => {
                                <Fragment>
                                    {_renderTextarea()}
                                    {!props.hideMessage && _renderMessage()}
                                </Fragment>
                            }
                        }} */}

                        {_renderTextarea()}
                    </VField>

                    {!props.hideMessage && _renderMessage()}
                </div>
            );
        });

        return {};
    }
});

export type VTextarea = InstanceType<typeof VTextarea>;
