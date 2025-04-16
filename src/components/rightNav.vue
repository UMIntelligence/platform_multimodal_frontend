<template>
  <div
    id="right-nav"
    :class="isShowRightSidbar ? 'right_nav' : 'right_nav right_nav-on'"
    :style="{
      top: isShowRightSidbar ? '-10' : '-10',
    }"
  >
    <div class="retract-btn" v-if="$route.path != '/templateSelect/templateSelectNew'">
      <!-- <i
        style="cursor: pointer"
        class="el-icon-arrow-left"
        v-if="isShowRightSidbar"
        @click="isShowRightNav"
      ></i> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        v-if="!isShowRightSidbar"
        @click="isShowRightNav"
        style="cursor: pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10.5 20.5L15 12L10.5 2.5"
          stroke="#666666"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        @click="isShowRightNav"
        style="cursor: pointer"
        v-if="isShowRightSidbar"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M13.5 20.5L9 12L13.5 2.5"
          stroke="#666666"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- <i
        
        class="el-icon-arrow-right"
        
        
      ></i> -->
    </div>
    <div
      class="new-chat-btn"
      :style="isShowRightSidbar ? '' : 'display:flex;justify-content: center;'"
    >
      <el-button
        icon="el-icon-plus"
        type="primary"
        style="padding: 10px 36px; background-color: #1f64ff"
        v-if="isShowRightSidbar"
        @click="$emit('resetnewchat', aiNameValue)"
        >创建新会话</el-button
      >
    </div>
    <div class="title" v-if="isShowRightSidbar">
      <!-- <div class="title-left" v-if="$route.path == '/chat/Chat'">
        <span style="white-space: nowrap; margin-right: 10px">历史记录</span>
      </div> -->
      <div class="title-left">
        <span style="white-space: nowrap; margin-right: 10px">历史记录</span>
        <el-dropdown
          @command="handleCommand"
          trigger="click"
          v-if="
            $route.path == '/chat/Chat' ||
            $route.path == '/knowledge/knowledgeChat' ||
            $route.path == '/chat/questionChat' ||
            $route.path == '/templateSelect/templateSelectNew' ||
            $route.path == '/mentorChat'
          "
          style="cursor: pointer"
        >
          <span class="el-dropdown-link">
            {{ aiItemName.label }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in aiNameList" :key="i" :command="item">{{
              item.label
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown
          @command="handleCommand"
          trigger="click"
          v-if="$route.path == '/drawChat/drawChat'"
          style="cursor: pointer"
        >
          <span class="el-dropdown-link">
            {{ aiItemName.label }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in aiNameList2" :key="i" :command="item">{{
              item.label
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="user-search" v-if="isShowRightSidbar">
      <el-input
        class="user-select"
        placeholder="搜索历史记录"
        @change="selectSeach"
        v-model="userSelect"
      >
      </el-input>
      <i class="el-icon-search" @click="selectSeach"></i>
    </div>

    <div
      v-if="isShowRightSidbar"
      :style="
        selectUserHuihua
          ? 'height: calc(100% - 277px);overflow-y: auto;'
          : 'height: calc(100% - 164px);overflow-y: auto;'
      "
      ref="queryChatList"
    >
      <div class="chat_count" ref="inner">
        <div v-for="(item, index) in chatList" :key="index" style="display: flex">
          <el-checkbox-group
            v-model="chartTitleList"
            @change="handleCheckedCitiesChange"
            style="line-height: 35px"
          >
            <el-checkbox
              v-if="selectUserHuihua"
              style="vertical-align: middle"
              :label="item.session_code"
              :key="item.session_code"
            >
              <span></span>
            </el-checkbox>
          </el-checkbox-group>

          <!-- <router-link :to="{ path: $router.path }"> -->
            <div
              :class="[current == index ? 'chat' : 'unchat']"
              @click.stop="current == index ? '' : changeIndex(item, index)"
            >
              <span
                v-if="!item.checkBox"
                :class="[current == index ? 'unchat_text' : 'unchat_text']"
                :title="item.msg"
                style="vertical-align: middle"
                >{{ item.title }}</span
              >
              <el-input
                class="edit-input-title"
                :autofocus="autoFocuss"
                @blur="editInputBlur(item)"
                v-if="item.checkBox"
                v-model="editTitle"
                placeholder="请输入内容"
                @change="(event) => editDuiHua(item)"
              ></el-input>
              <img
                class="sc_img"
                src="../assets/images/editName.png"
                alt=""
                v-if="!selectUserHuihua"
                @click.stop="editLocalTitle(item)"
              />
              <img
                class="sc_img"
                style="margin-right: 6px"
                src="../assets/images/shanchu.png"
                alt=""
                v-if="!selectUserHuihua"
                @click.stop="delChat(item.session_code)"
              />
            </div>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div v-if="selectUserHuihua && isShowRightSidbar" class="bottomBtn">
      <div class="btnChechbox">
        <el-checkbox
          style="margin: 0 12px 0 0"
          v-model="checkBoxTotal"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </div>
      <div class="btnBothButton">
        <el-button class="primaryBtn" type="primary" @click="deleteAllChat"
          >删除</el-button
        >
        <el-button class="defaultBtn" @click="cancelDeleteChat">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  chatList,
  ChatDelete,
  guessLogin,
  getUserInfo,
  deleteFootprint,
  submitFootprint,
} from "../api/chatMG";
import { mapGetters } from "vuex";
import { updateTitle } from "../api/prompts";
import { manyChatList, deleteManyChat } from "../api/manyModelChat";

export default {
  name: "rightNav",
  data() {
    return {
      checkBox: [], // 多选删除
      chartTitleListTotal: [],
      chartTitleList: [],
      checkBoxTotal: false,
      isIndeterminate: false,
      AINames: "AI35",
      userSelect: "",
      wechartVisible: false,
      miniProgVisible: false,
      serviceVisible: false,
      collapsed: false,
      allmenu: [],
      current: -1, //不默认选中会话列表
      searchValue: "",
      chatList: [],
      pageTotal: 0,
      page_size: 30,
      page: 1,
      pageCount: 0,
      loginInfo: "",
      username: "游客ID",
      chat_type: 8,
      selectUserHuihua: false,
      editTitle: "",
      chatList: [], // 需要删除的会话列表
      autoFocuss: false,
      aiNameValue: 4,
      aiNameList: [
        { label: "文心一言", value: 4 },
        { label: "讯飞星火", value: 5 },
        { label: "ChatGLM", value: 8 },
        { label: "通义千问", value: 10 },
        { label: "360智脑", value: 12 },
        { label: "豆包", value: 1003 },
        { label: "腾讯混元", value: 1001 },
        { label: "无忧秘书", value: 1004 },
        // {label: '商汤日日新', value: 11},
        // {label: 'AI35', value: 0},
        // {label: 'AI40', value: 1},
        // {label: 'Claude', value: 7},
      ],
      aiNameList2: [
        { label: "Stable Diffusion", value: 9 },
        { label: "Midjourney", value: 6 },
        // {label: 'DALL·E 2', value: 2},
        { label: "百度绘画", value: 3 },
      ],
      aiItemName: { label: "文心一言", value: 4 },
      rotateArrow: false,
      list: [],
      isLoading: false, //节流
      containerHeight: 0,
      innerHeight: 0,
      isShowRightSidbar: true,
    };
  },
  computed: {
    ...mapGetters([
      "AIName",
      "chatListLength",
      "userInfoData",
      "carouselMessage",
      "selectChat",
    ]),
  },
  props: {
    updataRightList: {
      type: Number,
      default: 4,
    },
    sessionRightNavCode: {
      type: String,
      default: "",
    },
    randomStr: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    checkBoxTotal: {
      deep: true,
      handler() {
        if (this.checkBoxTotal) {
          this.checkBox.forEach((v, i) => {
            this.checkBox[i] = true;
          });
        } else {
          this.checkBox.forEach((v, i) => {
            this.checkBox[i] = false;
          });
        }
      },
    },
    // ai的id
    updataRightList: {
      deep: true,
      handler() {
        this.chat_type = this.updataRightList;
        this.aiNameValue = this.updataRightList;
        if (this.updataRightList == 0 || this.updataRightList == undefined) {
          this.AINames = "AI35";
          this.aiItemName = { value: 0, label: "AI35" };
        } else if (this.updataRightList == 1) {
          this.AINames = "AI40";
          this.aiItemName = { value: 1, label: "AI40" };
        } else if (this.updataRightList == 2) {
          this.AINames = "DALL·E 2";
          this.aiItemName = { value: 2, label: "DALL·E 2" };
        } else if (this.updataRightList == 3) {
          this.AINames = "百度绘画";
          this.aiItemName = { value: 3, label: "百度绘画" };
        } else if (this.updataRightList == 4) {
          this.AINames = "文心一言";
          this.aiItemName = { value: 4, label: "文心一言" };
        } else if (this.updataRightList == 5) {
          this.AINames = "讯飞星火";
          this.aiItemName = { value: 5, label: "讯飞星火" };
        } else if (this.updataRightList == 6) {
          this.AINames = "Midjourney";
          this.aiItemName = { value: 6, label: "Midjourney" };
        } else if (this.updataRightList == 7) {
          this.AINames = "Claude";
          this.aiItemName = { value: 7, label: "Claude" };
        } else if (this.updataRightList == 8) {
          this.AINames = "ChatGLM";
          this.aiItemName = { value: 8, label: "ChatGLM" };
        } else if (this.updataRightList == 9) {
          this.AINames = "Stable Diffusion";
          this.aiItemName = { value: 9, label: "Stable Diffusion" };
        } else if (this.updataRightList == 10) {
          this.AINames = "通义千问";
          this.aiItemName = { value: 10, label: "通义千问" };
        } else if (this.updataRightList == 11) {
          this.AINames = "商汤日日新";
          this.aiItemName = { value: 11, label: "商汤日日新" };
        } else if (this.updataRightList == 12) {
          this.AINames = "360智脑";
          this.aiItemName = { value: 12, label: "360智脑" };
        } else if (this.updataRightList == 1000) {
          this.AINames = "火山云雀";
          this.aiItemName = { value: 1000, label: "火山云雀" };
        } else if (this.updataRightList == 1001) {
          this.AINames = "腾讯混元";
          this.aiItemName = { value: 1001, label: "腾讯混元" };
        } else if (this.updataRightList == 1003) {
          this.AINames = "豆包";
          this.aiItemName = { value: 1003, label: "豆包" };
        } else if (this.updataRightList == 1004) {
          this.AINames = "无忧秘书";
          this.aiItemName = { value: 1004, label: "无忧秘书" };
        }
      },
    },

    // 聊天组的唯一id，用于刷新历史会话
    sessionRightNavCode: {
      deep: true,
      handler() {
        console.log("sessionRightNavCode监听");
        this.getChatList("");
      },
    },

    aiNameValue: {
      deep: true,
      handler() {
        this.$emit("undatename", this.aiNameValue);
        this.chat_type = this.aiNameValue;
        this.$store.dispatch("id/setAIChatname", this.aiNameValue);
        this.page = 1;
        this.getChatList("");
      },
    },
    randomStr: {
      deep: true,
      handler() {
        this.getChatList("");
      },
    },
  },
  created() {
    if (this.$route.name == "laboratoryChat") {
      this.aiNameList = [
        { label: "AI35", value: 0 },
        { label: "AI40", value: 1 },
      ];
    } else if (this.$route.path == "/knowledge/knowledgeChat") {
      this.aiNameList = [
        { label: "文心一言", value: 4 },
        { label: "通义千问", value: 10 },
      ];
    }
  },
  mounted() {
    this.$store.dispatch("user/changeMainLeft", "242px");
    this.aiNameValue = this.updataRightList;
    this.chat_type = this.updataRightList;
    this.getChatList("");
    if (this.updataRightList == 0 || this.updataRightList == undefined) {
      this.AINames = "AI35";
      this.aiItemName = { value: 0, label: "AI35" };
    } else if (this.updataRightList == 1) {
      this.AINames = "AI40";
      this.aiItemName = { value: 1, label: "AI40" };
    } else if (this.updataRightList == 2) {
      this.AINames = "DALL·E 2";
      this.aiItemName = { value: 2, label: "DALL·E 2" };
    } else if (this.updataRightList == 3) {
      this.AINames = "百度绘画";
      this.aiItemName = { value: 3, label: "百度绘画" };
    } else if (this.updataRightList == 4) {
      this.AINames = "文心一言";
      this.aiItemName = { value: 4, label: "文心一言" };
    } else if (this.updataRightList == 5) {
      this.AINames = "讯飞星火";
      this.aiItemName = { value: 5, label: "讯飞星火" };
    } else if (this.updataRightList == 6) {
      this.AINames = "Midjourney";
      this.aiItemName = { value: 6, label: "Midjourney" };
    } else if (this.updataRightList == 7) {
      this.AINames = "Claude";
      this.aiItemName = { value: 7, label: "Claude" };
    } else if (this.updataRightList == 8) {
      this.AINames = "ChatGLM";
      this.aiItemName = { value: 8, label: "ChatGLM" };
    } else if (this.updataRightList == 9) {
      this.AINames = "Stable Diffusion";
      this.aiItemName = { value: 9, label: "Stable Diffusion" };
    } else if (this.updataRightList == 10) {
      this.AINames = "通义千问";
      this.aiItemName = { value: 10, label: "通义千问" };
    } else if (this.updataRightList == 11) {
      this.AINames = "商汤日日新";
      this.aiItemName = { value: 11, label: "商汤日日新" };
    } else if (this.updataRightList == 12) {
      this.AINames = "360智脑";
      this.aiItemName = { value: 12, label: "360智脑" };
    } else if (this.updataRightList == 1000) {
      this.AINames = "火山云雀";
      this.aiItemName = { value: 1000, label: "火山云雀" };
    } else if (this.updataRightList == 1001) {
      this.AINames = "腾讯混元";
      this.aiItemName = { value: 1001, label: "腾讯混元" };
    } else if (this.updataRightList == 1003) {
      this.AINames = "豆包";
      this.aiItemName = { value: 1003, label: "豆包" };
    } else if (this.updataRightList == 1004) {
      this.AINames = "无忧秘书";
      this.aiItemName = { value: 1004, label: "无忧秘书" };
    }

    // 容器高度
    this.containerHeight = this.$refs.queryChatList.clientHeight;
    // 内容高度
    this.innerHeight = this.$refs.inner.offsetHeight;
    // 滚动监听
    this.$refs.queryChatList.addEventListener("scroll", this.callBackScroll);
  },
  methods: {
    isShowRightNav() {
      this.isShowRightSidbar = !this.isShowRightSidbar;
      this.$emit("isshowrightsidbar", this.isShowRightSidbar);
      this.$store.dispatch("app/changeIsShowRightNav", this.isShowRightSidbar);
      this.$nextTick(() => {
        if (this.isShowRightSidbar) {
          this.$store.dispatch("user/changeMainLeft", "242px");
        } else {
          this.$store.dispatch("user/changeMainLeft", "72px");
        }
      });
    },
    handleCommand(e) {
      this.aiItemName = e;
      this.aiNameValue = e.value;
    },
    // 滚动回调函数
    callBackScroll(e) {
      if (this.isLoading) return;
      this.innerHeight = this.$refs.inner.offsetHeight;
      let scrollTop = e.target.scrollTop;
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + this.containerHeight >= this.innerHeight) {
        // this.getList();
        this.getMoreList("");
        console.log("到底了~~");
      }
    },

    // 修改对话标题
    editDuiHua(item) {
      item.checkBox = false;
      updateTitle({
        session_code: item.session_code,
        title: this.editTitle,
      }).then((res) => {
        this.chatList.forEach((v) => {
          if (v.session_code == item.session_code) {
            v.title = this.editTitle;
          }
        });
        let names = "";
        let code = "";
        console.log(item.chat_type, "--修改会话标题");

        switch (Number(item.chat_type)) {
          case 0:
            names = "AI35";
            code = "chat";
            break;
          case 1:
            names = "AI40";
            code = "chat";
            break;
          case 2:
            names = "DELL·E2";
            code = "image";
            break;
          case 3:
            names = "百度绘画";
            code = "image";
            break;
          case 4:
            names = "文心一言";
            code = "chat";
            break;
          case 5:
            names = "讯飞星火";
            code = "chat";
            break;
          case 6:
            names = "Midjourney";
            code = "image";
            break;
          case 7:
            names = "Claude";
            code = "chat";
            break;
          case 8:
            names = "ChatGLM";
            code = "chat";
            break;
          case 9:
            names = "Stable Diffusion";
            code = "image";
            break;
          case 10:
            names = "通义千问";
            code = "chat";
            break;
          case 11:
            names = "商汤日日新";
            code = "chat";
            break;
          case 12:
            names = "360智脑";
            code = "chat";
            break;
        }
        submitFootprint({
          type_name: names,
          type_code: code,
          title: this.editTitle,
          eid: item.session_code,
        }).then((res) => {});
      });
    },

    // 输入框失去焦点
    editInputBlur(e) {
      this.chatList.forEach((v, i) => {
        if (v.session_code == e.session_code) {
          v.checkBox = false;
        }
      });
    },

    // 获取对话列表
    getChatList(title) {
      let val;
      if (this.$route.path == "/workset/documentChat") {
        val = `chat_type=5&title=${title}&page_size=${this.page_size}&page=${this.page}&scenario_type=document`;
      } else if (
        this.$route.path == "/mentorChat" ||
        this.$route.path == "/templateSelect/templateSelectNew"
      ) {
        val = `chat_type=${this.chat_type}&title=${title}&page_size=${this.page_size}&page=${this.page}&scenario_type=mentor`;
      } else if (this.$route.path == "/manyModelChat/chat") {
        val = `title=${title}&page_size=${this.page_size}&page=${this.page}`;
      } else if (this.$route.path == "/identify/identify") {
        val = `chat_type='-2'&title='看图说话'&page_size=${this.page_size}&page=${this.page}`;
      } else if (this.$route.path == "/knowledge/knowledgeChat") {
        val = `chat_type=${this.chat_type}&title=&page_size=${this.page_size}&page=${this.page}&scenario_type=agent`;
      } else if (this.$route.path == "/chat/questionChat") {
        val = `chat_type=${this.chat_type}&title=&page_size=${this.page_size}&page=${this.page}&scenario_type=question`;
      } else {
        val = `chat_type=${this.chat_type}&title=${title}&page_size=${this.page_size}&page=${this.page}`;
      }
      // console.log(val, "历史会话请求参数");
      this.checkBox = [];
      if (this.$route.path == "/manyModelChat/chat") {
        manyChatList(val)
          .then((res) => {
            if (res.code == 20000) {
              res.data.data.forEach((v) => {
                v.checkBox = false;
                this.checkBox.push(false);
                this.chartTitleListTotal.push(v.session_code);
              });
              this.chatList = res.data.data;
              this.pageTotal = res.data.total;
              if (this.chatListLength == 0) {
                this.current = -1;
              }
              if (this.pageTotal % this.page_size == 0) {
                this.pageCount = this.pageTotal / this.page_size;
              } else {
                this.pageCount = parseInt(this.pageTotal / this.page_size) + 1;
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("获取失败！");
          });
      } else {
        chatList(val)
          .then((res) => {
            if (res.code == 20000) {
              res.data.data.forEach((v) => {
                v.checkBox = false;
                this.checkBox.push(false);
                this.chartTitleListTotal.push(v.session_code);
              });
              this.chatList = res.data.data;
              this.pageTotal = res.data.total;
              res.data.data.forEach((v, i) => {
                switch (Number(this.chat_type)) {
                  case 0:
                    if (v.session_code == localStorage.getItem("session_code")) {
                      this.current = i;
                    }
                    break;
                  case 1:
                    if (v.session_code == localStorage.getItem("session_code1")) {
                      this.current = i;
                    }
                    break;
                  case 2:
                    if (v.session_code == localStorage.getItem("session_code2")) {
                      this.current = i;
                    }
                    break;
                  case 3:
                    if (v.session_code == localStorage.getItem("session_code3")) {
                      this.current = i;
                    }
                    break;
                  case 4:
                    if (v.session_code == localStorage.getItem("session_code4")) {
                      this.current = i;
                    }
                    break;
                  case 5:
                    if (v.session_code == localStorage.getItem("session_code5")) {
                      this.current = i;
                    }
                    break;
                  case 6:
                    if (v.session_code == localStorage.getItem("session_code6")) {
                      this.current = i;
                    }
                    break;
                  case 7:
                    if (v.session_code == localStorage.getItem("session_code7")) {
                      this.current = i;
                    }
                    break;
                  case 8:
                    if (v.session_code == localStorage.getItem("session_code8")) {
                      this.current = i;
                    }
                    break;
                  case 9:
                    if (v.session_code == localStorage.getItem("session_code9")) {
                      this.current = i;
                    }
                    break;
                  case 10:
                    if (v.session_code == localStorage.getItem("session_code10")) {
                      this.current = i;
                    }
                    break;
                  case 11:
                    if (v.session_code == localStorage.getItem("session_code11")) {
                      this.current = i;
                    }
                    break;
                  case 12:
                    if (v.session_code == localStorage.getItem("session_code12")) {
                      this.current = i;
                    }
                    break;
                }
              });
              if (this.chatListLength == 0) {
                this.current = -1;
              }
              if (this.pageTotal % this.page_size == 0) {
                this.pageCount = this.pageTotal / this.page_size;
              } else {
                this.pageCount = parseInt(this.pageTotal / this.page_size) + 1;
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("获取失败！");
          });
      }
    },
    // 切换对话
    changeIndex(code, index) {
      if (this.aiNameValue == 0) {
        localStorage.setItem("session_code", code.session_code);
      } else if (this.aiNameValue == 1) {
        localStorage.setItem("session_code1", code.session_code);
      } else if (this.aiNameValue == 2) {
        localStorage.setItem("session_code2", code.session_code);
      } else if (this.aiNameValue == 3) {
        localStorage.setItem("session_code3", code.session_code);
      } else if (this.aiNameValue == 4) {
        localStorage.setItem("session_code4", code.session_code);
      } else if (this.aiNameValue == 5) {
        localStorage.setItem("session_code5", code.session_code);
      } else if (this.aiNameValue == 6) {
        localStorage.setItem("session_code6", code.session_code);
      } else if (this.aiNameValue == 7) {
        localStorage.setItem("session_code7", code.session_code);
      } else if (this.aiNameValue == 8) {
        localStorage.setItem("session_code8", code.session_code);
      } else if (this.aiNameValue == 9) {
        localStorage.setItem("session_code9", code.session_code);
      } else if (this.aiNameValue == 10) {
        localStorage.setItem("session_code10", code.session_code);
      } else if (this.aiNameValue == 11) {
        localStorage.setItem("session_code11", code.session_code);
      }
      this.current = index;
      this.$emit("updatachatlist", code.session_code);
    },

    deleteHistorcal() {
      this.selectUserHuihua = !this.selectUserHuihua;
    },

    // 修改对话标题
    editLocalTitle(item) {
      this.chatList.forEach((v) => {
        if (item.session_code == v.session_code) {
          item.checkBox = !item.checkBox;
        } else {
          v.checkBox = false;
        }
      });
      this.editTitle = item.title;
      this.$nextTick(() => {
        this.autoFocuss = true;
      });
    },
    // 删除对话
    delChat(code, bool = true) {
      let codes = [];
      codes.push(code);
      let val = {
        session_codes: JSON.stringify(codes),
      };
      this.$confirm("是否删除所选信息?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.$route.path == "/manyModelChat/chat") {
            deleteManyChat(code).then((res) => {
              if (res.code == 20000) {
                this.page = 1;
                this.getChatList("");
                this.current = -1;
                this.$root.Bus.$emit("delChat", 1); //删除对话框内容
                this.$emit("resetnewchat", this.aiNameValue);
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            ChatDelete(val)
              .then((res) => {
                if (res.code == 20000) {
                  this.page = 1;
                  this.getChatList("");
                  this.current = -1;
                  this.$root.Bus.$emit("delChat", 1); //删除对话框内容
                  this.$message.success("删除成功！");
                  // 删除最近会话
                  deleteFootprint(`type_code=chat&eid=${code}`).then((res) => {});
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch((err) => {
                this.$message.error("删除失败！");
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 全选
    handleCheckAllChange(val) {
      // 每次点击全选后重置数组，防止列表下滑刷新后，数据不足
      this.chartTitleListTotal = []; // 聊天列表的唯一id数组
      this.chatList.forEach((v) => {
        this.chartTitleListTotal.push(v.session_code);
      });
      this.chartTitleList = val ? this.chartTitleListTotal : []; // 需要删除的数据id列表
      this.isIndeterminate = false;
    },

    // 单选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkBoxTotal = checkedCount === this.chartTitleListTotal.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.chartTitleListTotal.length;
    },

    // 获取更多会话信息
    async getMoreList(title) {
      if (this.page < this.pageCount) {
        this.page++;
        this.isLoading = true;
        let val = {
          chat_type: this.chat_type,
          title: title,
          page_size: this.page_size,
          page: this.page,
        };
        if (this.$route.path == "/manyModelChat/chat") {
          await manyChatList(val)
            .then((res) => {
              if (res.code == 20000) {
                this.chatList = this.chatList.concat(res.data.data);
                if (this.chartTitleList.length == 0) {
                  this.isIndeterminate = false;
                } else {
                  this.isIndeterminate = true;
                }
                this.checkBoxTotal = false;
              } else {
                this.$message.error(res.msg);
              }
              this.isLoading = false;
            })
            .catch((err) => {
              this.$message.error("获取失败！");
            });
        } else {
          await chatList(val)
            .then((res) => {
              if (res.code == 20000) {
                this.chatList = this.chatList.concat(res.data.data);
                if (this.chartTitleList.length == 0) {
                  this.isIndeterminate = false;
                } else {
                  this.isIndeterminate = true;
                }
                this.checkBoxTotal = false;
              } else {
                this.$message.error(res.msg);
              }
              this.isLoading = false;
            })
            .catch((err) => {
              this.$message.error("获取失败！");
            });
        }
      }
    },

    // 批量删除会话
    deleteAllChat() {
      if (this.chartTitleList.length == 0) return;
      let codes = [];
      this.$confirm("是否删除所选信息?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.chartTitleList.length != 0) {
            this.delAllChat(this.chartTitleList);
            this.cancelDeleteChat();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //删除多条
    delAllChat(codes, bool = true) {
      let val = {
        session_codes: JSON.stringify(codes),
      };
      ChatDelete(val)
        .then((res) => {
          if (res.code == 20000) {
            this.page = 1;
            this.getChatList("");
            this.current = -1;
            this.$root.Bus.$emit("delChat", 1); //删除对话框内容
            if (bool) {
              this.$message.success("删除成功！");
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("删除失败！");
        });
    },

    // 取消删除
    cancelDeleteChat() {
      this.selectUserHuihua = false;
      this.chartTitleList = [];
      this.indeterminate = false;
    },

    // 隐藏popover的弹出框
    hiddenPopover(num) {
      switch (num) {
        case 1:
          this.wechartVisible = false;
          break;
        case 2:
          this.miniProgVisible = false;
          break;
        case 3:
          this.serviceVisible = false;
          break;
      }
    },

    selectSeach() {
      this.getChatList(this.userSelect);
    },

    viseibleChange(e) {
      this.rotateArrow = e;
    },
  },
};
</script>

<style scoped>
/deep/ .router-link-exact-active{
  text-decoration: none;
}
/deep/ .router-link-active{
  text-decoration: none;
}
.retract-btn {
  width: 24px;
  height: 60px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: -24px;
  font-size: 30px;
  transform: translate(0, -50%);
}
.new-chat-btn {
  margin: 20px 10px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right_nav {
  position: absolute;
  /* left: 115px; */
  width: 240px;
  height: calc(100%);
  z-index: 6;
  border-left: 1px solid #e5e6eb;
  border-right: 1px solid #e5e6eb;
  /* top: -83px; */
  transition: width 0.2s;
  background-color: #ffffff;
  box-sizing: border-box;
}

.right_nav-on {
  width: 0px;
}

.right_nav .title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #333333;
  display: flex;
  justify-content: space-between;
  height: 28px;
  margin: 20px 12px 22px 12px;
  width: 100%;
}

.right_nav .title .title-left {
  display: flex;
  height: 28px;
  line-height: 28px;
  justify-content: space-between;
  width: calc(100% - 22px);
}

.right_nav .title .title-left img {
  margin-right: 12px;
}

.title-right {
  cursor: pointer;
  height: 28px;
}

.right_nav .title .title-left img,
.right_nav .title .title-right img {
  width: 22px;
  height: 22px;
  display: block;
  margin: auto 0;
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

.sc_img {
  display: none;
  width: 14px;
  height: 14px;
  margin-left: 8px;
}

.chat {
  width: 220px;
  height: 35px;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: #f2faff;
  justify-content: flex-start;
  cursor: pointer;
  margin: auto;
  margin-top: 5px;
  color: #1f64ff;
}

.unchat {
  width: 220px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 5px;
  cursor: pointer;
}

.unchat:hover {
  background: #dde8ff;
}

.unchat:hover .unchat_text {
  color: #1f64ff;
}

.unchat_text {
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #999;
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chat:hover .sc_img {
  display: inline-block;
}

.unchat:hover .sc_img {
  display: inline-block;
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
  left: 240px;
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

.right_nav .edit-input-title > input {
  height: 25px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0 4px;
  margin: 0;
  font-size: 14px;
  margin-left: 4px;
}

.unchat:hover .edit-input-title {
  background: #dde8ff;
}

.select-list {
  height: 28px;
}

.title-left .select-list input {
  background-color: #ffffff;
  border: none;
  padding: 0;
  height: 20px;
  line-height: 28px !important;
  font-size: 14px;
}

.select-list i {
  line-height: 28px !important;
  color: #666666 !important;
  height: 28px !important;
  vertical-align: super;
}

.select-list span {
  height: 28px;
}

.select_arrow_down {
  transition: all 0.2s;
  margin-right: 20px;
  transform: rotateZ(0deg);
}

.select_arrow_down-on {
  transform: rotateZ(180deg);
  transition: all 0.2s;
  margin-right: 20px;
}
</style>
