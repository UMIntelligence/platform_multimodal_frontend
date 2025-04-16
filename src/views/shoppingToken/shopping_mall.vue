<template>
  <div class="main">
    <!-- 背景图片 -->
    <img class="bg_img"
      src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319556@2xasas.png" />
    <!-- 头部 -->
    <header>
      <div>
        <span>无忧秘书AI商城</span>
        <span>解锁更多可能</span>
      </div>
      <div>-聚合AI应用，AI数字人创作服务，在此打造个性化智能体验-</div>
    </header>
    <!-- 主体内容 -->
    <main>
      <div class="contents">
        <div class="content-title">AI会员套餐<span style="cursor: pointer;" @click="$router.push('/index')">了解无忧秘书产品</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in memberList" :key="item.prod_id">
            <div class="content-box">
              <div class="box_title">
                <div class="box_title_1">{{ item.prod_name }}</div>
                <div class="box_title_2">{{ item.prod_desc.count }}</div>
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Mask group@2xasdsa.png"
                  alt="" v-if="index == 0" />
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319577@2xljh2.png"
                  alt="" v-else-if="index == 1" />
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319576@2xljh3.png"
                  alt="" v-else-if="index == 2" />
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319576@2x (1)ljh4.png"
                  alt="" v-else />
              </div>
              <div class="box-content">
                <div class="box_row_1">
                  <span class="text_r">￥{{ item.prod_price }}</span>
                  <span class="text_b">/{{ item.prod_details.value }}</span>
                </div>
                <div class="box_row_2">{{ item.prod_desc.valid }}</div>
                <div class="box_row_3 btn_green" v-if="index == 0" @click="payMemberMoney(item, index)">
                  立即购买
                </div>
                <div class="box_row_3 btn_blue" v-else-if="index == 1" @click="payMemberMoney(item, index)">
                  立即购买
                </div>
                <div class="box_row_3 btn_orange" v-else-if="index == 2" @click="payMemberMoney(item, index)">
                  立即购买
                </div>
                <div class="box_row_3 btn_purple" v-else @click="payMemberMoney(item, index)">
                  立即购买
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="contents">
        <div class="content-title">算力加油包</div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in publicList" :key="index">
            <div class="content-box">
              <div class="box_title">
                <div class="box_title_1">{{ item.prod_name }}</div>
                <div class="box_title_2">{{ item.prod_desc.count }}</div>
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319577@2xljh2.png"
                  alt="" v-if="index == 0" />
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319576@2xljh3.png"
                  alt="" v-else-if="index == 1" />
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319576@2x (1)ljh4.png"
                  alt="" v-else />
              </div>
              <div class="box-content">
                <div class="box_row_1">
                  <div v-if="item.prod_id != 51">
                    <span class="text_r">￥{{ item.prod_price }}</span>
                    <span class="text_b"></span>
                  </div>
                  <div class="money_input" v-else>
                    <div>
                      <el-input v-model="money" @input="inputChange(item, index)" ref="saveTagInput"
                        placeholder="请输入内容"></el-input>
                    </div>
                    <div>元</div>
                  </div>
                </div>
                <div class="box_row_2" v-if="item.prod_id != 51">{{ item.prod_desc.valid }}</div>
                <div class="box_row_2" v-else>{{ money * 10000 }}通用算力</div>
                <div class="box_row_3 btn_blue" v-if="index == 0" @click="payMemberMoney(item, index)">
                  立即购买
                </div>
                <div class="box_row_3 btn_orange" v-else-if="index == 1" @click="payMemberMoney(item, index)">
                  立即购买
                </div>
                <div class="box_row_3 btn_purple" v-else @click="payMemberMoney(item, index)">
                  立即购买
                </div>
                <div class="line"></div>
                <div class="box_row_4">
                  <div style="color: #000000" class="text_c">{{ item.prod_details.value }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="contents">
        <div class="content-title">AI创作服务<span style="cursor: pointer;"
            @click="$router.push('/digitizedHuman/index')">了解AI创作服务</span></div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in figureList" :key="index">
            <div class="content-box">
              <div class="box_title">
                <div class="box_title_1">{{ item.prod_name }}</div>
                <div class="box_title_2">{{ item.prod_desc.count }}</div>
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319577@2xljh2.png"
                  alt="" />
              </div>
              <div class="box-content">
                <div class="box_row_2" style="color: #000; font-weight: 600; margin: 0 0 10px 0;">{{
                  item.prod_desc.valid }}</div>
                <div class="box_row_1">
                  <div>
                    <span class="text_r">￥{{ item.prod_price }}</span>
                    <span class="text_b"></span>
                  </div>
                </div>
                <div class="box_row_3 btn_blue"  @click="payMemberMoney(item, index)">立即购买</div>
                <div class="line"></div>
                <div class="box_row_4">
                  <div style="color: #000000" class="text_c">{{ item.prod_details.value }}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content-box">
              <div class="box_title">
                <div class="box_title_1">数字人订制</div>
                <div class="box_title_2">为企业提供专属数字人定制服务</div>
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319577@2xljh2.png"
                  alt="" />
              </div>
              <div class="box-content">
                <div class="box_row_1">

                  <div style="height: 40px">
                    <span style="font-size: 13px">
                      虚拟数字人定制、AI短视频内容生产和数字人直播一站式解决方案。
                    </span>
                  </div>
                </div>
                <div class="box_row_2"></div>
                <div class="box_row_3 btn_blue" @click="$router.push('/collaborate/collaborateNew')">联系我们</div>
                <div class="line" style="background: #fff;"></div>
                <div class="box_row_4">
                  <div style="color: #000000" class="text_c"></div>
                </div>

              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </main>
    <el-dialog :title="dialogTitle" :before-close="closeDialog_1" :visible.sync="payVisible" width="30%">
      <div class="payDialog">
        <div>
          <el-radio-group v-model="payType">
            <div class="select_type">
              <el-radio label="1">
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Frame_success.png"
                  alt="" />
                <div>微信支付</div>
              </el-radio>

              <el-radio label="2">
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319080.png"
                  alt="" />
                <div>支付宝支付</div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
        <div>
          <span>¥</span>
          <span>{{ pay_price }}</span>
        </div>
        <div>
          <span>购买即视为认同</span>
          <span @click="showVIP(1)">《商品服务协议》</span>
        </div>
        <div @click="handlePay()">扫码付款</div>
      </div>
    </el-dialog>
    <el-dialog :title="dialogTitle" :before-close="closeDialog_2" :visible.sync="qrcodeVisible" width="30%">
      <div class="codeVisible">
        <div>
          <span>¥</span>
          <span>{{ pay_price }}</span>
        </div>
        <div>订单编号：{{ order_id }}</div>
        <div id="qrcode" ref="qrcode"></div>
      </div>
    </el-dialog>
    <Agree ref="Agree"></Agree>
    <!-- 注册组件 -->
    <Register ref="Register"></Register>
  </div>
</template>
<script>
import {
  wechat,
  alipay,
  payResult,
  products,
  phoneLogin,
  getCode,
} from "../../api/chatMG";
import httpUrls from "../../api/requestURL";

import Register from "../../components/register";

import Agree from "@/components/Agree";
import GoBack from "../../components/goBack";
import QRCode from "qrcodejs2";

export default {
  name: "shoppingToken",
  data() {
    return {
      qrcodeVisible: false,
      payVisible: false,
      order_id: null, //订单编号
      httpUrls,
      payType: "1",
      pay_url: "",
      timer: "",
      info: "",
      loginInfo: "",
      username: "",
      minutes: 10,  //十分钟倒计时计算单位
      seconds: 0,   //十分钟倒计时计算单位
      djTime: "",   //十分钟定时器
      resetPay: true,
      memberList: [],
      publicList: [],
      figureList: [],
      datas: {},
      datasOne: {},
      datasTwo: {},
      current: 0,
      memberType: 3,
      money: 1,
      dialogTitle: '',
      pay_price: 0,
      payInfo: ''
    };
  },

  components: {
    Agree,
    Register,
    GoBack,
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.closeDialog_1();
    this.closeDialog_2();
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.loginInfo !== null) {
      this.username = this.loginInfo.user_name;
    }
    if (this.loginInfo !== null) {
      this.username = this.loginInfo.user_name;
    }
    this.getMemberList();
    // this.dialogOpen();
  },

  // 里面的函数只有调用才会执行
  methods: {
    //前往支付
    handlePay() {
      if (this.payType == 1) {
        this.qrcodeVisible = true;
        this.minutes = 10;
        this.seconds = 0;
        this.getWechat();   //前往微信支付
      } else {
        clearInterval(this.djTime);
        this.getAlipay();   //前往支付宝支付
      }
    },
    // 打开协议弹窗
    showVIP(type) {
      this.$refs.Agree.agreeVisibleParent = true;
      if (type == 1) {
        this.$refs.Agree.agreeVisibleFive = true;
      } else {
        this.$refs.Agree.agreeVisibleTwo = true;
      }
    },
    //选择支付方式弹窗
    closeDialog_1() {
      this.payVisible = false;
      clearInterval(this.timer); // 结束查询支付轮询
      clearInterval(this.djTime); //结束十分钟倒计时
      this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
      if (this.loginInfo.role == "guess") {
        this.$emit("getPhone", true);
      }
    },
    //支付弹窗
    closeDialog_2() {
      this.qrcodeVisible = false;
      clearInterval(this.timer); // 结束查询支付轮询
      clearInterval(this.djTime); //结束十分钟倒计时
      // document.getElementById('qrcode').innerHTML = '';
      // console.log(this.loginInfo.role, 779)
      this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
      if (this.loginInfo.role == "guess") {
        this.$emit("getPhone", true);
      }
    },

    // 获取微信支付信息
    getWechat() {
      clearInterval(this.timer);
      let val = {
        user_id: this.loginInfo.user_id,
        prod_id: this.payInfo.prod_id,
        prod_cate_id: this.payInfo.prod_cate_id,
        prod_name: this.payInfo.prod_name,
        total_amount: this.payInfo.prod_id == 51 ? this.money : this.payInfo.prod_price,
        price: this.payInfo.prod_price,
        quantity: this.payInfo.prod_id == 51 ? this.money : 1,  //如果是自定义金额商品
      };
      wechat(val)
        .then((res) => {
          if (res.code == 20000) {
            document.getElementById("qrcode").innerHTML = "";
            this.qrcode(res.data[0].pay_url);
            clearInterval(this.timer);
            this.order_id = res.data[0].order_id;
            this.timer = setInterval(() => {
              this.getResult(res.data[0].order_id);
            }, 2000);
            // console.log(this.timer, 456);
            // this.addTime() // 10分钟倒计时
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          // console.log(err);
          this.$message.error("获取支付信息失败！");
        });
    },

    // 前往支付宝支付
    getAlipay() {
      clearInterval(this.timer);
      let val = {
        user_id: this.loginInfo.user_id,
        prod_id: this.payInfo.prod_id,
        prod_cate_id: this.payInfo.prod_cate_id,
        prod_name: this.payInfo.prod_name,
        total_amount: this.payInfo.prod_id == 51 ? this.money : this.payInfo.prod_price,
        price: this.payInfo.prod_price,
        quantity: this.payInfo.prod_id == 51 ? this.money : 1,  //如果是自定义金额商品
        method: 1,
      };
      alipay(val)
        .then((res) => {
          if (res.code == 20000) {
            window.open(res.data[0].pay_url);
            clearInterval(this.timer);
            this.order_id = res.data[0].order_id;
            this.timer = setInterval(() => {
              this.getResult(res.data[0].order_id);
            }, 2000);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取支付信息失败！");
        });
    },

    // 根据支付信息生成二维码
    qrcode(url) {
      let qrcode = new QRCode("qrcode", {
        width: 150, //二维码宽高
        height: 150,
      });
      qrcode.clear(); //清除之前的二维码
      qrcode.makeCode(url); //生成另一个新的二维码
    },

    // 查询支付结果
    getResult(order_id) {
      let val = { order_id };

      payResult(val)
        .then((res) => {
          if (res.code == 20000) {
            if (res.data[0].status == 1) {
              this.info = res.data[0];
              clearInterval(this.timer);
              clearInterval(this.djTime);
              this.payVisible = false;
              this.qrcodeVisible = false;
              this.$message.success("支付成功");
            } else if (res.data[0].status == 2) {
              clearInterval(this.timer);
              clearInterval(this.djTime);
              this.$message.success("已退款");
            } else if (res.data[0].status == 3) {
              clearInterval(this.timer);
              clearInterval(this.djTime);
              this.$message.success("支付失败");
            } else if (res.data[0].status == 4) {
              clearInterval(this.timer);
              clearInterval(this.djTime);
              this.$message.success("二维码失效");
            } else {
              // clearInterval(this.timer);
            }
          } else {
            clearInterval(this.timer);
            clearInterval(this.djTime);
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          clearInterval(this.timer);
          this.$message.error("支付失败！");
        });
    },

    // 十分钟倒计时
    addTime() {
      var _this = this;
      _this.djTime = setInterval(() => {
        if (_this.seconds == 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes == 0 && _this.seconds == 0) {
          _this.seconds = 0;
          _this.timeShow = false;
          clearInterval(_this.djTime);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },

    // 获取会员列表
    getMemberList() {
      let val = {
        prod_cate_id: [200, 201, 202],
      };
      products(val)
        .then((res) => {
          if (res.code == 20000) {
            try {
              this.memberList = res.data[200]; // 会员
              this.publicList = res.data[201]; // 通用流量包
              this.figureList = res.data[202]; // 通用流量包
            } catch (error) {
              // console.log(error);
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    //点击商品列表获取二维码
    payMemberMoney(item, index) {
      // console.log(index)
      let loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(loginInfo);
      if (loginInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return;
      }

      this.payVisible = true;
      this.dialogTitle = item.prod_name
      this.pay_price = item.prod_id == 51 ? this.money : item.prod_price;

      this.payInfo = item
    },
    // 输入框
    inputChange(item, index) {
      let number = parseInt(this.money);
      // ^ [1-9]\d*$
      if (!/^[-+]?[1-9]\d*$/.test(number)) {
        this.$message({
          message: "请正确输入！！",
          type: "warning",
        });
        this.money = 1;
        return;
      };
      this.pay_price = this.money;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;
  padding-top: 50px;
  background: #f6f8fa;

  .bg_img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0px;
    z-index: 2;
  }

  header {
    text-align: center;
    position: relative;
    z-index: 4;

    div:first-child {
      font-size: 44px;
      font-weight: 600;
      font-style: normal;

      span:first-child {
        background: linear-gradient(0deg, #0d99ff 0%, #2263ff 54%, #1759ff 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-right: 5px;
      }
    }

    div:last-child {
      font-weight: 400;
      font-size: 16px;
      color: #585e67;
      margin-top: 5px;
    }
  }

  main {
    width: 100%;
    // position: relative;
    position: relative;
    z-index: 4;
    padding-bottom: 50px;

    .bg_color {
      width: 100%;
      position: absolute;
      top: 200px;
    }

    .contents {
      width: 75%;
      min-width: 1078px;
      margin: auto;
      margin-top: 50px;

      .content-title {
        font-weight: 600;
        font-size: 20px;
        color: #000000;
        margin-bottom: 20px;

        span {
          font-weight: 400;
          font-size: 16px;
          color: #1f64ff;
          margin-left: 20px;
        }
      }

      .content-box {
        width: 100%;
        max-width: 290px;
        border-radius: 20px;
        position: relative;
        top: 0px;
        transition: all 0.6s;
        border: 1px solid #e6e6e6;
        overflow: hidden;
        cursor: pointer;

        .box_title {
          width: 100%;
          padding: 30px 20px;
          box-sizing: border-box;
          position: relative;
          color: #fff;

          .box_title_1 {
            font-weight: 600;
            font-size: 24px;
            position: relative;
            z-index: 5;
          }

          .box_title_2 {
            font-weight: 600;
            font-size: 14px;
            margin-top: 8px;
            position: relative;
            z-index: 5;
            height: 35px;
          }

          img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            // z-index: -1;
          }
        }

        .box-content {
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
          background: #fff;

          .box_row_1 {
            .text_r {
              font-weight: 600;
              font-size: 30px;
              color: #fa001e;
            }

            .text_b {
              font-weight: bold;
              font-size: 16px;
              color: #000000;
            }

            .money_input {
              display: flex;
              align-items: center;
              justify-content: space-between;

              >div:first-child {
                width: calc(100% - 20px - 15px);
              }

              >div:last-child {
                width: 20px;
              }
            }
          }

          .box_row_2 {
            font-weight: 400;
            font-size: 14px;
            color: #666666;
            margin-top: 10px;
            height: 20px;
          }

          .box_row_3 {
            width: 100%;
            padding: 9px 0px;
            text-align: center;
            box-sizing: border-box;
            color: #fff;
            border-radius: 8px 8px 8px 8px;
            margin: 20px 0px;
          }

          .btn_green {
            background: linear-gradient(90deg, #00d15d 0%, #57d500 100%);
          }

          .btn_blue {
            background: linear-gradient(90deg, #1e56ff 0%, #2c8dff 100%);
          }

          .btn_orange {
            background: linear-gradient(90deg, #ff6711 0%, #ffa704 100%);
          }

          .btn_purple {
            background: linear-gradient(90deg, #1b0557 0%, #110e87 100%);
          }

          .line {
            width: 100%;
            height: 1px;
            background: #f4f4f4;
          }

          .box_row_4 {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
            padding-bottom: 20px;
            box-sizing: border-box;
            height: 20px;

            >div {
              text-align: start;
              margin-bottom: 10px;
              font-weight: 400;
              font-size: 12px;
              color: #000000;
            }

            .text_c {
              text-align: center !important;
            }
          }
        }
      }

      .content-box:hover {
        top: -20px;
        box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.payDialog {
  position: relative;
  padding-bottom: 40px;
  box-sizing: border-box;

  .select_type {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 20px 0; */
  }

  .el-radio {
    display: flex;
    align-items: center;
  }

  /deep/ .el-radio__label {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 4px;
  }

  .el-radio__label img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }

  .el-radio__label div {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
  }

  .radio-container {
    display: flex;
    flex-wrap: wrap;
  }

  .el-radio.is-bordered {
    padding: 8px 10px;
  }

  >div:nth-child(2) {
    font-weight: 600;
    color: #ea3323;
    margin: 16px 0px;

    span:first-child {
      font-size: 16px;
    }

    span:last-child {
      font-size: 40px;
    }
  }

  >div:nth-child(3) {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    span:first-child {
      color: #999;
      font-weight: 400;
      font-size: 12px;
    }

    span:last-child {
      color: #3363f6;
      font-weight: 400;
      font-size: 12px;
      cursor: pointer;
    }
  }

  >div:last-child {
    width: 120px;
    background: #3363f6;
    border-radius: 4px 4px 4px 4px;
    padding: 8px 0px;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
    text-align: center;
    position: absolute;
    right: 20px;
    bottom: 0px;
  }
}

.codeVisible {
  >div:nth-child(1) {
    font-weight: 600;
    color: #ea3323;
    margin: 16px 0px;
    text-align: center;

    span:first-child {
      font-size: 16px;
    }

    span:last-child {
      font-size: 40px;
    }
  }

  >div:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    margin: 10px 0px;
    text-align: center;
  }

  >div:nth-child(3) {
    width: 168px;
    height: 168px;
    margin: auto;
  }
}

/deep/ .el-dialog__body {
  /* padding: 30px 0 30px 20px !important; */
  padding-right: 0px;
}
</style>
