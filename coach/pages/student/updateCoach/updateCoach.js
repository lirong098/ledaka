// pages/student/updateCoach/updateCoach.js
let app = getApp();
let publicurl = app.globalData.publicurl;
let ShowModal = require('../../../utils/ShowModal.js');
let schedule_id = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =  this;
    schedule_id = options.schedule_id;
    wx.request({
      url: publicurl+'index/Coach/studioCoachList',
      data:{
        options: options,
        coach_id:app.globalData.id
      },
      success:function(res){
        that.setData({
          coachList:res.data
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  * 选择教练
  */
  radioChange:function(e){
    console.log(e.detail.value);
    let that = this;
    ShowModal.showModal(function(){
      wx.request({
        url: publicurl +'index/Coach/scheduleUpdateCoach',
        data:{
          schedule_id: schedule_id,
          coach_id: e.detail.value,
          coach: app.globalData.id
        },
        success:function(res){
          let isImplement = false;//执行函数
          let text = "替换成功。";
          let icon = "success";
          if(res.data == 0){
             isImplement = true;//不执行函数
             text = "替换失败。";
             icon = "loading";
          }
          ShowModal.showToast(function(){
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }, text, icon, 2000, isImplement);
        }
      })
    },  '操作提示', '确定要替换教练吗？', true,false);
  }
})