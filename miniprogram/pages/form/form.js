// pages/form/form.js
Page({
    data: {
        name: '',
        phone: '',
        password: '',
        genders: ['男', '女'],
        genderIndex: 0,
        today: '',
        birthday: '请选择日期',
        hobbies: [
            { name: '阅读', value: 'reading', checked: false },
            { name: '运动', value: 'sports', checked: false },
            { name: '音乐', value: 'music', checked: false },
            { name: '游戏', value: 'games', checked: false },
        ],
        notify: true,
        remark: '',
    },

    onLoad(options) {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        this.setData({ today: `${y}-${m}-${d}` });
    },

    onReady() { },

    onShow() { },

    onHide() { },

    onUnload() { },

    onPullDownRefresh() { },

    onReachBottom() { },

    onShareAppMessage() { },

    onNameInput(e) {
        this.setData({ name: e.detail.value });
    },

    onPhoneInput(e) {
        this.setData({ phone: e.detail.value });
    },

    onPasswordInput(e) {
        this.setData({ password: e.detail.value });
    },

    onGenderChange(e) {
        this.setData({ genderIndex: e.detail.value });
    },

    onDateChange(e) {
        this.setData({ birthday: e.detail.value });
    },

    onHobbyChange(e) {
        const index = e.currentTarget.dataset.index;
        const key = `hobbies[${index}].checked`;
        this.setData({ [key]: e.detail.value });
    },

    onNotifyChange(e) {
        this.setData({ notify: e.detail.value });
    },

    onRemarkInput(e) {
        this.setData({ remark: e.detail.value });
    },

    onSubmit() {
        const { name, phone, password, genders, genderIndex, birthday, hobbies, notify, remark } = this.data;
        const selectedHobbies = hobbies.filter(h => h.checked).map(h => h.name).join('、');

        if (!name) {
            wx.showToast({ title: '请输入姓名', icon: 'none' });
            return;
        }
        if (!phone) {
            wx.showToast({ title: '请输入手机号', icon: 'none' });
            return;
        }

        const formData = {
            name,
            phone,
            password,
            gender: genders[genderIndex],
            birthday,
            hobbies: selectedHobbies || '无',
            notify: notify ? '是' : '否',
            remark,
        };

        wx.showModal({
            title: '提交信息',
            content: Object.entries(formData).map(([k, v]) => `${k}：${v}`).join('\n'),
            showCancel: false,
        });
    },

    onReset() {
        this.setData({
            name: '',
            phone: '',
            password: '',
            genderIndex: 0,
            birthday: '请选择日期',
            hobbies: this.data.hobbies.map(h => ({ ...h, checked: false })),
            notify: true,
            remark: '',
        });
    },
});
