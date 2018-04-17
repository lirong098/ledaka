// pages/addgroup/addgroup.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var group_id = 0;
var name;
let showModal = require('../../utils/ShowModal.js');
Page({
  data: {
    groupname: "组名",
    placeholder: "请填写分组名称",
    save: "保存",
    group_id: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    group_id = options.group_id;
    let that = this;
    that.setData({
      group_id: group_id
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/Coach_Group/selectname',
      data: {
        group_id: group_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        if (res.data.msg == 1) {
          name = res.data.group_name
          that.setData({
            group_name: res.data.group_name
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit: function (e) {
    // console.log(e.detail.value.name)
    // console.log(e.detail.value.introduction)
    if (name != "未分组") {
      wx.request({
        url: publicurl + 'index/Coach_Group/add?coach_id=' + app.globalData.id,
        data: {
          name: e.detail.value.name,
          group_id: group_id
        },
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else {
      wx.showModal({
        title: '错误提示',
        content: '未分组为系统默认，不可修改。',
        showCancel: false,
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  /*删除组*/
  binddeleta:function(){
    showModal.showModal(function(){
      wx.request({
        url: publicurl + 'index/Coach_Group/delete?coach_id=' + app.globalData.id,
        data: {
          group_id: group_id
        },
        success: function (res) {
          if (res.data.msg == 1) {
            showModal.showToast(function () {
              wx.navigateBack({
                delta: 1
              })
            }, res.data.text, 'success', 2000);
          } else {
            showModal.showModal("", '提示', res.data.text, false, false);
          }

        }
      })
    }, '操作提示。',' 确定删除该学员组?');
    
  }
})