/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 16:35:44
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-04 17:38:43
 */
import Icon from './icon'
import Input from './input'
import Select from './select'
import Tag from './tag'
import Popper from './popper'

const components = [
  Icon,
  Input,
  Select,
  Tag,
  Popper,
]
// const install = Vue => {
//   if (install.installed) return
//   components.map(component => Vue.component(component.name, component))
// }
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
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
}
export default {
  install,
  ...components,
}
