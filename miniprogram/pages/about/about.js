//激励视频广告定义

let videoAd = null


// pages/about/about.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true
  },

  /**
     * 显示弹窗
     */
  // buttonTap: function () {
  //   this.setData({
  //     modalHidden: false
  //   })
  // },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
 // 
 onLoad: function (options) {

 
 
    if (wx.createRewardedVideoAd) {
      // 加载激励视频广告
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-3d6ba67927b93c0b'
      })
      //捕捉错误
      videoAd.onError(err => {
        wx.showModal({
          title: '提示',
          content: '视频广告拉取失败',
        })
      })
      // 监听关闭
      videoAd.onClose((status) => {
        if (status && status.isEnded || status === undefined) {
          // 正常播放结束，下发奖励
          this.setData({
               modalHidden: false
              })

        } else {
          // 播放中途退出，进行提示
          wx.showModal({
            title: '提示',
            content: 'Sorry...您需要看完视频才能解锁～',
            showCancel: false,
            confirmText: '好的',
            success(res) {
              if (res.confirm) {
                videoAd.load()
                  .then(() => videoAd.show())
                  .catch(err => console.log(err.errMsg))
              }
            }
          })
        }
      })
    }
  },
  // button 点击事件

  // buttonTap: function () {
  //   this.setData({
  //     modalHidden: false
  //   })
  // },
  openVideoAd() {
    console.log('打开激励视频');
    // 在合适的位置打开广告
    if (videoAd) {
      videoAd.show().catch(err => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
      })
    }
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})