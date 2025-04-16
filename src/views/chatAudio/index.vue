<template>
  <div
    class="draw-chat"
    :style="
      $route.path == '/drawChat/drawChat'
        ? isShowNotice
          ? 'height: calc(100vh - 100px - 30px);'
          : ''
        : ''
    "
  >
    <div class="work_area" style="width: calc(25% + 40px)">
      <!-- tab切换 -->
      <div class="tab">
        <div style="width: 100%" class="teb-content">
          <div
            style="width: 100%"
            :class="
              selsectWorkSpaceLeft == 2 ? 'tab-box boxTransition' : 'tab-box'
            "
          >
            <!-- 专家 -->
            <div class="workSpace_area">
              <div class="img_collector">
                <div class="img_collector-title">
                  <div class="workSpace_area-title" style="margin: 0px">
                    <span style="margin-right: 4px">纯乐器</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="选择效果: 开启后将生成纯音乐演奏的音乐"
                      placement="top-start"
                    >
                      <img
                        src="../../assets/images/help-circle.png"
                        style="width: 16px; cursor: pointer"
                        alt=""
                      />
                    </el-tooltip>
                  </div>
                  <el-switch v-model="make_instrumental"> </el-switch>
                </div>
              </div>
              <h4>
                详细参数（选填）
                <i v-if="!openLeft" style="cursor: pointer;" class="el-icon-caret-bottom" @click="handlerOpen()"></i>
                <i v-else style="cursor: pointer;" class="el-icon-caret-top" @click="handlerOpen()"></i>
              </h4>
              <div class="transitionTop" :style="{height:openLeft?'auto':'0',overflowY:openLeft?'auto':'hidden'}">
                <!-- 歌词 -->
                <div
                  class="img_cue_word"
                >
                  <div class="workSpace_area-title">歌词</div>
                  <div class="input_textarea">
                    <el-input
                    v-loading="lyricLoading"
                      type="textarea"
                      v-model="lyric"
                      style="height:120px"
                      placeholder="填写具体歌词（2节8行），或输入歌词大意使用AI创作歌词"
                       maxlength="200"
                      show-word-limit
                    ></el-input>
                    <div style="width: 100%;display: flex;margin-top: 10px;">
                      <el-button size="small" type="primary" @click="createLyric">AI创作歌词</el-button>
                      <div style="color: #1f64ff;font-size: 13px;margin-top: 13px;margin-left: 5px">90算力/次</div>
                    </div>
                  </div>
                </div>
                <!-- 音乐风格 -->
                <div
                  class="img_cue_word"
                >
                  <div class="workSpace_area-title">音乐风格</div>
                  <div class="input_textarea">
                    <el-input
                      type="textarea"
                      v-model="music_style"
                      style="height:120px"
                      placeholder="描述你想要的音乐风格（例如，原生音乐风格，不支持艺术家名称，仅支持音乐流派和氛围）"
                    ></el-input>
                  </div>
                </div>
                <!-- 音乐名称 -->
                <div
                  class="img_cue_word"
                >
                  <div class="workSpace_area-title">标题</div>
                  <div class="input_textarea">
                    <el-input
                      v-model="music_title"
                      placeholder="请输入音乐标题"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <GoBackNew style="margin-left: 10px"></GoBackNew>

      <!-- 大图示例和用户生成图片，以及各种错误提示区 -->
      <div
        class="workspace_main"
        :style="
          $route.path == '/chataboratory/laboratoryDrawChat'
            ? 'height: 450px'
            : ''
        "
      >
        <div class="workspace_mask">
          <div>
            <!-- SD -->
            <div class="img_msk">
              <!-- 示例 -->
              <div
                v-if="exampleItem != '' && chatList.length == 0"
              >
                <!-- 虚影图片 -->
                <img class="filter_img" :src="exampleItem.pic_url" alt="" />
                <!-- 显示图片 -->
                <img
                  class="img"
                  :src="exampleItem.pic_url"
                  alt=""
                  v-if="exampleItem != '' && chatList.length == 0"
                />

                <div class="example_title" v-if="exampleItem != ''">
                  示例图片
                </div>
              </div>

              <!-- 没钱了 -->
              <div
                v-else-if="!isuser"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: #ebebeb;
                "
              >
                <div style="font-size: 14px; margin-bottom: 20px">
                  十分抱歉，您的次数已用完，请购买流量包等产品
                </div>
                <el-button
                  v-if="!isuser"
                  @click="$refs.Pay.PayVisible = true"
                  style="
                    width: 179px;
                    height: 40px;
                    text-align: center;
                    background: #ff9b17;
                    color: #ffffff;
                  "
                  >购买套餐</el-button
                >
              </div>

              <!-- 结果 -->
              <div
                v-else-if="chatList.length > 1"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <!-- 显示图片 -->
                <video
                  class="img"
                  style="cursor: zoom-in"
                  autoplay
                  controls
                  :src="chatList[1].video_url"
                  alt=""
                />
              </div>

              <!-- 生成中 -->
              <div
                v-if="isTimestableDiffusion"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-progress
                  type="circle"
                  :percentage="percentageNumber"
                ></el-progress>
                <div v-if="isTimestableDiffusion">
                  生成中，耗时{{ timer }}秒
                </div>
                <!-- 试听音频 -->
                <div class="tryAudio" v-if="tryAudioBool">
                  <div>试听音频：</div>
                  <audio controls :src="tryAudio" ></audio>
                </div>
                <div class="tryAudio" v-else>
                  <i class="el-icon-loading"></i>
                  <div>试听音频加载中~</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 音频展示 -->
          <div class="Display_Audio" v-if="false">
            <img :src="chatList[1]['image_url']" class="audioImg" alt="">
            <!-- 歌词 -->
            <div class="lyrics" v-html="chatList[1]['lyrics']"></div>
            <div class="audio-footer">
              <audio :src="chatList[1]['audio_url']" controls></audio>
              <div class="audio-tool">
                <div class="audio-item">
                  <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/music_fill.png" alt="">
                  <div>下载音频</div>
                </div>
                <div class="audio-item">
                  <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/video.png" alt="">
                  <div>下载视频</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="workspace_tips" v-if="chatList.length > 1">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.8605 2.57347L1.21384 12.0001C1.09741 12.2018 1.03581 12.4303 1.03516 12.6631C1.03451 12.896 1.09483 13.1249 1.21012 13.3272C1.32541 13.5294 1.49165 13.698 1.69231 13.816C1.89296 13.9341 2.12103 13.9976 2.35384 14.0001H13.6472C13.88 13.9976 14.108 13.9341 14.3087 13.816C14.5094 13.698 14.6756 13.5294 14.7909 13.3272C14.9062 13.1249 14.9665 12.896 14.9658 12.6631C14.9652 12.4303 14.9036 12.2018 14.7872 12.0001L9.1405 2.57347C9.02165 2.37754 8.85432 2.21555 8.65463 2.10313C8.45495 1.9907 8.22966 1.93164 8.0005 1.93164C7.77135 1.93164 7.54606 1.9907 7.34637 2.10313C7.14669 2.21555 6.97935 2.37754 6.8605 2.57347Z"
              stroke="#666666"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 6V8.66667"
              stroke="#666666"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 11.334H8.00667"
              stroke="#666666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span
          >当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉</span
        >
      </div>
      <!-- 用户输入区 -->
      <div class="user_input_area">
        <div class="title_area">
          <!-- <div> -->
          <div class="chat_cont">
            <span
              class="resetNewChat"
              @click="resetNewChat"
              v-if="chatList.length > 1"
              >开启新绘画</span
            >
            <span style="line-height: 30px">排队人数：0人</span>
          </div>
          <!-- </div> -->
          <div class="share" @click="$router.push('/share/share')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2.66602 8V13.3333C2.66602 13.687 2.80649 14.0261 3.05654 14.2761C3.30659 14.5262 3.64573 14.6667 3.99935 14.6667H11.9993C12.353 14.6667 12.6921 14.5262 12.9422 14.2761C13.1922 14.0261 13.3327 13.687 13.3327 13.3333V8"
                stroke="#1F64FF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6673 3.9987L8.00065 1.33203L5.33398 3.9987"
                stroke="#1F64FF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 1.33203V9.9987"
                stroke="#1F64FF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>分享赚算力</div>
            <span style="line-height: 30px; margin-left: 10px; color: #999">生成音乐：6000算力/次</span>
          </div>
          <!-- <span>每张图消耗{{ chat_type == 6 ? 50 : chat_type == 9 ? 5 : chat_type == 15 ? 100 : 35 }}万算力</span> -->
        </div>
        <div class="input_area">
          <el-input
            class="user_btn"
            type="text"
            placeholder="在此输入您想了解的内容，Shift+Enter换行，Enter发送"
            v-model="sendValue"
            @keyup.enter.native="(event) => handleKeyUp(event)"
          ></el-input>
          <div>
            <el-button
              style="border: none; background-color: #1f64ff; color: #ffffff"
              @click="isBtn ? sendMsg(3) : sendMsg2(3)"
              >AI生成</el-button
            >
          </div>
        </div>
      </div>

      <!-- <div class="bottom_mask"></div> -->
    </div>

    <!-- 选项和记录 -->
    <div class="work_area" style="width: 20%; padding: 0px 20px">
      <div class="select_workspace">
        <div
          :class="selsectWorkSpaceRight == 3 ? 'item item-on' : 'item'"
          @click="showWorspaceOrHistory(3)"
        >
          案例
        </div>
        <div
          :class="selsectWorkSpaceRight == 4 ? 'item item-on' : 'item'"
          @click="showWorspaceOrHistory(4)"
        >
          历史记录
        </div>
      </div>
      <div class="remind" v-show="selsectWorkSpaceRight == 3">
        点击下方的图片，即可选用这张图所用的描述
      </div>
      <!-- 案例 -->
      <div
        class="history-list"
        id="history-list"
        v-if="selsectWorkSpaceRight == 3"
      >
        <div class="mask" id="history-mask">
          <div
            v-for="(item, i) in qsList"
            :key="i"
            :class="exampleItem.pic_id == item.pic_id ? 'item item-on' : 'item'"
            @click="selectExampleItem(item, i)"
          >
            <img
              class="img"
              style="cursor: pointer"
              :src="item.pic_url"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 历史记录 -->
      <div
        class="history-list"
        id="history-list"
        v-if="selsectWorkSpaceRight == 4"
      >
        <div class="mask" id="history-mask">
          <div class="item" v-for="(item, i) in chatHistoryList" :key="i">
            <img
              class="img"
              :src=" item.image_url"
              alt=""
              @click="getDrawDetail(item)"
            />
            <i
              class="el-icon-close del"
              @click="deleteDrawHistory(item, i)"
            ></i>
          </div>
          <div class="noHistory" v-if="chatHistoryList.length == 0">
            暂无数据
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" class="draw_image-class_dark">
      <img
        width="100%"
        :src="dialogImageUrl"
        style="max-height: 800px; min-height: 500px; cursor: zoom-out"
        alt=""
        @click="dialogVisible = false"
      />
    </el-dialog>
    <Register ref="Register"></Register>
    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import {
  drawingSetRecommend,
  get_Audio_Video_list,
  delete_Audio_Video,
  create_Audio_Video,
  get_Audio_Video_status,
} from "../../api/chatMG";
import { chatLikes, chatLikesNew } from "../../api/prompts";
import Register from "../../components/register";
import pay from "../../components/pay";
import GoBackNew from "../../components/goBack";

import { mapGetters } from "vuex";

export default {
  name: "draw-chat",
  data() {
    return {
      openLeft:true,  //展开收起
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "AI_chat-picture",
      },
      tryAudioBool:false,
      make_instrumental:false,  //是否纯音乐
      lyric:'', //歌词
      music_style:'',  //音乐风格
      music_title:'',  //音乐名称
      lyricLoading:false,   //歌词生成加载状态
      tryAudio:'',  //试听音频
      is_likeOk: false, //最新点赞选中状态
      is_likeNo: false, //最新取消点赞选中状态
      createImgStatus: false, //图片生成状态
      chatText: "",
      httpUrls,
      requestData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "pc-draw_picture",
      },
      drawChatItem: {},
      uploadPictureUrl: "",
      dialogImageUrl: "",
      disabled: false,
      dialogVisible: false,
      chatHistoryList: [],
      exampleItem: {},
      examplet_time: null,
      exampleTime: 0,
      aiNameList: [
        { value: "1", label: "runway", size: "512*512" },
        { value: "2", label: "pika", size: "512*512" },
      ],
      chat_value: ["13"],
      selsectWorkSpaceLeft: 2,
      selsectWorkSpaceRight: 3,
      imageToImage: 1, // 是否为图生图，1：否 2：是
      isBtn: true,
      showDrawImage: false,
      imagesSrc: "",
      chatType: true,
      chatType1: false,
      chatType2: false,
      chatType3: false,
      // action_type: '1',
      activeName: "0",
      chat_type: 13, // ai35: 0; ai40: 1; DALL·E 2：2; 百度绘画: 3
      sendValue: "",
      oldSendValue: "",
      isShow: false,

      percentageNumber: 0,

      isShowTemplateDALL: true,
      isShowTemplateBaidu: true,
      isShowTemplateMidJ: true,
      isShowTemplatestableDiffusion: true,
      isShowTemplateTonyi: true,
      isShowTemplateHuoshan: true,
      isShowTemplateDellE3: true,
      // isShowTemplateDellE2:true,
      isPay: true,
      reply: "",
      timer: 0,
      t_time: 0,

      isTimeDell: false,
      isTimeBaidu: false,
      isTimeMidjourney: false,
      isTimestableDiffusion: false,
      isTimeTonyi: false,
      isTimeHuoshan: false,
      isTimeDellE3: false,

      isfinish: false,
      isBtn: true, // 防止重新发送
      supplyVisible: false,
      supplyValue: "",
      isDetail: false,
      qsList: [],

      chatList: [], //dell2绘画内容
      baiduList: [], // 百度绘画内容
      midjourneyList: [], // midjourney内容
      stableDiffusionList: [], // Stable Diffusion内容
      tonyiList: [], //通义绘画内容
      huoshanList: [],
      dellE3List: [],

      isuser: true, //使用次数是否用完
      AIname: 2,
      userTextarea: "",
      isShowHelpImg: false,
      isShowStepOnImg: false,
      isShowTemplateSelte: false,
      textAreaLength: 900,
      association: "", // 是否关联上下文
      isShowassociation: false,
      isShowChecked: false,
      ordeAIList: [], // 关联上下文的列表
      sizeRadio: "16:9", // 绘画尺寸
      dialogTitleVisible: false,
      drawSizeList: [
        {
          id: "16:9",
          size: "16:9",
          width: "45px",
          height: "30px",
        },
        {
          id: "9:16",
          size: "9:16",
          width: "30px",
          height: "45px",
        },
        {
          id: "1:1",
          size: "1:1",
          width: "42px",
          height: "42px",
        },
        {
          id: "4:3",
          size: "4:3",
          width: "45px",
          height: "30px",
        },
        {
          id: "3:4",
          size: "3:4",
          width: "30px",
          height: "45px",
        },
        {
          id: "21:9",
          size: "21:9",
          width: "45px",
          height: "30px",
        },
      ],
      SDWaitQueue: 0,
      SDValue: "",
      SDModel: [],
      drawTextarea: "",
      actionType: 3, // 是否为图文生图 3：文字；5：图文生图
      updataRightList: 2,
      sessionRightNavCode: "",
      imgUrl: {},
      loginInfo: null,
      isClickChat: false, // 点击了历史会话
      randomStr: 0, // 随机数，用于刷新历史会话
      queryErrorMsg: "",
      mjImageStyle: false, // mj绘画风格
      mjWaitQueue: {},
      mjProgress: "",

      startNewChatDALLE2: false, // 开启新会话DELL·E2
      startNewChatBAIDU: false, // 开启新会话百度绘画
      startNewChatMJ: false, // 开启新会话MJ
      startNewChatstableDiffusion: false, // 开启新会话MJ
      startNewChatTonyi: false, //开启新会话ty
      startNewChatHuoshan: false, //开启新会话火山
      startNewChatDellE3: false, //开启新会话dellE3
      page_size: 30,
      page: 1,

      headerData: {},
    };
  },
  computed: {
    ...mapGetters(["isShowNotice"]),
    priceToken() {
      //图片价格
      let text = "4800算力/张图";
      switch (this.chat_type) {
        case "3":
          text = "9009算力/张图";
          break;
        case "6":
          text = "16854算力/张图";
          break;
        case "9":
          text = "4800算力/张图";
          break;
        case "13":
          text = "4800算力/张图";
          break;
        case "14":
          text = "1800算力/张图";
          break;
        case "15":
          text = "8400算力/张图";
          break;
        default:
          break;
      }
      return text;
    },
  },
  components: {
    pay,
    Register,
    GoBackNew,
  },

  watch: {
    $route: {
      deep: true,
      handler() {
        this.chat_type = this.$route.query.value;
      },
    },
  },

  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token;
    this.headerData.role = userInfo.role;
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.updataRightList = this.chat_type;
    this.getChatList();
  },

  mounted() {
    this.drawingSetRecommend()
    this.$nextTick(() => {
      let historyList = document.getElementById("history-list");
      let historyMask = document.getElementById("history-mask");
      historyList.addEventListener("scroll", (e) => {
        if (
          e.target.scrollTop + e.target.offsetHeight >=
          historyMask.offsetHeight
        ) {
          this.getChatList("gundong");
        }
      });
    });
  },

  beforeDestroy() {
    // document.getElementById("chat-meta-keywords").remove();
    // document.getElementById("chat-meta-description").remove();
  },

  methods: {
    handlerOpen(val){
      this.openLeft = !this.openLeft
    },
    //键盘按下事件
    handleKeyUp(event) {
      if (event.shiftKey && event.keyCode === 13) {
        // 按下 Shift+Enter，换行
        console.log("换行");
      } else if (event.keyCode === 13) {
        // 按下 Enter，发送
        // 在这里添加你的发送逻辑
        if (this.isBtn) {
          this.sendMsg(3);
        } else {
          sendMsg2(3);
        }
      }
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    handleSuccessFile(response, file, fileList) {
      this.uploadPictureUrl = response.data.new_url;
    },
    //做同款
    handleSameStyle() {
      let text; //文本
      this.sendValue = text[0].prompt ? text[0].prompt : text[0].content;
    },
    // 选择工作区或者历史记录
    showWorspaceOrHistory(type) {
      if (type <= 2) {
        this.selsectWorkSpaceLeft = type;
      } else {
        this.selsectWorkSpaceRight = type;
      }
      // this.selsectWorkSpace = type
      if (type == 4) {
        this.page = 1;
        console.log("触发历史记录");
        this.getChatList("aiId");
      }
    },

    // 点击示例
    selectExampleItem(item, i) {
      this.exampleItem = item;
      this.sendValue = item.pic_desc;
      clearInterval(this.examplet_time);
      this.examplet_time = null;
      this.chatList = [];
    },

    // 切换模型
    selectAIname(chatType) {
      this.chat_type = chatType.value;
      this.imageToImage = 1;
      this.exampleItem = this.qsList[0];
      this.sizeRadio = chatType.size;
      this.isuser = true;
      this.page = 1;
      this.getChatList("aiId");
      this.chatList = [];
    },

    // 点赞点踩
    showSetonHelpImg(num, bool) {
      let item;
      switch (this.chat_type) {
        case 2:
          item = this.chatList[1];
          break;
        case 3:
          item = this.baiduList[1];
          break;
        case 6:
          item = this.midjourneyList[1];
          break;
        case 9:
          item = this.stableDiffusionList[1];
          break;
        case 13:
          item = this.tonyiList[1];
          break;
        case 14:
          item = this.huoshanList[1];
          break;
        case 15:
          item = this.dellE3List[1];
          break;
        default:
          break;
      }
      if (!bool && num % 2 != 0) {
        this.is_likeOk = true;
        this.is_likeNo = false;
        //点赞
        if (
          this.chat_type != 13 &&
          this.chat_type != 14 &&
          this.chat_type != 9
        ) {
          chatLikes({
            is_likes: 1,
            session_code: item.session_code,
            chat_group_code: item.chat_group_code,
          });
        } else {
          chatLikesNew({
            is_likes: 1,
            msg_code: item.msg_code,
          });
        }
      } else if (bool && num % 2 == 0) {
        this.is_likeNo = true;
        this.is_likeOk = false;
        //取消点赞
        if (
          this.chat_type != 13 &&
          this.chat_type != 14 &&
          this.chat_type != 9
        ) {
          chatLikes({
            is_likes: 2,
            session_code: item.session_code,
            chat_group_code: item.chat_group_code,
          });
        } else {
          chatLikesNew({
            is_likes: 2,
            msg_code: item.msg_code,
          });
        }
      } else {
        //取消状态
        this.is_likeOk = false;
        this.is_likeNo = false;
        if (
          this.chat_type != 13 &&
          this.chat_type != 14 &&
          this.chat_type != 9
        ) {
          chatLikes({
            is_likes: 0,
            session_code: item.session_code,
            chat_group_code: item.chat_group_code,
          });
        } else {
          chatLikesNew({
            is_likes: 0,
            msg_code: item.msg_code,
          });
        }
      }
    },

    // 下载
    downloadImgs() {
      let url = "";
      let item;
      switch (this.chat_type) {
        case 2:
          item = this.chatList[1];
          break;
        case 3:
          item = this.baiduList[1];
          break;
        case 6:
          item = this.midjourneyList[1];
          break;
        case 9:
          item = this.stableDiffusionList[1];
          break;
        case 13:
          item = this.tonyiList[1];
          break;
        case 14:
          item = this.huoshanList[1];
          break;
        case 15:
          item = this.dellE3List[1];
          break;
        default:
          break;
      }
      if (this.chat_type == 2) {
        if (item.isShowOldChat) {
          url = httpUrls.ossUrl + item.image_urls[0].sso_url;
        } else {
          url = httpUrls.ossUrl + item.image_urls[0].url;
        }
      } else if (this.chat_type == 3) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 6) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 9) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 13) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      } else if (this.chat_type == 14) {
        url = httpUrls.ossUrl + item.image_urls[0].url;
      }
      let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        img = new Image();
      img.crossOrigin = "*"; //解决Canvas.toDataURL 图片跨域问题
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
        let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "photo.png"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        canvas = null;
      };
      img.src = url;
    },

    //发送信息
    async sendMsg(type = 3) {
      // this.drawTextarea = ''
      this.isClickChat = false;
      this.actionType = type;
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      // 原图
      if (this.sendValue == "" || this.sendValue.replace(/\s*/g, "") == "") {
        this.$message({
          type: "error",
          message: "请输入您要发送内容",
        });
        return false;
      }
      this.mjProgress = "";
      this.percentageNumber = 0;
      this.oldSendValue = this.sendValue;
      clearInterval(this.examplet_time);
      this.chatList = [];
      this.createAudio();
      this.isShowTemplateDALL = false;
    },

    sendMsg2() {
      this.$message({
        type: "info",
        message: "当前问题还没回答完毕，请稍后再提问！",
      });
    },

    //创建歌词
    createLyric(){
      this.lyricLoading = true;
      let requestData = {
        action_type:1,
        prompt:this.lyric
      }
      this.$message.success('歌词生成中，请耐心等待')
      create_Audio_Video(requestData).then((res) => {
        if (res.code == 20000) {
          this.queryLyric(res.data.trace_code)
        }else{
          this.lyricLoading = false;
          this.$message.error(res.msg)
        }
      }).catch((err) => {
        this.lyricLoading = false;
        this.$message.error('网络波动，请稍后重试~')
      });
    },
    queryLyric(trace_code){
      get_Audio_Video_status(trace_code).then((res) => {
        if (res.data.code == 30014 || res.data.code == 40022) {
          this.lyricLoading = false;
        } else if (res.code == 20000) {
          if(res.data[0]['status'] != 3){
            setTimeout(() => {
              let code = trace_code;
              this.queryVideo(code);
            }, 5000);
          }else{
            this.lyricLoading = false;
            this.lyric = res.data[0]['lyrics']
          }
        }
      }).catch(err => {
        this.lyricLoading = false;
        this.$message.error('网络波动，请稍后重试~')
      });
    },
    //创建视频
    createAudio() {
      this.isShowChecked = false;
      this.isTimestableDiffusion = true;
      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

      
      let sendVal = {
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        isShowOldChat: true,
        timer: false,
      };

      this.chatList.push(sendVal);
      // this.toBottom();

      // this.isTime = true; // 思考中
        this.isTimeDell = true;
      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97
              ? 97
              : this.percentageNumber + num;
        }
      }, 1000);
      let requestData = {}
      if(this.openLeft){
        requestData = {
          action_type: 0,
          make_instrumental:this.make_instrumental,
          prompt:`请你根据我为你提供歌词和提示词帮我生成一首音乐，这是提示词：${this.sendValue}。这是歌词：${this.lyric}。`,
          tags:this.music_style,
          title:this.music_title,
          lyrics:this.lyric,
          custom_mode:1
        };
      }else{
        requestData = {
          action_type: 0,
          custom_mode:0,
          make_instrumental:this.make_instrumental,
          prompt:`请你根据我为你提供歌词和提示词帮我生成一首音乐，这是提示词：${this.sendValue}。这是歌词：${this.lyric}。`,
        }
      }
      this.oldSendValue = this.sendValue;
      create_Audio_Video(requestData).then((res) => {
        if (res.code == 20000) {
          
          this.queryVideo(res.data.trace_code)
        }else{
          this.$message.error(res.msg)
          this.isDetail = true;
          this.isShow = false; // 快速提问
          this.isfinish = true; // 完成打字效果
          this.isBtn = true; // 是否允许重发
          this.isTimestableDiffusion = false;
        }
      }).catch((err) => {
        this.$message.error('网络波动，请稍后重试~')
        this.isDetail = true;
        this.isShow = false; // 快速提问
        this.isfinish = true; // 完成打字效果
        this.isBtn = true; // 是否允许重发
        this.isTimestableDiffusion = false;
      });
    },
    //查询生成结果
    queryVideo(trace_code) {
      get_Audio_Video_status(trace_code).then((res) => {
        if (res.data.code == 30014 || res.data.code == 40022) {
          this.queryErrorMsg = res.data.msg;
          this.isBtn = true;
          this.isTime = false;
          this.isTimeDell = false;
          clearInterval(this.t_time);
          this.isTimestableDiffusion = false;
          this.isuser = false;
        } else if (res.code == 20000) {
          if(res.data[0]['status'] != 3){
            setTimeout(() => {
              if(res.data[1]['audio_url']){
                this.tryAudioBool = true;
                this.tryAudio = res.data[1]['audio_url']
              }
              let code = trace_code;
              this.queryVideo(code);
            }, 5000);
          }else{
            if(res.data[1]['audio_url'] && res.data[1]['video_url']){
              this.chatList = res.data;
              this.percentageNumber = 99;
              clearInterval(this.t_time);
              setTimeout(() => {
                this.tryAudioBool = false;
                this.isTimestableDiffusion = false;
                this.isuser = true;
                this.randomStr = Math.random();
                this.isBtn = true;
                this.isTimeDell = false;
              }, 500);
            }
          }
        }
      }).catch(err => {
        this.$message.error('网络波动，请稍后重试~')
        this.isBtn = true;
        this.isTime = false;
        this.isTimeDell = false;
        clearInterval(this.t_time);
        this.isTimestableDiffusion = false;
        this.isuser = true;
      });
    },

    // 获取示例
    drawingSetRecommend() {
      drawingSetRecommend().then((res) => {
        this.qsList = res.data;
        let mathNumber = Math.floor(Math.random() * res.data.length);
        this.exampleItem = res.data[mathNumber];
      });
    },

    // 开启新会话
    resetNewChat() {
      if (!this.isBtn) {
        this.$message("当前问题还没回答完毕，请稍后再试");
        return;
      }
      if (this.chatList.length == 0) return;
      this.chatList = [];
      this.isShowTemplateDALL = true;
      this.$store.dispatch("user/changeChatListLength", 0);
      localStorage.setItem("session_code2", "");
      localStorage.setItem("chat_group_code2", "");

      this.isuser = true;
      this.randomStr = Math.random();
      this.isShowChecked = false;
      this.isShowassociation = false;
      this.isClickChat = false;
      this.isBtn = true;
      clearInterval(this.t_time);
      this.isTimeDell = false;
      this.createImgStatus = false;
      let mathNumber = Math.floor(Math.random() * this.qsList.length);
      this.exampleItem = this.qsList[mathNumber];
      this.sendValue = "";
    },

    // 获取对话列表
    getChatList(str = "") {
      if (str == "gundong") {
        this.page++;
      }
      if (str == "aiId") {
        this.chatHistoryList = [];
      }
      let chat_type = Number(this.chat_type);

      let val = `action_type=${0}&page_size=${this.page_size}&page=${this.page}`;
      get_Audio_Video_list(val)
        .then((res) => {
          let data = res.data.data;
          data.map((item) => (item["content"] = item.result_image));
          if (res.code == 20000) {
            if (str == "gundong") {
              this.chatHistoryList = this.chatHistoryList.concat(res.data.data);
            } else {
              this.chatHistoryList = res.data.data;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    getDrawDetail(item) {
      this.chatList = []
      this.chatList.push({});
      this.chatList.push(item);
    },

    deleteDrawHistory(item, i) {
      let val = {task_id:item.task_id}
      this.$confirm("是否删除所选信息?", "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delete_Audio_Video(val)
              .then((res) => {
                if (res.code == 20000) {
                  this.chatHistoryList.splice(i, 1);
                  this.$message.success("删除成功！");
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch((err) => {
                this.$message.error("删除失败！");
              });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.transitionTop{
  transition: all .6s;
  height: auto;
}
.Display_Audio{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.audioImg{
  width: 100px;
  height: auto;
  margin: auto;
}
.lyrics{
  padding: 10px;
  box-sizing: border-box;
  width: 250px;
  height: 250px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border-radius: 8px;
  overflow: auto;
  margin: 10px auto;
}
.audio-footer{
  display: flex;
  align-items: center;

}
.audio-tool{
  display: flex;
  align-items: center;
  gap: 10px;
}
.audio-item {
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}
.audio-item img{
  width: 30px;
  height: 30px;
}
.tryAudio{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
/deep/ .el-textarea__inner {
  height: 100%;
}
.img_collector {
  display: flex;
  flex-direction: column;
}
.img_collector-title {
  margin: 20px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/ .el-slider__input {
  width: 80px;
}
/deep/ .el-slider__runway.show-input {
  margin-right: 100px !important;
}
.uploadImage {
  width: 450px;
  height: 450px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
    0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 50%;
  transform: translate(-50%);
  /* padding-top: 70px; */
  box-sizing: border-box;
  /* display: flex;justify-content: center;flex-direction: column; */
}
.uploadImage .uploadBack {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 99999;
  cursor: pointer;
}
.uploadImage .uploadBack .el-icon-close {
  font-size: 24px;
  cursor: pointer;
}
.uploadImage .uploadBack div {
  margin-left: 0px;
  color: #666;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
.uploadImage .upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.uploadImage .uploadImg-text {
  color: #898989;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  /* margin-top: 5px; */
  margin-bottom: 15px;
}
.uploadImage .upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.uploadImage .uploadImg-title {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
}
.uploadImage .upload-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.resetNewChat {
  color: #fff;
  background-color: #1f64ff;
  border-radius: 4px;
  padding: 5px 15px;
  cursor: pointer;
  line-height: 23px;
  margin-right: 10px;
}
.checkModel {
  position: absolute;
  /* left: 50%; */
  left: 50%;
  top: 25px;
  transform: translate(-50%);
}
@media (height < 800px) {
  .img_msk {
    width: 400px;
    height: 400px;
  }

  .user_input_area {
    bottom: 20px;
  }
}

.chat_cont {
  margin: 0px 6px;
  display: flex;
  align-items: center;
}

/* 图片工具栏/点赞，下载 */
.img_tool > div {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fff;
  margin-left: 16px;
  margin-right: 0px;
  cursor: pointer;
}

.workspace_tips {
  width: 450px;
  margin: 0px auto;
  display: flex;
  color: #666;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 5px;
  position: relative;
  top: -40px;
}

.workspace_tips div:first-child {
  margin-right: 7px;
}

.workspaceNew_bottom {
  width: 450px;
  position: relative;
  top: -30px;
  /* margin: auto; */
}

.workspaceNew_bottom > div:first-child {
  display: flex;
  justify-content: space-between;
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 5px;
}

.workspaceNew_bottom > div:first-child > div {
  display: flex;
}

.workspaceNew_bottom > div:first-child > div:first-child > div {
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.workspaceNew_bottom > div:last-child > div:first-child {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.workspaceNew_bottom > div:last-child > div:first-child > div {
  display: flex;
  align-items: center;
}

.workspaceNew_bottom > div:last-child > div:first-child > div:first-child {
  color: #333;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.workspaceNew_bottom > div:last-child > div:first-child > div:last-child {
  color: #666;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.workspaceNew_bottom > div:last-child > div:last-child {
  color: #666;
  font-family: PingFang SC;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.share {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #1f64ff;
}

.share div {
  text-align: center;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
}

.senior-box {
  display: flex;
  justify-content: space-between;
}

.senior-box .el-input-number {
  width: 100% !important;
}

.senior-box > div:nth-child(1) {
  width: calc(100% - 60px - 30px);
}

.senior-box > div:nth-child(2),
.senior-box > div:nth-child(3) {
  width: 35px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.tab {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 0px 15px;
  padding-bottom: 30px;
  box-sizing: border-box;
}

.teb-content {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  transition: all 1s;
  position: relative;
  left: 0%;
  /* padding-right: 20px; */
}

.boxTransition {
  opacity: 1 !important;
  transition: all 1s;
}

.tabTransition {
  left: -100%;
  transition: all 1s;
}

.tab-box {
  width: 100%;
  box-sizing: border-box;
  opacity: 0;
}

.noHistory {
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #ccc;
  margin: auto;
}

.remind {
  color: #666;

  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-bottom: 10px;
}

.model-price {
  font-size: 12px;
  margin-top: 10px;
}

.draw-chat {
  background-color: #f1f2f5;
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  border-left: 1px solid #f1f2f5;
  box-sizing: border-box;
}

.ai_list_btn {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 4px;
  border-radius: 4px;
}

.draw-chat .main {
  width: calc(100% - 20%);
  height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.draw-chat .main .top_title {
  text-align: center;
}

.workspace_main {
  display: flex;
  justify-content: center;
  position: relative;
  top: -40px;
  /* height: calc(100% - 410px); */
}

.workspace_main .img_msk {
  width: 450px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  /* top: -40px; */
  overflow: hidden;
  display: flex;
}

.workspace_main .img_msk .btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f64ff;
  color: #ffffff;
  z-index: 5;
  border: none;
}

.example_title {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  border-bottom-left-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  z-index: 5;
}

.workspace_mask {
  position: relative;
  /* top: -40px; */
  display: flex;
  align-items: center;
  /* flex-wrap: nowrap; */
}
.upload-image {
  width: 450px;
  height: 450px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-image .uploadImg {
  width: 150px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white !important;
  border-radius: 4px;
  background: #1f64ff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.upload-image .uploadImg div {
  margin-left: 5px;
}
.upload-image /deep/ .el-upload {
  height: 20px;
  background: rgba(0, 0, 0, 0);
  border: 0px;
}
.filter_img {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: 1;
  object-fit: cover;
}

.workspace_main .img_msk .img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  z-index: 2;
}

.functional_area {
  display: flex;
  align-items: center;
  justify-content: right;
  /* background-color: #FFFFFF; */
  /* padding: 34px 23px; */
  /* border-radius: 8px; */
  margin-top: 20px;
}

.functional_area .help-setpon-img {
  /* margin-bottom: 10px; */
  cursor: pointer;
  margin-right: 10px;
}

.example_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 140px;
}

.example_mask {
  width: 490px;
  display: flex;
  flex-wrap: wrap;
}

.example_mask .item {
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid transparent;
}

.example_mask .item-on {
  border-color: #1f64ff;
}

.example_mask .item .img {
  width: 100%;
  border-radius: 8px;
}

.user_input_area {
  position: absolute;
  bottom: 40px;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
}

.title_area {
  width: calc(90% - 25px);
  height: 44px;
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 12px;
  font-weight: 400;
  padding: 0px 20px;
  background-color: #e8eefc;
  position: absolute;
  left: 50%;
  top: -45px;
  z-index: -1;
  transform: translate(-50%);
  border-radius: 8px 8px 0 0;
}

.input_area {
  width: calc(90%);
  display: flex;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: auto;
}

.draw-chat .work_area {
  width: calc(25% + 40px);
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  /* padding: 0 20px; */
}

.draw-chat .work_area:nth-child(2) {
  width: 260px;
  height: 100%;
  overflow-y: auto;
  /* background-color: red;s */
  padding: 0 20px;
}

.select_workspaceNew {
  display: flex;
  padding: 4px;
  border-radius: 8px;
  background: #f4f4f7;
  width: 160px;
  height: 35px;
  color: #4e5969;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
}

.select_workspaceNew > div {
  width: 80px;
  cursor: pointer;
  line-height: 35px;
  border-radius: 6px;
  text-align: center;
}

.select_workspace {
  border-bottom: 1px solid #efeff2;
  display: flex;
  color: #666;
  padding: 20px 0;
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: 400;
  position: sticky;
  top: 0;
  margin-bottom: 10px;
  background-color: #ffffff;
}

.select_workspace .item {
  margin-right: 20px;
  cursor: pointer;
  border-bottom: 1px solid white;
}

.select_workspace .item-on {
  color: #1f64ff;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 1px solid #1f64ff;
}

.workSpace_area-title {
  color: #000;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 20px 0 10px 0;
}

.workSpace_area {
  width: 100%;
}

.workSpace_area .typesof .msak {
  display: flex;
}

.workSpace_area .typesof .msak .item {
  padding: 8px 16px;
  border: 1px solid #f4f4f7;
  background-color: #f4f4f7;
  cursor: pointer;
  margin: 10px 10px 10px 0;
}

.workSpace_area .typesof .msak .item-on {
  color: #1f64ff;
  border-color: #1f64ff;
  background-color: transparent;
}

.size_mask {
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  padding-bottom: 10px;
}

.size_mask .item {
  width: 80px;
  height: 80px;
  margin-bottom: 6px;
  margin-right: 6px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: #f4f4f7;
  border: 1px solid #f4f4f7;
  cursor: pointer;
}

.size_mask .item-on {
  background-color: transparent;
  border-color: #1f64ff;
}

.box_mask {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.size_mask .item .box {
  border: 1px solid #7a7a7a;
  width: 40px;
  height: 40px;
}

.size_mask .item .size {
  text-align: center;
  color: #222;
  font-size: 12px;
  font-weight: 400;
}

.style_mask {
  /* display: flex; */
  width: 100%;
  height: 270px;
  overflow-y: auto;
  padding-bottom: 10px;
}

.style_mask::-webkit-scrollbar-thumb {
  background-color: #dedede;
}

.style_mask .item {
  border: 2px solid transparent;
  position: relative;
  display: flex;
  width: calc(100% / 3 - 5px);
  justify-content: center;
  /* margin-right: 10px; */
  /* width: 100%; */
  border-radius: 8px;
}

.style_mask .item .img {
  border-radius: 8px;
  width: 100%;
}

.style_mask .item-on {
  border-color: #1f64ff;
}

.style_mask .item .title {
  position: absolute;
  bottom: 0px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-list {
  height: calc(100% - 104px);
  overflow-y: auto;
}

.history-list .mask {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.history-list .item {
  width: calc(100% / 2 - 5px);
  height: calc(100% / 2 - 5px);
  margin-bottom: 5px;
  position: relative;
}

.history-list .item .del {
  display: none;
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px;
  border-radius: 4px;
}

.history-list .item:hover .del {
  display: inline-block;
}

.history-list .item .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-list .item .img-on {
  border: 1px solid #1f64ff;
}

.bottom_mask {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: calc(100% - 640px);
  background-color: #f1f2f5;
  z-index: 100;
}

.title_prompt {
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.draw-result-tips {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 3;
  font-size: 12px;
  padding: 8px 0;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
}

.tips_img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

@media (height < 800px) {
  .img_msk {
    width: 400px !important;
    height: 400px !important;
  }

  .user_input_area {
    bottom: 20px;
  }
}
</style>

<style scoped>
.ai_list_btn .chat-ai-btn-list {
  color: #333;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  margin-left: 0;
  border: none;
}

.user_btn input {
  border: none;
}

.draw_image-class_dark .el-dialog {
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* max-height: 800px;
  min-height: 500px; */
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
  display: none;
}

.draw_image-class_dark .el-dialog__header {
  display: none;
}

.draw_image-class_dark .el-dialog__body {
  padding: 0;
}

.upload-file-code .el-upload {
  width: 80px;
  height: 80px;
  background-color: #f2f3f5;
}

.upload-file-code .el-upload-list .el-upload-list__item {
  width: 80px;
  height: 80px;
  margin-bottom: 0;
}

.upload-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.upload-btn .btn-mask {
  line-height: 24px;
  margin: auto;
  font-size: 14px;
}

.input_textarea textarea {
  height: 80px;
}
</style>
