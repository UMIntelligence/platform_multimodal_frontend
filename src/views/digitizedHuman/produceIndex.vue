<template>
  <!-- 
    页面布局
   -->
  <div class="produce-index">
    <!-- <main-title></main-title> -->
    <!-- <div class="top-navigation">
      <div class="logo-it">
        <img src="../../assets/images/wuyoumichu_logo.png" alt="" class="logo">
        <span>无忧秘书AI</span>
      </div>
      <div class="help-or-login">
        <span v-if="userInfo.role != 'guess'"> {{ userInfo.user_name }}</span>
        <el-button v-else class="login-btn" @click="$refs.Register.registerVisible = true">登录/注册</el-button>
      </div>
    </div> -->

    <div class="human-main">
      <div class="human-sidebar">
        <div class="back" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
          返回上级
        </div>

        <div class="sidebar-list">
          <div v-for="(item, i) in sidebarItem" :key="i" :class="$route.path == item.router ? 'item item-on' : 'item'" @click="selectSidebarItem(i)">{{ item.name }}</div>
          <!-- <div class="item">创作首页</div>
          <div class="item">我的数字人</div>
          <div class="item">我的视频</div>
          <div class="item">我的声音</div>
          <div class="item">订单记录</div> -->
        </div>
      </div>

      <div style="background-color: #fff;margin-left: 20px;width: calc(100% - 274px);height: 100%;">
        <router-view></router-view>
      </div>
    </div>

    <register ref="Register"></register>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Register from '../../components/register'
import mainTitle from '../../components/mainTitle'
export default {
  name: 'produce-index',
  data() {
    return {
      userInfo: '',
      selectSidebar: 0,
      sidebarItem: [
        {name: '创作首页', router: '/digitizedHuman/produceIndex'},
        {name: '我的数字人', router: '/digitizedHuman/mineHuman'},
        {name: '我的视频', router: '/digitizedHuman/mineVideo'},
        {name: '我的声音', router: '/digitizedHuman/mineAudio'},
        {name: '订单记录', router: '/digitizedHuman/humanOrder'}
      ]
    }
  },

  computed: {
    ...mapGetters([
      'userInfoData',
    ])
  },

  components: {
    Register,
    mainTitle
  },

  watch: {
    userInfoData: {
      deep: true,
      handler() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
    }
  },

  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },

  methods: {
    selectSidebarItem(item) {
      this.selectSidebar = item
      switch (item) {
        case 0:
          this.$router.push('/digitizedHuman/produceIndex')
          break;
        case 1:
          this.$router.push('/digitizedHuman/mineHuman')
          break;
        case 2:
          this.$router.push('/digitizedHuman/mineVideo')
          break;
        case 3:
          this.$router.push('/digitizedHuman/mineAudio')
          break;
        case 4:
          this.$router.push('/digitizedHuman/humanOrder')
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.produce-index {
  height: 100%;
}

.top-navigation {
  display: flex;
  justify-content: space-between;
  padding: 13px 30px;

  .logo-it {
    color: #333;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin-right: 6px;
    }
  }
}

.help-or-login {
  display: flex;
  align-items: center;

  .help-file {
    margin-right: 40px;
    display: flex;
    align-items: center;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
    span{
      margin-left: 8px;
    }
  }

  .login-btn {
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    padding: 9px 20px;
    border-radius: 8px;
    background: #1F64FF;
    box-shadow: 2px 2px 10px 0px rgba(31, 100, 255, 0.20);
  }
}

.human-main {
  background: #F1F2F5;
  padding: 20px;
  height: calc(100% - 20px);
  display: flex;
}

.human-sidebar {
  height: calc(100% - 40px);
  background-color: #FFF;
  padding: 20px;
  width: 214px;

  .back {
    color: #666;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%; /* 21px */
    margin-bottom: 16px;
    cursor: pointer;
  }

  .sidebar-list {
    .item {
      padding: 10px;
      color: #000;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%; /* 21px */
      border-radius: 4px;
      cursor: pointer;
    }

    .item-on {
      color: #1F64FF;
      background: rgba(31, 100, 255, 0.10);
    }
  }
}
</style>