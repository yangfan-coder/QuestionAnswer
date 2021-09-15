import { Component } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import cloneDeep from 'lodash/cloneDeep';
import { AtActivityIndicator } from 'taro-ui'
import './index.less'

import { leftList, rightCenter} from '../../static/static'

const CACHE = {}; // 缓存切换的数据
const CACHE_CENTER = {} // 缓存全部的数据

export default class Index extends Component {

  state = {
    list:{},
    loading:false,  // 加载菊花
    scrollTop:0,
    id:'111' // 记录的ID
  }

  timer = null; 
  limit = 8; // 显示8条显示

  componentDidMount (){
    this.init()
    
  }
  componentWillUnmount () { 
    clearTimeout( this.timer)
  }

  init = async () => {
    const { id } = this.state
    const result = await this.mockRequest(id)
    this.renderCategoryList(result, id)
  }

 // todo 获取限制商品列表的个数&当前的商品楼层
  limitRenderShop = (_category) => {
    let muns = 0; // 记录数字
    
    if(_category.children && _category.children.length) {

      const _ch = _category.children;
      
      for (let i = 0; i< _ch.length; i++) {

        if( muns >= this.limit) {
          return [_ch[i], i ]
        }
        muns+= _ch[i].children.length

        // 循环结束
        if( i === _ch.length - 1) return [null, -1];
      }
    } 
    
    return null
  }
  // todo 初始右侧渲染前三个行
  renderCategoryList = (category, catId) => {

    const _category = cloneDeep(category)
    const [data, index] = this.limitRenderShop(_category)
    _category.children = _category.children.slice(0, index);

    if(!data) {
      this.setState({
        list:category,
        id:catId,
        scrollTop:this.state.scrollTop - 1,
      })
      CACHE[catId] = {...category,_index:index};
    }else {
      this.setState({
        list:_category,
        id:catId,
        scrollTop:this.state.scrollTop - 1,
      })
      CACHE[catId] = {..._category,_index:index};
    }
    CACHE_CENTER[catId] = category
  }
  // 模拟请求
  mockRequest = (id) => {
    clearTimeout( this.timer)
    return new Promise((resolve) => {
      this.timer = setTimeout(() => {
        const _list = rightCenter.find(_item => _item.id === id)
        resolve(_list)
      },500)
    })
  }

  // 左侧切换
  handleTab = async (item) => {
    const { id } = item
    
    console.log(CACHE[id])
    // 每次切换缓存记录
    if(CACHE[id]) {
      this.setState({
        list:CACHE[id],
        scrollTop:this.state.scrollTop - 1,   // tips: 每次都是可变的、才起变化
        id
      })
      return 
    }

    const result = await this.mockRequest(id)
    this.renderCategoryList(result, id)
  }

  // 下拉刷新
  onScrollToLower = () => {
    const { id } = this.state
    const _cache = CACHE[id]
    const _cache_center = CACHE_CENTER[id]

    this.setState({ loading : false })
    // 1、 如果初始的时候没有进行分页 那么就直接返回 证明数据量很少
    if(_cache._index === -1) return 
    if(_cache.children.length === _cache_center.children.length) return 

    const index = _cache._index
    _cache.children = _cache_center.children.slice(0, index + 1)

    this.setState({
      list:_cache,
      loading:true
    },() => {
      _cache._index = index + 1
    })
    
  }

  render () {
    const { list, loading, scrollTop } = this.state
    console.log(scrollTop)
    return (
      <View className='page-center'>
          <View className='left-center'>
            {
              leftList.map(item => (
                <View key={item.id} className='left-items' onClick={ () => this.handleTab(item)}>{ item.massage}</View>
              ))
            }
          </View>
          <ScrollView 
            style={ { height:"100vh"}}
            lowerThreshold={100}
            scrollY={true}
            scrollTop={scrollTop}
            onScrollToLower={ this.onScrollToLower }
          >
            {
            list.children && list.children.map((_item, index) => {
                return (
                  <View key={index} className='right-cneter'>
                  <View className='right-cneter-title'>{_item.massage}</View>
                  <View className='right-cneter-list'>
                    {
                      _item.children.map((__item, _index) => (
                        <View  key={_index} className='right-cards'>
                            <Image className='right-cards-imgs'  src={ __item.img} />
                            <View className='right-card-info'>{__item.massage}</View>
                        </View>
                      ))
                    }
                  </View>
                  </View>
                )
              })
            }
            <AtActivityIndicator className='activity-indicator' isOpened={loading} content='加载中...' size={32} />
          </ScrollView>
      </View>
    )
  }
}
