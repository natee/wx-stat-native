import {api, utils} from './wx-stat'

Component({
  properties: {
    type: {
      type: String,
      value: 'user' // 'adx'
    },
    name: {
      type: String
    },
    tagId: {
      type: String
    },
    uid: {
      type: String,
      value: ''
    }
  },
  data: {
    adType: 'mp',
    adxData: {},
    showSite: false
  },
  lifetimes: {
    attached() {
      this.setup()
    },
    ready() {
      const data = this.data

      if (!data.name) {
        wx.showModal({
          title: '提示',
          content: 'wx-stat组件必填项name未填写',
          confirmText: '确定',
          showCancel: false
        })
        return
      }
      if (!data.tagId) {
        wx.showModal({
          title: '提示',
          content: 'wx-stat组件必填项tag-id未填写',
          confirmText: '确定',
          showCancel: false
        })
        return
      }

      const params = {
        device: data.deviceInfo,
        site: data.siteInfo,
        user: data.user,
        imp: data.imp,
        ts: +new Date(),
        aid: data.aid,
        rid: data.rid
      }

      api.getAdxInfo(params).then(res => {
        const hasData = res.data.seatbid && res.data.seatbid.length > 0;
        let bidInfo;
        if(hasData){
          bidInfo = res.data.seatbid[0].bid[0];
          this.setData({
            // 1: 打开页面链接  8: 打开小程序
            adType: bidInfo.action_type === 8 ? 'mp' : bidInfo.action_type === 1 ? 'h5' : 'other'
          });
        }else{
          wx.showModal({
            title: "提示",
            content: "获取广告信息失败，请确保参数填写正确",
            confirmText: "确定",
            showCancel: false
          });
        }

        if(['mp', 'h5'].indexOf(this.data.adType) > -1){
          this.setData({
            adxData: bidInfo
          })

          // 展示时发送统计请求
          this.data.adxData.imptrackers.forEach(url => {
            api.sendStatInfo(url)
          })

          this.data.imptrace && api.sendStatInfo(this.data.imptrace);
        }

        return false
      }).catch()
    }
  },
  methods: {
    setup() {
      const res = wx.getSystemInfoSync()
      this.setData({
        deviceInfo: {
          ua: '', // 无法获取
          ip: '', // 无法获取
          language: '', // 无法获取
          model: res.model,
          os: res.system,
          devicetype: 4
        }
      })

      this.setData({
        siteInfo: {
          name: this.data.name,
          page: utils.getCurrentPageUrlWithArgs()
        }
      })

      this.setData({user: this.getUser()})
      this.setData({imp: this.setImp()})
    },

    getUser() {
      const uid = this.data.uid || wx.getStorageSync('uid') || utils.getGuid()
      wx.setStorageSync('uid', uid)

      return {
        id: uid
      }
    },
    setImp() {
      return [
        {
          id: '', // 暂时不用
          tagid: this.data.tagId
          // banner: { // 先不填
          //   w: 100,
          //   h: 100,
          //   pos: 0 // 0:未知 4:头部 5:底部 6:侧边栏 7:全屏
          // }
        }
      ]
    },
    mpOpend() {
      // 点击时发送统计请求
      this.data.adxData.clktrackers.forEach(url => {
        api.sendStatInfo(url)
      })

      this.data.clktrace && api.sendStatInfo(this.data.clktrace);
    },
    mpOpenFail(res) {
      console.log('小程序跳转失败：',res);
    },

    gotoAdSite() {
      this.setData({
        showSite: true
      });
    }
  }
})
