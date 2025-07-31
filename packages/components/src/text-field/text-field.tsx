import { useRender } from "@lumino/kit";
import { defineComponent, onMounted, ref, useModel } from "vue";
import { VField } from "../field";
import { buildTextFieldProps } from "./text-field.props";

export const VTextField = defineComponent({
    name: "VTextField",
    props: buildTextFieldProps(),
    emits: {
        input: (_value: string, _event: Event) => true
    },
    setup(props, { emit, slots }) {
        const proxy = ref<HTMLInputElement>();
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

            const _renderMessage = () => <div class="message">{props.errorMessage}</div>;

            return (
                <div id={props.id} class="text-field">
                    <VField
                        id={`${props.id}_field`}
                        label={props.label}
                        focused={!!model.value || !!props.placeholder}
                        invalid={props.invalid}
                        disabled={props.disabled}
                        v-slots={{
                            ...slots,
                            default: () => _renderInput()
                        }}
                    />
                    {!props.hideMessage && _renderMessage()}
                </div>
            );
        });

        return {};
    }
});

export type VTextField = InstanceType<typeof VTextField>;
