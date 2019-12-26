// components/rowImg/rowImg.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    identify: {
      type: Number,
      vaule: 1
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imagesStudent: ["/images/mine/order.png", "/images/mine/trip.png", "/images/mine/triping.png", "/images/mine/pay.png", "/images/mine/complete.png"],
    textsStudent: ["待接单", "待出行", "正在出行", "待支付", "已完成"],
    statusStudent: [2, 3, 4, 5, 1],
    imagesDriver: ["/images/mine/trip.png", "/images/mine/triping.png", "/images/mine/pay.png", "/images/mine/complete.png"],
    textsDriver: ["待出行", "正在出行", "待收款", "已完成"],
    statusDriver: [3, 4, 5, 1],
    navto: "/driver_pages/list/list",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navgo: function (e) {
      var identify = this.properties.identify;
      var status;
      if (identify == 1) {
        status = this.data.statusStudent[e.currentTarget.dataset.num];
      } else {
        status = this.data.statusDriver[e.currentTarget.dataset.num];
      }
      var user = app.getGlobalUserInfo();
      var serverUrl = app.serverUrl;

      if (user == null || user == undefined || user == '') {
        wx.showToast({
          title: '尚未登录，请登录...',
          icon: 'none',
        })
      } else {
        var parm = "?status=" + status + "&identify=" + identify; //添加参数
        wx.navigateTo({
          url: this.data.navto + parm,
          success: function (res) { },
        })
      }

    }
  }
})