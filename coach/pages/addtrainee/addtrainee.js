// pages/addtrainee/addtrainee.js
var app = getApp()
var coachid
var array
var publicurl = app.globalData.publicurl
Page({
  data:{  
  },
  formSubmit:function(e){
    var that=this
    console.log(e.detail.value.coach_id)
      wx.request({
        url: publicurl+'index/Coach/traineeid',
        data: {
          trainee_id: e.detail.value.coach_id
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
              array = res.data
              console.log(array)
             that.setData({
               array:res.data
             })
        }
      })
  },

  bindtapadd:function(event){
    var index = event.currentTarget.dataset.index
    var name =  array[index].trainee_name
    var trainee_id = array[index].id
    //console.log(coach_id)
    console.log(app.globalData.id)
    wx.request({
      url: publicurl+'index/Coach_Trainee/add',
      data: {
        coach_id:app.globalData.id,
        trainee_id:trainee_id,
        notification_into :2
      },
      success: function(res){
        wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
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