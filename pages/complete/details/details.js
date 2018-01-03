import { Details } from 'details-model.js';
var details = new Details();
const app = getApp();
Page({
  data: {
    id:'',
    ordersn:'',
    paytype:'',
    status:'',
    total_price:'',
    createtime:'',
    goods_detail:'',
    merchType:0
  },
  
  onLoad: function (options) {
    var that = this,//不要漏了这句，很重要
      paramsData = {
        order_status: 1,
        id:options.id
      };
    details.getDetailsData(paramsData, (res) => {
      that.setData({
        id: res.id,
        ordersn: res.ordersn,
        paytype: res.paytype,
        status: res.status,
        total_price: res.total_price,
        createtime: details.getTimeFromTimestamp(res.createtime, 'yyyy-MM-dd hh:mm:ss'),
        goods_detail: res.goods_detail, //this.data.goods_detail.push(det),
        merchType: details.getInfoFromStorage('userInfo').merch_type
      })
      
    })
    console.log(this.data.goods_detail)
  }
})
