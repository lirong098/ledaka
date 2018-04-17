let studio_notice ={
  studio_notice: function (publicurl,studio_id=0, page=1, qty=10, fun) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Mysuccess/studio_notice',
      data: {
        studio_id: studio_id,
        page: page,
        qty: qty
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        fun(res);
      },
      fail: function (res) {
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  }
};
module.exports = studio_notice;
