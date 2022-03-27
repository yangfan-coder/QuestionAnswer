/*
 * @Author       : 父子组件单元测试
 * @Date         : 2022-03-04 17:13:58
 * @LastEditTime : 2022-03-07 16:06:17
 * @FilePath     : /Jest-Vue/test/Custom.test1.js
 * @developer    : yangfan36
 */

// 参考链接： vue-test-utils : < https://v1.test-utils.vuejs.org/zh/api/wrapper/ >


// import { mount,shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import ChildComponent from '@/components/custom/ChildComponent'
import ParentComponent from '@/components/custom/ParentComponent'

describe('测试父子组件', () => {
  // const wrapperParentComponent1 = shallowMount(ParentComponent)
  const wrapperParentComponent = mount(ParentComponent)
  const wrapperChildComponent = mount(ChildComponent)
  
  // console.log(wrapperParentComponent1.html(),'===>>> shallowMount')
  // console.log(wrapperParentComponent.html(),'==>>> mount')

  it("测试自定义事件", () => {
    wrapperParentComponent.findComponent(ChildComponent).vm.$emit('custom')
    expect(wrapperParentComponent.html()).toContain('详情')
  })

  it("操作组件data的状态", async () => {
    await wrapperParentComponent.setData({massage: '9999' })
    expect(wrapperParentComponent.vm.massage).toBe("9999")
  })
  
  it("操作组件props的状态", async () => {
    
    await wrapperChildComponent.setProps({childMsg: '8888' })
    expect(wrapperChildComponent.vm.childMsg).toBe("8888")
  })
})