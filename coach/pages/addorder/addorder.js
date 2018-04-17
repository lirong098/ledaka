// pages/addorder/addorder.js
var app = getApp();
var coachid;
var trainee_id;
var publicurl = app.globalData.publicurl;
var seorder_id;
Page({
  data: {
    array: ['年卡', '月卡', '体验卡'],
    program: ['瑜伽', '普拉提'],
    tranieeinfo: {},
    lesson: '课程',
    card: '卡类型',
    startdate: '开始日期',
    enddate: '有效期截止',
    goods_number: '课程数',
    goods_price: '金额',
    goods_use: '已使用课程',
    studio: '工作室',
    save: '保存'
  },
  formSubmit: function (e) {
    if (e.detail.value.goods_use == "") {
      e.detail.value.goods_use = 0
    }
    var membership_id = e.detail.value.card
    var start_date = e.detail.value.startdate
    var expiration_date = e.detail.value.enddate
    if (membership_id === "" || start_date === "" || expiration_date === "") {
      wx.showModal({
        title: '错误提示',
        content: '填写信息不全',
      })
    } else if (parseInt(e.detail.value.goods_number) >= parseInt(e.detail.value.goods_use)) {
      wx.request({
        url: publicurl + 'index/Seorder/add?coach_id=' + app.globalData.id,
        data: {
          program_id: 0,
          seorder_id: e.detail.value.seorder_id,
          studio_id: e.detail.value.studio_id,
          membership_id: membership_id,
          goods_number: e.detail.value.goods_number,
          goods_price: e.detail.value.goods_price,
          goods_use: e.detail.value.goods_use,
          start_date: start_date,
          expiration_date: expiration_date,
          trainee_id: trainee_id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.data == 2) {
            wx.showModal({
              title: '提示',
              content: '有效期开始日期不能小于结束日期。',
              showCancel: false
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '课程数量不能小于已使用课程数量。',
        showCancel: false
      })
    }
  },
  bindprogram: function (e) {
    console.log(e.detail.value)
    this.setData({
      programindex: e.detail.value,
      //gender:e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log(e)
    this.setData({
      cardindex: e.detail.value
    })
  },
  bindstudio: function (e) {
    this.setData({
      studioindex: e.detail.value
    })
  },
  bindstartChange: function (e) {
    this.setData({
      stardate: e.detail.value,
    })
  },
  bindendChange: function (e) {
    this.setData({
      endate: e.detail.value,
    })
  },
  // bindTimeChange: function(e) {
  //   this.setData({
  //     time: e.detail.value
  //   })
  // },

  onLoad: function (options) {
    trainee_id = options.trainee_id
    seorder_id = options.seorder_id
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request
      ({
        url: publicurl + 'index/Seorder/coachdata',
        data: {
          coach_id: app.globalData.id,
          seorder_id: seorder_id,
          trainee_id: trainee_id
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.msg === 1) {
            that.setData({
              card_array: res.data.card,
              program_array: res.data.program,
              studio_array: res.data.studio,
              studioindex: '0',
              good_use: 0
            })
          } else {
            if (res.data.msg === 2) {
              that.setData({
                card_array: res.data.card,
                program_array: res.data.program,
                studio_array: res.data.studio,
                programindex: res.data.seorder['0'].program_key,
                cardindex: res.data.seorder['0'].card_key,
                studioindex: res.data.seorder['0'].studio_key,
                stardate: res.data.seorder['0'].start_date,
                endate: res.data.seorder['0'].expiration_date,
                good_number: res.data.seorder['0'].goods_number,
                good_price: res.data.seorder['0'].goods_price,
                good_use: res.data.seorder['0'].goods_use,
                seorder_id: res.data.seorder['0'].id
              })

            }
          }

        },
      })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})