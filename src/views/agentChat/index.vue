<template>
  <div>
  <!-- 智能体对话 -->
  <el-container style="background: #fff;height: auto;">
    <!-- 左侧菜单:width="!isShowRightSidbar ? '260px' : '0px'" -->
    <el-aside width="0px">
      <leftnav></leftnav>
    </el-aside>
    <el-container style="height: calc(100vh - 58px);overflow-y: hidden;">
      <el-header>
        <Header @onPlug="openPlug" @onHistory="openHistory"></Header>
      </el-header>
      <el-main>
        <div class="btn-fixed">
          <img
            v-if="isShowRightSidbar"
            @click="isShowRightNav"
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321545@2x (1).png"
            alt=""
          />
          <img
            v-else
            @click="isShowRightNav"
            src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321545@2x.png"
            alt=""
          />
        </div>
        <mainIndex></mainIndex>
      </el-main>
    </el-container>
    <!-- 插件抽屉 -->
    <el-drawer
    :visible.sync="plugDrawer"
      direction="rtl"
      :with-header="false"
      :size="520"
    >
      <div class="Drawer">
        <div class="Drawer-title">插件</div>
        <div class="Drawer-list">
          <!-- <div class="plugDrawer-item" v-for="item in 4" :key="item">
            <div class="name">插件名称{{ item }}</div>
            <div class="middle">
              <div class="desc">
                插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述插件描述
              </div>
              <el-switch size="large" v-model="value1" />
            </div>
            <div class="tags">
              <div class="tags-item">功能标签</div>
              <div class="tags-item">文生图</div>
              <div class="tags-item">文图生图</div>
            </div>
          </div> -->
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div class="Drawer-bottom">
          <div class="btn" @click="plugDrawer = false">取消</div>
          <div class="btn" @click="plugDrawer = false">确定</div>
        </div>
      </div>
    </el-drawer>
    <!-- 历史记录 -->
    <el-drawer
    :visible.sync="historyDrawer"
      direction="rtl"
      :with-header="false"
      :size="520"
    >
      <div class="Drawer">
        <div class="Drawer-title">发布历史</div>
        <div class="Drawer-list">
          <el-steps direction="vertical" :active="100" class="version_mask">
            <el-step
              v-for="(item, index) in historyList"
              :key="index"
              class="stepsStep"
            >
              <template #title>
                <div class="step-title">标题{{ index + 1 }}</div>
              </template>
              <template #description>
                <div class="step-description">
                  <div class="step-description-item">
                    v 3.2版本更新升级了，快来一起使用吧！
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div class="Drawer-bottom">
          <div class="btn" @click="historyDrawer = false">取消</div>
          <div class="btn" @click="historyDrawer = false">确定</div>
        </div>
      </div>
    </el-drawer>
  </el-container>
</div>
</template>

<script>
import Header from "./header.vue";
import leftnav from "./leftnav.vue";
import mainIndex from "./chat.vue";
export default {
  data(){
    return {
      isShowRightSidbar:true,  //是否显示左侧历史记录
      plugDrawer:false,
      historyDrawer:false,
      historyList:[{ title: 1 }, { title: 1 }, { title: 1 }, { title: 1 }],
      value1:false
    }
  },
  components:{
    Header,
    leftnav,
    mainIndex
  },
  methods:{
    isShowRightNav(){
      this.isShowRightSidbar = !this.isShowRightSidbar;
    },
    openPlug(){
      this.plugDrawer = true;
    },
    openHistory(){
      this.historyDrawer = true;
      setTimeout(() => {
        let dom = document.querySelectorAll(".el-step__icon");
        dom[0].style.background = "#003FFF";
      }, 10);
    },
  }
}
</script>
<style lang="scss" scoped>
.el-aside {
  overflow: hidden;
  transition: all 0.6s;
}
.el-main {
  padding: 0px !important;
  position: relative;
  transition: all 0.6s;
  height: calc(100vh - 108px);
  overflow-y: hidden;
}
/deep/ .el-drawer {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  .el-drawer__body {
    padding: 0px !important;
  }
}
.btn-fixed {
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  cursor: pointer;
  width: 30px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
}
/deep/ .el-step__icon.is-text:first-child {
  background: red !important;
}
/deep/ .el-step__icon.is-text {
  width: 8px;
  height: 8px;
  border: 0px !important;
  background: #f2f2f2;
  position: absolute !important;
  top: 0px;
  left: 50%;
  transform: translate(-50%);
}
/deep/ .el-step__icon-inner {
  display: none !important;
}
/deep/ .el-step__head {
  width: 8px;
}
/deep/ .el-step__line-inner {
  border-color: #f2f2f2;
}
/deep/ .el-step__description {
  padding: 0px !important;
}
.el-step {
  flex-basis: 0 !important;
}
.Drawer {
  width: 100%;
  height: 100%;
  position: relative;
  .Drawer-title {
    padding: 17px 24px;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px 0px #f2f2f2;
    font-weight: 600;
    font-size: 20px;
    color: #000000;
  }
  .Drawer-list {
    width: 100%;
    height: calc(100% - 60px - 32px - 24px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px;
    .plugDrawer-item {
      box-sizing: border-box;
      padding: 20px;
      background: #f5f5f7;
      border-radius: 16px 16px 16px 16px;
      margin-bottom: 16px;
      .name {
        font-weight: bold;
        font-size: 16px;
        color: #000000;
      }
      .middle {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-block: 4px;
        margin-bottom: 11px;
        .desc {
          font-weight: 400;
          font-size: 12px;
          color: #666666;
          width: calc(100% - 40px - 20px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .tags {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        .tags-item {
          padding: 3px 8px;
          box-sizing: border-box;
          background: #e7e7eb;
          border-radius: 5px 5px 5px 5px;
          font-weight: bold;
          font-size: 12px;
          color: #666666;
        }
      }
    }
    .step-title {
      font-weight: bold;
      font-size: 12px;
      color: #999999;
      line-height: 12px;
    }
    .step-description {
      width: 100%;
      padding: 13px 16px;
      box-sizing: border-box;
      margin-top: 8px;
      margin-bottom: 20px;
      background: #f5f5f7;
      border-radius: 10px 10px 10px 10px;
      .step-description-item {
        font-weight: bold;
        font-size: 14px;
        color: #000000;
      }
    }
  }
  .Drawer-bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    position: absolute;
    bottom: 24px;
    right: 24px;
    .btn {
      width: 88px;
      line-height: 30px;
      text-align: center;
      background: #ffffff;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #e6e6e6;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
    }
    .btn:last-child {
      background: #003fff;
      color: #fff;
    }
  }
}
</style>