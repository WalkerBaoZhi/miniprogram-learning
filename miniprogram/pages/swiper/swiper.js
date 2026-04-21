// pages/swiper/swiper.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imagelist: [
            "../../images/swiper-0.jpg",
            "../../images/swiper-1.jpg",
            "../../images/swiper-2.jpg",
            "../../images/swiper-3.jpg"
        ],
        dots: false,
        autoplay: false,
        interval: 1000,
        duration: 500,
        currentHeight: '422rpx',
        imageHeights: [],
        display_interval_time: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: 'swiper',
        })
        this.calculateAllImageSizes();
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
        getApp().setCurrentTitle('swiper');
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

    onSwitchChange(e) {
        this.setData({
            autoplay: e.detail.value
        })
    },

    // 自适应图片高度
    calculateAllImageSizes() {
        const that = this;
        const {
            imagelist
        } = that.data;
        const systemInfo = wx.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth;
        const ratio = 750 / screenWidth;
        const heights = [];
        let loadedCount = 0;

        imagelist.forEach((imgSrc, index) => {
            wx.getImageInfo({
                src: imgSrc,
                success(res) {
                    const imgHeight = (res.height / res.width) * 750;
                    heights[index] = imgHeight + 'rpx';
                },
                fail(err) {
                    heights[index] = '422rpx';
                },
                complete() {
                    loadedCount++;
                    if (loadedCount === imagelist.length) {
                        that.setData({
                            currentHeight: heights[0] || '422rpx',
                            imageHeights: heights,
                        });
                    }
                }
            });
        });
    },

    onSwiperChange(e) {
        const index = e.detail.current;
        const {
            imageHeights
        } = this.data;
        if (imageHeights && imageHeights[index]) {
            this.setData({
                currentHeight: imageHeights[index],
            });
        }
    },

    onInputChange(e) {
        this.setData({
            interval: e.detail.value * 1000,
            display_interval_time: e.detail.value
        })
    }
})