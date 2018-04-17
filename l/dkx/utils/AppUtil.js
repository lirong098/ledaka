/**
 * Created by iwang on 2017/5/9.
 */

var app = getApp();
var AppUtil = {

  baseUrl: app.globalData.publicurl,

  request: function (that, url, data, options, success, reloadIfFail, fail) {
    wx.request({
      url: url,
      data: data,
      success: success,
      fail: function (err) {
        console.log("fail");
        console.log(err);
        if (fail) {
          fail();
        } else {
          if (reloadIfFail) {
            wx.showModal({
              title: '错误提示',
              content: '网络连接错误，是否重新加载信息？',
              success: function (res) {
                if (res.confirm) {
                  that.onLoad(options);
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 1  // 回退前 delta(默认为1) 页面
                  })
                }
              }
            })
          }
        }
      }
    })
  },

  loadCoachIndexAfterWxlogin: function (that, options, result, res) {
    var _this = AppUtil;
    //缓存id
    wx.setStorageSync('id', res.data.array.id)
    _this.request(that, _this.baseUrl + "index/Notification/coachnoti", {
      //教练查询 1 学员查询为2
      coach_id: options.coach_id,
      notification_into: '1',
      page: options.page,
      studio_id: options.studio_id,
      onShareAppMessage: options.onShareAppMessage,
    }, options, function (res) {
      // console.log(res.data)
      options.list = res.data.notification
      options.status = 2
      that.setData({
        notification: res.data.notification,
        username: res.data.name,
        hidden: true,
        txt: res.data.yearweek,
        picture: res.data.picture,
        coach_id: options.coach_id,
        notifi_count: res.data.count
      })
    }, true, null);
  },

  postWxlogin: function (that, options, result, res) {
    var _this = AppUtil;
    _this.request(that, _this.baseUrl + "index/Login/login", {
      openid: res.data.openid,
      unionid: res.data.unionid,
      session_key: res.data.session_key,
      rawData: options.rawData,
      signature: options.signature,
      iv: options.iv,
      encryptedData: options.encryptedData,
      msg: 1
    }, options, function (res) {
      // console.log(res.data)
      app.globalData.id = res.data.array.id;
      options.coach_id = res.data.array.id;
      options.coach_id = res.data.array.id;
      _this.loadCoachIndexAfterWxlogin(that, options, result, res);
    }, true, null);
  },

  getUserInfo: function (that, options, result) {
    var _this = AppUtil, result = {};
    //调用登录接口
    wx.login({
      success: function (codes) {
        var code = codes.code
        //获取用户信息
        console.log(codes)
        wx.getUserInfo
          ({
            success: function (data) {
              options.rawData = data.rawData;
              options.signature = data.signature;
              options.encryptedData = data.encryptedData;
              options.iv = data.iv;
              _this.request(that, _this.baseUrl + "index/Login/index?code=" + code, {
                msg: 1
              }, options, function (res) {
                _this.postWxlogin(that, options, result, res);
              }, true, null);
            }
          })
      }
    })
  }


}

module.exports = AppUtil;
