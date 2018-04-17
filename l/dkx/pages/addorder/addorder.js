// pages/addorder/addorder.js
var app = getApp()
var coachid
var publicurl = app.globalData.publicurl
var seorder_id
Page({
  data:{
    lesson:'课程',
    card:'卡类型',
    startdate:'开始日期',
    enddate:'有效期截止',
    goods_number:'课程数',
    goods_use:'已使用课程',
    studio:'工作室',
    save:'保存并使用'
  },
  onLoad:function(options){
    seorder_id = options.seorder_id
  },
  onReady:function(){
    // 页面渲染完成
  }, 
  onShow:function(){
    // 页面显示
    var that = this
      wx.request
      ({
        url: publicurl+'index/Seorder/dkxseorderinfo',
        data: {
          seorder_id:seorder_id
        },
        success: function(res){
          console.log(res.data)
            that.setData({
                  program_name:res.data['0'].program_name,
                  card_name:res.data['0'].card_name,
                  studio_name:res.data['0'].studio_name,
                  stardate:res.data['0'].start_date,
                  endate:res.data['0'].expiration_date,
                  good_number:res.data['0'].goods_number,
                  good_use:res.data['0'].goods_use,
                  seorder_id:res.data['0'].id
              })
        },
      })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})