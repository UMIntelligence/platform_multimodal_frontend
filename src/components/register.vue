<template>
  <div class="login-wrap">
    <el-dialog
      :visible.sync="registerVisible"
      width="500px"
      @open="open()"
      @close="closeDialog"
      :show-close="false"
      append-to-body
    >
      <div class="reg_cont">
        <!-- 内容 -->
        <div class="reg_right">
          <div class="close" @click="registerVisible = false">
            <img class="close_img" src="../assets/images/close.png" alt="" />
          </div>
          <!-- 登录 -->
          <div class="reg_li" v-if="isReg">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="扫码登录" name="first">
                <!-- 微信登录 -->
                <div>
                  <div class="wx_title">
                    <el-steps
                      class="register_ws_login"
                      :active="wechatSteps"
                      finish-status="success"
                      align-center
                    >
                      <el-step class="stepsStep" title="微信扫码一键登录"></el-step>
                      <el-step class="stepsStep" title="绑定手机号"></el-step>
                    </el-steps>
                  </div>

                  <div class="code">
                    <div class="phone" v-if="wechatSteps == 1">
                      <div class="mobile">
                        <img
                          class="mobile_img"
                          src="../assets/images/login_phone.png"
                          alt=""
                        />
                        <div class="mobile_input">
                          <el-input
                            placeholder="请输入手机号"
                            v-model="regPhone"
                          ></el-input>
                        </div>
                      </div>
                      <div class="warn_tip" v-if="isRegmobile">
                        <span class="warn_text">{{ regPhoneMsg }}</span>
                      </div>

                      <div class="mobile">
                        <img
                          class="mobile_img"
                          src="../assets/images/verify_code.png"
                          alt=""
                        />
                        <div class="mobile_input">
                          <el-input
                            placeholder="请输入验证码"
                            v-model="regcode"
                          ></el-input>
                        </div>
                        <div class="verify" @click="handleSendCode">
                          {{ countDown > 0 ? countDown + "秒" : "获取验证码" }}
                        </div>
                      </div>
                      <div class="warn_tip" v-if="isRegCode">
                        <span class="warn_text">{{ regCodeMsg }}</span>
                      </div>

                      <div class="login_btn" @click="phoneOnceRegister()">注册</div>

                      <div class="bind_btn" @click="noBindRegister()">稍后绑定</div>
                    </div>
                    <img
                      style="width: 240px; height: 120px"
                      src="../assets/images/nocode.png"
                      alt=""
                      v-else-if="wxUrl == ''"
                    />
                    <img class="code_img" :src="wxUrl" alt="" v-else />
                  </div>

                  <div class="agree">
                    <span class="agree-text">
                      登录即表示已阅读并同意
                      <span class="agree_zc" @click="agreeCheck(1)">《用户协议》</span
                      >和<span class="agree_zc" @click="agreeCheck(2)">《隐私政策》</span>
                    </span>
                  </div>

                  <div class="go_reg">
                    <span class="reg_text" @click="changeType">立即注册</span>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="手机号登录" name="second">
                <!-- 手机号登录 -->
                <div>
                  <div class="phone">
                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/login_phone.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input placeholder="请输入手机号" v-model="phone"></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="ismobile">
                      <span class="warn_text">{{ phoneMsg }}</span>
                    </div>

                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/verify_code.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input placeholder="请输入验证码" v-model="code"></el-input>
                      </div>
                      <div class="verify" @click="handleLoginCode()">
                        {{ countDown > 0 ? countDown + "秒" : "获取验证码" }}
                      </div>
                    </div>
                    <div class="warn_tip" v-if="iscode">
                      <span class="warn_text">{{ codeMsg }}</span>
                    </div>

                    <div class="login_btn" @click="loginCheck()">
                      <i
                        v-if="loading"
                        class="el-icon-loading"
                        style="margin-right: 10px"
                      ></i>
                      {{ loading ? "登录中" : "登录" }}
                    </div>
                  </div>
                  <div class="agree">
                    <span class="agree-text">
                      未注册手机号将自动注册，登录即表示已阅读并同意
                      <span class="agree_zc" @click="agreeCheck(1)">《用户协议》</span
                      >和<span class="agree_zc" @click="agreeCheck(2)">《隐私政策》</span>
                    </span>
                  </div>

                  <div class="go_reg">
                    <span class="reg_text" @click="changeType">立即注册</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="用户名登录" name="third">
                <!-- 用户登录 -->
                <div>
                  <div class="phone">
                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/login_phone.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input
                          placeholder="请输入用户名"
                          v-model="userName"
                        ></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="isName">
                      <span class="warn_text">{{ userMsg }}</span>
                    </div>

                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/password.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input
                          placeholder="请输入密码"
                          v-model="password"
                          type="password"
                          @keyup.enter.native="loginuUserCheck()"
                        ></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="ispassword">
                      <span class="warn_text">{{ passMsg }}</span>
                    </div>

                    <div class="login_btn" @click="loginuUserCheck()">
                      <i
                        v-if="loading"
                        class="el-icon-loading"
                        style="margin-right: 10px"
                      ></i>
                      {{ loading ? "登录中" : "登录" }}
                    </div>
                  </div>

                  <div class="agree">
                    <span class="agree-text">
                      登录即表示已阅读并同意
                      <span class="agree_zc" @click="agreeCheck(1)">《用户协议》</span
                      >和<span class="agree_zc" @click="agreeCheck(2)">《隐私政策》</span>
                    </span>
                  </div>

                  <div class="go_reg">
                    <span class="reg_text" @click="changeType">立即注册</span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- 注册 -->
          <div class="reg_li" v-if="!isReg">
            <el-tabs v-model="regActive" @tab-click="handleRegClick">
              <el-tab-pane label="扫码注册" name="first">
                <!-- 微信注册 -->
                <div>
                  <div class="wx_title">
                    <el-steps
                      class="register_ws_login"
                      :active="wechatSteps"
                      finish-status="success"
                      align-center
                    >
                      <el-step class="stepsStep" title="微信扫码一键登录"></el-step>
                      <el-step class="stepsStep" title="绑定手机号"></el-step>
                    </el-steps>
                  </div>

                  <div class="code">
                    <div class="phone" v-if="wechatSteps == 1">
                      <div class="mobile">
                        <img
                          class="mobile_img"
                          src="../assets/images/login_phone.png"
                          alt=""
                        />
                        <div class="mobile_input">
                          <el-input
                            placeholder="请输入手机号"
                            v-model="regPhone"
                          ></el-input>
                        </div>
                      </div>
                      <div class="warn_tip" v-if="isRegmobile">
                        <span class="warn_text">{{ regPhoneMsg }}</span>
                      </div>
                      <div class="mobile">
                        <img
                          class="mobile_img"
                          src="../assets/images/verify_code.png"
                          alt=""
                        />
                        <div class="mobile_input">
                          <el-input
                            placeholder="请输入验证码"
                            v-model="regcode"
                          ></el-input>
                        </div>
                        <div class="verify" @click="handleSendCode">
                          {{ countDown > 0 ? countDown + "秒" : "获取验证码" }}
                        </div>
                      </div>
                      <div class="warn_tip" v-if="isRegCode">
                        <span class="warn_text">{{ regCodeMsg }}</span>
                      </div>

                      <div class="login_btn" @click="phoneOnceRegister()">注册</div>

                      <div class="bind_btn" @click="noBindRegister()">稍后绑定</div>
                    </div>
                    <img
                      style="width: 240px; height: 120px"
                      src="../assets/images/nocode.png"
                      alt=""
                      v-else-if="wxUrl == ''"
                    />
                    <img class="code_img" :src="wxUrl" alt="" v-else />
                  </div>

                  <div class="agree">
                    <span class="agree-text">
                      登录即表示已阅读并同意
                      <span class="agree_zc" @click="agreeCheck(1)">《用户协议》</span
                      >和<span class="agree_zc" @click="agreeCheck(2)">《隐私政策》</span>
                    </span>
                  </div>

                  <div class="go_reg">
                    <span class="reg_text" style="color: #999">已有账号?</span>
                    <span class="reg_text" @click="changeType">登录</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="手机号注册" name="second">
                <!-- 手机号注册 -->
                <div>
                  <div class="phone">
                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/login_phone.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input
                          placeholder="请输入手机号"
                          v-model="regPhone"
                        ></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="isRegmobile">
                      <span class="warn_text">{{ regPhoneMsg }}</span>
                    </div>

                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/verify_code.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input placeholder="请输入验证码" v-model="regcode"></el-input>
                      </div>
                      <div class="verify" @click="handleSendCode">
                        {{ countDown > 0 ? countDown + "秒" : "获取验证码" }}
                      </div>
                    </div>
                    <div class="warn_tip" v-if="isRegCode">
                      <span class="warn_text">{{ regCodeMsg }}</span>
                    </div>

                    <div class="login_btn" @click="phoneRegCheck()">注册</div>
                  </div>
                  <div class="agree">
                    <span class="agree-text">
                      登录即表示已阅读并同意
                      <span class="agree_zc" @click="agreeCheck(1)">《用户协议》</span
                      >和<span class="agree_zc" @click="agreeCheck(2)">《隐私政策》</span>
                    </span>
                  </div>

                  <div class="go_reg">
                    <span class="reg_text" style="color: #999">已有账号?</span>
                    <span class="reg_text" @click="changeType">登录</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="用户名注册" name="third">
                <!-- 用户注册 -->
                <div>
                  <div class="phone">
                    <div class="wx_title">
                      <span class="wx_text">用户名注册</span>
                    </div>

                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/login_phone.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input
                          placeholder="请输入用户名"
                          v-model="regUserName"
                        ></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="isRegName">
                      <span class="warn_text">{{ regUserMsg }}</span>
                    </div>

                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/password.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input
                          placeholder="请输入密码"
                          v-model="regPassword"
                          type="password"
                        ></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="isRegPassword">
                      <span class="warn_text">{{ regPassMsg }}</span>
                    </div>

                    <div class="mobile">
                      <img
                        class="mobile_img"
                        src="../assets/images/password.png"
                        alt=""
                      />
                      <div class="mobile_input">
                        <el-input
                          placeholder="请再次输入密码"
                          v-model="checkPassword"
                          type="password"
                        ></el-input>
                      </div>
                    </div>
                    <div class="warn_tip" v-if="isCheckPassword">
                      <span class="warn_text">{{ checkPassMsg }}</span>
                    </div>

                    <div class="login_btn" @click="registerCheck()">注册</div>

                    <div class="agree">
                      <span class="agree-text">
                        登录即表示已阅读并同意
                        <span class="agree_zc" @click="agreeCheck(1)">《用户协议》</span
                        >和<span class="agree_zc" @click="agreeCheck(2)"
                          >《隐私政策》</span
                        >
                      </span>
                    </div>

                    <div class="go_reg" style="width: 100%">
                      <span class="reg_text" style="color: #999">已有账号?</span>
                      <span class="reg_text" @click="changeType">登录</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <!-- 用户协议 -->
      <Agree ref="Agree"></Agree>
      <!-- <get-image-code @queryimagecode="queryImageCode" ref="imageCode"></get-image-code> -->
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import httpUrls from "../api/requestURL";
import { createMentorMe, batchBind, getMentorMe } from "../api/mentor";
import {
  register,
  login,
  clearToken,
  getCode,
  phoneRegister,
  phoneLogin,
  getWxCode,
  wxLogin,
  isPhoneRegister,
  registerBindPhone,
} from "../api/chatMG";
import Agree from "../components/Agree";
import getImageCode from "./getImageCode";
export default {
  name: "register",
  data() {
    return {
      ticket: null, //票据
      randstr: null, //随机字符串
      httpUrls,
      registerVisible: false,
      loading: false, //  登陆中
      isReg: true,

      wxUrl: "",
      timer: "",

      // 手机号登录
      ismobile: false,
      phoneMsg: "",
      phone: "",

      iscode: false,
      codeMsg: "",
      code: "",

      // 用户名登录
      userName: "",
      isName: false,
      nameMsg: "",

      password: "",
      ispassword: false,
      passMsg: "",

      // 手机号注册
      isRegmobile: false,
      regPhoneMsg: "",
      regPhone: "",

      isRegCode: false,
      regCodeMsg: "",
      regcode: "",

      //  用户名注册
      regUserName: "",
      isRegName: false,
      regUserMsg: "",

      regPassword: "",
      isRegPassword: false,
      regPassMsg: "",
      downTimer: "",

      checkPassword: "",
      isCheckPassword: false,
      checkPassMsg: "",

      //  tabs切换
      activeName: "first",
      regActive: "first",
      countDown: 0,
      isClick: true,

      wechatSteps: 0,
      bindPhoneOnce: {
        user_code: "",
        parent_user_code: "",
        wx_union_id: "",
        mobile: "",
        code: "",
      },

      iamgeCode: "",
    };
  },
  // 注册组件
  components: {
    Agree,
    getImageCode,
  },
  // 创建完毕状态(里面是操作)
  created() {
    // console.log(this.$router.options.routes, "路由文件信息");
    // let a = this.findRoute(this.$router.options.routes,this.$route.path)
    // console.log(a,'递归返回结果')
    if (
      localStorage.getItem("parent_user_code") != undefined &&
      localStorage.getItem("parent_user_code") != "undefined"
    ) {
      console.log('触发注册')
      this.isReg = false;
    }
  },
  // 里面的函数只有调用才会执行
  methods: {
    //获取当前页面路由信息
    findRoute(routes, targetPath) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === targetPath) {
          return routes[i];
        }

        if (routes[i].children) {
          const foundRoute = this.findRoute(routes[i].children, targetPath);
          if (foundRoute) {
            return foundRoute;
          }
        }
      }

      return null;
    },
    // 创建我、批量绑定导师方法
    createMeFn() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`;
      getMentorMe(data).then((res) => {
        // console.log(res);
        if (res.data.length <= 0) {
          let temp = {
            user_id: userInfo.user_id,
            photo: userInfo.avatar_url,
            name: userInfo.nick_name,
          };
          createMentorMe(temp).then((res) => {
            if (res.code == 20000) {
              batchBind({ user_id: userInfo.user_id }).then((res) => {
                console.log(999, res);
              });
            }
          });
        }
      });
    },
    agreeCheck(type) {
      this.$refs.Agree.agreeVisibleParent = true;
      if (type == 1) {
        this.$refs.Agree.agreeVisibleFour = true;
      } else {
        this.$refs.Agree.agreeVisibleOne = true;
      }
    },
    open() {
      this.activeName = "first";
      this.regActive = "first";
      this.getWxCode();
    },
    closeDialog() {
      this.registerVisible = false;
      clearInterval(this.timer);
    },

    //选择登录方式
    handleClick(tab, event) {
      if (this.activeName != "first") {
        clearInterval(this.timer);
      } else {
        this.getWxCode();
      }
    },

    // 选择注册方式
    handleRegClick(tab, event) {
      if (this.regActive != "first") {
        clearInterval(this.timer);
      } else {
        this.getWxCode();
      }
    },

    // 登录注册切换
    changeType() {
      clearInterval(this.timer);
      if (this.isReg) {
        this.regActive = this.activeName;
        if (this.regActive == "first") {
          this.getWxCode();
        }
      } else {
        this.activeName = this.regActive;
        if (this.activeName == "first") {
          this.getWxCode();
        }
      }
      this.isReg = !this.isReg;
      // this.activeName = 'first';
      // this.regActive = 'first';
      this.wechatSteps = 0;
      // this.getWxCode();
    },

    // 获取微信登录码
    getWxCode() {
      getWxCode()
        .then((res) => {
          if (res.code == 20000) {
            this.wxUrl = res.data.qr_image;
            this.timer = setInterval(() => {
              // console.log(res.data.scene_id,'获取微信登录码')
              this.getWxLogin(res.data.scene_id);
            }, 2000);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
          this.isClick = true;
        });
    },

    // 获取微信登录码
    getWxLogin(scene_id) {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      let val = {
        scene_id: scene_id,
        user_code: info.user_code,
      };
      if (this.$route.path == "/templateSelect/templateSelect") {
        val.source_url =
          sessionStorage.getItem("templateSelectToken") +
          "-" +
          window.location.href;
      }
      let parentCode = localStorage.getItem("parent_user_code");
      let parentRole = localStorage.getItem("parent_user_role");
      if (
        parentCode != "null" &&
        parentCode != null &&
        parentCode != undefined &&
        parentCode != "undefined" &&
        parentRole != "guess"
      ) {
        val.parent_user_code = parentCode || "";
      }
      //微信扫码登录 /扫码成功后res.data不返回null
      wxLogin(val)
        .then((res) => {
          // console.log(res,'---wxLogin')
          if (res.code == 20000) {
            if (res.data != null) {
              if (res.data.is_bind == 1) {
                //注册过
                clearInterval(this.timer);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                this.$store.dispatch("user/changeInfo", res.data.user_id);
                this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息

                this.createMeFn();
                if (this.$route.path == "/templateSelect/templateSelectNew") {
                  location.reload();
                }
                this.$message.success("登录成功！");
                this.registerVisible = false;
                localStorage.removeItem("parent_user_code");
                localStorage.removeItem("parent_user_role");
              } else {
                //新用户绑定手机号
                clearInterval(this.timer);
                this.wechatSteps = 1;
                this.bindPhoneOnce = {
                  user_code: "",
                  parent_user_code: "",
                  wx_union_id: res.data.wx_union_id,
                  mobile: "",
                  code: "",
                };
                if (
                  parentCode != "null" &&
                  parentCode != null &&
                  parentCode != undefined &&
                  parentCode != "undefined" &&
                  parentRole != "guess"
                ) {
                  this.bindPhoneOnce.parent_user_code = parentCode || "";
                }
              }
            }
          } else {
            this.$message.error(res.msg);
            clearInterval(this.timer);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
          clearInterval(this.timer);
        });
    },

    // 绑定手机号/微信用户首次注册时
    phoneOnceRegister() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.bindPhoneOnce.mobile = this.regPhone;
      this.bindPhoneOnce.code = this.regcode;
      this.bindPhoneOnce.user_code = userInfo.user_code;
      this.bindPhoneOnce.action = 1;
      let parentCode = localStorage.getItem("parent_user_code");
      if (
        parentCode != "null" &&
        parentCode != null &&
        parentCode != undefined &&
        parentCode != "undefined" &&
        parentRole != "guess"
      ) {
        this.bindPhoneOnce.parent_user_code = parentCode || "";
      }
      // = {
      //    "user_code": res.data.user_code,
      //    "parent_user_code": parentCode,
      //    "wx_union_id": res.data.wx_union_id,
      //    "mobile": this.regPhone,
      //    "code": this.regcode
      //}
      console.log(this.bindPhoneOnce, "请求参数");
      registerBindPhone(this.bindPhoneOnce).then((response) => {
        if (response.code == 40012) {
          this.$message.error(response.msg);
        }
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        this.$store.dispatch("user/changeInfo", response.data.user_id);
        this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
        // if(this.$route.path != '/index') {
        //     this.$router.push({ path: '/index' });
        // }
        if (this.$route.path == "/templateSelect/templateSelectNew") {
          location.reload();
        }
        this.$message.success("登录成功！");
        this.registerVisible = false;
        localStorage.removeItem("parent_user_code");
        localStorage.removeItem("parent_user_role");
        this.wechatSteps = 0;
      });
    },

    noBindRegister() {
      // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.bindPhoneOnce.action = 0;
      let parentCode = localStorage.getItem("parent_user_code");
      if (
        parentCode != "null" &&
        parentCode != null &&
        parentCode != undefined &&
        parentCode != "undefined" &&
        parentRole != "guess"
      ) {
        this.bindPhoneOnce.parent_user_code = parentCode || "";
      }
      console.log(this.bindPhoneOnce, "请求参数");
      registerBindPhone(this.bindPhoneOnce).then((response) => {
        if (response.code == 40012) {
          this.$message.error(response.msg);
        }
        console.log(response, 3332);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        this.$store.dispatch("user/changeInfo", response.data.user_id);
        this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
        // if(this.$route.path != '/index') {
        //     this.$router.push({ path: '/index' });
        // }
        this.$message.success("登录成功！");
        this.registerVisible = false;
        localStorage.removeItem("parent_user_code");
        localStorage.removeItem("parent_user_role");
        this.wechatSteps = 0;
        if (this.$route.path == "/templateSelect/templateSelectNew") {
          location.reload();
        }
      });
    },

    getTicket() {
      return new Promise((resolve, reject) => {
        let Captcha = new TencentCaptcha("193069182", (res) => {
          if (res.ret === 0) {
            this.ticket = res.ticket;
            this.randstr = res.randstr;
            resolve(true);
          } else {
            resolve(false);
          }
        });
        Captcha.show(); //显示滑块验证码
      });
    },

    // 手机号登录获取验证码
    handleLoginCode() {
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
      // this.$refs.imageCode.dialogVisible = true;
      this.getTicket().then((isValid) => {
        if (isValid) {
          this.iamgeCode = 1;
          this.queryImageCode();
        }
      });
    },
    // 获取图片验证码的回调
    queryImageCode() {
      if (this.iamgeCode == 1) {
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

        let val = {
          mobile: this.phone,
          action: "web",
          Ticket: this.ticket,
          Randstr: this.randstr,
        };

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
      } else if (this.iamgeCode == 2) {
        let val = {
          mobile: this.regPhone,
          action: "web",
          Ticket: this.ticket,
          Randstr: this.randstr,
        };
        isPhoneRegister(val).then((res) => {
          if (res.code == 20000) {
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

            let val = {
              mobile: this.regPhone,
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
                this.countDown = 0;
              });
          } else if (res.code == 40012) {
            this.isRegmobile = true;
            this.regPhoneMsg = "该手机号已注册，可前往登录界面登录";
          }
        });
      }
    },

    //手机号注册获取验证码
    handleSendCode() {
      if (this.countDown > 0) {
        return;
      }
      if (this.regPhone == "") {
        this.isRegmobile = true;
        this.regPhoneMsg = "手机号不能为空";
        return false;
      } else {
        this.isRegmobile = false;
        this.regPhoneMsg = "";
      }

      var TEL_REGEXP = /^1[3-9]\d{9}$/;
      if (TEL_REGEXP.test(this.regPhone)) {
        this.isRegmobile = false;
        this.regPhoneMsg = "";
      } else {
        this.isRegmobile = true;
        this.regPhoneMsg = "手机号格式不正确";
        return false;
      }
      // this.$refs.imageCode.dialogVisible = true
      this.getTicket().then((isValid) => {
        if (isValid) {
          this.iamgeCode = 2;
          this.queryImageCode();
        }
      });
    },

    downCounter() {
      if ((this.countDown -= 1) <= 0) {
        this.isClick = true;
        clearInterval(this.downTimer);
      }
    },

    // 手机号登录
    loginCheck() {
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

      if (this.code == "") {
        this.iscode = true;
        this.codeMsg = "验证码不能为空";
        return false;
      } else {
        this.iscode = false;
        this.codeMsg = "";
      }

      // 防止连点
      if (!this.isClick) {
        this.isClick = false;
        setTimeout(() => {
          this.isClick = true;
        }, 2000);
        return;
      }
      this.loading = true;
      let info = JSON.parse(localStorage.getItem("userInfo"));
      let val = {
        mobile: this.phone,
        code: this.code,
        user_code: info.user_code,
      };
      if (this.$route.path == "/templateSelect/templateSelect") {
        val.source_url =
          sessionStorage.getItem("templateSelectToken") +
          "-" +
          window.location.href; //直接获取url路径
      }
      //手机号登录
      phoneLogin(val)
        .then((res) => {
          if (res.code == 20000) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$store.dispatch("user/changeInfo", res.data.user_id);
            this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
            // if(this.$route.path != '/index') {
            //     this.$router.push({ path: '/index' });
            // }
            this.createMeFn();
            if (this.$route.path == "/templateSelect/templateSelectNew") {
              location.reload();
            }
            this.$message.success("登录成功！");
            this.registerVisible = false;
            this.isClick = true;
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("登录失败!");
          this.isClick = true;
          this.loading = false;
        });
    },

    // 用户名登录
    loginuUserCheck() {
      if (this.userName == "") {
        this.isName = true;
        this.nameMsg = "用户名不能为空";
        return false;
      } else {
        this.isName = false;
        this.nameMsg = "";
      }

      if (this.password == "") {
        this.ispassword = true;
        this.passMsg = "密码不能为空";
        return false;
      } else {
        this.ispassword = false;
        this.passMsg = "";
      }

      // 防止连点
      if (!this.isClick) {
        this.isClick = false;
        setTimeout(() => {
          this.isClick = true;
        }, 2000);
        return;
      }
      this.loading = true;

      let info = JSON.parse(localStorage.getItem("userInfo"));
      let val = {
        user_name: this.userName,
        password: this.password,
        user_code: info.user_code,
      };
      if (this.$route.path == "/templateSelect/templateSelect") {
        val.source_url =
          sessionStorage.getItem("templateSelectToken") +
          "-" +
          window.location.href;
      }

      login(val)
        .then((res) => {
          if (res.code == 20000) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$store.dispatch("user/changeInfo", res.data.user_id);
            this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
            // if(this.$route.path != '/index') {
            //     this.$router.push({ path: '/index' });
            // }
            this.createMeFn();
            if (this.$route.path == "/templateSelect/templateSelectNew") {
              location.reload();
            }
            this.$message.success("登录成功！");
            this.registerVisible = false;
            this.isClick = true;
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("登录失败!");
          this.isClick = true;
          this.loading = false;
        });
    },

    // 手机号注册
    phoneRegCheck() {
      if (this.regPhone == "") {
        this.isRegmobile = true;
        this.regPhoneMsg = "手机号不能为空";
        return false;
      } else {
        this.isRegmobile = false;
        this.regPhoneMsg = "";
      }

      var TEL_REGEXP = /^1[3-9]\d{9}$/;
      if (TEL_REGEXP.test(this.regPhone)) {
        this.isRegmobile = false;
        this.regPhoneMsg = "";
      } else {
        this.isRegmobile = true;
        this.regPhoneMsg = "手机号格式不正确";
        return false;
      }

      if (this.regcode == "") {
        this.isRegCode = true;
        this.regCodeMsg = "验证码不能为空";
        return false;
      } else {
        this.isRegCode = false;
        this.regCodeMsg = "";
      }

      if (!this.isClick) {
        this.isClick = false;
        setTimeout(() => {
          this.isClick = true;
        }, 2000);
        return false;
      }

      let info = JSON.parse(localStorage.getItem("userInfo"));
      let val = {
        mobile: this.regPhone,
        code: this.regcode,
        user_code: info.user_code,
      };
      if (this.$route.path == "/templateSelect/templateSelect") {
        val.source_url =
          sessionStorage.getItem("templateSelectToken") +
          "-" +
          window.location.href;
      }
      let parentCode = localStorage.getItem("parent_user_code");
      let parentRole = localStorage.getItem("parent_user_role");
      if (
        parentCode != "null" &&
        parentCode != null &&
        parentCode != undefined &&
        parentCode != "undefined" &&
        parentRole != "guess"
      ) {
        val.parent_user_code = parentCode;
      }

      phoneRegister(val)
        .then((res) => {
          if (res.code == 20000) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$store.dispatch("user/changeInfo", res.data.user_id);
            this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
            // if(this.$route.path != '/index') {
            //     this.$router.push({ path: '/index' });
            // }
            this.$message.success("注册成功！");
            this.registerVisible = false;
            this.isClick = true;
            localStorage.removeItem("parent_user_code");
            localStorage.removeItem("parent_user_role");
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
          }
        })
        .catch((err) => {
          this.$message.error("注册失败!");
          this.isClick = true;
        });
    },

    // 用户名注册
    registerCheck() {
      if (this.regUserName == "") {
        this.isRegName = true;
        this.regUserMsg = "用户名不能为空";
        return false;
      } else {
        this.isRegName = false;
        this.regUserMsg = "";
      }

      if (this.regPassword == "") {
        this.isRegPassword = true;
        this.regPassMsg = "密码不能为空";
        return false;
      } else {
        this.isRegPassword = false;
        this.regPassMsg = "";
      }

      if (this.checkPassword == "") {
        this.isCheckPassword = true;
        this.checkPassMsg = "请再一次填写密码";
        return false;
      } else {
        this.isCheckPassword = false;
        this.checkPassMsg = "";
      }

      if (this.regPassword != this.checkPassword) {
        this.isCheckPassword = true;
        this.checkPassMsg = "与第一次密码不一致";
        return false;
      } else {
        this.isCheckPassword = false;
        this.checkPassMsg = "";
      }

      if (!this.isClick) {
        this.isClick = false;
        setTimeout(() => {
          this.isClick = true;
        }, 2000);
        return false;
      }

      let info = JSON.parse(localStorage.getItem("userInfo"));
      let val = {
        user_name: this.regUserName,
        password: this.regPassword,
        user_code: info.user_code,
      };
      if (this.$route.path == "/templateSelect/templateSelect") {
        val.source_url =
          sessionStorage.getItem("templateSelectToken") +
          "-" +
          window.location.href;
      }
      let parentCode = localStorage.getItem("parent_user_code");
      let parentRole = localStorage.getItem("parent_user_role");
      if (
        parentCode != "null" &&
        parentCode != null &&
        parentCode != undefined &&
        parentCode != "undefined" &&
        parentRole != "guess"
      ) {
        val.parent_user_code = parentCode;
      }

      register(val)
        .then((res) => {
          if (res.code == 20000) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$store.dispatch("user/changeInfo", res.data.user_id);
            this.$root.Bus.$emit("loginInfo", 1); // 更新登录信息
            // if(this.$route.path != '/index') {
            //     this.$router.push({ path: '/index' });
            // }
            this.$message.success("注册成功！");
            this.registerVisible = false;
            this.isClick = true;
            localStorage.removeItem("parent_user_code");
            localStorage.removeItem("parent_user_role");
          } else {
            this.$message.error(res.msg);
            this.isClick = true;
          }
        })
        .catch((err) => {
          this.$message.error("注册失败!");
          this.isClick = true;
        });
    },

    // 清空token数
    clearToken() {
      let info = JSON.parse(localStorage.getItem("userInfo"));
      let val = { user_id: info.user_id };
      clearToken(val)
        .then((res) => {
          if (res.code == 20000) {
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("清空token失败");
        });
    },
  },
};
</script>

<style scoped>
/* .el-dialog{
  padding-left: 0px !important;
  padding-right: 0px !important;
}
:deep(.el-dialog .el-dialog_header){
  padding-left: 16px;
} */
.reg_cont {
  margin: -60px 0 -30px -20px;
  display: flex;
  width: 100%;
}

.reg_left {
  padding: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  background: rgba(227, 236, 255, 0.2);
  position: relative;
}

.reg_title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px 20px 0;
}

.reg_img {
  width: 121px;
  height: 40px;
}

.reg_name {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #000;
}

.reg_tip {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.tip_text {
  width: 85%;
  border-radius: 6px;
  align-items: center;
}

.tip_text .tip_type {
  color: #1f64ff;
  font-size: 14px;
  font-weight: 500;
  padding-left: 20px;
  line-height: 21px;
  margin-bottom: 4px;
}

.tip_img {
  width: 8px;
  height: 8px;
}

.slove_text {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 200%;
  color: #1f64ff;
  background: linear-gradient(90deg, #e3ecff 0%, rgba(255, 255, 255, 0) 100%);
  padding: 7px 0 7px 20px;
  border-radius: 1000px;
  white-space: nowrap;
}

.reg_zw {
  flex: 1;
}

.bot_img {
  width: 240px;
  height: 197px;
  margin-left: 20px;
}

.reg_right {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
}

.reg_li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.close {
  text-align: right;
}

.close_img {
  width: 16px;
  cursor: pointer;
  height: 16px;
  position: absolute;
  right: 30px;
  top: 30px;
}

.wx_title {
  font-weight: 500;
  font-size: 26px;
}

.wx_img {
  width: 30px;
  height: 30px;
}

.wx_text {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #222;
  margin-left: 8px;
}

.reg_li .code {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.reg_li .code_img {
  width: 160px;
  height: 160px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 12px rgba(31, 100, 255, 0.1);
  padding: 10px;
}

.wx_tip {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tip-text {
  background: #e3ecff;
  border-radius: 100px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 200%;
  color: #1f64ff;
  text-align: center;
  width: 60%;
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
  width: 80%;
  text-align: center;
}

.agree_zc {
  color: #1f64ff;
  cursor: pointer;
}

.go_reg {
  padding-top: 15px;
  display: flex;
  justify-content: flex-end;
  padding-top: 60px;
}

.reg_text {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
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
  width: 75%;
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

.login_btn {
  width: 80%;
  height: 40px;
  background: #1f64ff;
  box-shadow: 1px 4px 10px rgba(31, 100, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  margin-top: 30px;
  cursor: pointer;
}

.bind_btn {
  width: 80%;
  height: 40px;
  background: #fff;
  border: 1px solid #1f64ff;
  box-shadow: 1px 4px 10px rgba(31, 100, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #1f64ff;
  margin-top: 30px;
  cursor: pointer;
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

.background_blue {
  background: var(
    --linear,
    linear-gradient(90deg, #e3ecff 0%, rgba(255, 255, 255, 0) 100%)
  );
  padding: 5px 0 5px 32px;
  margin-bottom: 20px;
  border-radius: 1000px;
  margin-left: 16px;
  color: #1f64ff;
}

.title_register {
  border-radius: 100px;
  color: #1f64ff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  border: 1px solid #1f64ff;
  padding: 5px 20px;
}
</style>

<style>
.login-wrap .el-dialog__body {
  padding: 30px 0 30px 20px !important;
}

.mobile_input .el-input__inner {
  height: 38px;
  border: none;
  padding: 0;
  background: #fff;
  font-size: 14px;
}

.reg_right .el-tabs__header {
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-bottom: 30px;
}

.reg_right .el-tabs__item {
  width: 120px;
  text-align: center;
}

.reg_right .el-tabs__active-bar {
  width: 120px;
}

.register_ws_login .el-step__head,
.register_ws_login .el-step__title {
  font-size: 12px;
}

.register_ws_login .is-success {
  color: #1f64ff;
  border-color: #1f64ff;
}

.register_ws_login .stepsStep .el-step__icon {
  width: 18px;
  height: 18px;
  font-size: 10px;
}

.register_ws_login .el-step.is-horizontal .el-step__line {
  top: 8px;
}
</style>
