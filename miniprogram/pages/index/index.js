//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  test(i){
    var j = undefined || "0";
    console.log('YM',j)

    var message = {
      age:12
    }

    var name = '';

    var address = '北京';

    var test = name && (message.name = name)
    var test2 = address && (message.address = address)

    console.log('YM_message',message)
    console.log('YM_test', test)
    console.log('YM_test2', test2)

    if(name = ''){
      console.log('成功')
    }else{
      console.log('失败')
    }

  },
  functionTest(){
    /** 函数的基本定义,需要调用才能执行 */
    function f1(value) {
      return '函数基本定义';
    }

    /** 没有名字的函数表达式,需要调用才能执行 */
    var f2 = function (s) {
      console.log('函数表达式', s);
    };
    
    /** 有名字的函数表达式,需要调用才能执行 */
    var f3 = function f(s){
      //f只在这个范围内有效，函数外无效,这种方式可以适用于递归方式
      console.log('有名字的函数表达式_1', s);
      console.log('有名字的函数表达式_2', f);
      console.log('有名字的函数表达式_3', this);
    }
    f3('aaaaaaaaa')
    /** ES6函数表达式,需要调用才能执行 */
    var f4 = v => v + v;

    // 等同于
    var f5 = function (v) {
      return v + v;
    };

    /** 回调函数 */
    function f6(callBack) {
      callBack(5)
    }

    f6(function (value) {
      console.log('匿名函数的使用', value)
    })
    /** ES6函数表达式,函数返回对象的方式 */
    var f8 = (key,value)=>({
      key: key,
      value: value
    })
    console.log('函数中对象的返回方式',f8(1,2))
    /** 对象中的函数使用 */
    var o = {
      f9: function(value){
        console.log('对象函数的使用1', value)
      },
      f10(value){
        console.log('对象函数的使用2', value)
      },
      f11:value =>{
        console.log('对象函数的使用3',value)
        return '结果f8'
      },
      f12: value => '结果f9',
      f13:f2,
      f2
    }
    o.f9(1)
    o.f10(2)
    var result_11 = o.f11(3)
    console.log('result', result_11)
    var result_12 = o.f12(3)
    console.log('result', result_12)
    o.f13('对象中的函数表达是1')
    o.f2('对象中的函数表达是2')
  },
  onLoad: function() {
    this.functionTest()

    this.test()
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
