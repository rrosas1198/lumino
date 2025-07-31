import { type IItemResolved, debounce, equal, useItems, useRender } from "@lumino/kit";
import { type ComponentPublicInstance, Fragment, computed, defineComponent, nextTick, onMounted, ref, toRef, useModel } from "vue";
import { VField } from "../field";
import { VList, VListItem } from "../list";
import { VMenu } from "../menu";
import { SelectArrowDown } from "./select.icons";
import { buildSelectProps } from "./select.props";

export const VSelect = defineComponent({
    name: "VSelect",
    props: buildSelectProps(),
    inheritAttrs: false,
    setup(props, { attrs, emit, slots }) {
        const proxy = ref<HTMLInputElement>();
        const listRef = ref<VList>();
        const fieldRef = ref<ComponentPublicInstance>();

        const term = ref<string>("");

        const model = useModel(props, "modelValue");
        const opened = useModel(props, "opened");

        const { items } = useItems({
            items: toRef(props, "items"),
            itemTitle: toRef(props, "itemTitle"),
            itemSubtitle: toRef(props, "itemSubtitle"),
            itemHeading: toRef(props, "itemHeading"),
            itemDisabled: toRef(props, "itemDisabled"),
            itemValue: toRef(props, "itemValue"),
            returnObject: toRef(props, "returnObject")
        });

        const isEmpty = computed(() => {
            if (Array.isArray(model.value)) return model.value.length === 0;
            return model.value === undefined || model.value === null || model.value === "";
        });
        const filtered = computed(() => {
            if (!props.searchable) return items.value;
            const term_ = term.value.toUpperCase();
            return items.value.filter((item) => item.title?.toUpperCase().includes(term_));
        });

        const inputValue = computed(() => {
            if (opened.value && props.searchable) return term.value;
            return displayValue.value;
        });
        const displayValue = computed(() => {
            if (isEmpty.value) return "";

            if (props.multiple && Array.isArray(model.value)) {
                const selectedItems = items.value.filter(item => model.value.some((value: any) => equal(value, item.value)));
                if (selectedItems.length === 0) return "";
                if (selectedItems.length === 1) return selectedItems[0]?.title || "";
                return `${selectedItems.length} items selected`;
            } else {
                const selectedItem = items.value.find(item => equal(item.value, model.value));
                return selectedItem?.title || "";
            }
        });

        const open = () => {
            if (props.disabled) return;
            opened.value = true;

            if (props.searchable) {
                term.value = "";
            }
        };

        const close = () => {
            if (props.disabled) return;
            opened.value = false;
            term.value = "";
            nextTick(() => proxy.value?.focus());
        };

        const onClear = (event: Event) => {
            event.stopPropagation();
            model.value = props.multiple ? [] : undefined;
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (["Home", "End", "ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (["ArrowUp", "ArrowDown", "Enter", " "].includes(event.key)) {
                open();
            }
            if (["ArrowUp", "Home"].includes(event.key)) {
                nextTick(() => listRef.value?.focusLast());
            }
            if (["ArrowDown", "End"].includes(event.key)) {
                open();
                nextTick(() => listRef.value?.focusFirst());
            }
            if ("Escape" === event.key) {
                close();
            }
        };

        const onInput = debounce((event: Event) => {
            if (props.disabled) return;
            if (!props.searchable) return;
            const target = event.target as HTMLInputElement;
            if (!opened.value) {
                open();
            }
            term.value = target.value;
            emit("input", target.value, event);
        }, 150);

        const onSelect = (item: IItemResolved) => {
            if (item.disabled) return;

            if (props.multiple) {
                const current = Array.isArray(model.value) ? [...model.value] : [];
                const index = current.findIndex((selected) => equal(selected, item.value));

                if (index < 0) {
                    current.push(item.value);
                } else {
                    current.splice(index, 1);
                }

                model.value = current;
            } else {
                model.value = item.value;
                close();
            }
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
                    class="select__native input"
                    type="text"
                    value={inputValue.value}
                    disabled={props.disabled}
                    readonly={props.readonly || !props.searchable}
                    required={props.required}
                    placeholder={isEmpty.value ? props.placeholder : ""}
                    autocomplete={props.autocomplete ? "on" : "off"}
                    aria-invalid={props.invalid}
                    aria-expanded={opened.value}
                    aria-haspopup="listbox"
                    aria-labelledby={`${props.id}_field_label`}
                    onInput={onInput}
                    onKeydown={onKeydown}
                />
            );

            const _renderListItem = (item: IItemResolved) => {
                const slotPrepend = slots["item-prepend"];
                const slotAppend = slots["item-append"];
                const slotTitle = slots["item-title"];
                const slotSubtitle = slots["item-subtitle"];
                const slotHeading = slots["item-heading"];

                const isSelected = props.multiple 
                    ? Array.isArray(model.value) && model.value.some((val: any) => equal(val, item.value))
                    : equal(model.value, item.value);

                return (
                    <VListItem
                        key={JSON.stringify(item.value)}
                        value={item.value}
                        title={item.title}
                        subtitle={item.subtitle}
                        heading={item.heading}
                        disabled={item.disabled}
                        selected={isSelected}
                        onClick={() => onSelect(item)}
                        v-slots={{
                            prepend: slotPrepend ? (slotProps: any) => slotPrepend?.({ item: item.raw, ...slotProps }) : undefined,
                            append: slotAppend ? (slotProps: any) => slotAppend?.({ item: item.raw, ...slotProps }) : undefined,
                            title: slotTitle ? () => slotTitle?.({ item: item.raw }) : undefined,
                            subtitle: slotSubtitle ? () => slotSubtitle?.({ item: item.raw }) : undefined,
                            heading: slotHeading ? () => slotHeading?.({ item: item.raw }) : undefined,
                            default: slots.item ? () => slots.item?.({ item: item.raw }) : undefined
                        }}
                    />
                );
            };

            const _renderMessage = () => <div class="message">{props.errorMessage}</div>;

            return (
                <Fragment>
                    <div
                        id={props.id}
                        class={{
                            "select": true,
                            "select--opened": opened.value
                        }}
                    >
                        <VField
                            ref={fieldRef}
                            id={`${props.id}_field`}
                            label={props.label}
                            class="select"
                            focused={!isEmpty.value || opened.value || !!props.placeholder}
                            invalid={props.invalid}
                            disabled={props.disabled}
                            {...attrs}
                            v-slots={{
                                ...slots,
                                default: () => _renderInput(),
                                append: () => SelectArrowDown()
                            }}
                        />
                        {!props.hideMessage && _renderMessage()}
                    </div>

                    <VMenu
                        id={`${props.id}_menu`}
                        class="select-menu"
                        activator={fieldRef.value}
                        matchWidth={true}
                        modelValue={opened.value}
                        onUpdate:modelValue={(value) => { opened.value = value; }}
                    >
                        <VList
                            selectable
                            ref={listRef}
                            multiple={props.multiple}
                            modelValue={model.value}
                            onUpdate:modelValue={(value) => { model.value = value; }}
                        >
                            {filtered.value.length > 0
                                ? filtered.value.map((item) => _renderListItem(item))
                                : <div class="message">No hay items disponibles</div>
                            }
                        </VList>
                    </VMenu>
                </Fragment>
            );
        });

        return { open, close };
    }
});

export type VSelect = InstanceType<typeof VSelect>;
