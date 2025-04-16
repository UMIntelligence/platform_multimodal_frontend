<template>
  <!-- 
    克隆声音
   -->
  <div class="sreate-audio-clone">
    <div class="setps-line">
      <div class="item">
        <div class="mask">
          <div :class="steps >= 1 ? 'num num-on' : 'num'">1</div>
          <div :class="steps >= 1 ? 'title title-on' : 'title'">填写信息</div>
        </div>
        <div class="coneetent">填写基本信息</div>
      </div>
      <div :class="steps >= 1 ? 'line line-on' : 'line'"></div>
      <div class="item">
        <div class="mask">
          <div :class="steps >= 2 ? 'num num-on' : 'num'">2</div>
          <div :class="steps >= 2 ? 'title title-on' : 'title'">上传音频文件</div>
        </div>
        <div class="coneetent">请上传提前录制好的文件</div>
      </div>
      <div :class="steps >= 2 ? 'line line-on' : 'line'"></div>
      <div class="item">
        <div class="mask">
          <div :class="steps == 3 ? 'num num-on' : 'num'">3</div>
          <div :class="steps == 3 ? 'title title-on' : 'title'">等待声音训练&完成</div>
        </div>
        <div class="coneetent">约30分钟后即可训练完</div>
      </div>
    </div>

    <!-- 第一步 -->
    <div class="steps-item" v-if="steps == 1">
      <el-form :model="ruleFormBasic" :rules="rulesBasic" ref="ruleFormBasic" label-width="100px" class="demo-ruleForm">
        <el-form-item label="声音名称" prop="name">
          <el-input v-model="ruleFormBasic.name" placeholder="请输入专属声音名称 (可输入中文、英文、数字组合，不超过15字）"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <div style="display: flex;">
            <el-radio v-model="ruleFormBasic.gender" label="male" style="line-height: 40px;">男</el-radio>
            <el-radio v-model="ruleFormBasic.gender" label="female">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.push('/digitizedHuman/mineAudio')">我的声音</el-button>
          <el-button type="primary" @click="submitFormBasic('ruleFormBasic')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 第二步 -->
    <div class="steps-item" v-if="steps == 2">
      <el-form :model="ruleFormUploadAudio" :rules="rulesUploadAudio" ref="ruleFormUploadAudio" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="name">
          <div class="progress-mask">
            <el-progress style="width: calc(72% - 140px);" :percentage="readTextItemIndex * 5" :show-text="false"></el-progress>
            <span style="width: 140px;margin-left: 10px;">上传进度{{ readTextItemIndex }}/20</span>
          </div>
          <div style="display: flex;">
            <div class="exmple-mask">
              <div class="text">{{ readTextItem.Text }}</div>
              <div class="exmple-cont">
                <span style="margin-right: 10px;" @click="playExmpleAudio">录音示范</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" @click="playExmpleAudio">
                  <path d="M7.33398 3.33301L4.00065 5.99967H1.33398V9.99967H4.00065L7.33398 12.6663V3.33301Z" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.7127 3.28613C13.9625 4.53632 14.6646 6.23171 14.6646 7.99947C14.6646 9.76723 13.9625 11.4626 12.7127 12.7128M10.3594 5.63947C10.9843 6.26456 11.3353 7.11225 11.3353 7.99613C11.3353 8.88001 10.9843 9.72771 10.3594 10.3528" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-left: 20px;cursor: pointer;" @click="nextAudio">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9L15 13L9 17V9Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="17" y="8" width="2" height="10" rx="1" fill="black"/>
              </svg>
              <span>下一条</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="上传文件" prop="fileList">
          <el-upload
            class="upload-clone-audio"
            drag
            :headers="{
              authorization: userInfo.token
            }"
            ref="cloneUploadAudio"
            :show-file-list="false"
            :data="handleData"
            :limit="1"
            :fileList="ruleFormUploadAudio.fileList"
            :on-exceed="() => { return $message.error('请先点击下一条(上传文件必须和录音示范一一对应)') }"
            :action="httpUrls.httpUrl + 'api/sv_voice/audio_conversion'"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :before-upload="handleBeforeUpload"
            multiple>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 6L12 2L8 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 2V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="el-upload__text">上传音频文件</div>
            <div class="el-upload__tip" slot="tip">支持上传PCM、WAV格式音频文件，时长不超过10分钟，大小不超过20M</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item>
          <div class="audio_list">
            <div class="item" v-for="(item, i) in ruleFormUploadAudio.fileList" :key="i">
              <img class="delete-img" src="../../assets/images/trash.png" alt="" @click="deleteAduioItem(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 32 32" fill="none" v-if="item.play" @click="pauseAudio(item)">
                <circle cx="16" cy="16" r="16" fill="#1F64FF"/>
                <rect x="12" y="10.5" width="3" height="11" rx="1" fill="white"/>
                <rect x="17" y="10.5" width="3" height="11" rx="1" fill="white"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 32 32" fill="none" v-else @click="playAudio(item)">
                <circle cx="16" cy="16" r="16" fill="#1F64FF"/>
                <path d="M13 20.1727V11.7061C13 10.9421 13.822 10.4603 14.4886 10.8336L21.5441 14.7847C22.2032 15.1538 22.2308 16.0923 21.5946 16.4995L14.5391 21.015C13.8734 21.441 13 20.963 13 20.1727Z" fill="white"/>
              </svg>
              <div class="audio_msg">
                <div style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.name }}</div>
                <el-slider v-model="item.value"></el-slider>
              </div>
            </div>
          </div>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="$router.push('/digitizedHuman/mineAudio')">我的声音</el-button>
          <el-button v-if="audioStatus == 1" @click="submitFormUploadAudio('ruleFormUploadAudio')">立即支付</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 第三步 -->
    <div class="steps-item" v-if="steps == 3">
      <el-result icon="success" title="支付成功" subTitle="合成中，大约剩余30min，2秒回后跳转我的声音">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="$router.push('/digitizedHuman/produceIndex')">返回首页</el-button>
          <el-button type="primary" size="medium" @click="$router.push('/digitizedHuman/mineAudio')">我的声音</el-button>
        </template>
      </el-result>
    </div>
    
    <audio :src="readTextItem.DemoAudio" ref="stateAudio"></audio>

    <pay-public ref="PayPublic" :datas="payInfo" @payresultsuccess="payResultSuccess"></pay-public>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import payPublic from '../../components/payPublic'
import { getReadText, detectionCustomizedVoice, customizedVoiceCreateView, customizedVoiceDetailView } from '../../api/digitizedHuman'
import { products } from '../../api/chatMG'
export default {
  name: 'create-audio-clone',
  data() {
    return {
      httpUrls,
      steps: 1,
      audioStatus: 0,
      userInfo: {},
      liveAudioMsg: {},
      readTextList: [], // 获取的示例音频
      readTextItem: {}, // 当前选择的示例音频
      readTextItemIndex: 0, // 当前选择的示例音频下标
      audioFileState: true, // 音频文件是否正常
      isDetail: false, // 是否为详情
      ruleFormBasic: {
        name: '',
        gender: 'male',
      },
      rulesBasic: {
        name: [
          { required: true, message: '请输入声音名称', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择克隆的性别', trigger: 'blur' },
        ],
      },
      ruleFormUploadAudio: {
        fileList: [],
      },
      rulesUploadAudio: {
        fileList: [
          { required: true, message: '声音克隆需要20条录音', trigger: 'blur' },
        ],
      },

      handleData: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'digitized_human-audio_list'
      },

      payInfo: {},
    }
  },

  components: {
    payPublic
  },

  beforeDestroy() {
    sessionStorage.removeItem('MINE_ADUIO_ITEM')
  },

  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const MINE_ADUIO_ITEM = JSON.parse(sessionStorage.getItem('MINE_ADUIO_ITEM'))
    if (MINE_ADUIO_ITEM != undefined) {
      this.audioStatus = MINE_ADUIO_ITEM.voice_status
      this.liveAudioMsg = MINE_ADUIO_ITEM
      this.ruleFormBasic = {
        name: MINE_ADUIO_ITEM.voice_name,
        gender: MINE_ADUIO_ITEM.gender,
      },
      this.isDetail = true
      customizedVoiceDetailView(MINE_ADUIO_ITEM.id).then(res => {
        this.steps = 2
        if (res.data.voice_info == null || res.data.voice_info.length == 0) {
          this.readTextItemIndex = 0
        } else {
          this.readTextItemIndex = res.data.voice_info.length
          res.data.voice_info.forEach(v => {
            this.ruleFormUploadAudio.fileList.push({
              file_url: v.audio_record_id
            })
          })
        }
        this.getReadText(res.data.voice_info)
      })
    } else {
      this.getReadText()
    }
  },

  methods: {
    // 上传文件
    handleChange(file, fileList) {
      this.handleData.image = file.raw
      this.handleData.image_name = file.name
    },

    handleBeforeUpload(file) {
      if (file.size / 1024 / 1024 > 20) {
        this.$message.error('文件大小不能超过20M')
        return false
      }
      return true
    },

    // 文件上传成功
    handleSuccess(response, file, fileList) {
      // 判断之前的音频文件是否准确
      // 准确添加
      if (this.audioFileState) {
        this.ruleFormUploadAudio.fileList.push({
          file_url: this.readTextList[this.readTextItemIndex].audioId,
          // name: response.data.name,
          // play: false,
          // audioId: this.readTextItemIndex
        })
      } else {
        // 不准确替换
        this.ruleFormUploadAudio.fileList[this.readTextItemIndex].file_url = this.readTextList[this.readTextItemIndex].audioId
        // this.ruleFormUploadAudio.fileList[this.readTextItemIndex].name = response.data.name
      }
      // 根据下标替换当前音频文件信息
      this.readTextList[this.readTextItemIndex].file_url = response.data.oss_url
      this.readTextList[this.readTextItemIndex].name = response.data.name
      this.readTextList[this.readTextItemIndex].audioId = this.readTextItemIndex
      let data = {
        "voice_name": this.ruleFormBasic.name,
        "voice_list": [{
            "audio_record_url": response.data.oss_url,
            "audio_record_id": this.readTextList[this.readTextItemIndex].AudioId
          }],
        "gender": this.ruleFormBasic.gender
      }
      detectionCustomizedVoice(data).then(res => {
        if (res.code != 20000) {
          this.$message.error(res.msg)
          this.audioFileState = false
          this.$refs.cloneUploadAudio.clearFiles()
        } else {
          this.readTextItemIndex++
          this.audioFileState = true
          this.$message.success('添加成功')
        }
      })
    },

    // 提交表单
    submitFormBasic(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            voice_name: this.ruleFormBasic.name,
            gender: this.ruleFormBasic.gender
          }
          customizedVoiceCreateView(data).then(res => {
            if (res.code == 20000) {
              this.steps++
              this.audioStatus = res.data.voice_status
              this.liveAudioMsg = res.data
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        }
      });
    },

    // 清空表单
    resetFormBasic(formName) {
      this.$refs[formName].resetFields();
    },

    // 提价表单
    submitFormUploadAudio(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleFormUploadAudio.fileList.length != 20) {
            this.$message.error('音频文件不足！')
          } else {
            products({prod_cate_id: [7]}).then(res => {
              res.data[7][0]
              this.payInfo = {
                ...res.data[7][0],
                shopNumber: 1,
                totalPrice: res.data[7][0].prod_price,
                live_code: this.liveAudioMsg.voice_code,
                resetPay: 2,
                dataSource: 'human'
              }
              this.$refs.PayPublic.PayVisible = true
            })
          }
        }
      });
    },

    payResultSuccess() {
      this.$router.push('/digitizedHuman/mineAudio')
      this.steps++
    },

    // 清空表单
    resetFormUploadAudio(formName) {
      this.$refs[formName].resetFields();
    },

    // 获取示例列表
    getReadText(list) {
      getReadText().then(res => {
        this.readTextItem = res.data[this.readTextItemIndex == 20 ? 19 : this.readTextItemIndex]
        this.readTextList = res.data
        // 从详情进来
        if (this.isDetail && list != null) {
          this.readTextList.forEach((v, i) => {
            if (list[i] != undefined) {
              this.readTextList[i].file_url = list[i].audio_record_id
            }
          })
          this.$refs.cloneUploadAudio.clearFiles()
        }
      })
    },

    // 播放示例
    playExmpleAudio() {
      this.$refs.stateAudio.play()
    },

    // 下一步
    nextAudio() {
      if (this.ruleFormUploadAudio.fileList[this.readTextItemIndex - 1] == undefined || this.ruleFormUploadAudio.fileList[this.readTextItemIndex - 1].file_url == -1) {
        this.$message.error('请上传音频')
        return
      }
      if (!this.audioFileState) {
        this.$message.error('请上传一个正确的录音文件')
        return
      }
      if (this.ruleFormUploadAudio.fileList.length >= 20) {
        return
      }
      this.$refs.cloneUploadAudio.clearFiles()
      this.readTextItem = this.readTextList[this.readTextItemIndex]
    },

    deleteAduioItem(item) {
      this.readTextItemIndex = item.audioId
      this.readTextItem = this.readTextList[this.readTextItemIndex]
      this.ruleFormUploadAudio.fileList.forEach((v, i) => {
        if (v.audioId == item.audioId) {
          this.ruleFormUploadAudio.fileList[this.readTextItemIndex].file_url = -1
          // this.ruleFormUploadAudio.fileList[this.readTextItemIndex].name = ''
        }
      })
    },

    // pauseAudio(item) {},

    // playAudio(item) {},
  },
}
</script>

<style lang="scss" scoped>
.sreate-audio-clone {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.setps-line {
  display: flex;
  // align-items: center;
  margin-top: 40px;

  .line {
    background-color: #E5E6EB;
    height: 1px;
    width: 66px;
    margin: 0 12px;
    margin-top: 15px;
  }

  .line-on {
    background-color: #1F64FF;
  }

  .mask {
    display: flex;
    align-items: center;
  }
  .num {
    width: 28px;
    height: 28px;
    border-radius: 32px;
    background: #F2F3F5;
    color: #4E5969;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    margin-right: 12px;
  }

  .num-on {
    background: #1F64FF;
    color: #FFF;
  }

  .title {
    color: #4E5969;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  
  .title-on {
    color: #1D2129;
  }

  .coneetent {
    color: #4E5969;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px; /* 200% */
    margin-top: 7px;
  }
}

.steps-item {
  width: 600px;
  margin-top: 50px;
}

.progress-mask {
  display: flex;
  align-items: center;
}

.exmple-mask {
  width: 286px;
  height: 87px;
  border-radius: 10px;
  border: 1px solid #1F64FF;
  background: #F8F8FC;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .text {
    color: #838A9F;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */
  }

  .exmple-cont {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
}

.audio_list {
  width: 292px;
  .item {
    position: relative;
    border-radius: 8px;
    border: 1px solid #E1DFDF;
    background: #FFF;
    padding: 15px;
    display: flex;
    margin-bottom: 10px;

    .delete-img {
      position: absolute;
      right: 8px;
      top: 8px;
      cursor: pointer;
    }

    // svg {
    //   width: 54px;
    //   height: 54px;
    // }

    .audio_msg {
      width: calc(100% - 64px);
      margin-left: 20px;
    }
  }
}
</style>

<style lang="scss">
.upload-clone-audio {
  .el-upload-dragger {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 292px;
    height: 96px;
    border-radius: 8px;
    border: 1px dashed #E6E6E6;
    background: #F6F8FB;
  }
}
</style>