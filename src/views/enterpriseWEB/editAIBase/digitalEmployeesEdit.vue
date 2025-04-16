<template>
  <div class="digitalEmployeesEdit">
    <div class="edit_tit" @click="$router.go(-1)">
      <i class="el-icon-back"></i>
      机器人名称
    </div>

    <div class="switch_type">
      <div class="msak">
        <div :class="type == 1 ? 'item item-on' : 'item'" @click="switchType(1)">编辑企业AI数字员工</div>
        <div :class="type == 2 ? 'item item-on' : 'item'" @click="switchType(2)">对话历史记录</div>
      </div>
    </div>

    <div class="digital-employees" v-if="type == 1">
      <div class="title">基本信息</div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="image">
          <el-upload style="max-width: 500px;" :action="httpUrls.loginUrl + 'api/user/oss_upload'" :headers="headerData"
            accept=".png,.jpg,.jpeg" :on-change="handleUploadChangeMiniCode" :on-success="handleSuccessMiniCode"
            list-type="picture-card" :limit="1" :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
            :auto-upload="true" ref="miniCodeList" :file-list="ruleForm.image" :data="requestMiniCode"
            class="upload-file-code">
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
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemoveMiniCode(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <div class="title_prompt">请上传jpg/png文件，文件大小不超过5MB</div>
          <!-- <el-input v-model="ruleForm.image"></el-input> -->
        </el-form-item>
        <el-form-item label="欢迎语设置" prop="tips">
          <el-input type="textarea" v-model="ruleForm.tips" style="width: 500px;" :autosize="{minRows: 3, maxRows: 6}"></el-input>
        </el-form-item>
        <!-- <div class="title">对话相关</div>
        <el-form-item label="绑定知识库" prop="bindBase">
          <el-select v-model="ruleForm.bindBase" placeholder="请选择" style="width: 500px;">
            <el-option
              v-for="item in knowledgeClerkList"
              :key="item.knowledge_code"
              :label="item.title"
              :value="{clerk_code: item.clerk_code, knowledge_code: item.knowledge_code}">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #1F64FF;padding: 8px 18px;">更新</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="chat-history" v-else>
      <div class="ttile">聊天历史记录</div>
      <el-table
        :data="tableData"
        :header-cell-style="{color: '#70767F', fontSize: '12px', backgroundColor: '#F6F8FA', padding: '0', height: '40px', lineHeight: '44px'}"
        :cell-style="{padding: '0', height: '40px', lineHeight: '44px'}"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="提问标题">
        </el-table-column>
        <el-table-column
          prop="nick_name"
          label="提问者">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="continueChat(scope.row)">继续对话</el-button>
              <el-button type="text" @click="deleteChat(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex;justify-content: flex-end;margin-top: 30px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpUrls from '../../../api/requestURL'
import { knowledgeList, digitalUpdataClerk, robotChatList, ChatDelete } from '../../../api/chatMG'

export default {
  name: 'digitalEmployeesEdit',
  data() {
    return {
      httpUrls,
      type: 1,
      disabled: false,
      knowledgeClerkList: [],
      page: 1,
      pageSize: 10,
      totalSize: 0,
      tableData: [],
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
        this.$router.go(-1)
      }
    }
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    this.knowledgeList()
    let data = JSON.parse(sessionStorage.getItem('DIGITAL_EMPLOYESS_ITEM'))
    this.ruleForm = {
      name: data.clerk_name,
      image: [{file_url: data.icon_url}],
      tips: data.welcome_msg,
      bindBase: {clerk_code: data.clerk_code, knowledge_code: data.knowledge_code},
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
              "knowledge_code": this.ruleForm.bindBase.knowledge_code,
              "clerk_name": this.ruleForm.name,
              "icon_url": this.ruleForm.image[0].file_url,
              "welcome_msg": this.ruleForm.tips
          }
          digitalUpdataClerk(this.ruleForm.bindBase.clerk_code, data).then(res => {
            console.log(res);
            if (res.code == 20000) {
              this.$message.success('修改成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },

    continueChat(row) {
      this.$router.push({
        name: '数字员工对话',
        params: {session_code: row.session_code}
      })
    },

    deleteChat(row) {
      // 删除对话
      let codes = [];
      codes.push(row.session_code);
      let val = {
        'session_codes': JSON.stringify(codes),
      }
      this.$confirm('是否删除所选信息?', '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          ChatDelete(val).then(res => {
            if(res.code == 20000) {
              this.page = 1;
              this.getChatList('');
              this.current = -1;
              this.$root.Bus.$emit('delChat', 1) //删除对话框内容
              this.$message.success('删除成功！')
              // 删除最近会话
              deleteFootprint(`type_code=chat&eid=${code}`).then(res => {})
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error('删除失败！')
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getChatList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.getChatList()
    },

    switchType(type) {
      this.type = type
      if (type == 2) {
        this.getChatList()
      }
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

    knowledgeList() {
      let companyCode = sessionStorage.getItem('COMPANY_CODE')
      let data = `company_code=${companyCode}`
      knowledgeList(data).then(res => {
        console.log(res);
        this.knowledgeClerkList = res.data.data
      })
    },

    // 获取对话列表
    getChatList() {
      let robot = JSON.parse(sessionStorage.getItem('DIGITAL_EMPLOYESS_ITEM'))
      console.log(robot);
      let val = `chat_type=8&page_size=${this.pageSize}&page=${this.page}&company_code=${robot.company_code}&clerk_code=${robot.clerk_code}`
      robotChatList(val).then(res => {
        if (res.code == 20000) {
          this.tableData = res.data.data;
          this.totalSize = res.data.total;
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
          this.$message.error('获取失败！')
      })
    },
  }
}
</script>

<style scoped lang="scss">
.edit_tit {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%; /* 21px */
  margin-bottom: 16px;
  cursor: pointer;
}
.digitalEmployeesEdit {
  padding: 20px;
}

.upload-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  
  .btn-mask {
    line-height: 24px;
    margin: auto;
    font-size: 14px;
  }
}

.switch_type {
  display: flex;
  border-radius: 2px;

  .msak {
    border-radius: 2px;
    background: #F2F3F5;
    padding: 3px;
    display: flex;

    .item {
      border-radius: 2px;
      padding: 4px 12px;
      background-color: #F2F3F5;
      color: #4E5969;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      line-height: 22px; /* 157.143% */
    }

    .item.item-on {
      background-color: #FFF;
      color: #1f64ff;
    }
  }
}

.digital-employees {
  .title {
    color: #000;
    font-size: 22px;
    font-weight: 500;
    line-height: 22px; /* 100% */
    margin: 30px 0 20px 0;
  }
}

.chat-history {
  .ttile {
    color: #000;
    font-size: 22px;
    font-weight: 500;
    line-height: 22px; /* 100% */
    margin: 30px 0 20px 0;
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
</style>