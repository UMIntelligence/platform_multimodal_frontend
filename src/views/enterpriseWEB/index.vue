<template>
  <div class="enterprise-web">
    <img :src='httpUrls.ossUrl + "static/picture/4014dfc4-e752-44c1-ab69-ebff7262a8dd.png"' alt="" class="index-img">

    <div class="index-title">
      <div class="title_one">
        <span>打造您的</span>
        <span class="luminescent_character">专属</span>
        <span>企业营销资产</span>
      </div>
      <div class="title_two">我是AI营销资产管理师</div>
      <div class="title_three">用AI驱动企业发展，提高人效，企业级AI工作台系统，内置营销，创作绘画等各类AI应用，是企业提高效率、降本增效的利器</div>
    </div>

    <div style="display: flex;justify-content: center;margin: 60px 0;">
      <el-button @click="toCompany" type="primary" size="small" round style="background-color: #1F64FF;padding: 10px 56px;font-size: 16px;">进入体验</el-button>
    </div>

    <div style="justify-content: center;display: flex;padding-bottom: 30px;">
      <div>
        <div style="margin-left: 20px;">产品及服务</div>
        <div class="destined-aiPage">
          <div class="item">
            <img src="../../assets/images/enterprise_icon1.png" alt="" class="img">
            <div class="contents">行业/企业AI模型定制化训练服务</div>
          </div>
    
          <div class="item">
            <img src="../../assets/images/enterprise_icon2.png" alt="" class="img">
            <div class="contents">基于AIGC的企业营销资产数字化智能管理系统</div>
          </div>
    
          <div class="item">
            <img src="../../assets/images/enterprise_icon3.png" alt="" class="img">
            <div class="contents">基于 AI 人工智能的一体化智能广告营销平台</div>
          </div>
        </div>
      </div>
    </div>
    
    <register ref="Register"></register>
  </div>
</template>

<script>
import Register from '../../components/register'
import { enterpriseRetrieve } from '../../api/chatMG'

export default {
  name: "enterprise-web",
  data() {
    return {
      userInfo: {}
    }
  },
  components: {
    Register
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  created() { },
  methods: {
    toCompany() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo.role == 'guess') {
        this.$refs.Register.registerVisible = true
      } else {
        // enterpriseRetrieve().then(res => {
        //   if (res.data == null) {
        //     this.$router.push('/enterpriseWEB/detail')
        //   } else {
            this.$router.push('/enterpriseWEB/indexList/indexListView')
          // }
        // })
      }
    },
  },
};
</script>
<style scoped>
.enterprise-web {
  position: relative;
  height: 100%;
  min-height: 670px;
  width: 100%;
}

.index-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.index-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.index-title .title_one {
  color: #333;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-top: 120px;
}

.index-title .title_one .luminescent_character {
  background-image: linear-gradient(30deg,#1F64FF 35%,#97b7ff 45%,#1F64FF 60%);
  -webkit-text-fill-color: #0000;
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: 700;
  width: max-content
}

.index-title .title_two {
  color: #333;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #1F64FF;
  display: inline-block;
  margin: 20px auto;
  padding: 12px 50px;
  border-radius: 1000px;
}

.index-title .title_three {
  color: #333;
  font-size: 16px;
  font-weight: 400;
  max-width: 478px;
  margin: 0 auto;
  text-align: center;
}

.destined-aiPage {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.destined-aiPage .item {
  margin: 0 20px;
  padding: 16px 24px;
  border-radius: 10px;
  width: 210px;
  background-color: #FFFFFF;
  transition: all 0.2s;
}

.destined-aiPage .item .img {
  width: 24px;
  height: 24px;
}

.destined-aiPage .item .title {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0 6px 0;
}

.destined-aiPage .item .contents {
  color: #4A4A4C;
  font-size: 14px;
  font-weight: 400;
  margin-top: 20px;
}
</style>
