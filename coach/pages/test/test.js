// test.js
var wxRequest = require('../../utils/wxRequest')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var url = "https://ledaka.cn/public/index.php/test/index/index"
  //   wxRequest.getRequest(url).then(res => {
  //     console.log(res.data)
  //     var next = "https://ledaka.cn/public/index.php/test/index/res1"
  //     return wxRequest.postRequest(next)
  //   }).then(res => {
  //     console.log(res.data)
  //     var next = "https://ledaka.cn/public/index.php/test/index/res2"
  //     var data = {v1: '1051', v2: 'v2' }
  //     return wxRequest.postRequest(next, data)
  //   }).then(res => {
  //     console.log(res.data)
  //     return "james"
  //   }).then(res => {
  //     console.log(res)
  //   }).then(() => {
  //     console.log("xxxxxx")
  //     return 123;
  //     }).then(() => {
  //       var next = "https://ledaka.cn/public/index.php/test/index/test4"
  //       var data = { coach_id: '1051', id: '1047' }
  //       return wxRequest.postRequest(next, data)
  //   }).then(function (res) {
  //     console.log("删除成功")
  //     console.log(res.data)
  //   }).finally(function () {
      
  //     console.log("***************")
  //     console.log('finally~')
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {


    var url = "https://ledaka.cn/public/index.php/test/index/index"
    wxRequest.getRequest(url).then(res => {
      console.log('111111111111111')
      var next = "https://ledaka.cn/public/index.php/test/index/res1"
      return wxRequest.postRequest(next)
    }).then(res => {
      console.log(res.data)
      var next = "https://ledaka.cn/public/index.php/test/index/test11"
      var data = { id: '1051', test1: '123' ,test2:'当地司法诉讼' }
      return wxRequest.postRequest(next, data)
    }).then(res => {
      console.log(res.data)
      return "james"
    }).then(res => {
      console.log(res)
    }).then(() => {
      console.log("第二段的xxxxxxxxx")
      // return 123;
    }).then(() => {
      var next = "https://ledaka.cn/public/index.php/test/index/test9"
      var data = { id: '1062', test2: '66' }
      return wxRequest.postRequest(next, data)
    }).then(function (res) {
      console.log("666666666")
      console.log(res.data)
    }).finally(function () {
      console.log("*哈哈哈哈哈哈*")
      console.log('结束了~')
    })

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

  }
})