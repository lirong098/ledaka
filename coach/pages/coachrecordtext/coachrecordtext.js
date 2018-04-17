// pages/coachrecordtext/coachrecordtext.js
var app = getApp()
var publicurl = app.globalData.publicurl
var record_id
var text
Page({
  data:{
    coach_comments:'',
    files:[],
    addfiles:[] //添加的
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that =this
    text = options.coach_comments
    record_id = options.record_id
    that.setData({
      url: app.globalData.imagesurl
    })
  },
  onReady:function(){
    // 页面渲染完成
    var that =this
    that.setData({
      coach_comments:text
    })
  },
  onShow:function(){
    // 页面显示
    var that =this
    wx.request({
      url: publicurl + 'index/Class_Record/record_url',
      data: {
        record_id: record_id
      },
      success: function (res) {
        // success
        if(res.data.length >0)
        {
          for (var x in res.data)
          {
            res.data[x] = app.globalData.imagesurl + res.data[x]
          }
        }
        that.setData({
          files: res.data,
          addfiles: that.data.addfiles
        })
      },
      fail: function () {
        // fail
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit:function(e){
    var that = this
      if(text != e.detail.value.coach_comments){
          wx.request({
            url: publicurl+'index/Class_Record/coach_comments',
            data: {
              coach_comments:e.detail.value.coach_comments,
              record_id:record_id
            },
            method: 'GET',
            success: function(res){
              if(res.data ==1){
                if (that.data.addfiles.length > 0) {
                  var addfiles = that.data.addfiles.join(",");
                  // wx.redirectTo({
                  //   url: '../recordtext/recordtext?record_id=' + record_id + '&addfiles=' + addfiles,
                  // })
                  that.showToast(addfiles);
                }else{
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                    success:function(){
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  })
                } 
              }
            },
            fail: function(res) {
              wx.showToast({
                          title: '网络异常',
                          icon: 'loading',
                          duration: 2000
                        })
            },
          })
      }else{
        if (that.data.addfiles.length > 0) {
          var addfiles = that.data.addfiles.join(",");
          // wx.redirectTo({
          //   url: '../recordtext/recordtext?record_id=' + record_id + '&addfiles=' + addfiles,
          // })
          that.showToast(addfiles);
        }else{
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }   
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
          var img_length = parseInt(images_length)+parseInt(res.tempFilePaths.length)
          if (img_length <= 9) {
            if (res.tempFilePaths.length >0){
              that.data.addfiles.push.apply(that.data.addfiles, res.tempFilePaths);
              that.setData({
                addfiles: that.data.addfiles
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
    var sss = that.data.files
    if (that.data.addfiles && that.data.addfiles.length > 0) {
      sss.push.apply(sss, that.data.addfiles);
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
          var index = e.currentTarget.dataset.index;
          if (e.currentTarget.dataset.name == "addfiles"){
              that.data.addfiles.splice(index,1)
              that.setData({
                addfiles: that.data.addfiles
              })
          }else{
            var list = that.data.files;
            wx.request({
              url: publicurl + 'index/Class_Record/deleteimages',
              data: {
                url: list[index].replace(app.globalData.imagesurl, "")
              },
              success: function (res) {
                list.splice(index, 1);
                that.setData({
                  files: list
                })
              },
              fail: function (res) {
                // fail
              }
            })
          }
        }
      }
    })
  },
  showToast: function (addfiles){
    var that =this
      var imglength = that.data.addfiles.length
      for (var x in that.data.addfiles) {
        var index = parseInt(x) + 1
        wx.uploadFile({
          url: publicurl + 'index/uploadfile/index?record_id=' + record_id,
          filePath: that.data.addfiles[x],
          name: 'file',
          success: function (res) {
            that.data.addfiles.splice(x, 1)
          },
          fail: function () {
            wx.showToast({
              title: '网络异常',
              icon: 'loading',
              duration: 2000
            })
          }
        })
        that.setData({
          showToast: true,
          style: "margin-top:70rpx;",
          title: "图片上传中...(" + index + "/" + imglength + ")"
        })
        if (index === imglength) {
          setTimeout(function () {
            that.setData({
              style: "",
              showToast: false
            })
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
      }
  }
})