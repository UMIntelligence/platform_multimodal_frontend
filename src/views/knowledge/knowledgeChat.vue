<template>
  <div class="main">
    <div class="left" :style="isShowRightNav ? 'width:240px;' : 'width: 16px'">
      <right-nav
        :updataRightList="updataRightList"
        :sessionRightNavCode="sessionRightNavCode"
        @updatachatlist="updataChatList"
        @undatename="undateName"
        :randomStr="randomStr"
        @resetnewchat="resetNewChat"
        @isshowrightsidbar="isShowRightSidbar"
      ></right-nav>
    </div>
    <div
      class="right"
      :style="
        isShowRightNav
          ? 'width: calc(100% - 240px - 24px);'
          : 'width: calc(100% - 24px);'
      "
    >
      <div
        class="go-back"
        @click="showCheck == false ? $router.go(-1) : (showCheck = false)"
      >
        <img
          style="width: 10px; transform: rotateZ(180deg); margin: auto 0"
          src="../../assets/images/right.png"
          alt=""
        />
        <span style="margin-left: 8px">返回</span>
      </div>
      <div
        v-if="!showCheck"
        style="
          width: 500px;
          position: relative;
          left: 50%;
          transform: translate(-50%);
        "
      >
        <img :src="httpUrls.ossUrl + pageData.avatar_url" alt="" />
        <div class="chat_title">{{ pageData.agent_name }}</div>
        <div class="chat_tips">{{ pageData.agent_desc }}</div>
        <div class="chat_check">
          <div @click="showCheck = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_10247_17605)">
                <path
                  d="M6.66602 8.66795C6.95232 9.0507 7.31759 9.3674 7.73705 9.59657C8.15651 9.82574 8.62035 9.96202 9.09712 9.99617C9.57388 10.0303 10.0524 9.96152 10.5002 9.79447C10.9481 9.62741 11.3548 9.36599 11.6927 9.02795L13.6927 7.02795C14.2999 6.39927 14.6359 5.55726 14.6283 4.68327C14.6207 3.80929 14.2701 2.97324 13.6521 2.35522C13.0341 1.73719 12.198 1.38663 11.324 1.37903C10.45 1.37144 9.60802 1.70742 8.97935 2.31461L7.83268 3.45461"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.33151 7.33283C9.04521 6.95008 8.67994 6.63338 8.26048 6.40421C7.84102 6.17503 7.37717 6.03875 6.90041 6.00461C6.42365 5.97047 5.94512 6.03925 5.49728 6.20631C5.04944 6.37337 4.64277 6.63479 4.30485 6.97283L2.30485 8.97283C1.69765 9.60151 1.36167 10.4435 1.36927 11.3175C1.37686 12.1915 1.72742 13.0275 2.34545 13.6456C2.96348 14.2636 3.79952 14.6142 4.67351 14.6217C5.5475 14.6293 6.38951 14.2934 7.01818 13.6862L8.15818 12.5462"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_10247_17605">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div>关联知识库</div>
          </div>
          <div @click="$router.push('/knowledge/knowledgeRobot')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14.069 6.63914C14.3732 6.63914 14.6476 6.45586 14.7641 6.17461C14.8807 5.89367 14.8162 5.56992 14.6012 5.35461L11.156 1.90977C11.042 1.7957 10.8573 1.7957 10.7432 1.90977L10.0918 2.56117C9.97773 2.67523 9.97773 2.86008 10.0918 2.97398L12.2524 5.13445H1.34898C1.18977 5.13445 1.06055 5.26352 1.06055 5.42289V6.35086C1.06055 6.51008 1.18961 6.6393 1.34898 6.6393H14.069V6.63914ZM14.651 9.35555H1.93461C1.63039 9.35555 1.35602 9.53883 1.23945 9.82008C1.12289 10.101 1.18742 10.4248 1.40242 10.6401L4.84758 14.0851C4.96164 14.1991 5.14633 14.1991 5.26039 14.0851L5.9118 13.4337C6.02586 13.3196 6.02586 13.1348 5.9118 13.0209L3.75117 10.8602H14.651C14.8123 10.8602 14.9429 10.7295 14.9429 10.5684V9.64758C14.9429 9.48633 14.8123 9.35555 14.651 9.35555Z"
                fill="#1F64FF"
              />
            </svg>
            <div>切换AI智能体</div>
          </div>
          <div>
            <el-select v-model="chat_type" placeholder="请选择对话模型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="preset">
          <div
            :class="preset == item ? 'presetCheck preset_item' : 'preset_item'"
            v-for="(item, index) in preset_question"
            :key="index"
            @click="handlePreset(item)"
          >
            {{ item }}
          </div>
        </div>
        <div class="chat_content">
          <!-- 单选 多选 输入 选择器 开关 标签 文本域 -->
          <div
            class="templateselect-list"
            :key="item.title"
            v-for="item in questionList"
          >
            <div class="selsect-title">
              <div>
                <span>{{ item.title }}</span>
                <span v-if="item.is_required == '1'" style="color: #f00"
                  >*</span
                >
              </div>
            </div>
            <el-input
              v-if="item.info_type_name == 'Input'"
              v-model="item.selectItem"
              :placeholder="
                item.example_question ? item.example_question : item.placeholder
              "
            ></el-input>
            <el-input
              v-if="item.info_type_name == 'Textarea'"
              rows="4"
              type="textarea"
              autosize
              v-model="item.selectItem"
              :placeholder="
                item.example_question ? item.example_question : item.placeholder
              "
            ></el-input>

            <div v-if="item.info_type_name == 'CheckBox'">
              <el-select
                v-model="item.selectItem"
                multiple
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <el-option
                  v-for="v in item.options"
                  :key="v.option_id"
                  :label="v.value"
                  :value="v.value"
                >
                </el-option>
              </el-select>
            </div>

            <div
              v-if="
                item.info_type_name == 'Select' ||
                item.info_type_name == 'Radio'
              "
            >
              <el-select
                v-model="item.selectItem"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <el-option
                  v-for="v in item.options"
                  :key="v.option_id"
                  :label="v.value"
                  :value="v.value"
                >
                </el-option>
              </el-select>
            </div>

            <div v-if="item.info_type_name == 'Switch'">
              <el-switch v-model="item.selectItem"></el-switch>
            </div>

            <div
              v-if="item.info_type_name == 'Tag'"
              style="
                border: 1px solid #e5e6eb;
                padding: 8px 12px;
                border-radius: 8px;
              "
            >
              <el-tag
                style="margin-left: 5px"
                :key="tag.option_id"
                v-for="tag in item.options"
                closable
                :disable-transitions="false"
                @close="handleCloseTag(tag, item)"
              >
                {{ tag.value }}
              </el-tag>
              <el-input
                class="input-new-tag"
                style="width: 150px"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInputTag"
                size="small"
                @keyup.enter.native="handleInputConfirmTag(item)"
                @blur="handleInputConfirmTag(item)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInputTag"
                >+ 添加</el-button
              >
            </div>
            <div
              style="font-size: 12px; margin-top: 2px; color: #f56c6c"
              v-if="item.required"
            >
              此选项为必填
            </div>
          </div>
        </div>

        <div>
          <div class="token">
            {{ chat_type == 4 ? "36w算力/1k token" : "6w算力/1k token" }}
          </div>
          <div class="sendMsg" @click="handleChat">
            {{ isBtnChat ? "AI一下" : "思考中..." + timerChat + "秒" }}
          </div>
        </div>
        <div
          class="answerResults"
          v-if="isShowResultsChat && chatList.length > 1"
        >
          <div class="onAnalysis">
            <div class="titlea">
              <div style="width: 33%"></div>
              <div style="width: 33%">AI分析结果</div>
              <div
                style="
                  width: 33%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  cursor: pointer;
                "
              ></div>
            </div>
            <div style="padding: 20px; border-radius: 5px; background: #ffffff">
              <!-- <div class="replay" style="margin-bottom: 10px;" v-if="chat_type == 0">{{ chatList[0].content }}</div> -->
              <div v-if="!isuser">
                <div>{{ queryErrorMsg }}</div>
                <el-button
                  style="
                    background-color: #1f64ff;
                    border-radius: 4px;
                    padding: 6px 60px;
                    color: #ffffff;
                    margin-top: 5px;
                  "
                  @click="$refs.Pay.PayVisible = true"
                  >开通VIP</el-button
                >
              </div>
              <div
                class="replay"
                v-html="isDetailChat ? chatList[1].markedContent : replyChat"
              ></div>
              <div></div>

              <div class="consume">
                <!-- <span class="words">字数：{{ chatList[1].content.length }}</span> -->
              </div>
              <div class="prompt" v-if="isBtnChat">
                当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉，已通过阿里云内容安全审核
              </div>
            </div>
          </div>

          <div class="button_list">
            <div class="btn_left">
              <div @click="optimizeAnswers(chatList[1])">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.1895 5.09467C16.5138 4.77008 16.5136 4.24411 16.1892 3.91967C15.8647 3.59513 15.3385 3.59513 15.0139 3.91967L8.6495 10.2841C8.25931 10.6743 7.62678 10.6747 7.23612 10.2849L4.98941 8.04349C4.66464 7.71949 4.1388 7.7198 3.81441 8.04418C3.48975 8.36884 3.48975 8.89522 3.81441 9.21988L7.23579 12.6413C7.62644 13.0319 8.25987 13.0318 8.65034 12.6409L16.1895 5.09467Z"
                    fill="#1F64FF"
                  />
                  <path
                    d="M15.8349 15.832C15.8349 15.3718 15.4618 14.9987 15.0016 14.9987H5.00156C4.54133 14.9987 4.16823 15.3718 4.16823 15.832C4.16823 16.2923 4.54133 16.6654 5.00156 16.6654H15.0016C15.4618 16.6654 15.8349 16.2923 15.8349 15.832Z"
                    fill="#1F64FF"
                  />
                </svg>
                继续提问
              </div>
              <div @click="resetController">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                >
                  <path
                    d="M1 1.91016V5.72821H4.81805"
                    stroke="#1F64FF"
                    stroke-width="1.65"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.9977 12.0915V8.27344H11.1797"
                    stroke="#1F64FF"
                    stroke-width="1.65"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.4023 5.08999C13.0796 4.17797 12.5311 3.36257 11.808 2.71988C11.0849 2.07718 10.2107 1.62813 9.26716 1.41464C8.32358 1.20114 7.34129 1.23015 6.41196 1.49896C5.48262 1.76777 4.63653 2.26763 3.95262 2.95188L1 5.72633M14.9995 8.2717L12.0469 11.0462C11.363 11.7304 10.5169 12.2303 9.58754 12.4991C8.65821 12.7679 7.67592 12.7969 6.73234 12.5834C5.78876 12.3699 4.91464 11.9208 4.19155 11.2782C3.46845 10.6355 2.91995 9.82006 2.59722 8.90804"
                    stroke="#1F64FF"
                    stroke-width="1.65"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                重新回答
              </div>
              <div v-if="!isfinishChat">停止回答</div>
              <!-- <el-button
                icon="el-icon-check"
                style="
                  color: #1f64ff;
                  font-size: 14px;
                  padding: 6px 10px;
                  border: 1px solid #1f64ff;
                "
                @click="optimizeAnswers(chatList[1])"
                >优化本次回答</el-button
              >
              <el-button
                icon="el-icon-refresh"
                style="
                  color: #1f64ff;
                  font-size: 14px;
                  padding: 6px 10px;
                  border: 1px solid #1f64ff;
                "
                @click="resetController"
                >重试</el-button
              > -->
            </div>

            <!-- <el-button
              v-if="!isfinishChat"
              icon="el-icon-remove-outline"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="endController(chatList[1].session_code)"
              >停止回答</el-button
            >
            <el-button
              v-else
              icon="el-icon-remove-outline"
              style="
                color: #1f64ff;
                font-size: 14px;
                padding: 6px 10px;
                border: 1px solid #1f64ff;
              "
              @click="resetNewChat(chat_type)"
              >重新提问</el-button
            > -->

            <div class="btn_right">
              <img
                src="../../assets/images/helpNo.png"
                v-if="!chatList[1].help"
                alt=""
                @click="showSetonHelpImg(1, true, chatList[1])"
              />
              <img
                src="../../assets/images/helpYes.png"
                v-else
                alt=""
                @click="showSetonHelpImg(1, false, chatList[1])"
              />
              <img
                src="../../assets/images/stepOnNo.png"
                v-if="!chatList[1].stepOn"
                alt=""
                @click="showSetonHelpImg(2, true, chatList[1])"
              />
              <img
                src="../../assets/images/stepOnYes.png"
                v-else
                alt=""
                @click="showSetonHelpImg(2, false, chatList[1])"
              />
              <img
                src="../../assets/images/copyBlack.png"
                alt=""
                @click="copyText(chatList[1].content)"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="showCheck" class="checkBox">
        <div class="checkBox-top">
          <img :src="httpUrls.ossUrl + pageData.avatar_url" alt="" />
          <div class="chat_title">{{ pageData.agent_name }}</div>
        </div>
        <div class="checkBox-content">
          <div class="checkBox-content-title">编辑关联知识库</div>
          <div class="tree-box">
            <div>
              <el-tree
                :data="treeData"
                :default-checked-keys="defaultCheck"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                @check-change="handleCheckChange"
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </div>
          <div class="checkBox-content-bottom" @click="handleCheckKnowledge">
            保存
          </div>
        </div>
      </div>
      <!-- 补充弹窗 -->
      <el-dialog
        :visible.sync="supplyVisible"
        width="500px"
        :modal-append-to-body="false"
        title="继续提问"
      >
        <div class="supply_cont">
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            placeholder="请输入您要优化的内容"
            v-model="supplyValue"
          ></el-input>
        </div>

        <span slot="footer" class="chat-dialog-footer" @click="keepAs(2)">
          发送
          <!-- <img class="supply_img" src="../../assets/images/send.png" alt=""> -->
        </span>
      </el-dialog>
      <Register ref="Register"></Register>
    </div>
  </div>
</template>
<script>
import httpUrls from "../../api/requestURL";
import rightNav from "../../components/rightNav";
import tegInput from "../../components/tagInput.vue";
import { textDecoder, arr2str } from "../../utils/download";
import { chatAgent, getUserGroups, createdModel } from "../../api/knowledge";
import Register from "../../components/register";
import { chatLikes } from "../../api/prompts";
import {
  creatChat,
  chatDetail,
  creatDraw,
  questionSetRecommend,
  submitFootprint,
} from "../../api/chatMG";

import { marked } from "marked";
export default {
  name: "knowledge-chat",
  data() {
    return {
      httpUrls,
      pageData: {}, //页面数据
      preset_question: [], //预制问题
      preset: "", //问题
      //历史记录
      updataRightList: 1, // ai的id，=chat_type
      sessionRightNavCode: "", // 聊天组的唯一id，用于刷新历史会话
      randomStr: 0, // 随机数，刷新列表
      isShowRightNav: true,

      options: [
        {
          label: "文心一言",
          value: "4",
        },
        {
          label: "通义千问",
          value: "10",
        },
        {
          label: "AI40",
          value: "1",
        },
      ],
      chat_type: "1",
      chat_input: "", //chat文本框
      chat_tag: [], //chat标签
      chat_gender: "", //chat性别
      inputVisible: false,
      inputValue: "",
      treeData: [], //选择知识库数据
      checkTreeData: [], //选中的树型节点
      defaultCheck: [], //默认选中
      defaultProps: {
        children: "children",
        label: "label",
      },
      questionList: [], //问题列表
      showCheck: false, //显示关联知识库
      AIname: "1",

      chatList: [], //对话数据
      isfinishChat: true, // 完成打字效果 / 35
      sendValue: "你好",
      oldSendValue: "",
      isClickChat: false,
      isFoulLanguage: false, // 用户问题是否出现屏蔽词，问题返回时
      association: "", // 是否关联上下文
      isShowassociation: false, // 是否关联上下文
      isShowChecked: false, // 复选框
      replyChat: "", // 实时回答 / 讯飞星火
      isBtnChat: true, // 防止重新发送
      isTimeChat: false, // 开启获取中对话框 / 35
      isDetailChat: false, // 显示会话内容 / 40
      t_timeChat: 0, // 定时器
      timerChat: 0, // 定时器的时间 / 35
      isuser: true,
      controllerChat: null, // 用于终止fetch请求 / 35
      isShowResultsChat: false,
      loginInfo: JSON.parse(localStorage.getItem("userInfo")),
      chatItem: {}, // 用于存放优化会话的临时对象
      chatData: {}, //对话后返回数据
      supplyVisible: false, // 补充对话
      supplyValue: "", //补充对话框文本
      ordeAIList: [],
    };
  },
  components: {
    rightNav,
    tegInput,
    Register,
  },
  watch: {
    chat_type: {
      deep: true,
      handler() {
        this.AIname = Number(this.chat_type);
      },
    },
    AIname: {
      deep: true,
      handler() {
        // 切换不同的ai时重置页面
        this.isuser = true;
        this.isShowassociation = false;
        this.isShowChecked = false;
        this.chatList.forEach((v) => {
          v.checked = false;
        });
        this.association = "";

        // if (this.AIname == 0) {
        // this.textAreaLength = "2000";
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
        // }
        console.log(this.AIname, "进入AIname监听");
        this.chat_type = this.AIname.toString();
        this.chatList = [];
        this.$store.dispatch("id/setAIChatname", this.AIname);
        this.updataRightList = Number(this.chat_type);
      },
    },
  },
  created() {
    this.pageData = JSON.parse(localStorage.getItem("chatKnowledge"));
    this.questionList = this.pageData.options.options;
    //预制问题
    console.log(this.pageData);
    if (
      this.pageData.preset_question &&
      this.pageData.preset_question.length != 0
    ) {
      this.preset_question = this.pageData.preset_question.map(
        (item) => item.question_content
      );
      console.log("1111", this.preset_question);
    }

    let requestData = `user_id=${
      JSON.parse(localStorage.getItem("userInfo"))["user_id"]
    }`;
    getUserGroups(requestData).then((res) => {
      let treeArr = [];
      Object.keys(res.data).map((key, index) => {
        let obj = {
          label: "",
          id: "",
          children: [],
        };
        if (key == "documents") {
          obj.label = "文档库";
        } else if (key == "pictures") {
          obj.label = "图片库";
        } else if (key == "urls") {
          obj.label = "网址库";
        }
        obj.id = "";
        // obj.label =
        Object.keys(res.data[key]).map((item, i) => {
          // console.log(res.data[key][item],'lllllllllljh')
          let childArr = [];
          res.data[key][item].map((child) => {
            let childObj = {
              label: "",
              id: "",
            };
            if (key == "documents") {
              childObj.label = child.file_name;
              childObj.id = child.file_id;
            } else if (key == "pictures") {
              childObj.label = child.pic_name;
              childObj.id = child.pic_id;
            } else if (key == "urls") {
              childObj.label = child.url_name;
              childObj.id = child.url_id;
            }
            childArr.push(childObj);
          });
          obj.children.push({
            label: item,
            id: "",
            file_id: res.data[key][item],
            children: childArr,
          });
        });
        // console.log(obj,'555555')
        treeArr.push(obj);
      });
      this.treeData = treeArr;
      let data = JSON.parse(localStorage.getItem("chatKnowledge"));
      let checkArr = [];
      data.file_id.split(",").map((file_id) => {
        //file_id：文件ID
        this.treeData.map((tree) => {
          //tree：树型数据
          tree.children.map((item) => {
            //item：分组数据
            item.file_id.map((child) => {
              let index = checkArr.findIndex((ind) => ind == item.id);
              if (child.url_id) {
                //网址库
                if (child.url_id == file_id) {
                  if (index == -1) {
                    checkArr.push(child.url_id);
                  }
                }
              } else if (child.file_id) {
                //文档库
                if (child.file_id == file_id) {
                  if (index == -1) {
                    checkArr.push(child.file_id);
                  }
                }
              } else if (child.pic_id) {
                //图片库
                if (child.pic_id == file_id) {
                  if (index == -1) {
                    checkArr.push(child.pic_id);
                  }
                }
              }
            });
          });
        });
      });
      this.defaultCheck = checkArr;
    });
  },
  mounted() {},
  methods: {
    handlePreset(val) {
      if (
        this.questionList.length == 1 &&
        (this.questionList[0].info_type_name == "Textarea" ||
          this.questionList[0].info_type_name == "Input")
      ) {
        this.$set(this.questionList[0], "selectItem", val);
      }
      if (!this.preset) {
        this.preset = val;
      } else if (this.preset == val) {
        this.preset = "";
      } else {
        this.preset = val;
      }
    },
    // 显示隐藏点赞/踩
    showSetonHelpImg(num, bool, item) {
      if (bool && num == 1) {
        chatLikes({
          is_likes: 1,
          session_code: item.session_code,
          chat_group_code: item.chat_group_code,
        });
      } else if (bool && num == 2) {
        chatLikes({
          is_likes: 2,
          session_code: item.session_code,
          chat_group_code: item.chat_group_code,
        });
      } else {
        chatLikes({
          is_likes: 0,
          session_code: item.session_code,
          chat_group_code: item.chat_group_code,
        });
      }

      if (num == 1) {
        // GPT35
        this.chatList[1].help = false;
        this.chatList[1].stepOn = false;
        this.chatList[1].help = bool;
        this.chatList[1].is_likes = bool ? 1 : 0;
      } else if (num == 2) {
        // GPT35
        this.chatList[1].help = false;
        this.chatList[1].stepOn = false;
        this.chatList[1].stepOn = bool;
        this.chatList[1].is_likes = bool ? 2 : 0;
      } else if (num == 3) {
        // GPT40
        this.chatVipList[1].help = false;
        this.chatVipList[1].stepOn = false;
        this.chatVipList[1].help = bool;
        this.chatVipList[1].is_likes = bool ? 1 : 0;
      }
    },
    // 复制服务信息
    copyText(val) {
      var input = document.createElement("textarea"); // 创建input对象
      input.value = val; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success("复制成功！");
    },
    // 继续回答
    keepAs(key, item = {}) {
      if (
        this.supplyValue == "" ||
        this.supplyValue.replace(/\s*/g, "") == ""
      ) {
        this.$message.error("请输入您要发送内容");
        return;
      }
      let msg = "继续";
      if (key == 2) {
        msg = this.supplyValue;
        item = this.chatItem;
      }
      this.isBtnChat = false;
      this.isDetailChat = false;
      this.isfinishChat = false;
      this.supplyVisible = false;
      // if (this.chatItem.timer) {
      //   this.timerChat = this.chatItem.timer;
      // } else {
      this.timerChat = 0;
      // }
      this.t_timeChat = setInterval(() => {
        this.timerChat += 1;
      }, 1000);

      // matchContextAssistant({
      //   company_id: this.item.question_id,
      //   clerk_id: this.item.question_id,
      //   question_content: this.sendValue,
      // }).then((res) => {
      let val = null;
      val = {
        chat_type: this.chat_type,
        session_code: localStorage.getItem("session_code"),
        chat_group_code: localStorage.getItem("chat_group_code"),
        model:
          this.chat_type == 4
            ? "completions_pro"
            : this.chat_type == 1
            ? "1"
            : "qwen-plus",
        msg_list: JSON.stringify([
          { role: item.role, content: item.content },
          {
            role: "user",
            content: this.supplyValue,
            covert_content:
              this.pageData.agent_prompt +
              "," +
              "我提供给你的上下文是：" +
              this.chatData.context,
          },
        ]),
      };
      this.vipAgainSend(key, val, item);
      // });
    },
    async vipAgainSend(key, val, item) {
      // console.log(item, "进入优化对话");
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let response = null;
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      this.controllerChat = new AbortController();
      response = await fetch(httpUrls.httpUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: userInfo.role,
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: this.controllerChat.signal,
      });

      this.ordeAIList = [];

      // 状态码的统一处理
      if (response.status != "200") {
        response.json().then((res) => {
          this.codeHandleChange(res);
        });
        return;
      }

      if (!response.ok) {
        this.$message.error(response.statusText);
        return;
      }

      this.sendValue = ""; // 清空发送栏内容
      const reader = response.body.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          chatArr.forEach((val) => {
            if (val != "") {
              let res = JSON.parse(val);
              // console.log(res, "优化本次回答接口返回数据");
              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },
    handleCheckChange(data, checked) {
      let a = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      this.checkTreeData = a.filter((item) => item.trim() != "");
    },
    //关联知识库
    handleCheckKnowledge() {
      const loading = this.$loading({
        lock: true,
        text: "AI 智能体正在努力学习知识库内容，请稍作等待。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let file_ids = [];
      this.checkTreeData.map((checkId) => {
        //循环选中数组获取到子级的数据
        this.treeData.map((tree) => {
          //循环树型菜单数组
          tree.children.map((item) => {
            item.children.map((childID) => {
              if (childID.id == checkId) {
                file_ids.push(childID.id);
              }
            });
          });
        });
      });
      console.log(file_ids,'文件ID ')
      let arr = this.pageData.options.options;
      arr.forEach((obj) => {
        // 检查对象是否有'options'这个键 
        if ("options" in obj) {
          // 创建新的键'info_options'，并将'options'的值赋给它
          obj.info_options = obj.options;
          // 删除旧的键'options'
          delete obj.options;
        }
      });
      let requestData = {
        is_edit: 1, //是否编辑0否1是  
        user_id: JSON.parse(localStorage.getItem("userInfo"))["user_id"], //用户ID
        group_name: this.pageData.group_name, //分组名称
        group_order: this.pageData.group_order, //分组排序
        agent_type: this.pageData.agent_type_name, //智能体分类 
        avatar_url: this.pageData.avatar_url, //头像
        agent_name: this.pageData.agent_name, //智能体名称
        agent_desc: this.pageData.agent_desc, //智能体描述
        agent_character: this.pageData.agent_character, //智能体性格
        file_ids: file_ids, //文件ID列表,树型菜单
        agent_prompt: this.pageData.agent_prompt, //提示词
        info_agent: arr,
      };
      createdModel(requestData).then((res) => {
        if (res.code == 20000) {
          this.$message.success("编辑成功！");
          loading.close();
          this.showCheck = false;
        } else {
          loading.close();
          this.$message.error(res.msg);
        }
      });
    },
    //AI一下
    handleChat() {
      // this.sendMsg()
      // return
      let requestData = {
        agent_id: this.pageData.agent_id,
        options: [],
      };
      let returmSend = false;
      if (this.questionList.length != 1 && this.preset) {
        requestData.options.push({
          option_title: "内容",
          option_value: this.preset,
        });
      }
      this.questionList.forEach((item) => {
        if (
          item.info_type_name == "Input" ||
          item.info_type_name == "Textarea"
        ) {
          requestData.options.push({
            option_title: item.title,
            option_value: item.selectItem,
          });
        }
        if (
          (item.info_type_name == "Redio" || item.info_type_name == "Select") &&
          item.selectItem != ""
        ) {
          requestData.options.push({
            option_title: item.title,
            option_value: item.title + ":" + item.selectItem,
          });
          // this.sendValue += v.title + ":";
          // this.sendValue += v.selectItem.value + ",";
        }
        if (item.info_type_name == "CheckBox" && item.selectItem.length > 0) {
          // this.sendValue += v.title + ":";
          let text = item.title + ":";
          item.options.forEach((v) => {
            text += v.value + ",";
          });
          requestData.options.push({
            option_title: item.title,
            option_value: text,
          });
        }
        if (item.info_type_name == "Tag") {
          let text = item.title + ":";
          item.options.forEach((v) => {
            text += v.value + ",";
          });
          requestData.options.push({
            option_title: item.title,
            option_value: text,
          });
        }
        if (
          item.info_type_name != "Tag" &&
          item.is_required == "1" &&
          !item.selectItem &&
          !this.preset
        ) {
          this.$message({
            message: "请说出你的需求！",
            type: "error",
            duration: 2000,
          });
          returmSend = true;
        }
      });
      if (returmSend) {
        return;
      }
      this.timerChat = 0;
      this.t_timeChat = setInterval(() => {
        this.timerChat += 1;
      }, 1000);
      this.chatList = [];
      this.isBtnChat = false;
      chatAgent(requestData).then((res) => {
        console.log(res);
        if (res.code != 20000) {
          this.$message.error(res.msg);
        } else {
          this.chatData = res.data;
          this.sendMsg();
        }
      });
    },
    sendMsg(bool = "") {
      if (this.loginInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return;
      }
      this.chatContScroll = "";
      // console.log("sendMsg");
      // 重新回答
      if (bool == "true" && sessionStorage.getItem("questonsList")) {
        this.questionList = JSON.parse(sessionStorage.getItem("questonsList"));
      }
      let returmSend = false;
      this.questionList.forEach((v) => {
        if (
          v.info_type_name == "Tag" &&
          v.is_required == "1" &&
          (v.options.length == 0 || v.options == "")
        ) {
          console.log(1);
          v.required = true;
          returmSend = true;
        } else if (
          v.info_type_name != "Tag" &&
          v.is_required == "1" &&
          v.selectItem == ""
        ) {
          this.$message.error("请说出你的需求！");
          console.log(2);
          v.required = true;
          returmSend = true;
        }
      });
      if (returmSend) {
        return;
      }
      // // 判断输入的文字和选中上下文的文字是否超过限制
      // let msgList = "";
      // this.ordeAIList.forEach((v) => {
      //   msgList += v.content;
      // });
      // msgList += this.sendValue;
      this.isuser = true;
      // if (this.chat_type == 0) {
      //   if (msgList.length >= "2001") {
      //     this.$message.error("文字不得超过2000字");
      //     return;
      //   }
      // } else {
      //   if (msgList.length >= "2001") {
      //     this.$message.error("文字不得超过2000字");
      //     return;
      //   }
      // }
      this.chatList = [];
      // matchContextAssistant({
      //   company_id: this.item.question_id,
      //   clerk_id: this.item.question_id,
      //   question_content: this.sendValue,
      // }).then((res) => {
      //   let val = null;
      //   let title = /^AI/.test(this.item.title.trim())
      //     ? this.item.title
      //     : "AI " + this.item.title.trim();

      // });
      let val = {
        chat_type: this.chat_type,
        session_code:
          bool == "true" ? localStorage.getItem("session_code") : "",
        chat_group_code: "",
        model:
          this.chat_type == 4
            ? "completions_pro"
            : this.chat_type == 1
            ? "1"
            : "qwen-plus",
        scenario_type: "agent",
        msg_list: JSON.stringify([
          {
            role: "user",
            content: " " + this.chatData.question,
            covert_content:
              this.pageData.agent_prompt +
              "," +
              "我提供给你的上下文是：" +
              this.chatData.context,
          },
        ]),
      };
      this.vipSend(bool, val);
    },

    // 4.0信息发送
    async vipSend(bool = "", val) {
      if (bool != "true" && bool != "reset" && bool != "toChatFouty") {
        // 是否显示关联上下文
        if (!this.isShowassociation && this.chatList.length != 0) {
          this.isShowassociation = !this.isShowassociation;
          return;
        }
        // 关联上下文的多选，此处仅用作展示
        this.chatList.forEach((v) => {
          v.checked = false;
        });
      }
      this.isFoulLanguage = false;
      this.isShowassociation = false;
      this.isShowChecked = false;

      this.isShow = true; // 快速提问
      this.isDetailChat = false;
      this.isfinishChat = false; // 完成打字效果
      this.isBtnChat = false; // 是否允许重发
      this.replyChat = "";
      this.isShowResultsChat = true;

      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() + 1;
      //日
      let day = new Date().getDate();
      //时
      let hour = new Date().getHours();
      //分
      let minute = new Date().getMinutes();
      //秒
      let second = new Date().getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.chatData.question, // 预留，对话内容的转换
        // "markedContent": marked(this.sendValue),
        checked: false,
        help: false, // 点赞
        stepOn: false, // 点踩
        timer: false,
      };
      // console.log(this.sendValue, sendVal);

      // 获取当前会话列表的长度，用作右侧侧边栏的选中状态
      this.chatList.push({ ...sendVal, id: this.chatList.length }); // id：用于关联上下文时的排序，防止顺序错乱导致接口返回的信息错误
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);
      // console.log(this.chatYiyanList);

      // this.toBottom();

      // this.isTime = true; // 思考中
      this.isTimeChat = true;
      if (bool != "toChatFouty") {
        // this.timerChat = 0;
        // this.t_timeChat = setInterval(() => {
        //   this.timerChat += 1;
        // }, 1000);
      }
      // 关联上下文时，拿到对应的值然后清空对应的数据
      if (Number(this.association) == 1) {
        this.ordeAIList.sort((a, b) => {
          return a.id - b.id;
        });
        let contemt = [];
        this.ordeAIList.forEach((v) => {
          contemt.push({
            role: v.role,
            content: v.content,
          });
        });

        val = {
          chat_type: this.chat_type,
          session_code:
            bool == "true" ? localStorage.getItem("session_code") : "",
          chat_group_code: "",
          scenario_type: "agent",
          // 'session_code': '',
          // 'chat_group_code': "",
          model:
            this.chat_type == 4
              ? "completions_pro"
              : this.chat_type == 1
              ? "1"
              : "qwen-plus",
          msg_list: JSON.stringify([
            ...contemt,
            {
              role: "user",
              content: this.chatData.question,
            },
          ]),
        };
        this.ordeAIList = [];
      }
      if (Number(this.association) == 2) {
        val.session_code = "";
      }

      this.association = "";

      this.chatList.push({
        //新构造一个对话内容
        session_code: "",
        create_time: "",
        chat_group_code: "",
        finish_reason: "",
        role: "",
        content: "",
        help: false, // 点赞
        stepOn: false, // 点踩
        id: this.chatList.length,
        timer: false,
      });
      if (bool == "toChatFouty") {
        this.t_timeChat = setInterval(() => {
          this.timerChat += 1;
        }, 1000);
      }

      if (bool == "true") {
        val.msg_code = this.msgCode;
      }

      // 发送后把所有问题还原
      sessionStorage.setItem("questonsList", JSON.stringify(this.questionList)); // 每次信息发送后存到本地
      this.questionList.forEach((v) => {
        v.selectItem = "";
        if (v.info_type_name == "Tap") {
          let arra = [];
          v.options.forEach((a) => {
            arra.push(a);
          });
          v.options = arra;
        }
      });

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // 模板指令使用后要 +1
      if (this.promptsId != null) {
        promptsRecommend({ prompts_id: this.promptsId }).then(() => {
          this.promptsId = null;
        });
      }
      this.oldSendValue = this.sendValue;
      this.isClickChat = false;
      this.sendValue = "";

      let response = null;
      let url =
        Number(this.chat_type) == 0 || Number(this.chat_type) == 1
          ? "api/chat/async_chat_session"
          : "api/chat/async_chat_completion";
      // console.log(val, "--请求参数");
      this.controllerChat = new AbortController();
      response = await fetch(httpUrls.httpUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          authorization: userInfo.token,
          role: userInfo.role,
          source: "pc",
        },
        body: JSON.stringify(val),
        signal: this.controllerChat.signal,
      });
      this.ordeAIList = [];

      if (Number(response.status) != 200) {
        response.json().then((res) => {
          this.codeHandleChange(res);
        });
        return;
      }

      this.sendValue = ""; // 清空发送栏内容
      const reader = response.body.getReader();

      this.association = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          let stringStr = arr2str(value);
          let chatArr = stringStr.split("\r\n");
          this.isDetailChat = false;
          chatArr.forEach((val) => {
            if (val != "") {
              let res = JSON.parse(val);
              this.talkMsgList(res);
              return;
            }
          });
        }
      }
    },

    // ai返回的数据处理
    talkMsgList(res) {
      // console.log(res);
      /**
       * 35
       */
      // console.log('========================', res);
      this.msgCode = res.msg_code;
      if (Number(res.code) == 36003) {
        if (this.chat_type == 0) {
          this.isfinishChat = true;
          clearInterval(this.t_timeChat);
          this.t_timeChat = null;
          this.isTimeChat = false;
          this.isBtnChat = true;
        }
        this.$message.error("关联对话必须为一问一答");
      }
      if (Number(res.code) == 30014 || Number(res.code) == 40022) {
        // 登录
        if (this.loginInfo.role == "guess") {
          sessionStorage.setItem("templateSelectToken", this.item.title);
          console.log(1);
          this.$refs.Register.registerVisible = true;
          return;
        }
        // 升级会员
        if (this.loginInfo.role == "user") {
          this.queryErrorMsg = res.msg;
          this.isuser = false;
          this.isfinishChat = true;
          clearInterval(this.t_timeChat);
          this.t_timeChat = null;
          this.isTimeChat = false;
          this.isBtnChat = true;
          return;
        }
      }

      // 状态码的统一处理
      if (res.code != undefined) {
        let resStatus = this.codeHandleChange(res);
        if (!resStatus) {
          return;
        }
      }
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language)
          ? language
          : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };

      if (!this.isfinishChat) {
        this.isTimeChat = false;
        if (res != "" && res.content != null) {
          // console.log(res.content,'文本')
          if (this.chat_type == "10") {
            this.chatList[this.chatList.length - 1].content = res.content;
            this.chatList[this.chatList.length - 1].markedContent = marked(
              res.content
            );
            this.replyChat = marked(res.content);
          } else {
            this.chatList[this.chatList.length - 1].content =
              this.chatList[this.chatList.length - 1].content + res.content;

            this.chatList[this.chatList.length - 1].markedContent = marked(
              this.chatList[this.chatList.length - 1].content + res.content
            );
            this.replyChat = marked(
              this.chatList[this.chatList.length - 1].content + res.content
            );
          }
          // 定位到聊天最底部
          // this.toBottom();
        }
        if (res.session_code != "" && res.session_code != null) {
          this.chatList[this.chatList.length - 1].session_code =
            res.session_code;
          localStorage.setItem("session_code", res.session_code);
        }
        if (res.create_time != "" && res.create_time != null) {
          this.chatList[this.chatList.length - 1].create_time = res.create_time;
        }
        if (res.chat_group_code != "" && res.chat_group_code != null) {
          this.chatList[this.chatList.length - 1].chat_group_code =
            res.chat_group_code;
          localStorage.setItem("chat_group_code", res.chat_group_code);
        }
        if (res.finish_reason != "" && res.finish_reason != null) {
          this.isfinishChat = true;
          this.isBtnChat = true;
          for (let i = 0; i < 10; i++) {
            clearInterval(this.t_timeChat);
          }
          this.t_timeChat = null;
          this.chatList[this.chatList.length - 1].finish_reason =
            res.finish_reason;
          this.$store.dispatch(
            "user/changeChatListLength",
            this.chatList.length
          );
          this.chatList[this.chatList.length - 1].timer = this.timerChat;
          if (!localStorage.getItem("session_code")) {
            this.sessionRightNavCode = res.session_code;
          }
          this.tokenNumberChat = {
            completionTokens: res.completion_tokens, // 下行token
            promptTokens: res.prompt_tokens, // 上行token
            integral: res.integral, // 积分
            totalTokens: res.total_tokens, // 总tokes
          };

          this.chatList.forEach((v) => {
            v.markedContent = marked(v.content, { renderer });
          });
          this.replyChat = marked(this.replyChat, { renderer });
        }
        if (
          res.finish_reason == "stop" ||
          res.finish_reason == 2 ||
          res.finish_reason === true
        ) {
          this.sessionRightNavCode = res.session_code;
          // 智能体对话
          // 保存最近使用
          this.timerChat = 0;
          this.t_timeChat = null;
          submitFootprint({
            type_name: "智能体对话",
            type_code: "chat",
            title: this.chatData.question,
            eid: res.session_code,
          }).then((res) => {
            console.log("保存对话历史");
          });
        }
        if (res.role != "" && res.role != null) {
          this.chatList[this.chatList.length - 1].role = res.role;
        }
      }
    },
    codeHandleChange(res) {
      // console.log(res);
      this.isTimeChat = false;
      this.isBtnChat = true;
      this.isfinishChat = true; // 完成打字效果
      clearInterval(this.t_timeChat);
      this.t_timeChat = null;

      if (Number(res.code) == 40013) {
        sessionStorage.setItem("templateSelectToken", this.item.title);
        this.$refs.Register.registerVisible = true;
        this.$store.dispatch("user/GuessLogin");
      } else if (
        (Number(res.code) == 30014 || Number(res.code) == 40022) &&
        this.loginInfo.role == "guess"
      ) {
        this.queryErrorMsg = res.msg;
        sessionStorage.setItem("templateSelectToken", this.item.title);
        this.$refs.Register.registerVisible = true;
      } else if (
        (Number(res.code) == 30014 || Number(res.code) == 40022) &&
        this.loginInfo.role == "user"
      ) {
        this.isuser = false;
        this.queryErrorMsg = res.msg;
      } else if (Number(res.code) == 40015) {
        this.isFoulLanguage = true;
        this.queryErrorMsg = res.msg;
      } else {
        if (
          Number(res.code) < 50000 &&
          Number(res.code) != 40022 &&
          Number(res.code) != 30014
        ) {
          this.$message.error(res.msg);
        } else if (Number(res.code) != 40022 && Number(res.code) != 30014) {
          this.$message({
            message: "网络异常,请稍后重试",
            type: "error",
            duration: 2000,
          });
        }
      }
    },
    // 重新回答
    resetController() {
      if (!this.isfinishChat) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }
      this.timerChat = 0;
      this.t_timeChat = setInterval(() => {
        this.timerChat += 1;
      }, 1000);
      this.endController("", false);
      this.sendMsg("true");
    },
    // 终止回答
    endController(code, resetChat = true) {
      this.isfinishChat = true;
      this.isBtnChat = true;
      this.isTimeChat = false;
      try {
        this.controllerChat.abort();
      } catch (error) {}
      clearInterval(this.t_timeChat);

      this.sessionRightNavCode = code;
      if (resetChat) {
        this.chatList[this.chatList.length - 1].timer = this.timerChat;
      }
    },
    // 优化回答
    optimizeAnswers(item) {
      if (!this.isfinishChat) {
        this.$message("当前问题还没回答完毕，请稍后再提问");
        return;
      }
      this.supplyVisible = true;
      this.chatItem = item;
      this.supplyValue = "";
      this.replyChat = item.content;
    },
    //历史记录
    updataChatList(code) {
      console.log("updataChatList");
      this.isuser = true;
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.chatList.forEach((v) => {
        v.checked = false;
      });

      this.sendValue = "";
      this.association = "";
      this.isClickChat = true;
      this.chatContScroll = "";
      // console.log(this.chat_type);
      if (!this.isfinishChat) {
        try {
          this.controllerChat.abort();
        } catch (error) {}
        clearInterval(this.t_timeChat);
        this.isfinishChat = true;
        this.isBtnChat = true;
      }
      // }
      this.getDetail(code);
    },
    undateName(aiId) {
      console.log("undateName");
      this.AIname = aiId;
    },
    isShowRightSidbar(bool) {
      this.isShowRightNav = bool;
    },
    // 开启新会话
    resetNewChat(aiId) {
      console.log("开启新会话");
      if (this.chatList.length == 0) return;
      this.chatList = [];
      this.$store.dispatch("user/changeChatListLength", 0);
      localStorage.setItem("session_code", "");
      localStorage.setItem("chat_group_code", "");
      // }
      this.isuser = true;
      this.endController("", false); // 终止回答
      this.randomStr = Math.random();
      this.isShowChecked = false;
      this.isShowassociation = false;
      this.isClickChat = false;
      this.msgCode = "";
      this.isTimeChat = false;
      this.sendValue = "";
    },
    // 获取会话详情
    getDetail(code) {
      // console.log(code,'会话详情')
      this.isDetailChat = true;
      this.isTimeChat = false;
      this.isfinishChat = true;
      this.chatList = [];
      this.isFoulLanguage = false;
      this.ordeAIList = [];
      const renderer = new marked.Renderer();
      // 重写代码块渲染方法，使用highlight.js进行代码高亮
      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language)
          ? language
          : "plaintext";
        const highlightedCode = hljs.highlight(validLanguage, code).value;
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      };
      // console.log(code)
      chatDetail(code)
        .then((res) => {
          if (res.code == 20000) {
            let arr = res.data;
            arr.forEach((item, index) => {
              localStorage.setItem("session_code", code);
              localStorage.setItem("chat_group_code", item.chat_group_code);
              this.chatList.push({
                ...item,
                help: item.is_likes == 1 ? true : false,
                stepOn: item.is_likes == 2 ? true : false,
                markedContent: marked(item.content, { renderer }),
                id: this.chatList.length,
                timer: false,
              });
              this.$store.dispatch(
                "user/changeChatListLength",
                this.chatList.length
              );
            });
            this.$nextTick(() => {
              let pres = document.getElementsByTagName("pre");
              for (let a = 0; a < pres.length; a++) {
                let spans = document.createElement("span");
                spans.setAttribute("class", "copy-code-button");
                spans.addEventListener("click", (event) => {
                  var input = document.createElement("textarea"); // 创建input对象
                  input.value = event.target.previousElementSibling.innerText; // 设置复制内容
                  document.body.appendChild(input); // 添加临时实例
                  input.select(); // 选择实例内容
                  document.execCommand("Copy"); // 执行复制
                  document.body.removeChild(input); // 删除临时实例
                  this.$message.success("复制成功！");
                });
                spans.setAttribute("click", "copyCodeButton");
                pres[a].appendChild(spans);
              }
            });
            // this.isShow = true;
            // this.isScrollTop = false;
            // this.toBottom(false);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取会话失败！");
        });
    },
    // 删除标签
    handleCloseTag(tag, item) {
      this.questionList.forEach((v) => {
        if (v.info_type_id == item.info_type_id && v.title == item.title) {
          v.options.splice(v.options.indexOf(tag), 1);
        }
      });
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    // 输入框聚焦
    showInputTag() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 添加标签
    handleInputConfirmTag(item) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.questionList.forEach((v) => {
          if (v.info_type_id == item.info_type_id && v.title == item.title) {
            console.log(v, "456999");
            v.options.push({
              option_id: v.options.length,
              value: inputValue,
            });
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>
<style scoped lang="scss">
.preset {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 16px;
  .preset_item {
    color: #78829a;
    width: 48%;
    margin-top: 10px;
    border-radius: 8px;
    background-color: #f1f2f5;
    padding: 8px 15px;
    -webkit-line-clamp: 1;
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .presetCheck {
    background-color: rgb(31, 100, 255);
    color: #fff;
  }
  .preset_item:hover {
    background-color: rgb(31, 100, 255);
    color: #fff;
  }
}
.replay /deep/ img {
  max-width: 440px;
}
.token {
  width: 238px;
  color: #999;
  font-size: 13px;
  margin: auto;
  margin-top: 5px;
}
.chat-dialog-footer {
  background-color: #1f64ff;
  color: #ffffff;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}
.templateselect-list .selsect-title {
  color: #333;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.templateselect-list .selsect-title > div {
  display: flex;
  align-items: center;
}
.answerResults {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.onAnalysis {
  width: 100%;
}
.titlea {
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}
.replay {
  color: #333;
  font-weight: 400;
  font-size: 16px;
  /* color: #333; */
  line-height: 20px;
  /* 设置字间距 */
  letter-spacing: 1px;
  /* white-space: pre-wrap; */
  background: #f5f5f5;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
}
.consume {
  color: #7e8494;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  margin: 16px 0 0 0;
  border-top: 1px solid #e0e1e2;
  padding-top: 16px;
}
.prompt {
  color: #aab2c8;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}
.add {
  cursor: pointer;
  width: 100%;
  height: 30px;
  color: #3396fa;
  text-align: center;
  border-top: 1px solid #ccc;
  font-size: 14px;
  line-height: 30px;
  position: sticky;
  bottom: 0px;
  background-color: #fff;
  opacity: 1;
}
.button_list {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.btn_left {
  display: flex;
  > div {
    cursor: pointer;
    border-radius: 4px;
    background: #e5edff;
    display: inline-flex;
    height: 35px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    color: #1f64ff;
    text-align: justify;
    font-family: "PingFang SC";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin-right: 10px;
  }
}
.btn_right {
  background-color: #ffffff;
  padding: 6px 10px;
  display: flex;
  align-items: center;
}
.btn_right img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(241, 242, 245);
  .left {
    position: relative;
    height: 100%;
  }
  .right {
    min-width: 500px;
    background: #fff;
    height: calc(100% - 60px);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 30px 0px;
    overflow-y: auto;
    position: relative;
    .go-back {
      cursor: pointer;
      position: absolute;
      left: 30px;
      top: 30px;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      img {
        height: 10px;
        position: relative;
        left: 0px;
      }
    }
    .checkBox {
      width: 500px;
      position: relative;
      left: 50%;
      top: 30px;
      transform: translate(-50%, 0px);
      .chenkBack {
        position: absolute;
        top: -30px;
        left: 0px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
      }
      .checkBox-top {
        display: flex;
        align-items: center;
        img {
          width: 108px;
          height: 108px;
          flex-shrink: 0;
          border-radius: 50%;
        }
        div {
          margin-left: 15px;
          color: #000;
          text-align: justify;
          font-family: "PingFang SC";
          font-size: 20px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 30px */
        }
      }
      .checkBox-content {
        width: 400px;
        position: relative;
        left: 80px;
        .checkBox-content-title {
          color: #000;
          font-family: "PingFang SC";
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
          margin-bottom: 10px;
        }
        .tree-box {
          width: 400px;
          height: 250px;
          display: flex;
          justify-content: center;
          border-radius: 4px;
          border: 1px solid #ebecf0;
          padding: 10px 0px;
          overflow-y: auto;
          > div {
            width: 200px;
          }
        }
        .checkBox-content-bottom {
          display: flex;
          width: 100%;
          padding: 6px 0px;
          justify-content: center;
          align-items: center;
          border-radius: 6px;
          background: #1f64ff;
          color: var(--Text-text-white, #fff);
          text-align: center;
          font-family: "PingFang SC";
          font-size: 16px;
          font-style: normal;
          line-height: 24px; /* 141.176% */
          margin-top: 20px;
          cursor: pointer;
        }
        border-radius: 4px;
        box-sizing: border-box;
      }
    }

    > div > img {
      width: 108px;
      height: 108px;
      border-radius: 50%;
      position: relative;
      left: 50%;
      transform: translate(-50%);
    }
    .chat_title {
      color: #000;
      text-align: justify;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px; /* 30px */
      text-align: center;
    }
    .chat_tips {
      color: #666;
      text-align: center;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px; /* 18px */
    }
    .chat_check {
      display: flex;
      justify-content: center;
      margin-top: 16px;
      > div {
        cursor: pointer;
      }
      > div:nth-child(1) {
        border-radius: 4px;
        background: #1f64ff;
        width: 120px;
        height: 32px;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 18px */
        display: flex;
        align-items: center;
        justify-content: center;
      }
      > div:nth-child(2) {
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e5edff;
        color: #1f64ff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 18px */
        height: 32px;
        padding: 0px 8px;
        margin: 0px 12px;
      }
      > div:nth-child(3) {
        width: 120px;
        /deep/ .el-input__inner {
          height: 32px;
        }
      }
    }
    .chat_content {
      width: 80%;
      margin: auto;
      margin-top: 30px;
      > div {
        margin-bottom: 15px;
        > div:first-child {
          margin-bottom: 7px;
          color: #333;
          font-family: PingFang SC;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%; /* 19.5px */
          span {
            font-family: PingFang SC;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
          }
        }
        > div:nth-child(2) {
          width: 100%;
          border-radius: 8px;
          > div:first-child {
            padding: 5px 9px;
            box-sizing: border-box;
          }
        }
      }
    }
    .sendMsg {
      cursor: pointer;
      display: flex;
      width: 208px;
      padding: 7px 15px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 6px;
      background: #1f64ff;
      color: var(--Text-text-white, #fff);
      text-align: center;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      line-height: 24px; /* 141.176% */
      margin: auto;
      margin-top: 5px;
    }
  }
}
</style>
