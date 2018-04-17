// pages/usercenter/usercenter.js
//获取应用实例
var app = getApp()
var coach_id
var publicurl = app.globalData.publicurl
var coach_name
var expertise
var qrcode = ''
Page({
  data: {
    name: "姓名",
    phone: "手机",
    icon: "﹥",
    expertise: "专长",
    text: "力量训练，拉伸",
    studio: "我的工作室",
    myinfo: '我的主页',
    qrcode: "学员组",
    curriculum: "我的课程",
    card: "会员卡类型",
    advise: "反馈与建议"
  },
  //姓名
  addname: function (e) {
    var name = e.detail.value;
    name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
    wx.request({
      url: publicurl + 'index/coach/editcoach_name?coach_id=' + app.globalData.id,
      data: {
        coach_name: name
      },
      fail: function (res) {
        // fail
      }
    })
  },
  //手机
  addphone: function (e) {
    wx.request({
      url: publicurl + 'index/coach/editcoach_phone?coach_id=' + app.globalData.id,
      data: {
        phone: e.detail.value
      },
      fail: function (res) {
        // fail
      }
    })
  },
  //专长
  addspecialty: function (e) {
    wx.request({
      url: publicurl + 'index/coach/editcoach_expertise?coach_id=' + app.globalData.id,
      data: {
        expertise: e.detail.value
      },
      fail: function (res) {
        // fail
      }
    })
  },
  onLoad: function () {
    var that = this
    coach_id = app.globalData.id
    that.setData({
      coach_id: coach_id
    })
    // 生成教练二维码功能
    // wx.request({
    //   url: publicurl + 'index/coach/qrcode',
    //   data: {
    //     coach_id: coach_id
    //   },
    //   success: function (res) {
    //     // console.log(res.data)
    //     qrcode = res.data
    //   }
    // });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/coach/coachname',
      data: {
        coach_id: coach_id
      },
      success: function (res) {
        that.setData({
          coachid: res.data.name,
          coach_phone: res.data.coach_phone,
          coach_nickname: res.data.coach_nickname,
          coach_expertise: res.data.coach_expertise
        })
      },
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  previewImage: function (e) {
    var ss = app.globalData.imagesurl + qrcode
    ss = ss.replace("\\", "")
    var sss = []
    sss = sss.concat(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  addtrainee: function(){
    try {
      wx.navigateToMiniProgram({
        // appId: 'wxc335fc380a8f0e0e',
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