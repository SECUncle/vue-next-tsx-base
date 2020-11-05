/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 20:05:27
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-05 15:49:48
 */
import ELInput from './src/ele-plus.vue'

ELInput.install = (app: any) => {
  app.component(ELInput.name, ELInput)
}
export default ELInput
