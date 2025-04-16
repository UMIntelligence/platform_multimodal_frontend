/** * 左边菜单 */
<template>
  <div class="sidbar_mask">
    <!-- 导航栏 -->
    <el-menu class="el-menu-vertical-demo" @select="selectMenu" :collapse="!isShowSidbar" router
      :default-active="$route.path" unique-opened background-color="#FFFFFF" text-color="#333"
      active-text-color="#1f64ff">
      <!-- 首页 -->
      <el-menu-item index="/index" @click="changeAIType(1)" :class="$route.path == '/index' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/index'" class="asset_img" src="../assets/images/sidebarIcon/indexIcon.png"
            alt="" />
          <img v-else class="asset_img" src="../assets/images/sidebarIcon/indexIconYes.png" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title"
          :style="$route.path == '/index' && isShowSidbar ? 'color: #1f64ff;' : ''">首页</span>
      </el-menu-item>
      <!-- AI对话 -->
      <el-menu-item index="/chat/Chat" @click="changeAIType(1)"
        :class="$route.path == '/chat/Chat' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/chat/Chat'" class="asset_img" src="../assets/images/sidebarIcon/chatIcon.png"
            alt="" />
          <img v-else class="asset_img" src="../assets/images/sidebarIcon/chatIconYes.png" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title"
          :style="$route.path == '/chat/Chat' && isShowSidbar ? 'color: #1f64ff;' : ''">AI对话</span>
      </el-menu-item>
      <!-- AI绘画 -->
      <el-menu-item index="/drawChat/drawChat" @click="changeAIType(2)"
        :class="$route.path == '/drawChat/drawChat' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/drawChat/drawChat'" class="asset_img"
            src="../assets/images/sidebarIcon/drawIcon.png" alt="" />
          <img v-else class="asset_img" src="../assets/images/sidebarIcon/drawIconYes.png" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/drawChat/drawChat' && isShowSidbar ? 'color: #1f64ff;' : ''
          ">AI绘画</span>
      </el-menu-item>

      <!-- AI PPT -->
      <el-menu-item index="/ppt/ppt"
        :class="$route.path == '/ppt/ppt' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/ppt/ppt'" class="asset_img"
            src="../assets/images/sidebarIcon/PPT.png" alt="" />
          <img v-else class="asset_img" src="../assets/images/sidebarIcon/PPT1.png" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/ppt/ppt' && isShowSidbar ? 'color: #1f64ff;' : ''
          ">AI PPT</span>
      </el-menu-item>
      <!-- AI提示词 -->
      <el-submenu index="/question/index" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/question/index' ? 'submenu-items' : ''">
            <div class="menu-img">
              <img v-if="menuNumber != '/question/index'" class="asset_img"
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Frameasdfd.png"
                alt="" />
              <img v-else class="asset_img"
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Frame-1asd.png"
                alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" slot="title"
              :style="$route.path == '/question/index' ? 'color: #1f64ff;' : ''">AI提示词</span>
          </div>
        </template>
        <el-menu-item v-for="item in appletList" :key="item.tab_id" index="/question/index" :class="$route.path == '/question/index' &&
            (item.id
              ? applicationCenterId == item.id
              : applicationCenterId == item.tab_id)
            ? 'menu-items'
            : ''
          " @click="selectApplicationType(item)">
          <span :class="$route.path == '/question/index' &&
              (item.id
                ? applicationCenterId == item.id
                : applicationCenterId == item.tab_id)
              ? 'child-menu_name child-menu_name-on'
              : 'child-menu_name'
            " slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-submenu>
      <!-- 工作集 -->
      <el-submenu index="/workset/worksetNav" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/workset/worksetNav' ||
              $route.path == '/workset/textChat' ||
              $route.path == '/workset/voiceChat' ||
              $route.path == '/workset/documentChat'
              ? 'submenu-items'
              : ''
            ">
            <div class="menu-img">
              <img v-if="
                $route.path == '/workset/worksetNav' ||
                $route.path == '/workset/textChat' ||
                $route.path == '/workset/voiceChat' ||
                $route.path == '/workset/documentChat'
              " class="asset_img" :src="httpUrls.ossUrl +
                  'static/picture/a70a1ec8-f572-4cec-87ee-8473a55dc09c.png'
                  " alt="" />
              <img v-else class="asset_img" :src="httpUrls.ossUrl +
                'static/picture/bbbcafaa-1670-447d-9574-c70aed82dd49.png'
                " alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" slot="title" :style="$route.path == '/workset/worksetNav' ||
                $route.path == '/workset/textChat' ||
                $route.path == '/workset/voiceChat' ||
                $route.path == '/workset/documentChat'
                ? 'color: #1f64ff'
                : ''
              ">AI工具集</span>
          </div>
        </template>

        <el-menu-item :index="item.path == '/workset/textChat'
            ? item.path + '?title=通用文字识别'
            : item.path
          " @click="$store.dispatch('app/changeworksetLabel', item.label)" :class="item.path == '/workset/worksetNav'
              ? item.label == worksetLabel && $route.path == '/workset/worksetNav'
                ? 'menu-items'
                : ''
              : $route.path == item.path
                ? 'menu-items'
                : ''
            " v-for="(item, index) in worksetData" :key="index">
          <span class="child-menu_name" :style="item.path == '/workset/worksetNav'
              ? item.label == worksetLabel && $route.path == '/workset/worksetNav'
                ? 'color: #1f64ff'
                : ''
              : $route.path == item.path
                ? 'color: #1f64ff'
                : ''
            ">{{ item.label }}</span>
        </el-menu-item>
      </el-submenu>

      <!-- AI超级能力 -->
      <el-submenu index="/identify/identify" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/drawChat/fourDUltrasound' ||
              $route.path == '/identify/identify' ||
              $route.path == '/aiWord/index'
              ? 'submenu-items'
              : ''
            ">
            <div class="menu-img">
              <img v-if="
                $route.path != '/drawChat/fourDUltrasound' &&
                $route.path != '/identify/identify' &&
              $route.path != '/aiWord/index'
              " class="asset_img" src="../assets/images/sidebarIcon/application.png" alt="" />
              <img v-else class="asset_img" src="../assets/images/sidebarIcon/applicationYes.png" alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" slot="title" :style="$route.path == '/drawChat/fourDUltrasound' ||
                $route.path == '/identify/identify' ||
                $route.path == '/aiWord/index'
                ? 'color: #1f64ff'
                : ''
              ">AI超级能力</span>
          </div>
        </template>
        <el-menu-item index="/aiWord/index" :class="$route.path == '/aiWord/index' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/aiWord/index' ? 'color: #1f64ff' : ''">AI文档理解</span>
        </el-menu-item>
        <el-menu-item index="/convert/index" :class="$route.path == '/convert/index' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/convert/index' ? 'color: #1f64ff' : ''">音视频转写</span>
        </el-menu-item>
        <el-menu-item index="/identify/identify" :class="$route.path == '/identify/identify' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/identify/identify' ? 'color: #1f64ff' : ''">看图说话</span>
        </el-menu-item>
        <el-menu-item index="/drawChat/fourDUltrasound"
          :class="$route.path == '/drawChat/fourDUltrasound' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/drawChat/fourDUltrasound' ? 'color: #1f64ff' : ''">彩超宝宝</span>
        </el-menu-item>
        <el-menu-item index="/manyModelChat/chat" :class="$route.path == '/manyModelChat/chat' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/manyModelChat/chat' ? 'color: #1f64ff' : ''">多模型对话</span>
        </el-menu-item>

        <el-menu-item index="$route.path">
          <el-popover placement="right" width="180" trigger="hover">
            <div style="display: flex; justify-content: center">
              <div>
                <div style="text-align: center; background: #fff">
                  请前往小程序体验该功能
                </div>
                <img style="width: 180px" :src="httpUrls.ossUrl +
                  'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
                  " alt="" />
              </div>
            </div>
            <div slot="reference" class="toMember">
              <span slot="title" class="child-menu_name" style="display: inline-block; width: 180px">语音对讲</span>
            </div>
          </el-popover>
        </el-menu-item>

        <el-menu-item index="/digitizedHuman/produceIndex" :class="$route.path == '/digitizedHuman/produceIndex' ||
            $route.path == '/digitizedHuman/mineHuman' ||
            $route.path == '/digitizedHuman/mineVideo' ||
            $route.path == '/digitizedHuman/mineAudio' ||
            $route.path == '/digitizedHuman/humanOrder'
            ? 'menu-items'
            : ''
          ">
          <span class="child-menu_name" slot="title" :style="$route.path == '/digitizedHuman/produceIndex' ||
              $route.path == '/digitizedHuman/mineHuman' ||
              $route.path == '/digitizedHuman/mineVideo' ||
              $route.path == '/digitizedHuman/mineAudio' ||
              $route.path == '/digitizedHuman/humanOrder'
              ? 'color: #1f64ff'
              : ''
            ">虚拟数字人</span>
        </el-menu-item>
        <!-- /digitizedHuman/audioClone 之前声音克隆路径 -->
        <el-menu-item index="/audioCloneNew/index" :class="$route.path == '/audioCloneNew/index' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/audioCloneNew/index' ? 'color: #1f64ff' : ''">声音克隆</span>
        </el-menu-item>
      </el-submenu>
      <!-- AI语音合成 -->
      <el-menu-item index="/voice" :class="$route.path == '/voice' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/voice'" class="asset_img" :src="httpUrls.ossUrl + 'static/picture/242e51fc-396a-4f6c-97aa-896680d77bda.png'
            " alt="" style="width: 19px; height: 19px" />
          <img v-else class="asset_img" :src="httpUrls.ossUrl + 'static/picture/b0ab8ca8-658e-49b3-aa6f-6a26879ec108.png'
            " alt="" style="width: 19px; height: 19px" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title"
          :style="$route.path == '/voice' && isShowSidbar ? 'color: #1f64ff;' : ''">AI语音合成</span>
      </el-menu-item>
      <!-- <el-menu-item index="/templateSelect/templateSelect" :class="$route.path == '/templateSelect/templateSelect' ? 'menu-items' : ''">
        <img v-if="menuNumber != '/templateSelect/templateSelect'" class="asset_img" src="../assets/images/sidebarIcon/applyIcon.png" alt="">
        <img v-else class="asset_img" src="../assets/images/sidebarIcon/applyIconYes.png" alt="">
        <span class="menu_name" slot="title">助理中心</span>
      </el-menu-item> -->
      <!-- AI智能直播 -->
      <el-submenu index="/liveBroadcast/headPoem" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/liveBroadcast/chatWordArt' ||
              $route.path == '/liveBroadcast/headPoem'
              ? 'submenu-items'
              : ''
            ">
            <div class="menu-img">
              <img v-if="
                menuNumber != '/liveBroadcast/chatWordArt' &&
                menuNumber != '/liveBroadcast/headPoem'
              " class="asset_img" :src="httpUrls.ossUrl +
                  'static/picture/b5037c47-b922-46b4-98fb-808edea65117.png'
                  " alt="" style="height: 16px; width: 20px" />
              <img v-else class="asset_img" :src="httpUrls.ossUrl +
                'static/picture/4e800ce8-a97b-478c-a98f-ea59f82ff3a1.png'
                " style="height: 16px; width: 20px" alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" slot="title" :style="$route.path == '/liveBroadcast/chatWordArt' ||
                $route.path == '/liveBroadcast/headPoem'
                ? 'color: #1f64ff'
                : ''
              ">AI智能直播</span>
          </div>
        </template>

        <el-menu-item index="/liveBroadcast/headPoem"
          :class="$route.path == '/liveBroadcast/headPoem' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/liveBroadcast/headPoem' ? 'color: #1f64ff' : ''">藏头诗</span>
        </el-menu-item>
        <el-menu-item index="/liveBroadcast/headPoemArt"
          :class="$route.path == '/liveBroadcast/headPoemArt' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/liveBroadcast/headPoemArt' ? 'color: #1f64ff' : ''">专属头像藏头诗 V1</span>
        </el-menu-item>
        <el-menu-item index="/liveBroadcast/headPoemText"
          :class="$route.path == '/liveBroadcast/headPoemText' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/liveBroadcast/headPoemText' ? 'color: #1f64ff' : ''">专属头像藏头诗 V2</span>
        </el-menu-item>
        <el-menu-item index="/liveBroadcast/headPoemImg"
          :class="$route.path == '/liveBroadcast/headPoemImg' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/liveBroadcast/headPoemImg' ? 'color: #1f64ff' : ''">专属头像藏头诗 V3</span>
        </el-menu-item>
        <!-- <el-menu-item
          index="/liveBroadcast/headPoemLive"
          :class="
            $route.path == '/liveBroadcast/headPoemLive' ? 'menu-items' : ''
          "
          
        >
          <span
            class="child-menu_name"
            slot="title"
            :style="
              $route.path == '/liveBroadcast/headPoemLive'
                ? 'color: #1f64ff'
                : ''
            "
            >专属头像藏头诗 V4</span
          >
        </el-menu-item> -->
        <el-menu-item index="/liveBroadcast/chatWordArt"
          :class="$route.path == '/liveBroadcast/chatWordArt' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/liveBroadcast/chatWordArt' ? 'color: #1f64ff' : ''">艺术字姓氏头像</span>
        </el-menu-item>
        <el-menu-item index="/liveBroadcast/chatWordArtNew"
          :class="$route.path == '/liveBroadcast/chatWordArtNew' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="$route.path == '/liveBroadcast/chatWordArtNew' ? 'color: #1f64ff' : ''
            ">艺术字头像九宫格</span>
        </el-menu-item>
        <el-menu-item index="/liveBroadcast/chatWordArtNewTen"
          :class="$route.path == '/liveBroadcast/chatWordArtNewTen' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="$route.path == '/liveBroadcast/chatWordArtNewTen' ? 'color: #1f64ff' : ''
            ">艺术字头像十宫格</span>
        </el-menu-item>
      </el-submenu>
      <!-- AI直播数字人定制 -->
      <el-menu-item index="/digitizedHuman/index" :class="$route.path == '/digitizedHuman/index' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/digitizedHuman/index'" class="asset_img"
            src="../assets/images/sidebarIcon/digitizedHumanIcon.png" alt="" />
          <img v-else class="asset_img" src="../assets/images/sidebarIcon/digitizedHumanIconYes.png" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/digitizedHuman/index' && isShowSidbar
            ? 'color: #1f64ff;'
            : ''
          ">AI直播数字人</span>
      </el-menu-item>
      <!-- AI知识库 -->
      <el-submenu index="/knowledge/knowledgeRobot" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/knowledge/knowledgeRobot' ||
              $route.path == '/knowledge/knowledge'
              ? 'submenu-items'
              : ''
            ">
            <div class="menu-img">
              <img v-if="
                $route.path == '/knowledge/knowledgeRobot' ||
                $route.path == '/knowledge/knowledge'
              " class="asset_img" :src="httpUrls.ossUrl +
                  'static/picture/73ecede5-b17d-4a75-890c-a42bcc097bc7.png'
                  " alt="" />
              <img v-else class="asset_img" :src="httpUrls.ossUrl +
                'static/picture/d8773a7b-c6e5-4c19-8a81-d07e97c807ab.png'
                " alt="" />
            </div>
            <span class="menu_name" slot="title" :style="$route.path == '/knowledge/knowledgeRobot' ||
                $route.path == '/knowledge/knowledge'
                ? 'color: #1f64ff'
                : ''
              ">AI智能体</span>
          </div>
        </template>
        <el-menu-item index="/knowledge/knowledgeRobot"
          :class="$route.path == '/knowledge/knowledgeRobot' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/knowledge/knowledgeRobot' ? 'color: #1f64ff' : ''">我的智能体</span>
        </el-menu-item>
        <el-menu-item v-for="item in knowledgeData" :key="item" index="/knowledge/knowledge"
          @click="$store.dispatch('app/changeknowledgeLabel', item)" :class="$route.path == '/knowledge/knowledge' && knowledgeLabel == item
              ? 'menu-items'
              : ''
            ">
          <span class="child-menu_name" slot="title" :style="$route.path == '/knowledge/knowledge' && knowledgeLabel == item
              ? 'color: #1f64ff'
              : ''
            ">{{ item }}</span>
        </el-menu-item>
      </el-submenu>
      <!-- 企业AI知识库 -->
      <el-submenu index="/enterpriseWEB/indexList/enterpriseSet" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/enterpriseWEB/indexList/enterpriseSet' ||
              $route.path == '/enterpriseWEB/indexList/indexListView' ||
              $route.path == '/enterpriseWEB/indexList/digitalEmployees' ||
              $route.path == '/enterpriseWEB/knowledge/index' ||
              $route.path == '/enterpriseWEB/indexList/memberManagement'
              ? 'submenu-items'
              : ''
            ">
            <div class="menu-img">
              <img v-if="
                menuNumber != '/enterpriseWEB/indexList/enterpriseSet' &&
                menuNumber != '/enterpriseWEB/indexList/indexListView' &&
                menuNumber != '/enterpriseWEB/indexList/digitalEmployees' &&
                menuNumber != '/enterpriseWEB/knowledge/index' &&
                menuNumber != '/enterpriseWEB/indexList/memberManagement' &&
                menuNumber != '/enterpriseWEB/settings' &&
                menuNumber != '/enterpriseWEB/enterpriseMember'
              " class="asset_img" src="../assets/images/sidebarIcon/companyIcon.png" alt="" />

              <img v-else class="asset_img" src="../assets/images/sidebarIcon/companyIconYes.png" alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" slot="title" :style="$route.path == '/enterpriseWEB/indexList/enterpriseSet' ||
                $route.path == '/enterpriseWEB/indexList/indexListView' ||
                $route.path == '/enterpriseWEB/indexList/digitalEmployees' ||
                $route.path == '/enterpriseWEB/indexList/memberManagement' ||
                menuNumber == '/enterpriseWEB/knowledge/index' ||
                menuNumber == '/enterpriseWEB/settings' ||
                menuNumber == '/enterpriseWEB/enterpriseMember'
                ? 'color: #1f64ff'
                : ''
              ">企业AI知识库</span>
          </div>
        </template>
        <el-menu-item index="/enterpriseWEB/knowledge/chatIndex"
          :class="$route.path == '/enterpriseWEB/knowledge/chatIndex' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="$route.path == '/enterpriseWEB/knowledge/chatIndex' ? 'color: #1f64ff' : ''
            ">AI智能体</span>
        </el-menu-item>
        <el-menu-item index="/enterpriseWEB/knowledge/baseIndex"
          :class="$route.path == '/enterpriseWEB/knowledge/baseIndex' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="$route.path == '/enterpriseWEB/knowledge/baseIndex' ? 'color: #1f64ff' : ''
            ">知识库</span>
        </el-menu-item>
        <el-menu-item index="/enterpriseWEB/settings"
          :class="$route.path == '/enterpriseWEB/settings' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="$route.path == '/enterpriseWEB/settings' ? 'color: #1f64ff' : ''
            ">企业设置</span>
        </el-menu-item>

        <!-- <el-menu-item
          index="/enterpriseWEB/indexList/enterpriseSet"
          :class="
            $route.path == '/enterpriseWEB/indexList/enterpriseSet' ? 'menu-items' : ''
          "
        >
          <span
            class="child-menu_name"
            slot="title"
            :style="
              $route.path == '/enterpriseWEB/indexList/enterpriseSet'
                ? 'color: #1f64ff'
                : ''
            "
            >企业设置</span
          >
        </el-menu-item> -->
        <!-- <el-menu-item
          index="/enterpriseWEB/indexList/indexListView"
          :class="
            $route.path == '/enterpriseWEB/indexList/indexListView' ? 'menu-items' : ''
          "
        >
          <span
            class="child-menu_name"
            slot="title"
            :style="
              $route.path == '/enterpriseWEB/indexList/indexListView'
                ? 'color: #1f64ff'
                : ''
            "
            >知识库</span
          >
        </el-menu-item> -->
        <!-- <el-menu-item
          index="/enterpriseWEB/indexList/digitalEmployees"
          :class="
            $route.path == '/enterpriseWEB/indexList/digitalEmployees' ? 'menu-items' : ''
          "
        >
          <span
            class="child-menu_name"
            slot="title"
            :style="
              $route.path == '/enterpriseWEB/indexList/digitalEmployees'
                ? 'color: #1f64ff'
                : ''
            "
            >AI企业数字员工</span
          >
        </el-menu-item> -->
        <!-- <el-menu-item
          index="/enterpriseWEB/indexList/memberManagement"
          :class="
            $route.path == '/enterpriseWEB/indexList/memberManagement' ? 'menu-items' : ''
          "
        >
          <span
            class="child-menu_name"
            slot="title"
            :style="
              $route.path == '/enterpriseWEB/indexList/memberManagement'
                ? 'color: #1f64ff'
                : ''
            "
            >成员管理</span
          >
        </el-menu-item> -->
        <el-menu-item index="/enterpriseWEB/enterpriseMember"
          :class="$route.path == '/enterpriseWEB/enterpriseMember' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="$route.path == '/enterpriseWEB/enterpriseMember' ? 'color: #1f64ff' : ''
            ">成员管理</span>
        </el-menu-item>
      </el-submenu>
      <!-- AI数字孪生 -->
      <el-menu-item index="/templateSelect/templateSelectNew"
        :class="$route.path == '/templateSelect/templateSelectNew' ? 'menu-items' : ''">
        <div class="menu-img">
          <img style="width: 19px; height: 19px; margin-left: 2px"
            v-if="menuNumber != '/templateSelect/templateSelectNew'" class="asset_img" :src="httpUrls.ossUrl + 'static/picture/58c52370-8011-4b49-afd9-9a46ad6210c4.png'
              " alt="" />
          <img style="width: 19px; height: 19px; margin-left: 2px" v-else :src="httpUrls.ossUrl + 'static/picture/4cf5de6a-abe4-455a-a4cc-e1f3996d92d6.png'
            " class="asset_img" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/templateSelect/templateSelectNew' && isShowSidbar
            ? 'color: #1f64ff;'
            : ''
          ">AI数字孪生</span>
      </el-menu-item>
      <!-- 提示词大全 -->
      <el-submenu index="/templateSelect/templateSelect" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/templateSelect/templateSelect' ? 'submenu-items' : ''
            ">
            <div class="menu-img">
              <img v-if="menuNumber != '/templateSelect/templateSelect'" class="asset_img"
                src="../assets/images/sidebarIcon/applyIcon.png" alt="" />
              <img v-else class="asset_img" src="../assets/images/sidebarIcon/applyIconYes.png" alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" slot="title" :style="$route.path == '/templateSelect/templateSelect' ? 'color: #1f64ff;' : ''
              ">提示词大全</span>
          </div>
        </template>
        <el-menu-item index="/mineRole/mineRole" :class="$route.path == '/mineRole/mineRole' ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/mineRole/mineRole' ? 'color: #1f64ff' : ''">创作中心</span>
        </el-menu-item>
        <el-menu-item v-for="item in appletList" :key="item.tab_id" index="/templateSelect/templateSelect" :class="$route.path == '/templateSelect/templateSelect' &&
            (item.id
              ? applicationCenterId == item.id
              : applicationCenterId == item.tab_id)
            ? 'menu-items'
            : ''
          " @click="selectApplicationType(item)">
          <span :class="$route.path == '/templateSelect/templateSelect' &&
              (item.id
                ? applicationCenterId == item.id
                : applicationCenterId == item.tab_id)
              ? 'child-menu_name child-menu_name-on'
              : 'child-menu_name'
            " slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-submenu>

      <!-- <el-menu-item
        index="/capacity"
        :class="$route.path == '/capacity' ? 'menu-items' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          v-if="menuNumber != '/capacity'"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_9458_27380)">
            <circle
              cx="9.99935"
              cy="10.0013"
              r="8.33333"
              stroke="black"
              stroke-width="1.5"
            />
            <path 
              d="M11.732 11.5096L13.4078 7.48759C13.5436 7.16176 13.2381 6.82529 12.9007 6.9291L8.54352 8.26976C8.41163 8.31034 8.30839 8.41358 8.26781 8.54547L6.92714 12.9026C6.82333 13.24 7.15981 13.5456 7.48564 13.4098L11.5076 11.734C11.6091 11.6917 11.6897 11.611 11.732 11.5096Z"
              stroke="black"
              stroke-width="1.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_9458_27380">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_9458_27364)">
            <circle
              cx="9.99935"
              cy="10.0013"
              r="8.33333"
              stroke="#1F64FF"
              stroke-width="1.5"
            />
            <path
              d="M11.732 11.5096L13.4078 7.48759C13.5436 7.16176 13.2381 6.82529 12.9007 6.9291L8.54352 8.26976C8.41163 8.31034 8.30839 8.41358 8.26781 8.54547L6.92714 12.9026C6.82333 13.24 7.15981 13.5456 7.48564 13.4098L11.5076 11.734C11.6091 11.6917 11.6897 11.611 11.732 11.5096Z"
              stroke="#1F64FF"
              stroke-width="1.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_9458_27364">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span
          :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'"
          slot="title"
          :style="
            $route.path == '/capacity' && isShowSidbar ? 'color: #1f64ff;' : ''
          "
          >AI能力中心</span
        >
      </el-menu-item> -->

      <!-- 工作助理 -->
      <!-- <el-menu-item
      @click="selectApplicationType({id:'1',tab_id:'1006'})"
        index="/templateSelect/templateSelect"
        :class="$route.path == '/templateSelect/templateSelect' && applicationCenterId == '1006'? 'menu-items' : ''"
      >
        <img
          v-if="menuNumber != '/convert/index'"
          class="asset_img"
          src="../assets/images/sidebarIcon/videoIcon.png"
          alt=""
        />
        <img
          v-else
          class="asset_img"
          src="../assets/images/sidebarIcon/videoIconYes.png"
          alt=""
        />
        <span
          :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'"
          slot="title"
          :style="
          $route.path == '/templateSelect/templateSelect' && applicationCenterId == '1006' && isShowSidbar
              ? 'color: #1f64ff;'
              : ''
          "
          >工作助理</span
        >
      </el-menu-item> -->

      <!-- <el-menu-item
        index="/convert/index"
        :class="$route.path == '/convert/index' ? 'menu-items' : ''"
      >
        <img
          v-if="menuNumber != '/convert/index'"
          class="asset_img"
          src="../assets/images/sidebarIcon/videoIcon.png" 
          alt=""
        />
        <img
          v-else
          class="asset_img"
          src="../assets/images/sidebarIcon/videoIconYes.png"
          alt=""
        />
        <span
          :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'"
          slot="title"
          :style="
            $route.path == '/convert/index' && isShowSidbar
              ? 'color: #1f64ff;'
              : ''
          "
          >音视频转写</span
        >
      </el-menu-item> -->

      <!-- <el-menu-item index="/enterpriseWEB/index" :class="$route.path == '/enterpriseWEB/index' ? 'menu-items' : ''">
        <img v-if="menuNumber != '/enterpriseWEB/index'" class="asset_img" src="../assets/images/sidebarIcon/companyIcon.png" alt="">
        <img v-else class="asset_img" src="../assets/images/sidebarIcon/companyIconYes.png" alt="">
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/enterpriseWEB/index' && isShowSidbar ? 'color: #1f64ff;' : ''">企业AI定制</span>
      </el-menu-item> -->

      <!-- 资讯 -->
      <el-submenu index="/information/information" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/information/information' ? 'submenu-items' : ''">
            <div class="menu-img">
              <img v-if="menuNumber != '/information/information'" style="width: 18px; height: 18px" class="asset_img"
                :src="httpUrls.ossUrl +
                  'static/picture/1648bb27-64d3-4886-83fd-f737ad8c4317.png'
                  " alt="" />

              <img v-else class="asset_img" :src="httpUrls.ossUrl +
                'static/picture/97e893e8-4838-4525-8391-fadc6d399941.png'
                " style="width: 18px; height: 18px" alt="" />
            </div>
            <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/information/information' && isShowSidbar
                ? 'color: #1f64ff;'
                : ''
              ">AI资讯</span>
          </div>
        </template>
        <el-menu-item v-for="item in ificationData" :key="item.value"
          :index="`/information/information?ification=${item.value}`" @click="
            $store.dispatch('app/changeSelectIfication', item.value), changeAIType(1)
            " :class="selectIfication == item.value ? 'menu-items' : ''">
          <span class="child-menu_name" slot="title" :style="selectIfication == item.value ? 'color: #1f64ff;' : ''">{{
            item.label }}</span>
        </el-menu-item>
      </el-submenu>
      <!-- 购买算力 -->
      <el-menu-item index="/shoppingMall" @click="changeAIType(4)"
        :class="$route.path == '/shoppingMall' ? 'menu-items' : ''">
        <div class="menu-img">
          <img style="width: 17px" v-if="menuNumber != '/shoppingMall'" class="asset_img" :src="httpUrls.ossUrl + 'static/picture/50750bdb-47af-4ef1-935e-d5a4e1f6a4ed.png'
            " alt="" />
          <img style="width: 17px" v-else class="asset_img" :src="httpUrls.ossUrl + 'static/picture/2c35e37b-8e59-4db4-8895-c36696939240.png'
            " alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/shoppingMall' && isShowSidbar ? 'color: #1f64ff;' : ''
          ">AI商城</span>
      </el-menu-item>
      <!-- AI实验室 -->
      <el-submenu index="/chataboratory" class="menuitem_hasson">
        <template slot="title">
          <div :class="$route.path == '/chataboratory' ? 'submenu-items' : ''">
            <div class="menu-img">
              <img v-if="
                menuNumber == '/chataboratory/laboratoryDrawChat' ||
                menuNumber == '/chataboratory/laboratoryChat'
              " class="asset_img" style="width: 18px; height: 18px" :src="httpUrls.ossUrl +
                  'static/picture/cfad9599-f1a5-470b-9a5d-557158781c87.png'
                  " alt="" />
              <img v-else class="asset_img" style="width: 18px; height: 18px" :src="httpUrls.ossUrl +
                'static/picture/b750d511-88c8-45cf-bd58-c11169e03f1e.png'
                " alt="" />
            </div>
            <span v-if="isShowSidbar" class="menu_name" :class="ChataboratoryLabel.title ? 'child-menu_name-on' : ''"
              slot="title" :style="$route.path == '/chataboratory' ? 'color: #1f64ff;' : ''">AI实验室</span>
          </div>
        </template>

        <el-menu-item :index="`${item.path == '/chataboratory/laboratoryChat'
            ? item.path + '?value=0'
            : item.path
          }`" :class="$route.path == item.path ? 'menu-items' : ''" v-for="item in chataboratory" :key="item.title">
          <span class="child-menu_name" :style="$route.path == item.path ? 'color: #1f64ff' : ''">{{ item.title
            }}</span>
        </el-menu-item>

        <!-- <el-menu-item index="/liveBroadcast/chatWordArt"
          :class="$route.path == '/liveBroadcast/chatWordArt' ? 'menu-items' : ''" style="margin: 0;">
          <span class="child-menu_name" slot="title"
            :style="$route.path == '/liveBroadcast/chatWordArt' ? 'color: #1f64ff' : ''">艺术字姓氏头像</span>
        </el-menu-item> -->
      </el-submenu>
      <!-- 帮助中心 -->
      <el-menu-item index="/instruction/instruction"
        :class="$route.path == '/instruction/instruction' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/instruction/instruction'" class="asset_img" :src="httpUrls.ossUrl + 'static/picture/8d806bbb-a6f2-48bc-8494-7a4391b3e120.png'
            " alt="" />
          <img v-else class="asset_img" :src="httpUrls.ossUrl + 'static/picture/b1660b37-5e27-49d3-9e00-5accf899b6c7.png'
            " alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/instruction/instruction' && isShowSidbar
            ? 'color: #1f64ff;'
            : ''
          ">帮助中心</span>
      </el-menu-item>
      <!-- 商务合作 -->
      <el-menu-item index="/collaborate/collaborateNew" @click="changeAIType(4)"
        :class="$route.path == '/collaborate/collaborateNew' ? 'menu-items' : ''">
        <div class="menu-img">
          <img v-if="menuNumber != '/collaborate/collaborateNew'" class="asset_img"
            src="../assets/images/sidebarIcon/businessIcon.png" alt="" />
          <img v-else class="asset_img" src="../assets/images/sidebarIcon/businessIconYes.png" alt="" />
        </div>
        <span :class="isShowSidbar ? 'menu_name' : 'menu_name menu_name-on'" slot="title" :style="$route.path == '/collaborate/collaborateNew' && isShowSidbar
            ? 'color: #1f64ff;'
            : ''
          ">商务合作</span>
      </el-menu-item>
    </el-menu>
    <div class="codes" :style="isShowSidbar ? 'padding-left: 15px' : ''">
      <div class="left_sidbar_navigation" @click="(isShowSidbar = !isShowSidbar), $emit('isshowsidbar', isShowSidbar)">
        <i style="font-size: 24px; cursor: pointer" v-if="isShowSidbar" class="el-icon-s-fold"></i>
        <i style="font-size: 24px; cursor: pointer" v-else class="el-icon-s-unfold"></i>
        <span v-if="isShowSidbar" style="margin-left: 10px; white-space: nowrap">收起导航</span>
      </div>
    </div>
    <Register ref="Register"></Register>

    <Customer ref="Customer"></Customer>
  </div>
</template>
<script>
import { chatList, ChatDelete, guessLogin, userCompanyList } from "../api/chatMG";
import { applitetab } from "../api/prompts";
import httpUrls from "../api/requestURL";
import Register from "../components/register";
import Customer from "../components/customer";

import { mapGetters } from "vuex";

export default {
  name: "leftnav",
  data() {
    return {
      httpUrls,
      collapsed: false,
      worksetData: [
        //工作集
        {
          label: "对话模型",
          path: "/workset/worksetNav",
        },
        {
          label: "绘画模型",
          path: "/workset/worksetNav",
        },
        {
          label: "图片处理",
          path: "/workset/worksetNav",
        },
        {
          label: "视频处理",
          path: "/workset/worksetNav",
        },
        {
          label: "文字识别",
          path: "/workset/textChat",
        },
        {
          label: "语音合成",
          path: "/workset/voiceChat",
        },
        {
          label: "文档对话",
          path: "/workset/documentChat",
        },
      ],
      ificationData: [
        { value: "fun", label: "趣闻轶事", path: "/information/information" },
        {
          value: "free_resources",
          label: "免费资源",
          path: "/information/information",
        },
        {
          value: "applications",
          label: "垂直应用",
          path: "/information/information",
        },
        {
          value: "hashrates_share",
          label: "算力分享",
          path: "/information/information",
        },
        { value: "llm", label: "大模型", path: "/information/information" },
        { value: "drawing", label: "AI绘画", path: "/information/information" },
        {
          value: "meta_universe",
          label: "元宇宙",
          path: "/information/information",
        },
        { value: "AIGC", label: "AIGC", path: "/information/information" },
        { value: "AGI", label: "AGI", path: "/information/information" },
      ], //资讯分类数组
      allmenu: [],
      current: -1, //不默认选中会话列表
      searchValue: "",
      chatList: [],
      pageTotal: 0,
      page_size: 5,
      page: 1,
      pageCount: 0,
      loginInfo: "",
      username: "游客ID",
      chat_type: 0,
      menuNumber: "/index",
      isShowSidbar: true,
      appletList: [],
      chataboratory: [
        {
          title: "绘画",
          path: "/chataboratory/laboratoryDrawChat",
          arr: [
            {
              label: "Stable Diffusion",
              value: 9,
            },
            {
              label: "Midjourney",
              value: 6,
            },
            {
              label: "DALL.E-3",
              value: 15,
            },
          ],
        },
        {
          title: "对话",
          path: "/chataboratory/laboratoryChat",
          arr: [
            {
              label: "AI35",
              value: 0,
            },
            {
              label: "AI40",
              value: 1,
            },
            {
              label: "Claude",
              value: 7,
            },
          ],
        },
      ], //AI实验室菜单栏数据
      ChataboratoryLabel: {
        title: "",
        label: "",
      },
      itemEnterprise: {},
      enterpriseList: [],
      knowledgeData: ["图片库", "文档库", "网址库"],
    };
  },
  // 注册组件
  components: {
    Register,
    Customer,
  },
  computed: {
    ...mapGetters([
      "contactService",
      "applicationCenterId",
      "enterpriseId",
      "userInfoData",
      "enterpriseIcon",
      "selectIfication",
      "worksetLabel",
      "knowledgeLabel",
    ]),
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.menuNumber = this.$route.path;
        // if (this.$route.path != "/information/information" && this.selectIfication) {
        //   this.$store.dispatch("app/changeSelectIfication", null);
        // }
        // if( this.$route.path != '/workset/worksetNav' ||
        // this.$route.path != '/workset/textChat' ||
        // this.$route.path != '/workset/voiceChat' ||
        // this.$route.path != '/workset/documentChat'){
        //   // console.log(this.$route.path)
        //   // this.$store.dispatch('app/changeworksetLabel', "")
        // }
      },
    },

    enterpriseId: {
      deep: true,
      handler() {
        this.userCompanyList();
        // this.enterpriseList.forEach(v => {
        //   if (v.company_code == this.enterpriseId) {
        //     this.itemEnterprise = v
        //   }
        // })
      },
    },

    enterpriseIcon: {
      deep: true,
      handler() {
        this.userCompanyList();
        // let code = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
        // this.enterpriseList.forEach(v => {
        //   if (v.company_code == code) {
        //     v.icon_url = this.enterpriseIcon
        //   }
        // })
      },
    },

    userInfoData: {
      deep: true,
      handler() {
        this.userCompanyList();
      },
    },
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 应用助理的tab栏
    applitetab().then((res) => {
      console.log(res, "助理中心tab");
      let arr = [3, 2, 5, 1];
      res.data.forEach((v, i) => {
        if (v.name == "工作助理") {
          v.id = 1;
        } else if (v.name == "实用工具") {
          v.id = 2;
        } else if (v.name == "名人互动") {
          v.id = 3;
        } else if (v.name == "休闲娱乐") {
          v.id = 5;
        }
      });
      res.data.sort((a, b) => {
        return a.weight - b.weight;
      });
      res.data.forEach((v) => {
        if (v.name != "私享定制") {
          this.appletList.push(v);
        }
      });
    });

    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.loginInfo != null) {
      this.username = this.loginInfo.nick_name;
    } else {
      this.loginInfo = { role: "" };
      //  this.guessLogin(); // 游客登录
    }

    this.$root.Bus.$on("loginInfo", (value) => {
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.loginInfo != null) {
        this.username = this.loginInfo.nick_name;
      } else {
        this.loginInfo = { role: "" };
        //  this.guessLogin(); // 游客登录
      }
    });

    this.userCompanyList();
  },

  mounted() {
    let isExpire = localStorage.getItem("isExpire");
    if (isExpire == 1) {
      //判断token是否已过期
      // this.guessLogin();
    }
    this.menuNumber = this.$route.path;

    // let enterpriseId = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
    // if (enterpriseId != undefined) {
    //   this.enterpriseList.forEach(v => {
    //     if (v.id == enterpriseId) {
    //       this.itemEnterprise = v
    //     }
    //   })
    // }
  },
  methods: {
    selectMenu(index) {
      if (
        index != "/chataboratory/laboratoryDrawChat" &&
        index != "/chataboratory/laboratoryChat"
      ) {
        this.ChataboratoryLabel.title = "";
        this.ChataboratoryLabel.label = "";
      }
    },
    selectChataboratory(title, type) {
      this.ChataboratoryLabel.title = title;
      this.ChataboratoryLabel.label = type;
    },
    selectApplicationType(type) {
      this.$store.dispatch(
        "app/changeApplicationCenterId",
        type.id ? type.id : type.tab_id
      );
      sessionStorage.setItem("applicationId", type.id ? type.id : type.tab_id);
      sessionStorage.setItem("applicationType", type.id ? type.id : type.tab_id);
    },
    toIndexPage() {
      if (this.$route.path != "/index") {
        this.$router.push("/index");
      }
    },
    // 游客登录
    guessLogin() {
      let val = { time: new Date().getTime() };
      guessLogin(val)
        .then((res) => {
          if (res.code == 20000) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            if (res.data.user_id) {
              this.$store.dispatch("user/changeInfo", res.data.user_id);
            }
            this.loginInfo = JSON.parse(JSON.stringify(res.data));
            this.username = this.loginInfo.nick_name;
            let isExpire = localStorage.getItem("isExpire");

            if (isExpire == 1) {
              this.$message({
                type: "error",
                message: "登录信息已过期，请重新登录！",
                customClass: "messageIndex",
              });
              this.$refs.Register.registerVisible = true;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("登录失败");
        });
    },

    // 切换对话
    changeIndex(code, index) {
      this.current = index;
      this.$root.Bus.$emit("selectChat", code);
    },

    // 获取对话列表
    getChatList(title) {
      let val = {
        chat_type: this.chat_type,
        title: title,
        page_size: this.page_size,
        page: this.page,
      };
      chatList(val)
        .then((res) => {
          if (res.code == 20000) {
            this.chatList = res.data.data;
            this.pageTotal = res.data.total;
            this.current = -1;
            if (this.pageTotal % this.page_size == 0) {
              this.pageCount = this.pageTotal / this.page_size;
            } else {
              this.pageCount = parseInt(this.pageTotal / this.page_size) + 1;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    // 获取更多会话信息
    getMoreList(title) {
      if (this.page < this.pageCount) {
        this.page++;
        let val = {
          chat_type: this.chat_type,
          title: title,
          page_size: this.page_size,
          page: this.page,
        };
        chatList(val)
          .then((res) => {
            if (res.code == 20000) {
              this.chatList = this.chatList.concat(res.data.data);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("获取失败！");
          });
      }
    },
    // 搜索对话
    searchList() {
      this.page_size = 5;
      this.page = 1;
      let val = {
        chat_type: this.chat_type,
        title: this.searchValue,
        page_size: this.page_size,
        page: this.page,
      };
      chatList(val)
        .then((res) => {
          if (res.code == 20000) {
            this.chatList = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    // 删除对话
    delChat(code) {
      ChatDelete(code)
        .then((res) => {
          if (res.code == 20000) {
            this.page = 1;
            this.getChatList("");
            this.current = -1;
            this.$root.Bus.$emit("delChat", 1); //删除对话框内容
            this.$message.success("删除成功！");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("删除失败！");
        });
    },
    // 打开注册框
    goMember() {
      this.$refs.Register.registerVisible = true;
    },

    // 打开客服弹窗
    goCustomer() {
      this.$refs.Customer.customergVisible = true;
    },

    changeAIType(num) {
      switch (num) {
        case 1:
          localStorage.setItem("session_code", "");
          this.$root.Bus.$emit("chatType", 0);
          break;
        case 2:
          localStorage.setItem("session_code", "");
          this.$root.Bus.$emit("chatType", 2);
          break;
        // case 3:
        //   break;
        // case 4:
        //   break;
        // case 5:
        //   break;
        // case 6:
        //   this.goCustomer()
        //   break;
        // case 7:
        //   break;
        default:
          localStorage.setItem("session_code", "");
          this.$root.Bus.$emit("chatType", 0);
          break;
      }
    },

    // 切换企业
    switchEnterprise(type) {
      this.$store.dispatch("user/changeEnterpriseId", type.company_code);
      this.itemEnterprise = type;
      localStorage.setItem("ENTERPRRISE_CODE_SWITCH", type.company_code);
      localStorage.setItem("ENTERPRRISE_NAME_SWITCH", type.company_name);
      localStorage.setItem("ENTERPRRISE_ICON_SWITCH", type.icon_url);
      localStorage.setItem("ENTERPRRISE_DESC_SWITCH", type.company_desc);
      if (type == "-1") {
        localStorage.removeItem("ENTERPRRISE_CODE_SWITCH");
        localStorage.removeItem("ENTERPRRISE_NAME_SWITCH");
        localStorage.removeItem("ENTERPRRISE_ICON_SWITCH");
        localStorage.removeItem("ENTERPRRISE_DESC_SWITCH");
      }
    },

    // 获取企业列表
    userCompanyList() {
      // userCompanyList().then((res) => {
      //   let companyId = localStorage.getItem("ENTERPRRISE_CODE_SWITCH");
      //   this.enterpriseList = res.data || [];
      //   this.enterpriseList.unshift({
      //     str: "个",
      //     company_name: "个人",
      //     company_code: "-1",
      //     icon_url: "",
      //   });
      //   if (res.data == null) {
      //     localStorage.removeItem("ENTERPRRISE_CODE_SWITCH");
      //     localStorage.removeItem("ENTERPRRISE_NAME_SWITCH");
      //     localStorage.removeItem("ENTERPRRISE_ICON_SWITCH");
      //     localStorage.removeItem("ENTERPRRISE_DESC_SWITCH");
      //     this.itemEnterprise = {
      //       str: "个",
      //       company_name: "个人",
      //       company_code: "-1",
      //       icon_url: "",
      //     };
      //     return;
      //   }
      //   if (companyId == undefined) {
      //     this.itemEnterprise = {
      //       str: "个",
      //       company_name: "个人",
      //       company_code: "-1",
      //       icon_url: "",
      //     };
      //   } else {
      //     this.enterpriseList.forEach((v) => {
      //       v.str = v.company_name.slice(0, 1);
      //       if (companyId != undefined && v.company_code == companyId) {
      //         this.itemEnterprise = v;
      //       }
      //     });
      //   }
      // });
    },
  },
};
</script>
<style scoped lang="scss">
.menu-img {
  width: 32px;
  display: flex;
  align-items: center;
}

.popover_mask:hover {
  background: #f6f7fa;
}

::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-thumb {
  background-color: #f2f2f2;
}

.popover_mask {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;

  .img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
  }

  .icons {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #1f64ff;
    color: #fff;
    line-height: 40px;
    text-align: center;
  }

  .name_title {
    max-width: calc(100% - 50px);

    .name {
      color: #000;
      font-size: 12px;
      font-weight: 400;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .title {
      color: #1f64ff;
      font-size: 12px;
      font-weight: 400;
      border-radius: 4px;
      background: #ccdcff;
      margin-top: 4px;
      padding: 2px 4px;
    }
  }
}

.popover_list {
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
  // padding: 10px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    padding: 10px;
    cursor: pointer;
  }

  .item:hover {
    background: #f6f7fa;
  }

  .img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
  }

  .icons {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #1f64ff;
    color: #fff;
    line-height: 40px;
    text-align: center;
  }

  .name-or-title {
    max-width: calc(100% - 50px);

    .name {
      color: #000;
      font-size: 12px;
      font-weight: 400;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .title {
      color: #1f64ff;
      font-size: 12px;
      font-weight: 400;
      border-radius: 4px;
      background: #ccdcff;
      margin-top: 4px;
      padding: 2px 4px;
    }
  }
}

.add_companuy {
  border-top: 1px solid #efebeb;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1f64ff;
  cursor: pointer;
}

.sidbar_mask {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}

.left_sidbar_navigation {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.search {
  width: 100%;
  height: 30px;
  background: #e7eaf5;
  border-radius: 100px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search .el-input__inner {
  background: #e7eaf5;
  border-radius: 100px;
  border: none;
  height: 28px;
  font-size: 14px;
  padding-left: 10px;
  flex: 1;
}

.search_img {
  width: 15px;
  height: 15px;
  padding: 0 10px;
}
</style>

<style>
.popovers {
  padding: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
  overflow-y: auto;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}

.el-menu-vertical-demo {
  height: 100%;
  padding-top: 20px;
}

.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 10px !important;
  margin: 0 10px;
  border-radius: 4px;
  display: flex !important;
  align-items: center !important;
}

.el-menu-item-group__title {
  padding: 0px;
}

.el-menu-bg {
  background-color: #1f2d3d !important;
}

.el-menu {
  border: none;
  overflow-x: hidden;
}

.menu_cont {
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
}

.logobox {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.logovip {
  display: flex;
  align-items: center;
  margin-top: 8px;
  /* margin-left: 37px; */
}

.logoimg {
  width: 58px;
  height: 58px;
  border-radius: 50%;
}

.logoname {
  font-size: 16px;
  color: #000;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.asset_img {
  width: 22px;
  height: 22px;
  /* padding-left: 20px; */
}

.vipimg {
  margin-left: 5px;
  width: 52px;
  height: 18px;
}

.menu_list {
  margin-top: 20px;
  padding: 0 20px;
}

.menu_name {
  /* font-family: 'Roboto'; */
  font-size: 14px;
  line-height: 22px;
  /* margin-left: 10px;*/
  color: #333333;
}

.menu_name-on {
  color: #ffffff;
}

.chat_count {
  /* width: 100%; */
  /* height: 240px; */
  flex: 1;
  padding: 20px 10px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1); */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  /* display: flex; */
  /* justify-content: center; */
  /* flex-direction: column; */
  /* overflow: auto; */
}

.add_chat {
  /* width: 200px; */
  height: 35px;
  border: 1px dashed #222222;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.add_text {
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
}

.add_img {
  width: 14px;
  height: 14px;
  margin-left: 20px;
}

.more {
  text-align: right;
}

.more_text {
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #999;
  cursor: pointer;
}

.chat_img {
  width: 30px;
  height: 30px;
}

.chat_text {
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1f64ff;
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.centerbox {
  padding: 10px 20px 20px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.centername {
  /* font-family: 'Roboto'; */
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  color: #fff;
  padding: 10px 45px;
  text-align: center;
  background: #1f64ff;
  box-shadow: 1px 4px 10px rgba(31, 100, 255, 0.25);
  border-radius: 10px;
  cursor: pointer;
}

.codes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1); */
  padding: 10px 15px 10px 15px;
  background-color: #ffffff;
}

.codebox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  /* padding: 10px 20px; */
}

.codeimg {
  width: 130px;
  height: 130px;
}

.codename {
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000;
  margin: 10px 0 10px 0;
  white-space: nowrap;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.logo {
  /* margin: 12px auto; */
  display: flex;
  justify-content: center;
}

.logo-img {
  width: 40px;
  height: 40px;
  /* margin: auto; */
  /* display: block; */
  cursor: pointer;
  margin-right: 10px;
}

.logo-title {
  line-height: 40px;
  font-weight: 600;
  color: #333;
  font-size: 24px;
  cursor: pointer;
}

.logo-mark {
  margin: auto;
  display: flex;
}

.menu-item {
  background-color: #cddcff !important;
  display: flex;
  align-items: center;
}

.menu-item>span {
  color: #1f64ff !important;
}

.menu-items {
  background: rgba(31, 100, 255, 0.1) !important;
}

.child-menu_name {
  width: calc(100% - 36px);
  color: #333333;
  margin-left: 36px;
}

.child-menu_name-on {
  color: #1f64ff;
}

.messageIndex {
  /* 设置的值一定要比2007大，因为dialog的层级是2007 */
  z-index: 9999 !important;
}

.level_img {
  width: 52px;
  height: 18px;
  margin-left: 5px;
  margin-top: 3px;
}

.menu_list .el-tooltip {
  padding: 0 !important;
  left: 50% !important;
  transform: translateX(-50%);
  display: flex !important;
  align-items: center !important;
}

.menuitem_hasson {
  margin: 0 10px;
}

.menuitem_hasson .el-submenu__title {
  padding: 0 10px !important;
  height: 40px;
  border-radius: 4px;
  line-height: 40px;
}

.menuitem_hasson .el-submenu__title>div:first-child {
  height: 100%;
  display: flex;
  align-items: center;
}

.sidbar_mask .el-tooltip {
  padding: 0 10px !important;
  display: flex !important;
  align-items: center !important;
  /* margin: 0 10px !important; */
  /* width: calc(100% - 20px) !important; */
}

.submenu-items {
  color: #1f64ff;
}
</style>
