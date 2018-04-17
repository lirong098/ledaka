// pages/usercenter/usercenter.js
//获取应用实例
var app = getApp()
var publicurl = app.globalData.publicurl
Page({
  data:{
    name:"姓名",
    icon:"﹥",
    expertise:"电话",
    text:"150 8619 7842",
    studio:"公司",
    qrcode:"行业",
    curriculum:"课程",
    advise:"反馈与建议",
    motto:"运动座右铭",
    order:"买课记录",
    ind_coope:"普华永道",
    industry:"金融"
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
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