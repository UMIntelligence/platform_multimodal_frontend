
<template>
  <div class="main">
    <!-- 企业信息页面 -->
    <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
    <div class="container">
      <div class="container-top">
        <div
          v-for="(item, i) in topArray"
          :key="i"
          :class="topActive == i ? 'active' : ''"
          @click="handleTop(i)"
        >
          {{ item }}
        </div>
      </div>
      <div class="container-box" v-if="topActive == 0">
        <Enterprise></Enterprise>
      </div>
      <div class="container-box" v-if="topActive == 1">
        <Product></Product>
      </div>
      <div class="container-box" v-if="topActive == 2">
        <Information></Information>
      </div>
      <div class="container-box" v-if="topActive == 3">
        <KnowledgeBase></KnowledgeBase>
      </div>
      <div class="edit-btn" @click="$router.push('/enterpriseWEB/createBase')">编辑内容</div>
    </div>
  </div>
</template>

<script>
import EnterpriseNav from "../../../components/enterprise_nav.vue";
import httpUrls from "../../../api/requestURL";
//企业信息
import Enterprise from "./components_enterprise_Information/enterprise.vue";
//项目或产品信息
import Product from "./components_enterprise_Information/product.vue";
// 资讯信息
import Information from "./components_enterprise_Information/information.vue";
//企业专属AI知识库
import KnowledgeBase from "./components_enterprise_Information/knowledge_base.vue";
export default {
  name: "enterprise_Information",
  data() {
    return {
      httpUrls,
      navArray: ["企业知识库", "企业官网内容库"], //面包屑内容
      topArray: ["企业信息", "项目或产品信息", "资讯信息", "企业专属知识库"], //头部数组
      topActive: 0, //选中头部
    };
  },
  components: {
    EnterpriseNav,
    Enterprise,
    Product,
    Information,
    KnowledgeBase
  },
  methods: {
    //头部点击
    handleTop(i) {
      this.topActive = i;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100%;
  background: #f6f8fa;
  padding-bottom: 25px;
  .container {
    width: calc(100% - 40px);
    min-height: calc(100vh - 58px - 56px - 50px);
    // padding: 0px 35px;
    // padding-top: 50px;
    // padding-bottom: 30px;
    padding: 42px 25px 30px 25px;
    box-sizing: border-box;
    margin: 20px auto;
    margin-bottom: 0px;
    border-radius: 10px 10px 10px 10px;
    background: #ffffff;
    position: relative;
    .container-top {
      width: 700px;
      background: #f5f4f4;
      border-radius: 6px;
      display: flex;
      margin-bottom: 42px;
      div {
        width: 25%;
        border-radius: 6px;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        padding: 7px 0px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
      }
      .active {
        background: #3363f6;
        color: #fff;
      }
    }
    .container-box{
      margin-bottom: 70px;
    }
    .edit-btn{
      background: #3363F6;
      border-radius: 8px 8px 8px 8px;
      width: 220px;
      line-height: 40px;
      font-weight: bold;
      font-size: 14px;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      bottom: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>