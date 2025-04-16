<template>
  <div class="illustrate">
    <go-back></go-back>
    <div class="illustrate-item" style="background-color: rgba(255,158,75, 0.1);">
      <div class="title" style="background-color: #FFC869;">普通分销</div>
      <div class="content">注册完成后即为普通分销，享受利润分佣。成为普通分销后，且成功邀请1位新人注册成为我的成员后，可享受成员充值分佣，您的成员充值您都将获得15%佣金。</div>
    </div>
    <div class="illustrate-item" style="background-color: rgba(255,249,230, 1);">
      <div class="title" style="background-color: #FBE363;">金牌分销</div>
      <div class="content">充值99元您将升级成为金牌分销，佣金由15%提升到30%，享有更高佣金福利。</div>
    </div>
    <div class="illustrate-item" style="background-color: rgba(103,212,189, 0.1);">
      <div class="title" style="background-color: #73E6DD;">服务商</div>
      <div class="content">申请升级为服务商，您将享有更高佣金和权利。</div>
    </div>
  </div>
</template>

<script>
import goBack from '../../components/goBack'
import httpUrls from '../../api/requestURL'

export default {
  name: 'illustrate',
  components: {
    goBack
  },
  mounted() {
    document.title = httpUrls.name
  },
}
</script>

<style scoped>
.illustrate {
  padding: 70px 5% 40px 5%;
  position: relative;
}
.illustrate-item {
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
  padding-top: 30px;
}

.illustrate-item .title {
  padding: 4px;
  display: inline-block;
  border-radius: 10px 0;
  color: #FFFFFF;
  font-size: 16px;
  position: absolute;
  left: 0;
  top: -10px;
}

.illustrate-item .content {
  width: 100%;
}
</style>