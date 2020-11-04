import { defineComponent, ref } from 'vue';
import DInput from '@/packages/input';
import './input.scss';

export default defineComponent({
  setup() {
    const input = ref(10);

    return () => (
      <div class="input-wrapper">
        <p>
          <div class="label">无type + maxlength</div>
          <DInput.component value={input.value} maxlength={10} clearable placeholder="输入text" />
        </p>
        <p>
          <div class="label">type:text + clearable</div> <DInput.component type="text" clearable />
        </p>
        <p>
          <div class="label">type:text + disabled</div> <DInput.component type="text" disabled />
        </p>
        <p>
          <div>type:password+ disabled+ password切换</div>
          <DInput.component type="password" disabled={false} passwordSwitch />
        </p>
        <p>
          <div class="label">type:textarea</div>
          <DInput.component type="textarea" />
        </p>
      </div>
    );
  },
});
