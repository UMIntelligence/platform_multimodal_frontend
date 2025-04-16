<template>
  <div class="fourDultrasound">
    <GoBackNew style="margin-left: 10px;"></GoBackNew>
    <img class="bg_img" :src='httpUrls.ossUrl + "static/picture/e1fb7ebf-8cd6-4212-85cf-4119925f3626.png"' alt=""/>
    <div class="main_title">给我一张<span style="color: #1F64FF;">四维彩超</span></div>
    <div class="main_conent-title">我能给你宝宝预测出未来模样</div>
    <div class="main_mask">
      <div>
        
        <img class="main_eg" src="../../assets/images/4Dultrasound_eg.png" alt=""/>
        <div style="color: #000;font-size: 14px;font-weight: 500;margin-left: 45px;">提醒：</div>
        <div style="color: #000;font-size: 14px;font-weight: 400;margin-left: 45px;">仅供娱乐，不做最终参考!</div>
      </div>
      <div class="work-space">
        <el-upload
          v-if="generatePicture == 0"
          class="upload-demo_baby-picture"
          drag
          :limit="1"
          :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
          :data="requestData"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          :show-file-list="false"
          ref="uploadUltrasound"
          :headers="headerData"
          multiple>
          <img v-if="imageUrl != ''" src="../../assets/images/trash2.png" alt="" @click.stop="$refs.uploadUltrasound.clearFiles(), imageUrl = ''" style="background-color: rgba(0, 0, 0, 0.50);position: absolute;right: 8px;top: 8px;padding: 4px;border-radius: 4px;">
          <img v-if="imageUrl != ''" :src="httpUrls.ossUrl + imageUrl" alt="" style="width: 100%;height: 100%;object-fit: contain;">
          <div v-else>
            <el-button class="upload_btn" style="background-color: #1F64FF;color: #FFFFFF;font-size: 16px;padding: 15px 27px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3L12 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span style="margin-left: 8px;">上传图片</span>
            </el-button>
            <div class="upload-title-con" style="margin-top: 20px;"><span style="color: #1F64FF;">点击上传</span> 小宝宝的四维彩超图噢</div>
            <div class="upload-title-con">图片大小不超过5MB</div>
          </div>
        </el-upload>
        <!-- 生成中 -->
        <div class="generatePicture_result" v-if="generatePicture == 1">
          <el-progress type="circle" :percentage="percentageNumber"></el-progress>
          <div>生成中，耗时{{ timer }}秒</div>
        </div>
        <!-- 生成失败 -->
        <div class="generatePicture_result" v-if="generatePicture == 2">
          <div>{{ chatList.modMsg }}</div>
        </div>
        <!-- 余额不足 -->
        <div class="generatePicture_result" v-if="generatePicture == 3">
          <div style="font-size: 14px;margin-bottom: 20px;">十分抱歉，您的次数已用完，请购买流量包等产品</div>
          <el-button v-if="!isuser" @click="$refs.Pay.PayVisible = true" style="width: 179px;height: 40px;text-align: center;background: #FF9B17;color: #FFFFFF;">购买套餐</el-button>
        </div>
        <!-- 生成结果 -->
        <div class="generatePicture_result" v-if="generatePicture == 4" style="position: relative;">
          <div style="overflow: hidden;position: relative;width: 100%;height: 100%;">
            <img class="filter_img" :src="httpUrls.ossUrl + chatList.result_image" alt="">
            <img class="result_img" :src="httpUrls.ossUrl + chatList.result_image" alt="" @click="dialogImageUrl = httpUrls.ossUrl + chatList.result_image, dialogVisible = true">
            <div class="prompt">
              <img src="../../assets/images/alert-triangle.png" alt="" style="width: 16px;height: 16px;margin-right: 10px;">
              <span>当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉</span>
            </div>
          </div>

          <div class="download_img" v-if="generatePicture == 4">
            <div class="line"></div>
            <div class="msak">
              <img class="img" src="../../assets/images/newdownloadNo.png" alt="" @click="downloadImage">
              <div class="title">下载</div>
            </div>
          </div>
        </div>

        <div class="size_title">尺寸</div>
        <div class="mask_size">
          <div :class="pictureSize == item.id ? 'size-item size-item-on' : 'size-item'" v-for="item in SDSize" @click="pictureSize = item.id">
            <div class="size_mask">
              <div :style="item.style + 'border: 1px solid #000;'"></div>
            </div>
            <div class="size">{{ item.size }}</div>
          </div>
        </div>
        <div :style="generatePicture != 0 ? 'display: flex;justify-content: space-between;align-items: center;' : 'align-items: center;display: flex;justify-content: space-between;'">
          <div style="display: flex;align-items: center;">
            <span style="font-size: 12px;margin-right: 10px;">每张图消耗4800算力</span>
            <el-button v-if="generatePicture != 0" @click="generatePicture != 1 ? newDraw() : $message('绘制还未结束，请稍后再试！')" icon="el-icon-plus" style="height: 26px;border-color: #1F64FF;color: #1F64FF;background-color: transparent;font-size: 12px;padding: 4px 7px;">新绘画</el-button>
          </div>
          <el-button type="text" style="color: #1F64FF;font-weight: bold;" @click="$router.push('/drawChat/fourDUltrasound/history')">历史记录</el-button>
        </div>
        <el-button 
          @click="generatePicture != 1 ? startGeneratePicture() : $message('绘制还未结束，请稍后再试！')"
          style="width: 400px;background-color: #1F64FF;color: #FFFFFF;font-size: 17px;">
          AI生成
          
        </el-button>
        <div class="history_btn">
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" class="draw_image-class_dark">
      <img width="100%" :src="dialogImageUrl" style="max-height: 800px;min-height: 500px;cursor: zoom-out;" alt="" @click="dialogVisible = false">
    </el-dialog>

    <register ref="Register"></register>

    <pay ref="Pay"></pay>
  </div>
</template>

<script>
import { SDCreateImage, SDResultImage, submitFootprint } from '../../api/chatMG'
import httpUrls from '../../api/requestURL'
import register from '../../components/register'
import pay from '../../components/pay'
import GoBackNew from "../../components/goBack";

export default {
  name: 'fourDultrasound',
  data() {
    return {
      httpUrls,
      imageUrl: '',
      generatePicture: 0, // 状态，0：未开始，1：生成中，2：生成失败，3：余额不足，4：生成成功
      percentageNumber: 0, // 进度
      timer: 0, // 时间
      t_time: null, // 定时器
      pictureSize: '512*768',
      chatList: {},
      dialogVisible: false,
      dialogImageUrl: '',
      headerData: {},
      requestData: {
        image: null,
        image_name: null,
        oss_dir: 'static',
        cate: '4D_Ultrasound'
      },
      SDSize: [{
        id: '512*768',
        size: '512*768',
        style: 'width: 30px;height: 45px;',
        width: '30px',
        height: '45px',
      }, {
        id: '768*512',
        size: '768*512',
        style: 'width: 45px;height: 30px;',
        width: '45px',
        height: '30px',
      }, {
        id: '512*512',
        size: '512*512',
        style: 'width: 42px;height: 42px;',
        width: '42px',
        height: '42px',
      }],
    }
  },

  components: {
    register,
    pay,
    GoBackNew
  },
 
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },
  
  methods: {
    handleChange(file, fileList) {
      this.requestData.image = file.raw
      this.requestData.image_name = file.name
    },

    handleSuccess(response, file, fileList) {
      this.imageUrl = response.data.new_url
    },

    startGeneratePicture() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo.role == 'guess') {
        this.$refs.Register.registerVisible = true
        return
      }
      if (this.imageUrl == '') {
        this.$message('请给我一张宝宝的彩超照片')
        return
      }
      this.generatePicture = 1
      let data = {
        "action_type": "5",
        "origin_image": this.imageUrl,
        "chat_type": '9',
        "prompt_en": "masterpiece, 8k, great job, hd, baby, {1 year old baby}, {Wearing cute clothes},cute, indoors, realistic skin, detailed skin texture, light on face, eyes open, asian baby, real,Full body or half body",
        "prompt": "masterpiece, 8k, great job, hd, baby, {1 year old baby}, {Wearing cute clothes},cute, indoors, realistic skin, detailed skin texture, light on face, eyes open, asian baby, real,Full body or half body",
        "negative_prompt":"Low resolution, fake skin, rough skin texture, open eyes, non-Asian baby, deformed fingers, deformed body, deformed face, brightness,naked",
        "negative_prompt_en": "Low resolution, fake skin, rough skin texture, open eyes, non-Asian baby, deformed fingers, deformed body, deformed face, brightness,naked",
        "model": "儿童摄影WFChild_v1.0",
        "size": this.pictureSize,
        "cfg_scale": 7, 
        "steps": 20, 
        "sampler_index": "DPM++ 2M Karras",
        "app_type": 2
      }
      this.timer = 0
      this.percentageNumber = 0
      this.t_time = setInterval(() => {
        this.timer++
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0))
          this.percentageNumber = this.percentageNumber + num >= 97 ? 97 : this.percentageNumber + num
        }
      }, 1000);
      SDCreateImage(data).then(res => {
        console.log(res);
        if (res.code == 20000) {
          this.getResult(res.data.tag)
        } else if (res.code == 40022) {
          this.generatePicture = 3
          clearInterval(this.t_time);
        } else if (res.code != 20000) {
          clearInterval(this.t_time);
          this.generatePicture = 2
          this.chatList.content = res.msg
        }
        if(res.code != 20000){
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.generatePicture = 2
        clearInterval(this.t_time);
        this.$message.error('网络异常，请稍后再试!')
      })
    },

    getResult(id) {
      SDResultImage(`task_id=${id}`).then(res => {
        if (res.data != null && (Number(res.data[0].is_mod) == 1 || Number(res.data[0].status) == 1)) {
          this.chatList = {
            ...res.data[0],
            modMsg: res.data[0].is_mod == 1 ? '图片内容涉及敏感请重新提问。' : '生成失败，本次不消耗绘画次数'
          }
          this.generatePicture = 2
          clearInterval(this.t_time);
        } else if (res.code == 20000 && res.data == null) {
          setTimeout(() => {
            this.getResult(id)
          }, 2000);
        } else if (res.code == 20000) {
          this.percentageNumber = 95
          setTimeout(() => {
            this.chatList = res.data[0]
            clearInterval(this.t_time)
            this.generatePicture = 4
            
            // 保存最近使用
            submitFootprint({
              type_name: '四维彩超',
              type_code: 'cdu',
              image_url: res.data[0].result_image,
              title: '',
              eid: res.data[0].image_code
            }).then(res => {})
          }, 500);
        }
        this.imageUrl = ''
      }).catch(err => {
        this.generatePicture = 2
        clearInterval(this.t_time);
        this.$message.error('网络异常，请稍后再试!')
      })
    },

    newDraw() {
      this.generatePicture = 0
      this.imageUrl = ''
      this.$nextTick(() => {
        this.$refs.uploadUltrasound.clearFiles()
      })
    },

    downloadImage() {
      let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image();
      img.crossOrigin = '*';//解决Canvas.toDataURL 图片跨域问题
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
        let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "photo.png"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        canvas = null;
      };
      img.src = httpUrls.ossUrl + this.chatList.content;
    }
  }
}
</script>

<style scoped>
.fourDultrasound {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg_img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  /* height: calc(100% - 56px);
  width: calc(100% - 240px); */
}

.main_title {
  color: #333;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  padding: 30px 0 16px 0;
}

.main_conent-title {
  color: #999;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 50px;
}

.main_mask {
  padding-bottom: 36px;
  display: flex;
  justify-content: center;
}

.main_eg {
  width: 360px;
  height: 300px;
  margin-right: 60px;
}

.upload-title-con {
  color: #ABADB2;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.size_title {
  color: #000;
  font-size: 12px;
  font-weight: 500;
  margin: 20px 0 10px 0;
}

.size_mask {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.mask_size {
  display: flex;
  margin-bottom: 20px;
}

.size-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 92px;
  height: 92px;
  border-radius: 8px;
  margin-right: 10px;
  border: 2px solid transparent;
}

.size-item-on {
  border-color: #1F64FF;
}

.size-item .size {
  color: #222;
  font-size: 12px;
  font-weight: 400;
}

.history_btn {
  display: flex;
  justify-content: center;
}

.generatePicture_result {
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #FFFFFF;
}

.generatePicture_result .prompt {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  z-index: 3;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.50);
  color: #FFFFFF;
}

.filter_img {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: 1;
  object-fit: cover;
}

.result_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  z-index: 2;
  cursor: zoom-in;
}

.download_img {
  position: absolute;
  top: 0;
  z-index: 4;
  right: -100px;
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.10);
  border-radius: 8px;
}

.download_img .line {
  width: 30px;
  height: 30px;
  position: absolute;
  background-color: #FFFFFF;
  left: -5px;
  top: 30px;
  z-index: -1;
  transform: rotateZ(45deg);
}

.download_img .msak {
  width: 84px;
  height: 118px;
  border-radius: 8px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.download_img img {
  width: 36px;
  height: 36px;
  margin-bottom: 8px;
  cursor: pointer;
}

.download_img .title {
  color: #333;
  font-size: 12px;
  font-weight: 400;
}
</style>

<style>
.upload_btn>span {
  display: flex;
  align-items: center;
}

.upload-demo_baby-picture .el-upload-dragger {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
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