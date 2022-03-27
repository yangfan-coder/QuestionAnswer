<template>
  <div class="container">
    <div>
      <!-- <timer-tool /> -->
      <h1 class="title">Jest-Vue</h1>
      <h2 class="subtitle">Welcome to the View UI + Nuxt.js template</h2>
      <br />
      <SumTimerTool />
       <br />
      <CustomParentComponent />
       <br />
       <FetchsBtnComponent />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: Quicksand, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

p {
  margin:  20px 0;
}
</style>
