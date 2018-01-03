import { Index } from '../index-model.js';
var index = new Index(); //实例化 首页 对象
Page({
  data: {
    showStatus: true,
    mobile: '',
    orderNum: '',
    orderMoney: '',
    newFinishOrderNum: '',
    loadingStatus: 0,
  },
  onLoad: function (options) {
    this.setData({
      mobile: options.mobile
    });
    this._loadData();
  },


  /*加载数据*/
  _loadData: function (callback) {
    index.getTotalInfo(null, (flag, res) => {
      if (flag) {
        this.setData({
          loadingStatus: 1,
          orderNum: res.order_num,
          orderMoney: res.order_money,
          newFinishOrderNum: res.new_finish_order_num
        });
      } else {
        this._loadFail();
      }
      callback && callback();
    });
  },

  changeShowStatus: function () {
    this.setData({
      showStatus: false
    });
  },

  toInfo: function () {
    wx.navigateTo({
      url: 'exit/exit?mobile=' + this.data.mobile
    })
  },



  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this.setData({
      loadingStatus: 0
    });
    this._loadData(() => {
      wx.stopPullDownRefresh();
    });
  },

  /*请求失败*/
  _loadFail: function () {
    this.setData({
      loadingStatus: 2
    });
  },

});