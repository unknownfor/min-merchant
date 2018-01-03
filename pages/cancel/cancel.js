import { Cancel } from 'cancel-model.js';
var cancel = new Cancel(); //实例化 预约 对象

const app = getApp();
Page({
  data: {
    order_data: [],
    merch_type: '',
    order_status: '',
    loadingStatus: 0,
  },
  onLoad: function () {
    this._loadData();
  },

  /*加载数据*/
  _loadData: function (callback) {
    var that = this,
      date = new Date(),
      endDate = date.format('yyyy-MM-dd'),
      startDate = '2017-01-01',
      paramsData = {
        order_status: 3,
        date_type: 1,
        date_start: startDate,
        date_end: endDate,
        page: 1,
        pageSize: 150
      };
    cancel.getCancelData(paramsData, (flag,res) => {
      if(flag){
        this.setData({
          loadingStatus: 1,
          merch_type: res.merch_type,
          order_status: res.order_status,
          order_data: res.order_data
        })
      }else{
        this._loadFail();
      }
      callback && callback();
    });
  },

  //触底上拉加载新内容
  onReachBottom: function () {
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

})