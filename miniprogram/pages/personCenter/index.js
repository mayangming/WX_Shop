// pages/personCenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountType: "医生",
    address: "伊甸园"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkAuth()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },
  personCenterAddressListener: function() {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        if (res.authSetting["scope.address"]) {
          console.log("拥有授权");
          that.getAddress(); //授权成功后这里需要再点击一下才能获取地址
        } else {
          wx.openSetting({
            success(res) {
              console.log("授权成功")
            },
            fail(e) {
              console.log("授权失败")
            }
          })
        }
      }
    })


  },
  getAddress: function() {
    var address = '';
    var that = this;
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        address = res.userName + ':' + res.provinceName + res.cityName + res.countyName + res.detailInfo
        that.address = address
        that.setData({
          address: address
        })
      },
      fail(e) {
        console.log(y)
      }
    })
  },
  checkAuth: function() {
    wx.getSetting({
      success(res) {
        console.log(res)
        var authMap = res.authSetting;
        var length = Object.keys(authMap).length;
        console.log("长度:" + length)
        var isAuthAddress = 0; //是否授权通过，有三种情况，0:从未授权，1:授权成功，2:授权失败
        if ('scope.address' in authMap) {
          if (authMap['scope.address']) { //已经授权成功
            isAuthAddress = 1
          } else { //授权拒绝
            isAuthAddress = 2
          }
        } else { //没有授权过
        }
        if (isAuthAddress == 0) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              wx.showToast({
                title: '授权成功'
              })
            },
            fail(e) {
              wx.showToast({
                title: '授权失败'
              })
            }
          })
        }
      }
    })
  }
})