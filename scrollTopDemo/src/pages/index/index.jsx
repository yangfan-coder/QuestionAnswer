/*
 * @Author: 全局滚动条做导航选中状态
 * @Date: 2021-12-13 10:35:21
 * @LastEditTime: 2021-12-13 16:06:44
 * @LastEditors: yangfan36
 */
import { Component } from 'react'
import debounce from 'lodash/debounce';
import Taro, { pxTransform } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import './index.scss'

const _class = `index`

let timer = null;
let tdom = null;


let _navs = [
  {
    name:'热销爆款',
    id:1
  },
  {
    name:'秋冬专场',
    id:2
  },
  {
    name:'189元',
    id:3
  },
  {
    name:'时尚女靴',
    id:4
  },
  {
    name:'百搭单鞋',
    id:5
  },
  {
    name:'即将下线',
    id:6
  }
]
let _navsContent = [
  {
    name:'热销爆款',
    id:1
  },
  {
    name:'秋冬专场',
    id:2
  },
  {
    name:'189元',
    id:3
  },
  {
    name:'时尚女靴',
    id:4
  },
  {
    name:'百搭单鞋',
    id:5
  },
  {
    name:'即将下线',
    id:6
  }
];

export default class Index extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      navs:[],
      navsContent:[],
      _active:1,
      navsContentDOM:[]
    }
  }

  componentDidMount () { 
    this.init()
  }

  // 初始化
  async init () {
   await this.getMock();
   this.getDOM();
   
  }

  getDOM () {
    clearTimeout(tdom)
    tdom = setTimeout( async () => {

      // 监听滚动的元素的scrollTop
      const rtChildCard = () => {
        return new Promise(function(resolve){
          const query = Taro.createSelectorQuery()
          query.selectAll('.index_rt_item').boundingClientRect((rect) => {
            resolve(rect)
          }).exec()
        })
      }

      const _rtChildCard = await rtChildCard();
      this.setState({
        navsContentDOM:_rtChildCard
      })

    }, 200)

  }
  
  getMock() {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        this.setState({
          navs:_navs,
          navsContent:_navsContent
        },() => {
          resolve(true)
        })
    })
    }, 300)
  }

  onPageScroll = debounce((obj) => {
    const { navsContentDOM } = this.state;
    const top  = obj.scrollTop;
    
    if(navsContentDOM.length === 0) {
      console.log('获取DOM节点失败')
      return 
    }
    
    for(let i = 0; i < navsContentDOM.length - 1; i++) {
      
      if(top >= navsContentDOM[i].top && top < navsContentDOM[i + 1].top  ) {
        this.setState({
          _active:+navsContentDOM[i].id
        })
        return
      }
    }

    if(top >= navsContentDOM[navsContentDOM.length - 1].top ) {
      this.setState({
        _active:+navsContentDOM[navsContentDOM.length - 1].id
      })
      return
    }

    this.setState({
      _active:+navsContentDOM[0].id
    })

  },100)
   
  componentDidHide () { 
    clearTimeout(timer)
  }

  handleNav = debounce((data) => {
    const { navsContentDOM } = this.state;
    const result = navsContentDOM.find(item => item.id == data.id )
    const that = this;

    if(result && result.top) {
      Taro.pageScrollTo({
        scrollTop:result.top,
        duration:500,
        success(){
          that.setState({
            _active:data.id 
          })
        }
      })
    }
  },200)

  render () {
    const { navs, _active } = this.state;

    return (
      <View className={_class}>
      <View className={`${_class}_title`}>我是标题</View>
      <View className={`${_class}_center`}>
          <View className={`${_class}_lt`}>
            {
              navs.map(item => (
                <View 
                  onClick={() => this.handleNav(item)}
                  key={item.id} 
                  className={`${_class}_lt_item ${_active === item.id ? 'active': ''}`}
                >{item.name}</View>
              ))
            }
          </View>
          <View className={`${_class}_rt`}>
          {
              navs.map(item => (
                <View key={item.id} id={item.id} className={`${_class}_rt_item`}>{item.name}</View>
              ))
            }
          </View>
      </View>
    </View>
    )
  }
}
