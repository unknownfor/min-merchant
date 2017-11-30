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
    goods_detail:''
  },
  
  onLoad: function () {
    var that = this,//不要漏了这句，很重要
      paramsData = {
        order_status: 1,
        merch_type: 1
      };
    details.getDetailsData(paramsData, (res) => {
      // 获取数据成功
      console.log(res);
      // let det = {};
      // det.id = res.id;
      // det.goods_name = res.goods_name;
      // det.total = res.total;
      // det.total_price = res.total_price;
      // det.one_price = res.one_price;
      // console.log(res.paytype)

      that.setData({
        id: res.id,
        ordersn: res.ordersn,
        paytype: res.paytype,
        status: res.status,
        total_price: res.total_price,
        createtime: res.createtime,
        goods_detail: res.goods_detail //this.data.goods_detail.push(det)
      })
      
    })
    console.log(this.data.goods_detail)
  }
})
