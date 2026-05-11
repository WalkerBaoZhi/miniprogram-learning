// pages/radio/radio.js
Page({

    /**
     * 页面的初始数据
     */
  data: {
    gender: '',
    language: '',
    numbers: [],
    showResult: false,
    genderText: '',
    languageText: '',
    numbersText: ''
  },

    onGenderChange(e) {
        this.setData({
            gender: e.detail.value
        });
    },

    onLanguageChange(e) {
        this.setData({
            language: e.detail.value
        });
    },

    onNumbersChange(e) {
        this.setData({
            numbers: e.detail.value
        });
    },

    submitForm() {
        if (!this.data.gender || !this.data.language) {
            wx.showToast({
                title: '请完成选择',
                icon: 'none'
            });
            return;
        }
        const genderText = this.data.gender === 'male' ? '男' : '女';
        const languageText = this.data.language === 'chinese' ? '中文' : '英文';
        const numbersText = this.data.numbers.length > 0 ? this.data.numbers.join('、') : '无';
        this.setData({
            showResult: true,
            genderText,
            languageText,
            numbersText
        });
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