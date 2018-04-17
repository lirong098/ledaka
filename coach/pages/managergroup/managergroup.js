// pages/managergroup/managergroup.js
var app=getApp()
var publicurl = app.globalData.publicurl
Page({
  data:{
    array:{},
    addgroup:"新增分组"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this
     wx.request
     ({
                url: publicurl+'index/Coach_Group/selectgroup?coach_id='+app.globalData.id,
                success: function(res){
                  console.log(res.data)
                   that.setData({
                      array:res.data
                   })
                },
     })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  addprogram:function(){
    var that =this
    wx.navigateTo({
      url: '../addgroup/addgroup'
    })
  }
})