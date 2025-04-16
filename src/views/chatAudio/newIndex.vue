<template>
  <div class="main">
    <!-- 左侧工具栏/配置栏 -->
    <div class="toolBar">
      <div class="toolBar-box">
        <div class="box-top">
          <div class="title">
            <div>纯乐器</div>
            <el-tooltip
              effect="dark"
              content="开启后将生成纯乐器演奏的音乐"
              placement="right-end"
            >
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/Group_427322083@2x.png'
                "
                alt=""
              />
            </el-tooltip>
          </div>
          <el-switch v-model="make_instrumental"> </el-switch>
        </div>
      </div>
      <div class="toolBar-box">
        <div class="box-top">
          <div class="title">
            <div>歌名</div>
            <el-tooltip
              effect="dark"
              content="复用种子，获取相近的结果"
              placement="right-end"
            >
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/Group_427322083@2x.png'
                "
                alt=""
              />
            </el-tooltip>
          </div>
          <div></div>
        </div>
        <el-input v-model="music_title" placeholder="请输入歌名" />
      </div>
      <div class="toolBar-box">
        <div class="box-top">
          <div class="title">
            <div>音乐风格</div>
          </div>
          <div></div>
        </div>
        <div class="style">
          <div
            class="item"
            @click="music_style = item.text"
            :style="
              music_style == item.text
                ? 'border: 2px solid #003FFF;'
                : 'border: 2px solid #fff;'
            "
            v-for="item in styleList"
            :key="item.text"
          >
            <img :src="item.img" alt="" />
            <img
              v-if="music_style == item.text"
              class="onImg"
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320710@2x.png"
              alt=""
            />
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </div>

      <div class="toolBar-box">
        <div class="box-top">
          <div class="title">
            <div>歌词（90算力/次）</div>
            <el-tooltip
              effect="dark"
              content="让你的视频画面过渡更平滑"
              placement="right-end"
            >
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/Group_427322083@2x.png'
                "
                alt=""
              />
            </el-tooltip>
          </div>
          <div class="convert" @click="createLyric">
            <img
              :src="
                httpUrls.ossUrl +
                'xcx/com/message_center/Group_427321483@2x (6).png'
              "
              alt=""
            />
            <div>根据歌名生成歌词</div>
          </div>
        </div>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="填写具体歌词（2 节 8 行），或输入歌词大意使用AI根据歌名创作歌词"
          v-model="lyric"
          v-loading="lyricLoading"
        >
        </el-input>
      </div>
      <div class="submit-btn" @click="isBtn ? sendMsg(3) : sendMsg2(3)">
        <div>
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322491@2x.png"
            alt=""
          />
          <div>立即生成</div>
        </div>
        <div class="token">6000算力/次</div>
      </div>
    </div>
    <!-- 主体内容部分 -->
    <div class="container">
      <div class="video-box">
        <!-- 工具栏 -->
        <div class="instrument">
          <div class="item" @click="resetNewChat">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (3).png"
              alt=""
            />
            <div class="text">新创作</div>
          </div>
          <div class="item">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x(1).png"
              alt=""
            />
            <div class="text">做同款</div>
          </div>
          <div class="item">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (1)(1).png"
              alt=""
            />
            <div class="text">换一换</div>
          </div>
          <template v-if="chatList.length > 1 && exampleIndex == null">
            <div class="item" @click="downLoadVideo">
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (2)(1).png"
                alt=""
              />
              <div class="text">下载视频</div>
            </div>
            <div class="item" @click="downLoadAudio">
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (4).png"
                alt=""
              />
              <div class="text">下载音频</div>
            </div>
          </template>
          <div class="line"></div>
          <template v-if="chatList.length > 1 && exampleIndex == null">
            <div class="item">
              <!-- 点赞未选中 -->
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (3)(1).png"
                alt=""
                @click="handlerRecommend(1)"
                v-if="chatList[1]['is_good'] != 1"
              />
              <!-- 点赞选中 -->
              <img
                @click="handlerRecommend(0)"
                v-else
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (5).png"
                alt=""
              />
            </div>
            <div class="item">
              <!-- 取消点赞未选中 -->
              <img
                @click="handlerRecommend(2)"
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (4)(1).png"
                alt=""
                v-if="chatList[1]['is_good'] != 2"
              />
              <!-- 取消点赞选中 -->
              <img
                v-else
                @click="handlerRecommend(0)"
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (6).png"
                alt=""
              />
            </div>
          </template>
          <div class="item" @click="$router.push('/opinion/opinion')">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427320453@2x (5)(1).png"
              alt=""
            />
          </div>
        </div>
        <!-- 默认状态 -->
        <div class="default-box" v-if="chatList.length == 0 && exampleIndex == null">
          <img
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/q_1@2x.png"
            alt=""
          />
          <div>AI助力音乐创作，人人皆可成艺术家~</div>
          <div class="tips">快去生成你的音乐创意吧~</div>
        </div>
        <!-- 生成中 -->
        <div class="waiting" v-else-if="isTimestableDiffusion">
          <div class="progress-text">{{ percentageNumber }}%</div>
          <div class="progress">
            <el-progress
              :stroke-width="10"
              :show-text="false"
              :percentage="percentageNumber"
            ></el-progress>
          </div>
          <div class="text">生成中，预计需要 2～5分钟，请稍后～</div>
        </div>
        <!-- 余额不足/没算力 -->
        <div class="balance" v-else-if="!isuser">
          <div class="text">十分抱歉，您的次数已用完，请购买流量包等产品</div>
          <el-button class="shopping-btn" @click="$refs.Pay.PayVisible = true"
            >购买套餐</el-button
          >
        </div>
        <!-- 成功 -->
        <div class="success-box" v-else-if="isBtn && chatList.length > 1">
          <div class="version1">
            <div class="audio-box">
              <div class="left">
                <img :src="chatList[1]['image_large_url']" alt="" />
                <div class="title">{{ chatList[1]["title"] }}</div>
                <div class="style">{{ chatList[1]["tags"] }}</div>
                <div class="changeVersion">
                  <div class="item on">版本1</div>
                  <div class="item">版本2</div>
                </div>
              </div>
              <!-- 歌词 -->
              <div class="right">
                <div v-html="chatList[1]['lyrics']"></div>
              </div>
            </div>
            <audio
              ref="audioDom"
              @play="playFunc"
              @pause="pauseFunc"
              @timeupdate="timeupdateFunc"
              @loadedmetadata="onLoadedmetadata"
              @ended="handleEnd"
              :src="chatList[1]['audio_url']"
            ></audio>
            <div class="audio">
              <!-- 音频按钮 -->
              <div class="btn">
                <!-- 后退 -->
                <img
                  @click="advance(2)"
                  class="small"
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322608@2x.png"
                />
                <!-- 开始播放 -->
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322605@2x.png"
                  alt=""
                  @click="startPlayOrPause"
                  v-if="!playing"
                />
                <!-- 暂停播放 -->
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322605@2x (1).png"
                  alt=""
                  @click="startPlayOrPause"
                  v-else
                />
                <!-- 快进 -->
                <img
                  @click="advance(1)"
                  class="small"
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322607@2x.png"
                />
              </div>
              <!-- 播放进度 -->
              <div class="schedule">
                <el-slider
                  :max="audioMax"
                  v-model="audioTime"
                  :format-tooltip="formatTooltip"
                  @change="onChange"
                ></el-slider>
              </div>
              <div class="right">
                <div class="time">
                  {{ formatTooltip(audioTime) }}
                  /
                  {{ formatTooltip(audioMax) }}
                </div>
                <el-popover
                  placement="top-start"
                  trigger="click"
                  popper-class="volume"
                >
                  <el-slider
                    v-model="volume"
                    vertical
                    @change="handlerChangeVolume"
                    height="150px"
                  >
                  </el-slider>
                  <img
                    slot="reference"
                    src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/音量 (1)8815xg3.png"
                    class="volumeImg"
                    alt=""
                  />
                </el-popover>
              </div>
            </div>
            <!-- <audio controls :src="chatList[1]['audio_url']"></audio> -->
          </div>
        </div>
        <!-- <video
          autoplay
          controls
          src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/music_video/video/7a3ad12b-4c28-49f5-8593-62d0a42b0135.mp4"
        ></video> -->
      </div>
    </div>
    <!-- 右侧栏目部分 -->
    <div class="right-nav">
      <div class="tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="案例" name="first"></el-tab-pane>
          <el-tab-pane label="历史记录" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="history-list" id="history-list" v-if="activeName == 'first'">
        <div class="mask" id="history-mask">
          <div
            v-for="(item, i) in qsList"
            :key="i"
            :class="exampleIndex == i ? 'item item-on' : 'item'"
            @click="selectExampleItem(item,i)"
          >
            <img
              class="img"
              style="cursor: pointer"
              :src="httpUrls.ossUrl + item.pic_url"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 历史记录 -->
      <div class="history-list" id="history-list" v-else>
        <div class="mask" id="history-mask">
          <div class="item" v-for="(item, i) in chatHistoryList" :key="i">
            <img
              class="img"
              :src="item.image_url"
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
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import {
  get_Audio_Video_recommend,
  get_Audio_Video_list,
  delete_Audio_Video,
  create_Audio_Video,
  get_Audio_Video_status,
  get_RoleList,
  change_Audio_Video_good,
} from "../../api/chatMG";
export default {
  data() {
    return {
      httpUrls,
      blueprintReadingFile: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "AI_chat-picture",
      },
      uploadPictureUrl: "", //上传的图片
      headerData: {}, //上传请求头
      music_style: "现代流行", //风格
      styleList: [
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x.png",
          text: "现代流行",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(1).png",
          text: "民谣",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(2).png",
          text: "电子",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(3).png",
          text: "古典",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(4).png",
          text: "乡村",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(5).png",
          text: "摇滚",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(6).png",
          text: "爵士",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(7).png",
          text: "说唱",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(10).png",
          text: "Soul",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(9).png",
          text: "DJ",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(11).png",
          text: "Hip-hop",
        },
        {
          img: "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/image@2x(8).png",
          text: "R&B",
        },
      ],
      sendValue: "", //提示词
      openBool: false, //展开收起字段
      make_instrumental: false, //是否纯音乐
      music_title: "", //音乐名称
      lyric: "", //歌词
      lyricLoading: false, //歌词生成加载状态
      activeName: "first",
      chatHistoryList: [],
      qsList: [],
      exampleItem: {},

      timer: 0, //生成时间
      t_time: null, //定时器函数
      isTimestableDiffusion: false, //是否显示生成中
      isuser: true, //使用次数是否用完  true还有余额 false没有
      isBtn: true, // 防止重新发送  true能 false不能
      percentageNumber: 0, //进度
      chatList: [],
      page_size: 30,
      page: 1,
      audioTime: 0, //音频时长
      audioMax: 0, //音频总时长
      volume: 50, //音频音量
      playing: false, //音频播放状态
      exampleImg:"",
      exampleIndex:null
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token;
    this.headerData.role = userInfo.role;
    this.getRecommend();
    this.getChatList();
  },
  methods: {
    //点击示例
    selectExampleItem(item,index){
      let obj = JSON.parse(JSON.stringify({...item}))
      this.playing = false;
      this.isBtn = true;
      this.chatList = [];
      this.chatList.push({});
      this.chatList.push(obj);
      this.chatList[1].audio_url = this.httpUrls.ossUrl + obj.audio_url;
      this.chatList[1].image_large_url = this.httpUrls.ossUrl + obj.pic_url;
      this.sendValue = obj.prompt;
      this.exampleIndex = index;
    },
    formatTooltip(val) {
      const minutes = Math.floor(val / 60);
      let str1 = "";
      if (minutes < 10) {
        str1 = "0" + minutes;
      } else {
        str1 = minutes;
      }
      // 计算剩余的秒数
      const remainingSeconds = Math.floor(val % 60);
      let str2 = "";
      if (remainingSeconds < 10) {
        str2 = "0" + remainingSeconds;
      } else {
        str2 = remainingSeconds;
      }
      // 返回分钟加秒的格式
      return `${str1} : ${str2} `;
    },
    beforeUpload(file) {
      const isType = file.type.includes("image");
      if (!isType) {
        this.$message.error("上传的文件类型仅支持图片格式");
        return false;
      }
      return isType;
    },
    handleChangeFile(file, fileList) {
      this.blueprintReadingFile.image = file.raw;
      this.blueprintReadingFile.image_name = file.name;
    },
    handleSuccessFile(response, file, fileList) {
      this.uploadPictureUrl = response.data.new_url;
    },
    // 获取示例
    getRecommend(){
      get_Audio_Video_recommend(10).then(res => {
        console.log(res)
        if(res.code == 20000){
          this.qsList = res.data.data;
          let mathNumber = Math.floor(Math.random() * res.data.data.length);
          this.exampleItem = res.data.data[mathNumber];
        }
      })
    }, 
    //发送信息
    async sendMsg(type = 3) {
      this.isClickChat = false;
      this.actionType = type;
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!this.music_title) {
        this.$message.error("请输入歌名");
        return;
      }
      this.percentageNumber = 0;
      this.oldSendValue = this.sendValue;
      this.chatList = [];
      this.exampleImg = '';
      this.exampleIndex = null;
      this.createAudio();
    },
    sendMsg2() {
      this.$message({
        type: "info",
        message: "当前问题还没回答完毕，请稍后再提问！",
      });
    },
    //创建歌词
    createLyric() {
      this.lyricLoading = true;
      let requestData = {
        action_type: 1,
        prompt: this.music_title,
      };
      this.$message.success("歌词生成中，请耐心等待");
      create_Audio_Video(requestData)
        .then((res) => {
          if (res.code == 20000) {
            this.queryLyric(res.data.trace_code);
          } else {
            this.lyricLoading = false;
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.lyricLoading = false;
          this.$message.error("网络波动，请稍后重试~");
        });
    },
    queryLyric(trace_code) {
      get_Audio_Video_status(trace_code)
        .then((res) => {
          if (res.data.code == 30014 || res.data.code == 40022) {
            this.lyricLoading = false;
          } else if (res.code == 20000) {
            if (res.data[0]["status"] != 3) {
              setTimeout(() => {
                let code = trace_code;
                this.queryVideo(code);
              }, 5000);
            } else {
              this.lyricLoading = false;
              this.lyric = res.data[0]["lyrics"];
            }
          }
        })
        .catch((err) => {
          this.lyricLoading = false;
          this.$message.error("网络波动，请稍后重试~");
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
      this.isTimestableDiffusion = true;
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
      let requestData = {
        action_type: 0,
        make_instrumental: this.make_instrumental,
        prompt: `请你根据我为你提供歌词和提示词帮我生成一首音乐，这是提示词：${this.sendValue}。这是歌词：${this.lyric}。`,
        tags: this.music_style,
        title: this.music_title,
        lyrics: this.lyric,
        custom_mode: 1,
      };
      this.oldSendValue = this.sendValue;
      create_Audio_Video(requestData)
        .then((res) => {
          if (res.code == 20000) {
            this.queryVideo(res.data.trace_code);
          } else {
            this.$message.error(res.msg);
            this.isDetail = true;
            this.isShow = false; // 快速提问
            this.isfinish = true; // 完成打字效果
            this.isBtn = true; // 是否允许重发
            this.isTimestableDiffusion = false;
          }
        })
        .catch((err) => {
          this.$message.error("网络波动，请稍后重试~");
          this.isDetail = true;
          this.isShow = false; // 快速提问
          this.isfinish = true; // 完成打字效果
          this.isBtn = true; // 是否允许重发
          this.isTimestableDiffusion = false;
        });
    },
    //查询生成结果
    queryVideo(trace_code) {
      get_Audio_Video_status(trace_code)
        .then((res) => {
          if (res.data.code == 30014 || res.data.code == 40022) {
            this.queryErrorMsg = res.data.msg;
            this.isBtn = true;
            this.isTime = false;
            this.isTimestableDiffusion = false;
            clearInterval(this.t_time);
            this.isTimestableDiffusion = false;
            this.isuser = false;
          } else if (res.code == 20000) {
            if (res.data[0]["status"] == 0 || res.data[0]["status"] == 1) {
              //继续查找
              setTimeout(() => {
                if (res.data[1]["audio_url"]) {
                  this.tryAudioBool = true;
                  this.tryAudio = res.data[1]["audio_url"];
                }
                let code = trace_code;
                this.queryVideo(code);
              }, 5000);
            } else if (res.data[0]["status"] == 2) {
              //失败
              clearInterval(this.t_time);
              setTimeout(() => {
                this.$message.error("网络异常，图片生成失败");
                this.tryAudioBool = false;
                this.isTimestableDiffusion = false;
                this.isuser = true;
                this.isBtn = true;
                this.isTimestableDiffusion = false;
              }, 500);
            } else if (res.data[0]["status"] == 3) {
              //成功
              if (res.data[1]["audio_url"] && res.data[1]["video_url"]) {
                this.chatList = res.data;
                this.percentageNumber = 99;
                clearInterval(this.t_time);
                setTimeout(() => {
                  this.$message.success('视频生成成功');
                  this.tryAudioBool = false;
                  this.isTimestableDiffusion = false;
                  this.isuser = true;
                  this.randomStr = Math.random();
                  this.isBtn = true;
                  this.isTimestableDiffusion = false;
                }, 500);
              }
            }
            if (res.data[0]["status"] != 3) {
              
            } else {
              
            }
          }
        })
        .catch((err) => {
          this.$message.error("网络波动，请稍后重试~");
          this.isBtn = true;
          this.isTime = false;
          this.isTimestableDiffusion = false;
          clearInterval(this.t_time);
          this.isTimestableDiffusion = false;
          this.isuser = true;
        });
    },
    // 获取对话列表
    getChatList(str = "") {
      if (str == "gundong") {
        this.page++;
      }
      if (str == "aiId") {
        this.chatHistoryList = [];
      }
      let model = "Runway";
      let val = `action_type=${0}&page_size=${this.page_size}&page=${
        this.page
      }`;
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
    deleteDrawHistory(item, i) {
      let val = { task_id: item.task_id };
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
    getDrawDetail(item) {
      
      this.exampleIndex = null;
      this.playing = false;
      this.chatList = [];
      this.chatList.push({});
      this.chatList.push(item);
    },
    // 开启新会话
    resetNewChat() {
      if (!this.isBtn) {
        this.$message("当前问题还没回答完毕，请稍后再试");
        return;
      }
      if (this.chatList.length == 0) return;

      this.chatList = [];
      this.timer = 0; //生成时间
      clearInterval(this.t_time);
      this.t_time = null; //定时器函数
      this.isTimestableDiffusion = false; //是否显示生成中
      this.isuser = true; //使用次数是否用完  true还有余额 false没有
      this.isBtn = true; // 防止重新发送  true能 false不能
      this.percentageNumber = 0; //进度
      this.exampleIndex = null;
    },
    //下载视频
    downLoadVideo() {
      if (this.chatList.length < 1) {
        this.$message.error("未检测到有效视频地址");
        return;
      }
      let url = this.chatList[1]["video_url"];
      var a = document.createElement("a"); // 生成一个a元素
      var event = new MouseEvent("click"); // 创建一个单击事件
      a.download = "chatVideo.mp4"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    },
    //下载音频
    downLoadAudio() {
      if (this.chatList.length < 1) {
        this.$message.error("未检测到有效音频地址");
        return;
      }
      let url = this.chatList[1]["audio_url"];
      var a = document.createElement("a"); // 生成一个a元素
      var event = new MouseEvent("click"); // 创建一个单击事件
      a.download = "chatVideo.mp3"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    },
    handlerRecommend(type) {
      let requestData = {
        trace_code: this.chatList[1]["trace_code"],
        is_good: type,
      };
      change_Audio_Video_good(requestData).then((res) => {
        if (res.code == 20000) {
          this.$set(this.chatList[1], "is_good", type);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /* 播放音频 */
    play() {
      this.$refs.audioDom.play();
    },
    /* 暂停音频 */
    pause() {
      this.$refs.audioDom.pause();
    },
    /** 当音乐播放 */
    playFunc() {
      this.playing = true;
    },
    /** 当音乐暂停 */
    pauseFunc() {
      this.playing = false;
    },
    /** 当音乐结束 */
    handleEnd() {
      this.playing = false;
      this.audioTime = 0;
    },
    /* 每秒触发一次 用来更新当前播放时间 */
    timeupdateFunc(res) {
      this.audioTime = res.target.currentTime;
    },
    /* 音频加载完成后的回调函数 */
    onLoadedmetadata(res) {
      this.audioMax = parseInt(res.target.duration);
    },
    /* 控制音频播放、暂停 */
    startPlayOrPause() {
      this.playing ? this.pause() : this.play();
    },
    /* 拖动进度条，改变当前时间 value是进度条改变时的回调函数的参数 值为0~100之间，需要换算成实际时间 */
    onChange(value) {
      console.log(value, "values");
      this.pause();
      this.$refs.audioDom.currentTime = parseInt(value);
      this.play()
      
      // console.log(this.$refs.audioDom.currentTime , 'this.$refs.audioDom.currentTime ');
    },
    //控制音频音量
    handlerChangeVolume(value) {
      this.$refs.audioDom.volume = value / 100;
    },
    advance(index) {
      if (index == 1) {
        // 前进五秒
        let newTime = this.$refs.audioDom.currentTime + 5;
        this.$refs.audioDom.currentTime =
          newTime > this.audioMax ? this.audioMax : newTime;
      }
      if (index == 2) {
        let newTime = this.$refs.audioDom.currentTime - 5;
        this.$refs.audioDom.currentTime = newTime < 0 ? 0 : newTime;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #f5f5f7;
  display: flex;
  .toolBar {
    width: 440px;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    .transitionBox {
      height: auto;
      transition: all 0.6s;
      overflow: hidden;
    }
    .title {
      font-weight: bold;
      font-size: 14px;
      color: #000000;
      display: flex;
      align-items: center;
      gap: 6px;
      img {
        width: 13.5px;
        height: 13.5px;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #f2f2f2;
      margin: 20px 0px;
    }
    .submit-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #003fff;
      border-radius: 10px 10px 10px 10px;
      padding: 12px 0px;
      box-sizing: border-box;
      width: 100%;
      cursor: pointer;
      gap: 10px;
      div {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #ffffff;
        font-weight: 600;
        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
      .token {
        font-weight: bold;
        font-size: 16px;
        color: #fff373;
      }
    }
    .toolBar-box {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
      .box-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .convert {
          padding: 6px 13px;
          box-sizing: border-box;
          border-radius: 10px 10px 10px 10px;
          background: #ffffff;
          border: 1px solid #ebebeb;
          font-weight: bold;
          font-size: 14px;
          color: #003fff;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
          }
        }
        .openBtn {
          padding: 6px 13px;
          box-sizing: border-box;
          border-radius: 10px 10px 10px 10px;
          background: #ffffff;
          border: 1px solid #ebebeb;
          font-weight: bold;
          font-size: 14px;
          color: #666666;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
            transition: all 0.6s;
          }
        }
      }
      .style {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        .item {
          width: calc(25% - 10px);
          height: 77px;
          position: relative;
          cursor: pointer;
          border-radius: 10px 10px 10px 10px;
          .onImg {
            right: 0px;
            top: 0px;
            width: 16px;
            height: 16px;
            border-radius: 0px;
          }
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px 10px 10px 10px;
          }
          .text {
            width: 100%;
            border-radius: 8px 8px 8px 8px;
            position: absolute;
            bottom: 0px;
            padding: 3px 0px;
            text-align: center;
            background: rgba(0, 0, 0, 0.4);
            font-weight: bold;
            font-size: 12px;
            color: #ffffff;
            z-index: 10;
          }
        }
      }
      /deep/ .el-textarea__inner {
        background: #f5f5f5;
        border: 0px solid #ccc !important;
      }
      /deep/ .el-input__inner {
        background: #f5f5f5;
        border: 0px solid #ccc !important;
      }
    }
  }
  .container {
    width: calc(100% - 440px - 290px);
    padding: 30px 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    position: relative;
    .video-box {
      width: calc(100% - 190px);
      height: 100%;
      margin-left: 85px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .default-box {
        width: calc(100% - 25px);
        height: calc(100% - 25px);
        border: 2px dashed #dadde6;
        border-radius: 16px;
        background: #fafbff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
        img {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }
        .tips {
          margin-top: 10px;
          font-weight: bold;
          font-size: 14px;
          color: #8a8e99;
        }
      }
      .waiting {
        width: calc(100% - 25px);
        height: calc(100% - 25px);
        border: 2px dashed #dadde6;
        border-radius: 16px;
        background: #fafbff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-direction: column;
        text-align: center;
        .progress-text {
          font-weight: bold;
          font-size: 16px;
          color: #003fff;
        }
        .progress {
          width: 70%;
          padding: 6px;
          box-sizing: border-box;
          border: #6951ff 1px solid;
          border-radius: 20px 20px 20px 20px;
          /deep/ .el-progress-bar__inner {
            background: linear-gradient(
              270deg,
              #d86bff 0%,
              #2467ff 51%,
              #03c3ff 100%
            );
          }
        }
        .text {
          font-weight: 400;
          font-size: 14px;
          color: #000000;
        }
      }
      video {
        width: 100%;
        height: 100%;
        cursor: zoom-in;
      }
      .balance {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text {
          font-size: 14px;
          margin-bottom: 20px;
        }
        .shopping-btn {
          width: 179px;
          height: 40px;
          text-align: center;
          background: #ff9b17;
          color: #ffffff;
        }
      }
      .success-box {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        .version1 {
          width: 100%;
          height: 100%;
          position: relative;
          .audio-box {
            display: flex;
            gap: 70px;
            height: calc(100% - 74px - 20px);
            margin-bottom: 20px;
            .left {
              img {
                width: 180px;
                height: auto;
                margin-bottom: 20px;
                border-radius: 10px 10px 10px 10px;
              }
              .title {
                font-weight: 600;
                font-size: 20px;
                color: #000000;
                margin-bottom: 8px;
              }
              .style {
                font-weight: 400;
                font-size: 14px;
                color: #000000;
                margin-bottom: 12px;
              }
              .changeVersion {
                width: calc(88px * 2);
                display: flex;
                background: #f7f7f7;
                border-radius: 5px;
                .item {
                  border-radius: 5px;
                  width: 88px;
                  height: 24px;
                  line-height: 24px;
                  text-align: center;
                  cursor: pointer;
                  font-weight: bold;
                  font-size: 12px;
                  color: #000000;
                }
                .item.on {
                  background: #003fff;
                  color: #fff;
                }
              }
            }
            .right {
              width: 217px;
              height: 100%;
              overflow: auto;
            }
          }
          .audio {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 19px 24px;
            box-sizing: border-box;
            background: linear-gradient(
              90deg,
              #f0f9ff 0%,
              #f2f8ff 53%,
              #fbf2ff 100%
            );
            border-radius: 20px 20px 20px 20px;
            margin: auto;
            .btn {
              display: flex;
              align-items: center;
              gap: 16px;
              margin-right: 30px;
              .small {
                width: 24px;
                height: 24px;
              }
              img {
                width: 32px;
                height: 32px;
                cursor: pointer;
              }
            }
            .schedule {
              width: calc(100% - 315px);
              margin-right: 25px;
              /deep/ .el-slider__bar {
                height: 4px !important;
                background: linear-gradient(
                  90deg,
                  #20afff 0%,
                  #003fff 100%
                ) !important;
              }
              /deep/ .el-slider__runway {
                height: 4px !important;
              }
              /deep/ .el-slider__button {
                width: 16px;
                height: 16px;
                box-shadow: 0px 0px 10px 0px rgba(22, 88, 255, 0.4);
                border: 0px solid #ccc;
              }
            }
            .right {
              display: flex;
              align-items: center;
              gap: 20px;
              .time {
                font-weight: 500;
                font-size: 14px;
                color: #000000;
              }
            }
          }
        }
      }
    }
    .instrument {
      position: absolute;
      top: 0px;
      right: -90px;
      padding: 20px 15px;
      box-sizing: border-box;
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.03);
      border: 1px solid #f0f0f0;
      .line {
        width: 100%;
        height: 1px;
        margin-bottom: 20px;
        background: #f2f2f2;
      }
      .item {
        font-weight: bold;
        font-size: 12px;
        color: #000000;
        text-align: center;
        margin-bottom: 20px;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          margin-bottom: 5px;
        }
      }
    }
    .footer {
      width: calc(100% - 190px);
      margin-left: 85px;
      padding: 20px 28px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 16px 16px 16px 16px;
      .title {
        position: relative;
        width: 100%;
        img {
          width: 100%;
          height: 55px;
        }
        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          font-weight: 600;
          font-size: 24px;
          color: #000000;
        }
      }
      .introduce {
        display: flex;
        gap: 20px;
        padding: 10px;
        box-sizing: border-box;
        background: #f5f8fa;
        border-radius: 10px 10px 10px 10px;
        img {
          max-width: 240px;
          max-height: 148px;
          width: 30%;
          height: auto;
        }
        .topic {
          font-weight: bold;
          font-size: 16px;
          color: #000000;
          margin-top: 20px;
          margin-bottom: 12px;
        }
        .desc {
          font-weight: 500;
          color: #45474d;
          font-size: 14px;
        }
      }
    }
  }
  .right-nav {
    width: 290px;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    .tabs {
      box-sizing: border-box;
      border-bottom: 2px solid #f2f2f2;
      margin-bottom: 10px;
      /deep/ .el-tabs__header.is-top {
        margin: 0px;
      }
      /deep/ .el-tabs__active-bar.is-top {
        background: #003fff;
      }
      /deep/ .el-tabs__item {
        height: 45px;
        line-height: 50px;
      }
      /deep/ .el-tabs__item.is-active {
        color: #003fff;
      }
      /deep/ .el-tabs__nav-scroll {
        padding: 0px 16px;
      }
      /deep/ .el-tabs__nav-wrap::after {
        background: #fff !important;
      }
    }
  }
}
.box-upload {
  width: 400px;
  height: 180px;
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
.box-upload .upload-demo /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.box-upload .upload-demo /deep/ .el-upload-dragger {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px dashed #dadde6 !important;
  background: #fafbff !important;
  .upload-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
  }
  .el-upload__text {
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    em {
      color: #003fff;
      text-decoration: underline;
    }
  }
  .el-upload__tips {
    font-weight: 400;
    font-size: 12px;
    color: #666666;
  }
}
@media (min-width: 1450px) {
  .toolBar {
    width: 390px !important;
    .box-upload {
      width: 350px !important;
    }
  }
  .right-nav {
    width: 240px !important;
  }
  .container {
    width: calc(100% - 390px - 240px) !important;
  }
}
.history-list {
  height: calc(100% - 104px);
  overflow-y: auto;
  padding: 0px 16px;
  box-sizing: border-box;
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
.noHistory {
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #ccc;
  margin: auto;
}
</style>
<style>
.volumeImg {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.volume {
  min-width: 0px !important;
  border: 0px solid #ccc !important;
}
.volume .el-slider__runway {
  width: 4px !important;
}
.volume .el-slider__bar {
  width: 4px !important;
}
.volume .el-slider__button {
  width: 16px;
  height: 16px;
  box-shadow: 0px 0px 10px 0px rgba(22, 88, 255, 0.4);
  border: 0px solid #ccc;
}
</style>
