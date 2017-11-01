const app = getApp();

Page({
  data:{
    userName:12345678

  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000)
  },
  Toinfo:function(){
    wx.navigateTo({
      url: 'exit/exit',
    })
  }
  // onLoad: function () {
  //   var that = this//不要漏了这句，很重要
  //   wx.request({
  //     url: 'http://news-at.zhihu.com/api/4/news/latest',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       //将获取到的json数据，存在名字叫zhihu的这个数组中
  //       that.setData({
  //         zhihu: res.data.stories
  //         //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
  //       })

  //     }

  //   })
  // }
  })
