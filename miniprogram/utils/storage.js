function set(key, data) {
  try {
    wx.setStorageSync(key, data)
    return true
  } catch (e) {
    console.error('存储失败', key, e)
    return false
  }
}

function get(key) {
  try {
    return wx.getStorageSync(key) || null
  } catch (e) {
    console.error('读取失败', key, e)
    return null
  }
}

function remove(key) {
  try {
    wx.removeStorageSync(key)
    return true
  } catch (e) {
    console.error('删除失败', key, e)
    return false
  }
}

module.exports = { set, get, remove }
