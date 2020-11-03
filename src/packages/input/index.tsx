import {
  defineComponent, toRefs, ref, watch, computed, nextTick, onMounted,
} from 'vue';
import Icon from '@/packages/icon';
import './style/index.scss';

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
  emits: ['input', 'update:value', 'change', 'clear'],
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
    const inputOrTextarea = computed(() => inputRef.value || textarea.value);
    const nativeInputValue = computed(() => String(props.value));

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      if (!input || input.value === nativeInputValue.value) return;
    };

    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      // currentValue.value = target.value;
      // console.log(currentValue, 'onInput');
      ctx.emit('input', target.value);
      ctx.emit('update:value', target.value);
      console.log(target.value, 'target.value onInput');
      nextTick(setNativeInputValue);
    };
    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      ctx.emit('change', target.value);
      console.log(target.value, 'onChange');
    };
    const onClear = () => {
      // input.value.focus();
      // currentValue.value = '';
      console.log('onClear', inputRef.value.value);

      inputRef.value.value = '';
      ctx.emit('clear');
      ctx.emit('change', '');
      ctx.emit('update:value', '');
    };
    const isEmpty = (val: string | null | undefined | number) => val === '' || val === undefined || val === null;

    watch(
      () => props.value,
      (val) => {
        console.log(val);
      },
    );

    watch(nativeInputValue, () => {
      setNativeInputValue();
    });

    watch(
      () => props.type,
      () => {
        // console.log(currentType, 'watch');
        // currentType.value = curr;
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
        {prefixIcon?.value && !isEmpty(inputRef.value.value) && (
          <Icon.component class="d-input__prefix-icon" icon={prefixIcon.value} />
        )}
        {type?.value !== 'textarea' && (
          <input
            class="d-input__input"
            disabled={disabled.value}
            maxlength={maxlength?.value}
            placeholder={String(placeholder.value)}
            ref={(n) => (inputRef.value = n)}
            type={currentType.value}
            value={value?.value}
            onChange={onChange}
            onInput={onInput}
            {...ctx.attrs}
          />
        )}

        {clearable.value && (
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
            }}
          >
            <Icon.component class="d-input__suffix-icon" icon="eye" />
          </span>
        )}

        {type?.value === 'textarea' && (
          <textarea
            ref={(n) => (textarea.value = n)}
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
