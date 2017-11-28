const app = getApp();
Page({
  data: {
    orderDet: {}
  },
  onLoad: function () {
    let bookId = '3884108'
    let baseUrl = `${app.globalData.doubanAPI}/v2/book/${bookId}`;
    console.log(baseUrl)
    // v2 / book /:id
    var that = this//不要漏了这句，很重要
    wx.request({
      url: baseUrl,
      method: 'GET',
      header: {
        // 填写appalication/json会报错，为空或为其它的不报错，豆瓣API的问题
        'Content-Type': 'appalication/json'
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
