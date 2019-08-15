// pages/home/home.js
const db = require('../../util/db')
const util = require('../../util/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  test: function() { //promise测试方法
    this.timeout(100).then((value) => {
      console.log(value);
    }).catch(error => {
      console.log(error)
    })
  },
  timeout(ms) {
    return new Promise((resolve, reject) => {
      let temp = 0
      if (temp) {
        setTimeout(resolve, ms, 'success');
      } else {
        reject("这是错误信息")
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProductList()
    // let b = 'false'
    // let type = eval(b)
    // let type = JSON.parse(b)
    // console.log('type', typeof type)
    // console.log('type-value', type)
    // this.test()
    // this.asyncRequest().then(res => {
    //   console.log('成功', res)
    // }).catch(err => {
    //   console.log('失败', err)
    // })

  //仿写代码

    function rs(o){
        o.success('success')
        o.error('error')
    }

    function test(callback){
      function f1(value){
        console.log('f1',value)
      }

      function f2(value){
        console.log('f2', value)
      }
      callback(f1,f2)
    }


    // test((f1,f2) => {
    //   f1(1)
    //   f2(2)
    // })

    test((f1, f2) => rs({
      success:f1,
      error:f2
    }))
    var f14 = function () {
      return '执行函数f14';
    }
    console.log(f14)
    console.log(f14())
  },
  getProductList: function() {
    wx.showLoading({
      title: 'Still Loading...',
    })

    db.getProductList().then(result => {
      wx.hideLoading()
      const productList = result.data
      // 2 digits for price
      productList.forEach(product => product.price = util.formatPrice(product.price))

      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch(e => {
      console.error(err)
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /** 异步测试 */
  asyncRequest: function() {
    return new Promise((resolve, reject) => wx.request({
      url: 'test.php',
      success: resolve,
      fail: reject
    }))
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

  }
})