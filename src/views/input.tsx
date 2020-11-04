import { defineComponent, ref } from 'vue'
import DInput from '@/packages/input'
import './input.scss'

export default defineComponent({
  setup() {
    const input = ref(10)

    return () => (
      <div class="input-wrapper">
        <p>
          <div class="label">无type + maxlength</div>
          <d-input value={input.value} maxlength={10} clearable placeholder="输入text" />
        </p>
        <p>
          <div class="label">type:text + clearable</div> <d-input type="text" clearable />
        </p>
        <p>
          <div class="label">type:text + disabled</div> <d-input type="text" disabled />
        </p>
        <p>
          <div>type:password+ disabled+ password切换</div>
          <d-input type="password" disabled={false} passwordSwitch />
        </p>
        <p>
          <div class="label">type:textarea</div>
          <d-input type="textarea" />
        </p>
      </div>
    )
  },
})
