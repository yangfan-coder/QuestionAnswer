<!--
 * @Author       : 子组件
 * @Date         : 2022-03-04 17:02:02
 * @LastEditTime : 2022-03-04 18:17:29
 * @FilePath     : /Jest-Vue/components/custom/ChildComponent.vue
 * @developer    : yangfan36
-->

<template>
  <div>
    <Button type="info" @click="handleCustom">子组件</Button>
    <p>我是子组件的详情</p>
    <p>父组件传递过来的值：{{ childMsg }}</p>
  </div>
</template>
<script>
export default {
  name: 'ChildComponent',
  props: ['childMsg'],
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    handleCustom() {
      this.$emit('custom', 'say hello')
    },
  },
}
</script>
