<!--
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-11-05 15:17:03
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-05 17:40:02
-->
<template>
  <div>
    <div class="input-wrapper">
      <div>
        <div class="label">无type + maxlength</div>
        <d-input
          v-model="valueInput"
          suffix-icon="el-icon-date"
          prefix-icon="el-icon-search"
          clearable
          placeholder="输入text"
          maxlength=10
        />
      </div>
      <div>
        <div class="label">type:text + clearable</div>
        <d-input
          type="text"
          v-model="valueInput"
          suffix-icon="el-icon-date"
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
      <div>
        <div class="label">type:text + disabled</div>
        <d-input
          type="text"
          v-model="valueInput"
          suffix-icon="el-icon-date"
          prefix-icon="el-icon-search"
          clearable
          placeholder="输入text"
          disabled
        />
      </div>
      <div>
        <div>type:password+ password切换</div>
        <d-input
          v-model="valuePassword"
          type="password"
          show-password
          clearable
          passwordSwitch
        />
      </div>
      <div>
        <div class="label">type:textarea</div>
        <d-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          clearable />
      </div>
    </div>

    <el-input v-model="elValue" clearable />
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
    const elValue = ref(null)
    return {
      valueInput,
      valuePassword,
      textarea,
      elValue,
    }
  },
})
</script>
<style lang="scss">
  .input-wrapper{
  p{
    div.label{
      padding: 3px;
    }
  }
}
</style>
