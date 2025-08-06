import { useChoice, useRender } from "@lumino/kit";
import { computed, defineComponent, ref } from "vue";
import { buildSwitchProps } from "./switch.props.js";

export const VSwitch = defineComponent({
    name: "VSwitch",
    emits: {
        change: (_value: boolean, _event: Event) => true
    },
    props: buildSwitchProps(),
    setup(props, { emit, slots }) {
        const { model, trueValue } = useChoice(props as any);

        const proxy = ref<HTMLInputElement>();
        const isFocused = ref(false);

        const isInteractive = computed(() => !props.disabled && !props.readonly);

        const onChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            model.value = target.checked;
            emit("change", target.checked, event);
        };

        const onBlur = () => {
            isFocused.value = false;
        };

        const onFocus = () => {
            if (!isInteractive.value) return;
            isFocused.value = true;
        };

        const onClick = () => {
            if (!isInteractive.value) return;
            proxy.value?.click();
        };

        useRender(() => (
            <div
                id={props.id}
                class={{
                    switch: true,
                    "switch--checked": model.value,
                    "switch--focused": isFocused.value,
                    "switch--disabled": props.disabled
                }}
            >
                <div class="switch__control">
                    <input
                        ref={proxy}
                        id={`${props.id}_native`}
                        name={props.name || `${props.id}_native`}
                        class="switch__native"
                        autocomplete="off"
                        autofocus={props.autofocus}
                        disabled={props.disabled}
                        checked={model.value}
                        title={props.showLabel ? undefined : props.label}
                        value={trueValue.value}
                        aria-checked={model.value}
                        aria-readonly={props.readonly}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        type="checkbox"
                        role="switch"
                    />

                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <div class="switch__track" onClick={onClick}>
                        <div class="switch__handle" />
                    </div>
                </div>

                {props.showLabel && (
                    <label class="switch__label label" for={props.name || `${props.id}_native`}>
                        {slots.label?.({}) || props.label}
                    </label>
                )}
            </div>
        ));

        return { model };
    }
});

export type VSwitch = InstanceType<typeof VSwitch>;
