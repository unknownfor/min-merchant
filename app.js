
//app.js
import { Token } from 'utils/token.js';

App({
  //保存全局数据
  globalData: {
    // 设置豆瓣API前缀
    doubanAPI: "https://api.douban.com",
    g_restUrl: "http://118.190.98.130/public/index.php/api/v1/",
  },
  onLaunch: function () {
    var token = new Token();
    token.verify();
  }
})
