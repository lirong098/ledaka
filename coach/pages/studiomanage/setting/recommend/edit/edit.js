// edit.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.studio_id
    var that = this
    wx.request({
      url: publicurl + 'index/Studio/getActivity',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          https: app.globalData.imagesurl,
          info: res.data.info,
          source: res.data.info.logo
        })
      },
      fail: function (res) {
        // fail
      }
    })

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
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // }

  formSubmit: function (e) {
    if (e.detail.value.title == null || e.detail.value.title == "" || e.detail.value.title == undefined) {
      wx.showModal({
        title: '提示',
        content: '活动标题不能为空。',
        showCancel: false
      })
      return;
    }
    var that = this
    wx.request({
      url: publicurl + 'index/Studio/editActivity',
      data: {
        studio_id: studio_id,
        title: e.detail.value.title,
        contents: e.detail.value.contents,
        wish: e.detail.value.wish,
        logo: e.detail.value.logo
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.btnClickShare();
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              // wx.navigateBack({
              //   delta: 1, // 回退前 delta(默认为1) 页面
              // })
            }
          })
        }
      }
    })
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original', 'compressed'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        var tempFilePaths = res.tempFilePaths
        var x = 0
        for (x in tempFilePaths) {
          wx.uploadFile({
            url: publicurl + 'index/uploadfile/uploadfile',
            filePath: tempFilePaths[x],
            name: 'file',
            success: function (res) {
              // success
              var tmp = "";
              // console.log(res.data)
              tmp = tmp.concat(res.data.replace("\"", "").replace("\"", ""))
              tmp = tmp.replace("\\", "")
              // console.log(tmp)
              that.setData({
                https: app.globalData.imagesurl,
                source: tmp
              });
            },
            fail: function () {
              // fail
              wx.showToast({
                title: '网络异常',
                icon: 'loading',
                duration: 2000
              })
            }
          })
        }

      }
    })
  },
  btnClickShare: function () {
    try {
      wx.navigateToMiniProgram({
        // appId: 'wxc335fc380a8f0e0e',
        appId: 'wx68c41ab02c9b0346',
        path: 'pages/studioshare/shareinfo/shareinfo?isfrom=coach&id=' + studio_id,
        extraData: {
        },
         //envVersion: 'develop',
      envVersion: 'release',
        success(res) {
          // 打开成功
        },
        fail(res) {
          wx.showModal({
            title: '提示',
            content: '你的微信版本过低，请升级到最新微信版本后重试。',
            showCancel: false
          })
        }
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '你的微信版本过低，请升级到最新微信版本后重试。',
        showCancel: false
      })
    }

  }

})