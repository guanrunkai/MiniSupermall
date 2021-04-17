// pages/home/childComponent/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  recommends:{
    type:Array,
    value:[]
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
  isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerImageLoad(){
      // 此时设置变量是为了 发出去的事件只发出去一次
      if(!this.data.isLoad){
        
        this.triggerEvent('imageload')
        this.data.isLoad=true
      }
      
    }
  }
})
