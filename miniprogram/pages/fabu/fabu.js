// pages/fabu/fabu.js
var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // PageCur: 'fabu'
    index: null,
    picker: ['stu——>机场', 'stu——>高铁站', '高铁站——>stu', '机场——>stu'],
    time: '时间信息',
    date: '日期信息',
    region: null,
    picker2: ['志城', '东门', '思源', '弘毅'],
    dizhi: null
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
  tijiaoxinxi: function (e) {
    var linshidizhi =null;
    var linshiluxian = null;
    var linshisex = null;
    console.log(e);
    console.log(e.detail.value.location);
    switch (e.detail.value.location) {
      case "0":
        linshidizhi = "志城";
        break;
      case "1":
        linshidizhi = "东门";
        break;
      case "2":
        linshidizhi = "思源";
        break;
      case "3":
        linshidizhi = "弘毅";
        break;
      case "4":
        linshidizhi = "星期四";
        break;
      case "5":
        linshidizhi = "星期五";
        break;
      case "6":
        linshidizhi = "星期六";
      default:
        linshidizhi = "无地址"
    };
      console.log("上车地址：" + linshidizhi);
      switch (e.detail.value.luxian) {
        case "0":
          linshiluxian = "stu——>机场";
          break;
        case "1":
          linshiluxian = "stu——>高铁站";
          break;
        case "2":
          linshiluxian = "高铁站——>stu";
          break;
        case "3":
          linshiluxian = "机场-->高铁站";
          break;
        case "4":
          linshiluxian = "星期四";
          break;
        case "5":
          linshiluxian = "星期五";
          break;
        case "6":
          linshiluxian = "星期六";
        default:
          linshiluxian = "无路线"
      };
      console.log("选择路线:" + linshiluxian);
      switch (e.detail.value.sex) {
        case true:
          linshisex = "男";
          break;
        case false:
          linshisex = "女";
          break;
        default:
          linshisex = "无性别"
      };
      console.log("性别：" + linshisex);
      // console.log(userInfo)
      // db.collection("fabuxinxi").add({
      //   data:{
      //     username: 
      //   }
      // })
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
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange(e) {
    console.log(e);
    this.setData({
      region: e.detail.value
    })
  },
  test(e) {
    console.log(e.detail.xian);

  }

})