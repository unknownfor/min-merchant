const app = getApp();

Page({

  openConfirm: function () {
    wx.showModal({
      title: '确定退出登陆？',
      confirmText: "取消",
      cancelText: "确定",
      confirmColor:"#e6251c",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    })
  }
});