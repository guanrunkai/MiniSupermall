// component/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
item:{
  type:Object,
  value:{}
}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
   itemClick(e){
     
      //1. 获取点击图片获取对应iid 用于跳转路由
     const iid=this.properties.item.iid||this.properties.item.item_id
      //2 .跳转路由
      wx.navigateTo({
        url: '/pages/detail/detail?iid='+iid
      })
   }
  }
})
