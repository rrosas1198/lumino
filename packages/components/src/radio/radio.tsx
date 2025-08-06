import { useChoice, useRender } from "@lumino/kit";
import { computed, defineComponent, ref } from "vue";
import { buildRadioProps } from "./radio.props.js";

export const VRadio = defineComponent({
    name: "VRadio",
    emits: {
        click: (_event: MouseEvent) => true,
        change: (_value: boolean, _event: Event) => true
    },
    props: buildRadioProps(),
    setup(props, { emit, slots }) {
        const { model, trueValue } = useChoice(props as any);
        const native = ref<HTMLInputElement>();
        const isFocused = ref(false);
        const isInteractive = computed(() => !props.disabled && !props.readonly);

        const onInput = (event: Event) => {
            const target = event.target as HTMLInputElement;

            model.value = target.checked;
            emit("change", target.checked, event);
        };

        const _onClick = (event: MouseEvent) => {
            if (!isInteractive.value) return;
            native.value?.click();
            emit("click", event);
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                _onClick(event as any as MouseEvent);
            }
        };

        const onFocus = () => {
            if (!isInteractive.value) return;
            isFocused.value = true;
        };

        const onBlur = () => {
            isFocused.value = false;
        };

        useRender(() => {
            return (
                <div
                    id={props.id}
                    class={{
                        radio: true,
                        "radio--active": model.value,
                        "radio--focused": isFocused.value,
                        "radio--disabled": props.disabled
                    }}
                    onKeydown={onKeyDown}
                >
                    <div class="radio__control">
                        <input
                            ref={native}
                            id={`${props.id}_native`}
                            name={props.name}
                            class="radio__native"
                            autocomplete="off"
                            autofocus={props.autofocus}
                            disabled={props.disabled}
                            type="radio"
                            title={props.showLabel ? undefined : props.label}
                            value={trueValue.value}
                            aria-readonly={props.readonly}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onInput={onInput}
                        />

                        <div class="radio__dot" />
                    </div>

                    {props.showLabel && !!props.label && (
                        <label class="radio__label label" for={`${props.id}_native`}>
                            {slots.default ? slots.default() : props.label}
                        </label>
                    )}
                </div>
            );
        });

        return { model };
    }
});

export type VRadio = InstanceType<typeof VRadio>;
