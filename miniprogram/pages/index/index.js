//index.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    modalShow: false,
    avatarUrl: './user-unlogin.png',
    logged: false,
    takeSession: false,
    requestResult: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    cardCur: null,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    //分割分割 12.7 todo：
    isLodding: true,

    statusBarHeight: 0,//状态栏高度
    titleBarHeight: 0,//标题栏高度
    navBarHeight: 0,//导航栏高度

    navData: ['人找车', '拼车车'],
    currentNavTab: 0,//当前状态

    dnName:'CarOwnerRecord',//查询集合列表，默认人找车

    pageIndex:1,//第一页
    hasMore:true,//是否还有下一页
    list:[],

    hotList: [],
    hotCurrent:0,

    location: ['stu', '高铁站', '机场']
  },

  onPublishPingCar() {
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) =>{
              //授权成功时
              app.globalData.userInfo = res.userInfo
              console.log(app.globalData.userInfo)
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else{
          this.setData({
            modalShow: true,
          })
        }
      }
    })
  },
  onLoginSuccess(event) {
    console.log(event)
    const detail = event.detail
    wx.navigateTo({
      url: '../peopleLookCars/peopleLookCars'
    })
  },

  onLoginFail() {
    wx.showModal({
      title: '授权用户才能发',
      content: '',
    })
  },
  onLoad: function() {
    let _this = this
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({           
            success: res => {
              app.globalData.userInfo = res.userInfo
              console.log(app.globalData)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    _this.onGetSystemInfo();
    _this.onGetOpenid();
    wx.showLoading({
      title: '加载中...',
    });
    _this.onGetHotNews(10);//获取热点新闻
    _this.addData(1, _this.data.currentNavTab);//第一个参数页数，第二个参数分类
  },
  /**
 * 点击搜索
 */
  bindSearchTap: function () {
    wx.navigateTo({
      url: '../../pages/SearchPage/SearchPage',
    });
  },
  /**
   * 获取设备信息
   */
  onGetSystemInfo:function(){
    let _this = this
    // 因为很多地方都需要用到，所有保存到全局对象中
    if (app.globalData.statusBarHeight && app.globalData.titleBarHeight)    {
      _this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight,
        navBarHeight: app.globalData.navBarHeight,
        windowHeight: app.globalData.windowHeight,
        windowWidth: app.globalData.windowWidth
      });
    } else {
      console.log(11111);
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          if (!app.globalData) {
            app.globalData = {}
          }
          //这里默认iOS安卓导航栏都是44;
          app.globalData.titleBarHeight = 44;
          app.globalData.statusBarHeight = res.statusBarHeight;
          app.globalData.windowHeight = res.windowHeight;
          app.globalData.windowWidth = res.windowWidth;
          app.globalData.navBarHeight = res.statusBarHeight+44;
          _this.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight,
            navBarHeight: app.globalData.navBarHeight,
            windowHeight: app.globalData.windowHeight,
            windowWidth: app.globalData.windowWidth
          });
        },
        failure() {
          that.setData({
            statusBarHeight: 0,
            titleBarHeight: 0
          });
        }
      })
    }
  },
  
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  /**
   * 获取_openid
   */
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 获取热点快报
   */
  onGetHotNews:function(n){
    let _this = this;
    db.collection('RoadInfo').where({
      status: _.neq(0)
    })
    .orderBy('sendTime','desc')
    .limit(n)
    .get({
      success: function (res) {
        console.log(res.data);
        let list = res.data
        _this.setData({
          hotList: list
        });
      },
      fail: console.error
    })
  },
  /**
   * 导航列表点击
   */
  switchNav(event) {
    console.log('上方分类导航返回值')
    console.log(event) 
    console.log('上方分类导航返回值')
    let _this = this;

    console.log(_this.data.currentNavTab)
    let cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    // let singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    // _this.setData({
    //   navScrollLeft: (cur - 2) * singleNavWidth
    // })
    if (_this.data.currentNavTab == cur) {
      return false;
    } else {
      this.setData({
        currentNavTab: cur,
        list:[]
      });
    //加载数据
      _this.addData(1, _this.data.currentNavTab);
    }
    // if (){

    // }
    // _this.addData(1, cur);
    // console.log('此时cur')
    // console.log(cur)
    // console.log('此时cur')
    // _this.addData(1, cur);
  },
  
  /**
   * 获取有效的拼车信息
   */
  addData: function (n,s) {//第一个参数页数，第二个参数分类
    let _this = this;
    let startTime = _this.startTime();
    let endTime = _this.endTime();
    switch (s){
      case 0:
        _this.setData({
          dnName : "CarOwnerRecord"
        });
        break;
      case 1:
        _this.setData({
          dnName : "PassengersRecord"
        })
        break;
      case 4:
        // _this.setData({
        //   dnName : ""
        // })
        break;
    }
    wx.showLoading({
      title: '加载中...',
    });
    //按照时间查询，规则开始当前时间60分钟前 到明天24：00；
    wx.cloud.callFunction({
      name: 'queryInfo',
      data:{
        dbName: _this.data.dnName,
        pageIndex:n,
        pageSize:15,
        filter:{},
        startTime: _this.startTime(),
        endTime: _this.endTime()
      }
    }).then(res => {
      console.log(res);
      _this.setData({
        isLodding: false,
        list: res.result.data,
        pageIndex: _this.data.pageIndex+1,
        hasMore: res.result.hasMore
      });
      wx.hideLoading();
    });
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    let _this = this;
    
    //显示刷新图标
    wx.showLoading({
      title: '加载中...',
    });
    _this.setData({
      pageIndex:1
    });
    _this.onGetHotNews(10);//获取热点新闻
    _this.addData(1,_this.data.currentNavTab);
    //停止刷新，页面回单
    wx.stopPullDownRefresh();
  },
  
  /**
   * 上拉加载更多
   */
  onReachBottom:function(){
    let _this = this;
    if(!_this.data.hasMore) return;//没有下一页了

    let startTime = _this.startTime();
    let endTime = _this.endTime();
    //按照时间查询，规则开始当前时间60分钟前 到明天24：00；
    wx.cloud.callFunction({
      name: 'queryInfo',
      data: {
        dbName: _this.data.dnName,
        pageIndex: _this.data.pageIndex,
        pageSize: 15,
        filter:{},
        startTime: _this.startTime(),
        endTime: _this.endTime()
      }
    }).then(res => {
      console.log('有效评车信息')
      console.log(res);
      _this.setData({
        list: _this.data.list.concat(res.result.data),
        pageIndex: _this.data.pageIndex+1,
        hasMore: res.result.hasMore
      });
    });
  },
  /**
   * 热点新闻切换
   */
  hotSwiperChange:function(e){
    this.setData({
      hotCurrent: e.detail.current
    });
  },
  /**
   * 查看行程详情
   */
  lookTripDetails:function(e){
    let _this = this;
    let id = e.currentTarget.dataset.id;
    let idx = e.currentTarget.dataset.idx;
    let item = _this.data.list[idx];
    console.log('转详情页打印item.tripsArray',item.tripsArray)
    if (item.tripsArray){
      wx.navigateTo({
        url: '../../pages/tripDetails/tripDetails?id=' + id,
      });
    }else{
      wx.navigateTo({
        url: '/pages/passengersTripDetails/passengersTripDetails?id=' + id,
      });
    }
  },
  /**
   * 发布信息按钮动画
   */
  trigger:function(){
    let _this = this;
    let active = _this.data.status;
    if(active == 'on'){
      this.setData({
        status : ''
      });
    }else{
      this.setData({
        status : 'on'
      });
    }
  },
  /**
   * 获取60分钟前时间戳
   */
  startTime:function(){
    let day = new Date()
    let strTime = day.getTime() - 1 * 60 * 60 * 1000;
    console.log(strTime)
    return strTime;
  },
  /**
   * 获取次日凌晨时间戳
   */
  endTime:function(){
    // 获取当天 0 点的时间戳
    let oneTime = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    //次日凌晨时间戳
    let threeTime = oneTime + 86400 *2;
    console.log(threeTime*1000)
    return threeTime*1000;
  },

})
