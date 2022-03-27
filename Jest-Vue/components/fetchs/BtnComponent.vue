<!--
 * @Author       : 模拟请求
 * @Date         : 2022-03-04 17:56:56
 * @LastEditTime : 2022-03-04 18:55:36
 * @FilePath     : /Jest-Vue/components/fetchs/BtnComponent.vue
 * @developer    : yangfan36
-->
<template>
  <div>
    <hr>
    <p></p>
    <Button type="success" @click="fetchResults">模拟请求</Button>
    <h4>接口请求返回结果：{{ value || "null"}}</h4>
    <h5>名称：{{name}}</h5>
  </div>
</template>
<script>
import Users from '../../moduls/users'
  export default {
    data() {
      return {
        value: null,
        name:""
      }
    },

    methods: {
      async fetchResults() {
        const response = await Users.all()
        this.value = response.data
        this.name = response.data.data.name
      }
    }
  }
</script>