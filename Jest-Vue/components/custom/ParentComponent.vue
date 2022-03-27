<!--
 * @Author       : 父子组件通信
 * @Date         : 2022-03-04 17:02:02
 * @LastEditTime : 2022-03-04 18:17:33
 * @FilePath     : /Jest-Vue/components/custom/ParentComponent.vue
 * @developer    : yangfan36
-->

<template>
  <div>
    <hr />
    <h1>父子组件</h1>
    <p>{{ massage }}</p>
    <p></p>
    <CustomChildComponent @custom="onCustom" :childMsg="childMsg" />
  </div>
</template>
<script>
import CustomChildComponent from './ChildComponent'
export default {
  name: 'ParentComponent',
  components: {
    CustomChildComponent,
  },
  data() {
    return {
      massage: '----',
      childMsg: '嗨 我是你父亲',
    }
  },
  methods: {
    onCustom(value) {
      this.massage = value
    },
  },
}
</script>

