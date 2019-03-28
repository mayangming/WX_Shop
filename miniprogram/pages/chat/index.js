// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatArray:[
      {
        userId:1,
        userIcon:"http://photo.tuchong.com/1691049/f/18527449.jpg",
        userName:"测试用户一",
        chatContent:"聊天内容一",
        lastTime:131
      },
      {
        userId: 2,
        userIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        userName: "测试用户二",
        chatContent: "聊天内容二聊天内容二聊天内容二聊天内容二聊天内容二聊天内容二聊天内容二",
        lastTime: 131
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

  }
})