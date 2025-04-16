<template>
  <div class="convert-video">
    <img
      class="bg_img"
      :src="httpUrls.ossUrl + 'static/picture/3a16dc3e-bf39-4059-9931-deff8669d05f.png'"
      alt=""
    />
    <div ref="fileBox" class="opacityDom" >
      <video :src="httpUrls.ossUrl+videoPath"></video>
    </div>
    <div class="top-title">
      <span style="color: #1f64ff">音频、视频</span>快速转写为文字
    </div>
    <div class="content_mask">
      <div class="top-content">专业领域一键生稿</div>
    </div>
    <div class="command">
      <!-- <div class="item" style="margin-right: 15px;" @click="toRealtime">
        <img class="img" src="../../assets/images/convertVideo_rellTime.png" alt="">
        <div class="title">实时录音</div>
        <div class="item_cont">录音实时转文字</div>
        <div class="go">去录音 →</div>
      </div> -->
      <!-- <el-upload
        class="item"
        drag
        :action="httpUrls.loginUrl + 'api/user/oss_upload'"
        :data="videoFileList"
        :on-change="handleChangeAudio"
        :on-success="handleSuccessAudio"
        multiple>
        <img style="width: 40px;height: 40px;" class="img" src="../../assets/images/convertVideo_history.png" alt="">
        <div class="title">音视频转写</div>
        <div class="item_cont">电脑文件转文字</div>
        <div class="go">去传文件 →</div>
      </el-upload> -->
      <div class="item" style="margin-left: 15px" @click.stop="toLocalVideo">
        <img class="img" src="../../assets/images/convertVideo_history.png" alt="" />
        <div class="title">音视频转写</div>
        <div class="item_cont">电脑文件转文字</div>
        <div style="display: flex;">
          <div class="go">去传文件 →</div>
          <div class="charging-btn" @click.stop="chargingVisible = true"><span>计费标准</span></div>
        </div>
      </div>
    </div>

    <div class="content_title-list">
      <div class="mask">
        <div :class="showBanner == 1 ? 'item item-on' : 'item'" @click="showBanner = 1">
          会议记录
        </div>
        <div :class="showBanner == 2 ? 'item item-on' : 'item'" @click="showBanner = 2">
          课堂记录
        </div>
        <div :class="showBanner == 3 ? 'item item-on' : 'item'" @click="showBanner = 3">
          采访调研
        </div>
      </div>
    </div>

    <div class="content_list">
      <div class="item" v-if="showBanner == 1">
        <img
          :src="
            httpUrls.ossUrl + 'static/picture/05afdd28-8573-4c8a-a1c8-1257b02df8c0.png'
          "
          alt=""
          class="img"
        />

        <!-- <div class="cont_list">
          <img class="cont_img" src="../../assets/images/banner_bg1.png" alt="">
          <div class="title">会议内容记录</div>
          <div class="cont_item">领导讲话来不及记录重点？</div>
          <div class="cont_item">会后录音一遍遍听，费时又费力？</div>
        </div>
        <div class="img_mask">
          <img src="../../assets/images/convertVideo_banner1.png" alt="" class="img">
        </div> -->
      </div>

      <div class="item" v-if="showBanner == 2">
        <img
          :src="
            httpUrls.ossUrl + 'static/picture/6126fea0-fbc1-4719-85d8-b2b2b8e8f19d.png'
          "
          alt=""
          class="img"
        />

        <!-- <div class="cont_list">
          <img class="cont_img" src="../../assets/images/banner_bg2.png" alt="">
          <div class="title">课堂笔记录制</div>
          <div class="cont_item">课堂信息量太大不好消化？</div>
          <div class="cont_item">课后复习不知道重点在哪里？</div>
        </div>
        <div class="img_mask">
          <img src="../../assets/images/convertVideo_banner2.png" alt="" class="img">
        </div> -->
      </div>

      <div class="item" v-if="showBanner == 3">
        <img
          :src="
            httpUrls.ossUrl + 'static/picture/16a54121-2928-4bae-9a72-713015c89cbe.png'
          "
          alt=""
          class="img"
        />

        <!-- <div class="cont_list">
          <img class="cont_img" src="../../assets/images/banner_bg3.png" alt="">
          <div class="title">采访调研整理</div>
          <div class="cont_item">采访录音口头语多且重复？</div>
          <div class="cont_item">录音内容录音笔转写可读性差，<br />整理效率低？</div>
        </div>
        <div class="img_mask">
          <img src="../../assets/images/convertVideo_banner3.png" alt="" class="img">
        </div> -->
      </div>
    </div>

    <div class="convert-history" v-if="audioFileHistoryList.length != 0">
      <div class="title">文件记录</div>
      <div class="convert_list" ref="audioFileList">
        <div class="mask" ref="audioFileMaks">
          <div
            class="item"
            v-for="(item, i) in audioFileHistoryList"
            @click="toEidt(item)"
          >
            <div class="history-time">{{ item.title }}</div>
            <div class="history-time_cont">{{ item.create_time }}</div>
            <div class="time">
              <div class="time_img">
                <img
                  class="img"
                  src="../../assets/images/historicalConversation.png"
                  alt=""
                />
                <span>{{ item.time }}</span>
              </div>
              <div class="time_img">
                <img
                  class="img"
                  src="../../assets/images/trash.png"
                  alt=""
                  @click.stop="deleftVideo(item, i)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <file></file> -->
    <div style="height: 30px"></div>
    <el-dialog
      title="计费标准"
      :visible.sync="chargingVisible"
      width="600px"
    >
      <div>
        <div class="charging-text">1.录音文字识别（1小时/75000算力）</div>
        <div class="charging-text">2.视频文字识别（按量收费）</div>
        <dl>
          <dt>（1）1分钟/18072算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">分辨率规格：SD</li>
              <li class="charging-text-child">输入分辨率：分辨率≤854×480像素</li>
              <li class="charging-text-child">分辨率取值范围：Max（宽，高）≤854像素，且Min（宽，高）≤480像素</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（2）1分钟/27027算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">分辨率规格：HD</li>
              <li class="charging-text-child">输入分辨率：854×480&gt;=视频&lt;=1280×720像素</li>
              <li class="charging-text-child">分辨率取值范围：854像素＜Max（宽，高）≤1280像素，且Min（宽，高）≤720像素；或480像素＜Min（宽，高）≤720像素，且Max（宽，高）≤1280像素</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（3）1分钟/54546算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">分辨率规格：2K</li>
              <li class="charging-text-child">输入分辨率： 1280×720&gt;=视频&lt;2560×1440像素</li>
              <li class="charging-text-child">1280像素＜Max（宽，高）≤2560像素，且Min（宽，高）≤1440像素；或720像素＜Min（宽，高）≤1440像素，且Max（宽，高）≤2560像素</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（4）1分钟/111112算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">分辨率规格：4K</li>
              <li class="charging-text-child">输入分辨率：视频&gt;2560×1440像素</li>
              <li class="charging-text-child">分辨率取值范围：Max（宽，高）＞2560像素，且Min（宽，高）＞1440像素</li>
            </ul>
          </dd>
        </dl>
        
        <!-- <div class="charging-text-child">2-1.视频文字识别</div>
        <div class="charging-text-child">2-2.视频文字识别</div>
        <div class="charging-text-child">2-3.视频文字识别</div>
        <div class="charging-text-child">2-4.视频文字识别</div> -->

      </div>
    </el-dialog>
    <el-dialog
      title="上传需要转写的音视频"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
      width="400px"
    >
      <el-upload
        v-if="startContvertVideo == 0"
        class="upload-video_file"
        drag
        ref="uploadVidoeFile"
        :limit="1"
        :auto-upload="false"
        :action="httpUrls.loginUrl + 'api/user/oss_upload'"
        :data="videoFileList"
        :on-change="handleChangeAudio"
        :on-success="handleSuccessAudio"
        :headers="headerData"
        multiple
      >
        <img
          style="width: 40px; height: 40px"
          class="img"
          src="../../assets/images/convertVideo_history.png"
          alt=""
        />
        <div class="el-upload__text">请拖拽文件到此处或<em>点击上传</em></div>
        <div class="el-upload__text" style="text-align: left">文件格式</div>
        <div class="el-upload__text" style="text-align: left; margin-bottom: 10px">
          1、支持WAV、MP3、MP4、M4A、WMA、AAC、OGG、AMR、FLAC格式录音文件识别
        </div>
        <div class="el-upload__text" style="text-align: left">
          2、音频文件大小不超过512 MB，视频文件大小不超过2 GB。
        </div>
      </el-upload>
      <div
        v-if="startContvertVideo == 1 || startContvertVideo == 2"
        style="
          width: 320px;
          height: 140px;
          border-radius: 8px;
          padding: 20px;
          background-color: #f1f5ff;
          border: 1px dashed #d9d7d7;
        "
      >
        <div
          style="display: flex; align-items: center; margin-bottom: 20px"
          v-if="startContvertVideo == 1"
        >
          <img
            style="width: 24px; height: 24px; margin-right: 10px"
            src="../../assets/images/arrow-up-circle.png"
            alt=""
          />
          <span>上传中</span>
        </div>

        <div
          style="display: flex; align-items: center; margin-bottom: 20px"
          v-if="startContvertVideo == 2"
        >
          <img
            style="width: 24px; height: 24px; margin-right: 10px"
            src="../../assets/images/arrow-up-circle2.png"
            alt=""
          />
          <span>转写中</span>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
          <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
            {{ videoFileList.image_name }}
          </div>
          <!-- <i class="el-icon-close"></i> -->
        </div>

        <div>
          <el-progress
            :percentage="uploadPercentage"
            style="width: 100%; margin-bottom: 20px"
          ></el-progress>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
            <div>位置: 音视频转写/历史记录</div>
            <div v-if="startContvertVideo == 1">已上传({{ uploadPercentage }}%)</div>
            <div v-if="startContvertVideo == 2">转写中，即将完成</div>
          </div>
          <div v-if="startContvertVideo == 2" style="text-align: right">
            转写中({{ uploadPercentage }}%)
          </div>
        </div>
      </div>

      <div v-if="startContvertVideo == 3">
        <div
          style="box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.1); padding: 10px 12px"
        >
          <i class="el-icon-success" style="color: #1f64ff"></i>
          <span
            >2023-03-06...已成功转至:
            <span style="color: #1f64ff">音视频转写/历史记录</span></span
          >
        </div>
      </div>

      <div v-if="startContvertVideo == 4">
        <div
          style="box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.1); padding: 10px 12px"
        >
          <i class="el-icon-error" style="color: #ff5151"></i>
          <span>2023-03-06的会议录音.MP3，转写失败</span>
        </div>
      </div>

      <div v-if="startContvertVideo == 5">
        <div>未识别到有效录音，请换个文件试试</div>
      </div>

      <div class="btn_list">
        <el-button
          v-if="startContvertVideo != 3"
          @click="cancelConvert"
          style="padding: 9px 21px"
          >取消</el-button
        >
        <el-button
          v-if="startContvertVideo == 3"
          @click="$message.success('保存成功'), (dialogVisible = false)"
          style="padding: 9px 21px; background-color: #1f64ff; color: #ffffff"
          >确定</el-button
        >
        <el-button
          v-if="startContvertVideo == 5"
          @click="
            (startContvertVideo = 0),
              (videoFileList.image = null),
              (videoFileList.image_name = null)
          "
          style="padding: 9px 21px; background-color: #1f64ff; color: #ffffff"
          >重新上传</el-button
        >
        <el-button
          v-if="startContvertVideo == 0"
          @click="startContvertVideo == 0 ? submitStartVideo() : ''"
          style="padding: 9px 21px; background-color: #1f64ff; color: #ffffff"
          >开始转写</el-button
        >
      </div>
    </el-dialog>

    <register ref="Register"></register>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import file from "./file";
import register from "../../components/register";

import { submitFootprint, deleteFootprint } from "../../api/chatMG";
import {
  audioHistoryList,
  audioEditResult,
  audioDelete,
  fileIdentifier,
  resultFileIdentifier,
  audioResultSubmit,
} from "../../api/video";
export default {
  name: "convert-video-index",
  data() {
    return {
      httpUrls,
      showBanner: 1,
      audioFileHistoryList: [],
      uploadVideoUrl: "",
      page: 1,
      page_size: 30,
      loading: true,
      videoFileList: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "video_transfer-file_list",
      },

      dialogVisible: false,
      startContvertVideo: 0, // 转写的状态，0：未开始，1：上传中，2：转写中，3：转写成功，4：转写失败
      uploadPercentage: 0, // 上传的进度
      timers: null,
      titleVideo: "",
      videoDuration: 0,
      fileType: 2,
      loading2: true,
      videoPath:'',
      chargingVisible:false,
      headerData: {}
    };
  },
  components: {
    file,
    register,
  },

  created() {
    this.queryaudioHistoryList();
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    if (this.$refs.audioFileList != undefined) {
      this.$refs.audioFileList.addEventListener("scroll", this.callBackScroll);
    }
  },

  methods: {
    toRealtime() {
      this.$message("更多功能开发中，敬请期待");
      // this.$router.push('/convert/realTime')
    },
    toLocalVideo() {
      // this.$message('更多功能开发中，敬请期待')
      // this.$router.push('/convert/loaclVideo')
      this.dialogVisible = true;
      this.startContvertVideo = 0;
    },

    // 历史记录监听滚动条
    callBackScroll(e) {
      let innerHeight = this.$refs.audioFileMaks.offsetHeight;
      let containerHeight = this.$refs.audioFileList.clientHeight;
      let scrollTop = e.target.scrollTop;
      // 当滚出去的内容高度加上窗口也就是外部容器的高度大于等于内容高度时发送请求
      if (scrollTop + containerHeight >= innerHeight) {
        this.queryaudioHistoryList();
        console.log("到底了~~");
      }
    },

    // 从本地上传文件
    handleChangeAudio(file, fileList) {
      this.videoFileList.image = file.raw;
      this.videoFileList.image_name = file.name;
    },

    // 文件上传到服务器成功
    handleSuccessAudio(response, file, fileList) {
      console.log(response,file)
      if (response.code == 20000) {
        this.uploadVideoUrl = response.data.new_url;
        let isLtType = [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ];
        let requestData = {}
        if (
          file.raw.type == "iamge/jpeg" ||
          file.raw.type == "image/png" ||
          file.raw.type == "image/jpg"
        ) {
          this.fileType = 1;
        } else if (
          file.raw.type == "audio/mpeg" ||
          file.raw.type == "audio/wav" ||
          file.raw.type == "audio/mp3"
        ) {
          this.fileType = 2;
        } else if (isLtType.indexOf(file.raw.type) != -1) {
          this.fileType = 3;
          this.videoPath = response.data.new_url;
        }
        // 创建识别任务
        var url = URL.createObjectURL(file.raw);
        var audioElement = new Audio(url);
        var duration;
        audioElement.addEventListener("loadedmetadata", () => {
          this.videoDuration = parseInt(audioElement.duration); //时长为秒
        });
        requestData.file_link = response.data.new_url;
        setTimeout(() => {
          if(this.fileType == 3){
            requestData.width = this.$refs.fileBox.offsetWidth;
            requestData.height =this.$refs.fileBox.offsetHeight;
            requestData.duration = this.videoDuration;
          }else if(this.fileType == 2){
            requestData.duration = this.videoDuration;
          }
          fileIdentifier(requestData)
          .then((res) => {
            if (res.code == 20000) {
              let dates = new Date();
              this.titleVideo =
                dates.getFullYear() +
                "-" +
                (dates.getMonth() + 1) +
                "-" +
                dates.getDate() +
                " " +
                dates.getHours() +
                ":" +
                dates.getMinutes() +
                ":" +
                dates.getSeconds();
              if (this.loading2 && this.uploadVideoUrl != "") {
                setTimeout(() => {
                  this.uploadPercentage = 95;
                  setTimeout(() => {
                    this.startContvertVideo = 2;
                    this.uploadPercentage = 0;
                    clearInterval(this.timers);
                    this.timers = setInterval(() => {
                      let num = Math.floor(Math.random() * 10);
                      if (this.uploadPercentage + num >= 98) {
                        this.uploadPercentage = 98;
                        clearInterval(this.timers);
                      } else {
                        this.uploadPercentage = this.uploadPercentage + num;
                      }
                    }, 2000);
                  }, 500);
                }, 3000);
                setTimeout(() => {
                  if (this.uploadVideoUrl != "") {
                    this.getResultFileIdentifier(res.data.task_id);
                  } else if (this.uploadVideoUrl == "") {
                    this.startContvertVideo = 0;
                    clearInterval(this.timers);
                    this.uploadPercentage = 0;
                  }
                }, 10000);
              }
            } else {
              this.startContvertVideo = 4;
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.startContvertVideo = 4;
          });
        },200)
      } else if (response.code > 20000 && response.code < 50000) {
        this.$message.error(res.msg);
      } else {
        this.$message.error("网络异常，请稍后重试");
      }
    },

    // 转写列表
    queryaudioHistoryList() {
      if (!this.loading) return;
      this.loading = false;
      setTimeout(() => {
        this.loading = true;
      }, 1000);
      audioHistoryList(`page=${this.page}&page_size=${this.page_size}`).then((res) => {
        let data = res.data.data;
        data.forEach((v) => {
          v.time =
            Math.floor(Number(v.biz_duration) / 60) + ":" + (Number(v.biz_duration) % 60);
        });
        if (this.page == 1) {
          this.audioFileHistoryList = data;
        } else {
          this.audioFileHistoryList = this.audioFileHistoryList.concat(data);
        }
        this.page++;
      });
    },

    // 删除记录
    deleftVideo(item, i) {
      audioDelete({ speech_code: item.speech_code }).then((res) => {
        console.log(res);
        if (res.code == 20000) {
          this.$message.success("删除成功");
          deleteFootprint(
            `type_code=real_file&eid=${item.speech_code}`
          ).then((res) => {});
          this.audioFileHistoryList.splice(i, 1);
        }
      });
    },

    // 修改记录
    toEidt(item) {
      sessionStorage.setItem("eidtVideoMsg", JSON.stringify(item));
      this.$router.push("/convert/editVideo");
    },

    // 开始转写
    submitStartVideo() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
        return;
      }
      if (this.videoFileList.image_name == null) {
        this.$message("请先上传一个视频或音频文件");
        return;
      }
      this.loading2 = true;
      this.$refs.uploadVidoeFile.submit();
      this.startContvertVideo = 1;
      this.uploadPercentage = 0;
      clearInterval(this.timers);
      this.timers = setInterval(() => {
        let num = Math.floor(Math.random() * 10);
        if (this.uploadPercentage + num >= 98) {
          this.uploadPercentage = 98;
          clearInterval(this.timers);
        } else {
          this.uploadPercentage = this.uploadPercentage + num;
        }
      }, 500);
    },

    // 获取转写的结果
    getResultFileIdentifier(id) {
      console.log(id);
      resultFileIdentifier(`task_id=${id}`).then((res) => {
        // 成功
        if (res.code == 20000 && res.data.StatusCode == 21050000) {
          clearInterval(this.timers);
          this.startContvertVideo = 3;
          let speechText = "";
          res.data.Result.Sentences.forEach((v) => {
            speechText += v.Text + "\n";
          });
          let data = {
            title: this.titleVideo,
            audio_url: this.uploadVideoUrl,
            speech_text: speechText,
            r_status: 2,
            r_type: 2,
            biz_duration: this.videoDuration,
            file_type: this.fileType,
            type_code: "real_file",
          };
          // 转写后保存
          if (this.loading2 && this.uploadVideoUrl != "") {
            audioResultSubmit(data).then((response) => {
              if (response.code == 20000) {
                // 保存最近使用
                submitFootprint({
                  type_name: "录音文件",
                  type_code: "real_file",
                  image_url: response.data.audio_url,
                  title: this.titleVideo,
                  eid: response.data.speech_code,
                }).then((res) => {});

                this.page = 1;
                this.queryaudioHistoryList();
                this.videoFileList.image = null;
                this.videoFileList.image_name = null;
                this.uploadVideoUrl = "";
                sessionStorage.setItem("eidtVideoMsg", JSON.stringify(response.data));
                this.$router.push("/convert/editVideo");
              }
            });
          }
        } else if (res.code == 20000 && res.data.StatusCode == 21050003) {
          // 没有识别到有效录音
          this.startContvertVideo = 5;
          clearInterval(this.timers);
        } else if (
          res.code == 20000 &&
          this.uploadVideoUrl != "" &&
          (res.data.StatusCode == 21050001 || res.data.StatusCode == 21050002)
        ) {
          // 排队中
          setTimeout(() => {
            if (this.uploadVideoUrl != "") {
              this.getResultFileIdentifier(id);
            }
          }, 10000);
        } else {
          clearInterval(this.timers);
          this.startContvertVideo = 5;
          this.$message.error(res.data.StatusText);
        }
      });
    },

    closeDialog(done) {
      if (this.startContvertVideo == 1 || this.startContvertVideo == 2) {
        this.$confirm("当前转写还没完成，是否确认关闭！", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.loading2 = false;
            this.startContvertVideo = 0;
            this.videoFileList.image = null;
            this.uploadVideoUrl = "";

            done();
          })
          .catch(() => {});
      } else {
        done();
      }
    },

    cancelConvert() {
      if (this.startContvertVideo == 1 || this.startContvertVideo == 2) {
        this.$confirm("当前转写还没完成，是否确认关闭！", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.videoFileList.image_name = null;
            this.loading2 = false;
            this.startContvertVideo = 0;
            this.uploadVideoUrl = "";
            this.dialogVisible = false;
          })
          .catch(() => {});
      } else {
        this.dialogVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.charging-btn{
  margin-left: 10px;
  overflow: hidden;
  height: 43px;
}
.charging-btn span{
  color: #1f64ff;
  text-decoration: underline;
  font-size: 12px;
  line-height: 57px;
}
.charging-text{
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  line-height: 22px;
}
ul,li{
  margin: 0;
  padding-left: 0px;
}
ul{
  padding-left: 13px;

}
.charging-text-child{
  color: #999;
  font-weight: lighter;
  line-height: 22px;

}
.opacityDom{
  width: auto;
  height: auto;
  opacity: 0;
  position: fixed;
  z-index: -10;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

}
.convert-video {
  position: relative;
  height: calc(100vh - 100px);
}

.convert-video .bg_img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.convert-video .top-title {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
}

.convert-video .content_mask {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.convert-video .content_mask .top-content {
  text-align: center;
  color: #333;
  padding: 12px 86px;
  border-radius: 1000px;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #1f64ff;
  display: inline-block;
}

.convert-video .command {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.convert-video .command .item {
  padding: 16px 24px;
  background-color: #ffffff;
  border-radius: 10px;
  min-width: 260px;
  cursor: pointer;
  transition: all 0.2s;
}

.convert-video .command .item:hover {
  transform: scale(1.02);
}

.convert-video .command .item:hover .go {
  background-color: #1f64ff;
  color: #ffffff;
}

.convert-video .command .item .title {
  margin: 20px 0 10px 0;
  color: #333;
  font-size: 18px;
  font-weight: 500;
}

.convert-video .command .item .item_cont {
  color: #999;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
}

.convert-video .command .item .go {
  color: #1f64ff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 1000px;
  background: rgba(31, 100, 255, 0.1);
  padding: 12px 24px;
  display: inline-block;
}

.content_title-list {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  color: #666;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
}

.content_title-list .mask {
  width: 60%;
  display: flex;
}

.content_title-list .item {
  margin-right: 40px;
  cursor: pointer;
}

.content_title-list .item-on {
  color: #000;
  font-weight: bold;
}

.content_list {
  width: 100%;
  display: flex;
  justify-content: center;
}

.content_list .item {
  width: 80%;
  display: flex;
  /* background-color: #1F64FF; */
  border-radius: 20px;
  /* height: 400px; */
  position: relative;
  color: #ffffff;
  max-width: 1200px;
}

.content_list .item .cont_list {
  margin-left: 60px;
}

.content_list .item .cont_img {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
}

.content_list .item .img_mask {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
}

.content_list .item .img_mask .img {
  height: 100%;
}

.content_list .item .cont_list .title {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 24px;
  margin-bottom: 24px;
  margin-top: 40px;
}

.content_list .item .cont_list .cont_item {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
}

.convert-history {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.convert-history .title {
  color: #000;
  font-size: 20px;
  font-weight: 500;
  width: 80%;
}

.convert-history .convert_list {
  width: 80%;
  max-height: 800px;
  overflow-y: auto;
  padding-bottom: 10px;
}

.convert-history .convert_list .mask {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.convert-history .convert_list .item {
  background-color: #ffffff;
  margin-right: 20px;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  min-width: 160px;
  width: calc(25% - 60px);
  cursor: pointer;
}

.convert-history .convert_list .item .history-time {
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

.convert-history .convert_list .item .time {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-time_cont {
  color: #8e99a8;
  font-size: 12px;
  font-weight: 400;
  margin: 10px 0;
}

.time_img {
  display: flex;
  align-items: center;
}

.time_img img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

@media (width < 1740px) {
  .content_list .item {
    height: 300px;
    width: 900px;
  }
  .content_list .item .cont_list .title {
    font-size: 18px;
  }
  .content_list .item .cont_list .cont_item {
    font-size: 22px;
  }
}

.btn_list {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
</style>

<style>
.convert-video .command .item .el-upload-dragger {
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 260px;
}

.upload-video_file .el-upload-dragger {
  padding: 0 20px;
  background-color: #f1f5ff;
  width: 360px;
  height: 180px;
}
</style>
