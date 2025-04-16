<template>
  <div class="question-feedback">
    <GoBack></GoBack>
    <div style="width: 734px;margin: auto;margin-bottom: 28px;" class="cont_input">
      <el-form style="width: 500px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
        class="demo-ruleForm">
        <el-form-item label="问题详情描述" prop="problem" class="file-mark">
          <el-input type="textarea" v-model="ruleForm.problem" resize='none' placeholder="请尽可能详细描述原因，以便我们更好的为您提供帮助" class="question-textarea"></el-input>
          <uploadFile class="file-item" @imageurl="iamgeUrl" :resetImgList="resetImgList"></uploadFile>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="请输入您的联系方式，手机号/邮箱" maxlength="11" class="feedback_input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 70%;margin: 0 auto;display: block;" type="primary"
            @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <div style="width: 234px;"></div>
    </div>

  </div>
</template>

<script>
import {problemFeedback} from '../../api/prompts'
import GoBack from '../../components/goBack'
import uploadFile from '../../components/uploadFile/uploadDefault'
import httpUrls from '../../api/requestURL'

export default {
  name: 'questionFeedback',
  data() {
    return {
      imageList: [],
      ruleForm: {
        problem: '',
        contact: '',
      },
      rules: {
        problem: [
          { required: true, message: '请输入您的问题', trigger: 'blur' },
        ],
      },
      resetImgList: false
    }
  },
  components: {
    uploadFile,
    GoBack
},
  mounted() {
    document.title = httpUrls.name
  },
  methods: {
    iamgeUrl(url) {
      console.log(url);
      this.imageList.push(url)
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let data = {
            "picture_url_list": this.imageList,
            "problem": this.ruleForm.problem,
            "contact": this.ruleForm.contact
          }
          problemFeedback(data).then(res => {
            if (res.code == 20000) {
              this.$message.success('提交成功')
              setTimeout(() => {
                this.imageList = []
                this.resetImgList = true
                this.ruleForm = {
                  problem: '',
                  contact: '',
                }
              }, 500);
            } else {
              this.resetImgList = false
              this.$message.error('提交失败')
            }
          })
        }
      })
    }
  },
}
</script>

<style scoped>
.question-feedback {
  position: relative;
  margin-top: 30px;
}
.cont_input {
  display: flex;
}

.file-item {
  margin-top: 20px;
}

.question-textarea {
  border-radius: 4px 4px 0 0;
}
</style>

<style>
.question-textarea textarea {
  height: 120px;
  border: none;
  border-radius: 4px 4px 0 0;
  padding-top: 16px;
}
.file-mark .el-form-item__content {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

.feedback_input input{
  background-color: #FFF;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  color: #606266;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  width: 100%;
}

.file-mark > label::before {
  content: '* ';
  color: #f56c6c;
}
</style>