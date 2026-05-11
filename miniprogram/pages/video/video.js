// pages/video/video.js
Page({
    data: {
        videoSrc: 'https://res.wx.qq.com/wxdoc/dist/assets/img/3.3f10756a.mp4',
        posterSrc: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
        objectFit: 'contain',
        playing: false,
        showCenterBtn: true,
    },

    onLoad(options) { },

    onReady() {
        this.videoContext = wx.createVideoContext('myVideo');
    },

    onShow() { },

    onHide() { },

    onUnload() { },

    onPullDownRefresh() { },

    onReachBottom() { },

    onShareAppMessage() { },

    togglePlay() {
        if (this.data.playing) {
            this.videoContext.pause();
        } else {
            this.videoContext.play();
        }
    },

    restart() {
        this.videoContext.seek(0);
        this.videoContext.play();
    },

    onPlay() {
        this.setData({ playing: true });
    },

    onPause() {
        this.setData({ playing: false });
    },

    onEnded() {
        this.setData({ playing: false });
        wx.showToast({ title: '播放结束', icon: 'none' });
    },

    onVideoError(e) {
        console.error('视频错误', e.detail);
        wx.showToast({ title: '视频加载失败', icon: 'none' });
    },

    onToggleCenterBtn(e) {
        this.setData({ showCenterBtn: e.detail.value });
    },
});
