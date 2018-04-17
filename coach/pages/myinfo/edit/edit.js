// edit.js
var app = getApp()
var publicurl = app.globalData.publicurl
var list
var text = ""
var isfrist = true
var isclick = false
Page({
  /**
   * 页面的初始数据
   */
  data: {
    main_text: '这一刻的想法......',
    files: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (isfrist) {
      wx.request({
        url: publicurl + 'index/Coach/coachinfo',
        data: {
          coach_id: app.globalData.id
        },
        success: function (res) {
          // success
          isfrist = false
          text = res.data.info.coach_introduction
          that.setData({
            text: text,
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
    }
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
    isfrist = true;
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
  onShareAppMessage: function () {

  },
  formSubmit: function (e) {
    if (!isclick) {
      isclick = true;
      wx.request({
        url: publicurl + 'index/Coach/updateintroduction',
        data: {
          introduction: e.detail.value.introduction,
          coach_id: app.globalData.id
        },
        success: function (res) {
          // success
          // if (res.data == 1) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            }
          })
          // }
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
                    files: list,
                    text: text
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
    var sss = []
    sss = sss.concat(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  bindTextAreaBlur: function (e) {
    // console.log(e.detail.value);
    text = e.detail.value;
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
        }
      }
    })
  }




})