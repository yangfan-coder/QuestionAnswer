<!--
 * @Author       : 累加器
 * @Date         : 2022-03-04 15:08:45
 * @LastEditTime : 2022-03-04 18:17:24
 * @FilePath     : /Jest-Vue/components/sum/TimerTool.vue
 * @developer    : yangfan36
-->

<template>
  <div>
    <hr>
    <h1>累加器</h1>
    <span class="count">{{ count }}</span>
    <Button @click="increment"> click me </Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
