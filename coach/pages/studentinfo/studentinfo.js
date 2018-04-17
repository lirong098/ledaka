// pages/studentinfo/studentinfo.js
//获取应用实例
var app = getApp()
var trainee_id
var publicurl = app.globalData.publicurl
var grouparray
var trainee_name
var notifi_id
Page({
  data: {
    studio_id: 0,
    name: "姓名",
    icon: "﹥",
    expertise: "专长",
    text: "力量训练，拉伸",
    studio: "工作室",
    qrcode: "二维码",
    curriculum: "课程",
    advise: "反馈与建议",
    deletestudent: "学员删除",
    target: '',
    situation: '',
    preferences: '',
    trainee: [],
    other: ''
  },
  //事件处理函数
  onLoad: function (options) {
    trainee_id = options.id
    notifi_id = options.notifi_id
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth)
        var px = res.windowWidth * 100 / 750;
        that.setData({
          boxheight: (res.windowHeight - px) + "px"
        });
      }
    })
    var studio_id = options.studio_id ? options.studio_id : 0;
    var isfrom = "studio"
    if (studio_id == 0) {
      isfrom = "coach"
    }
    that.setData({
      // userInfo: app.globalData.userInfo,
      trainee_id: trainee_id,
      isfrom: isfrom,
      studio_id: studio_id
    })


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // var that = this
    wx.request({
      url: publicurl + 'index/Coach_Trainee_Images/selectremark',
      data: {
        trainee_id: trainee_id,
        coach_id: app.globalData.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          target: res.data.target,
          situation: res.data.situation,
          preferences: res.data.preferences,
          other: res.data.other
        })
      },
      fail: function () {
        // fail
      }
    })
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/Coach/traineeinfo',
      data: {
        trainee_id: trainee_id,
        coach_id: app.globalData.id,
        notifi_id: notifi_id
      },
      success: function (res) {
        // success
        console.log(res.data);
        grouparray = res.data['2']
        if (res.data['1'].trainee_birthday == "0000-00-00" || res.data['1'].trainee_birthday == null) {
          res.data['1'].trainee_birthday = ''
        }
        trainee_name = res.data['1'].trainee_name
        that.setData({
          traineeinfo: res.data,
          index: res.data['1'].index,
          grouparray: res.data['2'],
          date: res.data['1'].trainee_birthday,
          info: res.data['3']
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    wx.request({
      url: publicurl + 'index/Coach/coach_studio',
      data: {
        coach_id: app.globalData.id
      },
      success: function (res) {
        // that.setData({
        //   studio_id: res.data
        // });
        wx.request({
          url: publicurl + 'index/Coach/trainee_from_info',
          data: {
            trainee_id: that.data.trainee_id,
            studio_id: that.data.studio_id,
          },
          success: function (res) {
            that.setData({
              trainee: res.data
            });

          },
          fail: function () {
            // fail
          },

        })
      },
      fail: function () {
        // fail
      },
    })


    // console.log(trainee)
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    wx.request({
      url: publicurl + 'index/Coach_Trainee/updategroup',
      data: {
        trainee_id: trainee_id,
        coach_id: app.globalData.id,
        group_id: grouparray[e.detail.value]['id'],
        group_name: grouparray[e.detail.value]['group_name']
      },
      fail: function () {
        // fail
      }
    })
  },
  bindDateChange: function (e) {
    var that = this
    that.setData({
      date: e.detail.value
    })
    wx.request({
      url: publicurl + 'index/Coach_Trainee/updatebirth',
      data: {
        trainee_id: trainee_id,
        coach_id: app.globalData.id,
        date: e.detail.value
      },
      fail: function () {
        // fail
      }
    })
  },
  addname: function (e) {
    if ((e.detail.value !== "") || (trainee_name != null)) {
      wx.request({
        url: publicurl + 'index/Coach_trainee/updatename',
        data: {
          name: e.detail.value,
          trainee_id: trainee_id,
          coach_id: app.globalData.id
        },
        fail: function (res) {
          // fail
        }
      })
    }
  },
  addphone: function (e) {
    let that = this;
    if (that.data.traineeinfo['1'].trainee_phone != e.detail.value) {
      wx.request({
        url: publicurl + 'index/Coach_trainee/updatephone',
        data: {
          phone: e.detail.value,
          trainee_id: trainee_id,
          coach_id: app.globalData.id
        },
        fail: function (res) {
          // fail
        }
      })
    }
  },
  binddeletetap: function () {
    wx.showModal({
      title: '提示',
      content: '您确定要删除该学员？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: publicurl + 'index/Coach_Trainee/deletetrainee',
            data: {
              trainee_id: trainee_id,
              coach_id: app.globalData.id
            },
            success: function (res) {
              // success
              if (res.data == 1) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            },
            fail: function (res) {
              // fail
              wx.showToast({
                title: '网络异常',
                icon: 'loading',
                duration: 1000
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }
})