// pages/addprogram/addprogram.js
var app = getApp()
var publicurl = app.globalData.publicurl
var program_id
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     program_id= options.program_id
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    if(program_id >0){
        var that =this
        wx.request({
          url: publicurl+'index/Program/selectname',
          data: {
            program_id:program_id
          },
          success: function(res){
            // success
            console.log(res.data)
            that.setData({
              program_name: res.data.program_name
            })
          },
          fail: function(res) {
            // fail
          }
        })
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
formSubmit:function(e){
      wx.request({
        url: publicurl+'index/Program/add?coach_id='+app.globalData.id,
        data: {
          name: e.detail.value.name,
          program_id:program_id
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
        }
      })
  }
})