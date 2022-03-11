<template>
  <div id="app">
    <div class="circular">
      <div class="circular-content">
        <div class="circulars">
          <div
            :style="{ transform: `rotate(${dynamicRotate}deg)` }"
            :class="['ring', demo ? 'active' : '']"
          >
            <div class="double-circle"></div>
          </div>
          <div
            v-for="(item, index) in vipGrade"
            :key="item"
            :class="[
              'custom-grade',
              `custom-${item}`,
              index === currentIndex ? 'currentActive' : '',
            ]"
          >
            {{ item }}
          </div>
          <div class="user-center">
            <img class="user-avatar" :src="require('@/assets/users.png')" />
            <div class="grade-btn">SVIP1</div>
            <h4>consumption value xxx</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="roll-content">
      <van-button @click="handleRoll" color='#d5ab8d' type="info">点击滚动</van-button>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          title="标题"
          show-toolbar
          :columns="vipGrade"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showPicker: false,
      demo: false,
      currentIndex: 5, // 当前用户选中状态
    };
  },
  components: {},
  computed: {
    // 动态控制 滚动位置
    dynamicRotate() {
      let arrs = Array.from({ length: 11 });
      let rotate = 18; // 角度差值
      arrs[0] = 135; // 初始值
      return arrs
        .reduce((init, current) => {
          if (init.length === 0) {
            init.push(current);
          } else {
            let m = init[init.length - 1] + rotate;
            init.push(m);
          }
          return init;
        }, [])
        .find((_, index) => index === this.currentIndex);
    },
    // vip的等级
    vipGrade() {
      const vipTotal = 6;
      const svipTotal = 5;
      let vipArrs = Array.from({ length: vipTotal }, (_, k) => `v${++k}`);
      let svipArrs = Array.from({ length: svipTotal }, (_, k) => `sv${++k}`);

      return vipArrs.concat(svipArrs);
    },
  },
  methods: {
    onConfirm(_, index) {
      this.currentIndex = index;
      this.showPicker = false;
    },
    onCancel() {
      this.showPicker = false;
    },
    handleRoll() {
      this.showPicker = true;
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style scoped lang="scss">
@import "./index.scss";
</style>
