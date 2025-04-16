<template>
  <main>
    <div class="go-back" style="z-index: 10">
      <div @click="$router.go(-1)" class="go_back-item-on">
        <img
          style="width: 10px; transform: rotateZ(180deg); margin: auto 0"
          src="../../assets/images/right.png"
          alt=""
        />
        <span style="margin-left: 8px">返回</span>
      </div>
    </div>
    <!-- 导航栏 -->
    <nav>
      <div class="nav-left">
        <img src="../../assets/images/Frame-logo.jpg" />
        <div>
          <div>你好，欢迎来到AI百宝箱！</div>
          <div>热门功能，应有尽有</div>
        </div>
      </div>
      <div class="nav-right">
        <el-input
          prefix-icon="el-icon-search"
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
        <el-button style="margin-left: 15px" @click="handleSearch"
          >确定</el-button
        >
      </div>
    </nav>
    <!-- 主题内容 -->
    <section>
      <div class="section-top">
        <span
          v-for="(item, index) in data"
          :key="index"
          :style="title == item.title ? 'color: blue;' : ''"
          @click="handleSelectData(item.title)"
          >{{ item.title }}</span
        >
      </div>
      <div class="section-main">
        <!-- 全部功能 -->
        <div class="whole">
          <div
            class="domHover"
            @click="toPage(item)"
            v-for="(item, index) in selectData"
            :key="index"
          >
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import httpUrls from "../../api/requestURL";
export default {
  name: "visionNav",
  data() {
    return {
      httpUrls,
      input: "",
      data: [
        {
          title: "全部功能",
          arr: [
            "照片修图",
            "照片裁剪",
            "通用视频生成",
            "视频降噪",
            "视频人像卡通画",
            "视频标志擦除",
            "视频字幕擦除",
            "视频增强",
            "视频封面生成",
            "人脸素描",
            "人脸修复",
            "皮肤病检测",
            "智能瘦脸",
            "智能美妆",
            "人脸滤镜",

            // '物体识别',
            '车型识别',
            '图像主体检测',
            '黑白图像填色',
            '图像风格转换',

            '清晰度增强',
            '图像标志擦除',
            '商品抠图',
            '人体轮廓分割',

          ],
        },
        {
          title: "图像处理",
          arr: ["照片修图", "照片裁剪",'车型识别','图像主体检测','黑白图像填色','图像风格转换','清晰度增强','图像标志擦除','商品抠图','人体轮廓分割'],
        },
        {
          title: "视频处理",
          arr: [
            "通用视频生成",
            "视频降噪",
            "视频人像卡通画",
            "视频标志擦除",
            "视频字幕擦除",
            "视频增强",
            "视频封面生成",
          ],
        },
        {
          title: "人脸美颜",
          arr: ["人脸素描", "人脸修复", "智能瘦脸", "智能美妆", "人脸滤镜"],
        },
        {
          title: "医学",
          arr: ["皮肤病检测"],
        },
      ],
      title: "全部功能",
      bool: false, //判断隐藏状态
      boolInput: "a", //显示某个功能
      selectData:[]
    };
  },
  computed: {
  },
  watch: {
    input: {
      deep: true,
      handler() {
        if (this.input == "") {
          this.bool = false;
        }
      },
    },
  },
  created() {
    this.handleSelectData('全部功能')
  },
  methods: {
    handleSelectData(item){
      this.title = item;
      this.selectData = this.data.find((item) => item.title == this.title).arr;
      this.input = ''
    },
    toPage(title) {
      // if (
      //   title == "照片修图" ||
      //   title == "照片裁剪" ||
      //   title == "视频人像卡通画" ||
      //   title == "通用视频生成" ||
      //   title == "视频字幕擦除" ||
      //   title == "视频标志擦除" ||   
      //   title == "视频降噪" ||
      //   title == "视频增强" ||
      //   title == "视频封面生成" ||
      //   title == "人脸素描" ||
      //   title == "人脸修复"||
      //   title == "智能美妆" || 人脸滤镜 || 皮肤病检测 || 智能瘦脸
      // ) {
        this.$router.push(`/treasureBox?title=${title}`);
      // } else {
      //   this.$message("正在开发中...");
      // }
    },
    handleSearch() {
      if (this.input == "") {
        this.$message("请输入你想要查找的功能");
        return;
      }
      let label = this.data[0].arr.filter((item) => {
        return item.toLowerCase().indexOf(this.input.toLowerCase()) > -1;
      });
      console.log(label)
      if (!label.length) {
        this.$message.error("未查找到该功能");
        return;
      }

      this.selectData = label;
      this.title = "";
      this.bool = true;
      this.boolInput = this.input;
    },
  },
};
</script>

<style scoped>
.el-icon-present {
  /* background: red; */
  font-size: 25px;
}

.go-back {
  cursor: pointer;
  position: relative;
  left: 0px;
  top: 10px;
}

.go_back-item-on {
  display: flex;
  transition: all 0.2s;
}

main {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

nav {
  /* position:relative;
  top: 100px; */
  margin-top: 50px;
  display: flex;
}

.nav-left {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.nav-left img {
  margin-right: 15px;
}

.nav-left > div div:first-child {
  font-size: 20px;
  font-weight: 600px;
}

.nav-left > div div:last-child {
  font-size: 14px;
  line-height: 30px;
}

.nav-right {
  display: flex;
  align-items: center;
}

section {
  margin-top: 40px;
}

.section-top {
  display: flex;
  font-size: 19px;
  margin-bottom: 20px;
}

.section-top span {
  margin-right: 20px;
}

.section-top span:hover {
  cursor: pointer;
}

.section-main > div {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}

.section-main img {
  width: 18px;
  height: 18px;
}

.hot {
  width: 620px;
}

.hot > div {
  margin-right: 15px;
  display: flex;
  align-items: center;
  width: 140px;
  height: 70px;
  margin-bottom: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 7px;
}

.hot > div div {
  margin-left: 7px;
}

.whole {
  width: 920px;
}

.whole > div {
  margin-right: 15px;
  display: flex;
  align-items: center;
  width: 140px;
  height: 70px;
  background: white;
  margin-bottom: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 7px;
}
.whole > div:hover {
  /* background: rgb(31, 100, 255); */
  /* color: #FFF; */
  /* border: 1px solid rgba(0,0,0,0); */
}

.whole > div div {
  margin-left: 7px;
}

.domHover {
  cursor: pointer;
}
</style>