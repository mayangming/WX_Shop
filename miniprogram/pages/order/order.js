// pages/order/order.js
const util = require('../../util/util')
const db = require('../../util/db')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //这个方法可以和组件模板里面的方法一样，倘若一样的很好，会执行这里的逻辑
  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo//赋值需要这里面的变量和组件里面的变量保持一致
    })
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet');
    })
    this.getOrders()

    // this.data.orderList.forEach(order => {
    //   order.productList.forEach(product => product.price = util.formatPrice(product.price))
    // })

    // this.setData({
    //   orderList: this.data.orderList
    // })
  },
  getOrders() {
    wx.showLoading({
      title: 'Loading...'
    })

    db.getOrders().then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        this.setData({
          orderList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed',
      })
    })
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