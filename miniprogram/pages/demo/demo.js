// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "wow", //字符串
    message: "哈哈哈",
    clicked: false, //bool
    a: 1, //数字
    b: 2,
    arr: [3,4,5], //arr
    info: {
      name: "aaa",
      age: 91
    } //结构体，访问的时候info.name
  },

  onclick(){
    this.setData({
      text: "yeee",
      clicked: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})