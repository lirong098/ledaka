// @publicurl :API地址
// @page:加载页数
//@qty:加载数量
//@msg:1查询柱状图2学员信息
//@trainee_id:学员id
//@fun:请求成功后执行的函数
var recordlist = {
  recordlist: function (publicurl, page, qty, msg, trainee_id, fun, studio_id = 0, mouth=0) {
    var that = this
    wx.request({
      url: publicurl + 'index/Mysuccess/index',
      data: {
        trainee_id: trainee_id,
        page: page,
        qty: qty,
        msg: msg,
        studio_id:studio_id,
        mouth: mouth
      },
      success: function (res) {
        fun(res);
      },
      fail: function () {
        // fail
      }
    })
  }
}
module.exports = recordlist