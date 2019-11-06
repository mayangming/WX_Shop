// pages/hospatial/hospatialMap.js
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2
Page({
  /**
   * 页面的初始数据
   */
    data: {
      markers: [{
        iconPath: "/resources/others.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 20,
        height: 30
    }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
      }, {
            longitude: 113.324520,
            latitude: 23.21229
      }],
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
    }],
      controls: [{
        id: 1,
        iconPath: '/resources/location.png',
        position: {
          left: 0,
          top: 450 - 50,
          width: 20,
          height: 30
        },
    clickable: true
    }],
      longitude: 113.324520,
      latitude: 23.099994
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // XFXBZ - FOOW5 - MFUI6 - QGZYN - 3GNHO - P4F7S
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B'
    })
    // this.setLocation()
    this.onTapLocation()
  },
  //设置位置
  setLocation(){
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation']
        let locationAuthType = auth ? AUTHORIZED
          : (auth === false) ? UNAUTHORIZED : UNPROMPTED
        this.setData({
          locationAuthType: locationAuthType
        })

        if (auth)
          this.getLocation()
        else
        console.log('没有授权,需要使用默认城市')
      },
      fail: () => {
        console.log('授权失败,需要使用默认城市') //使用默认城市广州
      }
    })
  },
  //获取下当前位置
  getLocation: function () {
    wx.getLocation({
      success: res => {
        console.log('定位成功当前位置', res)

        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {

            let city = res.result.address_component.city
            console.log(city)
            console.log('使用sdk获取当前位置',res)
            this.setData({
              city: city,
              locationTipsText: ''
            })
          }
        })
      },
      fail: () => {
        this.setData({
          locationAuthType: UNAUTHORIZED
        })
      }
    })
  },
  onTapLocation: function () {
    if (this.data.locationAuthType == UNAUTHORIZED) {
      wx.openSetting({
        success: res => {
          let auth = res.authSetting['scope.userLocation']
          if (auth) {
            this.getLocation()
          }
        }
      })
    } else {
      this.getLocation()
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

  }
})