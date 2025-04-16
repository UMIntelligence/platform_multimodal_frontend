<template>
  <!-- 
  企业专属资讯库
 -->
  <div class="basic_information">
    <div style="display: flex;justify-content: space-between;max-width: 620px;margin-bottom: 20px;" v-if="isShow">
      <div style="font-weight: bold;font-size: 14px;margin-left: 30px;">知识库{{ id + 1 }}</div>
      <img style="cursor: pointer;" @click="deleteBase" src="../../../assets/images/trash.png" alt="">
    </div>
    <div style="min-width: 470px;">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm basic_form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" style="max-width: 500px;" maxlength="50" placeholder="请输入您的资讯名称（50字以内）"></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="labelCode">
          <div style="display: flex;flex-wrap: wrap;max-width: 500px;">
            <div v-for="(item, i) in options" :key="i"
              :class="item.label_code == ruleForm.labelCode ? 'industry-title-on' : 'industry-title'"
              :style="item.behavior == 'user' ? 'padding-right: 20px;'  : ''"
              @click="ruleForm.newsTypesof = item, ruleForm.labelCode = item.label_code">
              {{ item.label }}
              <i v-if="item.behavior == 'user'" class="el-icon-circle-close" style="position: absolute;right: 2px;top: 2px;" @click.stop="removeOptionsItem(item, i)"></i>
            </div>

            <el-button v-if="showIndustryInput" @click="showAddIndustry"
              style="border-style: dashed;color: #1F64FF;border-color: #1F64FF;padding: 0 12px;height: 36px;">添加</el-button>
            <el-input v-else ref="addIndustry" v-model="addInsIndustryCategories" @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm" style="width: 90px;"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="描述" prop="newsTitle">
          <el-input v-model="ruleForm.newsTitle" style="max-width: 500px;" maxlength="50" placeholder="请输入您的资讯名称（50字以内）"></el-input>
        </el-form-item>

        <el-form-item label="用途" prop="newsContent">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="ruleForm.newsContent" style="max-width: 500px;"
            placeholder="请用描述您的产品或项目100字内。尽力简洁有力" maxlength="100"></el-input>
        </el-form-item>

        <el-form-item label="资料文件">
          <div style="display: flex;justify-content: flex-start;min-width: 470px;">
            <div style="width: 80%;">
              <!-- <div class="label_title">资料文件</div> -->
              <div style="max-width: 500px;">
                <div class="upload_file-list">
                  <div class="file-title">文档</div>
                  <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;" :limit="10" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'" accept=".docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx" :headers="headerData"
                    :file-list="ruleForm.fileList" :data="requestFileList" ref="fileList" :before-remove="handleRemoveBaseFile"
                    multiple :auto-upload="true" :on-change="handleChangeBaseFile" :on-success="handleSuccessBaseFile">
                    <el-button size="small" type="primary" icon="el-icon-upload2"
                      style="background-color: #1f64ff;">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，DOC、XISX、PPT、TXT、PDF文件</div>
                  </el-upload>
                </div>

                <div class="upload_file-list">
                  <div class="file-title">图片</div>
                  <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;" :limit="10" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'" :file-list="ruleForm.pictureList" :headers="headerData"
                    :data="requestPictureList" ref="pictureList" accept=".jpg,.jpeg,.png" multiple :before-remove="handleRemoveBasePicture"
                    :auto-upload="true" :on-change="handleChangeBasePicture" :on-success="handleSuccessBasePicture">
                    <el-button size="small" type="primary" icon="el-icon-upload2"
                      style="background-color: #1f64ff;">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，JPG、PNG文件</div>
                  </el-upload>
                </div>

                <!-- <div class="upload_file-list">
                  <div class="file-title">视频</div>
                  <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;" :limit="10" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'" :file-list="ruleForm.videoList"
                    :data="requestVideoList" ref="videoList" accept=".flv,.rmvb,.mp4,.mvb" multiple :auto-upload="true"
                    :on-change="handleChangeBaseVideo" :on-success="handleSuccessBaseVideo" :before-remove="handleRemoveBaseVideo">
                    <el-button size="small" type="primary" icon="el-icon-upload2"
                      style="background-color: #1f64ff;">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，FLV、RMVB、MP4、MVB文件</div>
                  </el-upload>
                </div> -->
              </div>
                
              <!-- <div>
                <div style="display: flex;">
                  <div style="width: 114px;text-align: right;margin-right: 10px;font-size: 14px;line-height: 40px;">网址</div>
                  <div style="width: calc(100% - 124px);">
                    <div v-for="(item, i) in baseFileList.networkAddressNumber" style="display: flex;align-items: center;margin-bottom: 10px;position:relative;">
                      <el-input v-model="baseFileList.networkAddress[i]" placeholder="请输入您的网址" style="width: calc(100% - 79px)"></el-input>
                      <img v-if="baseFileList.networkAddressNumber > 1" src="../../../assets/images/trash.png" style="position: absolute;right: 89px;top: 50%;transform: translateY(-50%)" @click="removeBaseNetwork(i)"/>
                      <el-button v-if="i == 0" @click="baseFileList.networkAddressNumber >= 10 ? baseFileList.networkAddressNumber = 10 : baseFileList.networkAddressNumber++" icon="el-icon-plus" style="width: 69px;padding: 0 10px;margin-left: 10px;font-size: 14px;line-height: 22px;height: 30px;background-color: #1F64FF;color: #fff;">添加</el-button>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </el-form-item>
        <el-form-item label="网址">
          <!-- <div style="width: 114px;text-align: right;margin-right: 10px;font-size: 14px;line-height: 40px;">网址</div> -->
          <div>
            <div v-for="(item, i) in ruleForm.networkAddressNumber" :key="i" style="display: flex;align-items: center;margin-bottom: 10px;position:relative;">
              <el-input v-model="ruleForm.networkAddress[i]" placeholder="请输入您的网址" style="width: calc(100% - 150px)"></el-input>
              <img v-if="ruleForm.networkAddressNumber > 1" src="../../../assets/images/trash.png" style="position: absolute;right: 160px;top: 50%;transform: translateY(-50%);cursor: pointer;" @click="removeBaseNetwork(i)"/>
              <el-button v-if="i == 0" @click="ruleForm.networkAddressNumber >= 10 ? ruleForm.networkAddressNumber = 10 : ruleForm.networkAddressNumber++" icon="el-icon-plus" class="addWebsite">添加网址</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpUrls from '../../../api/requestURL'

import { mapGetters } from 'vuex'
import { enterpriseLabel } from '../../../api/chatMG'

export default {
  name: "knowledgeBase",
  data() {
    return {
      httpUrls: httpUrls,
      // options: ['行业常识', '销售', '采购', '财务', '品质', '生产'],
      options: [],
      ruleForm: {
        newsTypesof: {},
        newsTitle: '',
        title: '',
        newsContent: '',
        officialAccountList: [],
        pictureList: [], // 图片列表
        videoList: [], // 视频列表
        fileList: [], // 文件列表
        labelCode: '',
        networkAddress: [],
        networkAddressNumber: 1,
        headerData: {}
      },

      // 知识库文件列表
      // baseFileList: {
      //   fileList: [],
      //   pictureList: [],
      //   videoList: [],
      //   networkAddress: [],
      //   networkAddressNumber: 1
      // }
      rules: {
        // title: [
        //   { required: true, message: '请输入标题', trigger: 'blur' },
        // ],
        // newsTypesof: [
        //   { required: true, message: '请选择分类', trigger: 'blur' },
        // ],
        // newsTitle: [
        //   { required: true, message: '请输入描述', trigger: 'blur' },
        // ],
        // newsContent: [
        //   { required: true, message: '请输入用途', trigger: 'blur' },
        // ],
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      // 图片列表
      requestOffcialAccpunt: {
        image: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-picture_list'
      },
      // 上传的文件图片列表
      requestPictureList: {
        image: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-picture_list'
      },
      // 上传的文件列表
      requestFileList: {
        image: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-file_list'
      },
      // 上传的视频列表
      requestVideoList: {
        image: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-video_list'
      },

      addInsIndustryCategories: '',
      showIndustryInput: true,
    };
  },
  props: {
    // 数据
    data: {
      type: Object,
      default: () => { }
    },
    // 用于区分此新闻是否已添加到数组，未添加则添加，已添加则替换
    id: {
      type: Number,
      default: 0
    },
    // 用于校验必填数据是否已填写完毕
    randomBaseNumber: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    ...mapGetters(['submitCompany'])
  },

  watch: {
    randomBaseNumber: {
      deep: true,
      handler() {
        if (this.randomBaseNumber != -1) {
          console.log(this.id);
          if (this.randomBaseNumber == 10) {
            this.$emit('comletebasedata', { data: { ...this.ruleForm, id: this.id }, type: 'complete' })
          } else {
            this.$refs['ruleForm'].validate(valid => {
              if (valid) {
                this.$emit('comletebasedata', { data: { ...this.ruleForm, id: this.id }, type: 'complete' })
              }
            })
          }
        }
      }
    },
    ruleForm: {
      deep: true,
      handler() {
        this.$store.dispatch('app/changeSubmitCompany', '1')
      }
    },
    submitCompany: {
      deep: true,
      handler() {
        if (this.submitCompany == '1') {
          window.onbeforeunload = (e) => {
            e.returnValue = '离开？'
            return e.preventDefault()
          }
          // window.addEventListener('beforeunload', this.beforeunLoadHandle)
        } else {
          window.onbeforeunload = null
          // window.removeEventListener('beforeunload', this.beforeunLoadHandle)
        }
      }
    }
  },
  created() {
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    if (Object.keys(this.data).length != 0) {
      this.ruleForm = this.data
    }
    enterpriseLabel(3).then(res => {
      // 分类是否有值
      if (Object.keys(this.data).length == 0 || (this.data.labelCode == '' && this.data.labelName == '')) { // 编号和名称都为空, 默认为第一个
        this.labelCode = res.data.data[0].label_code
        this.ruleForm.labelCode = res.data.data[0].label_code
        this.ruleForm.newsTypesof = res.data.data[0]
      } else if (this.data.labelCode == '') { // 编号为空，用户自定义
        res.data.data.push({
          behavior: 'user',
          label: this.ruleForm.labelName,
          label_code: this.ruleForm.labelName
        })
        this.labelCode = this.ruleForm.labelName
        this.ruleForm.newsTypesof = {
          behavior: 'user',
          label: this.ruleForm.labelName,
          label_code: this.ruleForm.labelName
        }
      } else { // 编号不为空
        res.data.data.forEach(v => {
          // 后台返回
          if (this.data.labelCode == v.label_code) {
            this.labelCode = v.label_code
            this.ruleForm.newsTypesof = v
          }
        })
      }
      this.options = res.data.data
    })
  },
  beforeDestroy() {
    console.log(this.id);
    // 页面关闭前将数据传到父组件里面，type：用于区分数据来自关闭前或点击下一步，由于步骤条可点击且无需验证必填项
    this.$emit('comletebasedata', { data: { ...this.ruleForm, id: this.id, newsTypesof: this.ruleForm.newsTypesof }, type: 'destory' })
  },
  methods: {
    showAddIndustry() {
      this.showIndustryInput = false
      this.$nextTick(() => {
        this.$refs.addIndustry.$refs.input.focus()
      })
    },

    // 添加行业标签
    handleInputConfirm() {
      let inputValue = this.addInsIndustryCategories;
      if (inputValue.replace(/\s*/g, '') == '') {
        this.$message('请输入标题')
        return
      }
      if (inputValue) {
        let a = 0
        this.options.forEach(v => {
          if (v.label == inputValue) {
            a = 1
          }
        })
        if (a == 0) {
          this.options.push({ behavior: 'user', label: inputValue, label_code: inputValue });
          this.ruleForm.newsTypesof = { behavior: 'user', label: inputValue, label_code: inputValue }
          this.labelCode = inputValue
        }
        // if (JSON.stringify(this.options).indexOf(inputValue) == -1) {
        // }
      }
      this.showIndustryInput = true;
      this.addInsIndustryCategories = '';
    },

    // 删除行业标签
    removeOptionsItem(item, i) {
      if (this.labelCode == item.label_code) {
        this.options.forEach((v, i) => {
          if (v.label_code == item.label_code) {
            this.ruleForm.newsTypesof = this.options[i - 1]
            this.labelCode = this.options[i - 1].label_code
          }
        })
      }
      this.options.splice(i, 1)
    },

    /**
     * 知识库上传文件
     */
    // 知识库/文件列表
    handleChangeBaseFile(file, fileList) {
      this.requestFileList.image = file.raw
      this.requestFileList.image_name = file.name
    },
    handleSuccessBaseFile(response, file, fileList) {
      if (response.code == 20000) {
        this.ruleForm.fileList.push({
          name: response.data.name,
          file_name: response.data.name,
          file_url: response.data.new_url,
        })
      } else {
        this.$message.error(response.msg)
      }
      this.requestFileList.image = null
      this.requestFileList.image_name = null
    },
    handleRemoveBaseFile(file, fileList) {
      this.ruleForm.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.fileList.splice(i, 1)
        }
      });
    },

    // 知识库/图片列表
    handleChangeBasePicture(file, fileList) {
      this.requestPictureList.image = file.raw
      this.requestPictureList.image_name = file.name
    },
    handleSuccessBasePicture(response, file, fileList) {
      if (response.code == 20000) {
        this.ruleForm.pictureList.push({
          name: response.data.name,
          file_name: response.data.name,
          file_url: response.data.new_url,
        })
      } else {
        this.$message.error(response.msg)
      }
      this.requestPictureList.image = null
      this.requestPictureList.image_name = null
    },
    handleRemoveBasePicture(file, fileList) {
      this.ruleForm.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.pictureList.splice(i, 1)
        }
      });
    },

    // 知识库/视频列表
    handleChangeBaseVideo(file, fileList) {
      this.requestVideoList.image = file.raw
      this.requestVideoList.image_name = file.name
    },
    handleSuccessBaseVideo(response, file, fileList) {
      if (response.code == 20000) {
        this.ruleForm.videoList.push({
          name: response.data.name,
          file_name: response.data.name,
          file_url: response.data.new_url,
        })
      } else {
        this.$message.error(response.msg)
      }
      this.requestVideoList.image = null
      this.requestVideoList.image_name = null
    },
    handleRemoveBaseVideo(file, fileList) {
      this.ruleForm.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.videoList.splice(i, 1)
        }
      });
    },

    // 删除网址
    removeBaseNetwork(i) {
      this.ruleForm.networkAddress.splice(i, 1)
      this.ruleForm.networkAddressNumber--
    },

    deleteBase() {
      this.$emit('deletebase', this.id)
    }
  },
};
</script>
<style scoped>
.addWebsite {
  background: #3363F6;
  border-radius: 8px 8px 8px 8px;
  padding: 13px 29px;
  font-weight: bold;
  font-size: 14px;
  color: #FFFFFF;
  margin-left: 16px;
}
.enterprise-detail {
  background-color: #FFF;
}

.basic_information {
  width: 88%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.basic_information .first-title {
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
}

.success-round {
  background-color: #E8F3FF;
  color: #165DFF;
  width: 16px;
  height: 16px;
  line-height: 16px;
  padding: 2px;
  text-align: center;
  border-radius: 50%;
}

.upload-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.upload-btn .btn-mask {
  line-height: 24px;
  margin: auto;
  font-size: 14px;
}

.title_prompt {
  color: #9A9A9A;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.upload_file-list {
  display: flex;
  margin-bottom: 15px;
}

.upload_file-list .file-title {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  background: #FFF;
  height: 32px;
  margin-top: 4px;
  line-height: 32px;
  padding: 0 10px;
  width: 50px;
  text-align: center;
  margin-right: 20px;
}

.industry-title, .industry-title-on {
  height: 18px;
  line-height: 18px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
}

.industry-title {
  color: #9A9A9A;
  border: 1px solid #DCDFE6;
}

.industry-title-on {
  border: 1px solid #1F64FF;
  color: #1F64FF;
}
</style>

<style>
.upload-file-code .el-upload {
  width: 80px;
  height: 80px;
  background-color: #F2F3F5;
}

.upload-file-code .el-upload-list .el-upload-list__item {
  width: 80px;
  height: 80px;
  margin-bottom: 0;
}

.upload-demo .el-upload-dragger {
  width: 300px;
  height: 140px;
}

.upload-demo .el-upload-dragger .el-icon-upload {
  margin-top: 16px;
}

.upload-demo .el-upload-list .el-upload-list__item {
  margin: 0;
}

.el-upload__tip {
  margin-top: 0;
  line-height: 20px;
}

.form_item-title label {
  color: #000;
  font-size: 22px;
  font-weight: 500;
}
</style>