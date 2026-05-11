// pages/progress/progress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadPercent: 0,
        showProgress: false,
        imageUrl: ''
    },

    chooseImage() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success: (res) => {
                const tempFilePath = res.tempFiles[0].tempFilePath;
                this.setData({
                    showProgress: true,
                    uploadPercent: 0
                });

                let percent = 0;
                const timer = setInterval(() => {
                    percent += 10;
                    if (percent >= 100) {
                        clearInterval(timer);
                        this.setData({
                            uploadPercent: 100,
                            imageUrl: tempFilePath
                        });
                    } else {
                        this.setData({
                            uploadPercent: percent
                        });
                    }
                }, 200);
            }
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