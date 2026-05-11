// pages/location/location.js
Page({
    data: {
        latitude: '',
        longitude: '',
        address: '',
        speed: '',
        accuracy: '',
    },

    onLoad(options) { },

    onReady() { },

    onShow() { },

    onHide() { },

    onUnload() { },

    onPullDownRefresh() { },

    onReachBottom() { },

    onShareAppMessage() { },

    getLocation() {
        wx.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,
            highAccuracyExpireTime: 3000,
            success: (res) => {
                this.setData({
                    latitude: res.latitude.toFixed(6),
                    longitude: res.longitude.toFixed(6),
                    speed: res.speed || 0,
                    accuracy: res.accuracy.toFixed(2),
                });
                wx.showToast({ title: '定位成功', icon: 'success' });
            },
            fail: () => {
                wx.showToast({ title: '定位失败，请检查权限', icon: 'none' });
            },
        });
    },

    chooseLocation() {
        wx.chooseLocation({
            success: (res) => {
                this.setData({
                    latitude: res.latitude.toFixed(6),
                    longitude: res.longitude.toFixed(6),
                    address: res.address || res.name,
                });
            },
            fail: () => {
                wx.showToast({ title: '取消选择', icon: 'none' });
            },
        });
    },

    openLocation() {
        if (!this.data.latitude || !this.data.longitude) {
            wx.showToast({ title: '请先获取位置', icon: 'none' });
            return;
        }
        wx.openLocation({
            latitude: parseFloat(this.data.latitude),
            longitude: parseFloat(this.data.longitude),
            name: this.data.address || '我的位置',
            scale: 18,
        });
    },

    clearData() {
        this.setData({
            latitude: '',
            longitude: '',
            address: '',
            speed: '',
            accuracy: '',
        });
    },
});
