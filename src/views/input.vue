<!--
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-05 15:17:03
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-05 15:35:50
-->
<template>
  <div>
    <d-input
v-model="valueInput"
suffix-icon="el-icon-date"
prefix-icon="el-icon-search"
clearable />
    <d-input
v-model="valuePassword"
type="password"
show-password
clearable />
    <d-input
type="textarea"
placeholder="请输入内容"
v-model="textarea"
clearable />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '22',
  setup(props, ctx) {
    const valueInput = ref(0)
    const valuePassword = ref(0)
    const textarea = ref(0)
    return {
      valueInput,
      valuePassword,
      textarea,
    }
  },
})
</script>>
