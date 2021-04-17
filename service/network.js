import {baseUrl,timeout} from './config'

export default function(options){
   
   wx.showLoading({
     title: '数据加载中ing~',
   })


  return new Promise((resolve,reject)=>{
  wx.request({
    url:baseUrl+options.url,
    method:options.method||'get',
    data:options.data||{},
    success:resolve,
    fail:reject,
    complete:success=>{
      wx.hideLoading(
      )
    }
  })

  })


}