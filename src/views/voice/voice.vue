<template>
  <!-- AI视觉馆 -->
  <div class="vision">
    <!-- 左边主体内容 -->
    <div class="main">
      <div>
        <div>
          <div class="title">
            <div class="line"></div>
            <div>填写内容</div>
            <div>
              <el-tooltip class="item" effect="dark" placement="bottom-end">
                <div slot="content">
                  根据你所想要的语音效果属性来输入所对应<br />的语音，例如输入英文，转换英语效果语音。
                </div>
                <img src="../../assets/images/help-circle.png" alt="" />
              </el-tooltip>
            </div>
          </div>
          <!--输入内容 -->
          <div class="text">
            <el-input
              type="textarea"
              resize="none"
              :rows="7"
              placeholder="请输入你想转换的文本"
              v-model="textarea"
            >
            </el-input>
          </div>
          <!-- 提示文字 -->
          <div class="prompt">
            注意：请不要生成会对个人及组织造成侵害的内容，此功能仅供个人学习，娱乐及研究使用。
          </div>
          <div class="audio">
            <audio
              ref="audio"
              v-if="voiceData"
              controls
              :src="httpUrls.ossUrl + voiceData.speech_url"
            ></audio>
          </div>
          <!-- 选择引擎及播音员 -->
          <div class="centent">
            <!-- 标题 -->
            <div class="centent-title">
              <div class="line"></div>
              选择引擎
            </div>
            <div class="centent-tips">(基础版速度更快，进阶版音质更好)</div>
            <!-- 选择引擎 -->
            <div class="select-Engine">
              <div
                :class="
                  engine.engine_code == item.engine_code
                    ? 'engine-box select-engine'
                    : 'engine-box'
                "
                v-for="item in engineData"
                @click="handleEngine(item)"
                :key="item.engine_code"
              >
                {{ item.engine_name }}
              </div>
            </div>
            <!-- 播音员 -->
            <div class="announcer">
              <div class="announcer-title">
                <div class="line"></div>
                当前说话人
              </div>
              <div class="announcer-box">
                <div
                  class="announcer-people domHover"
                  @click="announcerDialogVisible = true"
                >
                  <img :src="httpUrls.ossUrl + announcer.voice_logo" alt="" />
                  <div>
                    <div>{{ announcer.voice_name }}</div>
                    <div>普通话</div>
                  </div>
                </div>
                <div class="announcer-btn">
                  <div class="domHover" v-if="stop" @click="stopAudio">
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/c7647e95-e2e1-4278-933a-9f461b890b75.png'
                      "
                      alt=""
                    />
                    <div>暂停</div>
                  </div>
                  <div class="domHover" @click="playAudio(1)" v-else>
                    <!-- "static/picture/c7647e95-e2e1-4278-933a-9f461b890b75.png" -->
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/e763e85a-45fd-4688-8652-79dea4e699a7.png'
                      "
                      alt=""
                    />
                    <div>试听</div>
                  </div>
                  <div class="domHover" @click="announcerDialogVisible = true">
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/1fdbce45-e907-4cf4-99f7-c13dc5b0c203.png'
                      "
                      alt=""
                    />
                    <div>更换声音</div>
                  </div>
                  <audio
                    id="audioElement"
                    ref="audioElement"
                    :src="httpUrls.ossUrl + announcer.speech_url"
                  ></audio>
                </div>
              </div>
              <!-- 播音员滑块 -->
              <div class="announcer-slider">
                <div>
                  <div>音调</div>
                  <div>
                    <el-slider v-model="tone" @change="changeTone"></el-slider>
                  </div>
                  <div>{{ tone }}</div>
                </div>
                <div>
                  <div>语速</div>
                  <div>
                    <el-slider v-model="speed" @change="changeSpeed"></el-slider>
                  </div>
                  <div>{{ speed }}</div>
                </div>
              </div>
              <!-- 语音合成 -->
              <div class="submit">
                <div class="priceToken">{{ priceToken }}</div>
                <div class="submit-btn domHover" @click="handleVoice">合成语音</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边内容 -->
    <div class="work_area">
      <div class="work-title">历史记录</div>
      <div class="work-line"></div>
      <div class="work-input">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="historyValue"
        >
        </el-input>
      </div>
      <div id="history-list" v-if="historyList.length">
        <!-- <div class="noHistory">暂无数据</div> -->
        <div class="history-mask">
          <div
            class="history-box domHover"
            v-for="(item, index) in historyList"
            :key="item.h_code"
            @click.stop="getDetail(item.h_code)"
          >
            <audio
              ref="audioHistory"
              v-if="announcer.speech_url"
              :src="httpUrls.ossUrl + item.speech_url"
            ></audio>
            <div class="history-title">记录{{ index + 1 }}</div>
            <div class="history-content">
              <div>
                <div>话题</div>
                <div>
                  <div>
                    {{ item.title }}
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <div>时间</div>
                <div>
                  <div>
                    {{ item.create_time }}
                  </div>
                </div>
              </div>
            </div>
            <div class="history-bottom">
              <button class="domHover" @click.stop="download(item)">下载</button>
              <button class="domHover" @click.stop="playAudio([index])">播放</button>
              <button class="domHover" @click.stop="deleteVoice(item.h_code)">
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="noHistory" v-else>
        <div>
          <img
            :src="
              httpUrls.ossUrl + 'static/picture/86e840c2-e961-4649-848e-39d12c8c1cb0.png'
            "
            alt=""
          />
          <div>暂无记录</div>
        </div>
      </div>
    </div>
    <!-- 选择播音员 -->
    <el-dialog title="选择声音" :visible.sync="announcerDialogVisible" width="506px">
      <audio
        ref="audioElementDialog"
        v-if="announcerData.length"
        :src="httpUrls.ossUrl + announcerData[selectAnnouncer].speech_url"
      ></audio>
      <div class="select-announcer">
        <div
          class="select-box domHover"
          :style="selectAnnouncer == index ? 'border-color: #1F64FF;' : ''"
          v-for="(item, index) in announcerData"
          :key="item.voice"
          @click="selectAnnouncer = index"
        >
          <img :src="httpUrls.ossUrl + item.voice_logo" alt="" />
          <div>{{ item.voice_name }}</div>
          <div v-if="selectAnnouncer == index" @click="playAudio(2)">点击试听</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="announcerDialogVisible = false">取 消</el-button>
        <el-button style="background: #1f64ff" type="primary" @click="handleCente"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      style="margin-top: 30vh"
      class="loading-Bg"
      :show-close="false"
      :visible.sync="dialogVisible"
      width="200px"
    >
      <div class="modal">
        <div class="loading">
          <div class="item1"></div>
          <div class="item2"></div>
          <div class="item3"></div>
          <div class="item4"></div>
          <div class="item5"></div>
          <div class="item6"></div>
          <div class="item7"></div>
          <div class="item8"></div>
          <div class="item9"></div>
          <div class="item10"></div>
          <div class="item11"></div>
          <div class="item12"></div>
        </div>
      </div>
      <div class="loading-text">合成中......</div>
    </el-dialog>
    <register ref="Register"></register>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import remind from "../../components/remind.vue";
import register from "../../components/register";
import {
  getEngine,
  getTimbre,
  getVoiceHistory,
  voiceSynthesis,
  getVoiceResult,
  getVoiceDetail,
  deleteVoiceDetail,
} from "../../api/voice";

export default {
  name: "voice",
  components: {},
  data() {
    return {
      httpUrls,
      textarea: "",
      engineData: [], //引擎数组
      engine: {}, //引擎
      tone: 50, //音调
      speed: 50, //语速
      announcerData: [], //播音员数组
      announcer: {
        // voice_name:"",
        // voice_logo:""
      }, //播音员
      selectAnnouncer: 0,
      announcerDialogVisible: false, //选择播音员弹出框
      timer: 0, //时间
      t_time: null, //定时器
      isTime: false, //判断是否开启定时器
      historyValue: "", //历史记录输入框
      historyList: [], //历史记录
      dialogVisible: false,
      voiceData: null, //数据
      stop: false,
    };
  },
  computed: {
    priceToken() {
      let text = "";
      switch (this.engine.engine_name) {
        case "基础版":
          text = "1000字/3150 算力";
          break;
        case "进阶版":
          text = "1000字/6300 算力";
          break;
        case "百度":
          text = "1000字/6300 算力";
          break;
        case "讯飞星火":
          text = "1000字/9000 算力";
          break;
        case "阿里云":
          text = "1000字/3000 算力";
          break;
        default:
          break;
      }
      return text;
    },
  },
  components: {
    remind,
    register,
  },
  created() {
    // this.title = this.$route.query.title;
    this.init();
    this.getVoiceHistory();
  },

  mounted() {
    this.loginRoNot();
    let audio = document.getElementById("audioElement");
    audio.addEventListener("ended", () => {
      this.stop = false;
      console.log("结束");
    });
  },
  watch: {
    engineData: {
      deep: true,
      handler() {
        console.log(this.engineData);
        // if (this.engine.engine_name == '百度') {
        //   this.speed = 34;
        //   this.tone = 34
        // } else if (this.engine.engine_name == '阿里云') {
        //   this.speed = 50;
        //   this.tone = 50;
        // } else if (this.engine.engine_name == '基础版' || this.engine.engine_name == '进阶版') {
        //   this.speed = 20;
        //   this.tone = 20;
        // }
      },
    },
  },
  methods: {
    // 判断是否登录
    loginRoNot() {
      let userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo.role !== "user") {
        this.$message({
          message: "当前尚未登录，请先登录",
          type: "warning",
        });
        this.$refs.Register.registerVisible = true;
        return false;
      } else {
        return true;
      }
    },
    init() {
      getEngine("scene_type=").then((res) => {
        if (res.code == 20000) {
          console.log(res.data, "------");
          this.engineData = res.data;
          this.engine = res.data[0];
          this.getAnnouncer(res.data[0]);
        }
      });
    },
    // 选择引擎
    handleEngine(val) {
      if (val.engine_name == "讯飞星火") {
        this.$message.error("抱歉，该模型正在开发中，暂不可使用...");
        return;
      }
      console.log(val);
      this.engine = val;
      this.getAnnouncer(val);
    },
    // 获取音色
    getAnnouncer(val) {
      let requestData = `engine_code=${val.engine_code}`;
      getTimbre(requestData).then((res) => {
        if (res.code == 20000) {
          // console.log(res, '音色')
          this.announcerData = res.data;
          this.announcer = res.data[0];
        }
      });
    },
    //获取历史记录
    getVoiceHistory() {
      let requestData = `title=${this.historyValue}`;
      getVoiceHistory(requestData).then((res) => {
        if (res.code == 20000) {
          this.historyList = res.data.data;
        }
      });
    },
    // 语音合成
    handleVoice() {
      if (!this.textarea) {
        this.$message.error("请输入你要转换的文本");
        return;
      }
      this.loginRoNot();
      this.dialogVisible = true;
      this.isTime = true;
      this.t_time = setInterval(() => {
        this.timer += 1;
      }, 1000);
      let speech_rate; //语速
      let pitch_rate; //语调
      if (this.engine.engine_name == "基础版" || this.engine.engine_name == "进阶版") {
        speech_rate = parseFloat((this.speed * (4 - 0.25)) / 100 + 0.25);
        pitch_rate = parseFloat((this.tone * (4 - 0.25)) / 100 + 0.25);
      } else if (this.engine.engine_name == "阿里云") {
        speech_rate = parseInt((this.speed - 50) * 10);
        pitch_rate = parseInt((this.tone - 50) * 10);
      } else if (this.engine.engine_name == "百度") {
        speech_rate = parseInt((this.speed / 100) * 15);
        pitch_rate = parseInt((this.tone / 100) * 15);
      } else {
        speech_rate = this.speed;
        pitch_rate = this.tone;
      }
      console.log(typeof speech_rate, typeof pitch_rate);
      let requestData = {
        engine_code: this.engine.engine_code, //# 引擎编号
        voice_code: this.announcer.voice_code, //# 音色编号
        content: this.textarea, // # 内容
        language: "", //# 语言，非必传，没有不传
        speech_rate, //# 语速, 详情见下方
        pitch_rate, //# 语调
      };
      voiceSynthesis(requestData).then((res) => {
        if (res.code == 20000) {
          this.resultVoice(`h_code=${res.data.h_code}`);
        } else {
          this.$message.error("网络错误，请稍后重试...");
          clearInterval(this.t_time);
          this.t_time = null;
          this.isTime = false;
          this.dialogVisible = false;
        }
        console.log(res);
      });
    },
    // 合成结果查询
    resultVoice(code) {
      let h_code = code;
      getVoiceResult(h_code).then((res) => {
        console.log(res, "--结果查询");
        if (res.data.h_status == 1) {
          setTimeout(() => {
            this.resultVoice(h_code);
          }, 1000);
        } else if (res.data.h_status == 2) {
          clearInterval(this.t_time);
          this.t_time = null;
          this.isTime = false;
          this.dialogVisible = false;
          let obj = {
            speech_url: res.data.speech_url,
          };
          this.voiceData = obj;
          console.log(res, "--成功");
          this.getVoiceHistory();
        } else if (res.data.h_status == 3) {
          this.$message.error("网络异常，请稍后重试");
          clearInterval(this.t_time);
          this.t_time = null;
          this.isTime = false;
          this.dialogVisible = false;
          return;
        } else {
          setTimeout(() => {
            this.resultVoice(h_code);
          }, 1000);
        }
      });
    },
    stopAudio() {
      this.stop = false;
      const audioElement = this.$refs.audioElement; // 获取音频元素的引用
      audioElement.pause(); // 暂停音频
    },
    //播放音频
    playAudio(val) {
      // console.log(this.announcer.speech_url, '路径')
      if (val === 2) {
        const audioElement = this.$refs.audioElementDialog; // 获取音频元素的引用
        audioElement.currentTime = 0; // 将音频的播放位置设置为开头
        audioElement.play(); // 播放音频
      } else if (val === 1) {
        this.stop = true;
        const audioElement = this.$refs.audioElement; // 获取音频元素的引用
        audioElement.currentTime = 0; // 将音频的播放位置设置为开头
        audioElement.play(); // 播放音频
      } else {
        console.log(val[0]);
        const audioElement = this.$refs.audioHistory[val[0]]; // 获取音频元素的引用
        audioElement.currentTime = 0; // 将音频的播放位置设置为开头
        audioElement.play(); // 播放音频
      }
    },
    // 获取详情
    getDetail(val) {
      getVoiceDetail(val).then((res) => {
        if (res.code == 20000) {
          let data = res.data;
          let engine = {
            engine_code: data.engine_code,
            engine_name: data.engine_name,
          };
          this.engine = engine;
          this.announcer.voice_name = data.voice_name;
          this.announcer.voice_logo = data.voice_logo;
          this.announcer.voice_code = data.voice_code;
          let obj = {
            speech_url: data.speech_url,
          };
          this.voiceData = obj;
          this.textarea = data.content;
          let speech_rate;
          let pitch_rate;
          if (data.engine_name == "基础版" || data.engine_name == "进阶版") {
            speech_rate = parseInt(
              ((data.speech_rate - 0.25) * (100 - 0)) / (4 - 0.25) + 0
            );
            pitch_rate = parseInt(
              ((data.pitch_rate - 0.25) * (100 - 0)) / (4 - 0.25) + 0
            );
          } else if (data.engine_name == "阿里云") {
            // speech_rate = parseInt((data.speech_rate - 10) * 50);
            // pitch_rate = parseInt((data.pitch_rate - 10) * 50);

            speech_rate = parseInt((data.speech_rate * 50 + 10) / 10 + 50);
            pitch_rate = parseInt((data.pitch_rate * 50 + 10) / 10 + 50);
          } else if (data.engine_name == "百度") {
            speech_rate = parseInt((data.speech_rate / 15) * 100);
            pitch_rate = parseInt((data.pitch_rate / 15) * 100);
          } else {
            speech_rate = data.speech_rate;
            pitch_rate = data.pitch_rate;
          }
          this.speed = speech_rate;
          this.tone = pitch_rate;
          // console.log(speech_rate, '--speech_rate', pitch_rate, '--pitch_rate', data.engine_name)
        }
      });
    },
    //删除语音合成
    deleteVoice(val) {
      this.$confirm("确认删除该记录?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteVoiceDetail(val).then((res) => {
            if (res.code == 20000) {
              this.getVoiceHistory();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //对话框点击确定
    handleCente() {
      console.log(this.announcerData[this.selectAnnouncer], "输出");
      this.announcer = this.announcerData[this.selectAnnouncer];
      this.announcerDialogVisible = false;
    },
    // 音调
    changeTone(val) {
      this.tone = val;
    },
    //语速
    changeSpeed(val) {
      this.speed = val;
    },
    // 下载音频
    async download(val) {
      const response = await fetch(httpUrls.ossUrl + val.speech_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "无忧智脑.mp3"; // 这里设置你想要的文件名
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>

<style scoped>
.domHover {
  cursor: pointer;
}

.vision {
  background-color: #f1f2f5;
  display: flex;
  height: calc(100vh - 100px);
  position: relative;
}

.vision .main {
  width: calc(100% - 340px);
  height: 100%;
  overflow-y: auto;
  z-index: 1;
  padding: 30px;
  box-sizing: border-box;
}

.main > div {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  background: white;
  border-radius: 8px;
}

.line {
  width: 3px;
  height: 16px;
  background: #1f64ff;
  margin-right: 10px;
}

.main > div > div {
  margin: 0px;
  width: 500px;
}

.main .title {
  display: flex;
  align-items: center;
  color: #393e45;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 24px */
}

.main .title div:first-child {
  margin-right: 15px;
}

.title > div:nth-child(2) {
  margin-right: 5px;
}

.title img {
  width: 16px;
  height: 16px;
  margin-top: 6px;
}

.main .text {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.el-textarea {
  border: 0px !important;
}

/deep/ .el-textarea__inner {
  border: 0px !important;
}

.main .prompt {
  margin-top: 10px;
  color: #b7b9c0;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 18px */
}

.main .centent {
  margin: 20px auto;
  box-sizing: border-box;
}

.centent-title {
  display: flex;
  align-items: center;
  color: #393e45;

  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 24px */
}

.centent-tips {
  color: #b7b9c0;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin: 0px;
  text-align: start;
  margin-top: 4px;
  /* 18px */
}

.centent .select-Engine {
  margin-top: 10px;
  margin-bottom: 24px;
  display: flex;
}

.engine-box {
  width: 82px;
  line-height: 38px;
  text-align: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #f6f6f6;
  margin-right: 10px;
  cursor: pointer;
}

.select-engine {
  color: #1f64ff !important;
  background: rgba(31, 100, 255, 0.15) !important;
}

.announcer-title {
  display: flex;
  align-items: center;
  color: #393e45;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  /* 24px */
}

.announcer-box {
  margin-top: 12px;
  width: 358px;
  height: 84px;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  box-sizing: border-box;
  border: 1px solid #eceff2;
  border-radius: 8px;
}

.announcer-people {
  display: flex;
}

.announcer-people img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.announcer-people > div {
  color: #000;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
}

.announcer-people > div div:last-child {
  color: #adb0b6;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 6px;
  /* 21px */
}

.announcer-btn {
  display: flex;
  color: #000;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
  margin-right: 20px;
}

.announcer-btn img {
  width: 24px;
  height: 24px;
}

.announcer-btn > div:first-child {
  margin-right: 26px;
}

.announcer-slider > div {
  display: flex;
  color: #000;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  justify-content: space-between;
}

.announcer-slider > div > div:first-child {
  line-height: 38px;
}

.announcer-slider > div > div:nth-child(2) {
  width: 82%;
}

.announcer-slider > div > div:last-child {
  line-height: 38px;
}

.select-announcer {
  max-height: 435px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}

.select-box {
  width: 82px;
  height: 101px;
  padding-top: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #eceff2;
  background: #fff;
  margin-bottom: 9px;
  margin-right: 10px;
}

.select-box img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.select-box div:nth-child(2) {
  color: #333;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
}

.select-box div:nth-child(3) {
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
}

/* .submit-title {
  font-size: 13px;
  text-align: center;
} */
.submit {
  margin-top: 35px;
}
.priceToken {
  font-size: 13px;
  color: #999;
  width: 100%;
  margin-bottom: 8px;
  text-align: center;
}
.submit-btn {
  width: 380px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  /* 27px */
  letter-spacing: 0.18px;
  border-radius: 6px;
  background: #1f64ff;
  margin: auto;
  /* margin-top: 35px; */

  box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.1);
}

/deep/ .el-dialog__body {
  padding-bottom: 0px !important;
}

/* 左边内容 */
.vision .work_area {
  width: 340px;
  height: 100%;
  overflow-y: hidden;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
}

.work-title {
  color: #333;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.work-line {
  width: 100%;
  background: #efeff2;
  height: 1px;
  margin-top: 4px;
}

.work-input {
  margin-top: 16px;
}

.work-input .el-input {
  height: 40px !important;
  padding: 5px 0px !important;
  box-sizing: border-box !important;
}

/deep/ .el-input__inner {
  width: 100%;
  height: 100%;
  background: var(--light-fill-color-fill-2, #f2f3f5) !important;
}

/deep/ .el-input__suffix {
  height: 35px;
  left: 270px;
  top: 0px;
}

#history-list {
  box-sizing: border-box;
  height: calc(100% - 70px);
  overflow-y: auto;
}

.history-mask {
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.history-box {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #f5f5f5;
  background: #fff;
  margin-top: 16px;
}

.history-title {
  color: #000;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 13px;
  /* 24px */
}

.history-content > div {
  display: flex;
  justify-content: space-between;
  /* line-height: 33px; */
  margin-bottom: 9px;
}
.history-content > div:first-child > div:first-child {
  width: 28px;
}
.history-content > div:first-child > div:last-child {
  width: calc(100% - 32px);
}
.history-content > div:first-child > div:last-child > div:first-child {
  width: calc(100% - 24px);
}
.history-content > div div:first-child {
  color: #a4a4a4;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* 21px */
}

.history-content > div div:last-child {
  display: flex;
}

.history-content > div div:last-child div:first-child {
  color: #000;
  text-align: right;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  /* 21px */
}

.history-content > div div:last-child div:last-child {
  position: relative;
  top: -2px;
}

.history-bottom {
  display: flex;
  justify-content: space-between;
}

.history-bottom button {
  color: #1f64ff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  /* 171.429% */
  /* width: 96px; */
  padding: 6px 23px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #1f64ff;
  background: #fff;
}

.noHistory {
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8d8c8f;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
  /* 21px */
}

.loading-Bg /deep/ .el-dialog__header {
  padding: 0px;
}

.loading-Bg /deep/ .el-dialog__header,
.loading-Bg /deep/ .el-dialog__body {
  background-color: black;
}

.loading-text {
  color: white;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 30px;
}

.audio {
  width: 100%;
  margin: 15px 0px;
}

.audio audio {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.modal {
  background: balck;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  position: relative;
  width: 50px;
  height: 50px;

  div {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    position: absolute;
    width: 5px;
    height: 20px;
    border-radius: 5px;
    background-color: white;
    animation: loading-spin 1s infinite;
  }
}

@keyframes loading-spin {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.loading .item1 {
  transform: rotate(30deg) translate(0, -120%);
  animation-delay: 1.1s;
}

.loading .item2 {
  transform: rotate(60deg) translate(0, -120%);
  animation-delay: 1s;
}

.loading .item3 {
  transform: rotate(90deg) translate(0, -120%);
  animation-delay: 0.9s;
}

.loading .item4 {
  transform: rotate(120deg) translate(0, -120%);
  animation-delay: 0.8s;
}

.loading .item5 {
  transform: rotate(150deg) translate(0, -120%);
  animation-delay: 0.7s;
}

.loading .item6 {
  transform: rotate(180deg) translate(0, -120%);
  animation-delay: 0.6s;
}

.loading .item7 {
  transform: rotate(210deg) translate(0, -120%);
  animation-delay: 0.5s;
}

.loading .item8 {
  transform: rotate(240deg) translate(0, -120%);
  animation-delay: 0.4s;
}

.loading .item9 {
  transform: rotate(270deg) translate(0, -120%);
  animation-delay: 0.3s;
}

.loading .item10 {
  transform: rotate(300deg) translate(0, -120%);
  animation-delay: 0.2s;
}

.loading .item11 {
  transform: rotate(330deg) translate(0, -120%);
  animation-delay: 0.1s;
}

.loading .item12 {
  transform: rotate(360deg) translate(0, -120%);
  animation-delay: 0s;
}
</style>
