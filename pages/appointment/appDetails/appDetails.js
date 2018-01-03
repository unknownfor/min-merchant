import { AppDetails } from 'appDetails-model.js';
var appDetails = new AppDetails();//实例化对象
const app = getApp();
Page({
  data: {
    id: '',
    ordersn: '',
    paytype: '',
    status: '',
    total_price: '',
    createtime: '',
    appointment_time:'',
    carrier_realname:'',
    carrier_mobile:'',
    goods_detail: []
  },
  onLoad: function (options) {
    var that = this,//不要漏了这句，很重要
    paramsData = {
      order_status:2
    };
    appDetails.getAppDetailsData(paramsData,(res) => {
      console.log(res)
      // let order_data = res.data;
      console.log(order_data)
     
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
        goods_detail: res.goods_detail
      })
    });
  },
  //触底上拉加载新内容
  onReachBottom: function () {
  }

})