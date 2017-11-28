const app = getApp();
Page({
  data: {
    orderDet: {}
  },
  onLoad: function () {
    // let bookId = 'auth/home_page'
    // let baseUrl = `${app.globalData.g_restUrl}/v3/merchant/${bookId}`;
    // console.log(baseUrl)
    // v2 / book /:id
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://test.api.jiayouzan.com/merchant/auth/orders',
      method: 'GET',
      header: {
        // 填写appalication/json会报错，为空或为其它的不报错，豆瓣API的问题
        'content-type': 'appalication/json'
      },
     
      // 获取数据成功
      success(res) {
        console.log(res)
        let orderDet = res.data;
        console.log(orderDet)
        let temp = {};
        temp.name = orderDet.title;
        temp.price = parseInt(orderDet.price);
        temp.number = orderDet.isbn10;
        temp.time = orderDet.pubdate;
        temp.page = orderDet.pages;
        temp.get = temp.price * temp.page;
        that.setData({
          orderDet: temp
        })
      },
      // 获取数据失败
      fail() {
        console.log("failed");
      }
    })
  }

})