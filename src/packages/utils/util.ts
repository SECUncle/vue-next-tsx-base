/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 17:48:27
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-04 20:45:05
 */
import { getCurrentInstance } from 'vue'
import {
  isObject,
  isArray,
  isString,
  capitalize,
  // hyphenate,
  looseEqual,
  extend,
  camelize,
  hasOwn,
  // toRawType,
} from '@vue/shared'

export function useGlobalConfig() {
  const vm: any = getCurrentInstance()
  if ('$DDesign' in vm.proxy) {
    return vm.proxy.$DDesign
  }
  return {

  }
}
declare type Indexable<T> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>
export function entries<T>(obj: Hash<T>): [string, T][] {
  return Object
    .keys(obj)
    .map((key: string) => ([key, obj[key]]))
}

export {
  hasOwn,
  // isEmpty,
  // isEqual,
  isObject,
  isArray,
  isString,
  capitalize,
  camelize,
  looseEqual,
  extend,
}
