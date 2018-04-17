// pages/card/card.js
var app = getApp()
var publicurl = app.globalData.publicurl
var list
Page({
  data:{
    delBtnWidth:140,//删除按钮宽度单位（rpx）
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that =this
    wx.request({
      url: publicurl+'index/Membership/lst',
      data: {
        coach_id:app.globalData.id
      },
      success: function(res){
        // success
        list = res.data
        that.setData({
          array:res.data
        })
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  touchS:function(e){
    //console.log(e)
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
    //console.log(e)
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
        array:list
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
          array:list
        });
      }else{
        var txtStyle = "left:0rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          array:list
        });
      }
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth:function(w){
    var real = 0;
    try {
        var res = wx.getSystemInfoSync().windowWidth;
        var scale = (750/2)/(w/2);//以宽度750px设计稿做宽度的自适应
        // console.log(scale);
        real = Math.floor(res/scale);
        return real;
        } 
    catch (e) {
      return false;
     // Do something when catch error
    }
  },
  initEleWidth:function(){
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth:delBtnWidth
    });
  },
  delItem:function(e){
    var that = this
    var index = e.currentTarget.dataset.index;
   // console.log(index)
    wx.request
    ({
          url: publicurl+'index/Membership/daletecard',
          data: {
            card_id:list[index]['id']
          },
          success: function(res){
            //移除列表中下标为index的项
            if(res.data.msg ==1){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                })
                list.splice(index,1);
                //更新列表的状态
                that.setData({
                  array:list
                });
            }else{
              if(res.data.msg ==2){
                wx.showModal({
                  title: '注意',
                  content: '此会员卡已产生相关的订单，不可删除',
                  showCancel:false
                })
              }
            }
          }
    })
  }
})