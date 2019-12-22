// miniprogram/pages/passengersTripDetails/passengersTripDetails.js
const app = getApp()
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    //信息
    userInfo: {},

    //出发城市***
    startCity: [],
    //到达城市***
    endCity: [],
    //具体日期***
    exactDate: '',
    //具体时间***
    exactTime: '',
    //起点***
    startPlace: ['stu', '高铁站', '机场'],
    startLocation: [],
    //终点***
    endPlace: ['stu', '高铁站', '机场'],
    endLocation: [],
    //路线图***
    tripsArray: [],
    //人数***
    peopleNumber: '',
    //联系电话
    phoneNumber: '',
    //预算***
    budget: '',
    //备注***
    remarks: 's'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户当前位置
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    //截取参数
    _this.setData({
      id: options.id
    });
    _this.addData(_this.data.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 加载数据
   */
  addData: function (id) {
    let _this = this;
    db.collection('PassengersRecord').doc(id).get({
      success: function (res) {
        console.log('同学间拼车详情res.data：',res.data);
        let data = res.data;
        _this.setData({
          userInfo: data.userInfo,
          //出发城市***
          startLocation: data.startPlace,
          //到达城市***
          endLocation: data.endPlace,
          //具体日期***
          exactDate: data.exactDate,
          //具体时间***
          exactTime: data.exactTime,
          // //起点***
          // startLocation: data.startLocation,
          // //终点***
          // endLocation: data.endLocation,
          //路线图***
          tripsArray: data.tripsArray,
          //人数***
          peopleNumber: data.peopleNumber,
          //联系电话
          phoneNumber: data.phoneNumber,
          //预算***
          budget: data.budget,
          //备注***
          remarks: data.remarks
        });
        console.log('断点测试')
        wx.hideLoading();
      },
      fail: console.log('同学间拼车详情数据库返回数据失败')
    });
  },
  /**
   * 拨打电话
   */
  bindMakePhoneCall: function () {
    let _this = this;
    wx.makePhoneCall({
      phoneNumber: _this.data.phoneNumber
    })
  },
  /**
   * 返回
   */
  bindGoBack: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 回到首页
   */
  bindGoHome: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 用户点击分享
   */
  onShareAppMessage: function (ops) {
    let _this = this;
    let desc = _this.data.remarks;

    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '汕大拼车',
      desc: '备注:' + desc,
      path: '/ages/passengersTripDetails/PassengersTripDetails?id=' + _this.data.id,
      success: function (res) {
        // 需要在页面onLoad()事件中实现接口
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})