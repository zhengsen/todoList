//index.js
var dbUtil = require('../../utils/dbUtil.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '添加新事件',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../homepage/homepage'
    })
  },
  addNewIncident: function(){
    wx.navigateTo({
      url: '../addIncident/addIncident',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    dbUtil.openDataBase()
  }
})
