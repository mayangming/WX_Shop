// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID// 等同于 const user = event.userInfo.openId
  const productList = event.list || []
  const isCheckout = !!event.isCheckout// !!符号强制将变量转换为布尔值，倘若没有赋值时为undifine，此时转为false
  await db.collection('order').add({
    data: {
      user,
      createTime: +new Date(),
      productList,
    },
  })

  if (isCheckout) {//当该值为true时，表明是购物车购买的，然后查询购物车数据并删除相关物品
    // if it's checked out from cart
    await db.collection('cart').where({
      productId: db.command.in(productList.map(product => product.productId))
    }).remove()
  }
  console.log('云函数')
  return {}
}