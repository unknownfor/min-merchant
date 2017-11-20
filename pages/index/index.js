
import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象

Page({
  data:{
    userName:12345678
  },
  onLoad:function(){
    index.getTotalInfo(null,(res)=>{

    });
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000)
  },
  Toinfo:function(){
    wx.navigateTo({
      url: 'exit/exit',
    })
  },
  //后台返回的的用户名作为bartitle
  // wx.setNavigationBarTitle({  title: '当前页面'})

  
  })
