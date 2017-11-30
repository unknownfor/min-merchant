import { Different } from 'different-model.js';
var different = new Different(); //实例化 首页 对象
Page({
  data: {
    mobile: "",
    orderNum: '',
    orderMoney: '',
    newFinishOrderNum: ''

  },
  onLoad: function (options) {
    this.setData({
      mobile: options.mobile
    });

    different.getTotalInfo(null, (res) => {
      // console.log(res)
      this.setData({
        orderNum: res.order_num,
        orderMoney: res.order_money,
        newFinishOrderNum: res.new_finish_order_num
      })
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
      url: 'exit/exit?mobile=' + this.data.mobile,
    })
  },
  scan: function () {
    wx.scanCode({ // 调用扫码
      success: function (res) { // 扫描成功后
        console.log(res);

        const path = res.result;
        console.log(path);

        // 页面跳转到二维码指定页面，需要 path 为正确的 
        // res.path && wx.navigateTo({
        //   url: path
        // })
        wx.showModal({
          title: '提示',
          content: '点击确定进行兑换',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {

            }
          }
        });
      }
    })
  }


  //后台返回的的用户名作为bartitle 
  // wx.setNavigationBarTitle({  title: '当前页面'})
})