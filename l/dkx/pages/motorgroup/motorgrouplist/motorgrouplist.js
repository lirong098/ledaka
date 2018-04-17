// pages/motorgroup/motorgrouplist/motorgrouplist.js
var GetuserInfo = require('../../../utils/GetuserInfo.js');
var app = getApp();
var publicurl = app.globalData.publicurl;
var yearweek1 = 0;
var studio_id;
var newmonth = 0;
var option;
var src;
var onShare = 0;
var share = 0;
var audioPlay_show = 0;
var xcode = 1;
Page({
  data: {
    navl: "navl",
    navr: "navr",
    pageshow: true,
    imagesurl: app.globalData.imagesurl,
    imgUrls:[],
    hasMore:true,//相册自动加载
    page:1,//加载相册页数
    src: null,
    buttontext: "音乐暂停",
    buttonbind: "audioPlay",
    play: "/images/suspend.png",
    mute: "/images/mute.png",
    autoplay: false,
    audiobind: "pause",
    inputShowed: false,
    inputVal: "",
    musicshow: true,
    musiclist: [],
    musictitle: "Nightingale",
    musicauthor: "Yanni",
    musicpic_big: "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000"
  },
  onLoad: function (options) {
    var that = this;
    option = options;
    yearweek1 = newmonth;
    studio_id = options.studio_id;
    that.setData({ studio_id: studio_id });
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
  },
  onReady: function () {
    // 页面渲染完成
    var that = this
    //that.audioPlay();
  },
  onShow: function () {
    // 页面显示   
    var that = this
    that.studio_record(studio_id, yearweek1);
    that.audioPause();
    if (share == 1 && src) { //分享进来显示我们的故事
      that.setData({ src: src });
      that.bindnavright();
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
      if (audioPlay_show == 1) {
      }
    } else {
      src = "http://helpvideo-1253342623.cossh.myqcloud.com/Nightingale.mp3"
      that.setData({ src: "http://helpvideo-1253342623.cossh.myqcloud.com/Nightingale.mp3" })
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    var that = this;
    that.audioPause();
    wx.stopBackgroundAudio();
  },
  bindtopweek: function () {
    var that = this
    if (yearweek1) {
      var hello = yearweek1.split("-");
      if (hello['1'] == '01') {
        hello['0'] = hello['0'] - 1
        hello['1'] = 12
        yearweek1 = hello.join("-")
      } else {
        hello['1'] = hello['1'] - 1
        if (hello['1'] <= 9) {
          hello['1'] = '0' + hello['1']
        }
        yearweek1 = hello.join("-")
      }
    }
    that.studio_record(studio_id, yearweek1);
  },
  bindbottomweek: function () {
    var that = this
    if (yearweek1) {
      var hello = yearweek1.split("-");
      if (hello['1'] == '12') {
        hello['0'] = ++hello['0']
        hello['1'] = '01'
        yearweek1 = hello.join("-")
      } else {
        hello['1'] = ++hello['1']
        if (hello['1'] <= 9) {
          hello['1'] = '0' + hello['1']
        }
        yearweek1 = hello.join("-")
      }
    }
    that.studio_record(studio_id, yearweek1);
  },
  bindnavleft: function () {
    var that = this;
    share = 0;
    that.setData({
      navl: "navl",
      navr: "navr",
      pageshow: true
    })
  },
  bindnavright: function (fun = "") {
    var that = this
    that.setData({
      navl: "navr",
      navr: "navl",
      pageshow: false,
      page:1
    })
    that.studio_images(studio_id);
    if (audioPlay_show == 0) {
      audioPlay_show = 1;
    }
  },
  audioPlay: function (fun = "") {
    var that = this
    that.setData({
      autoplay: true,
      play: "/images/play.png",
      buttonbind: "audioPause"
    })
    if (that.data.audiobind == "pause") {
      console.log(that.data.src)
      wx.pauseBackgroundAudio()
      wx.playBackgroundAudio({
        dataUrl: that.data.src,
        title: that.data.musictitle,
        coverImgUrl: that.data.musicpic_big
      })
    }
  },
  audioPause: function (fun = "") {
    var that = this
    wx.pauseBackgroundAudio()
    that.setData({
      autoplay: false,
      play: "/images/suspend.png",
      buttonbind: "audioPlay"
    })
    typeof fun == "function" && fun();
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
    var that = this
    var hello = src.split("?");
    if (hello.length == 1) {
      hello['1'] = '1';
    }
    var tmp = hello['1'];
    console.log(tmp);
    var ary = tmp.split("=");
    if (ary.length == 1) {
      ary['1'] = 1;
    }
    return {
      title: that.data.trainee_name + '分享了一个音乐相册',
      path: '/pages/motorgroup/motorgrouplist/motorgrouplist?studio_id=' + studio_id + '&share=1&src=' + hello['0'] + '&xcode=' + ary['1'],
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
  /*网络请求 学员排行版*/
  studio_record: function (studio_id, y) {
    var that = this
    wx.request({
      url: publicurl + 'index/Mysuccess/studio_record',
      data: {
        studio_id: studio_id,
        yearweek: y,
        trainee_id: app.globalData.id
      },
      success: function (res) {
        if (res.data.msg == 2) {
          if (y == 0) {
            newmonth = res.data.v;
          }
          yearweek1 = res.data.v;
          that.setData({
            recordlist: res.data.data,
            weekend: res.data.weekend,
            trainee_name: res.data.trainee_name,
            mouth: res.data.v
          })
        }
      },
      fail: function (res) {
        GetuserInfo.showModal(option, that.onLoad)
      }
    })
  },
  /*网络请求 工作室相册*/
  studio_images: function (studio_id_img = 0, page = 1, qty = 10) {
    let that = this
    wx.request({
      url: publicurl + 'index/Mysuccess/studio_images',
      data: {
        studio_id: studio_id_img,
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
        }else {
          that.setData({
            hasMore: false,
          });
        }
        that.setData({
          imgUrls: that.data.imgUrls,
          page: ++that.data.page
        })
      },
      fail: function (res) {
        GetuserInfo.showModal(option, that.onLoad)
      }
    })
  },
  music_list_show: function () {
    var that = this
    that.audioPause();
    that.setData({
      src: null
    })
    wx.navigateTo({
      url: '../musiclist/musiclist',
    })
  },
  /*相册滑块改变 执行的事件*/
  bindSwiper:function(e){
    let that = this;
    if (e.detail.current === 9 || e.detail.current === 19 || e.detail.current === 29 || e.detail.current === 39 || e.detail.current === 49){
      if (!that.data.hasMore) return;
      that.studio_images(studio_id,that.data.page);
    };
  }
})