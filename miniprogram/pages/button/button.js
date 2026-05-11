// pages/button/button.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled: false,
        plain: true,
        loading: false,
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

    },

    SwitchDisable(e) {
        this.setData({
            disabled: e.detail.value
        })
    },

    SwitchPlain(e) {
        this.setData({
            plain: e.detail.value
        })
    },

    SwitchLoading(e) {
        this.setData({
            loading: e.detail.value
        })
    }
})