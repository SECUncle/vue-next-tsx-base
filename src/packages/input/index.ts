/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 20:05:27
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-05 16:55:53
 */
import Input from './src/ele-render'

Input.install = (app: any) => {
  app.component(Input.name, Input)
}
export default Input
