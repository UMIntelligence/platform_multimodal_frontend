<template>
  <!-- 图片处理首页 -->
  <el-container>
    <el-aside width="264px">
      <div :class="imageIndex == index?'left-item left-item-on':'left-item'" @click="handlerToRouter(item)" v-for="(item,index) in imageData" :key="index">
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
import { mapGetters } from "vuex";
import httpUrls from "@/api/requestURL";
export default {
  data(){
    return {
      httpUrls,
      imageData: [
            {
              title: "人脸融合",
              text: "提供两张包含人脸的图片进行融合",
              query: "vision",
              image: "static/picture/bc43a20c-822b-4789-a1d1-16d26bfd61c2.jpg",
            },
            {
              title: "人像年龄变化",
              text: "提供图片即可进行人像年龄变化",
              query: "vision",
              image: "static/picture/bc43a20c-822b-4789-a1d1-16d26bfd61c2.jpg",
              type: "beauty",
            },
            {
              title: "通用文字识别",
              text: "上传图片即可进行通用文字识别",
              query: "vision",
              image: "static/picture/b5ef8181-ca4f-41f4-b2b9-b1e2e0a9a1dc.jpg",
            },
            {
              title: "人像漫画",
              text: "上传人像图即可生成相应的漫画人像",
              query: "vision",
              image: "static/picture/e459a4e5-3a69-4d5b-b5f4-9625cbed27df.jpg",
              type: "beauty",
            },
            {
              title: "智能变美",
              text: "上传图片，智能修图",
              query: "vision",
              image: "static/picture/ad068d73-fdd0-46df-b611-961cfda6116f.jpg",
              type: "beauty",
            },
            {
              title: "人物抠图",
              text: "上传图片即可人像抠图",
              query: "vision",
              image: "static/picture/268c961d-8e31-4f01-9ae2-b4a8862b9516.png",
            },
            {
              title: "老照片修复",
              text: "上传照片即可生成相应的老照片",
              query: "vision",
              image: "static/picture/9ee1c944-94a1-4a03-a55a-f6e94f525a6a.jpg",
            },
            {
              title: "图像增强",
              text: "上传照片即可生成使图片增强效果",
              query: "vision",
              image: "static/picture/11999ce7-e3ff-413a-b29f-fe871f26b041.png",
              type: "beauty",
            },
            {
              title: "人像特效",
              text: "上传人像图即可生成相应的特效",
              query: "vision",
              image: "static/picture/1b2f08fa-d440-493c-bf13-1b49f10cced1.png",
              type: "beauty",
            },
            {
              title: "表情编辑",
              text: "上传人像图即可生成进行表情的编辑",
              query: "vision",
              image: "static/picture/42397d93-a896-418a-93f3-b7605c433314.png",
              type: "beauty",
            },
            {
              title: "发型编辑",
              text: "上传人像图即可生成相应的发型",
              query: "vision",
              image: "static/picture/86c64fd8-a2a2-4a5d-8975-30c86e36b91e.png",
              type: "beauty",
            },
            {
              title: "3D游戏风",
              text: "上传人像图即可生成相应3D游戏人像",
              query: "vision",
              image: "static/picture/1c47ba93-33e0-4788-bf0b-194d46c7b273.png",
              type: "beauty",
            },
            {
              title: "活体照片",
              text: "上传人像图即可生成相应的活体照片",
              query: "vision",
              image: "static/picture/e90798ea-c61e-42aa-9dda-5af42d0a2a31.jpg",
            },
            {
              title: "头发分割",
              text: "上传人像图即可生成相应的头发分割效果",
              query: "vision",
              image: "static/picture/152177b0-54ed-4b43-b38c-cba75caf2604.png",
            },
            {
              title: "图片拉伸修复",
              text: "上传人像图即可对图片进行拉伸修复",
              query: "vision",
              image: "static/picture/29be826d-af99-4dc7-a0e2-043f0138a937.png",
            },
            {
              title: "图片配文",
              text: "上传人像图即可为图片配文",
              query: "vision",
              image: "static/picture/6278c04a-0bbd-48e9-aa36-9e730ea4b7ff.png",
            },
            {
              title: "图片超分辨率",
              text: "上传人像图即可生成超分辨率的图片",
              query: "vision",
              image: "static/picture/df922c29-db8f-4e9f-9be8-fb6b0e7e8c90.png",
              type: "beauty",
            },
            {
              title: "图片方向矫正",
              text: "上传人像图即可对图片进行方向矫正",
              query: "vision",
              image: "static/picture/f7707cd5-1a49-4741-b201-705835fcd42d.png",
            },

            //百宝箱
            {
              title: "照片修图",
              text: "输入内容图和风格图，进行融合",
              query: "",
              image: "static/picture/f7707cd5-1a49-4741-b201-705835fcd42d.png",
              type: "beauty",
            },
            {
              title: "照片裁剪",
              text:
                "判断主体位置最佳裁剪图片或自定义裁剪，上传小于3MB，分辨率小于2000x2000像素的图片生成更快哦",
              query: "",
              image: "static/picture/df922c29-db8f-4e9f-9be8-fb6b0e7e8c90.png",
            },
            {
              title: "人脸素描",
              text: "输入一张人物图像，自动裁剪其头部区域，生成大头照下的素描画。",
              query: "",
              image: "static/picture/6278c04a-0bbd-48e9-aa36-9e730ea4b7ff.png",
              type: "beauty",
            },
            {
              title: "人脸修复",
              text: "输入包含人脸的图像，可对人脸进行细节增强，优化人脸图像质量。",
              query: "",
              image: "static/picture/29be826d-af99-4dc7-a0e2-043f0138a937.png",
              type: "beauty",
            },
            {
              title: "皮肤病检测",
              text:
                "对输入的皮肤自然图像进行皮肤病分类预测，可检测出湿疹、银屑病、荨麻疹、寻常痤疮等24种常见疾病。",
              query: "",
              image: "static/picture/bc43a20c-822b-4789-a1d1-16d26bfd61c2.jpg",
              type: "illness",
            },
            {
              title: "智能瘦脸",
              text:
                "输入一张人物图像，系统自动检测并分析人脸五官特征，生成脸部五官调整瘦脸后的图像。",
              query: "",
              image: "static/picture/bc43a20c-822b-4789-a1d1-16d26bfd61c2.jpg",
              type: "beauty",
            },
            {
              title: "智能美妆",
              text:
                "可模拟现实彩妆效果，通过添加口红，高光，整妆等彩妆素材，选择不同美妆类型，进一步提升人脸美化效果。",
              query: "",
              image: "static/picture/e459a4e5-3a69-4d5b-b5f4-9625cbed27df.jpg",
              type: "beauty",
            },
            {
              title: "人脸滤镜",
              text:
                "对图像进行统一修改风格，包括向日葵、垦丁、大理等效果，对图像整体风格调整滤镜效果。",
              query: "",
              image: "static/picture/ad068d73-fdd0-46df-b611-961cfda6116f.jpg",
              type: "beauty",
            },
            {
              title: "车型识别",
              text: "识别图片中包含的车辆，获取车辆品牌型号及车型百科信息。",
              query: "",
              image: "static/picture/268c961d-8e31-4f01-9ae2-b4a8862b9516.png",
            },
            {
              title: "图像主体检测",
              text: "检测图片中包含的物体名称等信息。",
              query: "",
              image: "static/picture/9ee1c944-94a1-4a03-a55a-f6e94f525a6a.jpg",
            },
            {
              title: "黑白图像填色",
              text: "智能识别黑白图像内容并填充色彩，是黑白图像变得鲜活",
              query: "",
              image: "static/picture/11999ce7-e3ff-413a-b29f-fe871f26b041.png",
            },
            {
              title: "图像风格转换",
              text: "将图像转化为卡通画、铅笔画等多种艺术风格的效果",
              query: "",
              image: "static/picture/1b2f08fa-d440-493c-bf13-1b49f10cced1.png",
              type: "beauty",
            },
            {
              title: "清晰度增强",
              text:
                "对压缩后的模糊图像实现智能快速去噪，优化图像纹理细节，提高整体清晰度。",
              query: "",
              image: "static/picture/42397d93-a896-418a-93f3-b7605c433314.png",
              type: "beauty",
            },
            {
              title: "图像标志擦除",
              text: "自动检测与擦除图像中的常见标志，可用于图像素材的再创作",
              query: "",
              image: "static/picture/86c64fd8-a2a2-4a5d-8975-30c86e36b91e.png",
            },
            {
              title: "商品抠图",
              text: "识别输入图像中的商品轮廓，与背景进行分离",
              query: "",
              image: "static/picture/1c47ba93-33e0-4788-bf0b-194d46c7b273.png",
            },
            {
              title: "人体轮廓分割",
              text: "识别输入图像中的人体轮廓，与背景进行分离",
              query: "",
              image: "static/picture/e90798ea-c61e-42aa-9dda-5af42d0a2a31.jpg",
            },
          ],
      imageIndex:0
    }
  },
  computed:{
  },
  watch:{
    $route:{
      deep:true,
      handler(){
        this.imageIndex = this.imageData.findIndex(item => item.title == this.$route.query.title)
      }
    }
  },
  mounted(){
    this.imageIndex = this.imageData.findIndex(item => item.title == this.$route.query.title)
  },
  methods:{
    handlerToRouter(item,index){
      this.imageIndex = index;
      if (item.query == "vision") {
        if (
          item.title != "活体照片" &&
          item.title != "头发分割" &&
          item.title != "图片拉伸修复" &&
          item.title != "图片超分辨率" &&
          item.title != "图片方向矫正"
        ) {
          this.$router.push(`/workset/vision?title=${item.title}`);
        } else {
          this.$message("正在开发中...");
        }
      } else {
        this.$router.push(`/workset/treasureBox?title=${item.title}`);
      }
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
    }
    img{
      width: 16px;
      height: 16px;
    }
  }
  .desc{
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    width: 100%;
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