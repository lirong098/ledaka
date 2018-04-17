// pages/studioinfo/studioinfo.js
var AppUtil = require('../../utils/AppUtil');
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id
var coach_id
var notifi_id
var name = ""
var studio_name = ""
var phone = ""
var images = ''
var files = []
var thatOptions
var optionsType = ""
Page({
  data: {
    currentTab: 0,
    ismystudio: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    thatOptions = options
    studio_id = options.id
    notifi_id = options.notifi_id
    if (options.onShareAppMessage != undefined) {
      optionsType = options.onShareAppMessage
    } else {
      optionsType = ""
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    coach_id = app.globalData.id
    // 分享出去后 初始coach_id
    if (coach_id == null) {
      app.globalData.id = wx.getStorageSync('id')
      coach_id = app.globalData.id
    }
    wx.request({
      url: publicurl + 'index/Studio/studioinfo',
      data: {
        studio_id: studio_id,
        coach_id: coach_id,
        notifi_id: notifi_id
      },
      success: function (res) {
        // success
        files = [];
        images = res.data.studioinfo.images;
        if (images != "" && images != null) {
          files = images.split(";")
        }
        phone = res.data.studioinfo.phone
        name = res.data.name
        studio_name = res.data.studioinfo.studio_name
        that.setData({
          https: app.globalData.imagesurl,
          studioinfo: res.data.studioinfo,
          count: res.data.count,
          coachinfo: res.data.coachinfo,
          files: files,
          ismystudio: res.data.ismystudio,
          studio_id: studio_id,
          qrcode: app.globalData.imagesurl + res.data.qrcode
        })
      },
      fail: function () {
        // fail
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
    return {
      title: name + '邀请你加入工作室',
      path: '/pages/studioinfo/studioinfo?id=' + studio_id + '&onShareAppMessage=studioinfo',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  calling: function () {
    if (phone != "") {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: function () {
          // console.log("拨打电话成功！")
        },
        fail: function () {
          // console.log("拨打电话失败！")
        }
      })
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  previewImage: function (e) {
    var ss = e.currentTarget.id
    ss = ss.replace("\\", "")
    var sss = []
    for (var i = 0; i < files.length; i++) {
      var tmp = files[i];
      tmp = app.globalData.imagesurl + tmp.replace("\\", "")
      sss.push(tmp)
    }
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  previewQRcode: function (e) {
    var ss = app.globalData.imagesurl + "studioqrcode/studio_" + studio_id + '.png'
    var sss = []
    sss = sss.concat(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  bindonShare: function () {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试，或请点击右上角的三个点，选择“转发”发送给朋友。'
      })
    }
  },
  joinstudio: function () {
    var that = this;
    // 新用户
    var result = {}
    // wx.removeStorageSync('id')
    // app.globalData.id = wx.getStorageSync('id')
    if (app.globalData.id == null || app.globalData.id == '') {
      AppUtil.getUserInfo(that, thatOptions, result, function (_that) {
        wx.request({
          url: publicurl + 'index/Studio/joinStudio',
          data: {
            studio_id: studio_id,
            coach_id: app.globalData.id
          },
          success: function (res) {
            // success
            // console.log(res.data)
            if (res.data.code == 1) {
              //加入成功后更新信息
              wx.request({
                url: publicurl + 'index/Studio/studioinfo',
                data: {
                  studio_id: studio_id,
                  coach_id: coach_id
                },
                success: function (res) {
                  // success
                  _that.setData({
                    coachinfo: res.data.coachinfo,
                    ismystudio: 0
                  })
                },
                fail: function () {
                  // fail
                }
              })

            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg
              })
            }
          },
          fail: function () {
            // fail
          }
        })
      });
    } else {
      wx.request({
        url: publicurl + 'index/Studio/joinStudio',
        data: {
          studio_id: studio_id,
          coach_id: app.globalData.id
        },
        success: function (res) {
          // success
          // console.log(res.data)
          if (res.data.code == 1) {
            wx.showModal({
              title: '提示',
              content: "你已加入“" + studio_name + "”工作室，请点击进入“我”->“工作室”中查看。",
              showCancel: false,
              success: function (res) {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            })
            //加入成功后更新信息
            wx.request({
              url: publicurl + 'index/Studio/studioinfo',
              data: {
                studio_id: studio_id,
                coach_id: coach_id
              },
              success: function (res) {
                // success
                that.setData({
                  coachinfo: res.data.coachinfo,
                  ismystudio: res.data.ismystudio
                })
              },
              fail: function () {
                // fail
              }
            })

          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg
            })
          }
        },
        fail: function () {
          // fail
        }
      })
    }
  },
  /*教练退出工作室*/
  update_coach_studio: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: "退出功能一般只在教练离开工作室的时候使用，你确定要离开该工作室吗？",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: publicurl + 'index/Studio/update_coach_studio',
            data: {
              studio_id: studio_id,
              coach_id: app.globalData.id
            },
            success: function (res) {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function (obj) {
                  if (res.data.code == 1) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            },
            fail: function () {
            }
          })
        }
      }
    })
  }
})