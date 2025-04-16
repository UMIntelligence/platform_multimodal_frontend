<template>
  <!-- 企业信息 -->
  <div class="container1">
    <div class="title">企业信息</div>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公司全称</el-col>
      <el-col :span="21">xxxx科技有限公司</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公司简称</el-col>
      <el-col :span="21">xxxx</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">职位</el-col>
      <el-col :span="21">产品经理</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公司网址</el-col>
      <el-col :span="21">127.0.0.1</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">行业赛道</el-col>
      <el-col :span="21">IT/软件/互联网</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">注册地址</el-col>
      <el-col :span="21">龙岗区坂雪岗大道井河原工业区3单元302</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公司描述</el-col>
      <el-col :span="21">
        xxxx科技有限公司是一家领先的人工智能技术解决方案提供商，专注于利用先进的AI技术为不同行业的企业打造定制化解决方案。公司汇聚了一支由数据科学家、软件工程师、产品经理和行业专家组成的多学科团队，致力于通过创新的AI应用推动企业数字化转型和智能化升级。
        公司2024年的产品规划： 1 、无优秘秘书智脑AI --AI 对话，AI
        作图，AI视频创作，提示词，AI角色，AI 工具集，AI 知识库，AI 智能体等等 2
        、AI数字孪生 --数字生命，数字复刻，数字永生，数字复活
        --输入自己的形象，声音，身份特征，性格特征，知识特征，语言习惯，生活习惯，工作习惯，世界观，价值观等等，训练出私有模型，可定制，也可以离线部署；
        --基于以上孪生数字人，可以衍生分身，用于生活方面的陪护、辅导、伴侣模拟等服务，在工作方面，可以用于心理咨询、法律咨询、业务咨询、售后服务等。
        --沿着这个技术主线，后期可以发展到数字生命、数字永生、IP
        复活等领域，为用户带来更多的可能性和乐趣。 3 、AI数字人分身
        --用户对象：营销人员、各领域专家，替代本尊去应对重复性工作；
        --形象克隆，声音克隆、知识库、角色做好设定后，替代本尊去和客户做初步的沟通，方便降低自身的工作量；
        --客户对服务、对产品感兴趣后，客户可以对话、打电话、加微信、报名等形式建立联系，本人再有针对性的去做二次沟通，促成交。
        4 、AI 数字人短视频创作平台
        ---形象克隆，声音克隆，口播视频生成，视频背景更换，热门视频生成，视频智能编辑
        5、AI 企业知识库 --企业基本信息设置，企业营销信息设置，企业产品信息设置
        --各部门架构建立，知识库建立和训练 --企业人员设定，权限设定，人员管理
        --AI 企业数字员工，通过数字人员赋能各部门人员，降本增效。 6 、AI 知识库+
        AI数字人实时互动系统 --知识库建立、形象克隆，声音克隆
        --将数字人引入到互动大屏，设定相应的角色和场景，如迎宾数字人，企业介绍数字人，产品讲解数字人，信息查询数字人，互动下订单数字人，等等。
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">ICP备案号</el-col>
      <el-col :span="21">京ICP备12345678号</el-col>
    </el-row>
    <div class="title">联系方式</div>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">联系电话</el-col>
      <el-col :span="21">18775458965</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">联系邮箱</el-col>
      <el-col :span="21">umi6@umi.com</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公司地址</el-col>
      <el-col :span="21">龙岗区坂雪岗大道景和源工业区3单元302</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">小程序二维码</el-col>
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
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公众号二维码</el-col>
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
    <el-row :gutter="30">
      <el-col :span="2" class="left-text">公司logo</el-col>
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
          <div class="upload-btn">
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
  name: "enterprise",
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