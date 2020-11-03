import { defineComponent, ref } from 'vue';
import DInput from '@/packages/input';
import './input.scss';

export default defineComponent({
  setup() {
    const input = ref(10);

    console.log(input, 'input');
    return () => (
      <div>
        <p>无type + maxlength <DInput.component value={input.value} maxlength={10} clearable placeholder="输入text" /></p>
        <p>type:text + clearable <DInput.component type="text" clearable /> </p>
        <p>type:password+ disabled<DInput.component type="password" disabled={false}/> </p>
        <p>type:textarea<DInput.component type="textarea"/>  </p>
      </div>
    );
  },
});
