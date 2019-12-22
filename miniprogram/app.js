//app.js
App({
  globalData: {
    openid: null,
    _status: null,
    identify: ''
  },
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
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
    this.getOpenid();
    this.getUserInfo();
  },

  //使用本地缓存存储方式
  //设置全局用户对象
  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user)
  },

  //获取全局用户对象
  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo")
  },

  setGlobalData(dataItem, val) { // 设置全局属性
    this.globalData[dataItem] = val
  },
  getGlobalData(dataItem) { // 获取全局属性
    return this.globalData[dataItem]
  },
  //获取用户openid
  getOpenid() {
    let app = this;
    let openidStor = wx.getStorageSync('openid');
    if (openidStor) {
      console.log('本地获取openid:' + openidStor);
      app.globalData.openid = openidStor;
      // app._getUserInfo();
    } else {
      //获取openid不需要授权
      wx.cloud.callFunction({
        name: "login",
        success(res) {
          let openid = res.result.openid;
          app.globalData.openid = openid;
          console.log('请求获取openid:', openid);
          wx.setStorageSync('openid', openid)
        },
        fail(res) {
          console.log("获取openid失败", res)
        }
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo)
      typeof cb == "function" && cb(this.globalData.userInfo)
    else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              var app = getApp()
              // console.log(`(${app.globalData.userInfo.nickName})`)
              console.log(app.globalData.userInfo)
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: res => {
              that.showTips('警告', '尚未进行授权，请点击确定跳转到授权页面进行授权。', res => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/tologin/tologin',
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  showTips(subject, content, callback) {
    return wx.showModal({
      title: subject,
      content: content,
      success: callback
    })
  },
  // // 获取用户信息，如果用户没有授权，就获取不到
  // _getUserInfo: function () {
  //   let app = this;
  //   wx.getUserInfo({ //从网络获取最新用户信息
  //     success: function (res) {
  //       let user = res.userInfo;
  //       user.openid = app.globalData.openid;
  //       app.globalData.userInfo = user;
  //       console.log('请求获取user成功', user)
  //       app._saveUserInfo(user);
  //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //       // 所以此处加入 callback 以防止这种情况
  //       if (app.userInfoReadyCallback) {
  //         app.userInfoReadyCallback(res)
  //       }
  //     },
  //     fail: function (res) { //请求网络失败时，再读本地数据
  //       console.log('请求获取user失败')
  //       let userStor = wx.getStorageSync('user');
  //       if (userStor) {
  //         console.log('本地获取user', userStor)
  //         app.globalData.userInfo = userStor;
  //       }
  //     }
  //   })
  // },
  // // 保存userinfo，到本地和线上
  // _saveUserInfo: function (user) {
  //   let app = this;
  //   //缓存全局变量
  //   this.globalData.userInfo = user;
  //   //缓存到sd卡里
  //   wx.setStorageSync('user', user);

  //   let userDB = wx.cloud.database().collection("Allusers");
  //   // 1，查询数据库里的用户信息
  //   userDB.where({
  //     _id: app.globalData.openid
  //   }).get({
  //     success(res) {

  //       if (res.data && res.data.length > 0) { //数据库里有这个用户了
  //         let dbUser = res.data[0].user;
  //         console.log("get成功", dbUser)
  //         //用户没有改名，没有换头像
  //         if (dbUser.avatarUrl == user.avatarUrl && dbUser.nickName == user.nickName) {
  //           console.log("用户数据没有变")
  //         } else {
  //           console.log("用户数据改变了")
  //           app.uploadUserInfo(user, true)
  //         }

  //       } else {
  //         console.log("get失败", res.data)
  //         app.uploadUserInfo(user, false)
  //       }
  //     },
  //     fail(res) {
  //       console.log("get失败", res)
  //       app.uploadUserInfo(user, false)
  //     }
  //   })


  // },
  // //上传或更新用户信息到数据库
  // uploadUserInfo(user, isUpdate) {
  //   let app = this
  //   let userDB = wx.cloud.database().collection("Allusers");
  //   if (isUpdate) { //更新用户数据
  //     userDB.update({
  //       data: {
  //         _id: app.globalData.openid,
  //         user
  //       },
  //       success(res) {
  //         console.log("更新用户信息成功", res)
  //       }
  //     })
  //   } else { //添加用户数据
  //     userDB.add({
  //       data: {
  //         _id: app.globalData.openid,
  //         status: 1,
  //         user
  //       },
  //       success(res) {
  //         console.log("上传用户信息成功", res)
  //       }
  //     })
  //   }

  // },

  // // 错误提示
  // showErrorToastUtils: function (e) {
  //   wx.showModal({
  //     title: '提示！',
  //     confirmText: '朕知道了',
  //     content: e,
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       }
  //     }
  //   })
  // },
})