// pages/addprogram/addprogram.js
var app = getApp()
var publicurl = app.globalData.publicurl
var program_id
var program_name
var files = []
var images = ""
var images_length = 0
var coach_id
Page({
  data: {
    source: "",
    files: [],
    ismyclass: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    program_id = options.program_id
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    if (program_id > 0) {
      var that = this
      wx.request({
        url: publicurl + 'index/Program/selectname',
        data: {
          program_id: program_id
        },
        success: function (res) {
          // success
          // console.log(res.data)
          files = [];
          images = res.data.program.images;
          if (images != "" && images != null) {
            files = images.split(";")
          }
          images_length = files.length;
          coach_id = res.data.program.coach_id
          if (app.globalData.id == res.data.program.coach_id) {
            var pages = getCurrentPages();
            if (pages.length < 5) {
              that.setData({
                ismyclass: 1
              })
            } else {
              that.setData({
                ismyclass: 0
              })
            }
          } else {
            that.setData({
              ismyclass: 0
            })
          }
          // console.log(res.data)
          program_name = res.data.program.program_name
          that.setData({
            https: app.globalData.imagesurl,
            program: res.data.program,
            coach: res.data.coach,
            source: res.data.program.logo,
            files: files
          })
        },
        fail: function (res) {
          // fail
        }
      })
    }



  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  btnClick: function (e) {
    wx.navigateTo({
      url: '/pages/addprogram/addprogram?program_id=' + program_id,
    })
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
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
              console.log(res.data);
              var tmp = "";
              tmp = tmp.concat(res.data.replace("\"", "").replace("\"", ""))
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
  uploadImage: function (e) {
    var that = this;
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
                url: publicurl + 'index/uploadfile/uploadfile',
                filePath: tempFilePaths[x],
                name: 'file',
                success: function (res) {
                  // success
                  // console.log(res.data)
                  var tmp = ""
                  tmp = tmp.concat(res.data.replace("\"", "").replace("\"", ""))
                  files.push(tmp)
                  images_length++;
                  if (images == "") {
                    images = tmp
                  } else {
                    images = images + ";" + tmp
                  }
                  that.setData({
                    https: app.globalData.imagesurl,
                    files: files
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
          var index = e.currentTarget.dataset.index;
          files.splice(index, 1);
          images_length++;
          images = "";
          images = files[0];
          for (var i = 1; i < files.length; i++) {
            images = images + ";" + files[i];
          }
          that.setData({
            https: app.globalData.imagesurl,
            files: files
          });
        } else if (res.cancel) {

        }
      }
    })
  },
  previewImage: function (e) {
    var ss = e.currentTarget.dataset.src
    ss = ss.replace("\\", "")
    var sss = []
    for (var i = 0; i < files.length; i++) {
      var tmp = files[i];
      tmp = app.globalData.imagesurl + tmp.replace("\\", "")
      sss.push(tmp)
    }
    // console.log(sss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  onShare: function () {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试，或请点击右上角的三个点，选择“转发”发送给朋友。'
      })
    }
  },
  // onShareAppMessage: function () {
  //   return {
  //     title: '你的朋友分享了“' + program_name + "”课程给你",
  //     path: '/pages/programinfo/programinfo?program_id=' + program_id + '&onShareAppMessage=studioinfo',
  //     success: function (res) {
  //       // 分享成功
  //     },
  //     fail: function (res) {
  //       // 分享失败
  //     }
  //   }
  // },
  navigateTo: function (e) {
    var tmp = getCurrentPages()
    // console.log(tmp)
    if (tmp.length >= 2 && tmp[tmp.length - 2].route == "pages/myinfo/myinfo") {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: "/pages/myinfo/myinfo?coach_id=" + coach_id
      })
    }
  },



})