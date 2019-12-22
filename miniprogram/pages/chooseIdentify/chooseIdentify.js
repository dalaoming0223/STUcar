// miniprogram/pages/chooseIdentify/chooseIdentify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.openid
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 学生点击事件
   */
  studentBind:function () {
    //console.log(app.identify)
    app.identify = 1;
    //console.log(app.identify)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 司机点击事件
   */
  driverBind: function () {
    app.identify = 0;
    wx.redirectTo({
      url: "/pages/index/index",
    })
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
})