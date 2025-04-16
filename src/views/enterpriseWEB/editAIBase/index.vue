<template>
  <div class="ai-detail-index">
    <!-- 当前账号类型为个人 -->
    <!-- <div class="no_switch-enterprise" v-if="Number(enterpriseId) == -1">
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
        <path d="M41.16 15.4398L7.27996 71.9998C6.58143 73.2095 6.21183 74.581 6.20792 75.9779C6.20401 77.3748 6.56592 78.7484 7.25767 79.9619C7.94941 81.1755 8.94686 82.1868 10.1508 82.8952C11.3547 83.6037 12.7232 83.9845 14.12 83.9998H81.88C83.2768 83.9845 84.6452 83.6037 85.8491 82.8952C87.0531 82.1868 88.0505 81.1755 88.7423 79.9619C89.434 78.7484 89.7959 77.3748 89.792 75.9779C89.7881 74.581 89.4185 73.2095 88.72 71.9998L54.84 15.4398C54.1269 14.2643 53.1228 13.2923 51.9247 12.6178C50.7266 11.9432 49.3749 11.5889 48 11.5889C46.625 11.5889 45.2733 11.9432 44.0752 12.6178C42.8771 13.2923 41.873 14.2643 41.16 15.4398Z" fill="#FFA215"/>
        <path d="M48 36V52" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M48 68H48.04" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="tit">AI企业定制 仅团队/企业成员可使用</div>
      <div class="identity">当前身份：个人</div>
      <div class="btn_list">
        <el-button class="btn_default" @click="dialogVisibleSwitch = true">切换团队/企业</el-button>
        <el-button class="btn_main" @click="$router.push('/enterpriseWEB/detail')">新增团队/企业</el-button>
      </div>
    </div> -->

    <!-- 当前账号类型为企业 -->
    <!-- <div class="detail_left" v-if="Number(enterpriseId) != -1">
      <div v-for="(item, i) in list" :key="i" :class="type == i ? 'item item-on' : 'item'" @click="toPage(i)">{{ item }}</div>
    </div> -->

    <div class="detail_right">
      <router-view></router-view>
    </div>

    <el-dialog
      title="选择团队/企业"
      :visible.sync="dialogVisibleSwitch"
      class="switch-company"
      width="450px">
      <div class="popover_list">
        <div class="item" v-for="item in enterpriseList" @click="switchEnterprise(item)">
          <div style="display: flex;width: calc(100% - 30px);">
            <div class="icons" v-if="item.icon_url == ''">{{ item.str }}</div>
            <img v-else :src="httpUrls.ossUrl + item.icon_url" alt="" class="img">
            <div class="name-or-title">
              <div class="name">{{ item.company_name }}</div>
              <div class="title" v-if="item.company_code == -1">个人</div>
              <div class="title" v-else>团队/企业</div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.3086 11.8127H2.69141C2.25977 11.8127 1.91016 12.1623 1.91016 12.5939C1.91016 12.758 1.96094 12.9103 2.04688 13.0353C2.08398 13.1232 2.14062 13.2053 2.21094 13.2775L5.6543 16.7189C5.80664 16.8713 6.00586 16.9475 6.20703 16.9475C6.4082 16.9475 6.60742 16.8713 6.75977 16.7189C7.06445 16.4143 7.06445 15.9201 6.75977 15.6135L4.51758 13.3752H17.3066C17.7383 13.3752 18.0879 13.0256 18.0879 12.5939C18.0879 12.1623 17.7402 11.8127 17.3086 11.8127ZM2.69141 8.18769H17.3086C17.7402 8.18769 18.0898 7.83808 18.0898 7.40644C18.0898 7.24238 18.0391 7.09003 17.9531 6.96503C17.9258 6.90058 17.8867 6.83808 17.8398 6.77949L15.0234 3.33808C14.75 3.0041 14.2578 2.95527 13.9238 3.22871C13.5898 3.50214 13.541 3.99433 13.8145 4.32832L15.6953 6.62519H2.69141C2.25977 6.62519 1.91016 6.9748 1.91016 7.40644C1.91016 7.83808 2.25977 8.18769 2.69141 8.18769Z" fill="#333333"/>
          </svg>
        </div>
      </div>
      <div class="add_companuy" @click="$router.push('/enterpriseWEB/detail')">
        <i class="el-icon-plus" style="font-weight: bold;"></i>
        <span style="margin-left: 5px;">新增团队/企业</span>
      </div>
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="switchInnerVisible"
        append-to-body>
      </el-dialog>
    </el-dialog>

    <el-dialog
      title="新增团队/企业"
      :visible.sync="dialogVisibleAdd"
      width="450px">
      <div class="company_name">
        <span style="width: 40px;">名称</span>
        <el-input v-model="companyName" style="width: calc(100% - 40px);" placeholder="输入团队/企业名称"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleAdd = false" style="background-color: #1f64ff;">复制链接</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpUrls from '../../../api/requestURL'
import { mapGetters } from 'vuex'
import { userCompanyList } from '../../../api/chatMG'
export default {
  name: 'ai-detail-index',
  data() {
    return {
      httpUrls,
      list: ['知识库', 'AI企业数字员工', '成员管理', '企业设置'],
      type: 0,
      companyName: '',
      dialogVisibleSwitch: false,
      switchInnerVisible: false,
      dialogVisibleAdd: false,
      itemEnterprise: {
        name: '个人',
        type: '个人',
        id: -1
      },
      enterpriseList: [{
        name: '个人',
        type: '个人',
        id: -1
      }, {
        name: '公司名称1',
        type: '团队/企业',
        id: 10001
      }, {
        name: '公司名称2',
        type: '团队/企业',
        id: 10002
      }, {
        name: '公司名称3',
        type: '团队/企业',
        id: 10003
      }, {
        name: '深圳市xxxx有限公司',
        type: '团队/企业',
        id: 10003
      }]
    }
  },
  
  computed: {
    ...mapGetters(['enterpriseId'])
  },

  watch: {
    enterpriseId: {
      deep: true,
      handler() {
        this.userCompanyList()
      }
    }
  },

  mounted() {
    let enterpriseType = localStorage.getItem('CNTERPRISE_TYPE')
    if (enterpriseType != undefined) {
      this.type = Number(enterpriseType)
    } else {
      this.$router.push('/enterpriseWEB/indexList/indexListView')
    }
  },

  created() {
    this.userCompanyList()
  },

  beforeDestroy() {
    localStorage.removeItem('CNTERPRISE_TYPE')
  },

  methods: {
    toPage(type) {
      this.type = type
      localStorage.setItem('CNTERPRISE_TYPE', type)
      if (type == 0) {
        this.$router.push('/enterpriseWEB/indexList/indexListView')
      } else if (type == 1) {
        this.$router.push('/enterpriseWEB/indexList/digitalEmployees')
      } else if (type == 2) {
        this.$router.push('/enterpriseWEB/indexList/memberManagement')
      } else if (type == 3) {
        this.$router.push('/enterpriseWEB/indexList/enterpriseSet')
      }
    },

        // 切换企业
    switchEnterprise(type) {
      this.$store.dispatch('user/changeEnterpriseId', type.company_code)
      this.itemEnterprise = type
      localStorage.setItem('ENTERPRRISE_CODE_SWITCH', type.company_code)
      localStorage.setItem('ENTERPRRISE_NAME_SWITCH', type.company_name)
      localStorage.setItem('ENTERPRRISE_ICON_SWITCH', type.icon_url)
      localStorage.setItem('ENTERPRRISE_DESC_SWITCH', type.company_desc)
      this.dialogVisibleSwitch = false
      if (type == '-1') {
        localStorage.removeItem('ENTERPRRISE_CODE_SWITCH')
        localStorage.removeItem('ENTERPRRISE_NAME_SWITCH')
        localStorage.removeItem('ENTERPRRISE_ICON_SWITCH')
        localStorage.removeItem('ENTERPRRISE_DESC_SWITCH')
      }
    },

    userCompanyList() {
      userCompanyList().then(res => {
        let companyId = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
        this.enterpriseList = res.data || []
        this.enterpriseList.unshift({
          company_name: '个人',
          company_code: '-1',
          icon_url: ''
        })

        this.enterpriseList.forEach(v => {
          v.str = v.company_name.slice(0, 1)
          if (companyId != undefined && v.company_code == companyId) {
            this.itemEnterprise = v
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.no_switch-enterprise {
  display: flex;
  // justify-content: center;
  padding-top: 100px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #FFFFFF;

  .tit {
    color: #000;
    font-size: 24px;
    font-weight: 500;
    line-height: 150%;
    margin-top: 10px;
  }

  .identity {
    color: #000;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    margin-top: 20px;
  }

  .btn_list {
    margin-top: 40px;

    .btn_default {
      border-radius: 6px;
      border: 1px solid #1F64FF;
      box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
      color: #1F64FF;
      font-size: 18px;
      font-weight: 500;
      padding: 5px 10px;
    }
    .btn_main {
      border-radius: 6px;
      border: 1px solid #1F64FF;
      box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
      color: #FFFFFF;
      background-color: #1F64FF;
      font-size: 18px;
      font-weight: 500;
      padding: 5px 10px;
    }
  }
}

.ai-detail-index {
  padding: 30px;
  display: flex;
  background-color: #F1F2F5;
  height: calc(100% - 60px);
}

.detail_left {
  width: 214px;
  padding: 20px;
  background-color: #FFFFFF;
  margin-right: 20px;
  overflow-y: auto;

  .item {
    border-radius: 4px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    line-height: 40px;
    padding-left: 10px;
    cursor: pointer;
  }

  .item:hover {
    background: rgba(0, 0, 0, 0.10);
  }
  
  .item.item-on {
    background: rgba(31, 100, 255, 0.10);
    color: #1F64FF;  
  }
}

.detail_right {
  background-color: #FFFFFF;
  width: calc(100%);
  overflow-y: auto;
}

.popover_list {
  border-radius: 4px;
  max-height: 500px;
  overflow-y: auto;
  // padding: 10px;
  
  .item {
    display: flex;
    background: #F6F7FA;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    padding: 10px;
    cursor: pointer;

    .icons {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      margin-right: 10px;
      background-color: #1F64FF;
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
  }

  .img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
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
      color: #1F64FF;
      font-size: 12px;
      font-weight: 400;
      border-radius: 4px;
      background: #CCDCFF;
      margin-top: 4px;
      padding: 2px 4px;
    }
  }
}

.add_companuy {
  border-top: 1px solid #EFEBEB;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1F64FF;
  cursor: pointer;
}

.company_name {
  display: flex;
  align-items: center;
}
</style>

<style lang="scss">
.switch-company {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>