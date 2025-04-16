<template>
  <!-- 
    提现
   -->
  <div class="withdrawal">
    <go-back></go-back>

    <div style="width: 734px;margin: auto;margin-bottom: 28px;" class="cont_input">
      <el-form style="width: 600px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item style="width: 380px;" label="可提现金额">
          <div style="color: #EB504B;">{{ moneyNumber }}(元)</div>
        </el-form-item>
        <el-form-item label="到账银行" prop="bank" class="to-bank-list">
          <el-select v-model="ruleForm.bank" placeholder="请选择到账银行" style="width: 380px;">
              <el-option
              v-for="item in bankList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
            
            <el-button icon="el-icon-plus" type="text" style="margin-left: 20px;" @click="$router.push('/bindBank/bindBank')">添加银行卡</el-button>
          </el-form-item>
          <el-form-item label="提现金额" prop="number">
            <el-input v-model="ruleForm.number" type="number" placeholder="请输入提现金额" @change="changeBlurNumber" @blue="changeBlurNumber" class="container_textarea" style="width: 380px;" :max="1000"></el-input>
            <div style="display: flex;justify-content: space-between;width: 380px;">
              <span style="color: #999999;">提现金额为100的倍数</span>
              <span style="color: #1F64FF;cursor: pointer;" @click="totalWithdrawal">全部提现</span>
            </div>
          </el-form-item>
          <el-form-item style="width: 480px;">
              <el-button style="width: 70%;margin: 0 auto;display: block;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      <div style="width: 234px;"></div>
    </div>
  </div>
</template>

<script>
import { getBankCardList, startWithdrawal } from '../../api/distribution'
import GoBack from '../../components/goBack'
import httpUrls from '../../api/requestURL'

export default {
  name: 'withdrawal',
  data() {
    return {
      bankList: [],
      moneyNumber: 0,

      ruleForm: {
        bank: '',
        number: '',
      },
      rules: {
        bank: [
          { required: true, message: '请选择到账银行', trigger: 'change' }
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
  created() {
    this.queryBankCardList();
  },
  mounted() {
    document.title = httpUrls.name
    this.moneyNumber = sessionStorage.getItem('number_money')
  },
  methods: {
    // 获取银行卡列表
    queryBankCardList() {
      getBankCardList().then(res => {
        this.bankList = []
        res.data.forEach(v => {
          this.bankList.push({
            value: v.card_code,
            label: v.bank + '('+v.card_number.slice(v.card_number.length - 5, v.card_number.length - 1)+')'
          })
        })
      })
    },

    changeBlurNumber() {
        if (this.ruleForm.number % 100 != 0) {
          this.$message.error('提现金额需为100的倍数')
        }
    },

    totalWithdrawal() {
      this.ruleForm.number = Math.floor(Number(this.moneyNumber) / 100) * 100
    },

    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (Number(this.ruleForm.number) > Number(this.moneyNumber)) {
            this.$message.error('提现金额不能大于可提现金额！')
            return
          }
          if (Number(this.ruleForm.number) % 100 != 0 || Number(this.ruleForm.number) <= 100) {
            this.$message.error('提现金额需为100的倍数，并且不能小于100')
            return
          }
          let data = {
            "withdrawal_amount": this.ruleForm.number,
            "card_code": this.ruleForm.bank
          }
          startWithdrawal(data).then(res => {
            if (res.code == 20000) {
              this.$message.success('提交成功，请留意银行卡转账信息')
              this.ruleForm = {
                bank: '',
                number: '',
              }
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        }
      });
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

.withdrawal .container_textarea input::-webkit-outer-spin-button, .withdrawal .container_textarea input::-webkit-inner-spin-button{
  -webkit-appearance: none;
}
.withdrawal .container_textarea input[type='number'] {
  -moz-appearance: textfield;
}
.to-bank-list .el-form-item__content {
  display: flex;
}
</style>