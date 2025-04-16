<template>
  <!-- 
    知识库列表
   -->
  <div class="index-view">
    <div class="title-top">
      <span>企业知识库</span>
      <el-tooltip class="item" effect="dark" content="" placement="top-start">
        <div slot="content">
          知识库让每个企业轻松拥有<br />
          自己的AIGC系统和企业级AI<br />
          平台,实现智能对话、 AI模<br />
          型训练大幅降低企业成本，<br />
          提高企业效率。
        </div>
        <el-button icon="el-icon-question" style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
      </el-tooltip>
    </div>
    <div class="contes">知识库支持上传文本、文件和视频</div>

    <div class="search_or_btn">
      <el-input @keyup.enter.native="userCompanyList" v-model="searchDataBase" style="width: 216px;height: 32px;line-height: 32px;" placeholder="搜索知识库名称">
        <i slot="prefix" class="el-input__icon el-icon-search" style="height: 32px;line-height: 32px;"></i>
      </el-input>
      <el-button icon="el-icon-plus" @click="editCompany('add')" style="height: 32px;line-height: 32px;padding: 0 10px;font-size: 14px;background-color: #206EF7;color: #FFFFFF;border: none;">新建知识库</el-button>
    </div>

    <div>
      <el-table
        :header-cell-style="{color: '#70767F', fontSize: '12px', backgroundColor: '#F6F8FA', padding: '0', height: '40px', lineHeight: '44px'}"
        :cell-style="{padding: '0', height: '40px', lineHeight: '44px'}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="名称">
          <template slot-scope="scope">
            <div style="color: #1F64FF;cursor: pointer;" @click="editCompany(scope.row)">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建人">
          <template slot-scope="scope">
            <div>{{ scope.row.nick_name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号">
          <template slot-scope="scope">
            <div>{{ scope.row.mobile }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="editCompany(scope.row)" style="color: #1F64FF;">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="display: flex;justify-content: flex-end;margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { knowledgeList } from '../../../api/chatMG'
import { mapGetters } from 'vuex'

export default {
  name: 'index-view',
  data() {
    return {
      searchDataBase: '',
      page: 1,
      pageSize: 10,
      totalSize: 0,
      tableData: []
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

  created() {
    sessionStorage.setItem('COMPANY_CODE', localStorage.getItem('ENTERPRRISE_CODE_SWITCH')) // 用于修改的企业id
    this.userCompanyList()
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.userCompanyList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.userCompanyList()
    },

    userCompanyList() {
      let companyCode = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
      let data = `company_code=${companyCode}&title=${this.searchDataBase}&page=${this.page}&page_size=${this.pageSize}`
      knowledgeList(data).then(res => {
        console.log(res);
        this.totalSize = res.data.total
        this.tableData = res.data.data
      })
    },

    editCompany(row) {
      if (row == 'add') { // 新建
        sessionStorage.setItem('COMPANY_CODE', localStorage.getItem('ENTERPRRISE_CODE_SWITCH')) // 用于修改的企业id
        this.$router.push('/enterpriseWEB/indexList/editBase')
      } else { // 修改
        sessionStorage.setItem('COMPANY_CODE', row.company_code) // 用于修改的企业id
        this.$router.push('/enterpriseWEB/indexList/editBase')
      }
    },
  }
}
</script>

<style scoped lang="scss">
.index-view {
  margin: 20px;
}

.title-top {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.contes {
  color: #666;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 20px;
}

.search_or_btn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  input {
    height: 32px;
    line-height: 32px;
  }
}
</style>

<style lang="scss">
.search_or_btn {
  input {
    height: 32px;
    line-height: 32px;
  }
}
</style>