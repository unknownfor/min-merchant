import { Details } from 'details-others-model.js';
var details = new Details();
Page({
  data: {
    id: '',
    ordersn: '',
    paytype: '',
    status: '',
    merchType: 0
  },

  onLoad: function (options) {
    var that = this,//不要漏了这句，很重要
      paramsData = {
        order_status: 1,
        id: options.id
      };
    details.getDetailsData(paramsData, (res) => {
      if(res){
        res.createtime = details.getTimeFromTimestamp(res.createtime, 'yyyy-MM-dd hh:mm:ss')
        that.setData({  
          data: res,
        })
      }

    })
  }

})
