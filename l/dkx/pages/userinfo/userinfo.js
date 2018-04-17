// pages/userinfo/userinfo.js
var app = getApp()
var coachid
var publicurl = app.globalData.publicurl
var trainee_name 
var company
var phone
var industry
var motto
var sex
var picture
var userdate
Page({
  data:{
    array: ['男', '女'],
    industrys:['金融','保险','财会','咨询','互联网/通讯','文化传媒/出版','法律','体育','健康/医药/生物','工业/制造','消费电子/半导体','政府/非盈利组织','教育科研','能源','贸易','地产','零售','物流','餐饮/食品','服装','服务行业','其它'],
    tranieeinfo:{}
  },
  formSubmit:function(e){
      wx.request({
        url: publicurl+'index/Trainee/addform?trainee_id='+app.globalData.id,
        data: {
          trainee_name: e.detail.value.name,
          sex:e.detail.value.gender,
          birthday:e.detail.value.date,
          phone:e.detail.value.phone,
          company:e.detail.value.coope,
          industry:e.detail.value.industry,
          motto:e.detail.value.motto,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
              //console.log(res.data)
              wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
        }
      })
  },
//姓名
  addname:function(e){
      if((e.detail.value) && ( trainee_name =="")){ 
        var name = e.detail.value;
        name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
          wx.request({
                url: publicurl+'index/Trainee/addname',
                data: {
                  trainee_name: name,
                  trainee_id:app.globalData.id,
                  // trainee_id:trainee_id,
                  // id:app.globalData.id
                }, 
                fail: function(res) {
                  // fail
                }
              })
     }
     if(trainee_name){ 
       var name = e.detail.value;
       name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
          wx.request({
                url: publicurl+'index/Trainee/addname',
                data: {
                  trainee_name: name,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }    
  },
  //电话
  addphone:function(e){
      if((e.detail.value) && ( phone =="")){ 
          wx.request({
                url: publicurl+'index/Trainee/addphone',
                data: {
                  phone: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }
     if(phone){ 
          wx.request({
                url: publicurl+'index/Trainee/addphone',
                data: {
                  phone: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }    
  },
  //公司
  addcompany:function(e){
      if((e.detail.value) && ( company =="")){ 
          wx.request({
                url: publicurl+'index/Trainee/addcompany',
                data: {
                  company: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }
     if(company){ 
          wx.request({
                url: publicurl+'index/Trainee/addcompany',
                data: {
                  company: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }    
  },
  //座右铭
  addmotto:function(e){
      if((e.detail.value) && ( motto =="")){ 
          wx.request({
                url: publicurl+'index/Trainee/addmotto',
                data: {
                  motto: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }
     if(motto){ 
          wx.request({
                url: publicurl+'index/Trainee/addmotto',
                data: {
                  motto: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }    
  },  
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('55555555555555')
    this.setData({
      index: e.detail.value,
      gender:e.detail.value
    })
  },
  bindDateChange: function(e) {
      if(e.detail.value!==userdate){ 
          wx.request({
                url: publicurl+'index/Trainee/addbirthday',
                data: {
                  birthday: e.detail.value,
                  trainee_id:app.globalData.id,
                },
                fail: function(res) {
                  // fail
                }
              })
     }
    this.setData({
      date: e.detail.value,
      userdate:e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //行业
  bindIndustryChange: function(e) {
    var that =this
    // var x = e.detail.value
    // var industry =that.data.industrys[x]
    console.log(industry) 
     console.log('55555555555555')
          wx.request({
                 url: publicurl+'index/Trainee/addindustry',
                data: {
                  industry: e.detail.value,
                  trainee_id:app.globalData.id, 
                },
                fail: function(res) {
                  // fail
                }
              })
    this.setData({
      industry: e.detail.value,
      
    })
    console.log(industry) 
  },
  onLoad:function(options){
    var that = this
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this
      wx.request
      ({
        url: publicurl+'index/Trainee/fetchdata',
        data: {
          trainee_id:app.globalData.id
        },
        success: function(res){
          //console.log(res.data)
           trainee_name = res.data.trainee_name
           phone = res.data.phone
           motto = res.data.motto
           company = res.data.company
           industry = res.data.industry
           if(res.data.birthday ==null){
              res.data.birthday =''
           }
           userdate = res.data.birthday
           that.setData({
              tranieeinfo:res.data,
              index: res.data.sex,
              gender:res.data.sex,
              date:res.data.birthday,
              userdate:res.data.birthday,
              industry:industry,
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