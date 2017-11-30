import { Base } from '../../utils/base.js';

class Complete extends Base {
  constructor() {
    super();
  }

  /*banner图片信息*/
  getCompleteData(paramsData,callback) {
    var that = this;
    var param = {
      url: 'v3/merchant/auth/orders',
      type:'GET',
      data:paramsData,
     
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export { Complete };

