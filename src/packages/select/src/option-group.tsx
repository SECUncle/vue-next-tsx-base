import {
  defineComponent, inject, provide, ref, reactive, toRefs,
} from 'vue'
import option from './option'
import { selectGroupKey, selectKey } from './token'

export default defineComponent({
  name: 'DOptionGroup',
  componentName: 'DOptionGroup',
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const visible = ref(true)
    const { default: default_ } = ctx.slots

    provide(
      selectGroupKey,
      reactive({
        ...toRefs(props),
      }),
    )
    const select = inject(selectKey)
    // const queryChange = () => {
    //   visible.value = select?.options?.some(option => option.visible === true);
    // };
    // select.selectEmitter.on(selectEvents.groupQueryChange, queryChange);
    return () => {
      visible && (
        <ul class="d-select-group__wrap">
          {/* <li class="d-select-group__title">{ label }</li> */}
          <li>
            <ul class="d-select-group">
              {/* <slot></slot> */}
              {default_ && default_()}
            </ul>
          </li>
        </ul>
      )
    }
  },
})
