<template>
  <div class="share-firend">
    <go-back></go-back>
    <div class="share_title-list">
      <img class="share-img" :src='httpUrls.ossUrl + "static/picture/1a69c8f9-4306-43bb-ab1c-08b70de9f6e8.png"' alt="">
      <img class="share_img-two" :src='httpUrls.ossUrl + "static/picture/c278a65d-7195-4630-b035-1c7ccb79fad2.png"' alt="">
      <div class="top-title" :style="showShare == '1' ? 'padding-top: 60px;' : ''">邀请规则</div>
      <!-- 分享 -->
      <div class="user-title" v-if="showShare == '1'">每邀请1位好友，好友首次授权打开后，可立即获得50万通用算力，你将立即获得100万通用算力(游客除外)</div>
      
      <!-- 分销 -->
      <div class="share-title" style="margin-left: calc(15% - 32px);" v-else>
        <div style="display: flex;">
          <div>
            <div class="share-item-title title">
              <div class="share-drop">1</div>
              <div style="width: 50%;">用户通过您分享的链接或二维码成功注册并充值，您即可获得分佣</div>
            </div>
            <div class="share-item-title title">
              <div class="share-drop">2</div>
              <div style="width: 50%;">每邀请1位好友，他首次注册打开后，他可立即获得50万通用算力，你将立即获得100万通用算力</div>
            </div>
            <div class="share-item-title share_blue_title">
              <div class="share-drop">3</div>
              <div style="width: 50%;">普通分销：</div>
            </div>
            <div class="share-item-title title">
              <div class="share-drop_close"></div>
              <div style="width: 50%;">您的成员充值您都将获得15%佣金。</div>
            </div>
            <div class="share-item-title share_blue_title">
              <div class="share-drop_close"></div>
              <div style="width: 50%;">金牌分销：</div>
            </div>
            <div class="share-item-title title">
              <div class="share-drop_close"></div>
              <div style="width: 50%;">充值99元您将升级成为金牌分销，佣金由15%提升至30%，享有更高佣金福利。</div>
            </div>
            <div class="share-item-title title" style="align-items: center;">
              <div class="share-drop">4</div>
              <span class="share_blue_title" style="cursor: pointer;" @click="$router.push('/chatServe')">点我</span>, 申请升级为服务商，享有更多佣金和权益。
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="share_qr_code">
      <div class="qr-code-item" style="margin-right: 4%;">
        <div class="code_item">
          <div class="code-title">您的专属二维码</div>
          <div class="code-qr_code">
            <img style="width: 100%;height: 100%;" :src="qrCode" alt="">
          </div>
        </div>
        <div class="share-bottom-btn">
          <el-button type="primary" class="qr_code-btn" @click="downloadImg">下载二维码</el-button>
        </div>
      </div>
      <div class="qr-code-item" style="margin-left: 4%;">
        <div class="code_item">
          <div class="code-title">您的专属链接</div>
          <div class="code_link-mask">
            <div class="code-link">{{ codeLink }}</div>
          </div>
        </div>
        <div class="share-bottom-btn">
          <el-button type="primary" class="qr_code-btn" @click="copyText">复制链接</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'
import GoBack from '../../components/goBack'
import { queryQRCode } from '../../api/distribution'
import {downloadImage} from '../../utils/download'
export default {
  name: 'share-firend',
  data() {
    return {
      httpUrls,
      qrCode: '',
      codeLink: '',
      showShare: '1',
    }
  },
  components: {
    GoBack
  },
  created() {
    this.queryQRCode(1)
    this.queryQRCode(2)
  },
  mounted() {
    this.showShare = sessionStorage.getItem('sahre_friend')
  },
  methods: {
    queryQRCode(type) {
      queryQRCode({"q_type": type, source: httpUrls.source}).then(res => {
        console.log({"q_type": type, source: httpUrls.source},'请求参数')
        if (type == 1) {
          this.qrCode = httpUrls.ossUrl + res.data
        } else {
          let data = res.data.split('?')
          this.codeLink = data.join('index?')
          console.log(this.codeLink)
        }
      })
    },
    downloadImg() {
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
        a.download =  "photo.png"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        canvas = null;
      };
      img.src = this.qrCode;
    },
    copyText() {
      var input = document.createElement("input"); // 创建input对象
      input.value = this.codeLink; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');
    },
  },
}
</script>

<style scoped>
.share-firend {
  padding: 70px 5% 40px 5%;
  position: relative;
}
.share_title-list {
  position: relative;
  background-color: rgba(31, 100, 255, .05);
  border-radius: 10px;
  padding-bottom: 10px;
  min-height: 200px;
}
.share_title-list .share-img {
  height: 100%;
  position: absolute;
  z-index: -1;
  width: 100%;
}

.share_img-two {
  position: absolute;
  height: 95%;
  top: 2%;
  right: 50px;
  z-index: -1;
}

.share_title-list .top-title {
  font-weight: 600;
  font-size: 20px;
  color: #333333;
  padding: 20px 0 10px 0;
  margin-left: 15%;
}

.share-drop {
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  margin-right: 10px;
  color: #FFFFFF;
  background: #1F64FF;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
}

.share-title .title {
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
}

.share_blue_title {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1F64FF;
}

.style_share {
  height: 32px;
  width: 32px;
}

.share-title .share-item-title {
  /* height: 32px; */
  font-size: 14px;
  line-height: 24px;
  display: flex;
}

.share_qr_code {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 60px;
}


.code_item {
  padding: 30px 0;
  border: 1px solid #1F64FF;
  border-radius: 20px;  
}

.code-title {
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  text-align: center;
}

.code-qr_code {
  width: 160px;
  height: 160px;
  border-radius: 10px;
  margin: 20px 100px 0 100px;
}

.share-bottom-btn {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.share-bottom-btn button {
  padding: 10px 120px;
}

.code_link-mask {
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 30px 0 30px;
}

.code-link {
  width: 280px;
  border: 1px solid #1F64FF;
  border-radius: 100px;
  padding: 4px 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-title {
  font-size: 14px;
  font-weight: 400;
  margin-left: 15%;
  width: 60%;
}

@media (width < 1640px) and (width > 1280px) {
  .user-title {
    width: 50%;
  }
}
@media (width <= 1280px) {
  .user-title {
    width: 40%;
  }
}

.share-drop_close {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>