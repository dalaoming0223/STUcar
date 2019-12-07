//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    
    // 设置全局属性、方法
    this.globalData = {
      openid: -1,
      userInfo: {}
    }
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  setGlobalData(dataItem, val) { // 设置全局属性
    this.globalData[dataItem] = val
  },
  getGlobalData(dataItem) { // 获取全局属性
    return this.globalData[dataItem]
  },
  getOpenid() { // 获取openid并存储
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid = openid // 保存到全局变量
      if (wx.getStorageSync(openid) == '') { // 该用户从未打开过小程序，未存储过openid在本地
        wx.setStorageSync(openid, []) // 存储openid到本地
      }
    })
  }
})
