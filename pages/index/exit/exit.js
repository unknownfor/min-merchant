const app = getApp();
Page({
  onLoad: function (options) {
    this.setData({
      mobile: options.mobile
    });
    // wx.setNavigationBarTitle({
    //   title: this.data.mobile//页面标题为路由参数
    // });
    // console.log(options)
    wx.request({
      url: 'https://test.api.jiayouzan.com/v3/merchant/auth/logout',
      header:{
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      method: 'PUT',
      success: function (res) {
        console.log(res)
      },

    })
    //要获取tartitle的标题
  },
  openConfirm: function () {
    wx.showModal({
      title: '确定退出登陆？',
      confirmText: "确定",
      cancelText: "取消",
      confirmColor: "#e6251c",
      // cancelColor: "#e6251c",

      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.reLaunch({
            url: '../../login/login',
          })
        }
      }
    })
  }
});