// pages/monthlist/monthlist.js
//let column = require('../column/column.js');
var app = getApp()
var publicurl = app.globalData.publicurl
var page =1
var yearweek
var yearweek1 = 0
var newmonth =0
let Bar = require('../../utils/wxcharts.js');//画布用到
let bar = new Bar();//画布用到
let newdata = [ //画布用到
]
Page({
  data:{},
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    yearweek1 = newmonth
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示   
    var that = this
        wx.request({
          url: publicurl+'index/Mysuccess/monthrecord',
          data: {
            coach_id:app.globalData.id,
            yearweek:yearweek1
          },
          success: function(res){
            // success
            if(res.data.msg ==2){
              if (yearweek1 == 0){
                newmonth = res.data.v
              }
              yearweek1 = res.data.v
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend,
                  yearweek1: yearweek1
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
   // console.log(yearweek1)
    wx.request({
      url: publicurl+'index/Mysuccess/monthrecord',
      data: {
        coach_id:app.globalData.id,
        yearweek:yearweek1
      },
      success: function(res){
        // success
        if(res.data.msg ==2){
          yearweek1 = res.data.v
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend,
                  yearweek1: yearweek1
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
    if(yearweek1){
        var hello = yearweek1.split("-");
        if(hello['1'] =='12'){
          hello['0'] = ++hello['0']
          hello['1'] = '01'
          yearweek1 = hello.join("-")
        }else{
             hello['1'] = ++hello['1']
             if(hello['1'] <=9)
             {
              hello['1'] = '0'+hello['1']
            }
             yearweek1 = hello.join("-")
        }
    }
   // console.log(yearweek1)    
    wx.request({
      url: publicurl+'index/Mysuccess/monthrecord',
      data: {
        coach_id:app.globalData.id,
        yearweek:yearweek1
      },
      success: function(res){
        // success
        if(res.data.msg ==2){
          yearweek1 = res.data.v
              that.setData({
                  recordlist : res.data.data,
                  weekend : res.data.weekend,
                  yearweek1: yearweek1
              })
            }
      },
      fail: function(res) {
        // fail
      }
    })
  }
})