<template>
  <div class="main">
    <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/static/picture/e1fb7ebf-8cd6-4212-85cf-4119925f3626.png" class="bgImg" alt="">
    <div class="box">
      <span>请前往小程序体验该功能</span>
      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.main{
  width: 100vw;
  height: calc(100vh - 100px);
  position: relative;
  .bgImg{
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
  }
  .box{
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%,-50%);
    text-align: center;
    width: 250px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    img{
      width: 100%;
      height: auto;
      margin-top: 20px;
    }
  }
}
</style>