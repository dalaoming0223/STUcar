// miniprogram/pages/NewCarSearch/NewCarSearch.js
const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startPlace: 0,
    endPlace: 0,
    showIcon: true,
    startRegion: ['stu', '高铁站', '机场'],
    endRegion: ['stu', '高铁站', '机场'],
    //上车地点***
    startLocation: {
      name: "",
      address: '',
      latitude: "",
      longitude: "",
    },
    //下车地点***
    endLocation: {
      name: "",
      address: '',
      latitude: "",
      longitude: "",
    },
    //具体日期
    dateArray: ['今天', '明天'],
    objectDateArray: [
      {
        id: 0,
        name: '今天'
      },
      {
        id: 1,
        name: '明天'
      }
    ],
    dateIndex: 0,
    //具体日期***
    exactDateTag:'今天',
    //具体时间***
    exactTime: '06:00',
    //人数***
    peopleNumber: '',
    //联系电话***
    phoneNumber:'',
    //预算***
    budget: '',
    //备注***
    remarks: ''
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
   * 出发城市
   */
  startRegionChange: function (e) {
    console.log(e)
    this.setData({
      // startRegion: e.detail.value
      startPlace: e.detail.value
    })
  },
  
  /**
   * 到大城市
   */
  endRegionChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      // endRegion: e.detail.value
      endPlace: e.detail.value
    })
  },

  /**
   * 日期选择器
   */
  bindPickerChange: function (e) {
    let _this = this;
    console.log(e.detail.value);
    e.detail.value == 0 ? _this.getTodyTime() : _this.getTomorrowTime();
    _this.setData({
      dateIndex: e.detail.value
    })
  },
  
  /**
   * 事件选择器
   */
  bindTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      exactTime: e.detail.value
    })
  },
  //获取今天时间
  /**
   * 
   */
  getTodyTime: function () {
    let _this = this;
    _this.setData({
      exactDateTag:'今天'
    });
  },
  //获取明天时间
  /**
   * 
   */
  getTomorrowTime: function () {
    let _this = this;
    _this.setData({
      exactDateTag: '明天'
    });
  },
  //监听输入框  实现双向数据绑定
  /**
   * 
   */
  inputedit: function (e) {
    let _this = this;
    //input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，
    let value = e.detail.value;
    let name = dataset.name;
    _this.data[name] = value;
    _this.setData({
      name: _this.data[name]
    });
  },
  
  /**
   * 错误提示信息
   */
  showModal(error) {
    wx.showModal({
      content: error,
      showCancel: false,
    })
  },
  /**
   * 点击发布函数
   */
  submitTap:function(){
    let _this = this;
    // if (_this.data.startLocation.name == ''){
    //   _this.showModal('请选择上车地点');
    //   return false;
    // }
    // if (_this.data.endLocation.name == ''){
    //   _this.showModal('请选择下车地点');
    //   return false;
    // }
    // if (_this.data.peopleNumber == '') {
    //   _this.showModal('请输入人数');
    //   return false;
    // }
    // if (_this.data.phoneNumber == '') {
    //   _this.showModal('请输入联系电话');
    //   return false;
    // }
    // if (_this.data.budget == '') {
    //   _this.showModal('请输入预算金额');
    //   return false;
    // }
    console.log(_this.data)
    wx.showToast({
      title: '',
      icon: 'loading',
      success: function (res) {
        //模拟删除
        _this.addColoction();
      }
    });
   
  },
  /**
   * 添加函数
   */
  addColoction:function(){
    let _this = this;
    db.collection('PeopleLookingCars').add({
      data:{
        //出发
        startPlace: _this.data.startPlace,
        //到达
        endPlace: _this.data.endPlace,
        //上车地点***
        // startLocation: _this.data.startLocation,
        //下车地点***
        // endLocation: _this.data.endLocation,
        //具体日期***
        exactDateTag: _this.data.exactDateTag,
        //具体时间***
        exactTime: _this.data.exactTime,
        //人数***
        peopleNumber: _this.data.peopleNumber,
        //联系电话***
        phoneNumber: _this.data.phoneNumber,
        //预算***
        budget: _this.data.budget,
        //备注***
        remarks: _this.data.remarks,
        //创建时间
        createdTime: db.serverDate(),
        //状态
        status:0,//0:正常使用,1:被删除
      },
      success:function(res){
        console.log(res);
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          success: function (res) {
            setTimeout(function () {
              //返回页面
              wx.navigateBack();
            }, 500);
          }
        });
      },
      fail:console.error
    })
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