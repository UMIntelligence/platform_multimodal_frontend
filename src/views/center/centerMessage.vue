<template>
  <!-- 
    修改个人信息
   -->
  <div class="center-message">
    <GoBackNew></GoBackNew>
    <div class="center_msg_mask">
      <div class="tit_title">个人信息</div>
      <div class="item-mask">
        <div class="left-msg">
          <div style="display: flex;align-items: center;">
            <img style="width: 42px;height: 42px;margin-right: 16px;border-radius: 50%;" :src="httpUrls.ossUrl + userInfo.avatar_url" alt="">
            <span class="item-title">头像</span>
          </div>
          <div class="item-content" style="margin-top: 10px;">支持2M以内的JPG或PNG图片</div>
        </div>
        <div class="right-btn">
          <el-upload
          style="border: 0px;"
            class="avatar-uploader"
            accept=".png,.jpg,.jpeg"
            :action="httpUrls.loginUrl + 'api/user/oss_upload'"
            :show-file-list="false"
            :data="userPictureData"
            :on-change="handleChangePicture"
            :on-success="handleAvatarSuccess"
            :headers="headerData"
            :before-upload="beforeAvatarUpload">
            <el-button style="padding: 9px 21px;">修改头像</el-button>
          </el-upload>
        </div>
      </div>

      <div class="item-mask">
        <div class="left-msg">
          <div class="item-title">用户名</div>
          <div class="item-content">{{ userInfo.nick_name }}</div>
        </div>
        <div class="right-btn">
          <el-button style="padding: 9px 21px;" @click="editunserName = true, editUsername = ''">修改用户名</el-button>
        </div>
      </div>

      <div class="item-mask">
        <div class="left-msg">
          <div class="item-title">登录密码</div>
          <div class="item-content">******</div>
        </div>
        <div class="right-btn">
          <el-button style="padding: 9px 21px;" @click="editPassword = true">修改密码</el-button>
        </div>
      </div>

      <div class="item-mask">
        <div class="left-msg">
          <div class="item-title">绑定手机号</div>
          <div class="item-content">{{ phone || '未绑定手机号' }}</div>
        </div>
        <div class="right-btn">
          <el-button v-if="this.userInfo.role == 'user' && this.phone == ''" style="padding: 9px 21px;" @click="editphoneNumber = true">绑定手机号</el-button>
        </div>
      </div>
      <!-- <div class="item-mask">
        <div class="left-msg">
          <div class="item-title">
            实名认证/授权
          </div>
          <div class="item-content" :style="userInfo.is_real_name==1?'color: red;cursor: pointer;':'color: green;'">{{userInfo.is_real_name==1?'未认证':'已认证'}}</div>
        </div>
        <div class="right-btn">
          <el-popover
                placement="right"
                width="190"
                ref="popover"
                trigger="click">
                <div style="padding: 15px;">
                  <img style="width: 160px;height: 160px;" :src='httpUrls.ossUrl + "static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png"' alt="">
                  <div style="text-align: center;">请前往小程序端进行实名认证</div>
                </div>
                <el-button slot="reference" style="padding: 9px 21px;" >前往小程序认证</el-button>
              </el-popover>
          
        </div>
      </div> -->
    </div>

    <el-dialog
      title="修改用户名"
      :visible.sync="editunserName"
      width="400px">
      <el-input v-model="editUsername"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editunserName = false">取 消</el-button>
        <el-button type="primary" @click="submitUserName">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="editPassword"
      width="400px">
      <div class="ruleform_list" v-if="userInfo.is_password == 1">
        <span style="width: 96px;text-align: right;margin-right: 20px;">旧密码</span>
        <el-input style="width: 220px;" v-model="oldPassword" show-password></el-input>
      </div>
      <div class="ruleform_list">
        <span style="width: 96px;text-align: right;margin-right: 20px;">新密码</span>
        <el-input style="width: 220px;" v-model="newPassword" show-password></el-input>
      </div>
      <div class="ruleform_list">
        <span style="width: 96px;text-align: right;margin-right: 20px;">确认新密码</span>
        <el-input style="width: 220px;" v-model="submitNewPassword" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPassword = false">取 消</el-button>
        <el-button type="primary" @click="submitPassword">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="绑定手机号"
      :visible.sync="editphoneNumber"
      width="500px">
      <div class="ruleform_list">
        <span style="width: 96px;text-align: right;margin-right: 20px;">手机号</span>
        <el-input style="width: 325px;" v-model="phoneNumber"></el-input>
      </div>
      <div class="ruleform_list" style="position: relative;">
        <span style="width: 96px;text-align: right;margin-right: 20px;">验证码</span>
        <el-input style="width: 325px;" v-model="phoneCode"></el-input>
        <el-button v-if="codeNumber != 60" type="text" style="position: absolute;right: 36px;">{{ codeNumber }}</el-button>
        <el-button v-else type="text" style="position: absolute;right: 36px;" @click="getPhoneCode">获取验证码</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editphoneNumber = false">取 消</el-button>
        <el-button type="primary" @click="submitPhoneNumber">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <get-image-code @queryimagecode="queryImageCode" ref="imageCode"></get-image-code> -->
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import { setAvatarUrl, editName, getCode, updatePassword, bindPhone } from '../../api/chatMG'
import getImageCode from '../../components/getImageCode'
import GoBackNew from "../../components/GoBackNew";

export default {
  name: 'center-message',
  data() {
    return {
      ticket:'',
      randstr:"",
      httpUrls,
      userInfo: {},
      phone: '',
      imageUrl: '',
      userPictureData: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'user_head_sculpture'
      },
      editunserName: false,
      editUsername: '',

      editPassword: false,
      oldPassword: '',
      newPassword: '',
      submitNewPassword: '',

      editphoneNumber: false,
      phoneNumber: '',
      phoneCode: '',
      codeNumber: 60,

      headerData: {}
     }
  },
  components: {
    getImageCode,
    GoBackNew
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (this.userInfo.role == 'user' && this.userInfo.mobile != '') {
      this.phone = this.updatePhoneNumber(this.userInfo.mobile)
    }

    this.headerData.authorization = this.userInfo.token
    this.headerData.role = this.userInfo.role
  },
  methods: {
    submitFrom() {
      if (this.imageUrl == '') {
        this.$message.error('请上传一张图片')
        return
      }
      setAvatarUrl({avatar_url: this.imageUrl}).then(res => {
        this.$message.success('修改成功')
        this.userInfo.avatar_url = this.imageUrl
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        this.$store.dispatch('user/changeUserDataInfo', this.userInfo)
      })
    },
    handleChangePicture(file, fileList) {
      console.log(file);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        this.userPictureData.image = file.raw
        this.userPictureData.image_name = file.name
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.data.new_url
      this.submitFrom()
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    // 修改用户名
    submitUserName() {
      if(this.editUsername.length > 16){
        this.$message.error('用户名不能超过16字符！')
        return
      }
      editName({user_name: this.editUsername}).then(res => {
        if (res.code == 20000) {
          this.$message.success('修改成功');
          this.editunserName = false
          this.userInfo.nick_name = this.editUsername
          this.userInfo.user_name = this.editUsername
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          this.$store.dispatch('user/changeUserDataInfo', this.userInfo)
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error('修改失败!');
      })
    },

    // 修改密码
    submitPassword() {
      if (this.oldPassword == '' && this.userInfo.is_password == 1) {
        this.$message.error('请输入旧密码')
        return
      }
      if (this.newPassword == '' || this.submitNewPassword == '') {
        this.$message.error('请输入新密码')
        return
      }
      if (this.newPassword != this.submitNewPassword) {
        this.$message.error('新密码不一致')
        return
      }

      let data = {
        password: this.newPassword
      }
      if (Number(this.userInfo.is_password) == 1) {
        data.old_password = this.oldPassword
      }
      updatePassword(data).then(res => {
        if (res.code == 20000) {
          this.$message.success('修改成功')
          this.editPassword = false
          this.oldPassword = ''
          this.newPassword = ''
          this.submitNewPassword = ''
          this.userInfo.is_password = 1
          localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    queryImageCode() {
      let val = { mobile: this.phoneNumber,action:"web",Ticket:this.ticket,Randstr:this.randstr };
      getCode(val).then(res => {
          if (res.code == 20000) {
            this.$message.error('验证码已发送')
            let timer = setInterval(() => {
              this.codeNumber--
              if (this.codeNumber <= 0) {
                clearInterval(timer)
                this.codeNumber = 60
              }
            }, 1000);
          } else {
              this.$message.error(res.msg);
              this.codeNumber = 60
          }
      }).catch(err => {
          this.$message.error('获取验证码失败!');
          this.isClick = true;
      })
    },
    getTicket() {
      return new Promise((resolve, reject) => {
        let Captcha = new TencentCaptcha("193069182", (res) => {
          console.log(res);
          if (res.ret === 0) {
            this.ticket = res.ticket;
            this.randstr = res.randstr
            resolve(true);
          } else {
            resolve(false);
          }
        });
        Captcha.show();
      });
    },
    // 获取验证码
    getPhoneCode() {
      if (this.phoneNumber == '') {
        this.$message.error('手机号不能为空')
        return
      }
      this.getTicket().then((isValid) => {
        if (isValid) {
          this.queryImageCode();
        }
      });
      // this.$refs.imageCode.dialogVisible = true
    },

    submitPhoneNumber() {
      let val = { 
        'mobile': this.phoneNumber,
        'code': this.phoneCode
      }

      bindPhone(val).then(res => {
        if(this.phoneNumber == '') {
            this.ismobile = true;
            this.phoneMsg = '手机号不能为空';
            return;
        }

        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(!TEL_REGEXP.test(this.phoneNumber)){
          this.$message.error('手机号格式不正确')
          return;
        }
        
        if(this.phoneCode == '') {
            this.codeMsg = '验证码不能为空';
            return;
        }
        if (res.code == 20000) {
          this.$message.success('绑定成功')
          this.userInfo.mobile = this.phoneNumber
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          this.$store.dispatch('user/changeUserDataInfo', this.userInfo)
          this.phone = this.updatePhoneNumber(this.phoneNumber)
          this.phoneNumber = ''
          this.phoneCode = ''
        } else {
            this.$message.error(res.msg);
        }
      }).catch(err => {
          this.$message.error('绑定失败!');
      })
    },

    updatePhoneNumber(phone) {
      let num = phone != '' ? phone.split('') : ''
      num[3] = '*'
      num[4] = '*'
      num[5] = '*'
      num[6] = '*'
      num = num.join("")
      return num
    },
  }
}
</script>

<style scoped>
.avatar-uploader /deep/ .el-upload{
  border: 0px;
}
.center-message {
  background-color: #F1F2F5;
  display: flex;
  justify-content: center;
  height: 100%;
  position: relative;
}

.center_msg_mask {
  margin-top: 40px;
  background-color: #FFFFFF;
  width: 40%;
  padding: 24px;
}

.center_msg_mask .tit_title {
  color: #000;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.item-mask {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F1F1F1;
  margin-top: 20px;
  padding-bottom: 20px;
}

.item-title {
  color: #000;
  font-size: 16px;
  font-weight: 500;
}

.item-content {
  color: #000;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}

.ruleform_list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>