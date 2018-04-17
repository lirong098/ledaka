// pages/studio/studio.js
var app = getApp()
var publicurl = app.globalData.publicurl
var list
Page({
  data: {
    userInfo: {},
    array: {},
    picture: null,
    delBtnWidth: 180
  },
  onLoad: function (options) {
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      //将获取的用户的openID 存入数据库 并返回此用户内码。
      url: publicurl + 'index/Trainee/mystudio?trainee_id=' + app.globalData.id,
      success: function (res) {
        list = res.data
        // console.log(list)
        that.setData({
          https: app.globalData.imagesurl,
          array: res.data
        })
      },
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
    //开启分享
    return {
      title: '我的工作室',
      path: '/pages/studio/studio?id=123'
    }
  },
  addstudio: function () {
    wx.navigateTo({
      url: '../addstudio/addstudio'
    })
  },
  touchS: function (e) {
    //console.log(e)
    var that = this
    if (e.touches.length == 1) {
      that.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    //console.log(e)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = that.data.startX - moveX;
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else
        if (disX > 10) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "rpx";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "rpx";
          }
        }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      // console.log(list)
      // console.log(index)
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      that.setData({
        array: list
      });
    }
  },
  touchE: function (e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      // var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";
      //获取列表中要删除项的下标
      var index = e.currentTarget.dataset.index;
      if (disX > (delBtnWidth * 2 / 3)) {
        var txtStyle = "left:-" + delBtnWidth + "rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          array: list
        });
      } else {
        var txtStyle = "left:0rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          array: list
        });
      }
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    }
    catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  delItem: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    // console.log(index)
    wx.request
      ({
        url: publicurl + 'index/Trainee/deletetraineestudio',
        data: {
          studio_id: list[index]['id'],
          trainee_id: app.globalData.id
        },
        success: function (res) {
          //移除列表中下标为index的项
          if (res.data == 1) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
            list.splice(index, 1);
            //更新列表的状态
            that.setData({
              array: list
            });
          } else {
            wx.showToast({
              title: '删除失败',
              icon: 'loading',
              duration: 1000
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络异常',
            icon: 'loading',
            duration: 1000
          })
        }
      })
  }

})