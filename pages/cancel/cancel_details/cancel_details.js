import { Cancel_details } from 'cancel_details-model.js';
var cancel_details = new Cancel_details();//实例化对象
const app = getApp();
Page({
  data: {
    id: '',
    ordersn: '',
    paytype: '',
    status: '',
    total_price: '',
    createtime: '',
    appointment_time: '',
    carrier_realname: '',
    carrier_mobile: '',
    goods_detail: []
  },
  onLoad: function () {
    var that = this,//不要漏了这句，很重要
    paramsData = {
      order_status: 3,
      merch_type: 1
    }
    cancel_details.getCancel_detailsData(paramsData,(res) => {
      console.log(res)
      that.setData({
        id: res.id,
        ordersn: res.ordersn,
        paytype: res.paytype,
        status: res.status,
        total_price: res.total_price,
        createtime: res.createtime,
        appointment_time: res.appointment_time,
        carrier_realname: res.carrier_realname,
        carrier_mobile: res.carrier_mobile,
        order_data: res.order_data
      })
    });
  },
  //触底上拉加载新内容
  onReachBottom: function () {
  }

})