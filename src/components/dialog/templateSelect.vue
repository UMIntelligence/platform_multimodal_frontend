<template>
  <div
    :class="routeText ? 'template-select template-select-on' : 'template-select'"
  >
    <div class="template-main">
      <div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
          <div>
            <span style="color: #333; font-size: 20px; font-weight: 500">提示词大全</span>
            <span style="color: #333; font-size: 12px; font-weight: 400"
              >场景任务一键搞定，打造高效的生产力工具！</span
            >
          </div>
          <div>
            <div class="mine_role" @click="$router.push('/mineRole/mineRole')">
              <i class="el-icon-circle-plus-outline" style="margin-right: 6px"></i
              >创作中心
            </div>
          </div>
        </div>
        <div>
          <el-input
            placeholder="搜索你想要查找的助理"
            v-model="inputValue"
            clearable
            @keyup.enter.native="searchSelect"
            @blur="searchSelect"
          >
            <i
              slot="prefix"
              class="el-input__icon el-icon-search"
              style="cursor: pointer"
              @click="searchSelect"
            ></i>
          </el-input>
        </div>
      </div>

      <!-- 
                工作助理的选项
             -->
      <div class="template_selsect" v-if="titlesCLass == 1">
        <div class="item">
          <label class="item_label">行业</label>
          <el-select v-model="industry" placeholder="请选择行业" class="item_select">
            <el-option
              v-for="item in industryArr"
              :key="item.industry_id"
              :label="item.name"
              :value="item.industry_id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item" style="margin: 0 10px 0 20px">
          <label class="item_label">职业</label>
          <el-select
            v-model="career"
            placeholder="请选择职业"
            clearable
            class="item_select"
            @clear="clearCareer"
          >
            <el-option
              v-for="item in careerArr"
              :key="item.occu_id"
              :label="item.name"
              :value="item.occu_id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item" style="margin: 0 10px">
          <label class="item_label">类型</label>
          <el-select
            v-model="typesOf"
            placeholder="请选择类型"
            clearable
            class="item_select"
            @clear="clearTypesof"
          >
            <el-option
              v-for="item in typesOfArr"
              :key="item.sub_occu_id"
              :label="item.name"
              :value="item.sub_occu_id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item" style="margin: 0 20px 0 10px">
          <label class="item_label" style="width: 64px">从业时间</label>
          <el-select
            v-model="employmentTime"
            placeholder="请选择从业时间"
            clearable
            class="item_select"
            style="width: calc(100% - 84px)"
            @clear="clearEmploymentTime"
          >
            <el-option
              v-for="item in employmentTimeArr"
              :key="item.emp_duration_id"
              :label="item.emp_duration_name"
              :value="item.emp_duration_id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label class="item_label">地位</label>
          <el-select
            v-model="status"
            placeholder="请选择地位"
            clearable
            class="item_select"
            @clear="clearStatus"
          >
            <el-option
              v-for="item in statusArr"
              :key="item.expertise_level_id"
              :label="item.name"
              :value="item.expertise_level_id"
            >
            </el-option>
          </el-select>
        </div>

        <div
          style="
            display: flex;
            width: 60px;
            line-height: 38px;
            margin-left: 20px;
            cursor: pointer;
          "
          @click="selectTitle(1)"
        >
          <img
            src="../../assets/images/resetimg.png"
            style="height: 20px; width: 20px; display: block; margin: auto 0"
            alt=""
          />
          <div style="width: 32px">重置</div>
        </div>
      </div>

      <div
        v-if="!showRole || titlesCLass != 4"
        :style="
          titlesCLass == 1 ? 'height: calc(100% - 188px);' : 'height: calc(100% - 130px);'
        "
      >
        <!-- 模块列表 -->
        <div class="title-list" v-if="showModelList">
          <div
            v-for="(city, i) in titleList"
            :class="
              titleListGrounp == city.module_id ? 'title_list-item on' : 'title_list-item'
            "
            :key="i"
            @click="setTItleIndex(city.module_id)"
          >
            {{ city.name }}
          </div>
        </div>

        <!-- 问答组件 -->
        <template-chat
          v-if="showQurstion"
          :item="tempItem"
          @hidechat="hideChat"
          style="
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            background-color: #f1f2f5;
            padding: 0 20px 20px 20px;
            width: calc(100% - 40px);
          "
        ></template-chat>

        <!-- 问题集 -->
        <!-- v-else-if="!showQurstion && dataList.length != 0" -->
        <div
          class="edit-data-main"
          id="edit-data-main"
          :style="{
            '--a': moduleListHeight == '0px' ? '80px' : moduleListHeight,
          }"
        >
          <div style="display: flex; flex-wrap: wrap" id="data-main-list">
            <div
              class="item"
              @click="$router.push('/mineRole/mineRole')"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                cursor: pointer;
                color: #1f64ff;
              "
            >
              <i style="font-size: 24px; font-weight: bold" class="el-icon-plus"></i>
              <div>创作</div>
            </div>
            <div
              v-for="(item, index) in dataList"
              class="item"
              :key="index"
              @click="editPrompts(item)"
            >
              <div style="display: flex">
                <div
                  :class="
                    applicationCenterId < 8
                      ? 'title_position title_position' + applicationCenterId
                      : 'title_position title_position1'
                  "
                  v-if="applicationCenterId != 3"
                >
                  {{ item.titleOne }}
                </div>
                <img
                  v-else
                  :class="'title_position title_position' + applicationCenterId"
                  :src="httpUrls.ossUrl + item.character_avatar"
                  alt=""
                />
                <div class="title">{{ item.title }}</div>
              </div>
              <div class="main" v-html="item.content"></div>
              <img
                src="../../assets/images/starIcon.png"
                alt=""
                style="position: absolute; right: 0; top: 0; width: 60px; height: 60px"
              />
            </div>
            <!-- <footerRemark></footerRemark> -->
          </div>
        </div>
        <div
          v-if="titleList.length == 0 && dataList.length == 0"
          style="
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #666666;
            margin-top: 30px;
          "
        >
          暂时没有相关内容，我们正在努力录入！
        </div>
      </div>

      <!-- 人物列表 -->
      <div
        v-if="showRole && titlesCLass == 4"
        :style="
          showSpeakChat ? 'height: calc(100% - 110px);' : 'height: calc(100% - 110px);'
        "
      >
        <div
          v-if="roleTitleList.length == 0 && roleList.length == 0"
          style="
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #666666;
            margin-top: 30px;
          "
        >
          暂时没有相关内容，我们正在努力录入！
        </div>

        <!-- 模块列表 -->
        <div class="role-title-list" v-if="showModelList">
          <div
            v-for="(city, i) in roleTitleList"
            :class="
              roleTitleGroup == city.module_id ? 'title_list-item on' : 'title_list-item'
            "
            :key="i"
            @click="selectRole(city.module_id)"
          >
            {{ city.name }}
          </div>
        </div>

        <div
          v-if="showSpeakChat"
          class="role_list"
          :style="{
            '--a': moduleListHeight == '0px' ? '80px' : moduleListHeight,
          }"
        >
          <div style="display: flex; flex-wrap: wrap; padding-bottom: 30px">
            <div
              v-for="(item, index) in roleList"
              class="item"
              @click="toRoleTalk(item)"
              :key="index"
            >
              <div style="display: flex">
                <div class="title_position" style="background-color: transparent">
                  <img
                    style="width: 50px; height: 50px"
                    :src="httpUrls.ossUrl + item.character_avatar"
                    alt=""
                  />
                </div>
                <div class="title">{{ item.title }}</div>
              </div>
              <div class="main" v-html="item.content"></div>
              <img
                src="../../assets/images/starIcon.png"
                alt=""
                style="position: absolute; right: 0; top: 0; width: 60px; height: 60px"
              />
            </div>
          </div>
        </div>

        <chat
          v-else
          @hidechatspeak="hideChatSpeak"
          :roleItem="roleItem"
          style="
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            background-color: #f1f2f5;
            padding: 20px;
            width: calc(100% - 40px);
          "
        ></chat>
      </div>
    </div>

    <!-- 注册组件 -->
    <register ref="Register"></register>
  </div>
</template>

<script>
import {
  typeList,
  recommend,
  prompts,
  promptsRecommend,
  expertiseLevel,
  payIndustry,
  payModules,
  occuDuration,
  occupation,
  getQuestion,
  getOneQuestion,
  secOccupation,
  searchQuestionsSet,
} from "../../api/prompts";
import { mapGetters } from "vuex";
import Register from "../../components/register.vue";
import footerRemark from "../../components/footerRemark";
import templateChat from "./templateChat";
import chat from "./chat";
import httpUrls from "../../api/requestURL";

import { marked } from "marked";
export default {
  name: "template-select",
  data() {
    return {
      industry_id: null, //左侧菜单栏id
      module_id: null, //模块id
      page_index: 1, //页数
      page_count: 12, //条数
      total: null, //总数
      httpUrls,
      inputValue: "",
      showMain: true,
      qsList: {},
      titleList: [],
      titleListGrounp: "",
      titleListIndex: 2,
      dataList: [],
      typeName: "",
      zhixingTItle: "",
      dialogVisible: false,
      textarea: "",
      routeText: true, // 路由path

      industry: "", // 行业
      industryArr: [],
      career: "", // 职业
      careerArr: [],
      typesOf: "", // 类型
      typesOfArr: [],
      employmentTime: "", // 从业时间
      employmentTimeArr: [],
      status: "", // 地位
      statusArr: [],

      titlesCLass: 4,
      createds: "",
      showQurstion: false,
      tempItem: {},
      showRole: true,

      showSpeakChat: true,
      roleTitleGroup: "",
      roleTitleList: [],
      roleList: [],

      moduleListHeight: "",
      roleItem: {},
      showModelList: true,
    };
  },

  components: {
    Register,
    templateChat,
    chat,
    footerRemark,
  },

  computed: {
    ...mapGetters(["userInfoData", "applicationCenterId", "isShowNotice"]),
    listColor() {
      return function (type, id) {
        let msg = "";
        if (type == 1) {
          switch ((Math.random() * 4).toFixed(0)) {
            case 1:
              msg = "item item-on-one";
              break;
            case 2:
              msg = "item item-on-two";
              break;
            case 3:
              msg = "item item-on-three";
              break;
            case 4:
              msg = "item item-on-four";
              break;
            default:
              msg = "item item-on-one";
              break;
          }
        } else if (type == 2) {
          switch ((Math.random() * 4).toFixed(0)) {
            case 1:
              msg = "title on-one";
              break;
            case 2:
              msg = "title on-two";
              break;
            case 3:
              msg = "title on-three";
              break;
            case 4:
              msg = "title on-four";
              break;
            default:
              msg = "title on-one";
              break;
          }
        }
        return msg;
      };
    },
  },

  watch: {
    // inputValue: {
    //     deep: true,
    //     handler() {
    //         if (this.inputValue == '') {
    //             this.showModelList = true
    //         } else {
    //             this.showModelList = false
    //         }
    //     }
    // },
    applicationCenterId: {
      deep: true,
      handler() {
        this.selectTitle(this.applicationCenterId);
        this.page_index = 1;
      },
    },
    // 行业
    industry: {
      deep: true,
      handler() {
        if (this.titlesCLass == 1 && this.industry != "") {
          if (this.createds == "") {
            this.career = "";
            this.careerArr = [];
            this.typesOf = "";
            this.typesOfArr = [];
            this.employmentTime = "";
            this.employmentTimeArr = [];
            this.status = "";
            this.statusArr = [];
            this.getOccupation("", this.industry);
            if (this.career != "") {
              this.getSecOccupation(this.industry, this.career);
              this.getOccuDuration(this.industry, this.career, this.typesOf);
              this.getExpertiseLevel(
                this.industry,
                this.career,
                this.typesOf,
                this.employmentTime
              );
            }
            this.getPayModules(
              "",
              this.industry,
              this.career,
              this.typesOf,
              this.employmentTime,
              this.status
            );
          }
        }
      },
    },
    // 职业
    career: {
      deep: true,
      handler() {
        if (this.titlesCLass == 1 && this.career != "") {
          this.typesOf = "";
          this.typesOfArr = [];
          this.employmentTime = "";
          this.employmentTimeArr = [];
          this.status = "";
          this.statusArr = [];
          this.getSecOccupation(this.industry, this.career);
          if (this.typesOf != "") {
            this.getOccuDuration(this.industry, this.career, this.typesOf);
            this.getExpertiseLevel(
              this.industry,
              this.career,
              this.typesOf,
              this.employmentTime
            );
          }
          this.getPayModules(
            "",
            this.industry,
            this.career,
            this.typesOf,
            this.employmentTime,
            this.status
          );
        }
      },
    },
    // 类型
    typesOf: {
      deep: true,
      handler() {
        if (this.titlesCLass == 1 && this.typesOf != "") {
          this.employmentTime = "";
          this.employmentTimeArr = [];
          this.status = "";
          this.statusArr = [];
          this.getOccuDuration(this.industry, this.career, this.typesOf);
          if (this.employmentTime != "") {
            this.getExpertiseLevel(
              this.industry,
              this.career,
              this.typesOf,
              this.employmentTime
            );
          }
          this.getPayModules(
            "",
            this.industry,
            this.career,
            this.typesOf,
            this.employmentTime,
            this.status
          );
        }
      },
    },
    // 从业时间
    employmentTime: {
      deep: true,
      handler() {
        if (this.titlesCLass == 1 && this.employmentTime != "") {
          this.status = "";
          this.statusArr = [];
          this.getExpertiseLevel(
            this.industry,
            this.career,
            this.typesOf,
            this.employmentTime
          );
          this.getPayModules(
            "",
            this.industry,
            this.career,
            this.typesOf,
            this.employmentTime,
            this.status
          );
        }
      },
    },
    // 地位
    status: {
      deep: true,
      handler() {
        if (this.titlesCLass == 1 && this.status != "") {
          this.getPayModules(
            "",
            this.industry,
            this.career,
            this.typesOf,
            this.employmentTime,
            this.status
          );
        }
      },
    },
  },

  mounted() {
    if (
      this.$route.query.parent_user_code != undefined &&
      this.$route.query.parent_user_code != "undefined"
    ) {
      // this.$refs.Register.registerVisible = true
      localStorage.setItem("parent_user_code", this.$route.query.parent_user_code);
      localStorage.setItem("parent_user_role", this.$route.query.role);
      sessionStorage.setItem("applicationId", this.$route.query.applyId);
      this.$store.dispatch(
        "app/changeApplicationCenterId",
        Number(this.$route.query.applyId)
      );
      this.defaultSelset("mounted");
    }

    if (this.$route.path == "/templateSelect/templateSelect") {
      this.routeText = true;
    } else {
      this.routeText = false;
    }

    // document.title =
    //   httpUrls.name +
    //   "模型指令集,包含有翻译,日常生活,AI升职,教育学习,角色扮演,市场营销,企业管理等等";
    // let metaKeywords = document.createElement("meta");
    // metaKeywords.id = "chat-meta-keywords";
    // metaKeywords.name = "keywords";
    // metaKeywords.content =
    //   "AI解压神器,AI翻译,AI生活计划,AI心理咨询,AI命名,AI升职,AI写论文,AI写作文,AI角色扮演,AI市场营销,AI活动策划方案,AI周报,AI写歌词,AI写脚本,AI新闻稿,AI销售话术,AI写ppt,AI企业管理";
    // document.getElementsByTagName("head")[0].appendChild(metaKeywords);

    // let metaDescription = document.createElement("meta");
    // metaDescription.id = "chat-meta-description";
    // metaDescription.name = "description";
    // metaDescription.content =
    //   httpUrls.name +
    //   "模型指令集,能帮你进行AI翻译,解决日常生活,恋爱助攻问题,在职场中,AI升职,工作汇报,AI企业管理助你一臂之力,它还可以在影视文学,诗词歌赋,教育学习,角色扮演,市场营销,SEO等方面提供更优质内容,提升效率,降低压力.是一款非常实用的人工智能工具.";
    // document.getElementsByTagName("head")[0].appendChild(metaDescription);

    this.moduleListHeight =
      document.getElementsByClassName("role-title-list")[0].clientHeight + "px";

    if (sessionStorage.getItem("applicationId") != undefined) {
      this.$store.dispatch(
        "app/changeApplicationCenterId",
        Number(sessionStorage.getItem("applicationId"))
      );
      this.titlesCLass = Number(sessionStorage.getItem("applicationId"));
      this.selectTitle(Number(sessionStorage.getItem("applicationId")));
    } else {
      this.selectTitle(4);
    }
    //懒加载
    this.$nextTick(() => {
      let historyList = document.getElementById("edit-data-main");
      let historyMask = document.getElementById("data-main-list");
      console.log(historyList, "---节点");
      historyList.addEventListener("scroll", (e) => {
        if (e.target.scrollTop + e.target.offsetHeight >= historyMask.offsetHeight) {
          console.log("进入nextTick");
          this.handleMore();
        }
      });
    });
  },

  beforeDestroy() {
    // document.getElementById("chat-meta-keywords").remove();
    // document.getElementById("chat-meta-description").remove();
  },

  methods: {
    //查看更多
    handleMore() {
      // console.log(this.industry_id, "---industry_id");
      // console.log(this.module_id, "---module_id");
      // console.log(this.total, "---total");
      this.page_index = this.page_index + 1;
      console.log(this.page_index);
      this.getQuestion("", this.industry_id, "", "", "", "", this.module_id);
    },
    searchSelect() {
      this.moduleListHeight = "1px";
      let appletId = sessionStorage.getItem("applicationType");
      if (this.inputValue == "") {
        this.showModelList = true;
      } else {
        this.showModelList = false;
      }
      if (appletId == "1006") {
        appletId = this.industry;
      }
      searchQuestionsSet({
        keywords: this.inputValue,
      }).then((res) => {
        if (appletId == "1003") {
          this.roleList = res.data;
        } else {
          res.data.forEach((v) => {
            v.titleOne = this.sliceTitle(v.title);
          });
          this.dataList = res.data;
        }
        if (this.inputValue == "") {
          this.selectTitle(Number(sessionStorage.getItem("applicationId")));
        }
      });
    },
    hideChatSpeak(data) {
      this.showSpeakChat = true;
    },
    defaultSelset(type) {
      console.log("进入defaultSelset");
      this.page_index = 1;
      if (this.inputValue != "") return;
      if (this.$route.query.type == "workAssistant") {
        // 工作助理
        this.titlesCLass = 1;
        let industry = "";
        let moduleId = "";
        this.createds = "created";
        if (
          this.$route.query.industry != undefined &&
          this.$route.query.industry != null
        ) {
          industry = this.$route.query.industry;
        } else {
          industry = "426270729486406";
        }
        if (this.$route.query.id != undefined && this.$route.query.id != null) {
          moduleId = this.$route.query.id;
        } else {
          moduleId = "426299485399558";
        }
        this.getPayIndustry();
        this.getOccupation(type, industry);
        this.getPayModules(
          type,
          industry,
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          moduleId
        );
      } else if (this.$route.query.type == "lifeAssistant") {
        // 生活助理
        this.titlesCLass = 2;
        let lifeAssistantId = "";
        if (this.$route.query.id != undefined && this.$route.query.id != null) {
          lifeAssistantId = this.$route.query.id;
        } else {
          lifeAssistantId = "427633656235270";
        }
        this.getPayModules(
          type,
          "1001",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          lifeAssistantId
        );
      } else if (this.$route.query.type == "rolePlay") {
        // 角色扮演
        this.titlesCLass = 3;
        let lifeAssistantId = "";
        if (this.$route.query.id != undefined && this.$route.query.id != null) {
          lifeAssistantId = this.$route.query.id;
        } else {
          lifeAssistantId = "427639172982022";
        }
        this.getPayModules(
          type,
          "1003",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          lifeAssistantId
        );
      } else {
        let lifeAssistantId = "";
        if (this.$route.query.id != undefined && this.$route.query.id != null) {
          lifeAssistantId = this.$route.query.id;
        } else {
          lifeAssistantId = "427639172982022";
        }
        this.titlesCLass = 4;
        this.getPayModules(
          type,
          JSON.parse(sessionStorage.getItem("applicationId")) == 5
            ? "1000"
            : JSON.parse(sessionStorage.getItem("applicationId")),
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          lifeAssistantId
        );
      }
    },
    // 清空选项
    clearCareer() {
      this.typesOf = "";
      this.typesOfArr = [];
      this.employmentTime = "";
      this.employmentTimeArr = [];
      this.status = "";
      this.statusArr = [];
      this.getPayModules(
        "",
        this.industry,
        this.career,
        this.typesOf,
        this.employmentTime,
        this.status
      );
    },
    clearTypesof() {
      this.employmentTime = "";
      this.employmentTimeArr = [];
      this.status = "";
      this.statusArr = [];
      this.getPayModules(
        "",
        this.industry,
        this.career,
        this.typesOf,
        this.employmentTime,
        this.status
      );
    },
    clearEmploymentTime() {
      this.status = "";
      this.statusArr = [];
      this.getPayModules(
        "",
        this.industry,
        this.career,
        this.typesOf,
        this.employmentTime,
        this.status
      );
    },
    clearStatus() {
      this.getPayModules(
        "",
        this.industry,
        this.career,
        this.typesOf,
        this.employmentTime,
        this.status
      );
    },

    // tag / 重置
    selectTitle(type) {
      //   console.log(type, "selectTitle获取数据");
      //   console.log(type,'--selectTitle')
      this.showQurstion = false;
      this.titlesCLass = type;
      this.industry = "";
      this.career = "";
      this.typesOf = "";
      this.employmentTime = "";
      this.status = "";
      this.inputValue = "";
      this.showRole = false;
      this.showModelList = true;
      if (type == 1) {
        //工作助理
        this.createds = "created";
        this.getPayIndustry();
        this.getOccupation("created", this.industry);
        this.getPayModules(
          "created",
          this.industry,
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status
        );
        this.$nextTick(() => {
          this.moduleListHeight =
            document.getElementsByClassName("title-list")[0].clientHeight + "px";
        });
        // this.industry = '426270729486406'
        // this.getPayModules('', this.industry, this.career, this.typesOf, this.employmentTime, this.status)
      } else if (type == 2) {
        //实用工具
        this.industry = "";
        this.getPayModules(
          "",
          "1001",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status
        );
        this.$nextTick(() => {
          this.moduleListHeight =
            document.getElementsByClassName("title-list")[0].clientHeight + "px";
        });
      } else if (type == 3) {
        //名人互动
        this.industry = "";
        this.getPayModules(
          "",
          "1003",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status
        );
        this.$nextTick(() => {
          this.moduleListHeight =
            document.getElementsByClassName("title-list")[0].clientHeight + "px";
        });
      } else if (type == 5) {
        // console.log('进入休闲娱乐')
        //休闲娱乐
        this.industry = "";
        this.getPayModules(
          "",
          "1000",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status
        );
        this.$nextTick(() => {
          this.moduleListHeight =
            document.getElementsByClassName("title-list")[0].clientHeight + "px";
        });
      } else {
        this.industry = "";
        this.getPayModules(
          "",
          JSON.parse(sessionStorage.getItem("applicationType")),
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status
        );
        this.$nextTick(() => {
          this.moduleListHeight =
            document.getElementsByClassName("title-list")[0].clientHeight + "px";
        });
      }
    },

    // 模块选择
    setTItleIndex(e) {
      // console.log(e,'当前行model_id')
      this.page_index = 1;
      if (!this.showQurstion && this.titleListGrounp == e) {
        return;
      }
      // console.log(this.titlesCLass)
      this.showQurstion = false;
      this.titleListGrounp = e;
      if (this.titlesCLass == 1) {
        console.log("进入==1");
        this.getQuestion(
          "",
          this.industry,
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          e
        );
        this.module_id = e;
        this.industry_id = this.industry;
      } else if (this.titlesCLass == 2) {
        //效率工具
        this.getQuestion(
          "",
          "1001",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          e
        );
        this.module_id = e;

        this.industry_id = 1001;
      } else if (this.titlesCLass == 3) {
        //人物互动
        this.getQuestion(
          "",
          "1003",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          e
        );
        this.module_id = e;

        this.industry_id = 1003;
      } else if (this.titlesCLass == 5) {
        //娱乐生活
        this.getQuestion(
          "",
          "1000",
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          e
        );
        this.industry_id = 1000;
        this.module_id = e;
      } else {
        this.getQuestion(
          "",
          JSON.parse(sessionStorage.getItem("applicationType")) == 5
            ? "1000"
            : JSON.parse(sessionStorage.getItem("applicationType")),
          this.career,
          this.typesOf,
          this.employmentTime,
          this.status,
          e
        );
        this.module_id = e;
        this.industry_id =
          JSON.parse(sessionStorage.getItem("applicationType")) == 5
            ? "1000"
            : JSON.parse(sessionStorage.getItem("applicationType"));
      }
    },

    selectRole(e) {
      //   console.log("触发selectRole");
      // console.log(e);
      this.showSpeakChat = true;
      this.roleTitleGroup = e;
      this.getQuestion(
        "",
        "1003",
        this.career,
        this.typesOf,
        this.employmentTime,
        this.status,
        e
      );
      this.industry_id = 1003;
      this.module_id = e;
    },

    toRoleTalk(item) {
      //   console.log("触发toRoleTalk");
      // console.log(item);
      this.showSpeakChat = false;
      this.roleItem = { ...item, source: "template" };
    },

    editPrompts(item) {
      //   console.log("触发editPrompts");
      // console.log(item);
      document.title = httpUrls.name + "模型," + item.title + "_" + httpUrls.name;
      // let chatMetaDescription = document.getElementById("chat-meta-description");
      if (!item.content) {
        console.log("点不开item.content");
      }
      // if (chatMetaDescription) {
      //   chatMetaDescription.content = item.content;
      // } else {
      //   console.log("点不开chatMetaDescription");
      //   console.log(chatMetaDescription.content, "chatMetaDescription");
      //   console.log(item.content, "item.content");
      // }
      this.tempItem = item;
      this.showQurstion = true;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // this.dialogVisible = true;
      this.textarea = item.content;
      let type = "";
      if (this.titlesCLass == 1) {
        type = "workAssistant";
      } else if (this.titlesCLass == 2) {
        type = "lifeAssistant";
      } else if (this.titlesCLass == 3) {
        type = "rolePlay";
      }
      let data = {
        parent_user_code: userInfo.role != "guess" ? userInfo.user_id : "",
        role: userInfo.role,
        type: type,
        id: item.module_id,
        question: item.question_id,
        applyId: sessionStorage.getItem("applicationId"),
      };
      if (this.titlesCLass == 1) {
        data.industry = this.industry;
      }
      this.$router.push({
        path: "/templateSelect/templateSelect",
        query: data,
      });
      // this.$router.push({
      //   path: "/chat/questionChat",
      //   query: data,
      // });
    },

    toIndexPage(id) {
      this.$router.push({
        name: "chat",
        params: { id, item: this.textarea },
      });
      this.$store.dispatch("user/changeRouterIndex", 1);
    },
    useingTemplate(item) {
      this.$emit("useingtemplate", item.prompts_name);
    },

    // 获取行业列表
    getPayIndustry() {
      payIndustry().then((res) => {
        setTimeout(() => {
          this.createds = "";
        }, 3000);
        this.industryArr = res.data;
      });
    },
    // 获取职业列表
    getOccupation(type, industry) {
      if (type == "created") {
        industry = "426270729486406";
      }
      let data = { industry_id: industry };
      occupation(data).then((res) => {
        if (type == "created") {
          this.industry = "426270729486406";
        } else if (type == "mounted") {
          this.industry = industry;
        }
        this.careerArr = res.data;
      });
    },

    // 获取类型列表
    getSecOccupation(industry, career) {
      let data = {
        industry_id: industry,
      };
      if (career != "") {
        data.occu_id = career;
      }
      secOccupation(data).then((res) => {
        this.typesOfArr = res.data;
      });
    },
    // 获取从业时间列表
    getOccuDuration(industry, career, typesOf) {
      let data = {
        industry_id: industry,
        // occu_id: career,
        // sub_occu_id: typesOf
      };
      if (career != "") {
        data.occu_id = career;
      }
      if (typesOf != "") {
        data.sub_occu_id = typesOf;
      }
      occuDuration(data).then((res) => {
        this.employmentTimeArr = res.data;
      });
    },

    // 获取专业水平列表
    getExpertiseLevel(industry, career, typesOf, employmentTime) {
      let data = {
        industry_id: industry,
        // occu_id: career,
        // sub_occu_id: typesOf,
        // emp_duration_id: employmentTime
      };
      if (career != "") {
        data.occu_id = career;
      }
      if (typesOf != "") {
        data.sub_occu_id = typesOf;
      }
      if (employmentTime != "") {
        data.emp_duration_id = employmentTime;
      }
      expertiseLevel(data).then((res) => {
        this.statusArr = res.data;
      });
    },
    // 操作模块/根据上面的5个下拉列表请求
    getPayModules(type, industry, career, typesOf, employmentTime, status, id = "") {
      // type：是否为默认状态, industry：行业, career：职业, typesOf：类型, employmentTime：从业时间, status：地位, id：模块id
      if (type == "created") {
        industry = "426270729486406";
      }
      let data = {
        industry_id: industry,
        // occu_id: career,
        // sub_occu_id: typesOf,
        // emp_duration_id: employmentTime,
        // expertise_level_id: status
      };
      if (career != "") {
        data.occu_id = career;
      }
      if (typesOf != "") {
        data.sub_occu_id = typesOf;
      }
      if (employmentTime != "") {
        data.emp_duration_id = employmentTime;
      }
      if (status != "") {
        data.expertise_level_id = status;
      }
      payModules(data).then((res) => {
        this.titleList = res.data;
        this.roleTitleList = res.data;
        this.dataList = [];
        this.roleList = [];
        if (res.data.length != 0 && id != "") {
          this.getQuestion(type, industry, career, typesOf, employmentTime, status, id);
          this.industry_id = industry;
          this.module_id = id;
          this.titleListGrounp = id;
        } else if (res.data.length != 0) {
          this.getQuestion(
            type,
            industry,
            career,
            typesOf,
            employmentTime,
            status,
            res.data[0].module_id
          );
          this.module_id = res.data[0].module_id;
          this.industry_id = industry;
          this.titleListGrounp = res.data[0].module_id;
          this.roleTitleGroup = res.data[0].module_id;
        } else {
          this.dataList = [];
        }
      });
    },
    // 问题集
    getQuestion(type, industry, career, typesOf, employmentTime, status, moduleId) {
      if (type == "created") {
        industry = "426270729486406";
      }
      let data = {
        industry_id: industry,
      };
      if (career != "") {
        data.occu_id = career;
      }
      if (typesOf != "") {
        data.sub_occu_id = typesOf;
      }
      if (employmentTime != "") {
        data.emp_duration_id = employmentTime;
      }
      if (status != "") {
        data.expertise_level_id = status;
      }
      if (moduleId != "") {
        data.module_id = moduleId;
      }
      if (type == "mounted" && this.$route.query.id != undefined) {
        let oneData = "";
        oneData += `&module_id=${moduleId}`;
        oneData += `&question_id=${this.$route.query.question}`;
        // console.log(oneData,'--问题集请求参数')
        getOneQuestion(oneData).then((res) => {
          let data = res.data;
          data.map((item) => {
            let arr = item.content.match(/\[(.+?)\]/g);
            item.htmlUr = item.content;
            item.titleOne = this.sliceTitle(item.title);
            if (!arr) return;
            arr.map((list) => {
              item.htmlUr = item.htmlUr.replace(
                list,
                `<span style='color:#1F64FF'> ${list} </span>`
              );
            });
          });
          this.dataList = data;
          this.roleList = data;
          if (this.$route.query.question != undefined && type == "mounted") {
            data.forEach((v) => {
              if (this.$route.query.question == v.question_id) {
                this.tempItem = v;
              }
            });
            this.showQurstion = true;
          }
        });
      } else {
        data.page_index = this.page_index;
        data.page_count = this.page_count;
        getQuestion(data).then((res) => {
          let data = res.data;
          this.total = res.total;
          data.map((item) => {
            // if (!item.hasOwnProperty('info')) {
            let arr = item.content.match(/\[(.+?)\]/g);
            item.htmlUr = item.content;
            item.titleOne = this.sliceTitle(item.title);
            if (!arr) return;
            arr.map((list) => {
              item.htmlUr = item.htmlUr.replace(
                list,
                `<span style='color:#1F64FF'> ${list} </span>`
              );
            });
          });
          if (this.total >= this.dataList.length && this.dataList.length) {
            if (this.page_index != 1) {
              console.log("进入");
              this.dataList = this.dataList.concat(data);
              this.roleList = this.roleList.concat(data);
            } else {
              this.dataList = data;
              this.roleList = data;
            }
          } else {
            console.log(this.total, this.dataList.length);
            console.log("进入else");
            this.dataList = data;
            this.roleList = data;
          }
          if (this.$route.query.question != undefined && type == "mounted") {
            data.forEach((v) => {
              if (this.$route.query.question == v.question_id) {
                this.tempItem = v;
              }
            });
            this.showQurstion = true;
          }
        });
      }
    },

    // 去掉空格
    sliceTitle(title) {
      let tit = title.replace(/\s*/g, "");
      tit = tit.slice(0, 1);
      return tit;
    },

    hideChat() {
      //   console.log("进入hideChat");
      this.showQurstion = false;
      this.defaultSelset("");
    },
  },
};
</script>

<style scoped>
.template-select {
  /* padding: 40px 60px; */
  /* padding-bottom: 20px; */
  width: 100%;
  height: 100%;
  /* border-bottom: 2px solid #FFFFFF; */
  /* border-radius: 10px 10px 0 0; */
  background: #f1f2f5;
}

.template-select-on {
  /* min-height: calc(100% - 100px); */
  /* height: calc(100% - 130px); */
  width: calc(100%);
  /* padding: 0 160px; */
}

.template-select .top .item {
  margin-top: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.template-select .top .item .title-img {
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
}

.template-select .top .item .title-butom {
  line-height: 35px;
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 14px;
  color: #78829a;
  border: 1px solid #78829a;
  padding: 0 20px;
  border-radius: 4px;
  height: 37px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
}

.template-select .top .item .title {
  display: flex;
}
.template-select .top .item .title .title-tit {
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  margin-right: 20px;
  line-height: 35px;
  width: 90px;
}

.template-select .top .item .title .title-item {
  background: #ffffff;
  border-radius: 4px;
  padding: 8px 20px;
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 14px;
  color: #78829a;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.template-select .top .item .title .title-item:hover {
  color: #1f64ff;
  background: rgba(31, 100, 255, 0.15);
}

.template-main {
  height: calc(100% - 40px);
  position: relative;
  padding: 40px 10% 0 60px;
  overflow: hidden;
}
.template-main > .title {
  /* font-family: 'PingFang SC'; */
  font-weight: 500;
  font-size: 36px;
  color: #333333;
  text-align: center;
  padding-top: 50px;
}
.template-main .title-item {
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 20px;
  color: #999999;
  text-align: center;
  margin: 10px 0 20px 0;
}

.template-main .main-input {
  width: 220px;
  height: 32px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  /* padding-right: 160px; */
  right: 0;
}

.template-main .main-input .img {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
}

.template-main .title-list {
  display: flex;
  margin: 0 -10px;
  margin-top: 20px;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
  /* padding: 0 120px 0 140px; */
}

.title_list-item {
  padding: 10px 20px;
  color: #333;
  text-align: right;
  font-size: 15px;
  font-weight: 500;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.1);
  margin: 10px;
  cursor: pointer;
}

.title_list-item:hover {
  color: #1f64ff;
}

.template-main .title-list .on,
.role-title-list .on {
  background-color: #1f64ff;
  color: #ffffff;
}

.template-data-mian {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: calc(100%);
  /* padding: 0 140px; */
  /* justify-content: space-between; */
}

.edit-data-main {
  height: calc(100% - var(--a));
  overflow-y: auto;
  margin: 0 -1.5%;
  padding-bottom: 20px;
  box-sizing: border-box;
  /* display: flex; */
  /* justify-content: space-between; */
}

.template-data-mian .item {
  padding: 20px;
  /* margin: 0 20px 20px 20px; */
  background: linear-gradient(180deg, #e4f4fe 0%, #ffffff 35.94%);
  border-radius: 8px;
  width: calc(23% - 40px);
  box-shadow: 0px 4px 14px rgba(51, 51, 51, 0.1);
  margin-right: 1%;
}

.template-data-mian .item .title {
  /* font-family: 'PingFang SC'; */
  font-weight: 500;
  font-size: 18px;
  color: #549fe0;
  text-align: left;
}

.template-data-mian .item .tit-item {
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 12px;
  padding: 6px 0 10px 0;
  border-bottom: 1px solid rgba(51, 51, 51, 0.1);
  color: #999999;
}

.template-data-mian .item .item-main {
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}

.template-data-mian .item .item-main .title {
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) -28.33%, #ccdcff 100%);
  border-radius: 0px 0px 10px 0px;
  /* font-family: 'PingFang SC'; */
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
  padding: 0 16px;
  color: #1f64ff;
}

.template-data-mian .item .item-main:hover {
  background-color: #f2faff;
}

.template-data-mian .item-on-one {
  background: linear-gradient(180deg, #e4f4fe 0%, #ffffff 35.94%);
}

.template-data-mian .item-on-two {
  background: linear-gradient(180deg, #fceaf8 0%, #ffffff 36.46%);
}
.template-data-mian .item-on-three {
  background: linear-gradient(180deg, #e9edfe 0%, #ffffff 36.46%);
}
.template-data-mian .item-on-four {
  background: linear-gradient(180deg, #fceee8 0%, #ffffff 35.94%);
}
.template-data-mian .item .on-one {
  color: #549fe0;
}
.template-data-mian .item .on-two {
  color: #ed6fd0;
}
.template-data-mian .item .on-three {
  color: #616bf2;
}
.template-data-mian .item .on-four {
  color: #f09264;
}

.edit-data-main .item {
  padding: 15px 20px 20px 20px;
  position: relative;
  width: calc(22% - 42px);
  background: #ffffff;
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 14px rgba(51, 51, 51, 0.1);
  margin: 20px 1.5%;
  border-radius: 10px;
  transition: all 0.2s;
  max-height: 100px;
}

.edit-data-main .item:hover {
  transform: scale(1.05);
}

.title_position1 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #ffb833;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}

.title_position2 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #7f48ff;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}

.title_position3 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #40de9f;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}
.title_position5 {
  border-radius: 6px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  background: #ff8e8e;
  width: 50px;
  height: 50px;
  left: 20px;
  top: -25px;
}

.edit-data-main .item .edit {
  background: #f2faff;
  border-radius: 0px 8px;
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 14px;
  color: #1f64ff;
  position: absolute;
  right: 0;
  top: 0;
  height: 30px;
  line-height: 30px;
  display: flex;
  padding: 0 6px;
}

.edit-data-main .item .edit img {
  width: 18px;
  height: 18px;
  margin: auto 0;
  display: block;
}

.edit-data-main .item .title {
  /* font-family: 'PingFang SC'; */
  font-weight: 600;
  font-size: 18px;
  color: #333333;
  text-align: left;
  margin-bottom: 10px;
  line-height: 50px;
  margin-left: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 50px);
}

.edit-data-main .item .main {
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  /* margin-bottom: 20px; */
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.edit-data-main .item .btn {
  border: 0.5px solid #cdcdcd;
  border-radius: 2px;
  padding: 5px 10px;
  /* font-family: 'PingFang SC'; */
  font-weight: 400;
  font-size: 12px;
  display: inline-block;
  color: #cdcdcd;
  position: absolute;
  bottom: 10px;
  left: 20px;
}

.edit-data-main .item > img {
  width: 72px;
  height: 78px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.tuijian {
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  /* font-family: 'PingFang SC'; */
  font-size: 14px;
  color: #333333;
  padding: 8px 20px;
  width: 36px;
  height: 22px;
  margin-right: 20px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
}

.mine_role {
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  background-color: #1f64ff;
}

.role-title-list {
  display: flex;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
  margin: 10px -10px;
}

.role-title-list .item {
  margin-right: 10px;
  padding: 4px 12px;
  border: 1px solid #666666;
  font-size: 14px;
}

.role_list {
  /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap; */
  margin: 0 -10px;
  position: relative;
  height: calc(100% - var(--a));
  overflow-y: auto;
}
.role_list .item {
  margin: 10px;
  padding: 15px 20px 20px 20px;
  position: relative;
  width: calc(25% - 62px);
  background: #ffffff;
  cursor: pointer;
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 14px rgba(51, 51, 51, 0.1);
  border-radius: 10px;
  transition: all 0.2s;
}

.role_list .item:hover {
  transform: scale(1.05);
}

.role_list .title_position {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background-color: #1f64ff;
}

.role_list .item .title {
  color: #333;
  font-size: 18px;
  font-weight: 500;
  line-height: 50px;
  margin-left: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 68px);
}

.role_list .item .main {
  font-weight: 400;
  font-size: 14px;
  color: #666;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}
</style>

<style>
.template-main .main-input .el-input {
  width: 248px;
}
.template-main .main-input input {
  height: 32px !important;
  background: #ffffff;
  border-radius: 4px;
  padding-left: 12px;
  width: 248px;
}
.template-main .title-list .item span {
  border: none;
  border-radius: 4px;
}

.template-main .title-list .item {
  /* padding: 8px 20px;
    margin: 0 20px 20px 0;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    /* font-family: 'PingFang SC'; */
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  cursor: pointer;
  /* font-family: 'PingFang SC'; */
  margin: 0 20px 20px 0;
  border-radius: 4px;
  color: #333333;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
.dialogClass .el-textarea__inner {
  height: 224px;
}

.dialogClass {
  position: relative;
}

.dialogClass .el-dialog__title {
  /* font-family: 'PingFang SC'; */
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: #303133;
  position: absolute;
  z-index: 2;
}

.dialogClass-img {
  background: linear-gradient(90deg, #1f64ff -2.25%, rgba(255, 255, 255, 0) 98.61%);
  border-radius: 6px;
  width: 80px;
  height: 10px;
  position: absolute;
  top: 35px;
  left: 21px;
  z-index: 1;
}

.dialogClass .cancel {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  /* width: 74px; */
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
}
.dialogClass .primary {
  /* width: 74px; */
  height: 32px;
  background: #1f64ff;
  border-radius: 4px;
  line-height: 32px;
  padding: 0 10px;
}

.template_titles {
  display: flex;
}

.template_titles .item {
  display: flex;
  margin-left: 20px;
  padding: 0 18px;
  padding-bottom: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.template_titles .item-on {
  border-bottom: 2px solid #1f64ff;
}

.template_titles .item .imgs {
  width: 24px;
  height: 24px;
  display: block;
  margin: auto 0;
  margin-right: 12px;
}

.template_titles .item .spans {
  font-weight: 500;
  font-size: 20px;
  color: #666666;
}

.template_titles .item .spans-on {
  color: #1f64ff;
}

.template_selsect {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: space-between;
}

.template_selsect .item {
  display: flex;
  /* margin-right: 38px; */
}

.template_selsect .item .item_label {
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  margin-right: 20px;
  line-height: 38px;
  width: 32px;
}

.template_selsect .item .item_select {
  width: calc(100% - 52px);
  max-width: 200px;
  background: #f6f8fb;
}
.template_selsect .item .item_select input {
  height: 38px;
  border-radius: 4px;
  background: #f6f8fb;
  padding-left: 12px;
  font-size: 16px;
  color: #1f64ff;
}
</style>
