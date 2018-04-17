var showModal = {

  onLoad: function (obj) {
    wx.showModal({
      title: '错误提示',
      content: '网络连接错误，是否重新加载信息？',
      success: function (res) {
        if (res.confirm) {
          var that = this
          that.onLoad(obj)
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
        }
      }
    })
  },
  showModal: function (confirm, title = '提示', content = '确定要这么做吗？', isback = false,showcancel = true) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: showcancel,
      success: function (res) {
        if (res.confirm) {
          typeof confirm == "function" && confirm();
        } else if (res.cancel) {
          if (isback) {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        }
      }
    })
  },
  showToast: function (confirm, title = '成功', icon = 'success', duration =2000) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
      success:function(){
        typeof confirm =="function" && confirm();
      }
    })
  }
}
module.exports = showModal