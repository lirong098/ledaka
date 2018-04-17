// pages/expertise/expertise.js
var app = getApp()
var coachid
var publicurl = app.globalData.publicurl
Page({
  data:{
  },
  formSubmit:function(e){
    //console.log(e.detail.value.name)
      wx.request({
        url: publicurl+'index/coach/editcoach_expertise?coach_id='+app.globalData.id,
        data: {
          expertise: e.detail.value.name
        },
        success: function(res) {
          if(res.data=='1'){
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
          }else{
              wx.showModal({
                    title: '注意',
                    content: '请刷新后重新保存',
              })
          }
        },
        fail: function() {

        }
      })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  }
})