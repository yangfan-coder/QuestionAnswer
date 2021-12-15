/*
 * @Author: ScrollView滚动
 * @Date: 2021-12-13 10:35:21
 * @LastEditTime: 2021-12-15 15:09:32
 * @LastEditors: yangfan36
 */
import { Component } from 'react'
import debounce from 'lodash/debounce';
import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components'
import './index.scss'

const _class = `scroll-views`

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

export default class ScrollViews extends Component {
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

  async init () {
    await this.getMock()
    this.getDOM()
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

  getDOM () {
    clearTimeout(tdom)
    tdom = setTimeout( async () => {

      // 监听滚动的元素的scrollTop
      const rtChildCard = () => {
        return new Promise(function(resolve){
          const query = Taro.createSelectorQuery()
          query.selectAll(`.${_class}_rt_item`).boundingClientRect((rect) => {
            resolve(rect)
          }).exec()
        })
      }

      // 监听滚动的元素的scrollTop
      const titleCard = () => {
        return new Promise(function(resolve){
          const query = Taro.createSelectorQuery()
          query.select(`.${_class}_title`).boundingClientRect((rect) => {
            resolve(rect)
          }).exec()
        })
      }

      const _rtChildCard = await rtChildCard();
      const _titleCard = await titleCard();
      this.setState({
        navsContentDOM:_rtChildCard,
        titleCard:_titleCard
      })

    }, 200)

  }
  handleNav = debounce((data) => {
    this.setState({
      _active:data.id,
    })
  },200)

  handleScroll = debounce((obj) => {
    const h = this.state.titleCard.height;
    const navsContentDOM = this.state.navsContentDOM;
    const top  = obj.detail.scrollTop + h

    if(navsContentDOM.length === 0) {
      console.log('获取DOM节点失败')
      return 
    }

    for(let i = 0; i < navsContentDOM.length - 1; i++) {
      
      if(top >= navsContentDOM[i].top && top < navsContentDOM[i + 1].top  ) {
        const id = navsContentDOM[i].id.split('_')[1]
        this.setState({
          _active:+id
        })
        return
      }
    }

    if(top >= navsContentDOM[navsContentDOM.length - 1].top ) {
      const id = navsContentDOM[i].id.split('_')[1]
      this.setState({
        _active:+id
      })
      return
    }

    this.setState({
      _active:+navsContentDOM[0].id.split('_')[1]
    })
    
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
            <ScrollView 
              scrollWithAnimation={true}
              onScroll={this.handleScroll} 
              scrollY={true}	
              className={`${_class}_rt`}
              scrollIntoView={`item_${_active}`}
            >
              <View >
              {
                navs.map(item => (
                  <View key={item.id} id={`item_${item.id}`} className={`${_class}_rt_item`}>{item.name}</View>
                ))
              }
              </View>
            </ScrollView>
        </View>
      </View>
    )
  }
}
