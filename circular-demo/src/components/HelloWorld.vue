<template>
  <div class="circular-content">
    <div class="circulars">
      <div class="ring"><div class="double-circle"></div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#app {
  height: 100vh;
  background-color: #1a1b1f;
}

.circular-content {
  width: 100%;
  height: 612px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .circulars {
    height: 750px;
    width: 750px;
    position: relative;
    position: absolute;
    top: 230px;
    left: 50%;
    transform: translateX(-50%);

    &::after {
      content: "";
      display: block;
      height: 375px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .ring {
      height: 750px;
      width: 750px;
      border-width: 20px;
      border-color: #ead2a7 #ead2a7 #626262 #626262;
      border-style: solid;
      box-sizing: border-box;
      position: relative;
      border-radius: 100%;
      // transform: rotate(315deg); // 满值
       // transform:rotate(135deg); // 初始值  180/10 = 18
       transform:rotate(153deg); // 初始值v2
      transition: 1.5s ease-out;

      .double-circle {
        position: absolute;
        top: 592px;
        left: 592px;
        width: 41px;
        height: 41px;

        &::after {
          content: "";
          display: block;
          width: 41px;
          height: 41px;
          background: #ffeece;
          opacity: 0.2;
          border-radius: 100%;
          position: absolute;
        }

        &::before {
          content: "";
          display: block;
          width: 23px;
          height: 23px;
          background: #ffe6b9;
          border-radius: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
