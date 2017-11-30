import { Complete } from 'complete-model.js';
var complete = new Complete();//实例化对象
const app = getApp();
Page({
  data: {
    merch_type:'',
    order_status:'',
    order_money_all:'',
    order_data:[]
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
      order_status: 1,
      date_type:1,
      date_start:startDate,
      date_end: endDate,
      page:3,
      pageSize:5
    };
    // console.log(startDate)
    complete.getCompleteData(paramsData,(res)=>{
      // 获取数据成功
      console.log(res)
      if(res.merch_type == 1){
        that.setData({
          merch_type: res.merch_type,
          order_status: res.order_status,
          order_money_all: res.order_money_all,
          order_data: res.order_data
        })
    //  获取数据失败
      }else{
        that.setData({
          merch_type: res.merch_type,
          order_status: res.order_status,
          order_data: res.order_data
        })
      }
    })
  }
  
})
