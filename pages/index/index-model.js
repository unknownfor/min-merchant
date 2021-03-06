
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
      sCallback: function (data) {
        callback && callback(true,data);

      },
      eCallback: function (data) {
        callback && callback(false,data);
      }
    },
    options={
      needMerchType:false
    };
    this.request(param);
  }
};
export { Index };