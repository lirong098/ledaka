// pages/monthlistinfo/monthlistinfo.js
var app = getApp()
var publicurl = app.globalData.publicurl
var page =1
var yearweek
var yearweek1 = 0
var trainee_id
let Bar = require('../../utils/wxcharts.js');//画布用到
let bar = new Bar();//画布用到
let newdata = [ //画布用到
  // {
  //   tag: '1',
  //   value: 2
  // }
]
Page({
  data:{
    recordlist:[],
    weekend: '',
    url: '',
    hasMore: true,
    msg:0, //1 说明是学员详情页点击进来的 查询语句不一样
    urlid:'../coachrecordtext/coachrecordtext?record_id='
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    trainee_id = options.trainee_id
    yearweek1 = options.yearweek1
    that.setData({msg: options.msg})
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示   
    var that = this
    that.setData({ coach_id: app.globalData.id})
    var qty = page*10
        wx.request({
          url: publicurl+'index/Mysuccess/monthrecordinfo',
          data: {
            coach_id:app.globalData.id,
            trainee_id:trainee_id,
            yearweek:yearweek1,
            page:page,
            qty:qty,
            msg:that.data.msg
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
            // success
            if(res.data.msg ==2){
              yearweek1 = res.data.v
              console.log(res.data.data)
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend,
                  url: app.globalData.imagesurl
              })
              bar.draw({ //画布用到
                renderTo: "tagRateCanvas",
                series: res.data.newdata,
                setCanvasSize: o => that.setData({ ctxHeight: o.height }),
                onTouch: (e) => {
                  let serie = e.serie
                  that.renderRecords(serie.items)
                }
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
    page =1
    if(yearweek1){
        var hello = yearweek1.split("-");
        if(hello['1'] =='01'){
          hello['0'] = hello['0']-1
          hello['1'] = 12
          yearweek1 = hello.join("-")
        }else{
            hello['1'] = hello['1']-1
            if(hello['1'] <=9){
              hello['1'] = '0'+hello['1']
            }
            yearweek1 = hello.join("-")
        }
    }
    wx.request({
      url: publicurl+'index/Mysuccess/monthrecordinfo',
      data: {
        coach_id:app.globalData.id,
        trainee_id:trainee_id,
        yearweek:yearweek1,
        page:page,
        qty:10,
        msg: that.data.msg
      },
      success: function(res){
        // success
        if(res.data.msg ==2){
          yearweek1 = res.data.v
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
  },
  bindbottomweek:function(){
    var that = this
    page =1
    if(yearweek1){
        var hello = yearweek1.split("-");
        if(hello['1'] =='12'){
          hello['0'] = ++hello['0']
          hello['1'] = '01'
          yearweek1 = hello.join("-")
        }else{
             hello['1'] = ++hello['1']
             if(hello['1'] <=9){
              hello['1'] = '0'+hello['1']
            }
             yearweek1 = hello.join("-")
        }
    }  
    wx.request({
      url: publicurl+'index/Mysuccess/monthrecordinfo',
      data: {
        coach_id:app.globalData.id,
        trainee_id:trainee_id,
        yearweek:yearweek1,
        page:1,
        qty:10,
        msg: that.data.msg
      },
      success: function(res){
        // success
        if(res.data.msg ==2){
          yearweek1 = res.data.v
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
  },
  loadMore: function (e) {
    var that = this;
    if (!that.data.hasMore) return;
    console.log(page)
    ++page
    wx.request({
      url: publicurl + 'index/Mysuccess/monthrecordinfo',
      data: {
        coach_id: app.globalData.id,
        trainee_id: trainee_id,
        yearweek: yearweek1,
        page: page,
        qty: 10
      },
      success: function (res) {
        // success
        if (res.data.msg == 2) {
          yearweek1 = res.data.v
          console.log(res.data.data)
          if (res.data.data && res.data.data.length > 0) {
            
            that.data.recordlist.push.apply(that.data.recordlist, res.data.data);
          }
          if (res.data.data.length < 10) {
            that.setData({
              hasMore: false
            })
          }
          that.setData({
            recordlist: that.data.recordlist,
            weekend: res.data.weekend
          })
        }
      },
      fail: function (res) {
        // fail
      }
    })

  },
})