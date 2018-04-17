// pages/studiomanage/bus/studentfrom/studentfrom.js
var app = getApp()
var publicurl = app.globalData.publicurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studio_id:0,
    trainee:[],
    trainee_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      trainee_id:options.id,
      studio_id: options.studio_id
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
    let that = this
    wx.request({
      url: publicurl + 'index/Coach/trainee_from_info',
      data: {
        trainee_id: that.data.trainee_id,
        studio_id: that.data.studio_id,
      },
      success: function (res) {
        that.setData({
          trainee:res.data
        });
      },  
      fail: function () {
        // fail
      },
      
    })
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
  /*拨打电话*/
  calling:function(){
    let that = this;
    console.log(that.data.trainee.trainee_phone_from.trainee_phone);
    if (that.data.trainee.trainee_phone_from.trainee_phone != "") {
      wx.makePhoneCall({
        phoneNumber: that.data.trainee.trainee_phone_from.trainee_phone,
        success: function () {
           console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    };
  }
})