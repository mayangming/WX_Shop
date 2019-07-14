// pages/shopDetails/index.js
const util = require('/../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDetails: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = JSON.parse(options.item);
    console.log("-shopDetails---options--->" + options);
    console.log("-shopDetails---options_item--->" + options.item);
    var tempPrice = util.moneyFormatter(item.shopPrice);
    this.setData({
      shopDetails: item,
      price: tempPrice
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**添加到购物车监听 */
  shopDetailsAddListener: function() {
    try {
      const value = wx.getStorageSync('shopList');
      var shopList = [];
      var shopListJstr = "";
      if (value) {
        shopList = JSON.parse(value);
      }
      var length = shopList.length;
      if(length >= 50){
        wx.showToast({
          title: '最多只能添加50件药品，请前往购物车删除',
        })
        return;
      }
      shopList.push(this.data.shopDetails);
      shopListJstr = JSON.stringify(shopList);
    } catch (e) {
      // Do something when catch error
      console.log("-shopDetails---修改数组异常--->" + e);
    };
    try {
      wx.setStorageSync('shopList', shopListJstr)
    } catch (e) {
      console.log("-shopDetails---存储数据异常--->" + e);
    }
    wx.showToast({
      title: '已添加',
    })
  },
  /**跳转到购物车的事件 */
  shopDetailsCarListener: function (){
    wx.navigateTo({
      url: '../shopCar/index',
    })
  }
})