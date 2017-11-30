
import { Appointment } from 'appointment-model.js';
var appointment = new Appointment(); //实例化 预约 对象
Page({
  data: {
    order_data: [],
    merch_type:'',
    order_status:'',
  },
  onLoad: function (options) {
    var that = this,//不要漏了这句，很重要
      date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      startDate = [year, month, day].join('-'),
      endDate = [year, month, day].join('-'),
      paramsData = {
        order_status: 2,
        date_type: 1,
        date_start: startDate,
        date_end: endDate,
        page: 5,
        pageSize: 5
      };
    console.log(startDate)
    appointment.getAppointmentData(paramsData, (res) => {
      console.log(res)

      that.setData({
        merch_type: res.merch_type,
        order_status: res.order_status,
        order_data: res.order_data
      })
    });
  },
  //触底上拉加载新内容
  onReachBottom: function () {
  }

})
