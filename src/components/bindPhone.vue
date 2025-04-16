<template>
  <el-dialog
    title="绑定手机号"
    :visible.sync="phoneDialogVisible"
    width="420px"
    :before-close="handleClose"
  >
    <div class="phone">
      <div class="mobile">
        <img class="mobile_img" src="../assets/images/login_phone.png" alt="" />
        <div class="mobile_input">
          <el-input placeholder="请输入手机号" v-model="phone"></el-input>
        </div>
      </div>
      <div class="warn_tip" v-if="ismobile">
        <span class="warn_text">{{ phoneMsg }}</span>
      </div>

      <div class="mobile">
        <img class="mobile_img" src="../assets/images/verify_code.png" alt="" />
        <div class="mobile_input">
          <el-input placeholder="请输入验证码" v-model="code"></el-input>
        </div>
        <div class="verify" @click="handleSendCode()">
          {{ countDown > 0 ? countDown + "秒" : "获取验证码" }}
        </div>
      </div>
      <div class="warn_tip" v-if="iscode">
        <span class="warn_text">{{ codeMsg }}</span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$store.dispatch('app/changePhoneDialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="bindPhone"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { bindPhone, getCode,getUserInfo } from "../api/chatMG";
import { mapGetters } from "vuex";
export default {
  name: "bindPhone",
  data() {
    return {
      ticketL:'',
      randstr:'',
      iamgeCode: "",
      // 手机号登录
      ismobile: false,
      phoneMsg: "",
      phone: "",

      iscode: false,
      codeMsg: "",
      code: "",
      countDown: 0,
      isClick: true,
    };
  },
  computed: {
    ...mapGetters(["phoneDialogVisible"]),
  },
  created() {
    // this.$message('请先绑定您的手机号')
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
        getUserInfo().then(res => {
        if (res.code == 20000) {
            let info = JSON.parse(localStorage.getItem("userInfo"));
            info.nick_name = res.data.nick_name;
            info.user_name = res.data.user_name;
            info.avatar_url = res.data.avatar_url;
            localStorage.setItem("userInfo", JSON.stringify(info));
            this.$store.dispatch('user/changeInfo', info.user_id);
            this.$root.Bus.$emit('loginInfo', 1) // 更新登录信息
        } else {
            this.$message.error(res.msg);
        }
      }).catch(err => {
          this.$message.error('获取用户信息失败！');
      })
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
            //更新用户信息
            this.getUserInfo();
            this.$message.success('绑定成功！')
            this.$store.dispatch('app/changePhoneDialogVisible', false)
            location.reload();
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
    getTicket() {
      return new Promise((resolve, reject) => {
        let Captcha = new TencentCaptcha("193069182", (res) => {
          console.log(res);
          if (res.ret === 0) {
            this.ticket = res.ticket;
            this.randstr = res.randstr
            resolve(true);
          } else {
            resolve(false);
          }
        });
        Captcha.show();
      });
    },
    // 手机号登录获取验证码
    handleSendCode() {
      if (this.countDown > 0) {
        return;
      }
      if (this.phone == "") {
        this.ismobile = true;
        this.phoneMsg = "手机号不能为空";
        return false;
      } else {
        this.ismobile = false;
        this.phoneMsg = "";
      }

      var TEL_REGEXP = /^1[3-9]\d{9}$/;
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
          this.iamgeCode = 1;
          this.queryImageCode();
        }
      });
      // this.$refs.imageCode.dialogVisible = true;
    },
    //获取验证码
    queryImageCode() {
      console.log(1);
      this.countDown = 60;
      this.downTimer = setInterval(() => {
        this.downCounter();
      }, 1000);

      // 防止连点
      if (!this.isClick) {
        this.isClick = false;
        setTimeout(() => {
          this.isClick = true;
        }, 2000);
        return;
      }

      let val = { mobile: this.phone,action:"web",Ticket:this.ticket,Randstr:this.randstr };

      getCode(val)
        .then((res) => {
          if (res.code == 20000) {
            console.log(res, "--获取验证码");
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
          this.countDown = 0;
        });
    },
    // 二维码倒计时
    downCounter() {
      if ((this.countDown -= 1) <= 0) {
        this.isClick = true;
        clearInterval(this.downTimer);
      }
    },
    //关闭
    handleClose(){
      this.$store.dispatch('app/changePhoneDialogVisible', false)
    }
  },
};
</script>
<style scoped>
/deep/ .el-dialog__body {
  padding-top: 0px;
}
.verify {
  width: 90px;
  height: 38px;
  background: #fff;
  border: 1px solid #1f64ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #1f64ff;
  cursor: pointer;
}
/* 手机号登录 */
.phone {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.mobile {
  width: 90%;
  height: 40px;
  background: #ffffff;
  border: 1px solid #f5f6fa;
  border-radius: 10px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.mobile_img {
  width: 14px;
  height: 16px;
}

.mobile_input {
  flex: 1;
  margin-left: 10px;
}
.warn_tip {
  width: 80%;
}

.warn_text {
  font-style: normal;
  font-size: 12px;
  line-height: 22px;
  color: #db3232;
  text-align: left;
}
</style>