// pages/picker/picker.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nowdate: '',
        nowtime: '',
        nowregion: '',
        numberlist: ['1', '2', '3'],
        numberlist2: [
            ['1', '2'],
            ['3', '4'],
        ],
        number2: ['', '']
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
    ChangeDate(e) {
        this.setData({
            nowdate: e.detail.value
        })
    },
    ChangeTime(e) {
        this.setData({
            nowtime: e.detail.value
        })
    },
    ChangeRegion(e) {
        this.setData({
            nowregion: e.detail.value
        })
    },
    ChangeSelet(e) {
        this.setData({
            number: this.data.numberlist[e.detail.value]
        })
    },
    ChangeMultiSelet(e) {
        const index = e.detail.value
        this.setData({
            number2: [this.data.numberlist2[0][index[0]],
                this.data.numberlist2[1][index[1]]
            ]
        })
    }
})