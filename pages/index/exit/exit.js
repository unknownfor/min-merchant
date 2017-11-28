const app = getApp();

Page({
  onLoad: function () {
    wx.request({
      url:'https://test.api.jiayouzan.com/v3/merchant/auth/logout',
      method: 'PUT',
      success:function(res){
        console.log(res.data)
      },
      
    })
//要获取tartitle的标题

  },
  openConfirm: function () {
    wx.showModal({
      title: '确定退出登陆？',
      confirmText: "取消",
      cancelText: "确定",
      confirmColor:"#e6251c",
      // cancelColor: "#e6251c",
      
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击取消操作')
        } else {
          console.log('用户点击确定操作')
          //清空 localStorage
          
          // 确定退出跳转到登录页面 登录信息清除
          wx.reLaunch({
            url: '../../login/login',
          })
        }
      }
    })
  }
});