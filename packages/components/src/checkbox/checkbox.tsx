import type { ISelectionControlValue } from "@lumino/kit";
import { useRender, useSelectionControl } from "@lumino/kit";
import { computed, defineComponent, ref, useModel } from "vue";
import { buildCheckboxProps } from "./checkbox.props";

export const VCheckbox = defineComponent({
    name: "VCheckbox",
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    emits: {
        click: (_event: MouseEvent) => void 0,
        change: (_value: ISelectionControlValue, _event: Event) => void 0,
        "update:modelValue": (_value: boolean, _event: Event) => void 0,
        "update:indeterminate": (_value: boolean, _event: Event) => void 0
    },
    props: buildCheckboxProps(),
    setup(props, { emit, slots }) {
        const { model, value } = useSelectionControl(props as any);

        const proxy = ref<HTMLInputElement>();
        const indeterminate = useModel(props, "indeterminate");

        const focused = ref(false);

        const isInteractive = computed(() => !props.disabled && !props.readonly);

        const onInput = (event: Event) => {
            const target = event.target as HTMLInputElement;
            model.value = target.checked;
            emit("change", target.checked, event);
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                _onClick(event as any as MouseEvent);
            }
        };

        const onFocus = () => {
            if (!isInteractive.value) return;
            focused.value = true;
        };

        const onBlur = () => {
            focused.value = false;
        };

        const _onClick = (event: MouseEvent) => {
            if (!isInteractive.value) return;
            proxy.value?.click();
            emit("click", event);
        };

        useRender(() => {
            const ariaChecked = indeterminate.value ? "mixed" : model.value;

            const _renderLabel = () => (
                <label
                    id={`${props.id}_label`}
                    class={["checkbox__label", !slots.default && "label"]}
                    for={props.name || `${props.id}_native`}
                >
                    {slots.default?.({}) || props.label}
                </label>
            );

            return (
                <div
                    id={props.id}
                    class={{
                        checkbox: true,
                        "checkbox--checked": model.value,
                        "checkbox--focused": focused.value,
                        "checkbox--disabled": props.disabled,
                    }}
                    onKeydown={onKeyDown}
                >
                    <div class="checkbox__control">
                        <input
                            ref={proxy}
                            id={`${props.id}_native`}
                            name={props.name || `${props.id}_native`}
                            class="checkbox__native"
                            autocomplete="off"
                            autofocus={props.autofocus}
                            disabled={props.disabled}
                            checked={model.value}
                            type="checkbox"
                            title={props.showLabel ? undefined : props.label}
                            value={value.value}
                            indeterminate={indeterminate.value}
                            aria-checked={ariaChecked}
                            aria-readonly={props.readonly}
                            data-indeterminate={indeterminate.value}
                            onInput={onInput}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />

                        <div class="checkbox__background">
                            <div class="checkbox__check-mark">
                                {/* {CheckboxCheckMark()} */}
                            </div>
                            <div class="checkbox__mixed-mark" />
                        </div>
                    </div>

                    {props.showLabel && _renderLabel()}
                </div>
            );
        });

        return { model };
    }
});

export type VCheckbox = InstanceType<typeof VCheckbox>;
