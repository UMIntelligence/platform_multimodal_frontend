<template>
  <!-- 
    声音合成
   -->
  <div class="synthesis-audio">
    <div class="go-back-page">
      <div @click="$router.go(-1)" style="cursor: pointer;">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 600px;">
      <el-form-item label="活动名称" prop="text">
        <el-input v-model="ruleForm.text" type="textarea"  show-word-limit :maxlength="300" placeholder="单击编辑台词文本，最多300字" resize="none" :autosize="{minRows: 8, maxRows: 8}"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <span>音量</span>
          <el-slider v-model="ruleForm.volume" :min="0" :max="100"></el-slider>
        </div>
        <div>
          <span>语调</span>
          <el-slider v-model="ruleForm.intonation" :min="-500" :max="500"></el-slider>
        </div>
        <div>
          <span>语速</span>
          <el-slider v-model="ruleForm.speechSpeed" :min="-500" :max="500"></el-slider>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="btn-list-mask">
          <el-button type="primary" @click="submitForm('ruleForm')" style="height: 48px;width: 262px;border-radius: 6px;background: #1F64FF;box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);">开始合成</el-button>
          <div class="item" v-if="!isPlay" @click="playingAudio">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 9L17 13L11 17V9Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>播放</span>
          </div>
          <div class="item" v-if="isPlay" @click="pauseingAudio">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="15" y="8" width="2" height="10" rx="1" fill="black"/>
              <rect x="10" y="8" width="2" height="10" rx="1" fill="black"/>
            </svg>
            <span>暂停</span>
          </div>
          <div class="item" @click="downloadAudio">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15V3" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>下载</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <audio :src="httpUrls.ossUrl + cloneAuioUrl" ref="playAUdio"></audio>
  </div>
</template>

<script>
import { getaliToken, voiceCloneGenerateHistory } from '../../api/digitizedHuman'
import httpUrls from '../../api/requestURL'
export default {
  name: 'synthesis-aduio',
  data() {
    return {
      httpUrls,
      value2: 50,
      isPlay: false,
      cloneAuioUrl: '',
      ruleForm: {
        text: '',
        volume: 50,
        intonation: 0,
        speechSpeed: 0,
      },
      rules: {
        text: [
          { required: true, message: '请输入台本内容', trigger: 'blur' },
        ],
      },
    }
  },

  mounted() {
    this.$refs.playAUdio.addEventListener('ended', () => {
      this.isPlay = false
    })
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getaliToken().then(res => {
            let MINE_ADUIO_ITEM = JSON.parse(sessionStorage.getItem('MINE_ADUIO_ITEM'))
            let data = {
              live_script: this.ruleForm.text,
              model_id: MINE_ADUIO_ITEM.model_id,
              token: res.data.token,
              voice_code: MINE_ADUIO_ITEM.voice_code,
              volume: this.ruleForm.volume,
              time_length: this.ruleForm.speechSpeed,
              voice_name: this.ruleForm.intonation
            }
            voiceCloneGenerateHistory(data).then(respose => {
              console.log(res);
              if (res.code == 20000) {
                this.cloneAuioUrl = respose.data
                this.$message.success('合成成功')
              }
            })
          })
        }
      });
    },

    playingAudio() {
      if (this.cloneAuioUrl != '') {
        this.$refs.playAUdio.play()
        this.isPlay = true
      }
    },

    pauseingAudio() {
      if (this.cloneAuioUrl != '') {
        this.$refs.playAUdio.pause()
        this.isPlay = false
      }
    },

    downloadAudio() {
      window.open(httpUrls.ossUrl + this.cloneAuioUrl)
    }
  },
}
</script>

<style lang="scss" scoped>
.synthesis-audio {
  padding: 20px;

  .demo-ruleForm {
    margin-top: 80px;
    margin-left: 10%;
  }
}

.btn-list-mask {
  display: flex;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 40px;
    cursor: pointer;
  }
}

.go-back-page {
  display: flex;
}
</style>