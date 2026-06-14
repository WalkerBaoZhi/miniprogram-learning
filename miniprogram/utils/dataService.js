const db = wx.cloud.database()
const { CLOUD_CONFIG } = require('../models/cloud')
const storage = require('./storage')

const USER_COLLECTION = CLOUD_CONFIG.collections.users
const CACHE_KEY = 'user_data_cache'

let memoryCache = { userData: null }

function loadCache() {
  if (memoryCache.userData) return
  const saved = storage.get(CACHE_KEY)
  if (saved) {
    memoryCache.userData = saved
  }
}

function saveCache() {
  storage.set(CACHE_KEY, memoryCache.userData)
}

async function callWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
}

async function getUserData() {
  loadCache()
  if (memoryCache.userData) {
    return memoryCache.userData
  }

  return callWithRetry(async () => {
    const res = await db.collection(USER_COLLECTION).where({
      _openid: '{openid}'
    }).get()

    if (res.data.length === 0) {
      const newUser = {
        nickName: '',
        avatarUrl: '',
        createTime: Date.now()
      }
      const addRes = await db.collection(USER_COLLECTION).add({ data: newUser })
      memoryCache.userData = { ...newUser, _id: addRes._id }
      saveCache()
      return memoryCache.userData
    }

    memoryCache.userData = res.data[0]
    saveCache()
    return memoryCache.userData
  })
}

async function saveUserData(userData) {
  return callWithRetry(async () => {
    const { _id, _openid, ...data } = userData
    await db.collection(USER_COLLECTION).doc(_id).update({ data })
    memoryCache.userData = { ...userData }
    saveCache()
  })
}

function invalidateCache() {
  memoryCache.userData = null
  storage.remove(CACHE_KEY)
}

module.exports = {
  getUserData,
  saveUserData,
  invalidateCache
}
