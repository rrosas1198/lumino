import type { Ref } from "vue";
import { computed, onScopeDispose, ref, watchEffect } from "vue";
import { useCurrentInstance } from "./instance.composable";
import { useToggleScope } from "./toggle-scope.composable";

const _stack = new Array<[number, number, number]>();
const _current = ref(0);

// FIXME: isLast no change -> watchEffect is disposed?
export function useStack(isActive: Ref<boolean>, defaultValue: number) {
    const _instance = useCurrentInstance("overlay");

    const isLast = ref(true);
    const zIndex = ref(defaultValue);

    const _updateCurrent = () => {
        const [_, __, _index] = _stack.at(_stack.length - 1) || [];
        const lastIndex = _index ?? defaultValue;
        _current.value = lastIndex;
    };

    useToggleScope(isActive, () => {
        const [_, __, lastIndex] = _stack.at(_stack.length - 1) || [];

        zIndex.value = lastIndex ? lastIndex + 10 : defaultValue;

        const _item: [number, number, number] = [_instance.uid, _stack.length, zIndex.value];
        _stack.push(_item);
        _updateCurrent();

        onScopeDispose(() => {
            const index = _stack.indexOf(_item);
            _stack.splice(index, 1);
            _updateCurrent();
        });
    });

    watchEffect(() => {
        const isTop = _stack.at(_stack.length - 1)?.[0] === _instance.uid;
        setTimeout(() => {
            isLast.value = isTop;
        }, 0);
        _updateCurrent();
    });

    return {
        isLast,
        current: _current,
        zIndex: computed(() => zIndex.value)
    };
}
