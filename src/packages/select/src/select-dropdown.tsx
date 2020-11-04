import {
  computed, defineComponent, inject, onMounted,
} from 'vue'
import { selectKey } from './token'

export default defineComponent({
  name: 'DSelectDropdown',
  componentName: 'DSelectDropdown',
  setup(props, ctx) {
    const { default: default_ } = ctx.slots
    const select = inject(selectKey)
    const popperClass = computed(() => select?.props.popperClass)
    const isMultiple = computed(() => select?.props.multiple)
    const minWidth = computed(() => `${select?.selectWrapper.getBoundingClientRect().width}px`)
    const dropDownstyle = {
      minWidth,
    }
    onMounted(() => {
      // TODO updatePoper
    })

    return () => {
      <div
        class={['d-select-dropdown', { 'is-multiple': isMultiple }, popperClass]}
        // style={dropDownstyle}
      >
        {/* <slot></slot> */}
        {/* {default_ ** default_()} */}
      </div>
    }
  },
})
