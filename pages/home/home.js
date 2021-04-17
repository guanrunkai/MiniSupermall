
// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home'
Page({

  data: {
banners:[],
recommends:[],
currentType:'pop',
goods:{
  pop:{page:0,list:[]},
  new:{page:0,list:[]},
  sell:{page:0,list:[]}
},
showBackTop:false,
isTabFixed:false,
tabControlScrollTop:0

  },
  onLoad: function (options) {
     //1.请求轮播图以及推荐商品相关数据 
    this._getMultiData()
         
     //2.请求下方 三个类别的 商品
     this._getGoodsData('pop')
     this._getGoodsData('new')
     this._getGoodsData('sell')
  },
  //-------------  网络请求相关封装函数 -----------
            //-------- 首页轮播图 轮播图下方 四个圆推荐 封装函数-----//
  _getMultiData(){
    getMultiData().then((res)=>{
      // 获取出 轮播图 和 推荐 数据
      const banners=res.data.data.banner.list.map(item=>{
        return item.image
      })
      const recommends=res.data.data.recommend.list
      //将数据 存入 data中
      this.setData({
        banners,
        recommends
      })
    })
  },
             //--- 首页下方商品网络请求封装函数----//
  _getGoodsData(type){
  // 1.请求页码
    const page =this.data.goods[type].page+1
  // 2.发送网络请求
    getGoodsData(type,page).then((res)=>{
       //2.1 取出数据
       const list=res.data.data.list
       //2.2 将数据设置到对应type的list 中
       const oldList=this.data.goods[type].list
      // ...为解构数组语法
       oldList.push(...list)
        const typeKey=`goods.${type}.list`
        const pageKey=`goods.${type}.page`
        //2.3 将数据设置到data的goods中
       this.setData({
        [typeKey]:oldList,
        [pageKey]:page
       })
       
 })
  },


  //--------------------- 事件监听函数--------------
       ///-- 切换 新款 流行 精选 按钮展示的数据
  handlerChangeGoods(event){
        //取出index索引值  就是获取此时 点击了哪个类别（新款 流行 精选）
        const index=event.detail.index
        const types=['pop','new','sell']
        //更改currentType
        const type=types[index]
        this.setData({
          currentType:type
        })
        
      },
      //--- 获取tab control组件到顶部距离  此时函数想要回调出rect 必须执行.exec()
  // 需等待 h-recommend 图片加载完 再确定 高度
      handlerImageLoad(){
       
          wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
            
            this.data.tabControlScrollTop=rect.top
          }).exec()
        
      },
      //----- 上拉加载更多 请求更多的数据-----//
      onReachBottom(){
            this._getGoodsData(this.data.currentType)
      },
      //----- 页面回到顶部------//
      backTop(){
        wx.pageScrollTo({
          duration: 500,
          scrollTop:0
        })
      },
      onPageScroll(options){
        const TOP_Distance=1000
        ///1. 取出ScrollTop
        const scrollTop=options.scrollTop
        const flag1=scrollTop>=TOP_Distance
       
        ///2.修改showBackTop属性
          this.setData({
            showBackTop:flag1
          })
        
        ///3.修改isTabFixed属性
        const flag2=scrollTop>=this.data.tabControlScrollTop
        if(flag2!=this.data.isTabFixed){
          this.setData({
            isTabFixed:flag2
          })
        }

      
},
})