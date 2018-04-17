// pages/addprogram/addprogram.js
var showModal = require('../../utils/ShowModal.js')
var app = getApp()
var publicurl = app.globalData.publicurl
var program_id
var files = []
var images = ""
var images_length = 0
Page({
  data: {
    source: "",
    files: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    program_id = options.program_id
    if (program_id > 0) {
      wx.setNavigationBarTitle({ title: '课程修改' })
      var that = this
      wx.request({
        url: publicurl + 'index/Program/selectname',
        data: {
          program_id: program_id
        },
        success: function (res) {
          // success
          files = []
          images = res.data.program.images;
          if (images != "" && images != null && images != undefined) {
            files = images.split(";")
          }
          images_length = files.length;
          that.setData({
            https: app.globalData.imagesurl,
            program: res.data.program,
            source: res.data.program.logo,
            files: files
          })
        },
        fail: function (res) {
          // fail
        }
      })
    } else {
      wx.setNavigationBarTitle({ title: '新增课程' })
      images_length = 0
      files = []
      images = ""
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    files = []
  },
  formSubmit: function (e) {
    console.log(e.detail.value.name)
    if (e.detail.value.name == null || e.detail.value.name == "" || e.detail.value.name == undefined) {
      wx.showModal({
        title: '提示',
        content: '课程名称不能为空',
        showCancel: false
      })
      return;
    }
    if (images == null || images == undefined) {
      images = "";
    }
    images.replace("null;", "")
    wx.request({
      url: publicurl + 'index/Program/add?coach_id=' + app.globalData.id,
      data: {
        program_id: program_id,
        name: e.detail.value.name,
        introduce: e.detail.value.introduce,
        logo: e.detail.value.logo,
        images: images
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
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
          console.log(tempFilePaths.length)
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
    showModal.showModal(function () {
      var index = e.currentTarget.dataset.index;
      files.splice(index, 1);
      images_length--;
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
    }, '提示', '您确定要删除吗？', );
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