// pages/addstudio/addstudio.js
var app = getApp()
var publicurl = app.globalData.publicurl
var files = []
var images = ""
var images_length = 0
var studio_id = 0
var coach_id = 0
var isclick = false
Page({
  data: {
    files: files
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    studio_id = options.studio_id
    that.setData({
      studio_id: studio_id
    })
    if (studio_id != undefined && studio_id != 0) {
      // if (studio_id != undefined && studio_id != 0) {
      wx.setNavigationBarTitle({ title: '工作室修改' })
      coach_id = app.globalData.id
      wx.request({
        url: publicurl + 'index/Studio/studioinfo',
        data: {
          studio_id: studio_id,
          coach_id: coach_id
        },
        success: function (res) {
          // success
          files = [];
          images = res.data.studioinfo.images;
          if (images != "" && images != null && images != undefined) {
            files = images.split(";")
          }
          images_length = files.length;
          that.setData({
            https: app.globalData.imagesurl,
            studio: res.data.studioinfo,
            source: res.data.studioinfo.logo,
            files: files
          })
        },
        fail: function () {
          // fail
        }
      })
    } else {
      wx.setNavigationBarTitle({ title: '工作室新增' })
      files = []
      images_length = 0
      images = ""
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    files = []
  },
  formSubmit: function (e) {
    if (images == null || images == undefined) {
      images = "";
    }
    images.replace("null;", "")
    if (e.detail.value.studio_address && e.detail.value.studio_name) {
      if (!isclick) {
        isclick = true;
        wx.request({
          url: publicurl + 'index/studio/add?coach_id=' + app.globalData.id,
          data: {
            studio_id: studio_id,
            studio_name: e.detail.value.studio_name,
            studio_address: e.detail.value.studio_address,
            studio_phone: e.detail.value.studio_phone,
            studio_introduce: e.detail.value.studio_introduce,
            logo: e.detail.value.logo,
            images: images
          },
          success: function (res) {
            //console.log(res)
            wx.showModal({
              title: res.data.title,
              content: res.data.text,
              showCancel: false,
              success: function () {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            })
            setTimeout(function () {
              isclick = false
            }, 1500)
          },
          fail: function (res) {
            setTimeout(function () {
              isclick = false
            }, 1500)
          }
        })
      }
    } else {
      wx.showModal({
        title: '错误提示',
        content: "填写的信息不全。",
        showCancel: false,
      })
    }

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
              console.log(res.data);
              var tmp = "";
              tmp = tmp.concat(res.data.replace("\"", "").replace("\"", ""))
              tmp = tmp.replace("\\", "")
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
                  tmp = tmp.replace("\\", "")
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
          if (files[0]) {
            images = files[0];
          }
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
    var ss = e.currentTarget.id
    ss = ss.replace("\\", "")
    var sss = []
    sss = sss.concat(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  }



})