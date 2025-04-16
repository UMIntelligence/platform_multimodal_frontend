<template>
  <!-- 
    新建口播视频
   -->
  <div class="startProduceHuman">
    <div class="top_navigation">
      <div class="go_back-page" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>

      <div class="project_title">
        <span class="tit" v-if="!showEditProjectTit">{{ projectName }}</span>
        <el-input
          class="inp"
          v-model="projectName"
          ref="projectInputTitle"
          v-if="showEditProjectTit"
          @change="hideEditProjectTit"
          @blur="hideEditProjectTit"
        ></el-input>
        <i
          class="el-icon-edit-outline"
          style="cursor: pointer; margin-left: 10px"
          @click="editProjectTit"
          v-if="!showEditProjectTit"
        ></i>
      </div>

      <div class="navigation-btn">
        <!-- 修改时 -->
        <el-button
          class="btn1"
          @click="detailSubmitProject"
          v-if="isDetailHuamn"
          >保存</el-button
        >
        <el-button
          class="btn2"
          @click="detailCompositeVideo"
          v-if="isDetailHuamn && !isEditState"
          >合成视频</el-button
        >
        <!-- 创建时 -->
        <el-button class="btn1" @click="submitProject" v-if="!isDetailHuamn"
          >保存</el-button
        >
        <el-button class="btn2" @click="compositeVideo" v-if="!isDetailHuamn"
          >合成视频</el-button
        >
      </div>
    </div>

    <div class="produce_main">
      <!-- 导航 -->
      <div class="left_menu">
        <div class="item">
          <img
            class="img-icon"
            src="../../assets/images/human_icon.png"
            alt=""
          />
          <div class="menu_type">数字人</div>
        </div>
      </div>

      <!-- 左侧选项区 -->
      <div class="left_function">
        <div class="main_title">选择数字人</div>
        <div class="select_type">
          <div
            :class="selsectHumanTypes == -1 ? 'item item-on' : 'item'"
            @click="selectHumanType(-1)"
          >
            全部
          </div>
          <div
            :class="selsectHumanTypes == 0 ? 'item item-on' : 'item'"
            @click="selectHumanType(0)"
          >
            公模数字人
          </div>
          <div
            :class="selsectHumanTypes == 1 ? 'item item-on' : 'item'"
            @click="selectHumanType(1)"
          >
            我的数字人
          </div>
        </div>
        <div class="people_human-list" v-if="selsectHumanTypes != 0">
          <div class="title">我的数字人</div>

          <div class="no_human-exclusive" v-if="exclusiveHumanList.length == 0">
            <img src="../../assets/images/image72.png" alt="" />
            <div>暂无数据</div>
          </div>

          <div class="human-list" ref="exclusiveParentInner">
            <div class="mask" ref="exclusiveSunInner">
              <div
                v-for="(item, i) in exclusiveHumanList"
                :key="i"
                class="item"
                @click="selectHuamnItem(item)"
              >
                <div
                  :class="
                    huamnItemContent.live_code == item.live_code
                      ? 'image_mask image_mask-on'
                      : 'image_mask'
                  "
                >
                  <img
                    :src="httpUrls.ossUrl + item.video_cover_url"
                    alt=""
                    class="iamge"
                  />
                </div>
                <div class="human_name">{{ item.live_name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="people_human-list" v-if="selsectHumanTypes != 1">
          <div class="title">公模数字人</div>

          <div class="no_human-exclusive" v-if="publicHumanList.length == 0">
            <img src="../../assets/images/image72.png" alt="" />
            <div>暂无数据</div>
          </div>
          <div class="human-list" ref="publicPaarsentInner">
            <div class="mask" ref="publicSunInner">
              <div
                v-for="(item, i) in publicHumanList"
                :key="i"
                class="item"
                @click="selectHuamnItem(item)"
              >
                <div
                  :class="
                    huamnItemContent.live_code == item.live_code
                      ? 'image_mask image_mask-on'
                      : 'image_mask'
                  "
                >
                  <img
                    :src="httpUrls.ossUrl + item.video_cover_url"
                    alt=""
                    class="iamge"
                  />
                </div>
                <div class="human_name">{{ item.live_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main_work">
        <div class="main-or-right_function">
          <!-- 工作效果区 -->
          <div class="main_viadeo">
            <img
              :src="httpUrls.ossUrl + huamnItemContent.video_cover_url"
              alt=""
              style="max-width: 70%; max-height: 100%"
            />
            <!-- <video width="100%" height="100%" controls>
              <source>
            </video> -->
          </div>
          <!-- 右侧选项区 -->
          <div class="right-function">
            <div class="selsect_type">
              <div
                :class="videoDriveType == 0 ? 'item item-on' : 'item'"
                @click="driveTypeVideo(0)"
              >
                文本驱动
              </div>
              <div
                :class="videoDriveType == 1 ? 'item item-on' : 'item'"
                @click="driveTypeVideo(1)"
              >
                音频驱动
              </div>
            </div>

            <!-- 文本驱动 -->
            <div class="text_drive" v-if="videoDriveType == 0">
              <div class="selsect-item">
                <div style="margin-right: 10px">选择声音模型</div>
                <div v-if="audioList.length == 0">
                  暂无声音克隆记录
                  <span
                    style="color: #1f64ff"
                    @click="$router.push('/digitizedHuman/mineAudio')"
                    >(去克隆)</span
                  >
                </div>
                <div
                  class="audio_select"
                  @click="showSelectAudio()"
                  v-if="audioList.length > 0"
                >
                  <!-- <img class="image-icon" src="../../assets/images/human_audio-icon1.png" alt=""> -->
                  <img
                    src="../../assets/images/clone_audio_icon1.jpg"
                    alt=""
                    v-if="showAudio.gender == 'male'"
                    style="width: 20px; height: 20px"
                  />
                  <img
                    src="../../assets/images/clone_audio_icon2.jpg"
                    alt=""
                    v-else
                    style="width: 20px; height: 20px"
                  />
                  <span class="text">{{ showAudio.voice_name }}</span>
                </div>
              </div>
              <div v-for="(item, i) in textDriveList" :key="i" class="item">
                <div class="num">{{ i + 1 }}</div>
                <img
                  class="delete-img"
                  src="../../assets/images/trash.png"
                  alt=""
                  @click="deleteAudioItem(item)"
                />
                <el-input
                  style="margin: 0 20px; width: calc(100% - 40px)"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  show-word-limit
                  :maxlength="300"
                  resize="none"
                  type="textarea"
                  v-model="item.text"
                  placeholder="单击输入台词文本，点击合成，即可生成视频"
                ></el-input>
                <!-- <div class="selsect-item">
                  <div class="audio_select" @click="showSelectAudio()" v-if="audioList.length > 0">
                    <img class="image-icon" src="../../assets/images/human_audio-icon1.png" alt="">
                    <span class="text">{{ showAudio.voice_name }}</span>
                  </div>
                </div> -->
              </div>

              <el-button
                @click="addTextDrive"
                icon="el-icon-circle-plus-outline"
                style="
                  color: #1f64ff;
                  padding: 10px 24px;
                  border-radius: 6px;
                  background: #f8f8fc;
                  width: 100%;
                  margin-top: 12px;
                  display: flex;
                  justify-content: center;
                "
                >添加分镜台本</el-button
              >
            </div>

            <!-- 音频驱动 -->
            <div class="audio_drive" v-else>
              <el-upload
                v-if="audioDriveList.length == 0"
                class="default-upload"
                :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                multiple
                accept=".mp3,.wav,.m4a"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                :data="requestData"
                :headers="headerData"
                :show-file-list="false"
              >
                <div class="mask">
                  <div class="num">1</div>
                  <el-button
                    style="
                      margin-top: 22px;
                      color: #9c9c9c;
                      font-size: 14px;
                      font-weight: 500;
                      padding: 6px 30px;
                      border-radius: 20px;
                      border: 1px solid #c0c0c0;
                    "
                    >上传录音</el-button
                  >
                  <div class="text">支持上传wav格式音频文件，</div>
                  <div class="text" style="margin-bottom: 22px">
                    时长不超过10分钟，大小不超过10M
                  </div>
                </div>
              </el-upload>

              <div class="human_vidao-upload_list" v-else>
                <div v-for="(item, i) in audioDriveList" :key="i" class="item">
                  <div class="num">{{ i + 1 }}</div>
                  <div class="audio_operate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      @click="pauseAudio(item)"
                      v-if="item.play"
                    >
                      <circle cx="16" cy="16" r="16" fill="#1F64FF" />
                      <rect
                        x="12"
                        y="10.5"
                        width="3"
                        height="11"
                        rx="1"
                        fill="white"
                      />
                      <rect
                        x="17"
                        y="10.5"
                        width="3"
                        height="11"
                        rx="1"
                        fill="white"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      @click="playAudio(item)"
                      v-else
                    >
                      <circle cx="16" cy="16" r="16" fill="#1F64FF" />
                      <path
                        d="M13 20.1727V11.7061C13 10.9421 13.822 10.4603 14.4886 10.8336L21.5441 14.7847C22.2032 15.1538 22.2308 16.0923 21.5946 16.4995L14.5391 21.015C13.8734 21.441 13 20.963 13 20.1727Z"
                        fill="white"
                      />
                    </svg>
                    <div class="audio_msg">
                      <div class="audio-name">{{ item.name }}</div>
                      <el-slider
                        v-model="item.timer"
                        @change="(event) => sliderChange(event, item)"
                        :show-tooltip="false"
                        :min="0"
                        :max="item.duration"
                      ></el-slider>
                      <!-- <div class="audio_time">
                        <span class="start-time">{{ Math.floor(item.timer / 60) }}:{{ item.timer % 60 }}</span>
                        <span class="end-time">{{ item.minute }}:{{ item.second }}</span>
                      </div> -->
                    </div>
                  </div>

                  <div class="audio-function">
                    <el-upload
                      class="upload-demo"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      multiple
                      accept=".mp3,.wav,.m4a"
                      :data="requestData"
                      :headers="headerData"
                      :on-change="editAudioChange"
                      :on-success="
                        (response, file, fileList) =>
                          editAudioSuccess(response, file, fileList, item)
                      "
                      :before-upload="handleBeforeUpload"
                      :show-file-list="false"
                    >
                      <el-button
                        type="text"
                        style="margin-right: 24px; color: #838a9f"
                        >重新上传</el-button
                      >
                    </el-upload>
                    <div class="line"></div>
                    <el-button
                      type="text"
                      style="margin-left: 24px; color: #838a9f"
                      @click="deleteAudio(item)"
                      >删除</el-button
                    >
                  </div>
                </div>
              </div>

              <el-upload
                class="more_audio"
                :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                multiple
                accept=".mp3,.wav,.m4a"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :data="requestData"
                :headers="headerData"
                :show-file-list="false"
              >
                <el-button
                  icon="el-icon-circle-plus-outline"
                  style="
                    color: rgb(31, 100, 255);
                    padding: 10px 24px;
                    border-radius: 6px;
                    background: rgb(248, 248, 252);
                    width: 100%;
                    margin-top: 12px;
                    display: flex;
                    justify-content: center;
                  "
                  >添加分镜音频</el-button
                >
              </el-upload>
            </div>
          </div>
        </div>
        <!-- 底部的效果预览区 -->
        <div class="human_preview">
          <div v-if="videoDriveType == 0" style="display: flex">
            <div
              class="item"
              v-if="textDriveList.length == 1 && textDriveList[0].text == ''"
            >
              <div class="num">1</div>
              <img
                :src="httpUrls.ossUrl + huamnItemContent.video_cover_url"
                alt=""
              />
            </div>
            <div
              v-else
              v-for="(item, i) in textDriveList"
              :key="i"
              class="item"
            >
              <div class="num">{{ i + 1 }}</div>
              <img :src="httpUrls.ossUrl + item.video_cover_url" alt="" />
            </div>
          </div>

          <div v-if="videoDriveType == 1" style="display: flex">
            <div class="item" v-if="audioDriveList.length == 0">
              <div class="num">1</div>
              <img
                :src="httpUrls.ossUrl + huamnItemContent.video_cover_url"
                alt=""
              />
            </div>
            <div
              v-else
              v-for="(item, i) in audioDriveList"
              :key="i"
              class="item"
            >
              <div class="num">{{ i + 1 }}</div>
              <img :src="httpUrls.ossUrl + item.video_cover_url" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="音色选择" :visible.sync="dialogVisible" width="980px">
      <div class="audio-style-list">
        <div
          v-for="(item, i) in audioList"
          :key="i"
          :class="
            recordSelectAudio.voice_code == item.voice_code
              ? 'item item-on'
              : 'item'
          "
          @click="selectItemAudio(item)"
        >
          <img
            src="../../assets/images/clone_audio_icon1.jpg"
            alt=""
            v-if="item.gender == 'male'"
          />
          <img src="../../assets/images/clone_audio_icon2.jpg" alt="" v-else />
          <div class="name">{{ item.voice_name }}</div>
          <!-- <div>{{ item.voice_name }}</div> -->
          <div v-if="showAudio.voice_code == item.voice_code" class="is-useing">
            已使用
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSelectAudio">确 定</el-button>
      </span>
    </el-dialog>

    <audio :src="httpUrls.ossUrl + nowAudioUrl" ref="audioPlayOrPause"></audio>

    <pay-public
      ref="PayPublic"
      :datas="payInfo"
      @payresultsuccess="payResultSuccess"
    ></pay-public>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import payPublic from "../../components/payPublic";
import {
  myDigitalHuman,
  customizedVoiceView,
  submitDigitalHumanProject,
  getaliToken,
  getDuration,
  digitalHumanProjectDetail,
  digitalHumanEditProject,
  getTotalAmount,
} from "../../api/digitizedHuman";
import { products } from "../../api/chatMG";

export default {
  name: "startProduceHuman",
  data() {
    return {
      httpUrls,
      isDetailHuamn: false, //是否为修改数字人视频
      isEditState: false, // 修改的口播视频是否已付款
      projectCode: "",
      huamnItemContent: {},
      dialogVisible: false,
      nowAudioUrl: "", // 当前的音频路径
      loading: null,
      showEditProjectTit: false,
      projectName: "", // 项目名称
      selsectHumanTypes: -1,
      exclusivePage: 1,
      exclusivePageSize: 10,
      publicPage: 1,
      publicPageSize: 10,
      exclusiveHumanList: [],
      publicHumanList: [],

      videoDriveType: 0,
      textDriveList: [], // 文本驱动列表
      audioDriveList: [], // 音频驱动列表
      audioList: [], // 克隆的音频列表
      t_time: null,

      nowUpload: false, // 是否为上传文件的过程

      recordSelectAudio: {}, // 记录选择的音频,仅作为临时存储
      showAudio: {}, // 真正选择的音频

      payInfo: {}, // 付款的参数

      requestData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "digitized_human-audio_list",
      },

      headerData: {}
    };
  },

  components: {
    payPublic,
  },

  beforeDestroy() {
    sessionStorage.removeItem("EDIT_HUMAN_MESSAGE");
    sessionStorage.removeItem("HUMAN_MESSAGE");
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    const EDIT_HUMAN_MESSAGE = JSON.parse(
      sessionStorage.getItem("EDIT_HUMAN_MESSAGE")
    );
    // 编辑
    if (EDIT_HUMAN_MESSAGE != undefined) {
      this.isEditState = Number(EDIT_HUMAN_MESSAGE.project_status) !== 1;
      this.projectCode = EDIT_HUMAN_MESSAGE.project_code;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.isDetailHuamn = true;
      digitalHumanProjectDetail(EDIT_HUMAN_MESSAGE.project_code).then((res) => {
        this.huamnItemContent.live_code = res.data.live_code;
        this.projectName = res.data.project_name;
        if (res.data.sound_type == 1) {
          /**
           * 文本驱动
           */
          this.videoDriveType = 0;
          if (res.data.live_sound_list.length != 0) {
            this.textDriveList = [];
          }
          customizedVoiceView(`voice_status=3`).then((response) => {
            response.data.data.forEach((v) => {
              if (v.create_by == res.data.create_by) {
                this.showAudio = v;
                res.data.live_sound_list.forEach((v) => {
                  this.textDriveList.push({
                    text: v.live_script,
                    voiceCode: "",
                    id: this.textDriveList.length,
                    ...v,
                    ...JSON.parse(sessionStorage.getItem("HUMAN_MESSAGE")),
                  });
                });
              }
            });
          });
        } else {
          /**
           * 音频驱动
           */
          this.videoDriveType = 1;
          res.data.live_sound_list.forEach((v) => {
            this.audioDriveList.push({
              name: v.voice_name, // 音频名称
              url: v.live_sound_url, // 音频路径
              audioId: this.audioDriveList.length, // 音频id，用于重新上传时
              play: false, // 是否正在播放
              timer: 0, // 当前播放时长
              minute: 0, // 音频时长， 单位：分
              second: 0, // 音频时长， 单位：秒
              duration: 0, // 音频的时长，单位：秒
              ...JSON.parse(sessionStorage.getItem("HUMAN_MESSAGE")), // 当前数字人信息
            });
          });
        }
        setTimeout(() => {
          loading.close();
        }, 1000);
      });
    }
    const HUMAN_MESSAGE = JSON.parse(sessionStorage.getItem("HUMAN_MESSAGE"));
    if (HUMAN_MESSAGE != undefined) {
      this.huamnItemContent = HUMAN_MESSAGE;
    } else {
      let data = `page=${this.exclusivePage}&page_size=${this.exclusivePageSize}&live_type=0`;
      myDigitalHuman(data).then((res) => {
        this.huamnItemContent = res.data.data[0];
      });
    }

    this.textDriveList = [
      {
        text: "",
        voiceCode: "",
        id: 0,
        ...this.huamnItemContent,
      },
    ];
    this.projectName = "新项目" + new Date().getTime();
    this.$nextTick(() => {

      this.$refs.exclusiveParentInner.addEventListener("scroll", (event) =>
        this.callBackScroll(event, 1)
      );
      this.$refs.publicPaarsentInner.addEventListener("scroll", (event) =>
        this.callBackScroll(event, 0)
      );
      this.$refs.audioPlayOrPause.addEventListener("loadedmetadata", () => {
        console.log(1111111);
        if (this.nowUpload) {
          this.audioDriveList[this.audioDriveList.length - 1].minute =
            Math.floor(parseInt(this.$refs.audioPlayOrPause.duration) / 60);
          this.audioDriveList[this.audioDriveList.length - 1].second =
            parseInt(this.$refs.audioPlayOrPause.duration) % 60;
          this.audioDriveList[this.audioDriveList.length - 1].duration =
            parseInt(this.$refs.audioPlayOrPause.duration);
          this.nowUpload = false;
        }
      });
    });
  },

  created() {
    this.getDigitalHuman(0);
    this.getDigitalHuman(1);
    this.customizedVoiceView();
  },

  methods: {
    // 添加文本驱动
    addTextDrive() {
      this.textDriveList.push({
        text: "",
        voiceCode: "",
        id: this.textDriveList.length == 0 ? 0 : this.textDriveList[0].id++,
        ...this.huamnItemContent,
        ...this.showAudio,
      });
      console.log(this.textDriveList);
    },

    deleteAudioItem(item) {
      this.textDriveList.forEach((v, i) => {
        console.log(item.id, v.id);
        if (item.id == v.id) {
          this.textDriveList.splice(i, 1);
        }
      });
      console.log(this.textDriveList);
    },
    // 修改项目标题
    editProjectTit() {
      this.showEditProjectTit = true;
      this.$nextTick(() => {
        this.$refs.projectInputTitle.focus();
      });
    },

    // 修改项目标题完成
    hideEditProjectTit() {
      console.log(111);
      this.showEditProjectTit = false;
    },

    // 选择数字人列表
    selectHumanType(type) {
      this.selsectHumanTypes = type;
      // if (type == -1) {
      //   this.getDigitalHuman(1)
      //   this.getDigitalHuman(0)
      // } else {
      //   this.getDigitalHuman(type)
      // }
    },

    // 选择克隆音频
    showSelectAudio() {
      this.dialogVisible = true;
    },

    // 获取数字人列表
    getDigitalHuman(type) {
      let data = "";
      if (type == 0) {
        data = `page=${this.exclusivePage}&page_size=${this.exclusivePageSize}&live_type=${type}`;
      } else {
        data = `page=${this.publicPage}&page_size=${this.publicPageSize}&live_type=${type}&make_status=0`;
      }
      myDigitalHuman(data).then((res) => {
        console.log(res);
        res.data.data.forEach((v) => {
          if (v.live_type == 1) {
            this.exclusiveHumanList.push(v);
          } else {
            this.publicHumanList.push(v);
          }
        });
      });
    },

    // 切换当前数字人形象
    selectHuamnItem(item) {
      this.huamnItemContent = item;
      if (this.videoDriveType == 0) {
        this.textDriveList.forEach((v) => {
          v.create_time = item.create_time;
          v.live_code = item.live_code;
          v.live_name = item.live_name;
          v.live_type = item.live_type;
          v.live_video_code = item.live_video_code;
          v.live_video_url = item.live_video_url;
          v.make_status = item.make_status;
          v.power_attorney_url = item.power_attorney_url;
          v.video_cover_url = item.video_cover_url;
        });
      }
    },

    // 滚动回调函数
    callBackScroll(e, type) {
      let innerHeight = null;
      let containerHeight = null;
      let scrollTop = null;
      if (type == 0) {
        innerHeight = this.$refs.exclusiveSunInner.offsetHeight;
        containerHeight = this.$refs.exclusiveParentInner.clientHeight;
        scrollTop = e.target.scrollTop;
      } else {
        innerHeight = this.$refs.publicSunInner.offsetHeight;
        containerHeight = this.$refs.publicPaarsentInner.clientHeight;
        scrollTop = e.target.scrollTop;
      }
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + containerHeight >= innerHeight) {
        if (this.selsectHumanTypes == -1) {
          if (type == 0) {
            this.getDigitalHuman(0);
            this.exclusivePage++;
          } else {
            this.getDigitalHuman(1);
            this.publicPage++;
          }
        } else {
          this.getDigitalHuman(this.selsectHumanTypes);
        }
        console.log("到底了~~");
      }
    },

    // 选择驱动方式
    driveTypeVideo(type) {
      this.$confirm(
        "切换驱动方式，将清空已完成的文本信息，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.videoDriveType = type;
          if (type == 0) {
            this.audioDriveList = [];
          } else {
            this.textDriveList = [
              {
                text: "",
                voiceCode: "",
                id: 0,
                ...this.huamnItemContent,
              },
            ];
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 获取声音克隆列表
    customizedVoiceView() {
      customizedVoiceView(`voice_status=3`).then((res) => {
        console.log(res);
        this.audioList = res.data.data;
        // 如果没有克隆的声音，切换为音频驱动
        if (res.data.data.length == 0) {
          this.videoDriveType = 1;
        }
      });
    },

    handleBeforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 > 20;
      if (isLt10M) {
        this.$message.error("上传的文件大小不能大于20M");
        return false;
      }
    },

    // 增加口播视频
    handleChange(file, fileList) {
      this.requestData.image = file.raw;
      this.requestData.image_name = file.name;
    },

    // 增加口播视频
    handleSuccess(response, file, fileList) {
      this.nowAudioUrl = response.data.new_url;
      this.nowUpload = true;
      this.audioDriveList.push({
        name: response.data.name, // 音频名称
        url: response.data.new_url, // 音频路径
        audioId: this.audioDriveList.length, // 音频id，用于重新上传时
        play: false, // 是否正在播放
        timer: 0, // 当前播放时长
        minute: 0, // 音频时长， 单位：分
        second: 0, // 音频时长， 单位：秒
        duration: 0, // 音频的时长，单位：秒
        ...this.huamnItemContent, // 当前数字人信息
      });
      // this.$nextTick(() => {
      //   this.$refs.audioPlayOrPause.addEventListener("loadedmetadata", () => {
      //     this.audioDriveList[this.audioDriveList.length - 1].minute = Math.floor(parseInt(this.$refs.audioPlayOrPause.duration) / 60)
      //     this.audioDriveList[this.audioDriveList.length - 1].second = parseInt(this.$refs.audioPlayOrPause.duration) % 60
      //     this.audioDriveList[this.audioDriveList.length - 1].duration = parseInt(this.$refs.audioPlayOrPause.duration)
      //     console.log(1111111);
      //   });
      // })
    },

    // 修改口播视频
    editAudioChange(file, fileList) {
      this.requestData.image = file.raw;
      this.requestData.image_name = file.name;
    },

    // 修改口播视频
    editAudioSuccess(response, file, fileList, item) {
      this.nowAudioUrl = response.data.new_url;
      this.$nextTick(() => {
        this.$refs.audioPlayOrPause.addEventListener("loadedmetadata", () => {
          this.audioDriveList.forEach((v) => {
            if (v.audioId == item.audioId) {
              (v.name = response.data.name),
                (v.url = response.data.new_url),
                (v.play = false),
                (v.timer = 0);
              (v.minute = Math.floor(
                parseInt(this.$refs.audioPlayOrPause.duration) / 60
              )),
                (v.second =
                  parseInt(this.$refs.audioPlayOrPause.duration) % 60),
                (v.duration = parseInt(this.$refs.audioPlayOrPause.duration)); // 音频的时长，单位：秒
              this.$refs.audioPlayOrPause.pause();
            }
          });
        });
      });
    },

    deleteAudio(item) {
      this.audioDriveList.forEach((v, i) => {
        if (v.audioId == item.audioId) {
          this.audioDriveList.splice(i, 1);
        }
      });
    },

    playAudio(item) {
      if (this.nowAudioUrl != item.url) {
        this.$refs.audioPlayOrPause.currentTime = 0;
        item.timer = 0;
      }
      this.audioDriveList.forEach((v, i) => {
        v.play = false;
        if (item.audioId == v.audioId) {
          console.log(item, v);
          this.nowAudioUrl = this.audioDriveList[i].url;
          this.audioDriveList[i].play = true;
          clearInterval(this.t_time);
          this.$nextTick(() => {
            this.$refs.audioPlayOrPause.play();
            this.t_time = setInterval(() => {
              if (
                this.audioDriveList[i].timer >= this.audioDriveList[i].duration
              ) {
                clearInterval(this.t_time);
                this.$refs.audioPlayOrPause.pause();
                this.audioDriveList[i].timer = 0;
                this.audioDriveList[i].play = false;
              }
              this.audioDriveList[i].timer++;
            }, 1000);
          });
        }
      });
    },

    pauseAudio(item) {
      item.play = false;
      clearInterval(this.t_time);
      this.$refs.audioPlayOrPause.pause();
    },

    sliderChange(e, item) {
      console.log(e);
      this.$nextTick(() => {
        this.$refs.audioPlayOrPause.currentTime = e; // 设置播放的时间
        this.playAudio(item);
      });
    },

    // 选择克隆的音频
    selectItemAudio(item) {
      this.recordSelectAudio = item;
      this.textDriveList.forEach((v) => {
        v.voiceCode = item.voice_code;
      });
    },

    // 确定选择的音频
    submitSelectAudio() {
      this.dialogVisible = false;
      this.showAudio = this.recordSelectAudio;
    },

    // 合成视频
    compositeVideo() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.createVideo()
        .then((res) => {
          getaliToken()
            .then((ress) => {
              // 获取token
              let data = {};
              if (this.videoDriveType == 0) {
                data = {
                  project_code: res.data,
                  voice_code: this.showAudio.voice_code,
                  token: ress.data.token,
                };
              } else {
                data = {
                  project_code: res.data,
                  // voice_code: this.showAudio.voice_code,
                  token: ress.data.token,
                };
              }
              // 获取时长
              getDuration(data)
                .then((response) => {
                  console.log(response);
                  let time = Math.ceil(response.data.time_length / 60);
                  getTotalAmount({ project_code: res.data })
                    .then((ress) => {
                      console.log(ress);
                      // 支付
                      products({ prod_cate_id: [8] })
                        .then((resss) => {
                          loading.close();
                          this.payInfo = {
                            shopNumber: time == 0 ? 1 : time,
                            totalPrice:
                              time == 0
                                ? resss.data[8][0].prod_price
                                : resss.data[8][0].prod_price * time,
                            ...resss.data[8][0],
                            resetPay: 2,
                            live_code: res.data,
                            dataSource: "human",
                          };
                          this.$refs.PayPublic.PayVisible = true;
                        })
                        .catch((err) => {
                          this.$message.error("网络异常，请稍后重试");
                          loading.close();
                        });
                    })
                    .catch((err) => {
                      this.$message.error("网络异常，请稍后重试");
                      loading.close();
                    });
                })
                .catch((err) => {
                  this.$message.error("网络异常，请稍后重试");
                  loading.close();
                });
            })
            .catch((err) => {
              this.$message.error("网络异常，请稍后重试");
              loading.close();
            });
        })
        .catch((err) => {
          this.$message.error(err.msg);
          loading.close();
        });
    },

    // 保存项目
    submitProject() {
      this.createVideo()
        .then((res) => {
          this.$message.success("保存成功");
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },

    // 创建口播视频
    createVideo() {
      return new Promise((resolve, reject) => {
        // 文本驱动
        let data = {
          live_code: this.huamnItemContent.live_code,
          project_name: this.projectName,
          sound_type: "",
          voice_code: "",
          live_sound_list: [],
        };
        if (this.videoDriveType == 0) {
          data.sound_type = 1;
          data.voice_code = this.showAudio.voice_code;
          let live_sound_list = [];
          this.textDriveList.forEach((v) => {
            live_sound_list.push({
              // live_sound_url: "static/digital_human/02bcb2d3-98f4-41e9-8bcd-9b783c4aedb3.wav",
              live_script: v.text,
              // voice_name: ""
            });
          });
          data.live_sound_list = live_sound_list;
        } else {
          // 音频驱动
          data.sound_type = 0;
          let live_sound_list = [];
          this.audioDriveList.forEach((v) => {
            live_sound_list.push({
              live_sound_url: v.url,
              // live_script: item.text,
              voice_name: v.name,
            });
          });
          data.live_sound_list = live_sound_list;
        }
        submitDigitalHumanProject(data)
          .then((res) => {
            if (res.code == 20000) {
              this.isDetailHuamn = true;
              this.projectCode = res.data;
              resolve(res);
              // this.$message.success('保存成功')
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 修改项目
    detailSubmitProject() {
      this.editSubmitProject()
        .then((res) => {
          sessionStorage.removeItem("EDIT_HUMAN_MESSAGE");
          this.$message.success("修改成功");
          this.$router.go(-1);
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },

    // 修改项目（未支付）
    detailCompositeVideo() {
      console.log(111);
      this.editSubmitProject()
        .then((res) => {
          getaliToken().then((ress) => {
            // 获取token
            let data = {};
            if (this.videoDriveType == 0) {
              data = {
                project_code: this.projectCode,
                voice_code: this.showAudio.voice_code,
                token: ress.data.token,
              };
            } else {
              data = {
                project_code: this.projectCode,
                // voice_code: this.showAudio.voice_code,
                token: ress.data.token,
              };
            }
            // 获取时长
            console.log(222,data);
            getDuration(data).then((response) => {
              console.log(response);
              let time = Math.ceil(response.data.time_length / 60);
              getTotalAmount({ project_code: this.projectCode }).then((v) => {
                // 支付
                products({ prod_cate_id: [8] }).then((resss) => {
                  // loading.close();
                  // this.payInfo = {
                  //   shopNumber: v.data[0].total_length,
                  //   totalPrice: v.data[0].total_amount,
                  //   ...resss.data[8][0],
                  //   resetPay: 2,
                  //   live_code: this.projectCode,
                  //   dataSource: "human",
                  // };
                  // sessionStorage.removeItem('EDIT_HUMAN_MESSAGE')
                  this.$message.success("修改成功");
                  this.$refs.PayPublic.PayVisible = true;
                });
              });
            });
          });
        })
        .catch((err) => {
          console.log("进入catch");
          this.$message.error(err.msg);
        });
    },

    // 项目修改完成后保存
    editSubmitProject() {
      return new Promise((resolve, reject) => {
        // 文本驱动
        let data = {
          live_code: this.huamnItemContent.live_code,
          project_name: this.projectName,
          sound_type: "",
          voice_code: "",
          live_sound_list: [],
        };
        if (this.videoDriveType == 0) {
          data.sound_type = 1;
          data.voice_code = this.showAudio.voice_code;
          let live_sound_list = [];
          this.textDriveList.forEach((v) => {
            live_sound_list.push({
              // live_sound_url: "static/digital_human/02bcb2d3-98f4-41e9-8bcd-9b783c4aedb3.wav",
              live_script: v.text,
              // voice_name: ""
            });
          });
          data.live_sound_list = live_sound_list;
        } else {
          // 音频驱动
          data.sound_type = 0;
          let live_sound_list = [];
          this.audioDriveList.forEach((v) => {
            live_sound_list.push({
              live_sound_url: v.url,
              // live_script: item.text,
              voice_name: v.name,
            });
          });
          data.live_sound_list = live_sound_list;
        }
        digitalHumanEditProject(this.projectCode, data)
          .then((res) => {
            if (res.code == 20000) {
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 付款成功的回调
    payResultSuccess() {
      this.isEditState = true;
      this.isDetailHuamn = true;
      this.$router.go(-1);
      sessionStorage.removeItem("EDIT_HUMAN_MESSAGE");
    },
  },
};
</script>

<style lang="scss" scoped>
.startProduceHuman {
  background: #19191b;
  height: 100%;
}

.top_navigation {
  background: #29292d;
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.05);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .go_back-page {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    margin-left: 20px;
    cursor: pointer;
  }

  .project_title {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    display: flex;
    align-items: center;

    .inp {
      input {
        height: 32px;
        line-height: 32px;
      }
    }
  }
}

.produce_main {
  display: flex;
  height: calc(100% - 56px);

  .left_menu {
    width: 56px;
    height: 100%;
    background: #2e2e35;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }
    .menu_type {
      color: #1f64ff;
      font-size: 12px;
      font-weight: 500;
      line-height: 150%; /* 18px */
    }
  }
}

.left_function {
  width: 280px;
  height: 100%;
  background: #19191b;

  .no_human-exclusive {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .main_title {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    margin: 12px 0 16px 14px;
  }

  .select_type {
    display: flex;
    justify-content: space-between;
    margin-left: 14px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%; /* 21px */
    border-bottom: 1px solid #343337;

    .item {
      padding-bottom: 9px;
      margin-right: 20px;
      cursor: pointer;
    }

    .item-on {
      color: #1f64ff;
      border-bottom: 2px solid #1f64ff;
    }
  }
}

.exclusive_human {
  margin-left: 14px;

  .human_title {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%; /* 21px */
    margin: 10px 0;
  }
}

.people_human-list {
  margin-left: 14px;
  height: calc(50% - 53px);

  .title {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%; /* 21px */
    margin: 10px 0;
  }

  .human-list {
    margin: 20px 14px 0 -4px;
    height: calc(100% - 62px);
    overflow-y: auto;

    .mask {
      display: flex;
      flex-wrap: wrap;
    }

    .item {
      margin: 4px;
      width: calc(100% / 3 - 10px);

      .image_mask {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        border-radius: 12px;
        border: 2px solid transparent;
      }

      .image_mask-on {
        border: 2px solid #1f64ff;
      }

      .iamge {
        max-height: 100%;
        width: 100%;
        object-fit: contain;
        border-radius: 12px;
        border: 2px solid transparent;
      }

      .iamge-on {
        border: 2px solid #1f64ff;
      }

      .human_name {
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        line-height: 150%; /* 18px */
        text-align: center;
        margin-top: 5px;
      }
    }
  }
}

.main_work {
  width: calc(100% - 336px);
}

.main-or-right_function {
  display: flex;
  height: calc(100% - 196px);

  .main_viadeo {
    background: #eff2fd;
    width: calc(100% - 360px);
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .right-function {
    width: 360px;
    padding: 14px 20px;
    background: #fff;

    .selsect_type {
      display: flex;
      border-bottom: 2px solid #eff2fd;

      .item {
        color: #828282;
        font-size: 14px;
        font-weight: 500;
        line-height: 150%; /* 21px */
        margin-right: 30px;
        padding-bottom: 9px;
        cursor: pointer;
      }

      .item-on {
        color: #1f64ff;
        border-bottom: 2px solid #1f64ff;
      }
    }
  }
}

.text_drive {
  height: calc(100% - 34px);
  overflow-y: auto;
  .item {
    border-radius: 10px;
    border: 1px solid #1f64ff;
    background: #f8f8fc;
    position: relative;
    margin-top: 12px;
    padding-bottom: 10px;

    .num {
      width: 25px;
      height: 22px;
      border-radius: 10px 0px;
      background: #1f64ff;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 150%; /* 18px */
      text-align: center;
      margin-bottom: 10px;
    }

    .delete-img {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }
  }

  .selsect-item {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin: 12px;
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */

    .audio_select {
      border-radius: 20px;
      background: #fff;
      padding: 4px 7px;
      color: #000;
      font-size: 12px;
      font-weight: 400;
      line-height: 150%; /* 18px */
      display: flex;
      align-items: center;
      cursor: pointer;
      .image-icon {
        width: 16px;
        height: 16px;
        margin-right: 3px;
      }
    }
  }
}

.audio_drive {
  height: calc(100% - 34px);
  overflow-y: auto;
  .default-upload {
    width: 100%;
    margin-top: 20px;
    .mask {
      position: relative;
      border-radius: 10px;
      border: 1px solid #1f64ff;
      background: #f8f8fc;
      .num {
        border-radius: 10px 0px;
        background: #1f64ff;
        width: 25px;
        height: 22px;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        line-height: 150%; /* 18px */
        text-align: center;
      }

      .text {
        color: #838a9f;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        line-height: 150%; /* 18px */
      }
    }
  }
}

.human_vidao-upload_list {
  margin-top: 20px;

  .item {
    border-radius: 10px;
    border: 1px solid #1f64ff;
    background: #f8f8fc;
    margin-top: 15px;

    .num {
      border-radius: 10px 0px;
      background: #1f64ff;
      width: 25px;
      height: 22px;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 150%; /* 18px */
      text-align: center;
    }

    .audio_operate {
      display: flex;
      margin: 0 20px;
      width: calc(100% - 40px);

      .audio_msg {
        margin-left: 20px;
        width: calc(100% - 82px);

        .audio-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .audio_time {
          display: flex;
          justify-content: space-between;
          color: #8e99a8;
          font-size: 12px;
          font-weight: 400;
          line-height: 21px; /* 175% */
        }
      }
    }

    .audio-function {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0px 0px 9px 9px;
      background: #eceff4;
      margin-top: 18px;

      .line {
        background: #838a9f;
        width: 1px;
        height: 16px;
      }
    }
  }
}

.human_preview {
  width: calc(100% - 40px);
  height: 156px;
  background-color: #fff;
  display: flex;
  overflow-x: auto;
  padding: 20px;

  .item {
    margin: 10px;
    position: relative;
    border-radius: 4px;
    width: 200px;

    .num {
      border-radius: 4px 0px 10px 0px;
      background: #1f64ff;
      width: 25px;
      height: 22px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 150%; /* 18px */
      text-align: center;
    }
    img {
      max-height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}

.audio-style-list {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: calc(25% - 32px);
    margin: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 0 1px #f5f7fb;
    border: 1px solid #e5e7eb;
    padding: 10px;
    border-radius: 10px;

    img {
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }

    .name {
      margin: 0 5px;
    }

    .is-useing {
      background-color: rgba(59, 130, 246, 0.3);
      color: #1f64ff;
      padding: 2px 6px;
      border-radius: 8px;
    }
  }

  .item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .item-on {
    border-color: #1f64ff;
  }
}

svg {
  cursor: pointer;
}
</style>

<style lang="scss">
.project_title .inp input {
  height: 32px;
  line-height: 32px;
}
.navigation-btn {
  font-size: 13px;
  font-weight: 600;
  line-height: 150%;
  margin-right: 20px;
  .btn1 {
    border-radius: 4px;
    color: #fff;
    background: #00cb5d;
    box-shadow: 2px 2px 10px 0px rgba(31, 100, 255, 0.2);
    padding: 6px 15px;
    border: none;
  }

  .btn2 {
    color: #fff;
    border-radius: 4px;
    background: #1f64ff;
    box-shadow: 2px 2px 10px 0px rgba(31, 100, 255, 0.2);
    padding: 6px 15px;
    border: none;
  }
}

.text_drive {
  textarea {
    border: none;
    background-color: transparent;
  }
}

.audio_drive .default-upload .el-upload {
  width: 100%;
  height: 100%;
}

.more_audio .el-upload {
  width: 100%;
}
</style>