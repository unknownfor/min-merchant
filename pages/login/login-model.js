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
      url: 'v1/login/1',
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

export { Login };