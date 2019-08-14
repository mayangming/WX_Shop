//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
  },

  choose() {
    wx.chooseVideo({
      sourceType: ['camera'],
      compressed: '',
      maxDuration: 10,
      success: function(res) {
        console.log('录制视频地址-choose',res.tempFilePath)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  choose2() {
    wx.chooseVideo({
      maxDuration: 10,
      success: function(res) {
        console.log('录制视频地址-choose2', res.tempFilePath)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})