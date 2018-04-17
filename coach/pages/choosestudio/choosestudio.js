// choosestudio.js
let app = getApp();
let publicurl = app.globalData.publicurl;
let studio_id =0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    https: app.globalData.imagesurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.studio_id;
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
    let that = this;
    wx.request({
      url: publicurl +'index/Coach/coach_studio_list',
      data:{
        coach_id: app.globalData.id,
        studio_id:studio_id
      },
      success:function(res){
        that.setData({
          array:res.data
        });
      }
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
  radioChange:function(e){
 //   console.log(e.detail.value);
    wx.setStorageSync("last_studio", e.detail.value);
    wx.navigateBack({
      delta:1
    });
  }
})