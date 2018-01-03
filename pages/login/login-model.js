/**
 * Created by jimmy on 17/11/20.
 */

import { Base } from '../../utils/base.js';

class Login extends Base {
  constructor() {
    super();
  }

  execLogin(paramsData,callback) {
    var that = this;
    var param = {
      url: '/v3/merchant/login',
      data:paramsData,
      sCallback: function (res) {
        that.writeInfoToStorage({key:'userInfo',val:res});
        callback && callback(res);
      },
      eCallback: function (res) {
        callback && callback(res);
      }
    },
    options={
      type: 'post',
      needMerchType:false
    };
    this.request(param, options);
  }
};

export { Login };
