/** * 个人中心 */
<template>
  <div class="container">
    <div>
      <!-- 个人信息 -->
      <div class="information">
        <!-- 标题 -->
        <div>
          <div>个人中心</div>
          <div style="cursor: pointer" @click="$router.push('/center/edit')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.4226 11C21.7799 11.6188 21.7799 12.3812 21.4226 13L17.5773 19.6603C17.2201 20.2791 16.5598 20.6603 15.8453 20.6603L8.1547 20.6603C7.44017 20.6603 6.77991 20.2791 6.42265 19.6603L2.57735 13C2.22008 12.3812 2.22008 11.6188 2.57735 11L6.42265 4.33974C6.77992 3.72094 7.44017 3.33974 8.1547 3.33974L15.8453 3.33975C16.5598 3.33975 17.2201 3.72094 17.5774 4.33975L21.4226 11Z"
                stroke="#333333"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <circle cx="12" cy="12" r="3" stroke="#333333" stroke-width="2" />
            </svg>
            <div>编辑个人资料</div>
          </div>
        </div>
        <div class="information-content">
          <div>
            <img :src="httpUrls.ossUrl + userInfo.avatar_url" alt="" />
            <div>
              <div>{{ userInfo.nick_name }}</div>
              <div>
                <span v-if="userInfo.mobile">{{ userInfo.mobile }}</span>
                <button
                  v-else
                  @click="$store.dispatch('app/changePhoneDialogVisible', true)"
                  style="
                    border-radius: 3px;
                    padding: 5px 8px;
                    cursor: pointer;
                    color: white;
                    background: rgb(64, 158, 255);
                    border: 0px;
                  "
                >
                  绑定手机号
                </button>
              </div>
              <!-- <span @click="userInfo.is_real_name==1?realName():''" :style="userInfo.is_real_name==1?'color: red;cursor: pointer;':'color: green;'">{{userInfo.is_real_name==1?'去认证':'已认证'}}</span> -->
              <!-- <div>
                实名认证：
                <el-popover
                  placement="right"
                  width="190"
                  ref="popover"
                  trigger="click"
                  @show="resultRealName"
                >
                  <div style="padding: 15px">
                    <img
                      style="width: 160px; height: 160px"
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
                      "
                      alt=""
                    />
                    <div style="text-align: center">请前往小程序端进行实名认证</div>
                  </div>
                  <span
                    slot="reference"
                    :style="
                      userInfo.is_real_name == 1
                        ? 'color: red;cursor: pointer;'
                        : 'color: green;'
                    "
                    >{{ userInfo.is_real_name == 1 ? "去认证" : "已认证" }}</span
                  >
                </el-popover>
              </div> -->
            </div>
          </div>
          <div class="line"></div>
          <div>
            <div>账户算力余额</div>
            <div
              style="cursor: pointer"
              @click="$router.push('/residueNumber/residueNumber')"
            >
              {{countToken}}
            </div>
          </div>
          <div class="line"></div>
          <div>
            <div @click="$router.push('/shoppingMall')">
              <img
                :src="
                  httpUrls.ossUrl + 
                  'static/picture/31bbed1d-a40e-4ff3-80a8-7d7f58f4c482.png'
                "
                alt=""
              />
              <div>充值中心</div>
            </div>
            <div @click="$router.push('/change/change')">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/cd9cf508-22ad-43dd-89f0-26664d2c5490.png'
                "
                alt=""
              />
              <div>卡密兑换</div>
            </div>
            <div @click="$router.push('/mineDistribution/mineDistribution')">
              <img
                :src="
                  httpUrls.ossUrl +
                  'static/picture/7aa094ca-625f-4970-8aa7-de2f92f3ea12.png'
                "
                alt=""
              />
              <div>我要分销</div>
            </div>
          </div>
        </div>
      </div>
      <div class="column" v-for="item in columnData" :key="item.title">
        <div>{{ item.title }}</div>
        <div>
          <div v-for="child in item.arr" :key="child.text" @click="toPage(child)">
            <img :src="httpUrls.ossUrl + child.img" alt="" />
            <div v-if="child.text != '小程序'">{{ child.text }}</div>
            <div v-else>
              <el-popover placement="right" width="190" ref="popover" trigger="click">
                <div style="padding: 15px">
                  <img
                    style="width: 160px; height: 160px"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
                    "
                    alt=""
                  />
                  <div style="text-align: center">扫一扫体验小程序</div>
                </div>
                <span slot="reference">{{ child.text }}</span>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
      <pay ref="Pay"></pay>
    </div>
    <!-- <Register ref="Register"></Register> -->
  </div>
</template>

<script>
import {
  chatAllDelete,
  getUserInfo,
  editName,
  bindPhone,
  getCode,
  getRealName,
  resultRealName,
} from "../../api/chatMG";
import getImageCode from "../../components/getImageCode";

import Register from "../../components/register";
import { mapGetters } from "vuex";
import httpUrls from "../../api/requestURL";

import pay from "../../components/pay";

export default {
  name: "center",
  data() {
    return {
      ticket: "",
      randstr: "",
      httpUrls,
      bindVisible: false,
      bindUserName: false,

      // 手机号绑定
      ismobile: false,
      phoneMsg: "",
      phone: "",

      iscode: false,
      codeMsg: "",
      code: "",

      userName: "",
      isUser: false,
      userMsg: "",

      countDown: 0,
      downTimer: "",

      isClick: true,

      userInfo: "",
      gptThree: {},
      gptFour: {},
      delleTwo: {},
      baidu: {},
      // username: '游客'
      showCenterTitle: false,
      columnData: [
        {
          title: "使用记录",
          arr: [
            {
              img: "static/picture/33ea33ed-6afe-47a2-9e92-be27e557a6a8.png",
              text: "创作中心",
              path: "/mineRole/mineRole",
            },
            {
              img: "static/picture/ba8e9386-d231-454e-a7c9-077f54d29877.png",
              text: "历史会话",
              path: "/center/History",
            },
            // {
            //   img: "static/picture/a59cb25e-5919-4af6-9382-057cac60f0cb.png",
            //   text: "最近打开",
            // },
          ],
        },
        {
          title: "我的分销",
          arr: [
            {
              img: "static/picture/1eb6b0df-7932-4e2a-9336-5f6df94ee4d3.png",
              text: "分销",
              path: "/mineDistribution/mineDistribution",
            },
            {
              img: "static/picture/cb5be0b2-25a8-4ebf-a611-13f0009b3a03.png",
              text: "邀请成员",
              path: "/share/share",
            },
          ],
        },
        {
          title: "战略合作",
          arr: [
            {
              img: "static/picture/7dc4dffe-f5eb-404a-a39a-ce724c0d20cb.png",
              text: "服务商",
              path: "/chatServe",
            },
            {
              img: "static/picture/36276cbb-c712-4c6e-90c7-2d4718bfde2e.png",
              text: "企业AI定制",
              path: "/enterpriseWEB/indexList/enterpriseSet",
            },
            {
              img: "static/picture/b5399495-319a-44dc-bb41-a43eeb0dfca6.png",
              text: "商务合作",
              path: "/collaborate/collaborate",
            },
          ],
        },
        {
          title: "使用方式",
          arr: [
            {
              img: "static/picture/f8224acd-4435-4968-85e3-4ff44f9002ba.png",
              text: "关注公众号",
            },
            {
              img: "static/picture/fba4a5c4-2fb0-49f6-abed-8bb2d9df36c4.png",
              text: "小程序",
            },
            {
              img: "static/picture/0b73042a-bbf1-45fd-b93c-14f47ba23a19.png",
              text: "H5链接",
            },
            // {
            //   img: "static/picture/b51db17a-af6c-431e-99ac-410218a01b4d.png",
            //   text: "PC链接",
            // },
          ],
        },
        {
          title: "系统通知",
          arr: [
            {
              img: "static/picture/7a494572-df72-42ff-865e-6048041cdf7b.png",
              text: "公告通知",
              path: "/noticeIndex/index",
            },
            {
              img: "static/picture/cd13b374-dc5c-4648-a3d5-3f462eecdcbc.png",
              text: "问题反馈",
              path: "/opinion/opinion",
            },
            {
              img: "static/picture/6f1c0c00-37c9-4767-be95-508cb68f3b74.png",
              text: "版本信息",
              path: "/noticeIndex/index",
            },
          ],
        },
        {
          title: "充值/计费",
          arr: [
            {
              img: "static/picture/56109468-1e9d-4806-bfa0-987287a211ef.png",
              text: "充值中心",
              path:"/shoppingMall"
            },
            {
              img: "static/picture/47c62cff-898b-4059-b4fe-b402a2fd3a94.png",
              text: "卡密兑换",
              path: "/change/change",
            },
            {
              img: "static/picture/00b72b52-5dac-4ab0-8c47-888f34c76c54.png",
              text: "订单记录",
              path: "/order/Order",
            },
            {
              img: "static/picture/a3621513-e14a-4042-910c-a6f04545027e.png",
              text: "计费中心",
              path: "/residueNumber/residueNumber",
            },
          ],
        },
      ],
      realToken: "",
      realTime: null, //定时器
      realBool: false, //判断是否启动定时器
    };
  },
  // 注册组件
  components: {
    Register,
    pay,
    getImageCode,
  },

  computed: {
    ...mapGetters(["userInfoData"]),
    countToken(){
      let money = 0;
      if(this.userInfo){
        money = parseInt(this.userInfo.hash_rates.total);
      }
      if(money.length >= 7){
        money = (money / 10000) + 'w'
      }
      return money
    }
  },

  watch: {
    userInfoData: {
      deep: true,
      handler() {
        this.getUserInfo();
      },
    },
  },

  /**
   * 创建完毕
   */
  created() {
    this.getUserInfo();
  },

  mounted() {
    let showTitle = sessionStorage.getItem("closeCenterTitle");
    if (showTitle == "true") {
      this.showCenterTitle = false;
    } else {
      this.showCenterTitle = true;
    }
    document.title = httpUrls.name;
  },
  beforeDestroy() {
    console.log("进入销毁生命周期");
    clearInterval(this.realTime);
    this.realBool = false;
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // realName(){
    //   let requestData = {
    //     success_url:window.location.href,
    //     failed_url:window.location.href,
    //   }
    //   getRealName(requestData).then(res => {
    //     console.log(res,'认证')
    //     if(res.code == 20000){
    //       window.open(res.data.url)
    //       this.realToken = res.data.verify_token;
    //       this.realTime = setInterval(() => {   //开启定时器查询实名认证结果
    //         resultRealName({verify_token:this.realToken}).then(r => {
    //           if (r.data.success == true) {
    //             clearInterval(this.realTime)
    //             this.$message.success('认证成功')
    //           }
    //         })
    //       },2000)
    //       setTimeout(function() {
    //         clearInterval(this.realTime)
    //       }, 5 * 60 * 1000); // 5分钟后
    //     }else{
    //       this.$message.error(res.msg)
    //     }
    //   })
    // },
    //实时检测用户实名认证
    resultRealName() {
      if (this.realBool == false && this.userInfo.is_real_name == 1) {
        //第一次点击
        this.realBool = true; //首次触发启动定时器
      } else {
        return;
        // this.realBool = false;    //不是第一次点击
      }
      if (this.realBool == true) {
        console.log(this.realBool, "触发");
        this.realTime = setInterval(() => {
          //开启定时器查询实名认证结果
          getUserInfo().then((res) => {
            if (res.code == 20000 && res.data.is_real_name == 2) {
              //判断用户实名完成
              this.userInfo = res.data;
              let info = JSON.parse(localStorage.getItem("userInfo"));
              info.nick_name = res.data.nick_name;
              info.user_name = res.data.user_name;
              info.avatar_url = res.data.avatar_url;
              localStorage.setItem("userInfo", JSON.stringify(info));
              this.$store.dispatch("user/changeInfo", info.user_id);
              this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
              clearInterval(this.realTime);
              this.realTime = null;
              this.realBool = false;
            }
          });
          setTimeout(() => {
            clearInterval(this.realTime);
            this.realBool = false;
          }, 10 * 60 * 1000);
        }, 5000);
      }
    },
    //重构
    toPage(child) {
      if (child.path) {
        this.$router.push(child.path);
      }else if (child.text == "关注公众号") {
        window.location.href = "https://mp.weixin.qq.com/s/13GVWgKQKoNIiifMcyImCg";
      } else if (child.text == "H5链接") {
        var input = document.createElement("input"); // 创建input对象
        input.value = "http://127.0.0.1/h5/#/"; // 设置复制内容
        document.body.appendChild(input); // 添加临时实例
        input.select(); // 选择实例内容
        document.execCommand("Copy"); // 执行复制
        document.body.removeChild(input); // 删除临时实例
        this.$message.success("已复制H5链接！");
      }
    },
    //------
    // 获取用户信息
    getUserInfo() {
      getUserInfo()
        .then((res) => {
          if (res.code == 20000) {
            this.userInfo = res.data;
            let info = JSON.parse(localStorage.getItem("userInfo"));
            info.nick_name = res.data.nick_name;
            info.user_name = res.data.user_name;
            info.avatar_url = res.data.avatar_url;
            localStorage.setItem("userInfo", JSON.stringify(info));
            this.$store.dispatch("user/changeInfo", info.user_id);
            this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取用户信息失败！");
        });
    },

    // 获取图片验证码的回调
    queryImageCode() {
      this.countDown = 60;
      this.downTimer = setInterval(() => {
        this.downCounter();
      }, 1000);

      if (this.isClick == false) {
        return false;
      }
      this.isClick = false;

      let val = {
        mobile: this.phone,
        action: "web",
        Ticket: this.ticket,
        Randstr: this.randstr,
      };

      getCode(val)
        .then((res) => {
          if (res.code == 20000) {
            this.isClick = true;
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
            this.countDown = 0;
          }
        })
        .catch((err) => {
          this.$message.error("获取验证码失败!");
          this.isClick = true;
        });
    },
    getTicket() {
      return new Promise((resolve, reject) => {
        let Captcha = new TencentCaptcha("193069182", (res) => {
          console.log(res);
          if (res.ret === 0) {
            this.ticket = res.ticket;
            this.randstr = res.randstr;
            resolve(true);
          } else {
            resolve(false);
          }
        });
        Captcha.show();
      });
    },
    handleSendCode() {
      if (this.phone == "") {
        this.ismobile = true;
        this.phoneMsg = "手机号不能为空";
        return false;
      } else {
        this.ismobile = false;
        this.phoneMsg = "";
      }

      var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (TEL_REGEXP.test(this.phone)) {
        this.ismobile = false;
        this.phoneMsg = "";
      } else {
        this.ismobile = true;
        this.phoneMsg = "手机号格式不正确";
        return false;
      }
      this.getTicket().then((isValid) => {
        if (isValid) {
          this.queryImageCode();
        }
      });
      // this.$refs.imageCode.dialogVisible = true;
    },

    downCounter() {
      if ((this.countDown -= 1) <= 0) {
        this.isClick = true;
        clearInterval(this.downTimer);
      }
    },

    // 绑定手机
    bindPhone() {
      if (this.phone == "") {
        this.ismobile = true;
        this.phoneMsg = "手机号不能为空";
        return false;
      } else {
        this.ismobile = false;
        this.phoneMsg = "";
      }

      var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (TEL_REGEXP.test(this.phone)) {
        this.ismobile = false;
        this.phoneMsg = "";
      } else {
        this.ismobile = true;
        this.phoneMsg = "手机号格式不正确";
        return false;
      }

      if (this.code == "") {
        this.iscode = true;
        this.codeMsg = "验证码不能为空";
        return false;
      } else {
        this.iscode = false;
        this.codeMsg = "";
      }

      if (this.isClick == false) {
        return false;
      }
      this.isClick = false;

      let val = {
        mobile: this.phone,
        code: this.code,
      };

      bindPhone(val)
        .then((res) => {
          if (res.code == 20000) {
            this.getUserInfo();
            this.bindVisible = false;
            this.isClick = true;
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
          }
        })
        .catch((err) => {
          this.$message.error("绑定失败!");
          this.isClick = true;
        });
    },

    // 修改用户名
    editUserName() {
      if (this.userName == "") {
        this.isUser = true;
        this.userMsg = "用户名不能为空";
        return false;
      } else {
        this.isUser = false;
        this.userMsg = "";
      }

      if (this.isClick == false) {
        return false;
      }
      this.isClick = false;

      let val = {
        user_name: this.userName,
      };

      editName(val)
        .then((res) => {
          if (res.code == 20000) {
            this.getUserInfo();
            this.bindUserName = false;
            this.isClick = true;
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
          }
        })
        .catch((err) => {
          this.$message.error("修改失败!");
          this.isClick = true;
        });
    },

    // 清空所有记录
    clearChat() {
      this.$confirm("是否清空所有会话记录？", "提示", {
        confirmButtonText: "清空",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let info = JSON.parse(localStorage.getItem("userInfo"));
          let val = {
            user_id: info.user_id,
          };
          // chatAllDelete(val).then(res => {
          //     if (res.code == 20000) {
          //         this.$root.Bus.$emit('updateList', 1);
          //     } else {
          //         this.$message.error(res.msg);
          //     }
          // }).catch(err => {
          //     this.$message.error('清空失败！');
          // })
        })
        .catch(() => {});
    },

    // 退出登录
    exit() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("userInfo");
          this.$store.dispatch("user/changeInfo", null);
          location.href = "/index";
          this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    closeCenterTitle() {
      this.showCenterTitle = false;
      sessionStorage.setItem("closeCenterTitle", "true");
    },

    toDistribution() {
      this.$router.push("/mineDistribution/mineDistribution");
    },

    toshare(type) {
      switch (type) {
        case 1:
          this.$router.push("/share/share");
          sessionStorage.setItem("sahre_friend", "1");
          break;
        case 2:
          this.$router.push("/collaborate/collaborate");
          break;
        case 3:
          this.$router.push("/change/change");
          break;
        case 4:
          this.$refs.Pay.PayVisible = true;
          break;
        case 5:
          this.$router.push("/mineDistribution/mineDistribution");
          break;
      }
    },
    //计算token
    
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: #f1f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 648px;
    height: 90%;
    overflow-y: auto;
    box-sizing: border-box;
    // 公共样式/子盒子
    > div {
      padding: 20px;
      background: #fff;
      box-sizing: border-box;
      border-radius: 8px;
      margin-bottom: 20px;
      > div:first-child {
        margin-bottom: 20px;
      }
      // 标题
      > div:first-child div:first-child {
        color: #333;
        font-family: PingFang SC;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
      }
    }
    .information {
      width: 100%;
      > div:first-child {
        display: flex;
        justify-content: space-between;
        > div:last-child {
          display: flex;
          align-items: center;
          color: #000;
          font-family: PingFang SC;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          div {
            margin-left: 5px;
          }
        }
      }
      .information-content {
        display: flex;
        justify-content: space-between;
        > div {
          box-sizing: border-box;
          height: 58px;
        }
        .line {
          width: 1px;
          height: 58px;
          background: #ccc;
        }
        // 第一个盒子
        > div:first-child {
          display: flex;
          img {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            margin-right: 12px;
          }
          > div {
            // width: 100px;
            box-sizing: border-box;
            height: 100%;
            position: relative;
            div:first-child {
              width: 100px;
              position: relative;
              top: 0px;
              color: #000;
              font-family: PingFang SC;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
            div:last-child {
              position: relative;
              bottom: 0px;
              color: #666;
              font-family: PingFang SC;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
        //第二个盒子
        > div:nth-child(3) {
          width: 130px;
          text-align: center;
          div:first-child {
            width: 100%;
            color: #666;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-align: center;
          }
          div:last-child {
            width: 100%;
            color: #1f64ff;
            font-family: DIN;
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-top: 5px;
          }
        }
        //第三个盒子
        > div:nth-child(5) {
          display: flex;
          box-sizing: border-box;
          > div {
            position: relative;
            margin-left: 30px;
            cursor: pointer;

            img {
              position: relative;
              left: 50%;
              transform: translate(-50%);
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            div {
              color: #000;
              font-family: PingFang SC;
              font-size: 13px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
      }
    }
    .column {
      > div:last-child {
        display: flex;
        > div {
          margin-right: 40px;
          position: relative;
          cursor: pointer;
          img {
            position: relative;
            left: 50%;
            transform: translate(-50%);
            width: 24px;
            height: 24px;
          }
          div {
            margin-top: 7px;
            color: #333;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
