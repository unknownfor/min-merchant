import { Base } from '../../utils/base.js';

class Complete extends Base {
  constructor() {
    super();
  }

  /*banner图片信息*/
  getCompleteData(callback) {
    var that = this;
    var param = {
      url: 'merchant/auth/orders',
      type:'GET',

      sCallback: function (data) {
        data = data.items;
        callback && callback(data);
      },
      eCallback: function () {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export { Complete };

