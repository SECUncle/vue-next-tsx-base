import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DSelect',
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
  setup(props, ctx) {
    return {

    }
  },
})
