// pages/chatDetails/index.js
const util = require('/../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatDetailsList:[
      {
        messageId:1,
        lastTime: util.getDateDiff(1554183043000),
        headIcon:"http://photo.tuchong.com/1691049/f/18527449.jpg",
        content:"左侧数据",
        type:1,//数据类型，1：文本
        fromId:123,//数据来源ID，如果和登录用户ID一致，则是接受消息，否则是发送消息
        toId:456
      },
      {
        messageId: 2,
        lastTime: util.getDateDiff(1554269443000),
        headIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        content: "右侧数据",
        type: 1,//数据类型，1：文本
        fromId: 1,//数据来源ID，如果和登录用户ID一致，则是接受消息，否则是发送消息
        toId: 123
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  sendContentListener: function(){
    wx.showToast({
      title: '发送成功',
    })
  }
})