/**
 * Created by jimmy on 17/11/20.
 */

import { Base } from '../../utils/base.js';

class Cancel extends Base {
  constructor() {
    super();
  }

  /*banner图片信息*/
  getCanceltData(callback) {
    var that = this;
    var param = {
      url: 'v3/merchant/auth/orders',
      type: 'GET',
      sCallback: function (data) {
        if (typeof data == 'string') {
          console.log('1---' + data.charCodeAt(0));
          console.log('2---' + data.items.charCodeAt(0));
        }
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

export { Cancel };