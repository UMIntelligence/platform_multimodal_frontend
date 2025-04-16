<template>
  <!-- 视频处理首页 -->
  <el-container>
    <el-aside width="264px">
      <div :class="videoIndex == index?'left-item left-item-on':'left-item'" @click="handlerToRouter(item)" v-for="(item,index) in videoData" :key="index">
        <div class="top">
          <div class="imgBox">
            <img :src="httpUrls.ossUrl + item.image" alt="">
          </div>
          <div>{{ item.title }}</div>
        </div>
        <div class="desc">{{ item.text }}</div>
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import httpUrls from "@/api/requestURL";
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      httpUrls,
      videoData: [
            {
              title: "通用视频生成",
              text: "输入图像视频素材生成新视频",
              query: "",
              image: "static/picture/24b03e2d-6b38-4545-afe1-2f67bdbb3735.png",
            },
            {
              title: "视频降噪",
              text: "对视频中的各类噪声信息进行降低处理",
              query: "",
              image: "static/picture/24b03e2d-6b38-4545-afe1-2f67bdbb3735.png",
            },
            {
              title: "视频人像卡通画",
              text: "对视频中的人像进行卡通风格处理得到新视频",
              query: "",
              image: "static/picture/4f11061d-7c3a-4813-a0a8-eeba093e90b6.png",
            },
            {
              title: "视频标志擦除",
              text: "去除视频中出现的标志，可用于素材的再创作",
              query: "",
              image: "static/picture/5112cdcc-2819-4e68-8ee3-b12728729f91.png",
            },
            {
              title: "视频字幕擦除",
              text: "去除视频中出现的白色字幕",
              query: "",
              image: "static/picture/c24718b8-6389-44fa-b635-284d876689b1.png",
            },
            {
              title: "视频增强",
              text: "对视频进行高清、超高清、HDR和更高帧率处理",
              query: "",
              image: "static/picture/eecb143c-ba6f-407a-94d8-2bf86fa18f5e.png",
            },
            {
              title: "视频封面生成",
              text: "生成视频静态，gif图封面",
              query: "",
              image: "static/picture/eecb143c-ba6f-407a-94d8-2bf86fa18f5e.png",
            },
            {
              title: "视频画质评分",
              text: "上传视频，对视频的画质清晰度，颜色质量等进行客观评分",
              query: "",
              image: "static/picture/901730e4-2a0c-4c6f-b1aa-61652a8114b7.png",
            },
          ],
      videoIndex:0
    }
  },
  watch:{
    $route:{
      deep:true,
      handler(){
        this.videoIndex = this.videoData.findIndex(item => item.title == this.$route.query.title)
      }
    }
  },
  mounted(){
    this.videoIndex = this.videoData.findIndex(item => item.title == this.$route.query.title)
  },
  computed:{
  },
  methods:{
    handlerToRouter(item,index){
      this.videoIndex = index;
      this.$router.push(`/video/treasureBox?title=${item.title}`);
    }
  }
}
</script>

<!-- <style scoped lang="sass">

</style> -->
<style scoped lang="scss">
.el-container{
  height: calc(100vh - 100px);
  overflow: hidden;
}
.el-aside{
  padding: 20px 16px;
  box-sizing: border-box;
  border-left: 1px solid #ebebeb;

}
.left-item{
  width: 100%;
  padding: 18px 21px;
  box-sizing: border-box;
  border-radius: 16px 16px 16px 16px;
  background: #F2F2F2;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  .top{
    width: 100%;
    display: flex;
    gap: 9px;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    .imgBox{
      width: 32px;
      height: 32px;
      border-radius: 8px 8px 8px 8px;
      background: #fff;
      border: 1px solid #F4F5F9;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    img{
      width: 32px;
      height: 32px;
    }
  }
  .desc{
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.left-item-on{
  background: #F0F4FF;
  border: 2px solid #003FFF;
}
</style>