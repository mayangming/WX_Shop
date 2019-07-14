const util = require('./util')

const db = wx.cloud.database({
  env: 'ym1-b952c4'
})

function getProductList() {
  return db.collection('product').get()
}

function getProductDetail(id) {
  return wx.cloud.callFunction({
    name: 'productDetail',
    data: {
      id
    },
  })
}
function addToOrder(data) {
  return util.isAuthenticated().then(() => {
    return wx.cloud.callFunction({
      name: 'addToOrder',
      data,
    })
  })
    .catch(error => {
      console.log("addToOrder-ERROR",error)
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
}
function getOrders() {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'getOrders',
      })
    })
    .catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
}
function addToCart(data) {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'addToCart',
        data,
      })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
}
function getCart() {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'getCart',
      })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
}
function updateCart(list) {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'updateCart',
        data: {
          list,
        },
      })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
}

function addReview(data) {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'addReview',
        data,
      })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
}
function getReviews(productId) {
  return db.collection('review').where({
    productId,
  }).get()
}
function uploadImage(imgPath) {
  return wx.cloud.uploadFile({
    cloudPath: `review/${util.getId()}`,
    filePath: imgPath,
  })
}
module.exports = {
  getProductList,
  getProductDetail,
  addToOrder,
  getOrders,
  addToCart,
  getCart,
  updateCart,
  addReview,
  getReviews,
  uploadImage
}