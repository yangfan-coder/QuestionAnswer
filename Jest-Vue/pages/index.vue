<!--
 * @Author       : your name
 * @Date         : 2022-03-04 15:10:38
 * @LastEditTime : 2022-05-25 14:57:54
 * @FilePath     : /Jest-Vue/pages/index.vue
 * @developer    : yangfan36
-->
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
import Joi from 'joi'
export default {
  name: 'IndexPage',
  created() {},
  async mounted() {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),

      password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),

      repeat_password: Joi.ref('password'),

      access_token: [Joi.string(), Joi.number()],

      birth_year: Joi.number().integer().min(1900).max(2013),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
    })
      .with('username', 'birth_year')
      .xor('password', 'access_token')
      .with('password', 'repeat_password')

    schema.validate({ username: 'abc', birth_year: 1994 })
    // -> { value: { username: 'abc', birth_year: 1994 } }

    // -> { value: {}, error: '"username" is required' }

    // Also -

    try {
      const value = await schema.validateAsync({
        username: 'abc',
        birth_year: 1994,
      })

      console.log(value,'111')
    } catch (err) {
      console.log(err,'---')
    }
  },
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
  margin: 20px 0;
}
</style>
