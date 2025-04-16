<template>
  <div class="eidt-video">
    <div style="margin-top: 20px;width: 100%;cursor: pointer;">
      <div @click="$router.go(-1)" style="margin-left: 20px;">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>
    <div class="mask">
      <video style="max-width: 690px;" ref="videoHeight" :autoplay="true" v-if="videoItem.file_type == 3" controls>
        <source :src="httpUrls.ossUrl + videoItem.audio_url" type="video/mp4">
      </video>
      <div style="margin: 20px 0;display: flex;justify-content: flex-start;align-items: center;">
        <div v-if="editTitle" style="font-size: 20px;color: #000;font-weight: 500;margin-right: 10px;">{{ videoItem.title }}</div>
        <i v-if="editTitle" class="el-icon-edit" @click="clickEditTitle"></i>
        <el-input v-if="!editTitle" v-model="videoItem.title" ref="eidtTitle" @keyup.enter.native="inputBlur"></el-input>
      </div>

      <div style="margin-bottom: 112px;">
        <div v-if="editContent" class="video-content" :style="{'--a' : videoHeight + 'px'}"> {{ videoItem.speech_text }}</div>
        <el-input ref="textAreaVideo" :autosize="{minRows: 6}" v-if="!editContent" v-model="videoItem.speech_text" type="textarea"></el-input>
      </div>
      
      <div v-if="videoItem.file_type == 2" style="padding: 10px;display: flex;align-items: center;justify-content: space-between;position: absolute;bottom: 112px;width: 45%;background-color: #FFF;transform: translateX(-50%);left: 50%;" ref="videoHeight">
        <i v-if="showPlay" class="el-icon-video-pause" style="font-size: 24px;cursor: pointer;margin-right: 10px;color: #1f64ff;" @click="playMusic"></i>
        <i v-else class="el-icon-video-play" style="font-size: 24px;cursor: pointer;margin-right: 20px;color: #1f64ff;" @click="stopMusic"></i>
        <el-slider class="video_silder-item" v-model="sliderValue" :show-tooltip="false" @change="handleChange" :min="0" :max="duration" style="width: calc(100% - 30px);"></el-slider>
      </div>

      <div style="left: 50%;transform: translateX(-50%);border-radius: 100px;z-index: 11;background: #FFF;box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.10);padding: 27px 0;display: flex;justify-content: center;position: absolute;bottom: 34px;width: 50%;">
        <img v-if="editContent" src="../../assets/images/editvideo.png" alt="" style="width: 24px;margin: 0 24px;" @click="eidtContent">
        <img v-if="!editContent" src="../../assets/images/savevideo.png" alt="" style="width: 24px;margin: 0 24px;" @click="editResult">
        <img src="../../assets/images/copyvideo.png" alt="" style="width: 24px;margin: 0 24px;" @click="copyText">
      </div>
      <div style="position: absolute;bottom: 0;height: 34px;z-index: 10;background-color: #FFF;"></div>
    </div>

    <audio :src="httpUrls.ossUrl + videoItem.audio_url" id="audio" style="display: none;"></audio>
  </div>
</template>

<script>
import { submitFootprint } from '../../api/chatMG'
import { audioEditResult, pcmToMP3 } from '../../api/video'
import httpUrls from '../../api/requestURL'
export default {
  name: 'deit-video',
  data() {
    return {
      httpUrls,
      videoItem: {},
      editTitle: true,
      editContent: true,
      showPlay: false,
      videoHeight: '',
      sliderValue: 0,
      duration: 0,
      t_time: false
    }
  },
  mounted() {
    this.videoItem = JSON.parse(sessionStorage.getItem('eidtVideoMsg'))
    let url = this.videoItem.audio_url.split('.')
    if (url[url.length - 1] == 'pcm') {
      pcmToMP3({
        pcm_url: this.videoItem.audio_url,
        suffix: 'wav'
      }).then(res => {
        this.videoItem.audio_url = res.data
      })
    }
    this.$nextTick(() => {
      this.videoHeight = this.$refs.videoHeight.offsetHeight + 144
    })
    // 创建识别任务
    // var url = URL.createObjectURL(file.raw);
    var audioElement = document.getElementById('audio');         
    audioElement.addEventListener("loadedmetadata", () => {           
      this.duration = parseInt(audioElement.duration) ; //时长为秒         
    });
    // audioElement.currentTime = 7
    // this.sliderValue = Math.floor(7 / 14 * 100)
  },

  methods: {
    submit() {
      this.editResult()
    },

    clickEditTitle() {
      this.editTitle = false
      this.$nextTick(() => {
        this.$refs.eidtTitle.focus()
      })
    },

    inputBlur() {
      this.editTitle = true
      this.editResult('input')
    },

    editResult(inp = '') {
      let data = {
        "title": this.videoItem.title,
        "audio_url": this.videoItem.audio_url,
        "speech_text": this.videoItem.speech_text,
        "r_status": 2
      }
      audioEditResult(data, this.videoItem.speech_code).then(res => {
        if (res.code == 20000) {
          this.$message.success('修改成功')
          this.editTitle = true
          if (inp != 'input') {
            this.editContent = !this.editContent
          }
          // 保存最近使用
          submitFootprint({
            type_name: '录音文件',
            type_code: 'real_file',
            image_url: this.videoItem.audio_url,
            title: this.videoItem.title,
            eid: this.videoItem.speech_code
          }).then(res => {})
        }
      })
    },

    eidtContent() {
      this.editContent = !this.editContent
      this.$nextTick(() => {
        this.$refs.textAreaVideo.focus()
      })
    },

    copyText() {
      var input = document.createElement("textarea"); // 创建input对象
      input.value = this.videoItem.speech_text; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');
    },

    handleChange(e) {
      this.$nextTick(() => {
        var audioElement = document.getElementById('audio');
        // var duration;
        // audioElement.addEventListener("loadedmetadata", () => {           
        //   duration = parseInt(audioElement.duration) ; //时长为秒         
        //   console.log(audioElement.duration, duration);
        // });
        // console.log(audioElement, e, duration, Math.floor(e / 100 * duration));
        audioElement.currentTime = e // 设置播放的时间
        this.stopMusic()
      })
    },

    playMusic() {
      clearInterval(this.t_time)
      let video = document.getElementById('audio')
      video.pause()
      this.showPlay = false
    },

    stopMusic() {
      let video = document.getElementById('audio')
      video.play()
      clearInterval(this.t_time)
      this.t_time = setInterval(() => {
        this.sliderValue++
        if (this.duration <= this.sliderValue) {
          clearInterval(this.t_time)
          this.showPlay = false
        }
      }, 1000);
      this.showPlay = true
    },
  },
}
</script>

<style scoped>
.eidt-video {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 34px;
  height: calc(100% - 34px);
}

.eidt-video .mask {
  width: 700px;
  height: 100%;
  overflow-y: auto;
}

.video-content {
  white-space: pre-wrap;
  font-size: 16px;
  font-weight: 400;
  color: #272C3D;
  max-height: calc(100% - var(--a));
  overflow-y: auto;
}
</style>

<style>
.video_silder-item .el-slider__button {
  border-color: #1f64ff;
}

.video_silder-item .el-slider__bar {
  background-color: #1f64ff;
}
</style>