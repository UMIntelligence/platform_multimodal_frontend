<template>
  <div class="main">
    <!-- 企业设置 -->
    <div class="left">
      <div class="left-content">
        <div class="left-list">
          <div class="left-box" :class="active == index?'active':''" @click="active = index" v-for="(item,index) in leftArr" :key="index">
            <div>{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top" v-if="active != 2 && active != 3">
        <span v-if="active == 0">概览</span>
        <span v-else-if="active == 1">基本信息</span>
        <span v-else-if="active == 2">管理员权限</span>
        <span v-else-if="active == 3">权限组权限</span>
        <span v-else>高级设置</span>
      </div>
      <div class="right-content" :style="{height:active == 0 || active == 1 ||active == 4?'calc(100vh - 100px - 53px)':'calc(100vh - 100px)'}">
        <!-- 概览 -->
        <overview v-if="active == 0"></overview>
        <!-- 基本信息 -->
        <information v-else-if="active == 1"></information>
        <!-- 管理员权限 -->
        <administrators v-else-if="active == 2"></administrators>
        <!-- 权限组权限 -->
        <authorit v-else-if="active == 3"></authorit>
        <!-- 高级设置 -->
        <senior v-else></senior>

      </div>
    </div>
  </div>
</template>

<script>
import administrators from "./administrators.vue";
import authorit from "./authorit.vue";
import information from "./information.vue";
import overview from "./overview.vue";
import senior from "./senior.vue";

export default {
  name:"enterpriseWEB_settings",
  data(){
    return {
      active:0,
      leftArr:['概览','基本信息','管理员权限','权限组设置','高级设置',]
    }
  },
  components:{
    senior,
    overview,
    information,
    authorit,
    administrators
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  .left {
    width: 240px;
    height: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0px;
    .left-content {
      width: 100%;
      height: calc(100% - 40px);
      box-sizing: border-box;
      overflow-y: auto;
      .left-box {
        width: 100%;
        border-radius: 8px 8px 8px 8px;
        font-weight: bold;
        font-size: 14px;
        color: #000000;
        padding: 0px 8px;
        line-height: 48px;
        box-sizing: border-box;
        cursor: pointer;
      }
      .left-box:hover {
        background: rgb(204, 204, 204);
      }
      .left-box.active {
        background: #f3f7ff !important;
        color: #3363f6 !important;
      }
    }
  }
  .right {
      width: calc(100% - 240px);
      background: #f6f8fa;
      overflow: auto;
      // padding: 40px 0px;
      box-sizing: border-box;
      border-left: 1px solid #EBEBEB;
      .right-top{
        line-height: 52px;
        border-top: 1px solid #EBEBEB;
        box-shadow: inset 0px -1px 0px 0px #EBEBEB;
        background: #FFFFFF;
        padding: 0px 20px;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 16px;
      }
      .right-content {
        width: 100%;
        max-height: calc(100vh - 100px);
        overflow: auto;
        // background-color: #fff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.03);
        border-radius: 20px 20px 20px 20px;
        // border: 1px solid #f0f0f0;
        padding: 20px;
        box-sizing: border-box;
      }
    }
}
</style>