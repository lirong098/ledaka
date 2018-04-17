var app = getApp();
var publicurl = app.globalData.publicurl;
var columnChart = null;
var isshow;
var page =1
let Bar = require('../../utils/wxcharts.js');
let bar = new Bar();
let newdata =[
];
var option;
var src;
var onShare = 0;
var share = 0;
var audioPlay_show = 0;
var xcode = 1;
Page({
    data:{
        year:'年打卡',
        sum:'总打卡',
        year_next:'次',
        sum_next:'次',
        hasMore: true,
        currentTab:0,

        showpage:true,
        musicshow: true,
        buttontext: "音乐暂停",
        buttonbind: "audioPlay",
        audiobind: "pause",
        play: "/images/suspend.png",
        mute: "/images/mute.png",
        page:1,
        imgUrls:[],
        imagesurl: app.globalData.imagesurl,
        swiper_style:"margin-top:100rpx;",
        musiclist: [],
        musictitle: "Nightingale",
        musicauthor: "Yanni",
        musicpic_big: "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000",
        trainee_name:'',
        trainee_id :0,
        bind_status:1
    },
    onLoad:function(options){
      let that = this;
      share = 0;
      share = options.share;
      onShare = 0;
      audioPlay_show = 0;
      xcode = 1;
      xcode = options.xcode;
      src = options.src;
      if (xcode != 1) {
        src = src + '?xcode=' + xcode;
      }
      if (options.trainee_id != "" && options.trainee_id != null && options.trainee_id != "undefined" ){
          that.setData({
            trainee_id: options.trainee_id
          });
          if (!app.globalData.id) {
            app.globalData.id = wx.getStorageSync('id');
          }
          if (app.globalData.id != options.trainee_id){
            that.setData({
              bind_status: 0
            });
          }
      }else{
        that.setData({
          trainee_id: app.globalData.id
        });
      }
    },
    onShow: function(){
        var that = this
        var qty = page*10
        wx.request({
          url: publicurl+'index/Mysuccess/index',
          data: {
            trainee_id:that.data.trainee_id,
            page:page,
            qty:qty,
            msg:1
          },
          success: function(res){
            console.log(res.data)
           newdata = res.data.newdata
           bar.draw({
              renderTo:"tagRateCanvas",
              series:newdata,
              setCanvasSize: o=>that.setData({ctxHeight:o.height}),
              onTouch:(e)=>{
                let serie = e.serie
                that.renderRecords(serie.items)
              }
          })        
            that.setData({
                recordlist :res.data.recordarray,
                url: app.globalData.imagesurl,
                trainee_name: res.data.trainee_name             
            })            
          },
          fail: function() {
            // fail
          }
        })

        that.audioPause();
        if (share == 1 && src) { //分享进来显示我们的故事
          that.setData({
             src: src,
             showpage: false,
             page: 1,
             currentTab:1
          });
          that.trainee_images(that.data.trainee_id);
          return;
        }
        var musicsrc = wx.getStorageSync('musicsrc');
        if (musicsrc) {
          that.setData({
            src: musicsrc,
            musictitle: wx.getStorageSync('musictitle'),
            musicauthor: wx.getStorageSync('musicauthor'),
            musicpic_big: wx.getStorageSync('musicpic_big')
          })
          src = musicsrc
        } else {
          src = "http://helpvideo-1253342623.cossh.myqcloud.com/Nightingale.mp3"
          that.setData({ src: "http://helpvideo-1253342623.cossh.myqcloud.com/Nightingale.mp3" })
        }
    },
onReady: function (e) {
},
loadMore:function (){
  var that = this
  if (!that.data.hasMore) return
  ++page
  wx.request({
    url: publicurl + 'index/Mysuccess/index',
    data: {
      trainee_id: that.data.trainee_id,
      page: page,
      qty: 10,
      msg:1
    },
    success: function (res) {
      if(res.data.recordarray && res.data.recordarray.length >0)
      {
        that.data.recordlist.push.apply(that.data.recordlist,res.data.recordarray)
      }
      if (res.data.recordarray.length < 5)
      {
          that.setData
          ({
              hasMore:false
          })
      }
      that.setData
      ({
          recordlist: that.data.recordlist,
      })
    },
    fail: function () {
    }
  })
},
/** 
   * 点击tab切换 
   */
swichNav: function (e) {
  let that = this;
  console.log(e.currentTarget.dataset.current);
  if (this.data.currentTab === e.currentTarget.dataset.current) {
    return false;
  } else {
    that.setData({
      currentTab: e.currentTarget.dataset.current,
      background_color: ""
    })
    if (e.currentTarget.dataset.current == 0){
      share =0;
      that.setData({
        showpage:true
      });
      that.onShow();
    } else if (e.currentTarget.dataset.current == 1){
      that.setData({
        showpage: false,
        page:1
      });
      that.trainee_images(that.data.trainee_id);
    }
  }
},
/*网络请求 工作室相册*/
  trainee_images: function (trainee_id_img = 0, page = 1, qty = 10) {
  let that = this;
  wx.request({
    url: publicurl + 'index/Mysuccess/trainee_images',
    data: {
      trainee_id: trainee_id_img,
      page: page,
      qty: qty
    },
    success: function (res) {
      if (res.data && res.data.length > 0) {
        that.data.imgUrls.push.apply(that.data.imgUrls, res.data);
        if (res.data.length < 10) {
          that.setData({
            hasMore: false,
          });
        }
      } else {
        that.setData({
          hasMore: false,
        });
      }
      that.setData({
        imgUrls: that.data.imgUrls,
        page: ++that.data.page
      })
    },
  })
},
/*相册滑块改变 执行的事件*/
bindSwiper: function (e) {
  let that = this;
  console.log(e.detail.current);
  if (e.detail.current === 9 || e.detail.current === 19 || e.detail.current === 29 || e.detail.current === 39 || e.detail.current === 49) {
    if (!that.data.hasMore) return;
    that.trainee_images(that.data.trainee_id, that.data.page);
  };
},

audioPlay: function () {
  var that = this
  that.setData({
    autoplay: true,
    play: "/images/play.png",
    buttonbind: "audioPause"
  })
  if (that.data.audiobind == "pause") {
    wx.pauseBackgroundAudio()
    wx.playBackgroundAudio({
      dataUrl: that.data.src,
      title: that.data.musictitle,
      coverImgUrl: that.data.musicpic_big
    })
  }
},
audioPause: function () {
  var that = this
  wx.pauseBackgroundAudio()
  that.setData({
    autoplay: false,
    play: "/images/suspend.png",
    buttonbind: "audioPlay"
  })
},
pause: function () {
  wx.pauseBackgroundAudio()
  var that = this;
  that.setData({
    mute: "/images/stopmute.png",//静音图片
    audiobind: "play"
  })
},
play: function () {
  var that = this;
  wx.playBackgroundAudio({
    dataUrl: src,
    title: that.data.musictitle,
    coverImgUrl: that.data.musicpic_big
  })
  that.setData({
    mute: "/images/mute.png",
    audiobind: "pause"
  })
},

onShareAppMessage: function () {
  onShare = 1; //此参数是用于分享
  var that = this;
  var hello = src.split("?");
  if (hello.length == 1) {
    hello['1'] = '1';
  }
  var tmp = hello['1'];
  var ary = tmp.split("=");
  if (ary.length == 1) {
    ary['1'] = 1;
  }
  return {
    title: that.data.trainee_name + '分享了一个音乐相册',
    path: '/pages/column/column?trainee_id=' + that.data.trainee_id + '&share=1&src=' + hello['0'] + '&xcode=' + ary['1'],
    // path:'/pages/index/index?onShareAppMessage=8081'
  }
},
bindssss: function () {
  if (onShare == 0) {
    wx.showModal({
      title: '提示',
      content: "请点击右上角的三个点，选择“转发”发送给朋友。",
      showCancel: false
    })
  }
},
music_list_show: function () {
  var that = this
  that.audioPause();
  that.setData({
    src: null
  })
  wx.navigateTo({
    url: '../motorgroup/musiclist/musiclist',
  })
},
});