import { App_details } from 'app_details-model.js';
var app_details = new App_details();//实例化对象

const app = getApp();
// let _this = this
Page({
  data: {
    order_data: [],
    id:'',
    ordersn:'',
    paytype:'',
    status:'',
    total_price:'',
    createtime:'',
    appointment_time:'',
    carrier_realname:'',
    carrier_mobile:'',
    goods_detail:[]
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    app_details.getApp_detailsData((res) => {
      console.log(res)
      // let order_data = res.data;
      console.log(order_data)
      let temp = {};
      temp.id = res.id;
      temp.goods_name = res.goods_name;
      temp.total = res.total;
      temp.price = res.price;
      temp.one_price = res.one_price

      that.setData({
        id :res.id,
        ordersn: res.ordersn,
        paytype: res.paytype,
        status: res.status,
        total_price: res.total_price,
        createtime: res.createtime,
        appointment_time: res.appointment_time,
        carrier_realname: res.carrier_realname,
        carrier_mobile: res.carrier_mobile,
        order_data: this.data.order_data.push(temp)
      })
    });
  },
  //触底上拉加载新内容
  onReachBottom: function () {
  }

})