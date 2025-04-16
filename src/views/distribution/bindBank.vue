<template>
  <!-- 
    添加银行卡
   -->
  <div class="withdrawal">
    <go-back></go-back>

    <div style="width: 734px;margin: auto;margin-bottom: 28px;" class="cont_input">
      <el-form style="width: 500px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入您的银行卡号" @input="handleInputChange"></el-input>
        </el-form-item>
        <el-form-item label="所属银行" prop="bank">
          <el-input v-model="ruleForm.bank" placeholder="请输入所属银行"></el-input>
        </el-form-item>
        <el-form-item label="支行名称" prop="subBranch">
            <el-input v-model="ruleForm.subBranch" placeholder="请输入支行名称" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 70%;margin: 0 auto;display: block;" type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        </el-form-item>
      </el-form>
      <div style="width: 234px;"></div>
    </div>
  </div>
</template>

<script>
import { getBack, setBankCard } from '../../api/distribution'
import GoBack from '../../components/goBack'
import httpUrls from '../../api/requestURL'

export default {
  name: 'withdrawal',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
          callback(new Error("请输入您的手机号"))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"))
      } else {
          callback()
      }
    };
    return {
      isClick: true,

      typeArr: [],

      ruleForm: {
        name: '',
        code: '',
        bank: '',
        subBranch: '',
        phone: '',
        number: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入您的银行卡号', trigger: 'blur' },
        ],
        bank: [
          { required: true, message: '请输入所属银行', trigger: 'blur' }
        ],
        subBranch: [
          { required: true, message: '请输入银行所属支行', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入您要提现的金额', trigger: 'blur' },
        ],
      }
    }
  },
  components: {
    GoBack
  },
  mounted() {
    document.title = httpUrls.name
  },
  methods: {
    handleInputChange(e) {
      if (this.isClick) {
        this.isClick = false
        setTimeout(() => {
          this.isClick = true
        }, 500);
        getBack(e).then(res => {
          this.ruleForm.bank = res.data.bank
        })
      }
    },

    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let data = {
            "name": this.ruleForm.name,
            "card_number": this.ruleForm.code,
            "bank": this.ruleForm.bank,
            "bank_name": this.ruleForm.subBranch,
            "mobile": this.ruleForm.phone,
          }
          setBankCard(data).then(res => {
            if (res.code == 20000) {
              this.$message.success('添加成功')
              this.ruleForm = {
                name: '',
                code: '',
                bank: '',
                subBranch: '',
                phone: '',
                number: '',
              }
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.withdrawal {
  height: calc(100% - 100px);
  position: relative;
}
  .withdrawal .cont_input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    /* flex-direction: column; */
  }
</style>
<style>
.withdrawal .cont_input .el-input__inner {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #DCDFE6;;
  height: 40px;
  font-size: 14px;
  padding-left: 10px;
} 

.withdrawal .container_textarea textarea {
  height: 72px;
  padding: 5px 10px;
}
</style>