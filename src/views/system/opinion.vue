<template>
  <div style="width: 100%;height: 100%;overflow: hidden;padding: 30px;background-color: #F1F2F5;box-sizing: border-box;">
    <!-- <div class="go-back" style="z-index: 10;">
      <div @click="$router.go(-1)" class="go_back-item-on">
        <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../../assets/images/right.png" alt="">
        <span style="margin-left: 8px;">返回</span>
      </div>
    </div> -->
    <div class="main">
      <div class="title">&lt; <span style="cursor: pointer;" @click="$router.go(-1)">意见反馈</span></div>
      <div class="container">
        <div class="content">
          <!-- 请选择问题类型 -->
          <div class="checkProblem">
            <div class="box-title"><span class="font-Color">*</span>请选择问题类型</div>
            <el-tag style="margin-right: 10px;margin-bottom: 10px;" @click="selectLabel = index + 1"
              v-for="(item, index) in ProblemData" :key="index" :effect="selectLabel == index + 1 ? 'dark' : 'plain'">
              {{ item }}
            </el-tag>
          </div>
          <!-- 请描述你遇到的类型 -->
          <div class="describeProblem">
            <div class="box-title"><span class="font-Color">*</span>请描述你遇到的问题</div>
            <el-input type="textarea" placeholder="请在此输入你目前遇到的问题，越清晰越有利于我们为你解决，感谢你的反馈" v-model="textarea">
            </el-input>
          </div>
          <!-- 请在此上传你所遇到问题的截图或者视频 -->
          <div class="uploadProblem">
            <div class="box-title">请在此上传你所遇到问题的截图/视频</div>
            <div>
              <el-upload class="menter-avatar-uploader" :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                :show-file-list="false" :data="requestData" :on-success="handleAvatarSuccess" :headers="headerData"
                :before-upload="beforeAvatarUpload" :on-change="handleAvatarChange">
                <img v-if="photo" :src="httpUrls.ossUrl + photo" class="menter-avatar">
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
                  <rect x="0.5" y="0.5" width="77" height="77" rx="4.5" fill="white" stroke="#F2F3F5" />
                  <rect x="31" y="38" width="14" height="1.5" rx="0.75" fill="#D9D9D9" />
                  <rect x="37" y="46" width="14" height="1.5" rx="0.75" transform="rotate(-90 37 46)" fill="#D9D9D9" />
                </svg>
              </el-upload>
            </div>
          </div>
          <!-- 手机号 -->
          <div class="phone">
            <div>联系方式</div>
            <div>
              <el-input style="height: 30px;" v-model="phone" placeholder="请输入您的联系方式：手机号/邮箱"></el-input>
            </div>
          </div>
          <div class="bottom">
            <div>Tips：您的反馈将用于改进我们的产品与服务，发送后请您耐心等待，我们会有专门的人员为您处理问题...</div>
            <div @click="handleSubmit">提交</div>
          </div>
        </div>
        <div class="content" style="width: auto;">
          <!-- 请选择问题类型 -->
          <div class="checkProblem">
            <div class="box-title" style="margin-bottom: 0px;font-weight: bold;"><span class="font-Color">*</span>联系客服</div>
            <div class="box-desc">如遇到故障，请扫码添加客服微信，帮助你解决问题并提升改进！</div>
            <img class="customerImg" :src="customerImg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL';
import { requestProblem } from '../../api/mentor'

import { pictures } from "../../api/chatMG";
export default {
  name: 'opinion',
  data() {
    return {
      headerData: {},
      httpUrls,
      ProblemData: ['使用问题', '产品错误', '产品建议', '不良内容', '购买问题', '其他问题'],
      textarea: "",   //文本域
      phone: null,
      requestData: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: 'mentor_image-list'
      },
      photo: "",
      selectLabel: "",  //选择问题类型
      customerImg:''
    }
  },
  mounted(){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    pictures().then((res) => {
      console.log('进入mainTitle')
      res.data.forEach((item) => {
        if (item.type == 8) this.customerImg = item.pic_url;
      });
    });
  },
  methods: {
    // 提交
    handleSubmit() {
      const phoneRegex = /^1([39][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.selectLabel) {
        this.$message({
          message: '请选择您遇到的问题类型',
          type: 'warning'
        });
        return false
      } else if (!this.textarea) {
        this.$message({
          message: '请描述您遇到的问题',
          type: 'warning'
        });
        return false
      } else if (this.phone) {
        if (!phoneRegex.test(this.phone)) {
          // 如果不是有效的电话号码，则检查是否为有效的邮箱地址
          if (!emailRegex.test(this.phone)) {
            // console.log(`Invalid phone number or email: ${this.phone}`);
            this.$message({
              message: '请输入正确的手机格式或邮箱地址!',
              type: 'warning'
            });
            return;
          }
        }
      } else if (!this.phone) {
        this.$message({
          message: '请输入你的联系方式!',
          type: 'warning'
        });
        return;
      }
      //请求参数
      let requestData = {
        question_type: this.selectLabel, //问题类型
        problem: this.textarea,  //问题描述
        contact: this.phone,
        "picture_url_list": [{ "picture_url": this.photo, "create_by": '' }]
      }
      requestProblem(requestData).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
          this.selectLabel = null;
          this.textarea = null;
          this.phone = null;
          this.photo = null;
        } else if (res.code == 40017) {
          this.$message({
            message: '网络异常，请稍后重试',
            type: 'warning'
          });
        }
      })
    },
    //文件上传
    handleAvatarChange(file, fileList) {
      this.requestData.image = file.raw
      this.requestData.image_name = file.name
    },
    // 素材图片上传
    handleAvatarSuccess(res, file) {
      console.log(res.data)
      this.photo = res.data.new_url;
    },
    handleAvatarChange(file, fileList) {
      this.requestData.image = file.raw
      this.requestData.image_name = file.name
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file, '进入')
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

  },
}
</script>

<style scoped>
.box-desc{
  font-size: 14px;
    color: #999;
    text-indent: 1em;
    font-weight: bold;
}
.container{
  width: 100%;
  display: flex;
  gap: 20px;
}
.customerImg{
  width: 180px;
  height: auto;
  position: relative;
  left: 7px;
}
/deep/ .el-input__inner{
  height: 40px;
  background: #FFF;
}
.font-Color {
  color: red;
  line-height: 21px;
  margin-right: 5px;
  font-weight: 400;
}

.phone {
  /* display: flex; */
  margin-top: 15px;
}

.phone>div:first-child {
  margin-right: 10px;
  /* line-height: 50px; */
}

.phone>div:last-child {
  font-size: 12px;
  /* width: 70%; */

  color: #999;

}

.phone>div:last-child div {
  margin-top: 5px;
}

.bottom {
  margin-top: 21.5px;
}

.bottom>div:first-child {
  font-size: 13px;
  margin-bottom: 15px;
  color: #999;
}

.bottom>div:last-child {
  width: 218px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #1F64FF;
  color: #FFF;

  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
}

.menter-avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 90px;
  height: 90px;
  /* line-height: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menter-avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.menter-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* // width: 80px;
  // height: 80px;
  // line-height: 80px; */
  text-align: center;
}

.menter-avatar {
  width: 78px;
  height: 78px;
  display: block;
}

.go-back {
  cursor: pointer;
  position: absolute;
  left: 56px;
  top: 50px;
}

.go_back-item-on {
  display: flex;

  transition: all .2s;
}

.main {
  width: 100%;
  height: 100%;
  padding: 21px 29px;
  box-sizing: border-box;
  background: white;
}

.content {
  width: 320px;
  margin: 0px;
}

.title {
  color: #666;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 21px */
}

.box-title {
  margin: 18px 0px;
  color: #333;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}

.checkProblem {
  margin-top: 25.5px;
}



/deep/ .el-textarea__inner {
  height: 105px !important;
}

.el-tag:hover {
  cursor: pointer;
}
</style>