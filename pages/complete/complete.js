import { Complete } from 'complete-model.js';
var complete = new Complete();//实例化对象
const app = getApp();
Page({
  data: {
    merch_type:'1',
    order_status:'1',
    order_money_all:'',
    order_data:[]
  },
  onLoad: function (options) {
    var that = this,//不要漏了这句，很重要
    paramsData = {
      order_status: 1,
      date_type:1,
      date_start:'',
      date_end:'',
      page:3,
      pageSize:5
    };
    complete.getCompleteData(paramsData,(res)=>{
      // 获取数据成功
        console.log(paramsData);
        console.log(res);
        let temp = {};
        temp.id = res.id;
        temp.ordersn = res.ordersn;
        temp.price = res.price;
        temp.createtime = res.createtime;
        
        that.setData({
          merch_type: res.merch_type,
          order_status: res.order_status,
          order_money_all: res.order_money_all,
          order_data: this.data.order_data.push(temp)
        })
    //  获取数据失败
    })
  }
})
