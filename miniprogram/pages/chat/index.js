// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatArray: [
      {
        index: 0,
        userId: 1,
        userIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        userName: "测试用户一",
        chatContent: "聊天内容一",
        lastTime: 131,
        chatInput: ''//列表中输入的文本框内容
      },
      {
        index: 1,
        userId: 2,
        userIcon: "http://photo.tuchong.com/1691049/f/18527449.jpg",
        userName: "测试用户二",
        chatContent: "聊天内容二聊天内容二聊天内容二聊天内容二聊天内容二聊天内容二聊天内容二",
        lastTime: 131,
        chatInput: ''//列表中输入的文本框内容
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://yun.shengzhaitang.com/wx-medical/user/getByMobile?mobile=15993729750',
    //   success(res){
    //     console.log(res.data)
    //   }
    //   }
    // )
    // const db = wx.cloud.database()
    // const todosCollection = db.collection('userInfo')
    // todosCollection.add({
    //   data:{
    //     userName:'杨明',
    //     userId:1
    //   },
    //   success: function(res){
    //     console.log("YM_success", res)
    //   },
    //   fail: function(error){
    //       console.log("YM_fail",error)
    //   }
    // })
    // todosCollection.add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     userName: 'dd',
    //     userId: 2
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(console.error)

    const promise = new Promise(function (resolve, reject) {
      // ... some code
      resolve('1');
      // if (/* 异步操作成功 */) {
      //   resolve(value);
      // } else {
      //   reject(error);
      // }
    });
    const a = ['a','b','c'];
    a.forEach(
      x =>
      console.log('forEach',x)
    )
    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve('2'), 3000)
    })
    promise.then(value => {
      // setTimeout(() => resolve('2'), 1000)
      return p1
    }).then(
      value => {
        JSON.parse
        console.log('ym2_resolve', value)
      },
      value1 => {
        console.log('ym2_reject', value)
      })
  },

  test: function (e) {
    var chatArr = this.data.chatArray
    for (var i = 0; i < chatArr.length; i++) {
      console.log('YM_test结果_value', chatArr[i].chatInput)
    }
  },
  chatInput: function (e) {
    console.log('YM_chatInput', e)
    this.data.chatArray[e.target.id].chatInput = e.detail.value
  },
  requestUpdate: function () {
    wx.request({
      url: 'http://wx-miniapp.dianyinfo.com/api/asset/check/task/records',
      success(res) {
        console.log(res.data)
      }
    }
    )
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

  }
})