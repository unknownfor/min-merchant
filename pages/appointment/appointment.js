
import { Appointment } from 'appointment-model.js';
var appointment = new Appointment(); //实例化 预约 对象
Page({
  data: {
    orderDet: {},
    loading: false,
    id: 1
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    appointment.getAppointmentData((res) => {
      console.log(res)
      let orderDet = res.data;
      console.log(orderDet)
      let temp = {};
      temp.name = orderDet.title;
      temp.price = parseInt(orderDet.price);
      temp.number = orderDet.isbn10;
      temp.time = orderDet.pubdate;
      temp.page = orderDet.pages;
      temp.get = temp.price * temp.page;
      that.setData({
        orderDet: temp
      })
    });
  },
  //触底上拉加载新内容
  onReachBottom: function () {

  }

})
