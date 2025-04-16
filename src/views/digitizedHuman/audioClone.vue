<template>
  <!-- 
    声音克隆（这个页面已废弃）
   -->
  <div class="audio-clone">
    <div class="audio-mask">
      <div class="to-prev-page">
        <div class="mask" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </div>

      <div class="content-masks">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="定制类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择活动区域" style="width: 360px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模特名称" prop="name">
            <el-input v-model="ruleForm.name" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="trainVideo">
            <div class="video_mask-list">
              <div class="empower-templater">
                <el-upload class="upload-audio-on" drag :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                  :file-list="ruleForm.trainVideo" :data="uploadData" :on-change="handleChangeVidoe"
                  :on-success="handleSuccessVidoe" multiple :headers="headerData">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
                      stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 6L12 2L8 6" stroke="#1F64FF" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M12 2V15" stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div>上传头像</div>
                </el-upload>
                <div style="width: 96px;margin-left: 8px;"></div>
              </div>

              <!-- <div class="case_video">
                <div class="title">案例视频</div>
                <video style="width: 360px;height: 211px;border: 1px solid #000;" ref="videoHeight">
                  <source src="" type="video/mp4">
                </video>
              </div> -->
            </div>
          </el-form-item>

          <el-form-item label="" prop="empowerVideo">
            <div class="video_mask-list">
              <div class="empower-templater">
                <el-upload :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                  :file-list="ruleForm.empowerVideo" :data="uploadDataEmpower" :on-change="handleChangeEmpowerVidoe"
                  :on-success="handleSuccessEmpowerVidoe" multiple :headers="headerData">
                  <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
                      stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 6L12 2L8 6" stroke="#1F64FF" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M12 2V15" stroke="#1F64FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg> -->
                  <el-button style="color: #1f64ff;border-color: #1f64ff;padding: 10px 30px">上传文件</el-button>
                </el-upload>
                <ul style="color: #ED746F;">
                  <li>录音文件需打包后上传，支持.zip和.rar格式</li>
                  <li>小贴士：录音可上传多条，总时长需大于20分钟</li>
                </ul>
                <!-- <el-button type="text"
                  style="width: 96px;text-decoration: underline;margin-left: 8px;padding: 0;">下载授权书模板</el-button> -->
              </div>

              <!-- <div class="case_video">
                <div class="title">案例视频</div>
                <video style="width: 360px;height: 211px;border: 1px solid #000;" ref="videoHeight">
                  <source src="" type="video/mp4">
                </video>
              </div> -->
            </div>
          </el-form-item>

          <el-form-item>
            <el-button style="background-color: #1f64ff;color: #fff;padding: 10px 30px;" @click="submitForm('ruleForm')">提交资料</el-button>
          </el-form-item>
        </el-form>

        <div class="right-content">
          <div class="top-content">
            <span class="text">定制声音克隆</span>
            <span class="text-blue">音频采集要求</span>
          </div>
          <div class="user_exmple">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">克隆定制案例</div>
            </div>
            <div class="exmple_list">
              <div class="item">
                <img src="../../assets/images/human_audio-icon1.png" alt="">
                <div class="clone_audio">
                  <span>克隆</span>
                  <i class="el-icon-video-pause"></i>
                  <i class="el-icon-video-play"></i>
                </div>
                <div class="default_audio">
                  <span>原生</span>
                  <i class="el-icon-video-pause"></i>
                  <i class="el-icon-video-play"></i>
                </div>
              </div>

              <div class="item">
                <img src="../../assets/images/human_audio-icon1.png" alt="">
                <div class="clone_audio">
                  <span>克隆</span>
                  <i class="el-icon-video-pause"></i>
                  <i class="el-icon-video-play"></i>
                </div>
                <div class="default_audio">
                  <span>原生</span>
                  <i class="el-icon-video-pause"></i>
                  <i class="el-icon-video-play"></i>
                </div>
              </div>

              <div class="item">
                <img src="../../assets/images/human_audio-icon1.png" alt="">
                <div class="clone_audio">
                  <span>克隆</span>
                  <i class="el-icon-video-pause"></i>
                  <i class="el-icon-video-play"></i>
                </div>
                <div class="default_audio">
                  <span>原生</span>
                  <i class="el-icon-video-pause"></i>
                  <i class="el-icon-video-play"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="clone-ask">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">录制流程及要求</div>
            </div>
            <div class="ask-steps-list">
              <div class="item">
                <div class="stpes">
                  <div class="mask">
                    <div class="num">01.</div>
                    <div class="text">录音准备</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="6" viewBox="0 0 137 6" fill="none">
                    <path d="M0 5H135L129.944 1" stroke="#D9D9D9"/>
                  </svg>
                </div>
                <ul class="clone-content">
                  <li>根据不同使用需求，准备5000字左右的文本内容；</li>
                  <li>调整好与麦克风之间的距离。</li>
                </ul>
              </div>
              <div class="item">
                <div class="stpes">
                  <div class="mask">
                    <div class="num">02.</div>
                    <div class="text">开始录音</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="6" viewBox="0 0 137 6" fill="none">
                    <path d="M0 5H135L129.944 1" stroke="#D9D9D9"/>
                  </svg>
                </div>
                <ul class="clone-content">
                  <li>无背景音和杂音情况下开始收音；</li>
                  <li>发音、吐字注意清晰句与句之间停顿好。</li>
                </ul>
              </div>
              <div class="item">
                <div class="stpes">
                  <div class="mask">
                    <div class="num">03.</div>
                    <div class="text">录音结束并提交</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="6" viewBox="0 0 137 6" fill="none">
                    <path d="M0 5H135L129.944 1" stroke="#D9D9D9"/>
                  </svg>
                </div>
                <ul class="clone-content">
                  <li>录音结束后可在线上传文件或把源文件提供给工作人员。</li>
                </ul>
              </div>
              <div class="item">
                <div class="stpes">
                  <div class="mask">
                    <div class="num">04.</div>
                    <div class="text">克隆模型交付</div>
                  </div>
                </div>
                <ul class="clone-content">
                  <li>从接受数据开始基本在3-5个工作日交付。</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="clone-flow-path">
            <div class="title-mask">
              <div class="line"></div>
              <div class="tit">录制流程及要求</div>
            </div>

            <div class="flow-path-list">
              <div class="item">
                <div class="tit">音频时长</div>
                <div class="cont">有效音频时长≥20分钟</div>
              </div>
              <div class="item">
                <div class="tit">录音环境</div>
                <div class="cont">噪音建议≤40dB</div>
              </div>
              <div class="item">
                <div class="tit">录音设备</div>
                <div class="cont">推荐使用降噪麦克风</div>
              </div>
            </div>

            <div class="flow-path-list">
              <div class="item">
                <div class="tit">录音人</div>
                <div class="cont">应与麦保持距离，防制喷麦和录入呼吸声</div>
              </div>
              <div class="item">
                <div class="tit">录音和录音参数</div>
                <div class="cont">推荐无损音质格式保存音频，如wav，不能使用压缩格式如：mp3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="item">
        <el-checkbox v-model="checked"></el-checkbox>
        <span class="read-yes">我已阅读并同意</span>
        <span class="argees" @click="showAgree">《声音克隆协议》</span>
      </div>
      <div class="item">
        <span class="text">应付费用</span>
        <span class="money">899/<span class="text">次</span></span>
        <el-button style="background-color: #1f64ff;color: #fff;">立即定制</el-button>
      </div>
    </div>

    <Agree ref="Agree"></Agree>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import Agree from '../../components/Agree'

export default {
  name: 'audio-clone',
  data() {
    return {
      httpUrls,
      checked: false,
      ruleForm: {
        type: '',
        name: "",
        trainVideo: [],
        empowerVideo: []
      },
      rules: {
        type: [{ required: true, message: '请选择定制类型', trigger: 'change' }],
        name: [{ required: true, message: "请输入模特名称", trigger: "blur" }],
        trainVideo: [{ required: true, message: "至少要有一个训练视频", trigger: "blur" }],
        empowerVideo: [{ required: true, message: "请上传形象授权视频或授权书", trigger: "blur" }],
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
      headerData: {}
    };
  },
  components: {
    Agree
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },
  methods: {
    handleChangeVidoe(file, fileList) {
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
    },
    handleChangeEmpowerVidoe(file, fileList) {
      this.uploadDataEmpower.image = file.raw;
      this.uploadDataEmpower.image_name = file.name;
    },
    handleSuccessEmpowerVidoe(response, file, fileList) {
      this.ruleForm.empowerVideo = [];
      this.ruleForm.empowerVideob.push({
        file_url: response.data.new_url,
        name: response.data.name,
        file_name: response.data.name
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    showAgree() {
      this.$refs.Agree.agreeVisibleParent = true
      this.$refs.Agree.agreeVisibleSeven = true
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-clone {
  padding: 20px;
  background-color: #F3F4F5;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  overflow-y: auto;
}
.to-prev-page {
  display: flex;

  .mask {
    margin: 0 0 35px 20px;
    cursor: pointer;
  }
}

.audio-mask {
  background-color: #FFF;
  padding: 25px 0 0 40px;
}



.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 45px);
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

.content-masks {
  display: flex;
  margin-bottom: 60px;
}

.right-content {
  margin-left: 40px;
  border-radius: 4px;
  background: #F6F7FA;
  padding: 20px;

  .top-content {
    background-color: #FFF;
    padding: 14px 20px;
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 150%;
    margin-bottom: 20px;
    border-radius: 8px;

    .text-blue {
      color: #FFF;
      font-size: 14px;
      border-radius: 0px 8px 8px 5px;
      background: #1F64FF;
      padding: 4px 12px;
    }
  }

  .user_exmple {
    background-color: #FFF;
    padding: 14px 20px;
    color: #000;
    margin-bottom: 20px;
    border-radius: 8px;

    .exmple_list {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        align-items: center;
        border-radius: 33px;
        background: #FFF;
        box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.10);
      }

      .item:nth-child(2) {
        margin: 0 48px;
      }
    }
  }

  .clone-ask {
    background-color: #FFF;
    padding: 14px 20px;
    color: #000;
    margin-bottom: 20px;
    border-radius: 8px;

    .ask-steps-list {
      display: flex;
      justify-content: space-between;

      .stpes {
        display: flex;
        align-items: center;

        svg {
          margin: 0 36px;
        }

        .text {
          white-space: nowrap;
          color: #393E45;
          font-size: 14px;
          font-weight: 600;
          line-height: 150%; /* 21px */
        }

        .num {
          color: #1F64FF;
          font-size: 14px;
          font-weight: 600;
          line-height: 150%; /* 21px */
        }
      }

      .clone-content {
        padding-left: 20px;
        color: #393E45;
        font-size: 12px;
        font-weight: 400;
        line-height: 150%; /* 18px */
      }
    }
  }

  .clone-flow-path {
    background-color: #FFF;
    padding: 14px 20px;
    color: #000;
    margin-bottom: 20px;
    border-radius: 8px;

    .flow-path-list {
      display: flex;
      justify-content: space-between;
      margin: 10px -10px;

      .item {
        width: 100%;
        border-radius: 10px;
        border: 1px solid #F0F0F0;
        padding: 16px;
        margin: 0 10px;

        .tit {
          color: #262626;
          font-size: 14px;
          font-weight: 600;
          line-height: 150%; /* 21px */
        }

        .cont {
          color: #262626;
          font-size: 12px;
          font-weight: 400;
          line-height: 150%; /* 18px */
        }
      }
    }
  }
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


.clone_audio, .default_audio {
  color: #515151;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 21px */

  i {
    color: #1F64FF;
    font-size: 20px;
  }
}
</style>

<style lang="scss">
.upload-audio-on {
  height: 80px;
  width: 80px;

  .el-upload-dragger {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    color: #1F64FF;
    background-color: #F6F7FA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>