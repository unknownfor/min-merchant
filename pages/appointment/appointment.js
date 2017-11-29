
import { Appointment } from 'appointment-model.js';
var appointment = new Appointment(); //实例化 预约 对象
Page({
  data: {
    order_data: [],
    merch_type:'',
    order_status:'',
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    appointment.getAppointmentData((res) => {
      console.log(res)
      // let order_data = res.data;
      console.log(order_data)
      let temp = {};
      temp.id = res.id;
      temp.ordersn = res.ordersn;
      temp.appointment_time = res.appointment_time;
      temp.goods_name = res.goods_name;

      that.setData({
        merch_type: res.merch_type,
        order_status: res.order_status,
        order_data: this.data.order_data.push(temp)
      })
    });
  },
  //触底上拉加载新内容
  onReachBottom: function () {
  }

})
