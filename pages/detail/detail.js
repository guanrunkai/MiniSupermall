// pages/detail/detail.js
import
{
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
}
from '../../service/detail'
const app = getApp()
Page({
  data:{
   iid:'',
   topImages: [],
   goods: {},
   shops: {},
   detailInfo: {},
   paramsInfo: {},
   commentInfo: {},
   recommends:{},
   isBackTop:false
  },
  onLoad:function(options){
    // 1. 获取商品iid
    this.setData({
      iid:options.iid
    })
   
    // 2. 获取详情页数据
    this._getDetailData()

    // 3. 获取推荐数据
    this._getRecommend()
  
  },
// ---------------------获取详情页数据---------------//
  _getDetailData(){
     getDetail(this.data.iid).then((res)=>{
       const result=res.data.result

      
         // 获取详情页 上方商品图片 轮播
         
       const topImages=result.itemInfo.topImages
       
       
         // 获取商品相关信息 价格 服务 标题 销量 收藏
       const goods=new Goods(
         result.itemInfo,
         result.columns,
         result.shopInfo.services
       )
       // 获取店铺评价 logo
       const shops=new Shop(
         result.shopInfo
       )
      

       //获取商品尺码相关信息

       const paramsInfo=new GoodsParam(
         result.itemParams.info,
         result.itemParams.rule
       )

       //获取评论信息 判断评论是否为空
       let commentInfo={}
       if(result.rate&&result.rate.cRate>0){
        commentInfo=result.rate.list[0]
       }
       
       // 获取下方推荐数据信息
       const detailInfo=result.detailInfo
      
      this.setData({
        topImages,
        goods,
        shops,
        paramsInfo,
        commentInfo,
        detailInfo
      })

     })
  },
  _getRecommend(){
     getRecommend().then((res)=>{
       this.setData({
         recommends:res.data.data.list
       })
      
     })
  },
  // 回到顶部按钮点击事件
  handleBackTop(options){
    wx.pageScrollTo({
      duration: 500,
      scrollTop:0
    })
  },
  onPageScroll(options){
    const Target=1000
   const NowScroll=options.scrollTop
   if(NowScroll>=Target){
     this.setData({
       isBackTop:true
     })
   }else{
     this.setData({
       isBackTop:false
     })
   }
  },
  onAddCart(){
     // 获取商品对象

     const obj = {}
     obj.iid = this.data.iid
     obj.imageURL= this.data.topImages[0]
     obj.title = this.data.goods.title
     obj.desc = this.data.goods.desc
     obj.price = this.data.goods.realPrice

     //加入购物车列表

     app.addToCart(obj)

     //加入成功提示
     wx.showToast({
       title: '加入购物车成功',
     })
     
  }

})
