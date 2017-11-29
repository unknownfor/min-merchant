const app = getApp();
Page({
  onLoad: function (options) {
    this.setData({
      mobile: options.mobile
    });
    wx.setNavigationBarTitle({
      title: this.data.mobile//页面标题为路由参数
    });
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
      confirmText: "取消",
      cancelText: "确定",
      confirmColor: "#e6251c",
      // cancelColor: "#e6251c",

      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击取消操作')
        } else {
          console.log('用户点击确定操作')
          //清空 localStorage
          // 退出登录时清楚token
          wx.removeStorageSync('token')
          // 确定退出跳转到登录页面 登录信息清除
          wx.reLaunch({
            url: '../../login/login',
          })
        }
      }
    })
  }
});