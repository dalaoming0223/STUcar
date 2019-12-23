// miniprogram/pages/verify/verify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击发布按钮
  publish: function () {
    const that = this;
    console.log('司机认证表单所要提交的信息：',that.data.formData);
    let formData = that.data.formData;
    db.collection('Alldrivers').add({
      data: formData,
      success: function (res) {
        console.log(res);
        //发布成功
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: console.error
    });
  },
  // 表单输入通用处理
  formInput: function (e) {
    const that = this;
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    that.data.formData[key] = value;
    that.setData({
      formData: that.data.formData
    });
  },
  // 图片上传通用处理
  chooseImage: function (e) {
    const that = this;
    const key = e.currentTarget.dataset.key;
    wx.chooseImage({
      count: 1,
      success: function (resp) {
        const tempImgPath = resp.tempFilePaths[0];
        console.log(tempImgPath);
        wx.uploadFile({
          url: app.globalData.apiPath + '/api/file/upload',
          filePath: tempImgPath,
          name: 'file',
          success: function (resp) {
            console.log(resp);
          }
        })
      }
    });
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