// pages/addcard/addcard.js7777
var app=getApp()
var publicurl = app.globalData.publicurl
var id
Page({
  data:{
    cardname:'名称',
    prompt:'填写会员卡名称',
    cardtext:'简介',
    save:'保存'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    id= options.id
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that =this
    if(id){
        wx.request({
          url: publicurl+'index/Membership/cardinfo',
          data: {
            id:id 
          },
          success: function(res){
            // success
            that.setData({
              name:res.data.name,
              id: id
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
    console.log(e.detail.value)
      var publicurl = app.globalData.publicurl
      wx.request({
        url: publicurl+'index/Membership/add?coach_id='+app.globalData.id,
        data: {
          membership_name: e.detail.value.name,
          card_id:e.detail.value.card_id
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
              if(res.data ==1){
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000,
                  success:function(){
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              }else if(res.data ==2){
                wx.showModal({
                  title: '注意',
                  content: '此会员卡已产生相关的订单，不可删除',
                  showCancel:false
                })
              }
        }
      })
  }
})