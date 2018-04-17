// pages/specialty/specialty.js
var app=getApp()
var publicurl = app.globalData.publicurl
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
    formSubmit:function(e){
     console.log(e.detail.value)
      wx.request({
        url: publicurl+'index/coach/editcoach_name?coach_id='+app.globalData.id,
        data: {
          expertise: e.detail.value.expertise
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
              //console.log(res.data)
              wx.switchTab({
                url: '../usercenter/usercenter',
                success: function(res){
                  // success
                },
                fail: function() {
                  // fail
                },
              })
        }
      })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindlinechange:function(e){
    console.log(e)
  }
})