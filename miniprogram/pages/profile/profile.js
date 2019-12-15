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
    forksCount: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 加载用户信息
    wx.getUserInfo({
      withCredentials: false,
      lang: 'zh_CN',
      success: function (resp) {
        that.setData({
          userInfo: resp.userInfo
        });
      }
    })
    console.log('====')
    console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData)
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