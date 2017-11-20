// 获取应用实例
import { Login } from 'login-model.js';
var login = new Login(); //实例化 登录 对象
Page({
  data: {
    opacity: 0.4,
    disabled: true,
    userName: '',
    userPassword: '',
    toastHidden: true,
    id_token: '',//方便存在本地的locakStorage  
    response: '' //存取返回数据  
  },
  //获取表单数据
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    // console.log(this.data.userName)
  },
  userPasswordInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  //用户输完账号和密码是时候开启按钮，没有输入的时候禁用
  changeColor: function (e) {
    var that = this 
    var isTel = e.detail.value
    console.log(isTel)  
    if (isTel) {
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
  logIn: function () {
    var that = this,//不要漏了这句，很重要
      paramsData = {
        username: this.data.userName,
        password: this.data.userPassword,
      };
    login.execLogin(paramsData,(res) => {
      if (res.error_code == 2001){
        wx.redirectTo({
          url: '../index/index'
        })
      }
      if (res.error_code==9999){
         //登录失败弹框
          wx.showModal({
            title: '登录失败',
            content: '账号或密码错误，请重新输入',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
      }
    });
  }
})  