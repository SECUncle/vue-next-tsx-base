import { defineComponent, computed, toRefs } from 'vue'
// import { isValidComponentSize } from '@/packages/utils/validators'
import { useGlobalConfig } from '@/packages/utils/util'

export default defineComponent({
  name: 'd-tag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator: (val: string): boolean => ['dark', 'light', 'plain'].indexOf(val) !== -1,
    },
  },
  emits: ['close', 'click'],
  setup(props, ctx) {
    const DDesign = useGlobalConfig()
    const {
      type, hit, effect, disableTransitions, color, closable,
    } = toRefs(props)
    const tagSize = computed(() => props.size || DDesign.size)
    const { default_ } = ctx.slots
    const classes = computed(() => ['d-tag', type ? `d-tag--${type}` : '', 'tagSize' ? `d-tag--${tagSize.value}` : '', effect ? `d-tag--${effect}` : '', hit && 'is-hit'])

    // methods
    const handleClose = (event: Event) => {
      event.stopPropagation()
      ctx.emit('close', event)
    }

    const handleClick = (event: Event) => {
      ctx.emit('click', event)
    }
    const tagStyle = {
      backgroundColor: color,
    }

    // TODO  style 未添加
    const tagEl = (
      <span class={classes} onClick={handleClick}>
        {default_ && default_()}
        {closable && <i class="el-tag__close el-icon-close" onClick={handleClose}></i>}
      </span>
    )
    return () => (disableTransitions ? tagEl : <transition name="el-zoom-in-center">{tagEl}</transition>)
  },
})
