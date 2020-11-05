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
  withCtx,
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
  name: 'd-input',

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
      type,
      tabindex,
    } = toRefs(props)
    // console.log(type, 'type')
    const instance = getCurrentInstance()
    const attrs = useAttrs(true)
    const $ElEMENT = useGlobalConfig()
    // console.log(useGlobalConfig(), 'useGlobalConfig()')

    const elForm = inject(elFormKey, {} as ElFormContext)
    const elFormItem = inject(elFormItemKey, {} as ElFormItemContext)

    const input = ref(null)
    const textarea = ref(null)
    const focused = ref(false)
    const hovering = ref(false)
    const isComposing = ref(false)
    const passwordVisible = ref(false)
    // eslint-disable-next-line no-underscore-dangle
    const _textareaCalcStyle = shallowRef({})

    const inputOrTextarea = computed(() => input.value || textarea.value)
    const inputSize = computed(() => props.size || (elFormItem as any).size || $ElEMENT.size)
    // console.log(inputSize, 'inputSize', props.size, (elFormItem as any).size)
    const needStatusIcon = computed(() => elForm.statusIcon)
    const validateState = computed(() => elFormItem.validateState || '')
    const validateIcon = computed(() => (VALIDATE_STATE_MAP as any)[validateState.value])
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
    // show exceed style if length of initial value greater then maxlength
    const inputExceed = computed(() => isWordLimitVisible.value && (textLength.value > (upperLimit as any).value))

    const resizeTextarea = () => {
      // eslint-disable-next-line no-shadow
      const { type, autosize } = props

      if (isServer || type !== 'textarea') return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0
        // _textareaCalcStyle.value = calcTextareaHeight(textarea.value, minRows, maxRows as any)
      } else {
        // _textareaCalcStyle.value = {
        //   minHeight: calcTextareaHeight(textarea.value).minHeight,
        // }
      }
    }

    const setNativeInputValue = () => {
      // eslint-disable-next-line no-shadow
      const input = inputOrTextarea.value
      if (!input || (input as any).value === nativeInputValue.value) return
      (input as any).value = nativeInputValue.value
    }

    const calcIconOffset = (place: string) => {
      // const { el } = (instance as any).vnode
      // const elList: HTMLSpanElement[] = Array.from((el as any).querySelectorAll(`.el-input__${place}`))
      // const target = elList.find(item => item.parentNode === el)

      // if (!target) return

      // const pendant = (PENDANT_MAP as any)[place]

      // if (ctx.slots[pendant]) {
      //   target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${(el as any).querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`
      // } else {
      //   target.removeAttribute('style')
      // }
    }

    const updateIconOffset = () => {
      calcIconOffset('prefix')
      calcIconOffset('suffix')
    }

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement

      const { value } = target

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
        (inputOrTextarea as any).value.focus()
      })
    }

    const blur = () => {
      (inputOrTextarea as any).value.blur()
    }

    const handleFocus = (event: Event) => {
      focused.value = true
      ctx.emit('focus', event)
    }

    const handleBlur = (event: Event) => {
      focused.value = false
      ctx.emit('blur', event)
      if (props.validateEvent) {
        // TODO
        // elFormItem.formItemMitt?.emit('el.form.blur', [props.modelValue])
      }
    }

    const select = () => {
      (inputOrTextarea as any).value.select()
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
      || (validateState.value && needStatusIcon.value) || true

    console.log(getSuffixVisible(), 'getSuffixVisible')

    watch(() => props.modelValue, val => {
      nextTick(resizeTextarea)
      if (props.validateEvent) {
        // TODO
        // elFormItem.formItemMitt?.emit('el.form.change', [val])
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
    // console.log(tabindex, props, 'type showPassword')
    console.log(showClear, 'showClear')
    return () => (
      <div
        class={[
          type.value === 'textarea' ? 'el-textarea' : 'el-input',
          inputSize ? `el-input--${inputSize.value}` : '',
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

        {
          type?.value !== 'textarea' && (
            <div class="template">
              {/* 前置元素 */}
              {ctx.slots.prepend && (
                <div class="el-input-group__prepend">
                  <slot name="prepend"></slot>
                </div>
              )}
              {
                type?.value !== 'textarea'
                && (< input
                  ref="input"
                  class="el-input__inner"
                  {...ctx.attrs}
                  type={showPassword ? (passwordVisible ? 'text' : 'password') : props.type}
                  disabled={inputDisabled.value}
                  readonly={props.readonly}
                  autocomplete={props.autocomplete}
                  // tabindex={tabindex?.value}
                  aria-label={props.label}
                  onCompositionstart={handleCompositionStart}
                  onCompositionupdate={handleCompositionUpdate}
                  onCompositionend={handleCompositionEnd}
                  onInput={handleInput}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeydown={handleKeydown}
                />)
              }
              {/* <!-- 前置内容 --> */}
              {
                (ctx.slots.prefix || prefixIcon)
                && (
                  <span class="el-input__prefix">
                    <slot name="prefix"></slot>
                    {
                      prefixIcon && (
                        <i
                          class={['el-input__icon', prefixIcon]}
                        ></i>
                      )
                    }
                  </span>
                )
              }

              {/* <!-- 后置内容 --> */}
              {
                getSuffixVisible() && (
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                      {
                        (!showClear || !showPwdVisible || !isWordLimitVisible)
                        && (<div class="template">
                          <slot name="suffix"></slot>
                          <i v-if=" " class={['el-input__icon', suffixIcon]}></i>
                        </div>)
                      }
                      {
                        // TODO
                        (
                          <i

                            class="el-input__icon el-icon-circle-close el-input__clear"
                            // @mousedown.prevent
                            onClick={clear}
                          >测试清除</i>
                        )
                      }

                      {
                        showPwdVisible && (
                          <i class="el-input__icon el-icon-view el-input__clear" onClick={handlePasswordVisible}></i>
                        )
                      }

                      {
                        isWordLimitVisible && (
                          <span class="el-input__count">
                            <span class="el-input__count-inner">
                              {{ textLength }}/{{ upperLimit }}
                            </span>
                          </span>
                        )
                      }

                    </span >
                    {
                      validateState && (<i class={['el-input__icon', 'el-input__validateIcon', validateIcon]}></i>
                      )
                    }
                  </span >
                )
              }

              {/* < !--后置元素 --> */}
              {
                ctx.slots.append && (
                  < div class="el-input-group__append" >
                    <slot name="append"></slot>
                  </div >
                )
              }

            </div >
          )
        }
        {
          type?.value === 'textarea'
          && (
            <textarea
              ref="textarea"
              class="el-textarea__inner"
              {...ctx.attrs}
              style={textareaStyle.value}
              disabled={inputDisabled.value}
              readonly={props.readonly}
              autocomplete={props.autocomplete}
              // tabindex={props.tabindex}
              aria-label={props.label}
              onCompositionstart={handleCompositionStart}
              onCompositionupdate={handleCompositionUpdate}
              onCompositionend={handleCompositionEnd}
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            >
            </textarea>
          )

        }
        {
          isWordLimitVisible && type.value === 'textarea'
          && (<span class="el-input__count">{{ textLength }}/{{ upperLimit }}</span>
          )
        }

      </div >

    )
  },
})
