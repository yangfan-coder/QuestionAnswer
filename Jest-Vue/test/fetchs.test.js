/*
 * @Author       : 模拟请求的单元测试
 * @Date         : 2022-03-04 18:06:54
 * @LastEditTime : 2022-03-04 19:21:37
 * @FilePath     : /Jest-Vue/test/fetchs.test.js
 * @developer    : yangfan36
 */


// 关于mount 和 shallowMount 的区别 < https://github.com/holylovelqq/vue-unit-test-with-jest/issues/4 >  
// 关于接口行为的更新： < https://v1.test-utils.vuejs.org/zh/guides/#%E6%9D%A5%E8%87%AA%E5%A4%96%E9%83%A8%E8%A1%8C%E4%B8%BA%E7%9A%84%E6%9B%B4%E6%96%B0 >

import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import BtnComponent from '@/components/fetchs/BtnComponent'

jest.mock('../moduls/users.js');

// 动态设置超时的时间
jest.setTimeout(100000)

describe('测试接口', () => {

  it('模拟点击状态', async () => {
    const wrapper = shallowMount(BtnComponent)
    wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.find('h5').text()).toContain('test')
  })
})