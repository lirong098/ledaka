// pages/myinfo/myinfo.js
var app = getApp()
var publicurl = app.globalData.publicurl
var list
var text = null
var phone = ""
var coach_id = 0
var files = []
Page({
  data: {
    main_text: '这一刻的想法......',
    files: [],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    ismyinfo: 0,
    showtxt: '我的课程'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    /** 
     * 获取系统信息 
     */
    if (options.id != undefined) {
      coach_id = options.id;
    } else {
      coach_id = 0;
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight - 400 / 750 * res.windowWidth
        });
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    // 获取基础信息
    if (coach_id == 0 || coach_id == app.globalData.id) {
      coach_id = app.globalData.id;
      wx.setNavigationBarTitle({ title: '我的主页' })
      that.setData({
        ismyinfo: 1,
        showtxt: '我的课程'
      })
    } else {
      wx.setNavigationBarTitle({ title: '教练详情' })
      that.setData({
        ismyinfo: 0,
        showtxt: '教练课程'
      })
    }
    wx.request({
      url: publicurl + 'index/Coach/coachinfo',
      data: {
        coach_id: coach_id
      },
      success: function (res) {
        // success
        //console.log(res.data.url['0'])
        text = res.data.info.coach_introduction
        phone = res.data.info.phone
        if (!res.data.info.phone) {
          res.data.info.phone = "暂无手机";
        }
        files = res.data.url
        that.setData({
          info: res.data.info,
          files: res.data.url,
          https: app.globalData.imagesurl,
          coach_id: app.globalData.id
        })
        list = res.data.url
      },
      fail: function () {
        // fail
      }
    })

    // 教练课程
    wx.request({
      url: publicurl + 'index/Program/search',
      data: {
        coach_id: coach_id
      },
      success: function (res) {
        // success
        that.setData({
          list: res.data
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
  chooseImage: function (e) {
    var that = this;
    var images_length = that.data.files.length
    if (images_length >= 9) {
      wx.showModal({
        title: '提示',
        content: '最多上传的九张图片！',
        showCancel: false
      })
    } else {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          var img_length = images_length + tempFilePaths.length
          if (img_length <= 9) {
            var x = 0
            for (x in tempFilePaths) {
              wx.uploadFile({
                url: publicurl + 'index/uploadfile/coachinfo?coach_id=' + app.globalData.id,
                filePath: tempFilePaths[x],
                name: 'file',
                success: function (res) {
                  // success
                  // console.log(res)
                  list = list.concat(res.data.replace("\"", "").replace("\"", ""))
                  that.setData({
                    files: list
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
          } else {
            wx.showModal({
              title: '提示',
              content: '最多上传的九张图片！',
              showCancel: false
            })
          }
        }
      })
    }
  },
  //删除图片
  deleteimage: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          var index = e.currentTarget.dataset.index
          wx.request({
            url: publicurl + 'index/Coach/deleteimages',
            data: {
              url: list[index]
            },
            success: function (res) {
              // success
              if (res.data == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                list.splice(index, 1)
                //fileslist.splice(index,1)
                that.setData({
                  files: list
                })
              }
            },
            fail: function (res) {
              // fail
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
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
  previewImage: function (e) {
    var ss = e.currentTarget.id
    var sss = []
    // sss = sss.concat(ss)
    for (var i = 0; i < files.length; i++) {
      sss.push(app.globalData.imagesurl + files[i]);
    }
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  jointrainee: function() {
    try {
      wx.navigateToMiniProgram({
         //appId: 'wxc335fc380a8f0e0e',
        appId: 'wx68c41ab02c9b0346',
        path: 'pages/mycoachinfo/mycoachinfo?isfrom=coach&coach_id=' + coach_id,
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