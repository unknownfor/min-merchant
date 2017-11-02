// 获取应用实例
var app = getApp()
Page({
  data: {
    opacity:0.4,
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
    console.log(this.data.userName)
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  //用户输入时候开启按钮，没有输入的时候禁用
  changeColor:function(e){
    var that = this
    //console.log(e.detail.value)  
    var isTel =e.detail.value
    //console.log(isTel)  
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
     wx.navigateTo({
          url: '../index/index'
        })
    var that = this

    wx.request({
      url: '',
      data: {
        username: this.data.userName,
        password: this.data.userPassword,
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          id_token: res.data.id_token,
          response: res
        })
        
        try {
          wx.setStorageSync('id_token', res.data.id_token)
        } catch (e) {
        } 
        //  wx.navigateTo({
    //       url: '../index/index'
    //     })
        console.log(res.data);
      },

      fail: function (res) {
        console.log(res.data);
        console.log('is failed');
        //登录失败弹框
        // wx.showModal({
        //   title: '登录失败',
        //   content: '账号或密码错误，请重新输入',
        //   showCancel:false,
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //       //返回到登录页面
        //     }
        //   }
        // })
        
      }
    })
  }
})  