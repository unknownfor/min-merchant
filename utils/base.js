/**
 * Created by jimmy-jiang on 2016/11/21.
 */
import { Token } from 'token.js';
import { Config } from '../utils/config.js';
class Base {
    constructor() {
        "use strict";
        this.baseRestUrl = Config.restUrl;
        this.areaDataUrl=Config.areaDataUrl;
        this.onPay=Config.onPay;
        this.formatTime();
    }
    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params, noRefetch) {
        var that = this,
            url=this.baseRestUrl + params.url;
        if(!params.type){
            params.type='get';
        }
        /*不需要再次组装地址*/
        if(params.setUpUrl==false){
            url = params.url;
        }
        wx.request({
            url: url,
            data: params.data,
            method:params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: function (res) {

                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2') {
                    params.sCallback && params.sCallback(res.data);
                } else {
                    if (code == '401') {
                        if (!noRefetch) {
                            that._refetch(params);
                        }
                    }
                    that._processError(res);
                    params.eCallback && params.eCallback(res.data);
                }
            },
            fail: function (err) {
                wx.hideNavigationBarLoading();
                that._processError(err);
                // params.eCallback && params.eCallback(err);
            }
        });
    }

    _processError(err){
        // console.log(err);
    }

    _refetch(param) {
        var token = new Token();
        token.getTokenFromServer((token) => {
            this.request(param, true);
        });
    }

    //时间格式化
    formatTime(date) {
        // var year = date.getFullYear()
        // var month = date.getMonth() + 1
        // var day = date.getDate()

        // var hour = date.getHours()
        // var minute = date.getMinutes()
        // var second = date.getSeconds()


        // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
      
      Date.prototype.format = function (format) {
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
          format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
              ("00" + o[k]).substr(("" + o[k]).length));
        return format;
      };
    }

    

    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    /*获得元素上的绑定的值*/
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    };

    /*是否为手机号*/
    isMobile(val){
      return /^1(3|5|6|7|8|9)\d{9}$/.test(val);
    };

};

export {Base};
