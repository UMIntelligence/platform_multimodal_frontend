<template>
  <!-- 
    数字员工
   -->
  <div class="digital-employees">
    <div class="top">
      <div class="title_list">
        <div class="title">企业AI数字员工</div>
        <div class="content">创建一个属于企业的AI数字员工，来精准解决实际业务场景的问题，并且可添加多个企业AI数字员工</div>
      </div>
      <div>
        <el-button icon="el-icon-plus" class="add_robot" @click="addDigitalEmploy">新增AI数字员工</el-button>
      </div>
    </div>

    <div class="steps">
      <div class="num" style="background-color: #1f64ff;color: #FFFFFF;">1</div>
      <div class="title">上传知识库</div>
      <div class="btn" @click="goEditBase">去上传</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="129" height="2" viewBox="0 0 129 2" fill="none">
        <path d="M0 1H129" stroke="#E5E6EB"/>
      </svg>
      <div class="num">2</div>
      <div class="title">创建AI数字员工</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="129" height="2" viewBox="0 0 129 2" fill="none">
        <path d="M0 1H129" stroke="#E5E6EB"/>
      </svg>
      <div class="num">3</div>
      <div class="title">开始对话</div>
    </div>

    <div class="robot_list">
      <div class="item" v-for="(item, i) in digitalList" :key="i">
        <i class="el-icon-circle-close close-cion" @click="deleteDigiter(item)"></i>
        <div class="robt_name">
          <div class="robot_status">
            <img :src="httpUrls.ossUrl + item.icon_url" alt="" class="img">
            <div v-if="item.d_status == 1" class="statu">训练中</div>
          </div>
          <span class="names">{{ item.clerk_name }}</span>
        </div>
        <div class="btn_list">
          <el-button class="edit_btn" @click="editDigitals(item)">编辑</el-button>
          <el-button class="chat_btn" @click="goChat(item)">开始对话</el-button>
        </div>
      </div>
    </div>

    <el-dialog
      title="新增企业AI数字员工"
      :visible.sync="dialogVisible"
      width="450px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="image">
          <el-upload
            style="max-width: 500px;"
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            accept=".png,.jpg,.jpeg"
            :on-change="handleUploadChangeMiniCode"
            :on-success="handleSuccessMiniCode"
            list-type="picture-card"
            :limit="1"
            :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
            :auto-upload="true"
            ref="miniCodeList"
            :headers="headerData"
            :file-list="ruleForm.image"
            :data="requestMiniCode"
            class="upload-file-code">
            <div class="upload-btn">
              <div class="btn-mask">
                <i class="el-icon-plus" style="font-size: 18px;"></i>
                <div>点击上传</div>
              </div>
            </div>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="httpUrls.ossUrl + file.file_url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemoveMiniCode(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
          <!-- <el-input v-model="ruleForm.image"></el-input> -->
        </el-form-item>
        <el-form-item label="欢迎语设置" prop="tips">
          <el-input v-model="ruleForm.tips" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="绑定知识库" prop="bindBase">
          <el-select v-model="ruleForm.bindBase" placeholder="请选择">
            <el-option
              v-for="item in knowledgeClerkList"
              :key="item.knowledge_code"
              :label="item.title"
              :value="{company_code: item.company_code, knowledge_code: item.knowledge_code}">
            </el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.bindBase"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import httpUrls from '../../../api/requestURL'
import { digitalClerkList, knowledgeList, digitalAddClerk, digitaldeleteClerk } from '../../../api/chatMG'
export default {
  name: 'Digital-Employees',
  data() {
    return {
      httpUrls,
      digitalList: [],
      knowledgeClerkList: [],
      dialogVisible: false,
      disabled: false,
      headerData: {},
      // 小程序二维码列表
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'enterprise-digitized_human-logo'
      },
      ruleForm: {
        name: '',
        image: [],
        tips: '',
        bindBase: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        image: [
          { required: true, message: '请上传数字员工的图标', trigger: 'blur' },
        ],
        tips: [
          { required: true, message: '请输入提示语', trigger: 'blur' },
        ],
        bindBase: [
          { required: true, message: '请选择绑定知识库', trigger: 'blur' },
        ],
      }
    }
  },

  computed: {
    ...mapGetters(['enterpriseId'])
  },
  
  watch: {
    enterpriseId: {
      deep: true,
      handler() {
        this.digitalClerkList()
      }
    }
  },

  created() {
    this.digitalClerkList()
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },

  methods: {
    addDigitalEmploy() {
      this.ruleForm = {
        name: '',
        image: [],
        tips: '',
        bindBase: '',
      }
      this.dialogVisible = true
      this.knowledgeList()
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
              "company_code": this.ruleForm.bindBase.company_code,
              "knowledge_code": this.ruleForm.bindBase.knowledge_code,
              "clerk_name": this.ruleForm.name,
              "icon_url": this.ruleForm.image[0].file_url,
              "welcome_msg": this.ruleForm.tips
          }
          digitalAddClerk(data).then(res => {
            console.log(res);
            if (res.code == 20000) {
              this.$message.success('创建成功')
              this.dialogVisible = false
              this.digitalClerkList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },

    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },

    // 上传小程序二维码
    handleUploadChangeMiniCode(file, fileList) {
      this.requestMiniCode.image = file.raw
      this.requestMiniCode.image_name = file.name
    },
    // 成功的回调
    handleSuccessMiniCode(response, file, fileList) {
      this.ruleForm.image.push({
        name: response.data.name,
        file_url: response.data.new_url
      })
    },
    handleRemoveMiniCode(file) {
      this.ruleForm.image.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.ruleForm.image.splice(i, 1)
        }
      });
    },

    // 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = httpUrls.ossUrl + file.file_url;
      this.dialogVisible = true;
    },

    // 获取数字员工列表
    digitalClerkList() {
      let code = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
      digitalClerkList(`company_code=${code}`).then(res => {
        console.log(res);
        this.digitalList = res.data.data
      })
    },

    // 获取知识库列表
    knowledgeList() {
      let companyCode = sessionStorage.getItem('COMPANY_CODE')
      let data = `company_code=${companyCode}`
      knowledgeList(data).then(res => {
        console.log(res);
        this.knowledgeClerkList = res.data.data
      })
    },

    // 编辑数字员工
    editDigitals(item) {
      sessionStorage.setItem('DIGITAL_EMPLOYESS_ITEM', JSON.stringify(item)) // 数字员工的数据
      this.$router.push('/enterpriseWEB/indexList/digitalEmployeesEdit')
    },

    goChat(item) {
      if (item.d_status == 1) {
        this.$message('机器人正在训练中，请等待训练完成后再试!')
        return
      }
      sessionStorage.setItem('DIGITAL_EMPLOYESS_ITEM', JSON.stringify(item)) // 数字员工的数据
      this.$router.push('/enterpriseWEB/indexList/chat')
    },

    deleteDigiter(item) {
      this.$confirm('此操作将永久删除该数字员工, 是否继续?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        digitaldeleteClerk(item.clerk_code).then(res => {
          console.log(res);
          if (res.code == 20000) {
            this.digitalClerkList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },

    goEditBase() {
      sessionStorage.setItem('EDIT_BASE_TYPE', 3)
      this.$router.push('/enterpriseWEB/indexList/editBase')
    }
  }
}
</script>

<style scoped lang="scss">
.digital-employees {
  margin: 20px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    .title_list {
      .title {
        color: #000;
        font-size: 14px;
        font-weight: 500;
      }

      .content {
        color: #666;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}

.add_robot {
  border-radius: 4px;
  background: #1F64FF;
  padding: 8px;
  color: #ffffff;
}

.steps {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    line-height: 28px;
    text-align: center;
    background-color: #F2F3F5;
    margin: 0 6px;
  }

  .title {
    color: #1D2129;
    font-size: 16px;
    font-weight: 500;
    margin: 0 6px;
  }

  .btn {
    color: #1F64FF;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-right: 12px;
  }
}

.robot_list {
  display: flex;
  flex-wrap: wrap;

  .item {
    border-radius: 8px;
    border: 1px solid #DEDEDE;
    background: #FFF;
    margin-right: 20px;
    position: relative;
    padding: 20px;
    width: calc(33% - 62px);
    margin-bottom: 20px;

    .close-cion {
      position: absolute;
      right: 20px;
      top: 20px;
      font-weight: bold;
      cursor: pointer;
    }

    .robt_name {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      
      .robot_status {
        position: relative;
        margin-right: 20px;
        
        .statu {
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          color: #FFF;
          font-size: 12px;
          padding: 2px 0;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }

      .img {
        width: 80px;
        height: 80px;
      }
    }

    .btn_list {
      display: flex;
      justify-content: space-between;

      .edit_btn {
        width: calc(50% - 5px);
        padding: 8px 0;
        border-radius: 4px;
        background: #EEE;
        color: #000;
        font-size: 16px;
        font-weight: 400;
      }

      .chat_btn {
        width: calc(50% - 5px);
        padding: 8px 0;
        border-radius: 4px;
        background: #1f64ff;
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}

</style>

<style scoped>
@media (width <= 1440px) and (width > 1152px) {
  .robot_list .item {
    width: calc(50% - 62px);
  }
}

@media (width <= 1152px) {
  .robot_list .item {
    width: calc(100% - 62px);
  }
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