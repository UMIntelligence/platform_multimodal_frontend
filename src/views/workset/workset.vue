<template>
  <div
    style="
      background: rgb(241, 242, 245);
      padding: 30px;
      box-sizing: border-box;
      width: 100%;
      min-height: 100%;
      height: auto;
    "
  >
    <!-- 图片分类 -->

    <div
      class="column"
      v-for="(item, index) in data.filter((item) => item.title == worksetLabel)"
      :key="index"
    >
      <!-- 标题 -->
      <div class="column-title">
        <div>{{ item.title }}</div>
      </div>
      <div class="classification" v-if="worksetLabel == '图片处理'">
        <span @click="handleScreen('')">全部功能</span>
        <span @click="handleScreen('beauty')">人脸美颜</span>
        <span @click="handleScreen('illness')">医学能力</span>
      </div>
      <div class="column-conter">
        <div
          class="column-box"
          v-for="child in item.arr"
          :key="child.title"
          @click="toPage(item, child)"
        >
          <img
            class="box-image"
            v-if="child.topImage"
            :style="
              child.title == '绘画中心'
                ? 'width:32px;height: 32px;top: 7px;right: 5px; '
                : ''
            "
            :src="httpUrls.ossUrl + child.topImage"
            alt=""
          />
          <div class="box-top">
            <div v-if="child.image">
              <img
                :src="httpUrls.ossUrl + child.image"
                :style="item.title == '视频处理' ? 'width: 40px;height: 40px;' : ''"
                alt=""
              />
            </div>
            <span>{{ child.title }}</span>
          </div>
          <div class="box-text">{{ child.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from "../../api/requestURL";
import { mapGetters } from "vuex";
export default {
  name: "worksetNav",
  data() {
    return {
      httpUrls,
      data: [
        {
          title: "对话模型",
          arr: [
            {
              title: "无忧秘书",
              text: "先进AI、无限创意",
              query: "/chat/Chat",
              val: 1004,
              image: "static/picture/89200a8a-36ab-43aa-9f6b-918b470c3f63.png",
            },
            {
              title: "文心一言",
              text: "推荐百度新一代语言大模型",
              query: "/chat/Chat",
              val: 4,
              image: "static/picture/2a4a8b53-5339-4f11-976d-af5c562656ba.png",
            },
            {
              title: "讯飞星火",
              text: "讯飞科大推出的新一代认知智能大模型",
              query: "/chat/Chat",
              val: 5,
              image: "static/picture/f6ccba51-9274-4a9e-9380-27775dda6cb1.png",
            },
            {
              title: "通义千问",
              text: "阿里巴巴集团推出的大语言模型",
              query: "/chat/Chat",
              val: 10,
              image: "static/picture/c41cd958-a14d-4f6e-a26a-bd22c6b3460e.png",
            },
            {
              title: "360智脑",
              text: "由360集团推出的认知型通用大模型",
              query: "/chat/Chat",
              val: 12,
              image: "static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png",
            },
            {
              title: "豆包",
              text: "字节旗下火山引擎推出的大型语言模型",
              query: "/chat/Chat",
              val: 1003,
              image: "static/picture/a2d95978-ce23-4206-99cd-7b51a42a4388.png",
            },
            {
              title: "腾讯混元",
              text: "腾讯最新研发的大语言模型",
              query: "/chat/Chat",
              val: 1001,
              image: "static/picture/b21293b8-b53c-4aab-8a5e-7eb269776839.png",
            },
          ],
        },
        {
          title: "绘画模型",
          arr: [
            {
              title: "无忧秘书",
              text: "先进AI、无限创意",
              query: "",
              image: "static/picture/89200a8a-36ab-43aa-9f6b-918b470c3f63.png",
            },
            {
              title: "通义万相",
              text: "一个不断进化的AI艺术创作大模型",
              query: "13",
              image: "static/picture/85793da8-3fd1-420f-8a94-0b03b4e1989b.jpg",
            },
            {
              title: "百度绘画",
              text: "AI一下，文字成画将创意变成创作",
              query: "3",
              image: "static/picture/5e052261-6ace-48c1-8c2a-3c6422207a3d.png",
            },
            {
              title: "火山引擎",
              text: "火山方舟推出的大模型服务，文生图",
              query: "14",
              image: "static/picture/90b3a7b1-1b0e-401b-bc2a-f71b56feb937.jpg",
            },
          ],
        },
        {
          title: "图片处理",
          arr: [
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
        },
        {
          title: "视频处理",
          arr: [
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
        },
      ],
      filterData: [],
      imageCheck: "",
    };
  },
  computed: {
    ...mapGetters(["worksetLabel"]),
  },
  created() {
    // this.filterData = this.data.filter(item=>item.title == this.worksetLabel)
  },
  beforeDestroy() {
    // this.$store.dispatch('app/changeworksetLabel', '')
  },
  methods: {
    // 筛选/分类
    handleScreen(val) {
      let oldData = [
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
          text: "对压缩后的模糊图像实现智能快速去噪，优化图像纹理细节，提高整体清晰度。",
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
      ];
      let newData = []
      switch (val) {
        case '':
          //人脸美颜
          newData = oldData
          break;
        case 'beauty':
          //人脸美颜
          newData = oldData.filter(item => item.type && item.type == 'beauty')
          break;
        case 'illness':
          //医学能力
          newData = oldData.filter(item => item.type && item.type == 'illness')
          break;
        default:
          break;
      }
      this.$set(this.data[2],'arr',newData)
    },
    toPage(item, type) {
      switch (item.title) {
        case "对话模型":
          // if (type.query == "/chat/Chat") {
          //   this.$router.push(`/chat/Chat`);
          // } else {
          this.$router.push(`/chat/Chat`);
          this.$store.dispatch("app/changeSelectChat", type.val);
          // }
          break;
        case "绘画模型":
          this.$router.push("/drawChat/drawChat?value=" + type.query);
          sessionStorage.setItem("indexType", JSON.stringify(type.query));
          break;
        case "图片处理":
          if (type.query == "vision") {
            console.log(type.title);
            console.log(
              type.title != "活体照片" &&
                type.title != "头发分割" &&
                type.title != "图片拉伸修复" &&
                type.title != "图片超分辨率" &&
                type.title != "图片方向矫正"
            );
            if (
              type.title != "活体照片" &&
              type.title != "头发分割" &&
              type.title != "图片拉伸修复" &&
              type.title != "图片超分辨率" &&
              type.title != "图片方向矫正"
            ) {
              this.$router.push(`/vision/vision?title=${type.title}`);
            } else {
              this.$message("正在开发中...");
            }
          } else {
            this.$router.push(`/treasureBox?title=${type.title}`);
          }
          // item.arr.forEach((item2, index) => {
          // if (item2.title == type.title && index < 12) {
          // this.$router.push(`/vision/vision?title=${type.title}`);
          // } else if (item2.title == type.title && index >= 12) {
          //   this.$message("正在开发中...");
          // }
          // });
          break;
        case "视频处理":
          console.log(type);
          this.$router.push(`/treasureBox?title=${type.title}`);
          // item.arr.forEach((item2, index) => {
          //   if (item2.title == type.title && index < 12) {
          //     this.$router.push(`/vision/vision?title=${type.title}`);
          //   } else if (item2.title == type.title && index >= 12) {
          //     this.$message("正在开发中...");
          //   }
          // });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.classification {
  display: flex;
  color: #999;
  font-size: 14px;
  margin-left: 11px;
}
.classification span {
  margin-right: 15px;
  cursor: pointer;
}
.column {
  box-sizing: content-box;
  margin-bottom: 20px;
  padding: 0px;
}

.column-title {
  color: #19191a;
  font-family: PingFang SC;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}

.column-title .more {
  color: #1f64ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 1%;
}

.column-conter {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
}

.column-box {
  width: 23%;
  height: 110px;
  padding: 10.5px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  border-radius: 8px;
  margin: 8px 1%;
  cursor: pointer;
}

.column-box:last-child {
  margin-right: 0px;
}

.column-box .box-image {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  right: 0px;
}

.column-box .box-top {
  display: flex;
}

.column-box .box-top div {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 3.2px;
  border: 0.8px solid #f4f5f9;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.column-box .box-top div img {
  width: 16px;
  height: 16px;
}

.column-box .box-top span {
  color: #000;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  /* 24px */
}

.column-box .box-text {
  color: #8f8f8f;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  margin-top: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* 21px */
}
</style>
