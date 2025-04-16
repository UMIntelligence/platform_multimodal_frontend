<template>
  <div class="mine-title">
    <div class="select_switch" ref="select_switch" style="margin: 0px">
      <div class="logo">
        <img v-if="httpUrls.appletId == 0 || httpUrls.appletId == 1" class="logo-img"
          src="../assets/images/huiyuanLogo.png" alt="" />
        <img v-if="httpUrls.appletId == 2" class="logo-img" src="../assets/images/hywc_logo.png" alt="" />
        <img v-if="httpUrls.appletId == 3" class="logo-img" src="../assets/images/Frame-logo.jpg" alt="" />
        <span class="logo-title" v-if="showSidbar">{{ httpUrls.name }}</span>

        <div class="cont_menu">
            <div :class="[menu_active == index ? 'menu_li_active' : 'menu_li']" v-for="(item, index) in menuList"
                :key="index" @click="openMenu(item, index)">
                {{ item.title }}
            </div>
        </div>
      </div>

      <div class="btn_group">
        <el-popover placement="bottom" width="180" trigger="click">
          <div style="display: flex; justify-content: center">
            <div style="">
              <img
                style="width: 180px"
                :src="customerImg"
                alt=""
              />
              <div style="text-align: center; position: relative; top: -5px;font-weight: bold;font-size: 14px;color: #000;">
                添加客服微信，免费领算力
              </div>
            </div>
          </div>
          <img slot="reference" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321573@2x.png" class="share-btn" alt="">
        </el-popover>
        <div class="toMember" @click="$router.push('/opinion/opinion')">
          投诉建议
        </div>
        <div class="line"></div>
        <div class="toMember">企业版</div>
        <div class="toMember" style="line-height: 42px; cursor: pointer" @click="handlerTitleRouter('/visited')"> 最近访问</div>
        <div class="toMember" style="line-height: 42px; cursor: pointer" @click="handlerTitleRouter('/shoppingMall')"> 充值</div>
        <div class="toMember" @click="toGuanWang">官网</div>
        <div class="toMember" style="line-height: 42px; cursor: pointer" @click="handlerTitleRouter('/collaborate/collaborateNew')"> 合作</div>
        
        

        

        <!-- <div class="line"></div>
        <div class="toMember" @click="$router.push('/opinion/opinion')">
          投诉及建议
        </div> -->

        <el-badge :is-dot="noticeReadAll == 1 ? false : true" class="notice" style="margin-top: 6px;">
          <img src="../assets/images/bell.png" alt="" style="width: 18px; height: 18px;" @click="$router.push('/noticeIndex/index')" />
        </el-badge>

        <el-button class="login_user" v-if="userInfo.role == 'guess'" @click="login">登录/注册</el-button>

        <el-dropdown v-else style="padding: 0 10px" @command="userCenterOperate">
          <span class="el-dropdown-link user_bsic" @click="$router.push('/center/Center')">
            <span class="img_list">
              <img class="picture" :src="httpUrls.ossUrl + userInfo.avatar_url" alt="" />
              <img v-if="userInfo.role == 'user'" class="VIP" src="../assets/images/vipicon.png" alt="" />
            </span>

            {{ userInfo.nick_name
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              " command="0">
              <span class="el-dropdown-link user_bsic-link" @click="$router.push('/center/Center')">
                <span class="img_list">
                  <img class="picture" :src="httpUrls.ossUrl + userInfo.avatar_url" alt="" />
                  <img v-if="userInfo.role == 'user'" class="VIP" src="../assets/images/vipicon.png" alt="" />
                </span>

                {{ userInfo.nick_name }}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
              <img src="../assets/images/edit3.png" alt="" @click="$router.push('/center/edit')" />
            </el-dropdown-item>

            <div style="height: 1px; background-color: #d8d8d8; margin: 20px"></div>

            <el-dropdown-item class="user_center-item" command="1">
              <img class="img" src="../assets/images/center_distribution.png" alt="" />
              <span>我要分销</span>
            </el-dropdown-item>
            <el-dropdown-item class="user_center-item" command="2">
              <img class="img" src="../assets/images/dingdan.png" alt="" />
              <span>订单记录</span>
            </el-dropdown-item>
            <el-dropdown-item class="user_center-item" command="3">
              <img class="img" src="../assets/images/residueNumber.png" alt="" />
              <span>计费中心</span>
            </el-dropdown-item>
            <el-dropdown-item class="user_center-item" command="4">
              <img class="img" src="../assets/images/shpre.png" alt="" />
              <span>我要分享</span>
            </el-dropdown-item>
            <el-dropdown-item class="user_center-item" command="5">
              <img class="img" src="../assets/images/kami.png" alt="" />
              <span>卡密兑换</span>
            </el-dropdown-item>
            <el-dropdown-item class="user_center-item" command="6">
              <svg class="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                fill="none">
                <circle cx="8" cy="5.6665" r="3" stroke="#333333" />
                <path
                  d="M1.72478 11.8225L4.66331 10.4868C4.87309 10.3915 5.11724 10.4112 5.30897 10.539L7.66243 12.108C7.87013 12.2465 8.13778 12.2573 8.35599 12.1361L10.7348 10.8145C10.9037 10.7207 11.1049 10.7047 11.2864 10.7707L14.2285 11.8406C14.4919 11.9364 14.6673 12.1868 14.6673 12.4671V14.0002C14.6673 14.3684 14.3688 14.6668 14.0007 14.6668H2.00065C1.63246 14.6668 1.33398 14.3684 1.33398 14.0002V12.4294C1.33398 12.168 1.48679 11.9307 1.72478 11.8225Z"
                  stroke="#333333" />
                <rect x="7.5" y="10" width="1" height="2.66667" rx="0.5" fill="#333333" />
              </svg>
              <span>服务商</span>
            </el-dropdown-item>
            <el-dropdown-item class="user_center-item" command="7">
              <img class="img" src="../assets/images/version.png" alt="" />
              <span>版本信息 11.0.0</span>
            </el-dropdown-item>

            <div style="height: 1px; background-color: #d8d8d8; margin: 20px"></div>

            <el-dropdown-item class="user_center-item" command="8">
              <img class="img" src="../assets/images/log-out.png" alt="" />
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="menu_ul" v-if="menu_second.length">
      <!-- $route.path=='/information/information'?selectIfication == item.value ? 'menu_ul_li_active' : 'menu_ul_li': second_active == index ?  -->
        <div v-for="(item, index) in menu_second" :key="index" :class="handlerMenuClass(item,index)?'menu_ul_li_active' : 'menu_ul_li'" 
         @click="openSecodMenu(item, index)">{{ item.title }}</div>
    </div>

    <register ref="Register"></register>
    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { messageCenterState } from "../api/notice";
import { pictures } from "../api/chatMG";
import httpUrls from "../api/requestURL";
import register from "./register";
import pay from "./pay";

export default {
  name: "mine-title",
  data() {
    return {
      httpUrls,
      chatText: "AI35",
      showSid: true,
      userInfo: {},
      isMeun: false,
      menu_active: 0,
      menuList: [],
      menu_second: [],
      second_active: 0,
      customerImg:"", //客服图片
      questionRouter:[  //查询路由
      '/chatVideo/runway',
      '/chatVideo/pika',
      '/chatVideo/pixverse',
      '/chatAudio/newIndex',
      '/chataboratory/StableDiffusion',
      '/chataboratory/midjourney',
      '/chataboratory/dell-E',
        '/chataboratory/laboratoryDrawChat',
        '/chatVideo/index',
        '/chatAudio/index',
        '/workset/treasureBox',
        '/digitizedHuman/mineHuman',
        '/digitizedHuman/mineVideo',
        '/digitizedHuman/mineAudio',
        '/digitizedHuman/humanOrder',
        '/chat/questionChat',
        '/knowledge/knowledge',
        '/liveBroadcast/headPoemArt',
        '/liveBroadcast/headPoemText',
        '/liveBroadcast/headPoemImg',
        '/liveBroadcast/chatWordArt',
        '/liveBroadcast/chatWordArtNew',
        '/liveBroadcast/chatWordArtNewTen'
      ]
    };
  },
  props: {
    showSidbar: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    register,
    pay
  },
  watch: {
    AIName: {
      deep: true,
      handler() {
        this.getAIName();
      },
    },
    $route: {
      deep: true,
      handler(newVal,oldVal) {
        this.searchStatus = false;
        if (
          this.$route.path == "/chat/Chat" ||
          this.$route.path == "/drawChat/drawChat"
        ) {
          this.getAIName();
        } else if (this.$route.path == "/share/share") {
          if (sessionStorage.getItem("sahre_friend") == "1") {
            this.chatText = "分享邀请";
          } else {
            this.chatText = "分销邀请";
          }
        } else {
          this.chatText = this.$route.meta.title;
        }
        let fIndex = this.questionRouter.findIndex(item => item == this.$route.path);
        if(fIndex == -1){
          this.handlerRouteIndex(this.$route.path)
        }
        
      },
    },
    userDataInfo: {
      deep: true,
      handler() {
        this.userInfo = this.userDataInfo;
      },
    },
    userInfoData: {
      deep: true,
      handler() {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      },
    },
    value: {
      deep: true,
      handler() {
        // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (this.value) {
          setTimeout(() => {
            let select_switch =
              document.getElementsByClassName("el-select-dropdown");
            console.log(select_switch);
            select_switch.addEventListener("mouseleave", (e) => {
              this.searchStatus = false;
              console.log("离开");
            });
          }, 200);
        }
      },
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.userInfo == null) {
      this.userInfo = { role: "guess" };
    }

    this.$root.Bus.$on("loginInfo", (value) => {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.userInfo == null) {
        this.userInfo = { role: "guess" };
      }
      
    });
    pictures().then((res) => {
        console.log('进入mainTitle')
        res.data.forEach((item) => {
          if (item.type == 8) this.customerImg = item.pic_url;
        });
      });
  },
  mounted() {
    if (
      this.$route.path == "/chat/Chat" ||
      this.$route.path == "/drawChat/drawChat"
    ) {
      this.getAIName();
    } else {
      this.chatText = this.$route.name;
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.menuList = [
            {
                title: "首页",
                url: "/index",
                children: []
            },
            {
                title: "对话",
                url: "",
                children: [
                  {
                    title: "无忧秘书",
                    url: "/chat/Chat",
                    value:"1004"
                  },
                  {
                    title: "豆包",
                    url: "/chat/Chat",
                    value:"1003"
                  },
                  {
                    title: "文心一言",
                    url: "/chat/Chat",
                    value:"4"
                  },
                  {
                    title: "通义千问",
                    url: "/chat/Chat",
                    value:"10"
                  },
                  {
                    title: "讯飞星火",
                    url: "/chat/Chat",
                    value:"5"
                  },
                  {
                    title: "腾讯混元",
                    url: "/chat/Chat",
                    value:"1001"
                  },
                  {
                    title: "ChatGLM",
                    url: "/chat/Chat",
                    value:"8"
                  },
                  {
                    title: "360智脑",
                    url: "/chat/Chat",
                    value:"12"
                  },
                ]
            },
            {
                title: "绘画",
                url: "",
                children: [
                    {
                        title: "AI绘画",
                        url: "/drawChat/drawChat"
                    },
                    {
                        title: "图片处理",
                        url: "/workset/vision"
                    },
                ]
            },
            {
                title: "音频",
                url: "",
                children: [
                    {
                        title: "语音合成",
                        url: "/voice"
                    },
                    {
                        title: "音视频转写",
                        url: "/convert/voice"
                    },
                    {
                        title: "语音对讲",
                        url: "/voiceIntercom"
                    },
                    {
                        title: "声音克隆v1",
                        url: "/digitizedHuman/audioClone"
                    },
                    {
                        title: "声音克隆v2",
                        url: "/audio/audioClone"
                    },
                    {
                        title: "短视频创作",
                        url: "/digitizedHuman/produceIndex"
                    }
                ]
            },
            {
                title: "视频",
                url: "",
                children: [
                    {
                        title: "视频处理",
                        url: "/video/treasureBox",
                    },
                    {
                        title: "形象克隆",
                        url: "/digitizedHuman/profile_video",
                    },
                    {
                        title: "短视频创作",
                        url: "/digitizedHuman/produceIndex",
                    }
                ]
            },

            {
                title: "数字人",
                url: "",
                children: [
                    {
                        title: "直播数字人",
                        url: "/digitizedHuman/index",
                    },
                    {
                        title: "形象克隆",
                        url: "/digitizedHuman/profile",
                    },
                    {
                        title: "声音克隆",
                        url: "/digital/audioClone",
                    },
                    {
                        title: "短视频创作",
                        url: "/digitizedHuman/produceIndex",
                    }
                ]
            },
            {
                title: "智能体",
                url: "",
                children: [
                    {
                        title: "提示词v1",
                        url: "/mineRole/mineRole",
                    },
                    {
                        title: "提示词v2",
                        url: "/question/question",
                    },
                    {
                        title: "AI智能体",
                        url: "/knowledge/knowledgeRobot",
                    }
                ]
            },
            {
                title: "AI创作",
                url: "",
                children: [
                    {
                        title: "AI PPT",
                        url: "/ppt/ppt",
                    },
                    {
                        title: "AI文档理解",
                        url: "/aiWord/index",
                    },
                    {
                        title: "文字识别",
                        url: "/workset/textChat?title=通用文字识别",
                    },
                    {
                        title: "语音合成",
                        url: "/workset/voiceChat",
                    },
                    {
                        title: "文档对话",
                        url: "/workset/documentChat",
                    }
                ]
            },
            {
                title: "AI应用",
                url: "",
                children: [
                    {
                        title: "数字孪生",
                        url: "/templateSelect/templateSelectNew",
                    },
                    {
                        title: "企业知识库",
                        url: "/enterpriseWEB/knowledge/chatIndex",
                    },
                    {
                        title: "音视频转写",
                        url: "/convert/application",
                    },
                    {
                        title: "看图说话",
                        url: "/identify/identify",
                    },
                    {
                        title: "彩超宝宝",
                        url: "/drawChat/fourDUltrasound",
                    },
                    {
                        title: "多模型对话",
                        url: "/manyModelChat/chat",
                    },
                    {
                        title: "语音对讲",
                        url: "/voiceIntercom_application",
                    },
                    {
                        title: "智能直播",
                        url: "/liveBroadcast/headPoem",
                    },
                ]
            },

            {
                title: "资讯",
                url: "",
                children: [
                { value: "fun", title: "趣闻轶事", url: "/information/information" },
                {
                  value: "free_resources",
                  title: "免费资源",
                  url: "/information/information",
                },
                {
                  value: "applications",
                  title: "垂直应用",
                  url: "/information/information",
                },
                {
                  value: "hashrates_share",
                  title: "算力分享",
                  url: "/information/information",
                },
                { value: "llm", title: "大模型", url: "/information/information" },
                { value: "drawing", title: "AI绘画", url: "/information/information" },
                {
                  value: "meta_universe",
                  title: "元宇宙",
                  url : "/information/information",
                },
                { value: "AIGC", title: "AIGC", url: "/information/information" },
                { value: "AGI", title: "AGI", url: "/information/information" },
                ]
            },
            {
                title: "更多",
                url: "",
                children: [
                    {
                        title: "实验室",
                        url: "/chataboratory/laboratoryChat",
                        value:'0'
                    },
                    
                    {
                        title: "帮助中心",
                        url: "/instruction/instruction",
                    },
                ]
            },
            
        ];
    this.handlerRouteIndex(this.$route.path)
  },
  computed: {
    ...mapGetters([
      "AIName",
      "carouselMessage",
      "contactService",
      "mini",
      "officialAccount",
      "carouselMessageState",
      "noticeReadAll",
      "userDataInfo",
      "userInfoData",
      "selectIfication",
      "selectChat"
    ]),
  },
  methods: {
    //处理二级菜单选中状态
    handlerMenuClass(item,index){
      let bool = false;
      if(this.$route.path == '/information/information'){
        bool = item.value == this.selectIfication;
      }else if(this.$route.path == '/chat/Chat'){
        bool = item.value == this.selectChat
      }else{
        bool = this.second_active == index
      }
      return bool;
    },
    handlerRouteIndex(path){
      let routeArr = this.menuList;
      let menu_active = null;
      let menu_second = [];
      let second_active = 0;
      for (let i = 0; i < routeArr.length; i++) {
        const item = routeArr[i];
        if (item.url == path) {   //进入则说明在第一级
          menu_active = i;
          menu_second = [];
          second_active = 0;
          break; // 找到后跳出循环
        } else {  //否则遍历第二级children路由数据
          let fIndex = item.children.findIndex(fitem => fitem.url == path);   //在列表中查找当前路由路径并返回下标
          if (fIndex!= -1) {
            menu_active = i;
            second_active = fIndex;
            menu_second = item.children;
            break; // 找到后跳出循环
          }
        }
      } 
      this.menu_active = menu_active;
      this.second_active = second_active;
      this.menu_second = menu_second;
    },
    handlerTitleRouter(path){
      this.menu_active = null;
      this.menu_second = [];
      this.second_active = 0;
      this.$router.replace(path)
    },  
    toIndexPage() {
      if (this.$route.path != "/index") {
        this.$router.push("/index");
      }
    },
    // 判断AI35和AI40
    getAIName() {
      if (this.AIName == 0) {
        this.chatText = "AI35";
      } else if (this.AIName == 1) {
        this.chatText = "AI40";
      } else if (this.AIName == 2) {
        this.chatText = "DALL·E 2";
      } else if (this.AIName == 3) {
        this.chatText = "百度绘画";
      }
    },

    toGuanWang() {
      window.open("https://www.umi6.com/");
    },

    toIndex() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
      } else {
        console.log(1);
        this.$refs.Pay.PayVisible = true;
      }
    },

    toHere() {
      this.$router.push("/here/here");
    },

    showSidar() {
      this.showSid = !this.showSid;
      this.$store.dispatch("app/changeShowSidbar", this.showSid);
      this.$emit("isshowsidbar", this.showSid);
    },
    toNotice(item) {
      this.$router.push({
        path: "/noticeIndex/detail",
        query: { id: item.message_id },
      });
    },
    readAll() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      messageCenterState({ user_id: userInfo.user_id }).then((res) => {
        if (res.code == 20000) {
          this.$store.dispatch("user/changeNoticeReadAll", 1);
        } else {
          this.$message.error("网络异常，请稍后重试");
        }
      });
    },

    login() {
      this.$refs.Register.registerVisible = true;
    },

    userCenterOperate(e) {
      console.log(e);
      switch (e) {
        // case '0':
        //     this.$router.push('/center/Center')
        //     break;
        case "1":
          this.$router.push("/mineDistribution/mineDistribution");
          break;
        case "2":
          this.$router.push("/order/Order");
          break;
        case "3":
          this.$router.push("/residueNumber/residueNumber");
          break;
        case "4":
          this.$router.push("/share/share");
          sessionStorage.setItem("sahre_friend", "1");
          break;
        case "5":
          this.$router.push("/change/change");
          break;
        case "6":
          this.$router.push("/chatServe");
          break;
        case "7":
          this.$router.push("/noticeIndex/index");
          break;
        case "8":
          this.logout();
          break;
      }
    },

    logout() {
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

    openMenu(item, index) {
        this.menu_active = index
        this.second_active = 0;
        this.menu_second = item.children
        if(item.children.length > 0) {
            if(this.menu_second[0].url == '/workset/worksetNavVideo'){
              this.$store.dispatch('app/changeworksetLabel', this.menu_second[0].title)
            }else if(this.menu_second[0].url == '/information/information'){
              this.$router.push({name:'information',params:{ification:this.menu_second[0].value}})
              this.$nextTick(() => {
                this.$store.dispatch('app/changeSelectIfication', this.menu_second[0].value);
              })
              return
            }else if(this.menu_second[0].url == '/chat/Chat'){
              this.$router.push(this.menu_second[0].url)
              this.$nextTick(() => {
                this.$store.dispatch("app/changeSelectChat", this.menu_second[0].value);
              })
              return
            }else if(this.menu_second[0].url == '/video/treasureBox'){
              this.$router.push(this.menu_second[0].url+'?title=通用视频生成');
              return
            }else if(this.menu_second[0].url == '/chataboratory/laboratoryChat'){
              this.$router.push(this.menu_second[0].url+'?value=0');
              return
            }
            this.$router.push(this.menu_second[0].url);
        } else {
            this.$router.push(item.url);
        }
    },

    openSecodMenu(item, index) {
        this.second_active = index;
        if(item.url == '/information/information'){
          if(this.$route.path == item.url){
            this.$store.dispatch('app/changeSelectIfication', item.value);
          }else{
            this.$store.dispatch('app/changeSelectIfication', item.value);
            this.$router.push({name:'information',params:{ification:item.value}})
          }
          return
        }if(item.url == '/chat/Chat'){
          if(this.$route.path != item.url){
            this.$router.push(item.url)
          }
          this.$store.dispatch("app/changeSelectChat", item.value);
          return
        }else if(item.url == '/workset/vision'){
          this.$router.push(item.url+'?title=人脸融合');
          return
        }else if(item.url == '/video/treasureBox'){
          this.$router.push(item.url+'?title=通用视频生成');
          return
        }
        this.$router.push(item.url);
    }
  },
};
</script>

<style scoped>
.share-btn{
  width: 88px;
  height:auto;
  margin: 0px 10px;
  cursor: pointer;
}
.search {
  margin: 0px 20px;
  border: 1px solid #c0c4cc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.search /deep/ .el-input__inner {
  border: 0px solid #ccc;
  border-radius: 8px;
}

.search .el-icon-search {
  font-size: 20px;
  /* font-weight: bold; */
  cursor: pointer;
}

.user_center-item {
  display: flex;
  align-items: center;
}

.user_center-item .img {
  width: 16px;
  margin-right: 10px;
}

.btn_group {
  display: flex;
  align-items: center;
}

.btn_group .toMember {
  line-height: 30px;
  margin: 0 10px;
  position: relative;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.btn_group .toMember .fire {
  position: absolute;
  right: -14px;
  top: 0;
}

.btn_group .applet,
.btn_group .help,
.btn_group .services {
  margin: 0 20px;
  cursor: pointer;
}

.btn_group .applet {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.btn_group .line {
  width: 1px;
  height: 20px;
  background: #bababa;
}

.user_bsic {
  display: flex;
  margin: 0 10px;
  cursor: pointer;
  align-items: center;
}

.user_bsic-link {
  display: flex;
  margin: 0 20px;
  cursor: pointer;
  align-items: center;
  margin-left: 0;
}

.img_list {
  position: relative;
  margin-right: 10px;
}

.img_list .picture {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.img_list .VIP {
  width: 40px;
  position: absolute;
  left: -6px;
  bottom: -2px;
}

.user_name {
  line-height: 40px;
  margin-left: 20px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
}

.ai_type_title {
  color: #999999;
  font-size: 20px;
  font-weight: 500;
  margin-right: 90px;
  cursor: pointer;
}

.ai_type_title-on {
  color: #1f64ff;
  border-bottom: 2px solid #1f64ff;
}

.select_switch {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  padding-left: 10px;
}

.mine-title {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e6eb;
  /* width: calc(100% - 240px); */
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 5;
  /* margin-left: 240px; */
}

.mine-title-on {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e6eb;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 5;
}

.content {
  width: 100%;
  height: calc(100% - 22px);
  display: flex;
  flex-direction: column;
}

.select_tyle {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e6eb;
}

.select-topage {
  display: flex;
}

.select-topage .to {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  background: #f2faff;
  border-radius: 6px;
  display: flex;
  padding: 6px 20px;
  cursor: pointer;
}

.select-topage .to img {
  margin-right: 10px;
  vertical-align: middle;
}

.select-topage .to:nth-child(1) {
  margin-right: 10px;
  background-color: #ff9b17;
  color: #ffffff;
}

.select-title {
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #333333;
}

.select-img img {
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.switch_con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-left: 30px;
  width: 180px;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.con_l {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #a0aec0;
}

.select_mode .el-tabs__item {
  width: 180px;
  height: 60px;
  padding-left: 18px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 60px;
  color: #000022;
  text-align: center;
}

.select_mode .el-tabs__active-bar {
  width: 180px;
}

/* .footer_cont {
    background: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    position: relative;
} */
/* .footer_qs {
    width: calc(70% - 240px);
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    left: calc(50% + 120px);
} */
.qs_top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.top_left {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000;
}

.top_right {
  display: flex;
  align-items: center;
}

.change_img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}

.qs_line {
  width: calc(32% - 40px);
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  color: #78829a;
  cursor: pointer;
  background-color: #f6f8fb;
}

.cont {
  width: 80%;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
}

/* .el-input__inner {
    background: #F5F6FA;
    border-radius: 10px;
    height: 58px;
    font-size: 16px;
    padding-left: 30px;
} */

.clear_img {
  width: 29px;
  height: 29px;
  margin-right: 15px;
}

.cg-chat-content {
  width: 80%;
  flex: 1;
  padding: 25px;
  margin: auto;
  overflow: auto;
  padding-top: 0;
}

.cg-chatbox {
  max-width: 66%;
  border-radius: 5px;
  position: relative;
  word-break: break-all;
  word-wrap: break-word;
}

/* .cg-chatbox-left {
    border: 1px solid #F5F6F8;
    display: inline-block;
    background: #F5F6F8;
    border-radius: 8px;
    color: #333;
}

.cg-chatbox-left::before {
    right: 100%;
    border-color: transparent #F5F6F8 transparent transparent;
} */

.cg-chatbox-right {
  border: 1px solid #1f64ff;
  display: inline-block;
  background: #1f64ff;
  border-radius: 8px;
  color: #fff;
  text-align: left;
}

.cg-chatbox-right::before {
  left: 100%;
  border-color: transparent transparent transparent #1f64ff;
}

.cg-chat-left,
.cg-chat-right {
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
}

.cg-user-pic {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: block;
}

.cg-left {
  margin-right: 15px;
}

.cg-right {
  margin-right: 15px;
}

.cg-chat-right {
  justify-content: flex-end;
}

.reply {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
}

.left_tip {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 1px;
}

.left_tip1 {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 1px;
}

.as-cont-right {
  width: 84%;
}

.as_text_left {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.as_text_right {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.copy_img {
  width: 46px;
  height: 22px;
  margin-right: 10px;
}

.copy_img_left {
  width: 46px;
  height: 22px;
  margin-left: 10px;
}

.pay_img {
  width: 80px;
  height: 40px;
  margin-left: 10px;
}

.as-cont-left {
  text-align: left;
}

.cont-time {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #999;
  margin-bottom: 5px;
}

.chat_bot {
  display: flex;
}

.operete_btn {
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  color: #1f64ff;
  border: 1px solid #1f64ff;
  border-radius: 12px;
  padding: 0 10px;
  margin-top: 15px;
  margin-right: 10px;
}

.chat_draw {
  display: flex;
  flex-direction: column;
}

.draw_img {
  width: 256px;
}

.comput {
  display: flex;
}

.put_text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 200%;
  color: #aab2c8;
  display: flex;
  align-items: center;
}

.await_img {
  width: 16px;
  height: 16px;
  opacity: 0.5;
}

.supply_cont {
  background: #fff;
  border-radius: 10px;
  width: 400px;
  margin: auto;
}

.supply_img {
  width: 40px;
  height: 28px;
}

.help-setpon {
  margin-top: 20px;
}

.help-setpon-img {
  height: 24px;
  width: 24px;
}

.select_tyle {
  display: flex;
  flex-direction: column;
}

.notice_mask {
  height: 30px;
  display: flex;
  background-color: #ffefe6;
  font-size: 12px;
}

.notice_mask .imgs {
  width: 20px;
  margin: auto 5px;
}

.notice_mask .title {
  line-height: 30px;
  color: #ff6619;
}

.logo {
  /* margin: 12px auto; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-img {
  width: 30px;
  height: 27px;
  /* margin: auto; */
  /* display: block; */
  /* margin-top: 5px; */
  cursor: pointer;
  margin-right: 10px;
}

.logo-title {
  line-height: 40px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
  cursor: pointer;
}

.logo-mark {
  margin: auto;
  display: flex;
}

.cont_menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
}
.menu_li {
    background: #FFF;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    color: #292C33;
    line-height: 20px;
    padding: 6px 10px;
    cursor: pointer;
}

.menu_li_active {
    background: #EBF0FF;
    border-radius: 10px;
    font-weight: bold;
    font-size: 14px;
    color: #003FFF;
    line-height: 20px;
    padding: 6px 10px;
}

.menu_ul {
    height: 40px;
    line-height: 40px;
    padding: 5px 20px;
    box-sizing: border-box;
    width: 100%;
    background: #EBF1FF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.menu_ul_li {
      line-height: 26px;
      border-bottom: 2px solid #EBF1FF;
      font-weight: bold;
      font-size: 14px;
      color: #000000;
      margin-right: 20px;
      cursor: pointer;
  }
  .menu_ul_li_active {
      line-height: 26px;
      border-bottom: 2px solid #003FFF;
      font-weight: bold;
      font-size: 14px;
      color: #003FFF;
      margin-right: 20px;
      cursor: pointer;
  }
</style>

<style>
.title-notice .el-carousel__indicators {
  display: none;
}

.btn_group .notice {
  margin: 0 10px;
  cursor: pointer;
}

.btn_group .login_user {
  margin: 0 20px;
  background-color: #1f64ff;
  color: #ffffff;
  padding: 9px 20px;
}
</style>