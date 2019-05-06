<template>
  <div class="container_logs" :style="{ 'height': containerHeight }">
    <div v-if="logs.length > 0" style="width:100%;">
      <div v-for="item in newLogs" class="logs item" :key="item.handletime">
        <div>
          <div class="item_name">{{item.name}}</div>
          <div>{{item.handletime}}</div>
        </div>
        <div class="item_title">{{item.title}}</div>
      </div>
    </div>
    <div class="div_img" v-else>
      <img src="https://thisliuyang.cn/public/wx-images/time.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      logs: [],
      containerHeight: '685px'
    }
  },
  created () {
    wx.getSystemInfo({
      success: (res) => {
        this.containerHeight = res.screenHeight + 'px'
      }
    })
  },
  beforeMount () {
    console.log('12345')
  },
  onShow () {
    this.logs = mpvuePlatform === 'my' ? mpvue.getStorageSync({key: 'logs'}).data || [] : mpvue.getStorageSync('logs') || []
  },
  computed: {
    newLogs () {
      let log = this.logs
      log.forEach(element => {
        console.log(element)
        if (element.name instanceof Array) {
          element.name = element.name.map(i => {
            return i.title
          })
        }
      })
      return log.reverse()
    }
  }
}
</script>
<style scoped>
.container_logs {
  padding: 30rpx;
  border-top: 1rpx solid #e5e5e5;
}
.logs {
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item {
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 30rpx;
  color: #888;
}
.item_name {
  margin-bottom: 5rpx;
}
.item_title {
  color: red;
}
.item:last-child {
  border-bottom: 0;
}
.div_img {
  height: 100%;
  width: 100%;
}
.div_img img {
  height: 100%;
  width: 100%;
}
</style>