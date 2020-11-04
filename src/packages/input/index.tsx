import {
  defineComponent, toRefs, ref, watch, computed, nextTick, onMounted,
} from 'vue';
import Icon from '@/packages/icon';
import './style/index.scss';

// TODO size、 clear、 带icon、文本框、rows、可适应文本框 复合型输入框、 尺寸、待输入建议、 自定义模版、远程搜索、

// TODO event、 校验

// issue 清空处理，表单赋值

export interface InputProps extends CustomEleProps {
  value?: string | number;
  placeholder: string | number;
  type?: 'text' | 'password' | 'textarea';
  maxlength?: number;
  clearable?: boolean;
  passwordSwitch?: boolean;
  disabled?: boolean;
  size?: 'large' | 'middle' | 'small';
  /**
   * 头部 icon
   */
  prefixIcon?: string;
  /**
   * 尾部 icon
   */
  suffixIcon?: string;
  isError?: boolean;
  plain?: boolean;
}

const Input = defineComponent({
  name: 'd-input',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    maxlength: {
      type: Number,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    passwordSwitch: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
    },
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'update:value', 'change', 'focus', 'blur', 'clear'],
  setup(props, ctx) {
    const {
      value,
      placeholder,
      type,
      maxlength,
      clearable,
      disabled,
      passwordSwitch,
      size,
      prefixIcon,
      suffixIcon,
      isError,
      plain,
    } = toRefs(props);

    const textarea = ref();
    const inputRef = ref();
    const currentType = ref(type.value);
    console.log(currentType, type);
    const inputOrTextarea = computed(() => inputRef.value || textarea.value);
    const nativeInputValue = computed(() => String(props.value));
    const focused = ref(false);
    const hovering = ref(false);

    const showClear = computed(() => props.clearable && (focused.value || hovering.value));

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      // if (!input || input.value === nativeInputValue.value) return;
    };

    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      ctx.emit('input', target.value);
      ctx.emit('update:value', target.value);
      nextTick(setNativeInputValue);
    };
    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      ctx.emit('change', target.value);
    };

    const onFocus = (e: Event) => {
      focused.value = true;

      ctx.emit('focus', e);
    };
    const onBlur = (e: Event) => {
      focused.value = false;
      const target = e.target as HTMLInputElement;
      console.log(target.value, 'onBlur');
      // ctx.emit("input", target.value);

      ctx.emit('blur', e);
      // ctx.emit("update:value", target.value);
    };

    // const focus = () => {
    //   nextTick(() => {
    //     inputOrTextarea.value.focus();
    //   });
    // };

    // const blur = () => {
    //   inputOrTextarea.value.blur();
    // };
    const onClear = () => {
      inputRef.value.value = '';
      ctx.emit('clear');
      ctx.emit('change', '');
      ctx.emit('update:value', '');
    };

    watch(
      () => props.value,
      (val) => {
        console.log(val, 'props value watch');
      },
    );

    watch(nativeInputValue, (val) => {
      console.log(val, 'nativeInputValue watch');
      setNativeInputValue();
    });

    watch(
      () => props.type,
      (val) => {
        console.log(val, ' props.type watch');
        nextTick(() => {
          setNativeInputValue();
        });
      },
    );

    onMounted(() => {
      setNativeInputValue();
    });

    return () => (
      <div
        class={[
          'd-input',
          `--${type.value}`,
          `--${size.value}`,
          {
            '--disabled': disabled.value,
            '--prefix-icon': prefixIcon?.value,
            '--suffix-icon': suffixIcon?.value,
            '--clearable': clearable.value,
            '--password': passwordSwitch.value,
            '--is-error': isError.value,
            '--plain': plain.value,
          },
        ]}
      >
        {prefixIcon?.value && showClear.value && (
          <Icon.component class="d-input__prefix-icon" icon={prefixIcon.value} />
        )}
        {type?.value !== 'textarea' && (
          <input
            class="d-input__input"
            disabled={disabled.value}
            maxlength={maxlength?.value}
            placeholder={String(placeholder.value)}
            ref="input"
            type={currentType.value}
            value={value?.value}
            onChange={onChange}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            {...ctx.attrs}
          />
        )}

        {clearable.value && showClear.value && (
          <span onClick={onClear}>
            <Icon.component class="d-input__clearable-icon" icon="x-circle" />
          </span>
        )}
        {suffixIcon?.value && !passwordSwitch.value && (
          <Icon.component class="d-input__suffix-icon" icon={suffixIcon.value} />
        )}
        {passwordSwitch.value && (
          <span
            onClick={() => {
              currentType.value = currentType.value === 'password' ? 'text' : 'password';
              console.log(currentType, 'currentType.value');
            }}
          >
            <Icon.component class="d-input__suffix-icon" icon="eye" />
          </span>
        )}

        {type?.value === 'textarea' && (
          <textarea
            ref="textarea"
            class={[
              'd-textarea',
              `--${type.value}`,
              `--${size.value}`,
              {
                '--disabled': disabled.value,
                '--prefix-icon': prefixIcon?.value,
                '--suffix-icon': suffixIcon?.value,
                '--clearable': clearable.value,
                '--password': passwordSwitch.value,
                '--is-error': isError.value,
                '--plain': plain.value,
              },
            ]}
            onChange={onChange}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
          ></textarea>
        )}
      </div>
    );
  },
});

export default {
  name: Input.name,
  component: Input,
};
