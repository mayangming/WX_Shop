// pages/shop/index.js
const util = require('/../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopArray:[
      {
        shopId:1,
        shopName:"黄精",
        shopIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        shopPrice:123,/** 药品价格，单位为分 */
      },
      {
        shopId: 2,
        shopName: "大麻",
        shopIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        shopPrice: 234,/** 药品价格，单位为分 */
      },
      {
        shopId: 3,
        shopName: "天麻",
        shopIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        shopPrice: 4534,/** 药品价格，单位为分 */
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  itemOnClickListener: function(e){
    var item = e.currentTarget.dataset.content;
    console.log(item);
    var content = JSON.stringify(item);
    wx.navigateTo({
      url: '../shopDetails/index?item=' + content,
    })
  },
  shop_search_function: function(e){
    var value = e.detail.value;
  },
  /**格式化列表数据 */
  formatData: function(){
    var tempShopArray = this.data.shopArray;
    var length = tempShopArray.length;
    for(let i = 0; i < length; i++){
      tempShopArray[i].shopPriceShow = util.moneyFormatter(tempShopArray[i].shopPrice)
    }
    this.setData({
      shopArray: tempShopArray
    })
  }
})