// miniprogram/pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    visitTotal: 20,
    starCount: 20,
    forksCount: 20,
    
    loginStatus: 0, //登陆状态，0为未登录，1为已登陆
    username: "",
    identify: 1, //身份 1为学生，0为司机,
    //竖向工具栏跳转地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      identify: app.globalData.identify
    })
    if (app.globalData.userInfo != null) {
      console.log('获取到用户信息', app.globalData.userInfo)
       that.setData({
         userInfo: app.globalData.userInfo,
         loginStatus: 1
       })
    }else{
      console.log('获取不到信息')
      that.setData({
        loginStatus: 0
      })
    }
    // console.log('我的打印全局变量',app.globalData)
  },
  login: function () {
    let that = this;
    wx.getUserInfo({
      withCredentials: false,
      lang: 'zh_CN',
      success: function (resp) {
        that.setData({
          userInfo: resp.userInfo
        });
        app.globalData.userInfo = resp.userInfo
      }
    })
    that.setData({
      loginStatus: 1
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})