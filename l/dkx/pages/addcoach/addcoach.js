// pages/addcoach/addcoach.js
var app = getApp()
var coachid
var array
var publicurl = app.globalData.publicurl
Page({
  data:{
  },
  formSubmit:function(e){
    var that=this
      wx.request({
        url: publicurl+'index/Trainee/coachid',
        data: {
          coach_id: e.detail.value.coach_id
        },
        success: function(res) {
              array = res.data
             that.setData({
               array:res.data
             })
        }
      })
  },
  bindtapadd:function(event){
    var index = event.currentTarget.dataset.index
    var name =  array[index].coach_name
    var coach_id = array[index].id
    wx.request({
      url: publicurl+'index/Coach_Trainee/add',
      data: {
        trainee_id:app.globalData.id,
        coach_id:coach_id,
        notification_into:1
      },
      success: function(res){
        console.log(res.data)
        wx.showToast({
              title: res.data.text,
              icon: 'success',
              duration: 2000
            })
      },
      fail: function() {
        // fail
      },
    })
  },
    onLoad:function(options){
    var that = this
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