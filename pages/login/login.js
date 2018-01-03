import { Login } from 'login-model.js';
var login = new Login(); //实例化 登录 对象
Page({
  data: {
    btnClass: 'disabled',
    mobile: '',
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
      passwdFlag = this.data.passwd.length==6,
      btnClass='disabled';
    if (mobileFlag && passwdFlag) {
      btnClass='';
    };
    that.setData({
      btnClass: btnClass
    });
  },

  /*按钮点击登录*/
  loginFromBtn:function(e){
    var formData = e.detail.value;
    this._execLogin(formData);
  },

  /*键盘点击登录*/
  loginFromKeyboard: function (e) {
    var formData ={
      mobile:this.data.mobile,
      passwd: e.detail.value
    };
    this._execLogin(formData);
  },



  _execLogin: function (formData) {
    
    if(!this._validate(formData)){
      return;
    }
    wx.showLoading({
      title:'登录中……',
      mask:true
    });
   
    login.execLogin(formData,(res) => {
      wx.hideLoading();
      if (res.error_code) {  //登录失败弹框
        this._showModal(res.msg);
      }
      else{
        if (res.merch_type == 1){
          wx.redirectTo({
            url: '../index/index?mobile='+res.mobile
          });
        }else{
          wx.redirectTo({
            url: '../index/different/different?mobile=' + res.mobile
          });
        }
      }
    });
  },

   /*验证信息*/
  _validate: function (formData){
    for (var key in formData) {
      if (!formData[key]) {
        that._showModal('信息填写不完整！');
        return false;
      }
      if (key == 'mobile') {
        var reg = /^1(3|4|5|7|8)\d{9}$/;
        if (!reg.test(formData[key])) {
          this._showModal('手机号码格式错误！');
          return false;
        }
      }
    }
    return true;
  },
  
  _showModal: function (msg,callback) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success: function (res) {
        callback && callback();
      }
    });
  }
})  