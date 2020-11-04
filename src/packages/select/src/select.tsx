import { defineComponent, toRefs, Ref } from 'vue'

export default defineComponent({
  name: 'd-select',
  componentName: 'DSelect',
  props: {
    name: String,
    id: String,
    modelValue: [Array, String, Number],
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  emits: ['clear', 'focus', 'blur'],
  setup(props) {
    const { multiple } = toRefs(props)
    return () => (
      <div
        class={[
          'd-select',
          // {
          //   selectSize ? 'd-select--' + selectSize : ''
          // }
        ]}
      >
        {multiple && <div class={['d-select__tags']}></div>}

        <d-tag disableTransitions></d-tag>
      </div>
    )
  },
})
