// pages/shopCar/index.js
const util = require('/../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopLength: 0,
    shopList: [],
    priceCount:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
    this.formatData();
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
  /** 初始化页面数据 */
  initData: function () {
    const value = wx.getStorageSync('shopList');
    var tempShopList = [];
    var shopListJstr = "";
    if (value) {
      tempShopList = JSON.parse(value);
    }
    var length = tempShopList.length;
    for (var i = 0; i < length; i++) {
      tempShopList[i].count = 0;
      tempShopList[i].isChecked = false;
    }
    this.setData({
      shopLength: length,
      shopList: tempShopList,
    })
  },
  /** 计算总价 */
  shopCarCountWorkListener: function () {
    //调用支付功能开始发货
    wx.showToast({
      title: '开始支付发货~',
    })
  },
  shopCarCheckBoxListener: function (e) {
    var index = e.currentTarget.dataset.index;
    var tempItem = this.data.shopList[index];
    tempItem.isChecked = !tempItem.isChecked;
    this.countWork();
  },
  countWork: function(){
    var tempShopList = this.data.shopList;
    var length = tempShopList.length;
    console.log(tempShopList);
    var pricecount = 0;
    for (var i = 0; i < length; i++) {
      var tempItem = tempShopList[i];
      if (tempItem.isChecked) {
        pricecount += tempItem.shopPrice;
      }
    }
    this.setData({
      priceCount: pricecount,
    })
  },
  /**格式化列表数据 */
  formatData: function () {
    var tempShopArray = this.data.shopList;
    var length = tempShopArray.length;
    console.log("--size-->" + length)
    for (let i = 0; i < length; i++) {
      tempShopArray[i].shopPrice = util.moneyFormatter(tempShopArray[i].shopPrice)
    }
    this.setData({
      tempShopArray: tempShopArray
    })
  }
})