// pages/motorgroup/recordlist/recordlist.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var recordlist = require('../notice/notice.js')
var page =1
var trainee_id
var studiolist =0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.imagesurl,
    recordlist:[],
    hasMore: true,
    studio_id:'',
    mouth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studiolist = 0
    trainee_id = options.trainee_id;
    studiolist = options.studiolist;
    var that =this
    that.setData({
      studiolist: studiolist,
      studio_id: options.studio_id,
      mouth: options.mouth
    })
    console.log(that.data.studio_id)
    console.log(that.data.mouth)
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
    wx.stopBackgroundAudio();
    var qty = page * 10
    var that =this
    recordlist.recordlist(publicurl, page, qty, 2,trainee_id, function(list){
      if (!list.data.trainee_info.motto) list.data.trainee_info.motto ="运动是一种自由。"
      that.setData({
        recordlist: list.data.recordarray,
        trainee_info: list.data.trainee_info
      })
      //console.log(that.data.recordlist)
    }, that.data.studio_id,that.data.mouth);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  loadMore: function () {
    var that = this
    if (!that.data.hasMore) return
    ++page
    recordlist.recordlist(publicurl, page, 10, 2, trainee_id, function (list) {
      if (list.data.recordarray && list.data.recordarray.length > 0) {
        that.data.recordlist.push.apply(that.data.recordlist, list.data.recordarray)
      }
      if (list.data.recordarray.length < 10) {
        that.setData
          ({
            hasMore: false
          })
      }
      that.setData
        ({
          recordlist: that.data.recordlist,
        })
    },that.data.studio_id, that.data.mouth);
  }
})