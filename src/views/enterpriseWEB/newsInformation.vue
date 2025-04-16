<template>
  <!-- 
  项目或产品信息
 -->
  <div class="basic_information">
    
    <div style="display: flex;justify-content: space-between;max-width: 620px;margin-bottom: 20px;" v-if="isShow">
      <div style="font-weight: bold;font-size: 14px;">咨询{{ id }}</div>
      <img style="cursor: pointer;" @click="deleteNews" src="../../assets/images/trash.png" alt="">
    </div>
    <div style="min-width: 470px;">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm basic_form">
        <el-form-item label="资讯信息" prop="newsTypesof">
          <el-select v-model="ruleForm.newsTypesof" placeholder="请选择" style="width: 100%;max-width: 500px;">
            <el-option
              v-for="item in options"
              :key="item.label_code"
              :label="item.label"
              :value="item.label_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯名称" prop="newsTitle">
          <el-input v-model="ruleForm.newsTitle" style="max-width: 500px;"
            placeholder="请输入您的资讯名称（50字以内）" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="内容描述" prop="newsContent">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="ruleForm.newsContent" style="max-width: 500px;"
            placeholder="请用描述您的产品或项目100字内。尽力简洁有力" maxlength="100"></el-input>
        </el-form-item>

        <el-form-item label="图片" prop="name">
          <el-upload :action="httpUrls.loginUrl + 'api/user/oss_upload'" list-type="picture-card" :limit="10"
            :auto-upload="true" ref="officialAccountList" :file-list="ruleForm.officialAccountList" style="max-width: 500px;"
            :on-change="handleUploadChangeMiniCode" :on-success="handleSuccessMiniCode" accept=".png,.jpg,.jpeg" :headers="headerData"
            :data="requestOffcialAccpunt" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }" class="upload-file-code">
            <div class="upload-btn">
              <div class="btn-mask">
                <i class="el-icon-plus" style="font-size: 18px;"></i>
                <div>点击上传</div>
              </div>
            </div>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="httpUrls.ossUrl + file.file_url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
        </el-form-item>

        <el-form-item label="资料文件">
          <div style="display: flex;justify-content: flex-start;min-width: 470px;">
          <div style="width: 80%;">
            <!-- <div class="label_title">资料文件</div> -->
            <div style="max-width: 500px;">
              <div class="upload_file-list">
                <div class="file-title">文档</div>
                <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                  :action="httpUrls.loginUrl + 'api/user/oss_upload'" accept=".docx,.doc,.txt,.pdf,.xls,.xlsx,.pptx" :limit="10"
                  :file-list="ruleForm.fileList" :data="requestFileList" ref="fileList" :before-remove="handleRemoveNewsFile" :headers="headerData"
                  multiple :auto-upload="true" :on-change="handleChangeNewsFile" :on-success="handleSuccessNewsFile">
                  <el-button size="small" type="primary" icon="el-icon-upload2"
                    style="background-color: #1f64ff;">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，DOC、XISX、PPT、TXT、PDF文件</div>
                </el-upload>
              </div>

              <div class="upload_file-list">
                <div class="file-title">图片</div>
                <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                  :action="httpUrls.loginUrl + 'api/user/oss_upload'" :file-list="ruleForm.pictureList" :limit="10" :headers="headerData"
                  :data="requestPictureList" ref="pictureList" accept=".jpg,.jpeg,.png" multiple :before-remove="handleRemoveNewsPicture"
                  :auto-upload="true" :on-change="handleChangeNewsPicture" :on-success="handleSuccessNewsPicture">
                  <el-button size="small" type="primary" icon="el-icon-upload2"
                    style="background-color: #1f64ff;">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，JPG、PNG文件</div>
                </el-upload>
              </div>
              <!-- 视频 -->
              <div class="upload_file-list" v-show="false">
                <div class="file-title">视频</div>
                <el-upload class="upload-demo" style="width: calc(100% - 90px);max-width: 500px;" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
                  :action="httpUrls.loginUrl + 'api/user/oss_upload'" :file-list="ruleForm.videoList" :limit="10" :headers="headerData"
                  :data="requestVideoList" ref="videoList" accept=".flv,.rmvb,.mp4,.mvb" multiple :auto-upload="true"
                  :on-change="handleChangeNewsVideo" :on-success="handleSuccessNewsVideo" :before-remove="handleRemoveNewsVideo">
                  <el-button size="small" type="primary" icon="el-icon-upload2"
                    style="background-color: #1f64ff;">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip title_prompt">文件资料上传可包含，FLV、RMVB、MP4、MVB文件</div>
                </el-upload>
              </div>
            </div>

            <!-- <div>
              <div style="display: flex;">
                <div style="width: 114px;text-align: right;margin-right: 10px;font-size: 14px;line-height: 40px;">网址</div>
                <div style="width: calc(100% - 124px);">
                  <div v-for="(item, i) in newsFileList.networkAddressNumber" style="display: flex;align-items: center;margin-bottom: 10px;position:relative;">
                    <el-input v-model="newsFileList.networkAddress[i]" placeholder="请输入您的网址" style="width: calc(100% - 79px)"></el-input>
                    <img v-if="newsFileList.networkAddressNumber > 1" src="../../assets/images/trash.png" style="position: absolute;right: 89px;top: 50%;transform: translateY(-50%)" @click="removeNewsNetwork(i)"/>
                    <el-button v-if="i == 0" @click="newsFileList.networkAddressNumber >= 10 ? newsFileList.networkAddressNumber = 10 : newsFileList.networkAddressNumber++" icon="el-icon-plus" style="width: 69px;padding: 0 10px;margin-left: 10px;font-size: 14px;line-height: 22px;height: 30px;background-color: #1F64FF;color: #fff;">添加</el-button>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        </el-form-item>
        <el-form-item label="网址">
          <div>
            <div v-for="(item, i) in ruleForm.networkAddressNumber" :key="i" style="display: flex;align-items: center;margin-bottom: 10px;position:relative;">
              <el-input v-model="ruleForm.networkAddress[i]" placeholder="请输入您的网址" style="width: calc(100% - 79px)"></el-input>
              <img v-if="ruleForm.networkAddressNumber > 1" src="../../assets/images/trash.png" style="position: absolute;right: 89px;top: 50%;transform: translateY(-50%)" @click="removeNewsNetwork(i)"/>
              <el-button v-if="i == 0" @click="ruleForm.networkAddressNumber >= 10 ? ruleForm.networkAddressNumber = 10 : ruleForm.networkAddressNumber++" icon="el-icon-plus" class="addWebsite">添加网址</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'

import { enterpriseLabel } from '../../api/chatMG'

export default {
  name: "news-information",
  data() {
    return {
      httpUrls: httpUrls,
      options: [],
      ruleForm: {
        newsTypesof: '',
        newsTitle: '',
        newsContent: '',
        officialAccountList: [],
        fileList: [],
        pictureList: [],
        videoList: [],
        networkAddress: [],
        networkAddressNumber: 1,
        headerData: {}
      },
      // // 新闻文件列表
      // newsFileList: {
      // },
      rules: {
        newsTypesof: [
          { required: true, message: '请输入咨询信息', trigger: 'blur' },
        ],
        newsTitle: [
          { required: true, message: '请输入咨询名称', trigger: 'blur' },
        ],
        newsContent: [
          { required: true, message: '请输入内容描述', trigger: 'change' },
        ],
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

      // 上传的文件列表
      requestFileList: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-file_list'
      },
      // 上传的文件图片列表
      requestPictureList: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-picture_list'
      },
      // 上传的视频列表
      requestVideoList: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'Enterprise_customization-video_list'
      },
    };
  },
  props: {
    // 数据
    data: {
      type: Object,
      default: () => {}
    },
    // 用于区分此新闻是否已添加到数组，未添加则添加，已添加则替换
    id: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false
    },
    // 用于校验必填数据是否已填写完毕
    randomNewsNumber: {
      type: Number,
      default: 0
    },
  },
  watch: {
    randomNewsNumber: {
      deep: true,
      handler() {
        if (this.randomNewsNumber != -1) {
          if (this.randomNewsNumber == 10) {
            this.$emit('comletenewswrite', {data: {...this.ruleForm, id: this.id}, type: 'complete', id: this.id})
          } else {
            this.$refs['ruleForm'].validate(valid => {
              if (valid) {
                this.$emit('comletenewswrite', {data: {...this.ruleForm, id: this.id}, type: 'complete', id: this.id})
              }
            })
          }
        }
      }
    },
    data: {
      deep: true,
      handler() {
        if (Object.keys(this.data).length != 0) {
          this.ruleForm = this.data
        }
      }
    },
  },
  created() {
    enterpriseLabel(2).then(res => {
      console.log(res);
      this.options = res.data.data
    })
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    if (Object.keys(this.data).length != 0) {
      this.ruleForm = this.data
    }
  },
  beforeDestroy() {
    // 页面关闭前将数据传到父组件里面，type：用于区分数据来自关闭前或点击下一步，由于步骤条可点击且无需验证必填项
    this.$emit('comletenewswrite', {data: {...this.ruleForm, id: this.id}, type: 'destory', id: this.id})
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = httpUrls.ossUrl + file.file_url;
      this.dialogVisible = true;
    },

    // 上传小程序二维码
    handleUploadChangeMiniCode(file, fileList) {
      this.requestOffcialAccpunt.image = file.raw
      this.requestOffcialAccpunt.image_name = file.name
    },
    // 成功的回调
    handleSuccessMiniCode(response, file, fileList) {
      this.ruleForm.officialAccountList.push({
        name: response.data.name,
        file_url: response.data.new_url
      })
    },
    handleRemove(file) {
      this.ruleForm.officialAccountList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.officialAccountList.splice(i, 1)
        }
      });
    },
    deleteNews() {
      this.$emit('deletenews', this.id)
    },

    /**
     * 新闻上传文件
     */
    // 新闻/文件列表
    handleChangeNewsFile(file, fileList) {
      this.requestFileList.image = file.raw
      this.requestFileList.image_name = file.name
    },
    handleSuccessNewsFile(response, file, fileList) {
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
    handleRemoveNewsFile(file, fileList) {
      this.ruleForm.fileList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.fileList.splice(i, 1)
        }
      });
    },

    // 新闻/图片列表
    handleChangeNewsPicture(file, fileList) {
      this.requestPictureList.image = file.raw
      this.requestPictureList.image_name = file.name
    },
    handleSuccessNewsPicture(response, file, fileList) {
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
    handleRemoveNewsPicture(file, fileList) {
      this.ruleForm.pictureList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.pictureList.splice(i, 1)
        }
      });
    },

    // 新闻/视频列表
    handleChangeNewsVideo(file, fileList) {
      this.requestVideoList.image = file.raw
      this.requestVideoList.image_name = file.name
    },
    handleSuccessNewsVideo(response, file, fileList) {
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
    handleRemoveNewsVideo(file, fileList) {
      this.ruleForm.videoList.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.videoList.splice(i, 1)
        }
      });
    },

    removeNewsNetwork(i) {
      this.ruleForm.networkAddress.splice(i, 1)
      this.ruleForm.networkAddressNumber--
    },
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