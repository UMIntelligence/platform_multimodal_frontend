<template>
  <!-- 企业专属知识库 -->
  <div class="container4">
    <div class="title">企业专属知识库</div>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">标题</el-col>
      <el-col :span="21">这里展示企业知识库标题</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">分类</el-col>
      <el-col :span="21"><el-tag effect="plain">asd</el-tag></el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">描述</el-col>
      <el-col :span="21">AI数字人系统是一款集成了人工智能技术的先进解决方案，旨在通过创建高度逼真的数字人形象，提供个性化的交互体验。该系统利用最新的自然语言处理（NLP）、机器学习（ML）和计算机视觉技术，模拟人类的行为和交流方式，广泛应用于客户服务、教育培训、娱乐互动等多个领域。</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">用途</el-col>
      <el-col :span="21">AI数字人系统是一款集成了人工智能技术的先进解决方案，旨在通过创建高度逼真的数字人形象，提供个性化的交互体验。该系统利用最新的自然语言处理（NLP）、机器学习（ML）和计算机视觉技术，模拟人类的行为和交流方式，广泛应用于客户服务、教育培训、娱乐互动等多个领域。</el-col>
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
    <!-- 文档 -->
    <div class="website">
      <!-- 资料头部 -->
      <div class="information-top">
        <div class="left-text">文档</div>
        <div style="display: flex;align-items: center;">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <div class="upload-btn" style="margin-left: 10px;">
            <i class="el-icon-plus"></i>
            <div>上传内容</div>
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
  name: "knowledge_base",
  data(){
    return {
      httpUrls,
    }
  }
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