<template>
  <div class="login-wrap" :style="showPayDialog">
      <el-dialog :visible.sync="PayVisible" width="40%" @close="closeDialog" @open="open()" :show-close="false" :modal-append-to-body="false">
          <div class="reg_cont">
              <div class="reg_left">
                  <div style="margin: 0 auto;">
                      <div class="reg_title">
                          <span class="reg_name">金牌分销尊享特权</span>  
                      </div>
                      <div class="tip_text">
                          <img class="tip_img" src="../assets/images/dian.png" alt="">
                          <span class="slove_text">尊贵身份显示</span>
                      </div>
                      <div class="tip_text">
                          <img class="tip_img" src="../assets/images/dian.png" alt="">
                          <span class="slove_text">30%佣金福利</span>
                      </div>
                  </div>

                  <div style="flex: 1;"></div>

                  <div class="left_img">
                      <img class="bot_img" src="../assets/images/pay_tip.png" alt="">
                  </div>
              </div>

              <!-- 右侧内容 -->
              <div class="reg_right">
                  <div class="close" @click="PayVisible = false">
                      <img class="close_img" src="../assets/images/close.png" alt="" style="cursor: pointer;">
                  </div>
                  <!-- 支付 -->
                  <div class="pay_li" v-if="result == 1">
                      <div class="wx_title">
                          <span class="wx_text">{{ payMsg }}</span>
                      </div>

                      <div class="pay_price">
                          <span class="pay_text">支付金额：</span>
                          <span class="pay_type">￥</span>
                          <span class="pay_money">{{ datas.totalPrice }}</span>
                      </div>

                      <div class="pay_code" v-if="payType == '1'">
                          <!-- <img class="pay_code_img" src="../assets/images/code.png" alt=""> -->
                          <div id="qrcode" ref="qrcode"></div>
                      </div>

                      <div class="time" v-if="payType == '1' && resetPay">
                          <span class="time_text">请在<span class="time_dj">{{ minutes }}:{{ secondsCom }}</span>分钟内完成扫码支付</span>
                      </div>

                      <div class="pay_aliy" v-if="payType == '2'">
                          <span class="aliy_text">请前往支付宝收银台支付</span>
                      </div>

                      <div class="select_radio">
                          <el-radio-group v-model="payType" @change="selectRadio">
                              <div class="select_type">
                                  <el-radio  label="1" border v-if="showWechatPay">
                                      <img src="../assets/images/wx_pay.png" alt="">
                                      <span>微信</span>
                                  </el-radio>

                                  <el-radio label="2" border v-if="showApliy">
                                      <img src="../assets/images/zfb_pay.png" alt="">
                                      <span>支付宝</span>
                                  </el-radio>
                              </div>
                         </el-radio-group>
                      </div>
                      
                      <div class="agree">
                          <span class="agree-text">
                              开通会员即代表您接受
                              <span style="color: #1F64FF;" @click="showVIP(1)" v-if="datas.prod_cate_id == '4'">《商品服务协议》</span>
                              <span style="color: #1F64FF;" @click="showVIP(2)" v-else>《商品服务协议》</span>
                          </span>
                      </div>
                  </div> 

                  <!-- 支付完成 -->
                  <div class="pay_end" v-if="result == 2">
                      <img class="end_img" src="../assets/images/pay_end.png" alt="">

                      <div class="end_title">支付成功，感谢您的购买</div>

                      <div class="end_info">
                          <span class="info_l">订单编号：</span>
                          <span class="info_r">{{ info.order_id }}</span>
                      </div>

                      <div class="end_info">
                          <span class="info_l">支付编号：</span>
                          <span class="info_r">{{ info.pay_id }}</span>
                      </div>

                      <div class="end_info">
                          <span class="info_l">支付金额：</span>
                          <span class="info_r" style="color: #EA5050;">{{ info.amount }}元</span>
                      </div>

                      <div class="end_info">
                          <span class="info_l">购买账号：</span>
                          <span class="info_r">{{ username }}</span>
                      </div>

                      <div class="end_info">
                          <span class="info_l">支付方式：</span>
                          <span class="info_r" v-if="info.payment_method == 1">支付宝</span>
                          <span class="info_r" v-if="info.payment_method == 2">微信</span>
                      </div>

                      <div class="end_info">
                          <span class="info_l">支付时间：</span>
                          <span class="info_r">{{ info.created_at }}</span>
                      </div>

                      <div class="finish_btn">
                          <span class="btn_type" @click="closePay">确定</span>
                      </div>
                  </div>
                  
              </div>
          </div>
      </el-dialog>

      <Agree ref="Agree"></Agree>
  </div>
</template>
<script type="text/ecmascript-6">

import { wechat, alipay, payResult } from '../api/chatMG'
import Agree from './Agree'
import QRCode from 'qrcodejs2'
export default {
  name: 'pay',
  props: {
      datas: {
          type: Object,
          default: {}
      },
  },
  data() {
    return {
       PayVisible: false,
       payType: '1',
       payMsg: '微信扫码支付',
       pay_url: '',
       result: 1,
       timer: '',
       info: '',
       loginInfo: '',
       username: '',
       minutes: 10,
       seconds: 0,
       djTime: '',
       showPayDialog: 'display: none',
       showWechatPay: true, // 是否显示微信支付
       showApliy: true,
       resetPay: true,
    }
  },

  components: {
      Agree
  },
  // 创建完毕状态(里面是操作)
  created() {
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(this.loginInfo !== null) {
          this.username = this.loginInfo.user_name
      }
  },

  computed: {
      secondsCom(){
          return this.seconds < 10 ? '0'+ this.seconds : this.seconds
      }
  },
  
  // 里面的函数只有调用才会执行
  methods: {
      showVIP(type) {
        this.$refs.Agree.agreeVisibleParent = true;
        if (type == 1) {
            console.log('触发1')
            this.$refs.Agree.agreeVisibleFive = true
        } else {
            console.log('触发2')
            this.$refs.Agree.agreeVisibleTwo = true
        }
      },
      open() {
          this.payType = '1';
          this.minutes = 10;
          this.seconds = 0;
          console.log(this.datas);
          if (this.datas.resetPay == 1) {
              this.resetPay = false
              this.showPayDialog = 'display: block'
              if (this.datas.payment_method == '1') {
                  this.payMsg = '支付宝扫码支付';
                  this.showWechatPay = false
                  this.showApliy = true
                  this.payType = '2'
                  setTimeout(() => {
                      window.open(this.datas.pay_data);
                  }, 100);
                  this.timer = setInterval(() => {
                      this.getResult(this.datas.order_id)
                  }, 2000)
              } else {
                  this.payType = '1'
                  this.payMsg = '微信扫码支付';
                  this.showApliy = false
                  this.showWechatPay = true
                  setTimeout(() => {
                      document.getElementById('qrcode').innerHTML = '';
                      this.qrCode(this.datas.pay_data);
                      this.timer = setInterval(() => {
                          this.getResult(this.datas.order_id)
                      }, 2000)
                  }, 100);
              }
              console.log(this.PayVisible);
          } else {
              this.getWechat()
          }
      },
      closeDialog() {
          clearInterval(this.timer);  // 结束查询支付轮询
          clearInterval(this.djTime);  //结束十分钟倒计时
          // document.getElementById('qrcode').innerHTML = '';
          this.PayVisible = false; 
          console.log(this.loginInfo.role, 779)
          this.$root.Bus.$emit('loginInfo', 1) // 更新登录信息
          if(this.loginInfo.role == 'guess' && this.result == 2) {
              this.$emit('getPhone', true)
          }
          
      },

      selectRadio(val) {
          // console.log(e, 555);
          if(val == '1') {
              this.minutes = 10;
              this.seconds = 0;
              this.payMsg = '微信扫码支付';
              this.getWechat()
          }
          if(val == '2') {
              clearInterval(this.djTime);
              this.payMsg = '支付宝扫码支付';
              this.getAlipay()
          }
      },

      // 获取微信支付信息
      getWechat() {
          console.log(this.datas);
          clearInterval(this.timer);
          let val = {
              'user_id': this.loginInfo.user_id,
              'prod_id': this.datas.prod_id,
              'prod_cate_id': this.datas.prod_cate_id,
              'prod_name': this.datas.prod_name,
              'total_amount': this.datas.totalPrice,
              'price': this.datas.prod_price,
              'quantity': this.datas.shopNumber
          }
          wechat(val).then(res => {
              if (res.code == 20000) {
                  this.showPayDialog = 'display: block'
                  document.getElementById('qrcode').innerHTML = '';
                  this.qrCode (res.data[0].pay_url);
                  this.timer = setInterval(() => {
                      this.getResult(res.data[0].order_id)
                  }, 2000)
                  console.log(this.timer, 456);
                  this.addTime() // 10分钟倒计时
              } else {
                  this.PayVisible = false
                  this.showPayDialog = 'display: none'
                  this.$message.error(res.msg)
              }
          }).catch(err => {
              console.log(err);
              this.showPayDialog = 'display: none'
              this.$message.error('获取支付信息失败！')
          })
      },

      // 获取支付宝支付信息
      getAlipay() {
          clearInterval(this.timer);
          let val = {
              'user_id': this.loginInfo.user_id,
              'prod_id': this.datas.prod_id,
              'prod_cate_id': this.datas.prod_cate_id,
              'prod_name': this.datas.prod_name,
              'total_amount': this.datas.totalPrice,
              'price': this.datas.prod_price,
              'quantity': this.datas.shopNumber,
              'method': 1,
          }
          alipay(val).then(res => {
              if (res.code == 20000) {
                  this.showPayDialog = 'display: block'
                  window.open(res.data[0].pay_url);
                  this.timer = setInterval(() => {
                      this.getResult(res.data[0].order_id)
                  }, 2000)
              } else {
                  this.showPayDialog = 'display: none'
                  this.PayVisible = false
                  this.$message.error(res.msg)
              }
          }).catch(err => {
              this.showPayDialog = 'display: none'
              this.$message.error('获取支付信息失败！')
          })
      },

      // 根据支付信息生成二维码
      qrCode (url) {
          let qrcode = new QRCode('qrcode', {
              width: 150,
              height: 150,
              //图像宽度        height: 150, //图像高度        colorDark : "#000000", //前景色        colorLight : "#ffffff", //背景色        typeNumber:4,         correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
          })    
          qrcode.clear() //清除二维码 
          qrcode.makeCode(url) //生成另一个新的二维码
      },

      // 查询支付结果
      getResult(order_id) {
          let val = { order_id };
          payResult(val).then(res => {
              if (res.code == 20000) {
                  if(res.data[0].status == 1) {
                      this.info = res.data[0];
                      this.result = 2;
                      this.showApliy = false
                      this.showWechatPay = true
                      clearInterval(this.timer);
                      clearInterval(this.djTime)
                      this.$message.success('支付成功')
                  } else if(res.data[0].status == 2) {
                      clearInterval(this.timer);
                      clearInterval(this.djTime)  
                      this.$message.success('已退款')
                  } else if(res.data[0].status == 3) {
                      clearInterval(this.timer);
                      clearInterval(this.djTime)  
                      this.$message.success('支付失败')
                  } else if(res.data[0].status == 4) {
                      clearInterval(this.timer);
                      clearInterval(this.djTime);  
                      this.$message.success('二维码失效')
                  } else {
                      // clearInterval(this.timer);
                  }
                  
              } else {
                  clearInterval(this.timer);
                  clearInterval(this.djTime);  
                  this.$message.error(res.msg)
              }
          }).catch(err => {
              clearInterval(this.timer);
              this.$message.error('支付失败！')
          })
      },

      // 十分钟倒计时
      addTime() {
          var _this = this
          _this.djTime = setInterval(() => {
              if (_this.seconds == 0 && _this.minutes !== 0) {
                  _this.seconds = 59
                  _this.minutes -= 1
              } else if (_this.minutes == 0 && _this.seconds == 0) {
                  _this.seconds = 0
                  _this.timeShow = false
                  clearInterval(_this.djTime)           
              } else {
                  _this.seconds -= 1
              }
          }, 1000)
      },

      closePay() {
          this.PayVisible = false
          this.$emit('closepay', 1)
          this.result = 1
          this.showWechatPay = true
          this.showApliy = true
      }
      
  }
}
</script>

<style scoped>

    .reg_cont {
      margin: -60px 0 -30px -20px;
      display: flex;
      width: 100%;
    }
    .reg_left {
      width: 35%;
      padding: 40px 20px 0 20px;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #F5F6FA;
    }

    .reg_title {
        display: flex;
        padding-bottom: 25px;
     }
      .reg_img {
          width: 40px;
          height: 40px;
      }
      .reg_name {
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 150%;
          color: #000;
      }

      .reg_tip {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 20px;
        margin-bottom: 10px;
     }

     .tip_text {
        border-radius: 6px;
        display: flex;
        align-items: center;
     }

     .tip_img {
        width: 6px;
        height: 6px;
     }
     .slove_text {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 300%;
        color: #222;
        padding-left: 8px;
     }

      .bot_img {
         width: 205px;
         height: 200px;
      }

      .reg_right {
          width: 65%;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          
      }

      .close {
          text-align: right;
      }
      .close_img {
          width: 16px;
          height: 16px;
      }

      .pay_li {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      }
      .wx_title {
          display: flex;
          justify-content: center;
          align-items: center;
          font-style: normal;
          font-weight: 500;
          font-size: 26px;
          line-height: 150%;
      }
      .wx_text {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          color: #222;
          margin-left: 8px;
      }
      .pay_code {
          display: flex;
          justify-content: center;
          margin: 15px 0;
          width: 158px;
          height: 158px;
          padding: 4px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
      }
      .pay_code_img {
          width: 150px;
          height: 150px;
      }

      .pay_aliy {
          height: 158px;
          display: flex;
          align-items: center;
      }

      .aliy_text {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #EA5050;
      }

      .pay_price {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 10px;
      }
      .pay_text {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #000;
          margin-bottom: 8px;
      }
      .pay_type {
          font-style: normal;
          font-weight: 600;
          font-size: 10px;
          color: #EB504B;
          margin-bottom: 8px;
      }
      .pay_money {
          font-style: normal;
          font-weight: 600;
          font-size: 28px;
          color: #EB504B;
      }

      .time{
          padding: 10px 0;
      }
      .time_text {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          color: #999;
      }
      .time_dj {
          color: #E41E22;
          padding: 0 5px;
      }
      

      .agree {
          display: flex;
          justify-content: center;
          padding-top: 10px;
      }
      .agree-text {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 150%;
          color: #999;
          width: 100%;
          text-align: center;
      }

      .select_radio {
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .select_type {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
      }

      .type_li{
          display: flex;
          align-items: center;
      }

      .radio_pay {
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .pay_img {
          width: 20px;
          height: 20px;
          line-height: 30px;
      }
      .pay_msg {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 150%;
          color: #000;
          line-height: 30px;
      }

      .pay_end {
          display: flex;
          flex-direction: column;
      }

      .end_img {
          width: 60px;
          height: 40px;
          margin: auto;
      }
      .end_title {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          color: #000;
          padding: 8px 0;
          text-align: center;
      }
      .end_info {
          display: flex;
          padding: 5px 0;
          padding-left: 10%;
      }
      .info_l {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 150%;
          color: #A0AEC0;
          letter-spacing: 1px;
      }

      .info_r {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 150%;
          color: #222;
          letter-spacing: 1px;
      }

      .finish_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
      }

      .btn_type {
          background: #1F64FF;
          box-shadow: 1px 4px 10px rgba(31, 100, 255, 0.2);
          border-radius: 10px;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          color: #fff;
          width: 70%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
      }

</style>
<style>
    .login-wrap .el-dialog__body {
      padding: 30px 0 30px 20px !important;
    }

    .el-radio {
          display: flex;
          align-items: center;
          
      }

      .el-radio__label {
          display: flex;
          align-items: center;
          font-size: 14px;
          padding-left: 4px;
          
      }

      .el-radio__label img {
          width: 20px;
          height: 20px;
          padding: 0 8px;
      }
  
      .radio-container {
          display: flex;
          flex-wrap: wrap;
      
      }
      /* .el-dropdown-menu__item {
          margin: 10px;
          padding: 0;
          width: 160px;
      } */

      /* .el-input__suffix-inner {
          line-height: 40px;
      } */

      .el-radio.is-bordered {
          padding: 8px 10px;
      }

</style>
