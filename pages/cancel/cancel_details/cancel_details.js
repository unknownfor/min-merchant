const app = getApp();
// let _this = this
Page({

  data: {
    orderInfo: {}
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
        let bookInfo = res.data;
        console.log(bookInfo)
        let temp = {};
        temp.name = bookInfo.title;
        temp.price = parseInt(bookInfo.price);
        temp.number = bookInfo.isbn10;
        temp.page = bookInfo.pages;
        temp.time = bookInfo.pubdate;
        temp.get = temp.price * temp.page;
        // that.data.orderInfo = temp;
        that.setData({
          orderInfo: temp
        })
      },
      // 获取数据失败
      fail() {
        console.log("failed");
      }
    })
  }


})
