<template>
  <!-- 
    企业设置
   -->
  <div class="Enterprise-Settings">
    <div class="titls">企业设置</div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="企业/团队名称" prop="name">
        <el-input v-model="ruleForm.name" style="width: 500px;" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="企业/团队简介" prop="introduction">
        <el-input v-model="ruleForm.introduction" style="width: 500px;" placeholder="请输入公司简称(50字以内）"></el-input>
      </el-form-item>
      <el-form-item label="企业/团队图标" prop="fileList">
        <el-upload :action="httpUrls.loginUrl + 'api/user/oss_upload'" list-type="picture-card" :limit="1"
          :auto-upload="true" ref="officialAccountList" style="max-width: 500px;" :headers="headerData"
          :on-change="handleUploadChangeMiniCode" :file-list="ruleForm.fileList" :on-success="handleSuccessMiniCode" accept=".png,.jpg,.jpeg"
          :data="requestOffcialAccpunt" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }" class="upload-file-code">
          <div class="upload-btn">
            <div class="btn-mask">
              <i class="el-icon-plus" style="font-size: 18px;"></i>
              <div>点击上传</div>
            </div>
          </div>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="httpUrls.ossUrl + ruleForm.fileList[0].file_url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview()">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove()">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" class="draw_image-class_dark">
          <img width="100%" :src="dialogImageUrl" style="max-height: 800px;min-height: 500px;cursor: zoom-out;" alt="" @click="dialogVisible = false">
        </el-dialog>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img style="width: 100%;max-width: 800px;" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #1F64FF;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpUrls from '../../../api/requestURL'
import { companyUpdate,companyBasicMsg }from '../../../api/chatMG'
export default {
  name: 'Enterprise-Settings',
  data() {
    return {
      httpUrls,
      dialogVisible: false,
      dialogImageUrl: '',
      disabled: false,
      headerData: {},
      // 图片列表
      requestOffcialAccpunt: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'digitized_human-enterprise_picture'
      },
      ruleForm: {
        name: '',
        introduction: '',
        fileList: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    };
  },

  computed: {
    ...mapGetters(['enterpriseId'])
  },

  watch: {
    enterpriseId: {
      deep: true,
      handler() {
        this.ruleForm = {
          name: localStorage.getItem('ENTERPRRISE_NAME_SWITCH'),
          introduction: localStorage.getItem('ENTERPRRISE_DESC_SWITCH'),
          fileList: localStorage.getItem('ENTERPRRISE_ICON_SWITCH') == '' ? [] : [{file_url: localStorage.getItem('ENTERPRRISE_ICON_SWITCH')}],
        }
      }
    }
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    console.log(localStorage.getItem('ENTERPRRISE_ICON_SWITCH'));
    this.ruleForm = {
      name: localStorage.getItem('ENTERPRRISE_NAME_SWITCH'),
      introduction: localStorage.getItem('ENTERPRRISE_DESC_SWITCH'),
      fileList: [],
    }
  },
  methods: {
    handleUploadChangeMiniCode(file, fileList) {
      this.requestOffcialAccpunt.image = file.raw
      this.requestOffcialAccpunt.image_name = file.name
    },

    handleSuccessMiniCode(response, file, fileList) {
      this.ruleForm.fileList = [{
        name: response.data.name,
        file_url: response.data.new_url
      }]
      console.log(this.ruleForm.fileList,'上传成功')
    },
    submitForm(formName) {
      console.log('修改')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.fileList.length);
          let data = {
            "company_code": '',
            "company_name": this.ruleForm.name,
            "company_desc": this.ruleForm.introduction,
            "icon_url": this.ruleForm.fileList.length == 0 ? '' : this.ruleForm.fileList[0].file_url
          }
          companyBasicMsg(data).then(res => {
            console.log(res);
            if (res.code == 20000) {
              localStorage.setItem('ENTERPRRISE_NAME_SWITCH', this.ruleForm.name)
              localStorage.setItem('ENTERPRRISE_ICON_SWITCH', this.ruleForm.fileList.length == 0 ? '' : this.ruleForm.fileList[0].file_url)
              localStorage.setItem('ENTERPRRISE_DESC_SWITCH', this.ruleForm.introduction)
              this.$store.dispatch('user/changeEnterpriseIcon', this.ruleForm.fileList.length == 0 ? '' : this.ruleForm.fileList[0].file_url)
              this.$message.success('修改成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handlePictureCardPreview() {
      this.dialogVisible = true
      this.dialogImageUrl = httpUrls.ossUrl + this.ruleForm.fileList[0].file_url
    },

    handleRemove() {
      this.ruleForm.fileList = []
    },
  }
}
</script>

<style scoped lang="scss">
.Enterprise-Settings {
  padding: 20px;

  .titls {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%; /* 21px */
  }
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

.draw_image-class_dark .el-dialog {
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* max-height: 800px;
  min-height: 500px; */
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
  display: none;
}

.draw_image-class_dark .el-dialog__header {
  display: none;
}

.draw_image-class_dark .el-dialog__body {
  padding: 0;
}
</style>