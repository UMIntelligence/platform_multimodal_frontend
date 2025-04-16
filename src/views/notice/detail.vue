<template>
  <div class="notice-detail">
    <!-- <go-back></go-back>
    <div style="width: 70%;">
      <div style="display: flex;justify-content: center;">
        <div class="detailItem">
          <div v-html="messageList.content"></div>
        </div>
      </div>
      <div style="width: 218px;"></div>
    </div> -->
    <img class="bgImg" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319556@2x.png"/>
    <div class="back-btn" @click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>
      <div>返回</div>
    </div>
    <div class="container">
      <img class="title" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319584@2x.png" alt="">
      <div class="desc">一站式AIGC大模型</div>
      <div class="center">
        <div class="center-title">{{messageList.title}}</div>
        <div class="item" v-html="messageList.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { messageCenterContent } from '../../api/notice'
import goBack from '../../components/goBack'

export default {
  name: 'notice-detail',
  data() {
    return {
      userInfo: {},
      messageId: '',
      messageList: []
    }
  },
  components: {
    goBack
  },
  mounted() {
    if (this.$route.query.id != undefined) {
      this.messageId = this.$route.query.id
    }
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.queryMessageCenterContent()
  },
  methods: {
    queryMessageCenterContent() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let data = {
        user_id: userInfo.user_id,
        message_id: this.messageId
      }
      messageCenterContent(data).then(res => {
        this.messageList = res.data[0];
        console.log(this.messageList)
        document.title = res.data[0].title
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* .detailItem {
  width: 50%;
} */
.notice-detail{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .bgImg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1px;
  }
  .back-btn{
    position: absolute;
    left: 30px;
    top: 30px;
    display: flex;
    align-items: center;
    padding: 12px 15px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    font-weight: bold;  
    font-size: 14px;
    color: #000000;
    cursor: pointer;
    .el-icon-arrow-left{
      font-size: bold !important;
    }
  }
  .container{
    width: calc(100% - 320px);
    height: calc(100% - 60px);
    text-align: center;
    position: absolute;
    left: 50%;
    top: 60px;
    transform: translateX(-50%);
    .title{
      width: 744px;
      height: auto;
      margin: 0px auto;
    }
    .desc{
      font-weight: bold;  
      font-size: 20px;
      color: #3C5380;
    }
    .center{
      width: 100%;
      height: calc(100% - 170px - 30px);
      padding: 30px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 20px 20px 20px 20px;
      margin-top: 60px;
      text-align: start;
      .center-title{
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        margin-bottom: 10px;
      }
      .item{
        font-weight: 400 !important;
        font-size: 14px !important;
        color: #797B80 !important;
      }
    }
  }
}
</style>

<style>
.notice-detail p{
  margin: 0;
  padding: 0;
}
</style>