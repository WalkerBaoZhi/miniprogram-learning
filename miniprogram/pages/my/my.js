const dataService = require('../../utils/dataService')
const storage = require('../../utils/storage')

const AVATAR_CACHE_KEY = 'cached_avatar_url'

Page({

  data: {
    isLoggedIn: false,
    userInfo: null,
    loading: true
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  onShow() {
    this.loadUserData()
  },

  async loadUserData() {
    try {
      const userData = await dataService.getUserData()
      const isLoggedIn = !!(userData && userData.nickName)
      if (userData && !userData.avatarUrl) {
        const cachedAvatar = storage.get(AVATAR_CACHE_KEY)
        if (cachedAvatar) {
          userData.avatarUrl = cachedAvatar
        }
      }
      this.setData({
        isLoggedIn,
        userInfo: userData,
        loading: false
      })
    } catch (err) {
      console.error('加载用户数据失败', err)
      this.setData({ loading: false })
      wx.showToast({ title: '数据加载失败', icon: 'none' })
    }
  },

  async onLogin() {
    wx.showLoading({ title: '登录中...' })
    try {
      await wx.cloud.callFunction({ name: 'getOpenId' })
      const userData = await dataService.getUserData()
      wx.hideLoading()

      wx.showModal({
        title: '设置昵称',
        editable: true,
        placeholderText: '请输入昵称',
        success: async (res) => {
          if (res.confirm && res.content) {
            try {
              userData.nickName = res.content.trim()
              userData.avatarUrl = ''
              await dataService.saveUserData(userData)
              await this.loadUserData()
              wx.showToast({ title: '登录成功', icon: 'success' })
            } catch (err) {
              console.error('保存用户数据失败', err)
              wx.showToast({ title: '保存失败', icon: 'none' })
            }
          }
        }
      })
    } catch (err) {
      wx.hideLoading()
      console.error('登录失败', err)
      wx.showToast({ title: '登录失败，请重试', icon: 'none' })
    }
  },

  showEditProfile() {
    this.setData({
      showEditModal: true,
      editNickName: this.data.userInfo.nickName || '',
      editAvatarUrl: ''
    })
  },

  hideEditProfile() {
    this.setData({ showEditModal: false })
  },

  onEditNickNameInput(e) {
    this.setData({ editNickName: e.detail.value })
  },

  onEditChooseAvatar(e) {
    const { avatarUrl } = e.detail
    try {
      const fs = wx.getFileSystemManager()
      const savedPath = fs.saveFileSync(avatarUrl)
      this.setData({ editAvatarUrl: savedPath })
    } catch (err) {
      console.warn('保存头像到本地失败，使用临时路径', err)
      this.setData({ editAvatarUrl: avatarUrl })
    }
  },

  async saveEditProfile() {
    const nickName = this.data.editNickName.trim()
    if (!nickName) {
      wx.showToast({ title: '请输入昵称', icon: 'none' })
      return
    }
    const avatarUrl = this.data.editAvatarUrl || this.data.userInfo.avatarUrl || ''
    if (avatarUrl) {
      storage.set(AVATAR_CACHE_KEY, avatarUrl)
    }
    try {
      await dataService.saveUserData({
        ...this.data.userInfo,
        nickName,
        avatarUrl
      })
      this.setData({ showEditModal: false })
      await this.loadUserData()
      wx.showToast({ title: '保存成功', icon: 'success' })
    } catch (err) {
      console.error('保存失败', err)
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
  },

  onLogout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: async (res) => {
        if (res.confirm) {
          dataService.invalidateCache()
          storage.remove(AVATAR_CACHE_KEY)
          this.setData({
            isLoggedIn: false,
            userInfo: null
          })
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: 'HelloWorld',
      path: '/pages/my/my'
    }
  }
})
