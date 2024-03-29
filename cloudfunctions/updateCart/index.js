// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productList = event.list

  // delete all the data from cart
  await db.collection('cart').where({//删除该用户所有购物车数据，也可以直接删除指定数据
    user,
  }).remove()

  // fill cart with updated data
  for (const product of productList) {//传入最新的购物车数据
    await db.collection('cart').add({
      data: {
        productId: product.id,
        count: product.count,
        user,
        image: product.image,
        name: product.name,
        price: product.price,
      },
    })
  }

  return {}
}