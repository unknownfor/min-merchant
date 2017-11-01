// 获取应用实例
var app = getApp()
Page({
  data: {
    userName: '',
    userPassword: '',
    toastHidden: true,
    id_token: '',//方便存在本地的locakStorage  
    response: '' //存取返回数据  
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  logIn: function () {
     wx.navigateTo({
          url: '../index/index'
        })
    var that = this
    wx.request({
      url: '',
      data: {
        username: this.data.userName,
        password: this.data.userPassword,
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          id_token: res.data.id_token,
          response: res
        })
        try {
          wx.setStorageSync('id_token', res.data.id_token)
        } catch (e) {
        }
        // wx.navigateTo({
        //   url: '../index/index'
        // })
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed');
        
      }
    })
  }
})  