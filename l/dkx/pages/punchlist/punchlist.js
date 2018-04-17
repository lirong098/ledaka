// pages/punchlist/punchlist.js
var app = getApp()
var publicurl = app.globalData.publicurl
var page =1
var yearweek
var yearweek1
var topweek
var bottomweek
var myDate = new Date()  
var moderndate = myDate.toLocaleDateString()
Page({
  data:{},
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
  
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log(moderndate)
    var that = this
        wx.request({
          url: publicurl+'index/Mysuccess/weekrecord',
          data: {
            coach_id:app.globalData.id,
            moderndate:moderndate
            //yearweek:yw
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
            // success
            console.log(res.data)
            if(res.data.msg ==2){
              bottomweek =res.data.bottomweek,
              topweek =res.data.topweek
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend,
              })
            }
            
          },
        fail: function(res) {
            // fail
          }
        })

    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindtopweek:function(){
    var that = this
    // if(yearweek1){
    //     var hello = yearweek1.split("-");
    // hello['1'] = hello['1']-1
    //  yearweek1 = hello.join("-")
    // }else{
    //   var hello = yearweek.split("-");
    // hello['1'] = hello['1']-1
    //  yearweek1 = hello.join("-")
    // }
    wx.request({
      url: publicurl+'index/Mysuccess/weekrecord',
      data: {
        coach_id:app.globalData.id,
        moderndate:topweek
      },
      success: function(res){
        // success
         bottomweek =res.data.bottomweek,
        topweek =res.data.topweek
        if(res.data.msg ==2){
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend,
                 
              })
            }
      },
      fail: function(res) {
        // fail
      }
    })
  },
  bindbottomweek:function(){
    var that = this
    // if(yearweek1){
    //     var hello = yearweek1.split("-");
    // hello['1'] = ++hello['1']
    //  yearweek1 = hello.join("-")
    // }else{
    //   var hello = yearweek.split("-");
    // hello['1'] = ++hello['1']
    //  yearweek1 = hello.join("-")
    // }
    wx.request({
      url: publicurl+'index/Mysuccess/weekrecord',
      data: {
        coach_id:app.globalData.id,
        moderndate:bottomweek
      },
      success: function(res){
        // success
        if(res.data.msg ==2){
              bottomweek =res.data.bottomweek,
              topweek =res.data.topweek
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend
              })
            }
      },
      fail: function(res) {
        // fail
      }
    })
  }
})