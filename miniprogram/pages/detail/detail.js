// pages/detail/detail.js
const db = require('../../util/db')
const util = require('../../util/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   wx.showLoading({
  //     title: 'Loading...',
  //   })
  //  云函数取数据
  //   wx.cloud.callFunction({
  //     name: 'productDetail',
  //     data: {
  //       id: options.id
  //     },
  //   }).then(result => {
  //     console.log('商品详情',result)
  //     wx.hideLoading()
  //     const data = result.result

  //     if (data) {
  //       this.setData({
  //         product: data
  //       })
  //     } else {
  //       setTimeout(() => {
  //         wx.navigateBack()
  //       }, 2000)
  //     }


  //   }).catch(err => {
  //     console.error(err)
  //     wx.hideLoading()

  //     setTimeout(() => {
  //       wx.navigateBack()
  //     }, 2000)
  //   })
  // },
  onLoad(options) {
    this.getProductDetail(options.id)
  },

  getProductDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })
    //工具类取数据
    db.getProductDetail(id).then(result => {
      wx.hideLoading()

      const data = result.result
      console.log('获取数据', result)
      // get 2 digits price
      data.price = util.formatPrice(data.price)

      if (data) {
        this.setData({
          product: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 7000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 7000)
    })
  },
  buy: function () {
    wx.showLoading({
      title: 'Purchasing...',
    })
    const productToBuy = Object.assign({
      count: 1
    }, this.data.product)
    productToBuy.productId = productToBuy._id
    db.addToOrder({
      list: [productToBuy]
    }).then(result => {
      wx.hideLoading()

      const data = result.result
      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
  addToCart: function () {
    wx.showLoading({
      title: 'Loading...',
    })

    db.addToCart(this.data.product).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
  onTapReviewEntry() {
    console.log('评论数',this.data.product)
    if (this.data.product.reviewCount) {//评论数为0时禁止跳转
      const product = this.data.product
      wx.navigateTo({
        url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
      })
    }
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

})