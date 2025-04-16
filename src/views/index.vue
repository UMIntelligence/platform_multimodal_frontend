<template>
  <el-container style="height: 100%">
    <el-header style="padding: 0; position: sticky; top: 0; z-index: 100; height: auto !important;">
      <main-title
        v-if="routerPath != '/customized/customized'"
        :showSidbar="showSidbar"
      ></main-title>
    </el-header>

    <el-container style="height: calc(100% - 58px); position: relative">
      <!-- <el-aside
        v-if="$route.path != '/shoppingServer'"
        width="240px"
        :style="
          showSidbar
            ? 'overflow-x: hidden;width: 240px;transition: width .2s;'
            : 'overflow-x: hidden;width: 72px;transition: width .2s;'
        "
        style="height: 100%; overflow-y: auto; overflow-x: hidden"
      >
        <leftnav @isshowsidbar="isShowSidbar"></leftnav>
      </el-aside> -->
      <el-main>
        <!-- 回到顶部 -->
        <el-backtop target=".el-main"></el-backtop>
        <!-- 公告 -->
        <div
          class="title-notice"
          :style="
            $route.path == '/chat/Chat' && isShowNotice && isShowRightNav
              ? `margin-left: 240px;`
              : $route.path == '/chat/Chat' && !isShowNotice && !isShowRightNav
              ? 'margin-left: 0px;'
              : ''
          "
          v-if="
            isShowNotice &&
            ($route.path == '/index' ||
              $route.path == '/drawChat/drawChat' ||
              $route.path == '/chataboratory/laboratoryDrawChat')
          "
        >
          <el-carousel height="30px" direction="vertical" :autoplay="true">
            <el-carousel-item
              v-for="item in carouselMessage"
              :key="item.message_id"
              @click.native="toNotice(item)"
              style="cursor: pointer"
            >
              <div
                class="notice_mask"
                style="display: flex; justify-content: space-between"
              >
                <div class="notice_mask">
                  <img
                    class="imgs"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/12148a85-a1f3-4dab-a747-840659ed3235.png'
                    "
                    alt=""
                  />
                  <span class="title">{{ item.title }} > > ></span>
                </div>
                <i
                  class="el-icon-close"
                  style="
                    height: 30px;
                    line-height: 30px;
                    margin-right: 10px;
                    font-size: 14px;
                  "
                  @click.stop="closeNotice"
                ></i>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
      <div
        v-if="isShowfooterRemark()"
        class="footer_remark"
        :style="
          $route.path == '/drawChat/drawChat'
            ? 'width: calc(100% - 48%);position:absolute;left: 26%'
            : $route.path == '/vision/vision'
            ? 'width: calc(100% - 640px);'
            : $route.path == '/chat/Chat'
            ? 'width: calc(100% - 550px);position:absolute;left: 420px;background-color:rgb(241, 242, 245);'
            : $route.path == '/templateSelect/templateSelectNew'
            ? 'width: calc(100% - 640px);position:absolute;left: 630px;'
            : $route.path == '/manyModelChat/chat' || $route.path == '/capacity'
            ? 'background-color:rgb(241, 242, 245);'
            : ''
        "
      >
      </div>
    </el-container>

    <!-- 服务和协议 -->
    <Agree ref="Agree"></Agree>

    <!-- 注册组件 -->
    <Register ref="Register"></Register>

    <el-dialog title="企业邀请" :visible.sync="dialogVisible" width="30%">
      <span>{{ companyMsg.name }}诚邀您加入我们团队</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFrom">确 定</el-button>
      </span>
    </el-dialog>
    <remind></remind>
    <bindPhone ref="bindPhone"></bindPhone>

    <!-- 右侧二维码 -->
    <right-fixed v-if="routerPath == '/index'"></right-fixed>
  </el-container>
</template>

<script>
// 导入组件
import navcon from "../components/navcon.vue";
import leftnav from "../components/leftnav.vue";
import IndexDialog from "../components/dialog/indexDialog";
import MainTitle from "../components/mainTitle";
import RightFixed from "../components/rightFixed";
import Agree from "../components/Agree";
import Register from "../components/register";
import remind from "../components/remind";
import bindPhone from "../components/bindPhone.vue";

import { pictures, enterpriseAddember } from "../api/chatMG";
import { version } from "../api/prompts";
import { messageCenter } from "../api/notice";
import { mapGetters } from "vuex";

import httpUrls from "../api/requestURL";

export default {
  name: "index",
  data() {
    return {
      httpUrls,
      showclass: "asideshow",
      showtype: false,
      isShowDialog: false,
      isShowRghtNav: true,
      showSidbar: true,
      isSHowArgee: false,
      routerPath: "",
      dialogVisible: false,
      companyMsg: {},
    };
  },
  // 注册组件
  components: {
    navcon,
    leftnav,
    // rightNav,
    IndexDialog,
    MainTitle,
    RightFixed,
    Agree,
    Register,
    remind,
    bindPhone,
  },
  computed: {
    ...mapGetters([
      "carouselMessage",
      "mainLeft",
      "userInfoData",
      "userInfoData",
      "isShowNotice",
      "isShowRightNav",
    ]),
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        if (
          this.$route.path != "/chat/Chat" &&
          this.$route.path != "/drawChat/drawChat"
        ) {
          this.isShowRghtNav = false;
        } else {
          this.isShowRghtNav = true;
        }

        if (this.$route.path == "/collaborate/collaborate") {
          this.isSHowArgee = false;
        } else {
          this.isSHowArgee = true;
        }
        this.routerPath = this.$route.path;
        if (this.$route.path == "/noticeIndex/index") {
          document.getElementById("index-main").scrollTop = 0;
        }
        this.isShowfooterRemark();
      },
    },

    userInfoData: {
      deep: true,
      handler() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let data = {
          user_id: userInfo.user_id,
          page_index: 1,
          page_count: 10,
          is_arousel: "1",
        };
        this.$store.dispatch("user/changeNoticeReadAll", 1);
        messageCenter(data).then((res) => {
          res.data.forEach((v) => {
            if (v.is_read == "0") {
              this.$store.dispatch("user/changeNoticeReadAll", 0);
            }
          });
        });
      },
    },

    userInfoData: {
      deep: true,
      handler() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (
          userInfo.role != "guess" &&
          location.href != httpUrls.url + "#/customized/customized" &&
          this.$route.query.company_code != undefined
        ) {
          this.dialogVisible = true;
        }
      },
    },
  },
  methods: {
    isShowfooterRemark() {
      let bool;
      let path = this.$route.path;
      if (
        path == '/chatVideo/runway' ||
        path == '/chatVideo/pika' ||
        path == '/chatVideo/pixverse' ||
        path == '/chatAudio/newIndex' ||
        path == "/index" ||
        path == "/information/information" ||
        path == "/templateSelect/templateSelect" ||
        path == "/customized/customized" ||
        path == "/digitizedHuman/index" ||
        path == "/mentorChat"||
        path == "/enterpriseWEB/knowledge/index"||
        path == "/enterpriseWEB/knowledge/detail"||
        path == "/enterpriseWEB/knowledge/baseIndex"||
        path == "/enterpriseWEB/knowledge/baseDetail"||
        path == "/enterpriseWEB/knowledge/imageDetail"||
        path == "/enterpriseWEB/knowledge/websiteDetail"||
        path == "/enterpriseWEB/knowledge/documentDetail"||
        path == "/enterpriseWEB/knowledge/documentPreview"||
         path == '/aiWord/index' ||
         path == '/knowledge/knowledgeRobot'||
         path == '/chataboratory/laboratoryChat'||
         path == '/chataboratory/laboratoryDrawChat' || 
         path =='/enterpriseWEB/settings' ||
         path == '/chatVideo/index' ||
         path == '/chataboratory/midjourney'||
         path == '/chataboratory/dell-E'||
         path == '/chataboratory/StableDiffusion'
         
      ) {
        bool = false;
      } else {
        bool = true;
      }
      // console.log(bool)
      return bool;
    },
    closeNotice() {
      // sessionStorage.setItem('closenotice', 1)
      this.$store.dispatch("app/changeCarouselMessage", []);
      this.$store.dispatch("app/changeisShowNotice", false);
    },
    toNotice(item) {
      this.$router.push({
        path: "/noticeIndex/detail",
        query: { id: item.message_id },
      });
    },

    isCloseDialog(bool) {
      // console.log(bool);
      if (bool) {
        sessionStorage.setItem("isShowIndeDialog", true);
        this.isShowDialog = bool;
      }
    },

    isShowSidbar(bool) {
      console.log(bool);
      this.showSidbar = bool;
    },

    showArgee(id) {
      this.$refs.Agree.agreeVisibleParent = true;
      if (id == 1) {
        this.$refs.Agree.agreeVisibleFour = true;
      } else if (id == 2) {
        this.$refs.Agree.agreeVisibleOne = true;
      } else if (id == 3) {
        this.$refs.Agree.agreeVisibleThree = true;
      }
    },

    submitFrom() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      let data = {
        company_code: this.companyMsg.code,
        user_code: userInfo.user_code,
        invite_user_code: this.companyMsg.invite_user_code,
      };
      enterpriseAddember(data).then((res) => {
        console.log(res);
        if (res.code == 20000) {
          this.$message.success("申请成功");
          this.dialogVisible = false;
        } else {
          this.$message(res.msg);
        }
      });
    },
  },
  mounted() {
    // 加载完毕时更换对应的网站logo和标题
    this.$nextTick(() => {
      var link =
        document.querySelector("link[rel*='icon']") || document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      // 根据不同的应用来动态改变网站的图标，httpUrls详情见：api/requestUrl.js
      if (httpUrls.appletId == 0 || httpUrls.appletId == 1) {
        link.href = "./static/images/huiyuanLogo.png"; //icon图标
      } else if (httpUrls.appletId == 2) {
        link.href = "./static/images/hywc_logo.png"; //icon图标
      } else if (httpUrls.appletId == 3) {
        link.href =
          httpUrls.ossUrl + "static/picture/d42de926-6f5d-4989-bd46-54a081bcec20.png"; //icon图标
      }
      document.getElementsByTagName("head")[0].appendChild(link);
    });
    document.title = httpUrls.name;

    // 通过分销的链接进入
    if (location.search != "") {
      let seach = location.search.split("?")[1].split("&");
      console.log(seach,'seach--------')
      localStorage.setItem("parent_user_code", seach[0].split("=")[1]);
      localStorage.setItem("parent_user_role", seach[1].split("=")[1]);
    }
    if (this.$route.query.parent_user_code != undefined) {
      localStorage.setItem("parent_user_code", this.$route.query.parent_user_code);
      localStorage.setItem("parent_user_role", this.$route.query.role);
    }

    // 判断pc和移动端
    var userAgent = window.navigator.userAgent;
    var mobileAgents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
    var isMobile = false;
    for (var i = 0; i < mobileAgents.length; i++) {
      if (userAgent.indexOf(mobileAgents[i]) > -1) {
        isMobile = true;
        break;
      }
    }
    let route = this.$route;
    if (isMobile && location.href != httpUrls.url + "#/customized/customized") {
      if (this.$route.query.parent_user_code != undefined) {
        location.href =
          httpUrls.url +
          "h5/#/?parent_user_code=" +
          this.$route.query.parent_user_code +
          "&role=" +
          this.$route.query.role;
      } else if (this.$route.query.company_code != undefined) {
        // 企业邀请
        location.href =
          httpUrls.url +
          "h5/#/?company_code=" +
          this.$route.query.company_code +
          "&invite_user_code=" +
          this.$route.query.invite_user_code +
          "&company_name=" +
          this.$route.query.company_name;
      } else if (route.path == "/information/information" && route.query.message_id) {
        location.href =
          httpUrls.url +
          `h5/#/childPage/news/information_content?message_id=${route.query.message_id}`;
      } else {
        location.href = httpUrls.url + "h5/#/";
      }
    }
    if (location.href != httpUrls.url + "#/customized/customized") {
      if (this.$route.query.company_code != undefined) {
        // 企业邀请
        this.companyMsg = {
          name: this.$route.query.company_name,
          code: this.$route.query.company_code,
          invite_user_code: this.$route.query.invite_user_code,
        };
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo.role != "guess") {
          this.dialogVisible = true;
        } else {
          this.$refs.Register.registerVisible = true;
        }
      }
    }

    if (localStorage.getItem("ENTERPRRISE_CODE_SWITCH")) {
      this.$store.dispatch(
        "user/changeEnterpriseId",
        localStorage.getItem("ENTERPRRISE_CODE_SWITCH")
      );
    }

    this.routerPath = this.$route.path;
    let isShowIndeDialog = sessionStorage.getItem("isShowIndeDialog");
    // 弹出框
    if (isShowIndeDialog == "true") {
      this.isShowDialog = true;
    }

    // 判断路由，控制右侧侧边栏显示
    if (this.$route.path != "/chat/Chat" && this.$route.path != "/drawChat/drawChat") {
      this.isShowRghtNav = false;
    } else {
      this.isShowRghtNav = true;
    }

    // 协议和政策
    if (this.$route.path == "/collaborate/collaborate") {
      this.isSHowArgee = false;
    } else {
      this.isSHowArgee = true;
    }

    let enterpriseId = localStorage.getItem("ENTERPRRISE_CODE_SWITCH");
    if (enterpriseId != undefined) {
      this.$store.dispatch("user/changeEnterpriseId", enterpriseId);
    }
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // 监听
    this.$root.Bus.$on("toggle", (value) => {
      if (value) {
        this.showclass = "asideshow";
      } else {
        setTimeout(() => {
          this.showclass = "aside";
        }, 300);
      }
    });

    pictures().then((res) => {
      // console.log(res,'二维码图片');
      res.data.forEach((v) => {
        switch (Number(v.type)) {
          case 1:
            this.$store.dispatch("pictures/changeOfficialAccount", v.pic_url);
            break;
          case 2:
            this.$store.dispatch("pictures/changeSerives", v.pic_url);
            // console.log(v.pic_url);
            break;
          case 3:
            this.$store.dispatch("pictures/changeini", v.pic_url);
            break;
          case 4:
            this.$store.dispatch("pictures/changeContactSeriver", v.pic_url);
            break;

          default:
            break;
        }
      });
    });

    let data = {
      user_id: userInfo.user_id,
      page_index: 1,
      page_count: 10,
      is_arousel: "1",
    };
    messageCenter(data).then((res) => {
      // console.log(res);
      let carouselList = [];
      res.data.forEach((v) => {
        if (v.is_read == "0") {
          this.$store.dispatch("user/changeNoticeReadAll", 0);
          this.$store.dispatch("app/changeCarouselMessageState", true);
        }
        if (v.is_arousel == 1 && carouselList.length < 5) {
          carouselList.push(v);
        }
      });
      this.$store.dispatch("app/changeCarouselMessage", carouselList);
      // if (sessionStorage.getItem('closenotice') == '1') {
      //   this.$store.dispatch('app/changeCarouselMessage', [])
      // }
    });

    version({ version: "V5.3 2023-09-07" }).then((res) => {
      if (res.data != "1") {
        this.$message.error("新版本已准备好，请重新刷新！");
      }
    });
  },

  beforeUpdate() {},
  // 挂载前状态(里面是操作)
  beforeMount() {
    // 弹出登录成功
    // this.$message({
    //   message: '登录成功',
    //   type: 'success'
    // })
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
.title-notice {
  transition: left 0.2s;
}
.footer_remark {
  position: absolute;
  /* 480left/490width */
  left: 0px;
  bottom: 0;
  padding: 5px;
  box-sizing: border-box;
  width: calc(100%);
  background: transparent;
  z-index: 999;
  display: flex;
  justify-content: center;
  color: #999999;
}

.footer_remark-on {
  width: calc(100% - 250px);
  left: 240px;
}

.remark {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style>
.el-main {
  padding: 0;
  height: 100%;
}

.title-notice .el-carousel__indicators {
  display: none;
}

.notice_mask {
  height: 30px;
  display: flex;
  background-color: #e0eaff;
  font-size: 12px;
}

.notice_mask .imgs {
  width: 20px;
  margin: auto 5px;
}

.notice_mask .title {
  line-height: 30px;
  color: black;
}
.upgradation {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 30px;
  background-color: #ffffff;
  font-weight: bold;
  z-index: 9999;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 0px !important;
  height: 100%;
  background-color: #f5f6fa;
  margin: 0px;
}
.asideshow {
  width: 240px;
  height: 100%;
  background-color: #f5f6fa;
  margin: 0px;
  transition: all 0.2s;
}

.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
  display: flex;
}

.aside-right {
  width: 240px !important;
  border-left: 1px solid #e5e6eb;
}

.main-con {
  display: flex;
}
</style>

<style scoped>
.right_nav .title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #333333;
  display: flex;
  justify-content: space-between;
  margin: 26px 12px 22px 16px;
}

.right_nav .title .title-left {
  display: flex;
}

.right_nav .title .title-left img {
  margin-right: 12px;
}

.title-right {
  cursor: pointer;
}
.right_nav .title .title-left img,
.right_nav .title .title-right img {
  width: 22px;
  height: 22px;
}

.title-left .tit {
  line-height: 22px;
}

.user-search {
  position: relative;
}

.user-search i {
  position: absolute;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);
}

.user-search {
  padding: 0 8px;
}

.fxid-right {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  box-shadow: 0px 4px 14px rgba(51, 51, 51, 0.1);
  border-radius: 10px 0px 0px 10px;
  width: 62px;
}

.fixed-item {
  display: flex;
  flex-wrap: wrap;
  margin: 22px auto;
  position: relative;
}

.fixed-click {
  margin: 0 auto;
  cursor: pointer;
}

.fixed-item .on {
  color: #1f64ff;
}

.fixed-mark {
  position: absolute;
  right: 62px;
  top: -50%;
  background-color: #fff;
  padding: 20px 26px;
  box-shadow: 1px 4px 10px rgba(170, 178, 200, 0.45);
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  margin-right: 6px;
}
.fixed-mark > i {
  position: absolute;
  top: 10px;
  right: 8px;
}

.fixed-mark > .mark {
  width: 24px;
  height: 24px;
  background-color: #fff;
  transform: rotateZ(45deg);
  position: absolute;
  right: 0;
  top: 39px;
}

.wechart-mini,
.wechart-mini > mark {
  top: -90px;
}

.wechart-servies,
.wechart-servies > mark {
  top: -158px;
}

.fixed-item .img {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  display: block;
}

.popover-mark {
  position: relative;
  padding: 20px 0;
}
.popover-mark i {
  position: absolute;
  right: 8px;
  top: 8px;
}
.popover-mark img {
  display: block;
  margin: 0 26px;
}
.popover-mark div {
  text-align: center;
}
</style>

<style>
.user-select {
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #cccccc;
}

.user-select input {
  height: 32px !important;
  padding: 0 12px;
}
.popper_class-item {
  border: none;
  padding: 0;
  width: 42px;
  display: block;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #999999;
  margin-top: 6px;
  text-align: center;
}

.fixed-item > span {
  display: block;
  margin: 0 auto;
}

.bottomBtn {
  height: 92px;
  width: 223px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 17px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  border-left: 1px solid #e5e6eb;
  z-index: 2;
}

.btnChechbox {
  line-height: 30px;
}

.btnBothButton {
  margin-right: 10px;
}

.primaryBtn {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  border-radius: 2px;
  color: #ffffff;
  background: #1f64ff;
  padding: 3px 13px;
}

.defaultBtn {
  font-weight: 400;
  font-size: 14px;
  border-radius: 2px;
  line-height: 22px;
  margin-left: 8px;
  color: #4e5969;
  background: #f2f3f5;
  padding: 3px 13px;
}

.edit-input-title {
  height: 25px;
  margin-right: 4px;
  background-color: #ffffff;
}

.edit-input-title > input {
  height: 25px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0 4px;
  margin: 0;
  font-size: 14px;
}

.el-message--error {
  top: 50% !important;
  transform: translateX(-50%);
}

.el-message--success {
  top: 50% !important;
  transform: translateX(-50%);
}
</style>
