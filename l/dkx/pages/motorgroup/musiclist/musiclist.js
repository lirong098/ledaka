// pages/motorgroup/musiclist/musiclist.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var page =1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    musiclist: [],
    musicshow: true,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page =1;
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
    var that = this
    /*QQ音乐*/
    // wx.request({
    //   url: publicurl + 'index/Mysuccess/music_api_list',
    //   method: 'GET',
    //   success: function (res) {
    //     that.setData({
    //       musiclist: res.data.songlist
    //     })
    //   }
    // })
    /*百度音乐*/
    var size = page*15;//获取音乐的数量
    var qty = 0;//获取音乐的偏移量
    that.music_api_list(size,qty,function(list){
      that.setData({
        musiclist: list.data.song_list
      })
    });
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
  // onShareAppMessage: function () {

  // },
  //搜索音乐
  Qqyy: function (name = "周杰伦") {
    var that = this
    /*QQ音乐*/
    // wx.request({
    //   url: publicurl + 'index/Mysuccess/music_api',
    //   data: {
    //     name: name
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     if (res.data.length > 0) {
    //       that.setData({
    //         musiclist: res.data
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //   }
    // })
    /*百度音乐*/
    wx.request({
      url: publicurl + 'index/Mysuccess/music_api',
      data: {
        name: name
      },
      success: function (res) {
        if (res.data.length > 0) {
          console.log(res.data)
          that.setData({
            musiclist: res.data
          })
        }
      },
      fail: function (res) {
      }
    })
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var that = this
    that.Qqyy(e.detail.value);
    that.setData({
      inputVal: e.detail.value,
      musicshow: false
    });
  },
  changemusic: function (e) {
    var that = this
    /*QQ音乐*/
    // if (e.currentTarget.dataset.songmid) {
    //   console.log(e.currentTarget.dataset.songmid)
    //   // wx.setStorage({
    //   //   key: "musicsrc",
    //   //   data: e.currentTarget.dataset.songmid
    //   // })
    //   wx.setStorageSync('musicsrc', e.currentTarget.dataset.songmid);
    //   wx.navigateBack({
    //     delta:1
    //   })
    // }
    /*百度音乐*/
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.songmid) {
      wx.request({
        url: publicurl + 'index/Mysuccess/music_api_info',
        data: {
          songid: e.currentTarget.dataset.songmid
        },
        success: function (res) {
          wx.setStorageSync('musicsrc', res.data);
          wx.setStorageSync('musictitle', e.currentTarget.dataset.title);
          wx.setStorageSync('musicauthor', e.currentTarget.dataset.author);
          wx.setStorageSync('musicpic_big', e.currentTarget.dataset.pic_big);
          wx.navigateBack({
            delta: 1
          })
        },
        fail: function (res) {
        }
      })
    }
  },
  /*加载更多*/
  loadMore:function(e){
    console.log(page);
    var that = this
    if (!that.data.hasMore) return;
    var qty = page*15;
    var size =15;
    that.music_api_list(size,qty,function(list){
      if (list.data.song_list && list.data.song_list.length > 0) {
        that.data.musiclist.push.apply(that.data.musiclist, list.data.song_list);
        if (list.data.song_list.length < 15) {
          that.setData({
            hasMore: false,
          });
        }
        that.setData({
          musiclist: that.data.musiclist
        })
        ++page
      }
    });
  },
  /*音乐列表
  size:获取音乐的数量
  qty:获取音乐的偏移数量
  */
  music_api_list: function (size,qty,fun){
    var that = this
    /*百度音乐*/
    wx.request({
      url: publicurl + 'index/Mysuccess/music_api_list',
      data:{
        size:size,
        offset: qty
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        fun(res)
      }
    })
  }
})