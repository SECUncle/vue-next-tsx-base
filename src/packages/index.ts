/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 16:35:44
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-05 15:46:41
 */
import Icon from './icon'
import Input from './input'
import Select from './select'
import Tag from './tag'
import Popper from './popper'
import ELInput from './elePlus-input'

const components = [
  Icon,
  Input,
  Select,
  Tag,
  Popper,
  ELInput,
]

const install = (app: any) => {
  components.map(component => app.component(component.name, component))
}
export {
  install,
  Icon,
  Input,
  Select,
  Tag,
  Popper,
  ELInput,
}
export default {
  install,
  ...components,
}
