import { Base } from '../../../utils/base.js';

class AppDetails extends Base {
  constructor() {
    super();
  }

  /*banner图片信息*/
  getAppDetailsData(paramsData, callback) {
    var that = this;
    var param = {
      url: 'v3/merchant/auth/orders' + options.id,
      type: 'GET',
      data: paramsData,
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

export { AppDetails };

