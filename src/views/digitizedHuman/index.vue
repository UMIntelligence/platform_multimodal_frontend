<template>
  <div class="digitized-human" ref="innerFarther">
    <div ref="innersan">
      <div class="top_mask">
        <img class="bg_img" src="../../assets/images/digitizedHumanIcon_bg1.png" alt="">
        <div class="writing_mask">
          <div class="titlee">数字人定制 想象无界</div>
          <div class="contet">平台提供虚拟数字人定制、AI短视频内容生产和数字人直播一站式解决方案。</div>
          <div class="btn_icon" @click="writeMsg">立即体验 <i class="el-icon-arrow-right"></i></div>
        </div>
        <div class="img_mask">
          <img class="imag" src="../../assets/images/2023-08-1112.021.png" alt="">
        </div>
      </div>
  
      <div class="index_main">
        <img class="main_bg-img" src="../../assets/images/digitizedHumanIcon_bg2.png" alt="">
        <div class="big_title">超写实数字人<span style="color: #1F64FF;">量身定制</span></div>
        <div class="little_title">为企业提供专属数字人定制服务，无需真人出镜，减少线下人力物力成本。定制化的数字人口型与配音字幕同步，符合多种场景需求。</div>
        <div class="ability_list">
          <div class="item" style="margin-right: 20px;">
            <div class="item-top">
              <div class="item-big-title">形象克隆</div>
              <div class="item-little-title">上传一张照片或一段视频，使数字人生成效果更好</div>
              <div class="bg_writing">People</div>
            </div>
            <div class="left">
              <div class="example">
                <div class="eg" style="margin-right: 8px;">
                  <img class="img" src="../../assets/images/iem1.png" alt="">
                  <div class="conent">
                    <div class="black-line">1</div> 
                    <div>上传一张照片或一段视频</div>
                  </div>
                </div>
                <div class="eg" style="margin-left: 8px;">
                  <div class="play_video">
                    <video style="width: 166px;height: 250px;" ref="videoHeight">
                      <source :src="httpUrls.ossUrl + 'static/picture/28e20070-2755-427e-ad25-ba4e3d122198.mp4'" type="video/mp4">
                    </video>
                    <div class="video_pause" v-if="videoPlay" @click="videoPause" style="position: absolute;left: 50%;top: 50%;transform: translateX(-50%) translateY(-50%);font-size: 30px;">
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19" cy="19" r="19" fill="black" fill-opacity="0.3"/>
                        <rect x="12.5" y="11" width="4" height="16" rx="1" fill="white"/>
                        <rect x="21.5" y="11" width="4" height="16" rx="1" fill="white"/>
                      </svg>
                    </div>
                    <div v-else style="position: absolute;left: 50%;top: 50%;transform: translateX(-50%) translateY(-50%);font-size: 30px;" @click="videoOnPlay">
                      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <circle cx="19" cy="19" r="19" fill="black" fill-opacity="0.3"/>
                        <path d="M13 28.1034V11.8406C13 11.0476 13.8789 10.5701 14.5442 11.0016L26.7413 18.9133C27.34 19.3016 27.3509 20.1742 26.762 20.5773L14.565 28.9285C13.9013 29.3829 13 28.9077 13 28.1034Z" fill="white"/>
                      </svg>
                    </div>
                    <!-- <i v-if="videoPlay" class="el-icon-video-pause video_pause" @click="videoPause"></i>
                    <i v-else class="el-icon-video-play" style="position: absolute;left: 50%;top: 50%;transform: translateX(-50%) translateY(-50%);font-size: 30px;" @click="videoOnPlay"></i> -->
                  </div>
                  <!-- <img class="img" src="../../assets/images/iem2.png" alt=""> -->
                  <div class="conent">
                    <div class="black-line">2</div>
                    <div>提交定制</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="title">形象克隆</div>
                <div class="contet">
                  <div style="margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_3087_20861)"/>
                      <path d="M15.5 7.6875L8.625 14.5625L5.5 11.4375" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <defs>
                        <linearGradient id="paint0_linear_3087_20861" x1="11.5" y1="16" x2="18.5" y2="-5" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#C7D9FF"/>
                          <stop offset="1" stop-color="#F9FBFF"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span>上传一张照片或一段视频</span>
                </div>
                <div class="contet">
                  <div style="margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_3087_20861)"/>
                      <path d="M15.5 7.6875L8.625 14.5625L5.5 11.4375" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <defs>
                        <linearGradient id="paint0_linear_3087_20861" x1="11.5" y1="16" x2="18.5" y2="-5" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#C7D9FF"/>
                          <stop offset="1" stop-color="#F9FBFF"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span>通过照片驱动训练为您生成专属数字人</span>
                </div>
                <div class="btn">
                  <!-- <el-upload
                    class="upload-demo"
                    ref="userData"
                    :show-file-list="false"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                    :data="requestMsg"
                    :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, 1)"
                    :on-change="handleChange">
                  </el-upload> -->
                  <el-button type="primary" @click="toProduceIndexPage">开始定制</el-button>
                  <div class="make-money">
                    <!-- <span class="money">{{ productList[0].prod_price }}/</span><span class="text">次</span> -->
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item" style="margin-left: 20px;">
            <div class="item-top">
              <div class="item-big-title">声音克隆</div>
              <div class="item-little-title">上传多段1-3分钟左右的音频，使克隆效果更好</div>
              <div class="bg_writing">Voice</div>
            </div>
            <div class="left">
              <div class="example">
                <div class="eg" style="margin-right: 8px;">
                  <img class="img" src="../../assets/images/iem3.png" alt="">
                  <div class="conent">
                    <div class="black-line">1</div>
                    <div>上传多段1-3分钟音频</div>
                  </div>
                </div>
                <div class="eg" style="margin-left: 8px;">
                  <div style="width: 167px;height: 250px;position: relative;">
                    <img class="img" src="../../assets/images/iem4.png" alt="" style="position: absolute;width: 100%;height: 100%;">
                    <div style="width: 100%;display: flex;position: absolute;height: 124px;bottom: 0;font-size: 24px;justify-content: center;flex-direction: column;align-items: center;">
                      <div style="display: flex;align-items: center;height: 62px;width: 50%;">
                        <i v-if="yuanshengPlay" class="el-icon-video-pause" @click="yuanshengPause"></i>
                        <i v-else class="el-icon-video-play" @click="yuanshengOnPlay"></i>
                        <span style="font-size: 14px;">原生</span>
                      </div>
                      <div style="display: flex;align-items: center;height: 62px;width: 50%;">
                        <i v-if="kelongPlay" class="el-icon-video-pause" @click="kelongPause"></i>
                        <i v-else class="el-icon-video-play" @click="kelongPlays"></i>
                        <span style="font-size: 14px;">克隆声音</span>
                      </div>
                    </div>
                  </div>
                  <div class="conent">
                    <div class="black-line">2</div>
                    <div>提交定制</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="title">声音克隆</div>
                <div class="contet">
                  <div style="margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_3087_20861)"/>
                      <path d="M15.5 7.6875L8.625 14.5625L5.5 11.4375" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <defs>
                        <linearGradient id="paint0_linear_3087_20861" x1="11.5" y1="16" x2="18.5" y2="-5" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#C7D9FF"/>
                          <stop offset="1" stop-color="#F9FBFF"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span>上传多段1-3分钟左右音频</span>
                </div>
                <div class="contet">
                  <div style="margin-right: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_3087_20861)"/>
                      <path d="M15.5 7.6875L8.625 14.5625L5.5 11.4375" stroke="#1F64FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <defs>
                        <linearGradient id="paint0_linear_3087_20861" x1="11.5" y1="16" x2="18.5" y2="-5" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#C7D9FF"/>
                          <stop offset="1" stop-color="#F9FBFF"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span>通过A智能学习训练，快速为您生成原声音</span>
                </div>
                <div class="btn">
                  <!-- <el-upload
                    class="upload-demo"
                    ref="userData"
                    :show-file-list="false"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                    :data="requestMsg"
                    :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, 2)"
                    :on-change="handleChange">
                  </el-upload> -->
                  <!-- <el-button type="primary" @click="$message('更多功能正在开发中，敬请期待！')">开始定制</el-button> -->
                  <el-button type="primary" @click="toMineAudio">开始定制</el-button>
                  <div class="make-money">
                    <!-- <span class="money">{{ productList[1].prod_price }}/</span><span class="text">次</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="file_list">
          <div class="file_title">定制记录</div>
          <div class="mask">
            <div class="item" v-for="(item, i) in historyFileList">
                <div class="lit-item">
                  <span>{{ item.live_name }}</span>
                </div>
                <div class="lit-item">
                  <span>价格</span>
                  <span>{{ productList[0].prod_price }}</span>
                </div>
                <div class="lit-item">
                  <span>创建时间</span>
                  <span>{{ item.create_time }}</span>
                </div>
            </div>
          </div>
        </div> -->
        <div style="font-size: 12px;color: #999999;display: flex;justify-content: center;margin-top: 30px;padding-bottom: 10px;">版权所有© 深圳找房网络科技有限公司<a href="https://beian.miit.gov.cn/" target="_blank" style="color: #999999;">粤ICP备15038827号-3</a> |<span @click="$refs.Agree.agreeVisibleThree = true">《免责声明》</span></div>
      </div>
    </div>

    <el-dialog
      top="25vh"
      title="立即体验"
      :visible.sync="dialogVisible"
      width="450px"
      class="write_user_msg">
      <div class="write-msg-title">填写个人信息后，我们会在1个工作日联系</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="write-form-msg">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入您的联系电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <Agree ref="Agree"></Agree>

    <!-- 原声 -->
    <audio :src="httpUrls.ossUrl + 'static/picture/e8a2f932-d17a-4e0b-9297-e14f52a16576.mp3'" id="yuanshen"></audio>

    <!-- 克隆 -->
    <audio :src="httpUrls.ossUrl + 'static/picture/db634aa5-a006-40b1-aae6-3880db20dceb.mp3'" id="kelong"></audio>

    <register ref="register"></register>
  </div>
</template>

<script>
import register from '../../components/register'
import httpUrls from '../../api/requestURL'
import Agree from '../../components/Agree'
import { digitalHumanUploadFile, digitalHumanExperience, digitalHumanFileList, digitalHumanDeleteFile, digitalHumanCloneList } from '../../api/digitizedHuman'
import { products } from '../../api/chatMG'
export default {
  name: 'digitizedHuman',
  data() {
    var avatar = (rule, value, callback) => {
      var TEL_REGEXP = /^1[3-9]\d{9}$/;
      if(!TEL_REGEXP.test(value)){
        callback('手机格式不正确')
      } else {
        callback();
      }
    }
    return {
      httpUrls,
      dialogVisible: false,
      ruleForm: {
        name: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: '请输入您的姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
          {validator: avatar, trigger: 'blur'}
        ],
      },
      requestMsg: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'digitized_human'
      },
      productList: [],
      historyFileList: [],
      page: 1,
      pageSize: 10,
      scrollLoading: false,

      yuanshengPlay: false,
      kelongPlay: false,
      videoPlay: false,
    }
  },

  components: {
    Agree,
    register
  },

  created() {
    this.products()
    // this.digitalHumanFileList()
  },
  
  mounted() {
    this.$nextTick(() => {
      this.$refs.innerFarther.addEventListener('scroll', this.onscrollChange)
    })
  },

  methods: {
    toProduceIndexPage() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo.role == 'guess') {
        this.$refs.register.registerVisible = true
      } else {
        this.$router.push('/digitizedHuman/produceIndex')
      }
    },
    toMineAudio() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo.role == 'guess') {
        this.$refs.register.registerVisible = true
      } else {
        this.$router.push('/digitizedHuman/mineAudio')
      }
    },
    onscrollChange(e) {
      let clientHeight = this.$refs.innerFarther.clientHeight
      if (e.target.scrollTop + clientHeight >= this.$refs.innersan.offsetHeight) {
        if (this.scrollLoading) return
        this.scrollLoading = true
        setTimeout(() => {
          this.scrollLoading = false
        }, 1000);
        // this.digitalHumanFileList()
      }
    },

    writeMsg() {
      this.dialogVisible = true
      this.ruleForm = {
        name: '',
        phone: ''
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          let data = {
            user_name: this.ruleForm.name,
            mobile: this.ruleForm.phone
          }
          digitalHumanExperience(data).then(res => {
            if (res.code == 20000) {
              this.ruleForm = {
                name: '',
                phone: ''
              }
              this.dialogVisible = false
              this.$message.success('提交成功')
            } else if (res.code > 20000 && res.code < 50000) {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },

    handleChange(file, fileList) {
      this.requestMsg.image = file.raw
      this.requestMsg.image_name = file.name
    },

    handleSuccess(response, file, fileList, type) {
      console.log(file);
      let fileType = 1
      if (file.raw.type == 'iamge/jpeg' || file.raw.type == 'image/png' || file.raw.type == 'image/jpg') {
        fileType = 1
      } else if (file.raw.type == 'audio/mpeg' || file.raw.type == 'audio/wav') {
        fileType = 2
      } else if (file.raw.type == 'video/mp4') {
        fileType = 3
      }
      let data = {
        file_url: response.data.new_url,
        f_type: type,
        file_name: response.data.name,
        file_type: fileType,
      }
      digitalHumanUploadFile(data).then(res => {
        if (res.code == 20000) {
          this.$message.success('上传成功')
          this.$refs.userData.clearFiles()
          this.page = 1
          // this.digitalHumanFileList()
        }
      })
    },

    digitalHumanFileList() {
      digitalHumanCloneList(`page=${this.page}&page_size=${this.pageSize}`).then(res => {
        if (this.page == 1) {
          this.historyFileList = []
          setTimeout(() => {
            this.historyFileList = res.data.data
          }, 0);
        } else {
          this.historyFileList = this.historyFileList.concat(res.data.data)
        }
        this.page += 1
      })
    },

    products() {
      products({prod_cate_id: [7]}).then(res => {
        console.log(res,'############');
        this.productList = res.data[7]
      }).catch(err => {
          this.$message.error('获取失败！')
      })
    },

    deleteFileItem(item, i) {
      digitalHumanDeleteFile(item.file_code).then(res => {
        if (res.code == 20000) {
          this.historyFileList.splice(i, 1)
        }
      })
    },

    yuanshengPause() {
      let kelong = document.getElementById('kelong')
      kelong.pause()
      this.$refs.videoHeight.pause()
      let yuanshen = document.getElementById('yuanshen')
      yuanshen.pause()
      this.yuanshengPlay = false
    },

    yuanshengOnPlay() {
      let kelong = document.getElementById('kelong')
      kelong.pause()
      this.$refs.videoHeight.pause()
      let yuanshen = document.getElementById('yuanshen')
      yuanshen.play()
      this.kelongPlay = false
      this.videoPlay = false
      this.yuanshengPlay = true
    },

    kelongPause() {
      this.$refs.videoHeight.pause()
      let yuanshen = document.getElementById('yuanshen')
      yuanshen.pause()
      let kelong = document.getElementById('kelong')
      kelong.pause()
      this.kelongPlay = false
    },

    kelongPlays() {
      let yuanshen = document.getElementById('yuanshen')
      yuanshen.pause()
      this.$refs.videoHeight.pause()
      let kelong = document.getElementById('kelong')
      kelong.play()
      this.yuanshengPlay = false
      this.videoPlay = false
      this.kelongPlay = true
    },

    videoPause() {
      let yuanshen = document.getElementById('yuanshen')
      yuanshen.pause()
      let kelong = document.getElementById('kelong')
      kelong.pause()
      this.$refs.videoHeight.pause()
      this.videoPlay = false
    },
    
    videoOnPlay() {
      let yuanshen = document.getElementById('yuanshen')
      yuanshen.pause()
      let kelong = document.getElementById('kelong')
      kelong.pause()
      this.$refs.videoHeight.play()
      this.kelongPlay = false
      this.yuanshengPlay = false
      this.videoPlay = true
    },
  },
}
</script>

<style scoped>
.digitized-human {
  height: 100%;
  overflow-y: auto;
  /* min-width: 1676px; */
}

.digitized-human::-webkit-scrollbar {
  height: 20px;
}

.top_mask {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.bg_img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -1;
}

.writing_mask {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-right: 60px;
}

.writing_mask .titlee {
  color: #FFF;
  font-size: 32px;
  font-weight: 600;
}

.writing_mask .contet {
  color: #FFF;
  font-size: 14px;
  font-weight: 400;
  margin: 15px 0 26px 0;
  max-width: 410px;
}

.writing_mask .btn_icon {
  border-radius: 4px;
  background: #FFF;
  padding: 12px 24px;
  color: #1F64FF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.img_mask {
  margin: 50px 0;
  margin-left: 60px;
}

.index_main {
  position: relative;
}

.main_bg-img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.index_main .big_title {
  color: #333;
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  padding-top: 40px;
}

.index_main .little_title {
  color: #333;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
}

.ability_list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 60px;
}

.ability_list .item {
  width: 40%;
}

@media (width < 1620px) {
  .ability_list .item {
    width: 80%;
    margin: 0 0 20px 0 !important;
  } 
}

.ability_list .item .item-top {
  padding: 24px 40px 32px 40px;
  border-radius: 8px 8px 0px 0px;
  background: #1F64FF;
  color: #FFF;
  position: relative;
}

.item-big-title {
  color: #FFF;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
}

.item-little-title {
  color: #FFF;
  font-size: 16px;
  font-weight: 400;
}

.bg_writing {
  font-size: 100px;
  font-weight: 600;
  letter-spacing: 5px;
  background: linear-gradient(91deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  right: 0;
  bottom: -26px;
}

.ability_list .item .left {
  padding: 30px;
  display: flex;
  border-radius: 8px;
  border: 1.5px solid #FFF;
  background: linear-gradient(180deg, #D5E2FC 0%, #FFF 100%);
}

.black-line {
  line-height: 18px;
  text-align: center;
  background-color: #000;
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 8px;
}

.ability_list .item .left .example {
  display: flex;
  margin-right: 30px;
}

.eg .conent {
  display: flex;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  margin-top: 12px;
}

.ability_list .item .left .right {
  margin-left: 29px;
}

.ability_list .item .left .right .title {
  color: #505968;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
}

.ability_list .item .left .right .contet {
  color: #505968;
  font-size: 14px;
  font-weight: 400;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
}

.ability_list .item .left .right .btn {
  margin-top: 58px;
  display: flex;
  align-items: flex-end;
}

.ability_list .item .left .right .btn button {
  background-color: #1F64FF;
}

.make-money {
  margin-left: 10px;
  color: #F00;
  font-size: 20px;
  font-weight: 500;
  line-height: 150%; /* 30px */
}

.make-money .text {
  font-size: 16px;
}

.file_list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
}

.file_title {
  width: calc(80% + 40px);
  color: #000;
  font-size: 20px;
  font-weight: 500;
}

.file_list .mask {
  width: calc(80% + 60px);
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.file_list .mask .item {
  background-color: #FFF;
  margin: 0 10px;
  padding: 15px;
  min-width: calc(20% - 50px);
  border-radius: 8px;
  margin-top: 10px;
}

.lit-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
}

.lit-item:nth-child(1) {
  font-size: 18px;
  font-weight: bold;
}

.lit-item:nth-child(2), .lit-item:nth-child(3) {
  color: #666;
}

/* .file_list .mask .item .img-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}

.file_list .mask .item .img-list .item {
  display: flex;
  padding: 0;
  justify-content: space-between;
  width: 100%;
}

.file_list .mask .item .img-list .item:nth-child(2), .file_list .mask .item .img-list .item:nth-child(3) {
  color: #666;
} */

.file_list .mask .item .name {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 230px;
}

.write-msg-title {
  padding-bottom: 16px;
  border-bottom: 1px solid #F1F1F1;
  margin-bottom: 20px;
}

.play_video {
  width: 166px;
  height: 250px;
  position: relative;
}

.video_pause {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 30px;
}

.play_video:hover .video_pause {
  display: block;
}
</style>

<style>
.write_user_msg .el-dialog__title {
  color: #000;
  font-size: 15px;
  font-weight: 500;
}

.write_user_msg .el-dialog__body {
  padding-top: 0;
}

.write-form-msg .el-form-item__label {
  text-align: left;
}
</style>