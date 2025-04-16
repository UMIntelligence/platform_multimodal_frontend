<template>
  <div class="header">
    <div class="back">
      <i class="el-icon-arrow-left"  @click="$router.go(-1)"></i>
    </div>
    <div class="header-left"> 
      <img class="agent-img" :src="agentItem.icon_url">
      <!-- 智能体信息 -->
      <div class="agent-information">
        <div class="agent-name">{{agentItem.bot_name}}</div>
        <div class="bottom">
          <div v-show="false" >
            <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Rectangle 34625122-5.png" alt="">
            <div class="name">小杨哥</div>
            <div class="phone">@18779756426</div>
          </div>
          <!-- 工具栏：点赞 -->
          <div class="tool" v-show="false">
            <!-- 浏览 -->
            <div class="tool-item">
              <img src="../../assets/images/images_ljh/General__ Eye@2x.png" alt="">
              <div>1.2w</div>
            </div>
            <!-- 点赞 -->
            <div class="tool-item">
              <img src="../../assets/images/images_ljh/Group_427321554@2x.png" alt="">
              <div>128</div>
            </div>
            <!-- 转发 -->
            <div class="tool-item">
              <img src="../../assets/images/images_ljh/Group_427320532@2x.png" alt="">
              <div>279</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-cascader v-model="chat_value" :options="options"></el-cascader> -->
    <div class="header-right">
      <!-- 插件 -->
      <div class="plug-in" @click="handlePlug">
        <img src="../../assets/images/images_ljh/Frame@2x (3).png" alt="">
        <div>插件</div>
      </div>
      <el-tooltip
        effect="dark"
        content="发布历史"
        placement="bottom"
      >
      <img @click="handleHistory" src="../../assets/images/images_ljh/Group_427321563@2x.png" alt="">
    </el-tooltip>
      <el-tooltip
        effect="dark"
        content="清除"
        placement="bottom"
      >
      <img @click="handleRemove" src="../../assets/images/images_ljh/Group_427321564@2x.png" alt="">
    </el-tooltip>
    <el-tooltip
        effect="dark"
        content="导出文件"
        placement="bottom"
      >
      <el-dropdown trigger="click" @command="handleCommand">
        <img src="../../assets/images/images_ljh/Group_427321565@2x.png" alt="">
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item  command="1">
              <img class="dropdownImg" src="../../assets/images/images_ljh/Group_427320105@2x (1).png" alt="">
              <div>JSON</div>
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <img class="dropdownImg" src="../../assets/images/images_ljh/Group_427320105@2x (2).png" alt="">
              <div>Word</div>
            </el-dropdown-item>
            <el-dropdown-item command="3">
              <img class="dropdownImg" src="../../assets/images/images_ljh/Group_427320105@2x (3).png" alt="">
              <div>Image</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
    </div>
  </div>
</template>
<script>
// import bus from "@/utils/mitt.js";
// import { ArrowLeftBold } from '@element-plus/icons-vue'
export default {
  
  data(){
    return {
      chat_value:["1004", "umi-pro-4k"],
      options: [
        {
          value: "4",
          label: "文心一言",
          children: [
            {
              value: "ernie-speed-128k",
              label: "ernie-speed-128k（免费）",
            },
            {
              value: "ernie-4.0-8k-latest",
              label: "ernie-4.0-8k-latest",
            },
            {
              value: "ernie-3.5-128k",
              label: "ernie-3.5-128k",
            },
            
          ],
        },

        {
          value: "10",
          label: "通义千问",
          children: [
            {
              value: "qwen-turbo",
              label: "qwen-turbo（免费）",
            },
            {
              value: "qwen-plus",
              label: "qwen-plus",
            },
            {
              value: "qwen-max-longcontext",
              label: "qwen-max-longcontext",
            }
          ],
        },
        {
          value: "5",
          label: "讯飞星火",
          children: [
            {
              value: "v1.1",
              label: "v1.1（免费）",
            },
            {
              value: "v3.5",
              label: "v3.5",
            },
            {
              value: "v4.0",
              label: "v4.0",
            },
          ],
        },

        {
          value: "8",
          label: "chatGLM",
          children: [
          {
              value: "glm-4-flash",
              label: "glm-4-flash（免费）",
            },
            {
              value: "glm-4-airx",
              label: "glm-4-airx",
            },
            {
              value: "glm-4-air",
              label: "glm-4-air",
            },
            
          ],
        },
        {
          value: "12",
          label: "360智脑",
          children: [
            {
              value: "360gpt-turbo",
              label: "360gpt-turbo（免费）",
            },
            {
              value: "360GPT_S2_V9",
              label: "360GPT_S2_V9",
            },
            {
              value: "360gpt2-pro",
              label: "360gpt2-pro",
            },
            
          ],
        },

        {
          value: "1001",
          label: "腾讯混元",
          children: [
            {
              value: "hunyuan-lite",
              label: "hunyuan-lite（免费）",
            },
            {
              value: "hunyuan-standard",
              label: "hunyuan-standard",
            },
            {
              value: "hunyuan-standard-256K",
              label: "hunyuan-standard-256K",
            },
            {
              value: "hunyuan-pro",
              label: "hunyuan-pro",
            }
          ],
        },
        {
          value: "1003",
          label: "豆包",
          children: [
            {
              value: "Doubao-lite-32k",
              label: "Doubao-lite-32k（免费）",
            },
            {
              value: "Doubao-lite-128k",
              label: "Doubao-lite-128k（免费）",
            }
          ],
        },
        {
          value: "1004",
          label: "无忧秘书",
          children: [
            {
              value: "umi-pro-4k",
              label: "umi-pro-4k（免费）",
            },
            {
              value: "umi-pro-32k",
              label: "umi-pro-32k",
            },
            {
              value: "umi-pro-128k",
              label: "umi-pro-128k",
            }

          ],
        }
      ],
        agentItem:null
    }
  },
  mounted(){
    this.agentItem = JSON.parse(sessionStorage.getItem('agentItem'))
  },
  methods:{
    handleCommand(val){
      let num = Number(val);
      if(num == 1){
        this.handleExportJSON()
      }else if(num == 2){
        this.handleExportWord()
      }else{
        this.handleExportImage()
      }
    },
    handleRemove(){
      this.$root.Bus.$emit('removeChatList',true)
    },
    handlePlug(){
      this.$emit('onPlug',true)
    },
    handleHistory(){
      this.$emit('onHistory',true)
    },
    handleExportJSON(){
      console.log('header')
      this.$root.Bus.$emit('ExportJSON',true)
    },
    handleExportWord(){
      this.$root.Bus.$emit('ExportWord',true)
    },
    handleExportImage(){
      this.$root.Bus.$emit('ExportImage',true)
    },
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-dropdown-menu__item{
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}
.dropdownImg{
    width: 20px;
    height: 20px;
  }
  /deep/.el-dropdown-menu__item:not(.is-disabled):focus{
  background: #F6F6F6 !important;
}
.header{
  height: 100%;
  padding: 0px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: inset 0px -1px 0px 0px #EBEBEB;
  /deep/ .select-trigger,/deep/ .el-input{
    height: 40px;
  }
  .back{
    position: absolute;
    cursor: pointer;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
  .header-left{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 40px;
    .agent-img{
      width: auto;
      height: 43px;
      border-radius: 5px;
    }
    .agent-name{
      font-weight: 600;
      font-size: 14px;
      color: #000000;
    }
    .bottom{
      display: flex;
      align-items: center;
      margin-top: 5px;
      >div{
        display: flex;
        align-items: center;
      }
      >div:first-child{
        padding-right: 10px;
        box-sizing: border-box;
        border-right: 1px solid #E6E6E6;
        gap: 5px;
        img{
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
        .name{
          font-weight: 400;
          font-size: 14px;
          color: #000000;
        }
        .phone{
          font-weight: 400;
          font-size: 14px;
          color: #999999;
        }
      }
      .tool{
        padding-left: 10px;
        box-sizing: border-box;
        gap: 10px;
        .tool-item{
          display: flex;
          align-items: center;
          gap: 4px;
          img{
            width: 16px;
            height: 16px;
          }
          div{
            font-weight: 500;
            font-size: 14px;
            color: #000000;
          }
        }
      }
    }
  }
  .header-right{
    display: flex;
    align-items: center;
    gap: 10px;
    .plug-in{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      height: 32px;
      width: 88px;
      border: 1px solid #F0F0F0;
      border-radius: 10px 10px 10px 10px;
      cursor: pointer;
      img{
        width: 16px;
        height: 16px;
      }
    }
    img{
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
}
</style>