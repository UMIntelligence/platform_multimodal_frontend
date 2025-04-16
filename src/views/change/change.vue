/**
 * 商务合作
 */
<template>
  <div class="container">
    <GoBack></GoBack>
      <div class="cont_input">
          
         <div class="cont_title">卡密兑换</div>
          <div class="cont_text">
              <div class="text_right">
                <el-input placeholder="请输入兑换卡密" v-model="cardName" style="width: 300px" @blur="cardCheck"></el-input>
                <span class="warn_text" v-if="isCard">{{ cardMsg }}</span> 
              </div>
          </div>

          <div class="btn_submit" @click="submit">
            <div class="btn_text">
                兑换
            </div>
          </div>
      </div>
    <div style="width: 234px;"></div>


       <!-- 注册组件 -->
       <Register ref="Register"></Register>
        
  </div>
</template>

<script>
import { cardChange } from '../../api/chatMG'
import httpUrls from '../../api/requestURL'
import Register from '../../components/register'
import GoBack from '../../components/goBack';
export default {
  name: 'order',
  data() {
    return {
        cardName: '',
        isCard: false,
        cardMsg: '',
        isClick: true
    }
  },
  // 注册组件
  components: {
    Register,GoBack
  },

  /**
   * 创建完毕
   */
  created() {
    
  },

  mounted() {
    document.title = httpUrls.name
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    cardCheck() {
        if(this.cardName == '') {
            this.isCard = true;
            this.cardMsg = '卡密不能为空'
            return
        } else {
            this.isCard = false;
            this.cardMsg = ''
        }
    },

    submit() {
        let loginInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (loginInfo.role == 'guess') {
            this.$refs.Register.registerVisible = true
            return
        }
        if(this.cardName == '') {
            this.isCard = true;
            this.cardMsg = '卡密不能为空'
            return
        } else {
            this.isCard = false;
            this.cardMsg = ''
        }

        if(this.isClick == false) {
            return false;
        }
        this.isClick = false;

        let val = {
            'activate_code': this.cardName,
            'user_id': loginInfo.user_id
        }

        cardChange(val).then(res => {
            if (res.code == 20000) {
               this.$message.success('兑换成功');
               this.cardName = '';
               this.isClick = true;
            } else {
                this.isClick = true;
                this.$message.error(res.msg);
            }
        }).catch(err => {
            this.isClick = true;
            this.$message.error('兑换失败！');
        })
    }
  }
}
</script>

<style scoped>
   .container {
      width: 100%;
      height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
   }
   .cont_input {
      display: flex;
      flex-direction: column;
   }
   .cont_title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 34px;
      text-align: center;
      margin-bottom: 30px;

   }

   .cont_text {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
   }
   .text_left {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 80px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 34px;
      margin-right: 15px;
   }
   .text_right {
      display: flex;
      flex-direction: column;
   }

   .warn_text {
        font-style: normal;
        font-size: 12px;
        line-height: 22px;
        color: #db3232;
        text-align: left;
    }

   .btn_submit {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        
   }

   .btn_text {
        background: #1F64FF;
        box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
        border-radius: 6px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 250%;
        color: #fff;
        width: 50%;
        text-align: center;
        cursor: pointer;
   }



</style>
<style>
   .cont_input .el-input__inner {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #DCDFE6;;
        height: 40px;
        font-size: 14px;
        padding-left: 10px;
    } 
</style>

 
 