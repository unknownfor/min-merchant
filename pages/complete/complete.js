import { Complete } from 'complete-model.js';

var complete = new Complete();//实例化对象
const app = getApp();
Page({
  data: {
    merch_type:0,
    order_status:'',
    order_money_all:0,
    order_data:[],
    loadingStatus: 0,
  },
  
  onLoad: function (options) {
    this._loadData();
  },

  _loadData:function(callback){
    var that = this,
      date = new Date(),
      endDate = date.format('yyyy-MM-dd'),
      startDate = '2017-01-01',
      paramsData = {
        order_status: 1,
        date_type: 1,
        date_start: startDate,
        date_end: endDate,
        page: 1,
        pageSize: 150
      };
    complete.getCompleteData(paramsData, (flag, res) => {
      // 获取数据成功
      if (flag) {
        var orderData = this.setTimeFormat(res.order_data)
        if (res.merch_type == 1) {
          that.setData({
            loadingStatus: 1,
            merch_type: res.merch_type,
            order_status: res.order_status,
            order_money_all: res.order_money_all,
            order_data: orderData
          })
          //  获取数据失败
        } else {
          that.setData({
            loadingStatus: 1,
            merch_type: res.merch_type,
            order_status: res.order_status,
            order_data: orderData
          })
        }
      } 
      else {
        this._loadFail();
      }
      callback && callback();
    })
  },

  //把订单记录按时间分组
  setTimeFormat:function(data){
    var len=data.length;
    for(var i=0;i<len;i++){
      data[i].createtime = complete.getTimeFromTimestamp(data[i].createtime,'yyyy-MM-dd hh:mm:ss');
    }
    return data;
  },

  /*请求失败*/
  _loadFail: function () {
    this.setData({
      loadingStatus: 2
    });
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
  
})
