
var timeUtil = require('../../utils/timeUtil.js')
var dbUtil = require('../../utils/dbUtil.js')
var app = getApp()

Page({
    data: {
        notify: false,
        inputTitle: '',
        inputDescribe: '',
        targetDate: '',
        targetTime: '',
        imgPath: '/image/add.png',
        outOfDate: false
    },
    inputTitle: function (event) {
        this.setData({
            inputTitle: event.detail.value
        })
    },

    dataChange: function (event) {
        this.setData({
            targetDate: event.detail.value
        })
    },

    timeChange: function (event) {
        this.setData({
            targetTime: timeUtil.formatTimeStrOnlyTime(event.detail.value)
        })
    },

    inputDescribe: function (event) {
        this.setData({
            inputDescribe: event.detail.value
        })
    },

    switchNotify: function (event) {
        this.setData({
            notify: event.detail.value
        })
    },

    insertImg: function (event) {
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    imgPath: res.tempFilePaths
                })

                console.log(res.tempFilePaths)
            }
        })
    },

    addNewIncident: function (event) {
        var currTime = new Date().getTime();
        var id = app.globalData.userInfo.nickName + "_" + currTime;
        function callback(isSuccess) {
            if (isSuccess) {
                wx.showToast({
                    title: '添加新事件成功',
                    icon: 'success',
                    duration: 2000
                })

                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                })
            } else {
                wx.showToast({
                    title: '添加新事件失败',
                    icon: 'success',
                    duration: 2000
                })
            }
        }
        console.log(id)

        var incident = new Object();
        incident.id = id;
        incident.title = this.data.inputTitle;
        incident.describe = this.data.inputDescribe;
        incident.notify = this.data.notify;
        incident.imgPath = this.data.imgPath;
        incident.targetDate = this.data.targetDate;
        incident.targetTime = this.data.targetTime;
        incident.targetTimestamp = timeUtil.string2Timestamp(this.data.targetDate, this.data.targetTime);

        console.log(incident)
        dbUtil.addSingleData(incident, 'todoList',callback)
    },

    onLoad: function () {
        var currTime = new Date();
        console.log(currTime)
        this.setData({
            // targetDate: currTime.getFullYear() + "-" + (currTime.getMonth() + 1) + "-" + currTime.getDate(),
            targetDate: timeUtil.formatTimeOnlyDate(currTime),
            // targetTime: currTime.getHours() + ":" + currTime.getMinutes()
            targetTime: timeUtil.formatTimeOnlyTime(currTime)
        })
    }
})