import { Login } from 'login-model.js';
var login = new Login(); //实例化 登录 对象
Page({
  data: {
    btnClass: 'disabled',
    mobile: '18627039537',
    passwd: '',
    toastHidden: true,
    id_token: '',//方便存在本地的locakStorage  
    response: '' //存取返回数据  
  },
  //获取表单数据
  userNameInput: function (e) {
    this.setData({
      mobile: e.detail.value
    });
    this.changeColor();
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
    this.changeColor();
  },
  //用户输完账号和密码是时候开启按钮，没有输入的时候禁用
  changeColor: function () {
    var that = this,
      mobileFlag = login.isMobile(this.data.mobile),
      passwdFlag = this.data.passwd.length == 6,
      btnClass = 'disabled';
    if (mobileFlag && passwdFlag) {
      btnClass = '';
    };
    that.setData({
      btnClass: btnClass
    });
  },
  logIn: function () {
    var that = this,
      paramsData = {
        mobile: this.data.mobile,
        passwd: this.data.passwd,
      };
    login.execLogin(paramsData, (res) => {
      if (res.error_code) {
        //登录失败弹框
        wx.showModal({
          title: '登录失败',
          content: res.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {

            }
          }
        });
      } else {
        wx.redirectTo({
          url: '../index/index'
        });
      }
    });
  }
})  