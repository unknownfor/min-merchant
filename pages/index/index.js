import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象
Page({
  data: {
    mobile: ""
  },
  onLoad: function (option) {
    this.setData({
      mobile: option.mobile
    });
   
    index.getTotalInfo(null, (res) => {
      console.log(res)
    })
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000)
  },
  Toinfo: function () {
    wx.navigateTo({
      url: 'exit/exit',
    })
  },
  //后台返回的的用户名作为bartitle 
  // wx.setNavigationBarTitle({  title: '当前页面'})
})