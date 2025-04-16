/**
  * 落地页 系统定制
  */
<template>
  <div class="customized">
    <div class="custom-mask">
      <img src="./image/luodiye1.png" alt="" :style="isMobile ? 'width: 100%' : 'width: 500px'">
      <div class="form_mask" id="id_form" ref="id_form">
        <div class="title">请问有什么可以帮到您</div>
        <div class="title">请您填写正确的资料信息，以确保我们能顺利的发送详细资料给您</div>
        <div class="item">
          <div class="title">姓名</div>
          <el-input class="input" placeholder="请输入您的姓名" v-model="form.name"></el-input>
        </div>
        <div class="item">
          <div class="title">电话</div>
          <el-input class="input" placeholder="请输入您的电话号码" v-model="form.phone"></el-input>
        </div>
        <div class="item">
          <div class="title">邮箱</div>
          <el-input class="input" placeholder="请输入您的邮箱地址" v-model="form.email"></el-input>
        </div>
        <button @click="submit" class="button">立即联系</button>

        <div style="margin-top: 20px;">
          <img src="./image/wxchatCode.jpg" alt="" style="width: 250px;margin: 60px auto 0 auto;display: block;padding: 4px;box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);border-radius: 8px;">
          <div style="text-align: center;font-weight: bold;margin-bottom: 30px;margin-top: 10px;">
            <i style="font-size: 24px;">微信扫码咨询</i>
          </div>
        </div>
      </div>
      <img src="./image/luodiye3.png" alt="" style="width: calc(100% - 40px);margin: 0 20px 20px 20px;">
      <img src="./image/luodiye4.png" alt="" style="width: calc(100% - 40px);margin: 0 20px 20px 20px;">

      <div style="height: 64px;"></div>
      <div :class="isMobile ? 'footer-fixed footer-fixed-on' : 'footer-fixed'">
        <div class="item">
          <el-button class="butn" @click="copyText(1)">
            <img class="footer_img" src="./image/wechat.png" alt="">
            <span class="footer_span">微信</span>
          </el-button>
        </div>
        <div class="item">
          <a class="maodian" @click="copyText(2)">
            <img class="footer_img" src="./image/form1.png" alt="">
            <span class="footer_span">提交表单</span>
          </a>
        </div>
        <div class="item">
          <a href="tel:18123810813" class="maodian">
            <img class="footer_img" src="./image/phone2.png" alt="">
            <span class="footer_span">电话</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { business } from '../../api/chatMG'
import httpUrls from '../../api/requestURL'
export default  {
  name: 'customized',
  data() {
    return {
      isMobile: false,
      form: {
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  mounted() {
    document.title = httpUrls.name
    var userAgent = window.navigator.userAgent;
    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var isMobile = false;
    for (var i = 0; i < mobileAgents.length; i++) {
        if (userAgent.indexOf(mobileAgents[i]) > -1) {
            isMobile = true;
            break;
        }
    }
    this.isMobile = isMobile
    if (isMobile) {
      document.getElementsByClassName('custom-mask')[0].style.width = '100%'
    } else {
      document.getElementsByClassName('custom-mask')[0].style.width = '500px'
    }
  },
  methods: {
    submit() {
      console.log('发送成功');
      if (this.form.name == '') {
        this.$message.error('请输入您的姓名')
        return
      }
      if (this.form.phone == '') {
        this.$message.error('请输入您的电话')
        return
      }
      let val = {
          'name': this.form.name,
          'phone': this.form.phone,
          'details': this.form.email
      }

      business(val).then(res => {
          if (res.code == 20000) {
              // console.log(JSON.stringify(res.data),789);
              this.$message.success('提交成功');
              this.userName = '';
              this.phone = '';
              this.remark = '';
              this.isClick = true;
          } else {
              this.isClick = true;
              this.$message.error(res.msg);
          }
      }).catch(err => {
          this.isClick = true;
          this.$message.error('信息提交失败！');
      })
    },
    copyText(id) {
      if (id == 1) {
        var input = document.createElement("input"); // 创建input对象
        input.value = 'xxhmmc1516'; // 设置复制内容
        document.body.appendChild(input); // 添加临时实例
        input.select(); // 选择实例内容
        document.execCommand("Copy"); // 执行复制
        document.body.removeChild(input); // 删除临时实例
        this.$message.success('复制成功！');
      } else if (id == 2) {
        this.$el.querySelector('.form_mask').scrollIntoView({block: 'start',behavior: 'smooth'})
      }
    }
  }
}
</script>

<style scoped>
.customized {
  font-size: 0;
}
.custom-mask {
  margin: 0 auto;
  background-color: #1f64ff;
}
.custom-img {
  width: 100%;
}

.custom-mask .title {
  font-size: 16px;
  text-align: center;
  line-height: 30px;
}

.custom-mask .logo {
  position: fixed;
  top: 0;
  width: 500px;
  display: flex;
  background-color: #ffffff;
  justify-content: flex-start;
  height: 70px;
  margin: 0;
}

.custom-mask .logo-on {
  width: 100%;
}

.custom-mask .logo .logo-img {
  margin: 0;
  height: 100%;
  width: 70px;
}
.custom-mask .logo .logo-img .img {
  width: 70px;
}

.title-list {
  text-align: left;
}

.title-list .title:nth-child(2) {
  font-size: 14px;
  line-height: 16px;
  border: 1px solid #000;
  padding: 0 8px;
  border-radius: 16px;
}

.footer-fixed {
  position: fixed;
  bottom: 0;
  width: 500px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 12px 0;
  height: 40px;
  z-index: 10;
}

.footer-fixed-on {
  width: 100%
}

.footer-fixed .item {
  width: 30%;
  display: flex;
  cursor: pointer;
}
.footer-fixed .item:nth-child(2) {
  justify-content: center;
}
.footer-fixed .item:nth-child(3) {
  justify-content: flex-end;
}

.footer-fixed .item .maodian {
  display: flex;
  justify-content: center;
  background: linear-gradient(#ff9628 0%,  #ff6510 100%);
  border-radius: 20px;
  line-height: 40px;
  padding: 0;
  width: 100%;
  text-decoration: none;
}

.footer-fixed .item .butn {
  background: linear-gradient(#ff9628 0%,  #ff6510 100%);
  border-radius: 20px;
  line-height: 40px;
  padding: 0;
  width: 100%;
}
.footer-fixed .item .butn .footer_img{
  height: 20px;
  margin: auto 0;
  vertical-align: middle;
}

.footer-fixed .item .butn .footer_span {
  vertical-align: middle;
  color: #ffffff;
}
.footer-fixed .item .maodian .footer_img{
  height: 20px;
  margin: auto 0;
  vertical-align: middle;
  margin-right: 4px;
}

.footer-fixed .item .maodian .footer_span {
  vertical-align: middle;
  color: #ffffff;
  font-size: 14px;
}

.form_mask {
  background-color: #ffffff;
  margin: 0 12px;
  border-radius: 6px;
  padding: 20px;
}

.form_mask>.title:nth-child(1) {
  font-size: 22px;
  font-weight: bold;
}
.form_mask>.title:nth-child(2) {
  font-size: 14px;
  color: #cecece;
  margin: 15px 0 20px 0;
}

.form_mask .item {
  display: flex;
  width: 70%;
  justify-content: center;
  margin: 0 auto;
  background-color: rgb(246, 248, 254);
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.form_mask .item .title {
  width: 60px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(56, 85, 254);
}

.form_mask .button {
  margin: 0 auto;
  display: block;
  font-size: 22px;
  width: 70%;
  /* height: 46px; */
  border-radius: 20px;
  border: none;
  background: linear-gradient(#ff9628 0%,  #ff6510 100%);
  color: #ffffff;
  padding: 8px 0;
  cursor: pointer;
}

.services_mask {
  padding: 20px;
}
.services_mask .service_title {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  display: flex;
  /* justify-content: center; */
  position: relative;
  width: 88px;
  margin: 20px auto 12px auto;
}

.services_mask .service_title .line {
  height: 1px;
  width: 22px;
  margin-right: 4px;
  background-color: #f1f1f1;
  position: absolute;
}
.services_mask .service_title .line:nth-child(1) {
  left: 18px;
  bottom: -6px;
}
.services_mask .service_title .line:nth-child(2) {
  left: 44px;
  bottom: -6px;
}
.services_mask .service_item {
  position: relative;
  width: 460px;
  height: 138px;
  margin-bottom: 30px;
}
.services_mask .service_item .img {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
}
.services_mask .service_item .title {
  position: absolute;
  z-index: 3;
  font-size: 20px;
  left: 12px;
  top: 12px;
  color: rgb(255, 125, 23);
}
.services_mask .service_item .title_on {
  position: absolute;
  z-index: 3;
  font-size: 16px;
  left: 12px;
  top: 50px;
  width: 80%;
}

.select_ours {
  background-color: #ffffff;
  margin: 20px;
  border-radius: 12px;
  padding: 30px;
  position: relative;
}

.select_ours .title_img {
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -15px;
}

.select_ours .ours_title {
  font-size: 14px;
  color: #cecece;
  text-align: center;
}
.ours_item {
  display: flex;
  text-align: left;
  height: 68px;
}
.ours_item .ours_img {
  width: 32px;
  height: 32px;
  margin-right: 20px;
}
.ours_item .itme .title {
  font-size: 18px;
  color: #1f64ff;
  text-align: left;
}
.ours_item .itme .title-on {
  font-size: 14px;
  text-align: left;
}
</style>

<style>
.form_mask .item .input input {
  /* width: 300px; */
  height: 32px;
  background-color: rgb(246, 248, 254);
  border: none;
}

</style>