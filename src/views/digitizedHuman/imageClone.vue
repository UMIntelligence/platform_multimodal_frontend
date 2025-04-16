<template>
  <!-- 
    形象克隆
   -->
  <div class="image-clone">
    <div class="message-data">
      <div class="to-prev-page">
        <div class="mask" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="定制类型" prop="type">
          <el-input v-model="ruleForm.type" disabled style="width: 360px;"></el-input>
        </el-form-item> -->
        <el-form-item label="模特名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="训练视频" prop="trainVideo" style="margin-bottom: 50px;">
          <div class="video_mask-list">
            <div class="empower-templater">
              <div v-if="loading1" style="border-radius: 8px;display: flex;left: 0;top: 0;bottom: 0;right: 106px;z-index: 2;position: absolute;justify-content: center;align-items: center;background-color: rgba(0, 0, 0, 0.8)">
                <div style="display: flex;flex-direction: column;color: #1f64ff;align-items: center;">
                  <i class="el-icon-loading"></i>
                  <div>Loading</div>
                </div>
              </div>
              
              <div class="upload_vaidoe-success" v-if="ruleForm.trainVideo.length != 0">
                <!-- <i class="el-icon-error" style="cursor: pointer;" @click="deleteHumanVideo"></i> -->
                <video style="width: 360px;height: 211px;border: 1px solid #000;" ref="videoHeight" controls>
                  <source :src="httpUrls.ossUrl + ruleForm.trainVideo[0].file_url" type="video/mp4">
                </video>
              </div>
              <el-upload v-else class="upload-video-on" :show-file-list="false" drag accept=".mp4" :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                :file-list="ruleForm.trainVideo" :data="uploadData" :on-change="handleChangeVidoe" :before-upload="handleBeforeUpload" :headers="headerData"
                :on-success="handleSuccessVidoe" multiple>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
                    stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 6L12 2L8 6" stroke="#1F64FF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M12 2V15" stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div>上传视频</div>
                <div class="el-upload__tip" slot="tip" style="margin-top: 15px;line-height: 15px;">视频大小不超过100MB</div>
              </el-upload>
              <div style="width: 96px;margin-left: 8px;"></div>
            </div>

            <div class="case_video">
              <div class="title">案例视频</div>
              <div style="position: relative;">
                <!-- <svg @click="event => plauVideo(event)" xmlns="http://www.w3.org/2000/svg" style="z-index: 1;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <circle cx="19" cy="19" r="19" fill="black" fill-opacity="0.3"/>
                  <path d="M13 28.1034V11.8406C13 11.0476 13.8789 10.5701 14.5442 11.0016L26.7413 18.9133C27.34 19.3016 27.3509 20.1742 26.762 20.5773L14.565 28.9285C13.9013 29.3829 13 28.9077 13 28.1034Z" fill="white"/>
                </svg> -->
                <video style="width: 360px;height: 211px;" ref="videoHeight" controls>
                  <source src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/web/com/message_center/demo2.mp4" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </el-form-item>

        <!-- <el-form-item label="训练音频" prop="trainAudio">
          <el-upload
            style="width: 360px;"
            class="upload-demo"
            :data="uploadDataAudio"
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :on-remove="handleRemove"
            :on-change="handleAudioChange"
            :on-success="handleAudioSuccess"
            multiple
            :file-list="ruleForm.trainAudio">
            <el-button type="primary" style="background-color: transparent;color: #1f64ff;border-color: #1f64ff;padding: 10px 30px;">点击上传</el-button>
            <ul slot="tip" class="el-upload__tip">
              <li>录音文件需打包后上传，支持.zip和.rar格式</li>
              <li>小贴士：录音可上传多条，总时长需大于20分钟</li>
            </ul>
          </el-upload>
        </el-form-item> -->

        <el-form-item label="形象授权" prop="empowerVideo">
          <div class="video_mask-list">
            <div class="empower-templater">
              <div v-if="loading2" class="1" style="border-radius: 8px;display: flex;left: 0;top: 0;bottom: 0;right: 106px;z-index: 2;position: absolute;justify-content: center;align-items: center;background-color: rgba(0, 0, 0, 0.8)">
                <div style="display: flex;flex-direction: column;color: #1f64ff;align-items: center;">
                  <i class="el-icon-loading"></i>
                  <div>Loading</div>
                </div>
              </div>

              <div v-if="ruleForm.empowerVideo.length != 0" @click="downloadT" style="position: relative;width: 360px;height: 221px;display: flex;justify-content: center;align-items: center;flex-direction: column;background-color: #F6F7FA;border-radius: 10px;border: 1px dashed #d9d9d9;">
                <i class="el-icon-error" style="position: absolute;right: 10px;top: 10px;cursor: pointer;" @click="deleteHumanEmpowerVideo"></i>
                <img src="../../assets/images/Frame427320072.png" alt="">
                <div style="width: 90%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ ruleForm.empowerVideo[0].file_url }}</div>
              </div>

              <el-upload v-else class="upload-video-on" drag :show-file-list="false" :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                :file-list="ruleForm.empowerVideo" :data="uploadDataEmpower" :on-change="handleChangeEmpowerVidoe" :headers="headerData"
                :on-success="handleSuccessEmpowerVidoe" multiple ref="uploadDataEmpower">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
                    stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 6L12 2L8 6" stroke="#1F64FF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M12 2V15" stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div>上传授权视频或授权书</div>
              </el-upload>
              <el-button type="text"
                style="width: 96px;text-decoration: underline;margin-left: 8px;padding: 0;" @click="downloadTEemplate">下载授权书模板</el-button>
            </div>

            <div class="case_video">
              <div class="title">案例视频</div>
              <div style="position: relative;">
                <!-- <svg @click="event => plauVideo(event)" xmlns="http://www.w3.org/2000/svg" style="z-index: 1;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <circle cx="19" cy="19" r="19" fill="black" fill-opacity="0.3"/>
                  <path d="M13 28.1034V11.8406C13 11.0476 13.8789 10.5701 14.5442 11.0016L26.7413 18.9133C27.34 19.3016 27.3509 20.1742 26.762 20.5773L14.565 28.9285C13.9013 29.3829 13 28.9077 13 28.1034Z" fill="white"/>
                </svg> -->
                <video style="width: 360px;height: 211px;" ref="videoHeight" controls>
                  <source src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/web/com/message_center/demo1.mp4" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </el-form-item>

        <div>
          <div style="color: #616266;font-size: 14px;font-weight: 400;line-height: 150%;margin-left: 24px;">
            <span style="color: #F00;">*</span>
            形象图片（等待图片自动加载出来之后再提交）
          </div>
          <img :src="httpUrls.ossUrl + ruleForm.videoCoverUrl" alt="" style="height: 200px;margin-left: 100px;">
        </div>

        <el-form-item>
          <!-- 编辑 -->
          <el-button v-if="mineHumanItem" style="background-color: #1f64ff;color: #fff;padding: 10px 30px;" @click="asubmitForms('ruleForm')">提交资料</el-button>
          <!-- 创建 -->
          <el-button v-else style="background-color: #1f64ff;color: #fff;padding: 10px 30px;" @click="submitForms('ruleForm')">提交资料</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="make-steps">
      <div class="steps_titel">2D数字人拍摄文档</div>
      <div class="steps-list">
        <div :class="stepsContent == 1 ? 'steps_number steps_number-on' : 'steps_number'" @click="stepsNext(1)">1</div>
        <div :class="stepsContent == 1 ? 'steps_title steps_title-on' : 'steps_title'" @click="stepsNext(1)">拍摄前准备工作</div>
        <div :class="stepsContent == 1 ? 'steps_line steps_line-on' : 'steps_line'"></div>
        <div :class="stepsContent == 2 ? 'steps_number steps_number-on' : 'steps_number'" @click="stepsNext(2)">2</div>
        <div :class="stepsContent == 2 ? 'steps_title steps_title-on' : 'steps_title'" @click="stepsNext(2)">拍摄中注意事项</div>
        <div :class="stepsContent == 2 ? 'steps_line steps_line-on' : 'steps_line'"></div>
        <div :class="stepsContent == 3 ? 'steps_number steps_number-on' : 'steps_number'" @click="stepsNext(3)">3</div>
        <div :class="stepsContent == 3 ? 'steps_title steps_title-on' : 'steps_title'" @click="stepsNext(3)">拍摄后优化建议</div>
      </div>

      <!-- 步骤一 -->
      <div class="steps_content" v-if="stepsContent == 1">
        <div class="steps_left">
          <div class="item">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">平整的绿幕背景</div>
            </div>
            <div class="eg">
              <img src="../../assets/images/huamn_steps1-img1.png" alt="">
              <img src="../../assets/images/huamn_steps1-img1.png" alt="">
            </div>
          </div>

          <div class="item">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">1分钟长度的话术</div>
            </div>
            <div class="eg">
              <img src="../../assets/images/huamn_steps1-img2.png" alt="">
            </div>
          </div>

          <div class="item">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">尽量避免偏绿色服装和装饰品</div>
            </div>
            <ul class="cont">
              <li class="cont-itme">视频分辨推荐1080P，尺寸1080x1920，30帧/分钟</li>
              <li class="cont-itme">视频格式要求MP4</li>
            </ul>
          </div>
        </div>

        <div class="right">
          <div class="title-mask">
            <div class="line"></div>
            <div class="tit">1分钟长度的话术</div>
          </div>
          <div class="eg">
            <img src="../../assets/images/huamn_steps1-img3.png" alt="">
          </div>
        </div>
      </div>

      <!-- 步骤二 -->
      <div class="steps_content" v-if="stepsContent == 2">
        <div class="steps_left">
          <div class="item">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">表情自然的讲述2~3分钟话术</div>
            </div>
            <ul>
              <li>说话时需吐字清晰</li>
              <li>手势动作不要出现在面部、嘴巴、脖子附近</li>
            </ul>
            <div class="eg">
              <img src="../../assets/images/huamn_steps2-img1.png" alt="">
            </div>
          </div>

          <div class="item">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">背景与模特的位置关系</div>
            </div>
            <ul>
              <li>推荐人物与绿幕保持1.8m以上距离，保证不让背景的绿色反射到人物身上</li>
            </ul>
            <div class="eg">
              <img src="../../assets/images/huamn_steps2-img2.png" alt="">
            </div>
          </div>
        </div>

        <div class="right">
          <div class="title-mask">
            <div class="line"></div>
            <div class="tit">避免佩戴会晃动的耳坠</div>
          </div>
          <ul>
            <li>耳坠晃动会影响口型学习，可佩戴固定耳钉</li>
          </ul>
          <div class="eg">
            <img src="../../assets/images/huamn_steps2-img3.png" alt="">
            <img src="../../assets/images/huamn_steps2-img4.png" alt="">
          </div>
        </div>
      </div>

      <!-- 步骤三 -->
      <div class="steps_content" v-if="stepsContent == 3">
        <div class="steps_left">
          <div class="item">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">tips</div>
            </div>
            <ul>
              <li>确保说话视频2~3分钟、静默10秒、纯绿幕背景10秒，在同一个视频中一起导出；</li>
              <li>拍摄完成后可以主动对视频进行美颜、瘦脸、调色等处理，确认美化后的视频是你想要生成的效果后即可提交训练</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="item">
        <el-checkbox v-model="checked"></el-checkbox>
        <span class="read-yes">我已阅读并同意</span>
        <span class="argees" @click="showAgree">《定制数字人协议》</span>
      </div>

      <!-- 编辑 -->
      <div v-if="mineHumanItem">
        <span class="text">应付费用</span>
        <span class="money">￥{{ payMessage.prod_price }}/<span class="text">次</span></span>
        <el-button style="background-color: #1f64ff;color: #fff;" @click="editDigitalHumanClones('ruleForm')">保存</el-button>
      </div>
      <!-- 创建 -->
      <div class="item" v-else>
        <span class="text">应付费用</span>
        <span class="money">￥{{ payMessage.prod_price }}/<span class="text">次</span></span>
        <el-button style="background-color: #1f64ff;color: #fff;" @click="submitForm('ruleForm')">立即定制</el-button>
      </div>
    </div>

    <Agree ref="Agree"></Agree>

    <pay-public ref="payPublic" :datas="payInfo" @payresultsuccess="payResultSuccess"></pay-public>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import Agree from '../../components/Agree'
import { digitalHumanClone, GgetVideoCover, editDigitalHumanClone } from '../../api/digitizedHuman'
import { products } from '../../api/chatMG'
import PayPublic from '../../components/payPublic';
export default {
  name: "image-clone",
  data() {
    return {
      httpUrls,
      loading1: false,
      loading2: false,
      checked: false,
      stepsContent: 1,
      payInfo: {},
      ruleForm: {
        type: '基础模特定制',
        name: "",
        videoCoverUrl: '',
        trainVideo: [],
        empowerVideo: [],
        trainAudio: []
      },
      rules: {
        type: [{ required: true, message: '请选择定制类型', trigger: 'change' }],
        name: [{ required: true, message: "请输入模特名称", trigger: "blur" }],
        trainVideo: [{ required: true, message: "至少要有一个训练视频", trigger: "blur" }],
        empowerVideo: [{ required: true, message: "请上传形象授权视频或授权书", trigger: "blur" }],
        trainAudio: [{ required: true, message: "请上传训练音频", trigger: "blur" }]
      },
      uploadData: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'human-image_video'
      },
      uploadDataEmpower: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'human-empower_file'
      },
      uploadDataAudio: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'human-audio'
      },

      payMessage: {},

      loading: null,
      mineHumanItem: false, // 是否为编辑
      isPay: false, // 是否已支付
      liveCode: '',
      headerData: {}
    };
  },

  components: {
    Agree,
    PayPublic
  },

  beforeDestroy() {
    sessionStorage.removeItem('MINE_HUMAN_ITEM')
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    const MINE_HUMAN_ITEM = JSON.parse(sessionStorage.getItem('MINE_HUMAN_ITEM'))
    if (MINE_HUMAN_ITEM != undefined) {
      this.mineHumanItem = true
      if (MINE_HUMAN_ITEM.make_status == 0) {
        this.isPay = true
      }
      console.log(MINE_HUMAN_ITEM.live_code);
      this.liveCode = MINE_HUMAN_ITEM.live_code
      this.ruleForm = {
        type: '基础模特定制',
        name: MINE_HUMAN_ITEM.live_name,
        videoCoverUrl: MINE_HUMAN_ITEM.video_cover_url,
        trainVideo: [{file_url: MINE_HUMAN_ITEM.live_video_url}],
        empowerVideo: [{file_url: MINE_HUMAN_ITEM.power_attorney_url}],
        trainAudio: []
      }
    }
    products({prod_cate_id: [202]}).then(ress => {
      this.payMessage = ress.data[202][1]
      // this.payInfo = {
      //   ...ress.data[7][1],
      //   shopNumber: 1,
      //   totalPrice: ress.data[7][1].prod_price,
      //   resetPay: 2,
      //   live_code: res.data.live_code,
      //   dataSource: 'human'
      // }
      // this.$refs.payPublic.PayVisible = true
    })
  },

  methods: {
    payResultSuccess() {
      this.$router.push('/digitizedHuman/mineHuman')
    },
    deleteHumanVideo() {
      this.ruleForm.trainVideo = []
      this.ruleForm.videoCoverUrl = ''
    },

    deleteHumanEmpowerVideo() {
      this.ruleForm.empowerVideo = []
    },
    stepsNext(type) {
      this.stepsContent = type;
    },

    handleBeforeUpload(file) {
      if (file.size / 1024 / 1024 > 100) {
        this.$message.error('上传的文件不能大于100M')
        return false
      }
      return true
    },
    handleChangeVidoe(file, fileList) {
      this.loading1 = true
      this.uploadData.image = file.raw;
      this.uploadData.image_name = file.name;
    },
    handleSuccessVidoe(response, file, fileList) {
      this.ruleForm.trainVideo = [];
      this.ruleForm.trainVideo.push({
        file_url: response.data.new_url,
        name: response.data.name,
        file_name: response.data.name
      });

      GgetVideoCover({live_video_url: response.data.new_url}).then(res => {
        this.ruleForm.videoCoverUrl = res.data
        this.loading1 = false
      })
    },
    handleChangeEmpowerVidoe(file, fileList) {
      this.uploadDataEmpower.image = file.raw;
      this.uploadDataEmpower.image_name = file.name;
      if (fileList.length != 0) {
        this.loading2 = true
      }
    },
    handleSuccessEmpowerVidoe(response, file, fileList) {
      this.loading2 = false
      this.$refs.uploadDataEmpower.clearFiles()
      this.ruleForm.empowerVideo = [];
      this.ruleForm.empowerVideo.push({
        file_url: response.data.new_url,
        name: response.data.name,
        file_name: response.data.name
      });
    },
    
    // handleAudioChange(file, fileList) {
    //   this.uploadDataAudio.image = file.raw;
    //   this.uploadDataAudio.image_name = file.name;
    // },

    // handleAudioSuccess(response, file, fileList) {
    //   this.ruleForm.trainAudio.push({
    //     file_url: response.data.new_url,
    //     name: response.data.name,
    //     file_name: response.data.name
    //   });
    // },
    // handleRemove(file, fileList) {
    //   this.ruleForm.trainAudio.forEach((v, i) => {
    //     if (v.id == file.id) {
    //       this.ruleForm.trainAudio.splice(i, 1)
    //     }
    //   })
    // },
    submitForms(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checked) {
            this.$message('请仔细阅读并勾选定制数字人协议！')
            return
          }
          let liveSoundList = []
          this.ruleForm.trainAudio.forEach(v => {
            liveSoundList.push({
              live_sound_url: v.file_url
            })
          })
          let data = {
            live_name: this.ruleForm.name,
            custom_type: this.ruleForm.type,
            power_attorney_url: this.ruleForm.empowerVideo[0].file_url,
            live_video_url: this.ruleForm.trainVideo[0].file_url,
            video_cover_url: this.ruleForm.videoCoverUrl,
            // live_sound_list: liveSoundList
          }
          digitalHumanClone(data).then(res => {
            if (res.code == 20000) {
              this.$message.success('保存成功')
              this.mineHumanItem = true
              this.liveCode = res.data.live_code
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checked) {
            this.$message('请仔细阅读并勾选定制数字人协议！')
            return
          }
          let liveSoundList = []
          this.ruleForm.trainAudio.forEach(v => {
            liveSoundList.push({
              live_sound_url: v.file_url
            })
          })
          let data = {
            live_name: this.ruleForm.name,
            custom_type: this.ruleForm.type,
            power_attorney_url: this.ruleForm.empowerVideo[0].file_url,
            live_video_url: this.ruleForm.trainVideo[0].file_url,
            video_cover_url: this.ruleForm.videoCoverUrl,
            // live_sound_list: liveSoundList
          }
          digitalHumanClone(data).then(res => {
            console.log(res);
            if (res.code == 20000) {
              this.liveCode = res.data.live_code
            }
            products({prod_cate_id: [202]}).then(ress => {
              this.payInfo = {
                ...ress.data[202][1],
                shopNumber: 1,
                totalPrice: ress.data[202][1].prod_price,
                resetPay: 2,
                live_code: res.data.live_code,
                dataSource: 'human'
              }
              this.$refs.payPublic.PayVisible = true
              this.mineHumanItem = true
            })
          })
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    editDigitalHumanClones(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checked) {
            this.$message('请仔细阅读并勾选定制数字人协议！')
            return
          }
          let liveSoundList = []
          this.ruleForm.trainAudio.forEach(v => {
            liveSoundList.push({
              live_sound_url: v.file_url
            })
          })
          let data = {
            live_name: this.ruleForm.name,
            custom_type: this.ruleForm.type,
            power_attorney_url: this.ruleForm.empowerVideo[0].file_url,
            live_video_url: this.ruleForm.trainVideo[0].file_url,
            // video_cover_url: this.ruleForm.videoCoverUrl,
            // live_sound_list: liveSoundList
          }
          editDigitalHumanClone(this.liveCode, data).then(res => {
            if (!this.isPay) {
              products({prod_cate_id: [202]}).then(ress => {
                this.payInfo = {
                  ...ress.data[202][1],
                  shopNumber: 1,
                  totalPrice: ress.data[202][1].prod_price,
                  resetPay: 2,
                  live_code: res.data.live_code,
                  dataSource: 'human'
                }
                this.$refs.payPublic.PayVisible = true
              })
            }
          })
        }
      });
    },

    asubmitForms(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checked) {
            this.$message('请仔细阅读并勾选定制数字人协议！')
            return
          }
          let liveSoundList = []
          this.ruleForm.trainAudio.forEach(v => {
            liveSoundList.push({
              live_sound_url: v.file_url
            })
          })
          let data = {
            live_name: this.ruleForm.name,
            custom_type: this.ruleForm.type,
            power_attorney_url: this.ruleForm.empowerVideo[0].file_url,
            live_video_url: this.ruleForm.trainVideo[0].file_url,
            // video_cover_url: this.ruleForm.videoCoverUrl,
            // live_sound_list: liveSoundList
          }
          editDigitalHumanClone(this.liveCode, data).then(res => {
            if (res.code == 20000) {
              this.$message.success('保存成功')
            }
          })
        }
      });
    },
    
    showAgree() {
      this.$refs.Agree.agreeVisibleParent = true
      this.$refs.Agree.agreeVisibleSix = true
    },

    downloadTEemplate() {
      window.open(httpUrls.ossUrl + 'static/digital_human_static/e0945c30-86c8-4db6-a701-1fe66d491406.docx')
      this.$message.success('授权书模板已下载')
    },

    downloadT() {
      window.open(httpUrls.ossUrl + this.ruleForm.empowerVideo[0].file_url)
      this.$message.success('形象授权文件已下载')
    },

    plauVideo(e) {
      console.log(e);
      e.target.farthestViewportElement.nextElementSibling.play()
      e.target.farthestViewportElement.style.display = 'none'
      e.target.farthestViewportElement.nextElementSibling.addEventListener('ended', () => {
        e.target.farthestViewportElement.style.display = 'inline'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding-left: 24px;
}

li {
  color: #393E45;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  /* 24px */
}

.to-prev-page {
  display: flex;

  .mask {
    margin: 0 0 35px 20px;
    cursor: pointer;
  }
}

.image-clone {
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  overflow-y: auto;
  padding: 20px;
  background: #F3F4F5;
}

.message-data {
  background-color: #FFF;
  padding: 23px 0 30px 40px;
}

.video_mask-list {
  display: flex;
}

.empower-templater {
  display: flex;
  align-items: flex-end;
  position: relative;
}

.case_video {
  display: flex;

  .title {
    margin-right: 12px;
  }
}

.make-steps {
  margin-top: 20px;
  background-color: #FFF;
  margin-bottom: 40px;
  padding: 20px 0 20px 140px;
}

.steps_titel {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
  /* 30px */
  margin-bottom: 24px;
}

.steps-list {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.steps_number {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background: #F2F3F5;
  color: #4E5969;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  /* 150% */
  margin-right: 12px;
  cursor: pointer;
}

.steps_number-on {
  background: #1F64FF;
  color: #FFF;
}

.steps_title {
  color: #4E5969;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  /* 150% */
  margin-right: 12px;
  cursor: pointer;
}

.steps_title-on {
  color: #1D2129;
}

.steps_line {
  background-color: #E5E6EB;
  height: 1px;
  width: 100px;
  margin-right: 12px;
}

.steps_line-on {
  background-color: #1F64FF;
}

.title-mask {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .line {
    background: #1F64FF;
    width: 3px;
    height: 16px;
  }

  .tit {
    margin-left: 10px;
    color: #393E45;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    /* 24px */
  }
}

.steps_left {
  .item {
    margin-bottom: 40px;
  }
}

.steps_content {
  display: flex;

  .right {
    margin-left: 4%;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left:20px;
  width: calc(100% - 40px);
  padding: 20px 100px;
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  background: #FFF;
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;

  .item {
    display: flex;
    align-items: center;
  }

  .read-yes {
    color: #969BA8;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    margin-left: 10px;
  }

  .argees {
    color: #1F64FF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    cursor: pointer;
  }

  .text {
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }

  .money {
    color: #F00;
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    /* 30px */
    margin: 0 20px 0 10px;

    .text {
      font-size: 16px;
      color: #F00;
    }
  }
}

.upload_vaidoe-success {
  position: relative;

  i {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    cursor: pointer;
    font-size: 18px;
  }
}

.el-upload__tip {
  li {
    color: #ED746F;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%; /* 18px */
  }
}
</style>

<style lang="scss">
.upload-video-on {
  height: 221px;

  .el-upload-dragger {
    height: 221px;
    color: #1F64FF;
    background-color: #F6F7FA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.el-icon-loading::before {
  content: "\e6cf";
}
</style>