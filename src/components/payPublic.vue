<template>
  <div class="login-wrap" :style="showPayDialog">
    <el-dialog :visible.sync="PayVisible" width="1112px" @close="closeDialog" @open="dialogOpen" :show-close="false"
      :modal-append-to-body="false" append-to-body>
      <div class="reg_cont">
        <div class="reg_left">
          <img :src='httpUrls.ossUrl + "static/picture/2cb79dfc-3d9a-4b84-b670-91e9f830ca41.png"'
            style="position: absolute;width: 100%;top: 0;height: 100%;margin-right: 10px;">
          <div
            style="margin: 0 auto;position: absolute;left: 50%;transform: translateX(-50%);top: 50px;width: 80%;color: #fff;">
            <img style="display: block;margin: 0 auto;" src="../assets/images/memberLeftIcon.png" alt="">
            <div style="color: #FFF;font-size: 20px;font-weight: 500;text-align: center;margin: 10px 0 20px 0;">{{
              httpUrls.name }} 数字人特权</div>
            <div class="little_title">
              <div class="line"></div>
              <span>PC/小程序通用</span>
              <div class="line"></div>
            </div>
            <div class="tip_text">
              <img class="tip_img" src="../assets/images/whiteDrop.png" alt="">
              <span class="slove_text">更快的响应速度</span>
            </div>
            <div class="tip_text">
              <img class="tip_img" src="../assets/images/whiteDrop.png" alt="">
              <span class="slove_text">优先使用新功能</span>
            </div>
            <div class="tip_text">
              <img class="tip_img" src="../assets/images/whiteDrop.png" alt="">
              <span class="slove_text">更真实的数字人形象</span>
            </div>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="reg_right">
          <div
            style="display: flex;justify-content: space-between;background-color: #D9E5FC;align-items: center;padding: 8px 15px;">
            <div style="display: flex;justify-content: flex-start;">
              <img style="width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;"
                :src="httpUrls.ossUrl + loginInfo.avatar_url" alt="">
              <div>
                <div>{{ loginInfo.user_name }}</div>
                <div>{{ loginInfo.mobile?loginInfo.mobile:'' }}</div>
              </div>
            </div>
            <div class="close" @click="PayVisible = false">
              <img class="close_img" src="../assets/images/close.png" alt="" style="cursor: pointer;">
            </div>
          </div>

          <div v-if="result == 1" v-show="false">
            <div style="padding: 20px;display: flex;">
              <div style="border: 1px solid #1f64ff;padding: 25px 40px;display: flex;flex-direction: column;align-items: center;border-radius: 10px;">
                <div style="font-size: 20px;font-weight: bold;">{{ datas.prod_name }}</div>
                <!-- <div>视频总时长：3分钟</div> -->
                <div style="margin: 20px 0;font-size: 34px;color: #eb504b;font-weight: bold;"><span style="font-size: 16px;">￥</span>{{ datas.totalPrice }}</div>
                <div style="text-decoration: line-through;">￥{{ datas.totalPrice }}</div>
                <!-- <div>￥{{ datas.prod_price }}/{{ datas.prod_details.value }}</div> -->
              </div>
            </div>
          </div>
          <!-- 支付 -->
          <div class="pay_li" v-if="result == 1">
            <div class="pay_code" v-if="payType == '1'">
              <div id="qrcode" ref="qrcode"></div>
            </div>
            <div class="pay_aliy" v-if="payType == '2'">
              <span class="aliy_text">请前往支付宝<br />收银台支付</span>
            </div>
            <div class="pauy_text">
              <div class="select_radio">
                <el-radio-group v-model="payType" @change="selectRadio">
                  <div class="select_type">
                    <el-radio label="1" border v-if="showWechatPay">
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

              <div class="pay_price">
                <!-- <span class="pay_text">支付金额：</span> -->
                <span class="pay_type">￥</span>
                <span class="pay_money">{{ datas.totalPrice }}</span>
              </div>

              <div class="agree">
                <span class="agree-text">
                  开通会员即代表您接受
                  <span style="color: #1F64FF;" @click="showVIP(1)" v-if="datas.prod_cate_id == '4'">《订阅会员协议》</span>
                  <span style="color: #1F64FF;" @click="showVIP(2)" v-else>《订阅会员协议》</span>
                </span>
              </div>
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

    <Register ref="Register"></Register>
  </div>
</template>
<script type="text/ecmascript-6">

import { wechat, alipay, payResult, products, phoneLogin, getCode } from '../api/chatMG'
import httpUrls from '../api/requestURL'

import Register from './register'

import Agree from './Agree'
import QRCode from 'qrcodejs2'
export default {
  name: 'pay',
  props: {
    datas: {
        type: Object,
        default: () => {}
    },
  },
  data() {
    return {
      httpUrls,
      PayVisible: false,
      payType: '1',
      payMsg: '微信扫码支付',
      pay_url: '',
      result: 1, // 支付结果
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
      memberList: [],
      publicList: [],
      // datas: {},
      current: 0,
      memberType: 3
    }
  },

  components: {
    Agree,
    Register
  },

  watch: {
    datas: {
      deep: true,
      handler() {
        this.open()
      }
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.loginInfo !== null) {
      this.username = this.loginInfo.user_name
    }
  },

  computed: {
    secondsCom() {
      return this.seconds < 10 ? '0' + this.seconds : this.seconds
    }
  },

  // 里面的函数只有调用才会执行
  methods: {
    // switchMemberType(type) {
    //   this.memberType = type
    //   let totalPrice = 0
    //   if (type == 3) {
    //     totalPrice = Number((this.memberList[0].prod_price * this.memberList[0].shopNumber).toFixed(2))
    //     this.datas = { ...this.memberList[0], totalPrice };
    //     this.open()
    //   } else {
    //     totalPrice = Number((this.publicList[0].prod_price * this.publicList[0].shopNumber).toFixed(2))
    //     this.datas = { ...this.publicList[0], totalPrice };
    //     this.open()
    //   }
    // },
    showVIP(type) {
      this.$refs.Agree.agreeVisibleParent = true
      if (type == 1) {
        this.$refs.Agree.agreeVisibleFive = true
      } else {
        this.$refs.Agree.agreeVisibleTwo = true
      }
    },
    dialogOpen() {
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.loginInfo !== null) {
        this.username = this.loginInfo.user_name
      }
      console.log(111);
      // this.getMemberList()
    },
    open() {
      this.payType = '1';
      this.minutes = 10;
      this.seconds = 0;
      console.log(this.datas,'输出2');
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
          clearInterval(this.timer)
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
            clearInterval(this.timer)
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
      if (this.loginInfo.role == 'guess' && this.result == 2) {
        this.$emit('getPhone', true)
      }

    },

    selectRadio(val) {
      // console.log(e, 555);
      if (val == '1') {
        this.minutes = 10;
        this.seconds = 0;
        this.payMsg = '微信扫码支付';
        this.getWechat()
      }
      if (val == '2') {
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
        'quantity': this.datas.shopNumber,
      }
      // 数据来源为数字人的需要加live_code
      if (this.datas.dataSource == 'human') {
        val.live_code = this.datas.live_code
      }
      wechat(val).then(res => {
        if (res.code == 20000) {
          this.showPayDialog = 'display: block'
          document.getElementById('qrcode').innerHTML = '';
          this.qrCode(res.data[0].pay_url);
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.getResult(res.data[0].order_id)
          }, 2000)
          console.log(this.timer, 456);
          // this.addTime() // 10分钟倒计时
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
      // 数据来源为数字人的需要加live_code
      if (this.datas.dataSource == 'human') {
        val.live_code = this.datas.live_code
      }
      alipay(val).then(res => {
        if (res.code == 20000) {
          this.showPayDialog = 'display: block'
          window.open(res.data[0].pay_url);
          clearInterval(this.timer)
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
    qrCode(url) {
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
          if (res.data[0].status == 1) {
            this.info = res.data[0];
            this.result = 2;
            this.showApliy = false
            this.showWechatPay = true
            clearInterval(this.timer);
            clearInterval(this.djTime)
            this.$message.success('支付成功')
            this.$emit('payresultsuccess', '成功') // 支付成功后的自定义方法
          } else if (res.data[0].status == 2) {
            clearInterval(this.timer);
            clearInterval(this.djTime)
            this.$message.success('已退款')
          } else if (res.data[0].status == 3) {
            clearInterval(this.timer);
            clearInterval(this.djTime)
            this.$message.success('支付失败')
          } else if (res.data[0].status == 4) {
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
    },

    // 获取会员列表
    getMemberList() {
      let val = {
        'prod_cate_id': [8]
      }
      products(val).then(res => {
        if (res.code == 20000) {
          try {
            let list = [
              { number: '不限次数', dataDate: '三年有效期' },
              { number: '不限次数', dataDate: '一年有效期' },
              { number: '3000次', dataDate: '90天有效期' },
              { number: '1000次', dataDate: '30天有效期' },
              { number: '100次', dataDate: '7天有效期' },
              // {number: '100次', dataDate: '2天有效期'},
            ]
            this.memberList = res.data[8] // 会员
            // this.flowList = res.data[5] // 流量包
            this.publicList = res.data[6] // 通用流量包
            // this.publicList.sort((a, b) => {
            //     return b.prod_price - a.prod_price
            // })
            for (let i = 0; i < this.memberList.length; i++) {
              this.memberList[i] = { ...this.memberList[i], ...list[i], shopNumber: 1 }
            }
            // for (let i = 0; i < this.flowList.length; i++) {
            //     this.flowList[i] = {...this.flowList[i], shopNumber: 1}
            // }
            for (let i = 0; i < this.publicList.length; i++) {
              this.publicList[i] = { ...this.publicList[i], shopNumber: 1 }
            }
            let totalPrice = 0 // 需要付款的价格
            let shopNumber = 1 // 商品数量
            totalPrice = Number((this.memberList[0].prod_price * this.memberList[0].shopNumber).toFixed(2))
            shopNumber = this.memberList[0].shopNumber
            // this.datas = { ...this.memberList[0], totalPrice, shopNumber };
            this.open()

          } catch (error) {
            console.log(error);
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error('获取失败！')
      })
    },

    payMemberMoney(item, index) {
      let loginInfo = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(loginInfo);
      if (loginInfo.role == 'guess') {
        this.$refs.Register.registerVisible = true
        return
      }
      console.log(item);
      let totalPrice = 0 // 需要付款的价格
      let shopNumber = 1 // 商品数量
      totalPrice = Number((item.prod_price * item.shopNumber).toFixed(2))
      shopNumber = item.shopNumber
      // this.datas = { ...item, totalPrice, shopNumber };
      this.current = index
      this.open()
    },
  }
}
</script>

<style scoped lang="scss">
.member_type-title {
  display: flex;

  .item {
    width: 100%;
    color: #555557;
    font-size: 16px;
    font-weight: 500;
    background-color: #F0F4FE;
    padding: 14px 0;
    text-align: center;
    cursor: pointer;
  }
}

.top_text-valid {
  background: #FACD91;
  background: linear-gradient(135deg, #80A7FF 0%, #4D83FF 100%);
  border-radius: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #FFFFFF;
  padding: 4px 20px;
}

.cont_top {
  height: 25px;
  display: flex;
  justify-content: flex-start;
}

.mem_cont {
  display: flex;
  /* width: 80%; */
  cursor: pointer;
  /* padding: 0 10%; */
  flex-wrap: wrap;
}

.mem_cont .cont {
  width: calc(25% - 22px);
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
  border-radius: 10px;
  margin: 10px;
  transition: all .2s;
  border: 1px solid #EDEEF0;
}

.mem_cont .cont:hover {
  transform: scale(1.05);
}

.little_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.little_title .line {
  width: 20%;
  height: 1px;
  background-color: #FFF;
}

.cont_title {
  color: #333;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
  margin: 28px 0 2px 0;
}

.cont_price {
  display: flex;
  justify-content: center;
  color: #EB504B;
  font-size: 34px;
  line-height: 34px;
  align-items: flex-end;
  font-weight: bold;
}

.cont_btn {
  text-align: center;
  border-radius: 0px 0px 10px 10px;
  background: #EDEEF0;
  padding: 7px 0;
  width: 100%;
}

.reg_cont {
  margin: -60px -20px -30px -20px;
  display: flex;
  width: 1112px;
}

.reg_left {
  width: 312px;
  /* padding: 40px 20px 0 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border-right: 2px solid #F5F6FA; */
  position: relative;
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
  color: #fff;
  padding-left: 8px;
}

.bot_img {
  width: 205px;
  height: 200px;
}

.reg_right {
  width: 800px;
  /* padding: 20px 0; */
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
  /* flex-direction: column; */
  /* align-items: center; */
  justify-content: flex-start;
  padding-top: 30px;
  margin-top: 30px;
  padding-left: 10px;
  border-top: 1px solid #EEEEF0;
}

.pauy_text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  /* margin: 15px 0; */
  width: 158px;
  height: 158px;
  /* padding: 4px; */
  margin-right: 25px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #EEEEF0;
}

.pay_code_img {
  width: 150px;
  height: 150px;
}

.pay_aliy {
  height: 158px;
  width: 158px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dedede;
  margin-bottom: 30px;
  margin-right: 30px;
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
  justify-content: flex-start;
  /* padding: 10px; */
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
  font-size: 18px;
  line-height: 20px;
  color: #EB504B;
  margin-bottom: 20px;
}

.pay_money {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 40px;
  margin: 10px 0 20px 0;
  color: #EB504B;
}

.time {
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
  justify-content: flex-start;
  padding-top: 10px;
}

.agree-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #999;
  width: 100%;
  /* text-align: center; */
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
  /* padding: 20px 0; */
}

.type_li {
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
  padding: 50px 0 100px 0;
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

.el-radio.is-bordered {
  padding: 8px 10px;
}
</style>