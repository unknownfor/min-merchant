import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象
Page({
  data: {
    showStatus:true,
    mobile: '', 
    orderNum:'',
    orderMoney:'',
    newFinishOrderNum:'',
    loadingStatus:0,
  },
  onLoad: function (options) {
    this.setData({
      mobile: options.mobile
    });
    this._loadData();
  },


  /*加载数据*/
  _loadData:function(callback){
    index.getTotalInfo(null, (flag,res) => {
      if(flag){
        this.setData({
          loadingStatus: 1,
          orderNum: res.order_num,
          orderMoney: res.order_money,
          newFinishOrderNum: res.new_finish_order_num
        });
      }else{
        this._loadFail();
      }
      callback && callback();
    });
  },

  changeShowStatus:function(){
      this.setData({
        showStatus:false
      });
  },
  
  toInfo: function () {
    wx.navigateTo({
      url: 'exit/exit?mobile='+this.data.mobile
    })
  },

  scan: function () {

    wx.showModal({
      title: '提示',
      content: '请确定该券为自己的商户券',
      showCancel: true,
      // confirmText: "确定",
      // cancelText: "取消",
      confirmColor: '#e6251c',
      success: function (res) {
        if (res.confirm) {
          wx.scanCode({ // 调用扫码
            success: function (res) { // 扫描成功后
              const path = res.result;
              console.log(path);

              wx.showModal({
                title: '提示',
                content: '扫码成功，下拉刷新查看核销结果',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {

                  }
                }
              });
            }
          })
        }
      }
    });
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function(){
    this.setData({
      loadingStatus:0
    });
    this._loadData(()=>{
      wx.stopPullDownRefresh();
    });
  },

  /*请求失败*/
  _loadFail:function(){
    this.setData({
      loadingStatus:2
    });
  },

});