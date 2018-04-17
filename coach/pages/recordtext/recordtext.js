// pages/recordtext/recordtext.js
var app = getApp()
var publicurl = app.globalData.publicurl
var record_id
var list
Page({
  data: {
    files: [],
    save: '写教练备注',
    recordinfo: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    record_id = options.record_id
    that.setData({
      record_id: record_id,
      url: app.globalData.imagesurl
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/Class_Record/recordtext',
      data: {
        record_id: record_id,
        coach_id: app.globalData.id
      },
      success: function (res) {
        // success
        that.setData({
          files: res.data.url,
          recordinfo: res.data
        })
        list = res.data.url
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
                url: publicurl + 'index/uploadfile/index?record_id=' + record_id,
                filePath: tempFilePaths[x],
                name: 'file',
                success: function (res) {
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
  previewImage: function (e) {
    var that = this
    var ss = e.currentTarget.id
    var sss = that.data.files;
    for (var x in sss) {
      sss[x] = that.data.url + sss[x];
    }
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
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
            url: publicurl + 'index/Class_Record/deleteimages',
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
  }
})