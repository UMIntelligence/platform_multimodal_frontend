<template>
  <!-- 资讯信息 -->
  <div class="container3">
    <div class="title">资讯信息</div>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">资讯信息</el-col>
      <el-col :span="21">技术解决方案</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">资讯名称</el-col>
      <el-col :span="21">AI数字人系统方案</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">内容描述</el-col>
      <el-col :span="21">
        AI数字人系统是一款集成了人工智能技术的先进解决方案，旨在通过创建高度逼真的数字人形象，提供个性化的交互体验。该系统利用最新的自然语言处理（NLP）、机器学习（ML）和计算机视觉技术，模拟人类的行为和交流方式，广泛应用于客户服务、教育培训、娱乐互动等多个领域。
          核心功能：
        自然语言交流：通过高级NLP技术，数字人能够理解并流畅地使用自然语言与用户进行交流。
        情感识别与响应：系统能够识别用户的情感状态，并据此调整数字人的反应，提供更人性化的服务。
        个性化学习：在教育领域，数字人可以根据学生的学习习惯和进度提供定制化的教学内容。
        虚拟客服：作为虚拟客服代表，数字人能够提供24/7的客户支持，处理常见的查询和问题解决。
        娱乐互动：在娱乐行业，数字人可以作为虚拟偶像或游戏角色，与粉丝进行互动，提供独特的娱乐体验。
        技术亮点：
        高度逼真的形象：采用3D建模和实时渲染技术，创造出外观和动作逼真的数字人形象。
        智能决策引擎：基于ML算法，数字人能够进行复杂的决策过程，提供更加智能的交互体验。
        多模态交互：结合语音、视觉和触觉等多种交互方式，提供丰富的用户体验。
        持续学习与进化：系统具备自我学习和进化的能力，能够根据用户反馈不断优化性能。
        应用场景：
        客户服务：提供自动化的客户咨询和支持服务，降低企业的人力成本。
        在线教育：作为虚拟教师，提供一对一的个性化教学服务。
        虚拟助理：在企业中担任虚拟助理，帮助处理日常行政和管理工作。
        娱乐产业：作为虚拟偶像或角色，参与电影、游戏和音乐会等娱乐活动。
        未来展望：
        AI数字人系统将继续深化技术研发，拓展更多行业应用，推动数字人技术的商业化和普及化。同时，也将重视用户隐私和数据安全，确保技术的负责任使用。
          产品优势：
        成本效益：相比传统人工服务，AI数字人能够提供更经济高效的解决方案。
        可扩展性：系统设计考虑了未来的扩展性，可以轻松集成新的功能和服务。
        用户友好：直观的用户界面和交互设计，确保用户能够轻松上手
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">产品图片</el-col>
      <el-col :span="21">
        <img
          :src="
            httpUrls.ossUrl +
            'static/picture/dc6868c4-f6ea-42dc-935e-5fff7338f72e.jpg'
          "
          class="qrcode"
          alt=""
        />
      </el-col>
    </el-row>
    <div class="title">资料文件</div>
    <!-- 文档 -->
    <div class="table">
      <!-- 资料头部 -->
      <div class="information-top">
        <div class="left-text">文档</div>
        <div class="upload-btn">
          <img
            :src="
              httpUrls.ossUrl +
              'xcx/com/message_center/vuesax_linear_export@2x.png'
            "
            alt=""
          />
          <div>上传内容</div>
        </div>
      </div>
      <!-- 表格部分 -->
      <div class="table-content">
        <el-table
          :header-cell-style="{
            color: '#70767F',
            fontSize: '12px',
            backgroundColor: '#F6F8FA',
            padding: '0',
            height: '40px',
            lineHeight: '44px',
          }"
        >
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="创建人"></el-table-column>
          <el-table-column label="手机号"></el-table-column>
          <el-table-column label="创建时间"></el-table-column>
          <el-table-column label="更新时间"></el-table-column>
          <el-table-column label="类型"></el-table-column>
          <el-table-column label="所属"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 图片库 -->
    <div class="image">
      <div class="information-top">
        <div class="left-text">图片</div>
        <div class="upload-btn">
          <img
            :src="
              httpUrls.ossUrl +
              'xcx/com/message_center/vuesax_linear_export@2x.png'
            "
            alt=""
          />
          <div>上传内容</div>
        </div>
      </div>
      <!-- 图片库 -->
      <div class="image-content">
        <div class="image-content-box" v-for="item in 20" :key="item">
          <img
            :src="
              httpUrls.ossUrl + 'xcx/com/message_center/Rectangle 34625122.png'
            "
            alt=""
          />
          <div class="container_box_text">快手直播1</div>
        </div>
      </div>
    </div>
    <!-- 网址 -->
    <div class="website">
      <!-- 资料头部 -->
      <div class="information-top">
        <div class="left-text">网址</div>
        <div style="display: flex;align-items: center;">
          <el-input v-model="input" placeholder="请输入你的网址"></el-input>
          <div class="upload-btn" style="margin-left: 10px;">
            <i class="el-icon-plus"></i>
            <div>添加网址</div>
          </div>
        </div>
      </div>
      <!-- 表格部分 -->
      <div class="website-content">
        <el-table
          :header-cell-style="{
            color: '#70767F',
            fontSize: '12px',
            backgroundColor: '#F6F8FA',
            padding: '0',
            height: '40px',
            lineHeight: '44px',
          }"
        >
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="网址"></el-table-column>
          <el-table-column label="创建人"></el-table-column>
          <el-table-column label="手机号"></el-table-column>
          <el-table-column label="创建时间"></el-table-column>
          <el-table-column label="更新时间"></el-table-column>
          <el-table-column label="所属"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from "../../../../api/requestURL";
export default {
  name: "information",
  data() {
    return {
      httpUrls,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #000;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
}
.el-row {
  margin-bottom: 40px;
  .el-col {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    min-width: 130px !important;
    .qrcode {
      width: 80px;
      height: 80px;
    }
  }
}
.left-text{
    color: #666666 !important;
}
.table,
.image,
.website {
  margin-bottom: 40px;
}
.information-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  > div:first-child {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
  }
  .upload-btn {
    width: auto !important;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    box-sizing: border-box;
    height: 40px;
    background: #3363f6;
    border-radius: 8px 8px 8px 8px;
    color: #ffffff;
    cursor: pointer;
    margin-left: 15px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    div {
      font-weight: bold;
      font-size: 14px;
      white-space: nowrap;
      margin-left: 5px;
    }
  }
}
.image-content {
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  .image-content-box {
    // width: 100%;
    width: calc(100% / 11 - 10px);
    min-width: 126px;
    height: 164px;
    text-align: center;
    padding: 24px 22px;
    box-sizing: border-box;
    background: #f6f6f7;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid #f8f8f8;
    > img {
      width: auto;
      height: 80px;
      margin-bottom: 4px;
      border-radius: 8px 8px 8px 8px;
      text-align: center;
    }
    div {
      font-size: 14px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>