// 获取应用实例
import { Login } from 'login-model.js';
var login = new Login(); //实例化 登录 对象
Page({
  data: {
    opacity: 0.4,
    disabled: true,
    mobile: '',
    passwd: '',
    toastHidden: true,
    id_token: '',//方便存在本地的localStorage  
    response: '' //存取返回数据
  },

  // 获取输入框数据
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value,
    })
    this.changeColor();
  },
  passwdInput: function (e) {
    var val = e.detail.value;
    this.setData({
      passwd: val
    })
    this.changeColor();
  },

  //用户输完账号和密码的时候开启按钮，没有输入的时候禁用
  changeColor: function () {
  
    // console.log(isTel)
    if (this.data.mobile && this.data.passwd) {
      that.setData({
        disabled: false,
        opacity: 1
      })
    } else {
      that.setData({
        disabled: true,
        opacity: 0.4
      })
    }
  },

  // logIn: function () {
  //   var that = this,//不要漏了这句，很重要
  //     paramsData = {
  //       mobile: this.data.mobile,
  //       passwd: this.data.passwd
  //     };
  //   login.execLogin(paramsData, (res) => {
  //     if (res.error_code == 2001) {
  //       wx.redirectTo({
  //         url: '../index/index'
  //       })
  //     }
  //     if (res.error_code == 9999) {
  //       //登录失败弹框
  //       wx.showModal({
  //         title: '登录失败',
  //         content: '账号或密码错误，请重新输入',
  //         showCancel: false,
  //         success: function (res) {
  //           if (res.confirm) {
  //             console.log('用户点击确定')
  //           }
  //         }
  //       })
  //     }
  //   });
  // }

  logIn:function(){
    var that = this;
    wx.request({
      url:'https://test.api.jiayouzan.com/v3/merchant/login',
      data:{
        mobile:this.data.mobile,
        passwd:this.data.passwd
      },
      method:'POST',
      header:{
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success:function(res){
        that.setData({
          token:res.data.id_token,
          response:res
        })
      
        console.log(that.data.mobile)
        try {
          wx.setStorageSync('id_token', res.data.id_token)  
        } catch (e){
        }
        // if(res.error_code ==2001){
        wx.navigateTo({
          url:'../index/index?mobile=that.data.mobile'
        })
        // }
        if (res.error_code == 9999) {
          //登录失败弹框
          wx.showModal({
            title: '登录失败',
            content: '账号或密码错误，请重新输入',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      },
    })
  }
})  