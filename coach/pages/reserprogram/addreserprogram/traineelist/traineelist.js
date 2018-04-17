// pages/addreserprogram/traineelist/traineelist.js
//获取应用实例
var traineelist = require('../../../../utils/traineelist/traineelist.js');
var app = getApp();
var publicurl = app.globalData.publicurl;
var array;
Page({
  data: {
    grouparray:[],
    show:false,
    inputShowed: false,
    inputVal: "",
    inputshow:true,
    trainee_id:0
  },
  onLoad:function(options){
    var that = this
    that.setData({
      programindex : options.programindex,
      date: options.date,
      time: options.time,
      end_time:options.end_time
    })
  },
  onShow: function () {
    // 页面显示
    var that = this
    traineelist.request(publicurl, app.globalData.id, function (list) {
      array = list.data;
      wx.getStorage({
        key: 'trainee_info',
        complete: function (res) {
          if (res.data) {
            var hello = res.data.split(',');
            that.setData({
              trainee_id: hello['0']
            })
          }
          if(that.data.trainee_id >= 1000){
            for(var x in array){
              for(var y in array[x].trainee){
                if (array[x].trainee[y].id == that.data.trainee_id){
                  array[x].trainee[y].checked = 'true';
                }
              }
            }
          }
          that.up_data(array);
        }
      })
    });
  },
  bindiconchange: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    traineelist.iconchange(array, index, that.up_data);
  },
  bindmaxchange: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    traineelist.maxchange(array, index, that.up_data);
  },
  radioChange: function (e) {
      wx.setStorage({
        key: "trainee_info",
        data: e.detail.value,
        complete:function(){
          wx.navigateBack({
            delta: 1
          })
        }
      })
  },
  //更新页面数据
  up_data: function (obj) {
    var that = this
    
    that.setData({
      grouparray: obj
    })
  },
  //求学员的订单
  // seorder:function(coach_id,trainee_id,fun){
  //   wx.request({
  //     url: publicurl +'index/Class_Schedule/select_trainee_seorder',
  //     data:{
  //       coach_id: coach_id,
  //       trainee_id: trainee_id
  //     },
  //     success:function(res){
  //       typeof fun == "function" && fun(res); 
  //     }
  //   })
  // },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      inputshow: true,
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var that = this
    if (e.detail.value == '' ||e.detail.value == null) return;
    wx.request({
      url: publicurl +'index/Coach_Trainee/select_trainee_name',
      data:{
        trainee_name: e.detail.value,
        coach_id: app.globalData.id
      },
      success:function(res){
        if (that.data.trainee_id >=1000){
          for (var x in res.data){
            if (res.data[x].id == that.data.trainee_id){
              res.data[x].checked = 'true';
            }
          }
        }
        that.setData({
          inputshow:false,
          trainee_array:res.data
        })
      }
    })
    that.setData({
      inputVal: e.detail.value,
    });
  }
  //搜索 end
})