import { defineComponent } from 'vue';
import DInput from '@/packages/input';
import './input.scss';

export default defineComponent({
  setup() {
    return () => (
      <div>
        <p>无type + maxlength <DInput.component maxlength={10} clearable /></p>
        <p>type:text + clearable <DInput.component type="text" clearable /> </p>
        <p>type:password+ disabled<DInput.component type="password" disabled={false}/> </p>
        <p>type:textarea<DInput.component type="textarea"/>  </p>
      </div>
    );
  },
});
