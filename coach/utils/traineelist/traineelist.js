var traineelist = {
  //@publicurl:网络请求地址
  //@coach_id:教练id
  //@fun:请求成功后执行的函数
  request: function (publicurl,coach_id,fun) {
    wx.request({
      url: publicurl + 'index/Coach_Trainee/traineeofgroup',
      data: {
        coach_id: coach_id,
      },
      success: function (res) {
        typeof fun == "function" && fun(res);
      },
      fail: function () {
        // fail
      },
      
    })
  },
  iconchange: function (array, index, fun) {
    array[index].status = '2';
    array[index].mainicon = "/images/plus.png";
    array[index].tap = "bindmaxchange";
    typeof fun == "function" && fun(array);
  },
  maxchange: function (array,index,fun) {
    array[index].status = '1';
    array[index].mainicon = "/images/minus.png";
    array[index].tap = "bindiconchange";
    typeof fun == "function" && fun(array);
  }
}
module.exports = traineelist