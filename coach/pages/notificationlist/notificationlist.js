// pages/notificationlist/notificationlist.js
//获取应用实例
var app = getApp()
var publicurl = app.globalData.publicurl
var list
var page = 2
var coach_id
Page({
  data: {
    delBtnWidth:180
  },
  onLoad: function (options)
  {
  },
  onShow: function()
  { 
    var that =this
    wx.request({
           url: publicurl+'index/Notification/coachnoti',
           data: {
           //教练查询 1 学员查询为2
              coach_id:app.globalData.id,
              notification_into:'1',
              page:page
           },
           success: function(res){
               list = res.data.notification
               that.setData({
                 notification:res.data.notification,      
              })
          },
          fail: function() {
          // fail
              wx.showToast({
                  title: '网络异常',
                  icon: 'loading',
                  duration: 2000
              })
          },
      })
  },
  touchS:function(e){
    var that = this
    if(e.touches.length==1){
      that.setData({
        //设置触摸起始点水平方向位置
        startX:e.touches[0].clientX
      });
    }
  },
  touchM:function(e){
    var that = this
    if(e.touches.length==1){
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = that.data.startX - moveX;
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      }else
if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-"+disX+"rpx";
        if(disX>=delBtnWidth){
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-"+delBtnWidth+"rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      // console.log(list)
      // console.log(index)
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      that.setData({
        notification:list
      });
    }
  },
  touchE:function(e){
    var that = this
    if(e.changedTouches.length==1){
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      // var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";
       //获取列表中要删除项的下标
      var index = e.currentTarget.dataset.index;
      if(disX > delBtnWidth/2){
        var txtStyle = "left:-"+delBtnWidth+"rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          notification:list
        });
      }else{
        var txtStyle = "left:0rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          notification:list
        });
      }
    }
  },
  delItem:function(e){
    var that = this
    var index = e.currentTarget.dataset.index;
    console.log(index)
    wx.request
    ({
          url: publicurl+'index/Notification/updatestatus',
          data: {
            notifi_id:list[index]['id']
          },
          success: function(res){
            //移除列表中下标为index的项
            list.splice(index,1);
            //更新列表的状态
            that.setData({
              notification:list
            });
          },
          fail: function() {
            // fail
          }
    })
  },
  //加载更多
  loadMore: function(e) {
     var that = this;
    if (!this.data.hasMore) return
     wx.request({
      url: publicurl+'index/Notification/coachnoti',
      data: {
        //教练查询 1 学员查询为2
        coach_id:app.globalData.id,
        notification_into:'1',
        page:++page
      },
      success: function(res){
        list = list.concat(res.data.notification)
         that.setData({
            notification:that.data.notification.concat(res.data.notification),
            hidden: true,
            hasMore:false
         })
      },
      fail: function() {
        // fail
      },
    })
}
})