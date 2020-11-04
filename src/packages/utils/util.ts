/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 17:48:27
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-04 18:12:58
 */
import { getCurrentInstance } from 'vue'

export function useGlobalConfig() {
  const vm: any = getCurrentInstance()
  if ('$DDesign' in vm.proxy) {
    return vm.proxy.$DDesign
  }
  return {

  }
}
export function test() {
  console.log('test')
}
