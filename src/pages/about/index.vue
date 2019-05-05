<template>
  <div class="container_about">
    <div class="item">
      <p>todos开发教程</p>
      <span>博客地址: </span>
      <span>https://thisliuyang.cn</span>
      <span>项目仓库: </span>
      <span>https://github.com/thisliuyang/mpvue-todos</span>
    </div>
    <div class="item">
      <p>联系开发者</p>
      <span>微信: vip_shuailiuyang</span>
      <span>邮箱: thisliuyang@163.com</span>
    </div>
    <div class="by">开发者 by 刘洋</div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.container_about {
  padding: 30rpx;
  border-top: 1rpx solid #e5e5e5;
  font-size: 30rpx;
}
.item {
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
  margin-bottom: 100rpx;
  padding: 20rpx;
  line-height: 50rpx;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
}
.item p {
  color: #ff8345;
  font-size: 40rpx;
  margin-bottom: 30rpx;
}
.by {
  text-align: center;
  position: absolute;
  bottom: 10rpx;
  left: 50%;
  transform: translate(-50%)
}
</style>