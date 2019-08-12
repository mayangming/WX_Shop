// pages/cart/cart.js
const util = require("../../util/util.js")
const db = require("../../util/db.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    cartList: [],
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: '45.00',
  },
  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
    this.getCart()
  },
  getCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    // const cartCheckMap = this.data.cartCheckMap
    db.getCart().then(result => {
      wx.hideLoading()

      const data = result.result
      if (data && data.length) {
        // update the total price for cart
        this.setData({
          cartTotal: util.formatPrice(0),//默认初始化为0元
          cartList: data
        })
      } else {
        this.setData({
          cartTotal: util.formatPrice(0),//默认初始化为0元
          cartList: []
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
  onTapCheck(event) {
    const checkId = event.currentTarget.dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let isSelectAllChecked = this.data.isSelectAllChecked
    const cartList = this.data.cartList
    let cartTotal = 0

    if (checkId === 'selectAll') {
      isSelectAllChecked = !isSelectAllChecked
      cartList.forEach(product => {
        cartCheckMap[product.productId] = isSelectAllChecked
      })
    } else {
      cartCheckMap[checkId] = !cartCheckMap[checkId]
      isSelectAllChecked = true
      cartList.forEach(product => {
        if (!cartCheckMap[product.productId]) {
          // not all product selected
          isSelectAllChecked = false
        }
      })

    }

    cartTotal = this.updateTotalPrice(cartList, cartCheckMap)
    this.setData({
      cartTotal,
      isSelectAllChecked,
      cartCheckMap
    })
  },
  updateTotalPrice(cartList, cartCheckMap) {
    let checkout = 0
    cartList.forEach(product => {
      if (cartCheckMap[product.productId]) checkout += product.price * product.count
    })

    return util.formatPrice(checkout)
  },
  onTapEditCart() {
    if (!this.data.isCartEdit) {
      this.setData({
        isCartEdit: !this.data.isCartEdit
        // isCartEdit: true
      })
    } else {
      this.updateCart()
    }
  },
  adjustCartProductCount(event) {
    const dataset = event.currentTarget.dataset
    const adjustType = dataset.type
    const productId = dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let cartList = this.data.cartList
    const productToAdjust = cartList.find(product => product.productId === productId) || {}

    if (adjustType === 'add') {
      productToAdjust.count++
    } else {
      if (productToAdjust.count >= 2) {
        productToAdjust.count--
      } else {
        delete cartCheckMap[productId]//删除选择的集合中的元素
        cartList = cartList.filter(product => product.productId !== productId)//重新构建不包含该元素的集合
      }
    }

    const cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      cartList,
    })
    if (!cartList.length) {//删除最后一个商品的时候，同步数据至云端
      this.updateCart()
    }
  },
  updateCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    const cartList = this.data.cartList

    db.updateCart(cartList).then(result => {
      wx.hideLoading()
      const data = result.result
      if (data) {
        this.setData({
          isCartEdit: false,
          isSelectAllChecked: !this.data.isSelectAllChecked
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
  onTapCheckout() {
    if (this.data.cartTotal == 0) {
      wx.showToast({
        icon: 'none',
        title: 'Please Select Items',
      })
      return
    }
    wx.showLoading({
      title: 'Loading...',
    })

    const cartCheckMap = this.data.cartCheckMap
    const cartList = this.data.cartList
    const productsToCheckout = cartList.filter(product => cartCheckMap[product.productId])
    const cartToUpdate = cartList.filter(product => !cartCheckMap[product.productId])
    db.addToOrder({
      list: productsToCheckout,
      isCheckout: true//该变量用来判断是购物车结算还是立即购买
    }).then(result => {
      wx.hideLoading()
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed',
        })

        this.setData({
          cartList: cartToUpdate
        })

        this.getCart()
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = (function () {/*
line 1
line 2
line 3
*/}).toString().split('\n').slice(1, -1).join('\n')
    // "line 1
    // line 2
    // line 3"
    console.log('YM',t)
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

      this.getCart()

    }).catch(err => {
      console.log('Not Authenticated yet');
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