var app = getApp();
var publicurl = app.globalData.publicurl;
var columnChart = null;
var isshow;
let Bar = require('../../utils/wxcharts.js');
let bar = new Bar();
var array =[]
let newdata =[
  {
    tag:'1',
    value:2
  },
  {
    tag:'2',
    value:"　"
  },
  {
    tag:'3',
    value:"　"
  }
]
Page({
    data:{
        // year:'年打卡',
        // sum:'总打卡',
        // year_next:'次',
        // sum_next:'次',
    },
    onShow: function(){
        var that = this
        // bar.draw({
        //   renderTo: "tagRateCanvas",
        //   series: newdata,
        //   setCanvasSize: o => that.setData({ ctxHeight: o.height }),
        //   onTouch: (e) => {
        //     let serie = e.serie
        //     that.renderRecords(serie.items)
        //   }
        // }) 
        
    },
onReady: function (e) {
}
});