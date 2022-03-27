/*
 * @Author       : vue的单元测试
 * @Date         : 2022-03-04 15:08:45
 * @LastEditTime : 2022-03-04 18:14:16
 * @FilePath     : /Jest-Vue/test/NuxtLogo.test.js
 * @developer    : yangfan36
 */
import { mount } from '@vue/test-utils'
import TimerTool from '@/components/sum/TimerTool.vue'


/**
 *  toContain： 检查一个字符串是另外一个字符串的子字符串 < https://jestjs.io/zh-Hans/docs/expect#tocontainitem > 
 *  wrapper ： 常用方法集合 < https://v1.test-utils.vuejs.org/zh/api/wrapper/#%E5%B1%9E%E6%80%A7 >
 */
describe('检查组件是否正常的加载', () => {
  const wrapper = mount(TimerTool)

  it('是否正确的呈现正确的节点', () => {
    expect(wrapper.html()).toContain(`<span class="count">0</span>`)
  })
  
  it('是否存在button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

})

describe('模拟用户的操作', () => {
  const wrapper = mount(TimerTool)
  
  // console.log(wrapper.html())
  it('检查默认值', () => {
    expect(wrapper.vm.count).toBe(0)
  })
  
  it('检查计数器的文本是否更新',() => {
    const button = wrapper.find('button');
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})


