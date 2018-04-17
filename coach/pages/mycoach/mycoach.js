// pages/mycoach/mycoach.js
var app = getApp()
var publicurl = app.globalData.publicurl
var msg
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    msg = options.msg
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this
    wx.request
      ({
        url: publicurl+'index/Coach_Trainee/traineeofcoach',
        data: {
          trainee_id:app.globalData.id,
          msg:msg
        },
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
  radioChange: function(e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value)
    if(msg =='1'){
          var coach_id = e.detail.value
          wx.request({
            url: publicurl+'index/Coach_Trainee/updatelastcoach',
            data: {
              coach_id:coach_id,
              trainee_id:app.globalData.id
            },
            success: function(res){
              // success

              wx.switchTab({
                url: '../reserprogram/reserprogram',
              })
            },
            fail: function() {
              // fail
            }
          })
    }
    if(msg == '2'){
      wx.setStorage({
            key:"laststudio",
            data:e.detail.value
            // data:'10'
      })
      wx.switchTab({
         url: '../reserprogram/reserprogram',
      })
    }
  }
})