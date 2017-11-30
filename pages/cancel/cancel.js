import { Cancel } from 'cancel-model.js';
var cancel = new Cancel(); //实例化 预约 对象

const app = getApp();
Page({
  data: {
    order_data: [],
    merch_type: '',
    order_status: '',
  },
  onLoad: function () {
    var that = this,//不要漏了这句，很重要
      date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      startDate = [year, month, day].join('-'),
      endDate = [year, month, day].join('-'),
      paramsData = {
        order_status: 3,
        date_type: 1,
        date_start: startDate,
        date_end: endDate,
        page: 3,
        pageSize: 5
      };
    cancel.getCancelData(paramsData,(res) => {
      console.log(res)
     
      this.setData({
        merch_type: res.merch_type,
        order_status: res.order_status,
        order_data: res.order_data
      })
      console.log(res.merch_type)
    });
  
  },
  //触底上拉加载新内容
  onReachBottom: function () {
  }

})