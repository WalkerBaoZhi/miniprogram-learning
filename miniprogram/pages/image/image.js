// pages/image/image.js
Page({
    data: {
        imgSrc: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    },

    onLoad(options) { },

    onReady() { },

    onShow() { },

    onHide() { },

    onUnload() { },

    onPullDownRefresh() { },

    onReachBottom() { },

    onShareAppMessage() { },

    onImageLoad() {
        console.log('图片加载成功');
    },

    onImageError() {
        console.log('图片加载失败');
    },
});
