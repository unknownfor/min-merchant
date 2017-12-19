
import { Appointment } from 'appointment-model.js';
var appointment = new Appointment(); //实例化 预约 对象
Page({
  data: {
    order_data: [],
    merch_type:'',
    order_status:'',
    loadingStatus: 0,
  },
  onLoad: function (options) {
    this._loadData();
  },

  /*加载数据*/
  _loadData: function (callback) {
    var date = new Date(),
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
    appointment.getAppointmentData(paramsData, (flag,res) => {
      console.log(res)
      if(flag){
        this.setData({
          loadingStatus: 1,
          merch_type: res.merch_type,
          order_status: res.order_status,
          order_data: res.order_data
        })
      }
      else{
        this._loadFail();
      }
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
