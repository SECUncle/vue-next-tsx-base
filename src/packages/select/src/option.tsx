import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  reactive,
  toRefs,
} from 'vue'
// import { useOption } from './useOption'

export default defineComponent({
  name: 'DOption',
  componentName: 'DOption',
  props: {
    value: {
      required: true,
      type: [String, Number, Object],
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { default: default_ } = ctx.slots
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false,
    })

    // const {
    //   currentLabel,
    //   itemSelected,
    //   isDisabled,
    //   select,
    //   hoverItem
    // } = useOption(props, states);

    // const { visible, hover } = toRefs(states);
    // const vm = getCurrentInstance()?.proxy;
    // onBeforeUnmount(() => {
    //   const { selected } = select;
    //   const selectedOptions = select.props.multiple ? selected : [selected];
    //   const index = select.cachedOptions.indexOf(vm);
    //   const selectedIndex = selectedOptions?.indexOf(vm);
    //   if (index > -1 && selectedIndex < 0) {
    //     select?.cachedOptions.splice(index, 1);
    //   }
    //   select?.onOptionDestroy(
    //     select.options.map(item => item.value).indexOf(props.value)
    //   );
    // });

    // select?.options.push(vm);
    // select?.cachedOptions.push(vm);
    // function selectOptionClick() {
    //   if (props.disabled !== true && states.groupDisabled !== true) {
    //     select?.handleOptionSelect(vm, true);
    //   }
    // }
    return () => {
      // visible && (
      <li
        // class={[
        //   'd-select-dropdown__item',
        //   {
        //     selected: itemSelected,
        //     'is-disabled': isDisabled,
        //     hover,
        //   },
        // ]}
        // onMouseenter={hoverItem}
        // @click.stop="selectOptionClick"
      >
        {/* {default_ && default_() && <span>{currentLabel}</span>} */}
      </li>
      // )
    }
  },
})
