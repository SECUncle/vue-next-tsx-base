import {
  defineComponent,
  inject,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  ref,
  shallowRef,
  onMounted,
  onUpdated,
  toRefs,
} from 'vue'
import { useAttrs } from '@/packages/hooks'
import { UPDATE_MODEL_EVENT, VALIDATE_STATE_MAP } from '@/packages/utils/constants'
import { isObject, useGlobalConfig } from '@/packages/utils/util'
import isServer from '@/packages/utils/isServer'
import { isKorean } from '@/packages/utils/isDef'
import { isValidComponentSize } from '@/packages/utils/validators'
import { elFormKey, elFormItemKey } from '@/packages/form/src/token'

import type { PropType } from 'vue'
import type { ElFormContext, ElFormItemContext } from '@/packages/form/src/token'
import calcTextareaHeight from './calcTextareaHeight'

type AutosizeProp = {
  minRows?: number
  maxRows?: number
} | boolean

const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend',
}
export default defineComponent({
  name: 'ElInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    size: {
      type: String,
      validator: isValidComponentSize,
    },
    resize: {
      type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
      validator: (val: string) => ['none', 'both', 'horizontal', 'vertical'].includes(val),
    },
    autosize: {
      type: [Boolean, Object] as PropType<AutosizeProp>,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator: (val: string) => ['on', 'off'].includes(val),
    },
    form: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    tabindex: {
      type: String,
      default: '',
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },

  emits: [UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear',
    'mouseleave', 'mouseenter', 'keydown'],
  setup(props, ctx) {
    const {
      prefixIcon, clearable, showPassword, suffixIcon,
    } = toRefs(props)
    const instance = getCurrentInstance()
    const attrs = useAttrs(true)
    const $ElEMENT = useGlobalConfig()

    const elForm = inject(elFormKey, {} as ElFormContext)
    const elFormItem = inject(elFormItemKey, {} as ElFormItemContext)

    const input = ref(null)
    const textarea = ref(null)
    const focused = ref(false)
    const hovering = ref(false)
    const isComposing = ref(false)
    const passwordVisible = ref(false)
    const _textareaCalcStyle = shallowRef({})

    const inputOrTextarea = computed(() => input.value || textarea.value)
    const inputSize = computed(() => props.size || elFormItem.size || $ElEMENT.size)
    const needStatusIcon = computed(() => elForm.statusIcon)
    const validateState = computed(() => elFormItem.validateState || '')
    const validateIcon = computed(() => VALIDATE_STATE_MAP[validateState.value])
    const textareaStyle = computed(() => ({
      ..._textareaCalcStyle.value,
      resize: props.resize,
    }))
    const inputDisabled = computed(() => props.disabled || elForm.disabled)
    const nativeInputValue = computed(() => String(props.modelValue))
    const upperLimit = computed(() => ctx.attrs.maxlength)
    const showClear = computed(() => props.clearable
      && !inputDisabled.value
      && !props.readonly
      && nativeInputValue.value
      && (focused.value || hovering.value))
    const showPwdVisible = computed(() => props.showPassword
      && !inputDisabled.value
      && !props.readonly
      && (!!nativeInputValue.value || focused.value))
    const isWordLimitVisible = computed(() => props.showWordLimit
      && ctx.attrs.maxlength
      && (props.type === 'text' || props.type === 'textarea')
      && !inputDisabled.value
      && !props.readonly
      && !props.showPassword)
    const textLength = computed(() => (typeof props.modelValue === 'number' ? String(props.modelValue).length : (props.modelValue || '').length))
    const inputExceed = computed(() =>
      // show exceed style if length of initial value greater then maxlength
      isWordLimitVisible.value && (textLength.value > upperLimit.value))

    const resizeTextarea = () => {
      const { type, autosize } = props

      if (isServer || type !== 'textarea') return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0
        _textareaCalcStyle.value = calcTextareaHeight(textarea.value, minRows, maxRows)
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight,
        }
      }
    }

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const calcIconOffset = place => {
      const { el } = instance.vnode
      const elList: HTMLSpanElement[] = Array.from(el.querySelectorAll(`.el-input__${place}`))
      const target = elList.find(item => item.parentNode === el)

      if (!target) return

      const pendant = PENDANT_MAP[place]

      if (ctx.slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`
      } else {
        target.removeAttribute('style')
      }
    }

    const updateIconOffset = () => {
      calcIconOffset('prefix')
      calcIconOffset('suffix')
    }

    const handleInput = event => {
      const { value } = event.target

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.value) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (value === nativeInputValue.value) return

      ctx.emit(UPDATE_MODEL_EVENT, value)
      ctx.emit('input', value)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue)
    }

    const handleChange = (event: Event) => {
      console.log(event, handleChange)
      // ctx.emit('change', event.target.value)
    }

    const focus = () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      nextTick(() => {
        inputOrTextarea.value.focus()
      })
    }

    const blur = () => {
      inputOrTextarea.value.blur()
    }

    const handleFocus = (event: Event) => {
      focused.value = true
      ctx.emit('focus', event)
    }

    const handleBlur = (event: Event) => {
      focused.value = false
      ctx.emit('blur', event)
      if (props.validateEvent) {
        elFormItem.formItemMitt?.emit('el.form.blur', [props.modelValue])
      }
    }

    const select = () => {
      inputOrTextarea.value.select()
    }

    const handleCompositionStart = () => {
      isComposing.value = true
    }

    const handleCompositionUpdate = (event: Event) => {
      console.log(event, 'handleCompositionUpdate')

      // TODO
      // const text = event.target.value
      // const lastCharacter = text[text.length - 1] || ''
      // isComposing.value = !isKorean(lastCharacter)
    }

    const handleCompositionEnd = (event: Event) => {
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    const clear = () => {
      ctx.emit(UPDATE_MODEL_EVENT, '')
      ctx.emit('change', '')
      ctx.emit('clear')
    }

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value
      focus()
    }

    const getSuffixVisible = () => ctx.slots.suffix
      || props.suffixIcon
      || showClear.value
      || props.showPassword
      || isWordLimitVisible.value
      || (validateState.value && needStatusIcon.value)

    watch(() => props.modelValue, val => {
      nextTick(resizeTextarea)
      if (props.validateEvent) {
        elFormItem.formItemMitt?.emit('el.form.change', [val])
      }
    })

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => {
      setNativeInputValue()
    })

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(() => props.type, () => {
      nextTick(() => {
        setNativeInputValue()
        resizeTextarea()
        updateIconOffset()
      })
    })

    onMounted(() => {
      setNativeInputValue()
      updateIconOffset()
      nextTick(resizeTextarea)
    })

    onUpdated(() => {
      nextTick(updateIconOffset)
    })

    const onMouseLeave = (e: Event) => {
      hovering.value = false
      ctx.emit('mouseleave', e)
    }

    const onMouseEnter = (e: Event) => {
      hovering.value = true
      ctx.emit('mouseenter', e)
    }

    const handleKeydown = (e: Event) => {
      ctx.emit('keydown', e)
    }
    return (
      <div
        class={[
          // type === 'textarea' ? 'el-textarea' : 'el-input',
          inputSize ? `el-input--${inputSize}` : '',
          {
            'is-disabled': inputDisabled,
            'is-exceed': inputExceed,
            'el-input-group': ctx.slots.prepend || ctx.slots.append,
            'el-input-group--append': ctx.slots.append,
            'el-input-group--prepend': ctx.slots.prepend,
            'el-input--prefix': ctx.slots.prefix || prefixIcon,
            'el-input--suffix': ctx.slots.suffix || suffixIcon || clearable || showPassword,
          },
          ctx.attrs.class,
        ]}
        onMouseenter={onMouseEnter}
        onMouseleave={onMouseLeave}
      >

      </div>
    )
  },
})
