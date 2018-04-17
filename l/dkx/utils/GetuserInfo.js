var app = getApp()
var getuserInfo = {
  //缓存id
  getuserInfo: function (publicurl, fun, options, onLoad) {
    var url = publicurl
    var id = wx.getStorageSync('id');
    var openid = wx.getStorageSync('openid');
    var that = this
    console.log(openid)
    if (openid) {
      wx.request({
        url: publicurl + 'index/Login/getid',
        data: {
          //教练查询 1 学员查询为2
          open_id: openid,
          msg: 2
        },
        success: function (res) {
          if (res.data == '0') {
            that.login(url, fun, options, onLoad)
          } else {
            //缓存id
            wx.setStorageSync('id', res.data);
            app.globalData.id = res.data;
            var trainee_id = res.data;
            fun(res.data, 1, options, onLoad);
          }
        },
        fail: function (res) {
          that.showModal(options, onLoad)
        }
      })
    } else {
      that.login(url, fun, options, onLoad)
    }
  },
  login: function (publicurl, fun = null, options = null, onLoad = null,func = null) {
    //调用登录接口
    var that = this
    wx.login({
      success: function (codes) {
        var code = codes.code
        //获取用户信息
        wx.getUserInfo({
          success: function (data) {
            var rawData = data.rawData;
            var signature = data.signature;
            var encryptedData = data.encryptedData;
            var iv = data.iv;
            wx.request({
              url: publicurl + 'index/Login/index?code=' + code,
              data: {
                msg: 2
              },
              success: function (res) {
                wx.request({
                  url: publicurl + 'index/Login/login',
                  data: {
                    openid: res.data.openid,
                    unionid: res.data.unionid,
                    session_key: res.data.session_key,
                    rawData: rawData,
                    signature: signature,
                    iv: iv,
                    encryptedData: encryptedData,
                    msg: 2
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    //缓存id
                    wx.setStorageSync('id', res.data.array.id)
                    //缓存openid
                    wx.setStorageSync('openid', res.data.array.openid)
                    app.globalData.id = res.data.array.id
                    var trainee_id = res.data.array.id
                    if (fun) {
                      fun(res.data.array.id, 1, options, onLoad)
                    }
                    typeof func == "function" && func();
                  },
                  fail: function (res) {
                    that.showModal(options, onLoad)
                  }
                })
              },
              fail: function (res) {
                console.log("22")
                that.showModal(options, onLoad)
              }
            })
          }
        })
      },
      fail: function () {
        that.showModal(options, onLoad)
      }
    })
  },
  showModal: function (options, onLoad) {
    var that = this
    wx.showModal({
      title: '错误提示',
      content: '网络连接错误，是否重新加载信息？',
      success: function (res) {
        if (res.confirm) {
          onLoad(options)
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
        }
      }
    })
  },
}
module.exports = getuserInfo