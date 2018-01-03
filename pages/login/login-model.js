/**
 * Created by jimmy on 17/11/20.
 */

import { Base } from '../../utils/base.js';

class Login extends Base {
  constructor() {
    super();
  }

  /*banner图片信息*/
  execLogin(paramsData,callback) {
    var that = this;
    var param = {
      url: '/v3/merchant/login',
      data:paramsData,
      type:'post',
      sCallback: function (res) {
        wx.setStorageSync('token', res.token);
        callback && callback(res);
      },
      eCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
};

export { Login };
