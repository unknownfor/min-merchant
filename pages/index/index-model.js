
/**
 * Created by jimmy on 17/11/20.
 */
import { Base } from '../../utils/base.js';
class Index extends Base {
  constructor() {
    super();
  }
  /*首页信息*/
  getTotalInfo(paramsData, callback) {
    var that = this;
    var param = {
      url: 'v3/merchant/auth/home_page',
      type: 'GET',
      // data:paramsData,
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
export { Index };