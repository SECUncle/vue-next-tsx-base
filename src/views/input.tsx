import { defineComponent } from 'vue';
import DInput from '@/packages/input';
import './input.scss';

export default defineComponent({
  setup() {
    return () => (
      <div>
        无type <DInput.component /> <br/>
        type:text <DInput.component type="text" clearable/> <br/>
        type:password<DInput.component type="password"/> <br/>
        type:textarea<DInput.component type="textarea"/>  <br/>
      </div>
    );
  },
});
