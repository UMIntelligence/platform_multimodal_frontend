<template>
  <nav>
    <div class="nav_left">
      <div class="goBack" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        <div>返回</div>
      </div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="flex">
        <el-breadcrumb-item class="flex">
          <div class="item">
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xc/com/message_center/Group 427318874.png"
              alt=""
            />
            <div>xxxx科技公司</div>
          </div>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in itemArray" :key="item">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav_right" v-if="nav_right">
      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Icon__ share@2x.png" alt="">
      <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Menu__ Hamburger_MD@2x.png" alt="">
    </div>
  </nav>
</template>

<script>
export default {
  name: "enterprise_nav",
  props: {
    itemArray: {
      type: Array,
      default: ["部门", "产品知识库"],
    },
  },
  data(){
    return {
      nav_right: false,
    }
  },
  created(){
    
    if(this.$route.path == '/enterpriseWEB/knowledge/documentPreview'){
      
      this.nav_right = true;
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  padding: 16px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
  .nav_left{
    display: flex;
    align-items: center;
  }
  .nav_right{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-left: 1px solid #E6E6E6;
    img{
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-left: 20px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .goBack {
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
      margin-left: 0px;
      margin-right: 15px;
      font-size: 15px;
    }
  }
  .item {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: auto;
    }
    div {
      margin: 0px !important;
    }
  }
}
</style>