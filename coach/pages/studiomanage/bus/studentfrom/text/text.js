// pages/studiomanage/bus/studentfrom/text/text.js
let text ="";
let app = getApp();
let publicurl = app.globalData.publicurl;
let ShowModal = require('../../../../../utils/ShowModal.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    studio_id:0,
    trainee_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    text = options.other
    that.setData({
      studio_id:options.studio_id,
      trainee_id:options.trainee_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.setData({
      text:text
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  formSubmit:function(e){
    let that = this
    if (text != e.detail.value.other){
      wx.request({
        url: publicurl+'index/Index/update_other',
        data:{
          other: e.detail.value.other,
          studio_id:that.data.studio_id,
          trainee_id:that.data.trainee_id
        },
        success:function(res){
          if(res.data == 1){
            ShowModal.showToast(function(){
              wx.navigateBack({
                delta:1
              })
            },'保存成功');
          }else{
            ShowModal.showToast(function () {
              wx.navigateBack({
                delta: 1
              })
            }, '保存失败','loading');
          }
        }
      })
    }else{
      ShowModal.showToast(function () {
        wx.navigateBack({
          delta: 1
        })
      }, '保存成功');
    }
  }
})