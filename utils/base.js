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
        this.defaultOptions={
          needMerchType:true,
          setUpUrl:true,
          type:'get'
        };
    }

    extentConfig(config, myConfig) {
      //浅copy
      var newobj = config.constructor === Array ? [] : {};
      for (var i in config) {
        newobj[i] = config[i];
      }

      var val;
      for (var key in myConfig) {
        val = myConfig[key];
        if (val != null) {
          newobj[key] = val;
        }
      }
      return newobj;
    }

    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params,options) {
        options = this.extentConfig(this.defaultOptions,options);

        var that = this,
            url=this.baseRestUrl + params.url;
        /*不需要再次组装地址*/
        if (options.setUpUrl==false){
            url = params.url;
        }
       
        if (!params.data){
            params.data={};
        }
        if (options.needMerchType){
            params.data.merch_type = this.getInfoFromStorage('userInfo').merch_type;
        }
        wx.request({
            url: url,
            data: params.data,
            method: options.type,
            header: {
                'content-type': 'application/json',
                'token': this.getInfoFromStorage('userInfo').token
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

    /*
       *从时间戳 得到 时间
       * para
       * dateInfo - {num} 时间戳
       * dateFormat - {string} 时间格式 默认为'yyyy.MM.dd'
       */
    getTimeFromTimestamp(timestamp, dateFormat) {
      if (!dateFormat) {
        dateFormat = 'yyyy.MM.dd';
      }
      return new Date(timestamp * 1000).format(dateFormat);
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

    /*
    * 向本地localStorage中写入信息
    * para:
    * dictionary - {object} 键值对信息 {key：'userInfo',val:'123132'}
    * expireDiff - {int} 过期时间 数值，精确到 秒，默认是一个 4 天
    *
    * */
    writeInfoToStorage(dictionary, expireDiff) {
      wx.removeStorageSync(dictionary.key);
      if (typeof dictionary.val != 'object' && typeof dictionary.val != 'string') {
        return;
      }

      if (typeof dictionary.val != 'object') {
        var newObj = {
          val: dictionary.val
        };
        dictionary.val = newObj;
      }

      var reg = /^[0-9]$/;
      if (!reg.test(expireDiff)) {
        expireDiff = 4;
      }
      var expireTime = Date.parse(new Date()) / 1000 + (expireDiff * 24 * 60 * 60);
      dictionary.val.expireTime = expireTime;
      wx.setStorageSync(dictionary.key, dictionary.val);
    }

    /*
    * 读取本地localStorage中的信息,
    * 如果过期，则需要重新获取
    * para:
    * keyName - {string} 键值 名称
    *
    * */
    getInfoFromStorage(key) {
      var info = wx.getStorageSync(key); //myToken
      var nowTime = Date.parse(new Date()) / 1000;
      if (info) {
        var expireTime = info.expireTime;
        if (!expireTime || nowTime >= expireTime) {
          wx.removeStorageSync(key);
          return false;
        }
        return info;
      } else {
        return false;
      }
    }
};

export {Base};
