// pages/map/map.js
Page({
    data: {
        latitude: 39.914889,
        longitude: 116.403694,
        scale: 14,
        markers: [
            {
                id: 1,
                latitude: 39.914889,
                longitude: 116.403694,
                title: '天安门',
                iconPath: '/images/icons/usercenter.png',
                width: 30,
                height: 30,
            },
        ],
        controls: [
            {
                id: 1,
                position: { left: 10, top: 10, width: 40, height: 40 },
                iconPath: '/images/cat.png',
                clickable: true,
            },
        ],
        regionText: '',
    },

    onLoad(options) { },

    onReady() { },

    onShow() { },

    onHide() { },

    onUnload() { },

    onPullDownRefresh() { },

    onReachBottom() { },

    onShareAppMessage() { },

    onMapTap() {
        wx.showToast({ title: '点击了地图', icon: 'none' });
    },

    onControlTap() {
        wx.showToast({ title: '点击了控件', icon: 'none' });
    },

    onMarkerTap(e) {
        wx.showModal({
            title: '标记信息',
            content: `ID: ${e.detail.markerId}\n纬度: ${this.data.markers[0].latitude}\n经度: ${this.data.markers[0].longitude}`,
            showCancel: false,
        });
    },

    onRegionChange(e) {
        const { type, causedBy } = e.detail;
        if (type === 'end') {
            this.setData({
                regionText: `${causedBy === 'gesture' ? '手势' : '控件'}拖动结束`,
            });
        }
    },

    moveToLocation() {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    scale: 18,
                    markers: [
                        {
                            id: 2,
                            latitude: res.latitude,
                            longitude: res.longitude,
                            title: '我的位置',
                            iconPath: '/images/icons/usercenter-active.png',
                            width: 30,
                            height: 30,
                        },
                    ],
                });
            },
            fail: () => {
                wx.showToast({ title: '请开启定位权限', icon: 'none' });
            },
        });
    },

    zoomIn() {
        this.setData({ scale: Math.min(this.data.scale + 1, 20) });
    },

    zoomOut() {
        this.setData({ scale: Math.max(this.data.scale - 1, 3) });
    },

    addMarker() {
        const { latitude, longitude, markers } = this.data;
        const newMarker = {
            id: markers.length + 1,
            latitude: latitude + (Math.random() - 0.5) * 0.02,
            longitude: longitude + (Math.random() - 0.5) * 0.02,
            title: `标记${markers.length + 1}`,
            iconPath: '/images/icons/usercenter.png',
            width: 25,
            height: 25,
        };
        this.setData({ markers: [...markers, newMarker] });
    },
});
