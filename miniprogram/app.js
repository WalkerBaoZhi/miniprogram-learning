const { CLOUD_CONFIG } = require('./models/cloud')

App({
  onLaunch() {
    wx.cloud.init({
      env: CLOUD_CONFIG.env
    })
  },
  globalData: {
    userInfo: null
  }
})
