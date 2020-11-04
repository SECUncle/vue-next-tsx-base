/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-04 11:58:24
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-04 15:45:40
 */
import type { InjectionKey } from 'vue'
import type { Emitter } from 'mitt'

interface SelectGroupContext {
  disabled: boolean
}

export interface SelectContext {
  props: {
    multiple?: boolean
    multipleLimit?: number
    valueKey?: string
    modelValue?: string | number | unknown[]
    popperClass?: string
    remote?: boolean
  }
  selectWrapper: HTMLElement
  cachedOptions: any[]
  hoverIndex: number
  optionsCount: number
  filteredOptionsCount: number
  options: any[]
  selected: any | any[]
  selectEmitter: Emitter
  // setSelected(): void
  // onOptionDestroy(i: number)
  // handleOptionSelect(vm: unknown, byClick: boolean)
}

export const selectGroupKey: InjectionKey<SelectGroupContext> = Symbol('SelectGroup')

export const selectKey: InjectionKey<SelectContext> = Symbol('Select')

export const selectEvents = {
  queryChange: 'elOptionQueryChange',
  groupQueryChange: 'elOptionGroupQueryChange',
}
