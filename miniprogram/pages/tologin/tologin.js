// miniprogram/pages/tologin/tologin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log('授权的到的用户信息',e.detail.userInfo)
    console.log('授权用户的openid',app.globalData.openid)
    //接下来写业务代码
    getApp().globalData.userInfo = e.detail.userInfo
    // let user = e.detail.userInfo 
    // that._saveUserInfo(user)

    wx.setStorageSync('userInfo', e.detail.userInfo)
    let userDB = wx.cloud.database().collection("Allusers");
    userDB.add({
      data: {
        _id: app.globalData.openid,
        zhuangtai: 1,
        user: app.globalData.userInfo
      },
      success(res) {
        console.log("上传用户信息成功", res)
      },
      error(){
        console.log('上传新用户失败',error)
      }
    })
    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})