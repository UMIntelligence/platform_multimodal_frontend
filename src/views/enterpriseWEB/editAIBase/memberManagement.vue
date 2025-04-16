<template>
  <!-- 
    成员管理
   -->
  <div class="memberManagement">
    <div class="btn_list-mask">
      <div class="mask">
        <el-button :class="memberState == 0 ? 'item item-on' : 'item'" @click="getMemberState(0)">全部</el-button>
        <el-button :class="memberState == 1 ? 'item item-on' : 'item'" @click="getMemberState(1)">待审批</el-button>
      </div>
    </div>

    <div class="search-or-add_member">
      <el-input placeholder="搜索" class="searchs"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      <el-button icon="el-icon-plus" @click="dialogVisible = true" class="memeber">邀请成员</el-button>
    </div>

    <el-table
      :header-cell-style="{color: '#70767F', fontSize: '12px', backgroundColor: '#F6F8FA', padding: '0', height: '40px', lineHeight: '44px'}"
      :cell-style="{padding: '0', height: '40px', lineHeight: '44px'}"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="nick_name"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="加入时间">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" v-if="scope.row.m_status == 1" @click="submitSuccess(scope.row)">同意</el-button>
            <el-button type="text" @click="deleteMmber(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

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

    <el-dialog
      title="生成邀请链接"
      :visible.sync="dialogVisible"
      width="450px">
      <div class="company_name">
        <span style="width: 40px;">链接</span>
        <el-tooltip class="item" effect="dark" :content="link" placement="top-start">
          <span class="link-url">{{ link }}</span>
        </el-tooltip>
        <!-- <span class="link-url">{{ link }}</span> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="copyLink">复制链接</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import httpUrls from '../../../api/requestURL'
import { enterpriseMemberList, enterpriseProcessMember, enterpriseDeleteMember } from '../../../api/chatMG'
export default {
  name: 'memberManagement',
  data() {
    return {
      httpUrls,
      page: 1,
      pageSize: 10,
      totalSize: 0,
      dialogVisible: false,
      companyName: '',
      memberState: 0,
      tableData: [],
      link: '',
    }
  },

  computed: {
    ...mapGetters(['enterpriseId'])
  },

  watch: {
    enterpriseId: {
      deep: true,
      handler() {
        this.enterpriseMemberList()
        let code = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
        let companyName = localStorage.getItem('ENTERPRRISE_NAME_SWITCH')
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.link = httpUrls.url + '/#/index?company_code=' + code + '&invite_user_code=' + userInfo.user_code + '&company_name=' + companyName // 邀请链接
      }
    }
  },

  created() {
    this.enterpriseMemberList()
  },

  mounted() {
    let code = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
    let companyName = localStorage.getItem('ENTERPRRISE_NAME_SWITCH')
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.link = httpUrls.url + '/#/index?company_code=' + code + '&invite_user_code=' + userInfo.user_code + '&company_name=' + companyName // 邀请链接
  },

  methods: {
    // 成员的状态
    getMemberState(state) {
      this.memberState = state
      this.enterpriseMemberList()
    },

    // 成员列表
    enterpriseMemberList() {
      let code = localStorage.getItem('ENTERPRRISE_CODE_SWITCH')
      let data = `company_code=${code}&page=${this.page}&page_size=${this.pageSize}`
      if (this.memberState == 1) {
        data += `&m_status=${this.memberState}`
      }
      enterpriseMemberList(data).then(res => {
        console.log(res);
        this.tableData = res.data.data
        this.totalSize = res.data.total
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.enterpriseMemberList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.enterpriseMemberList()
    },

    copyLink() {
      var input = document.createElement("textarea"); // 创建input对象
      input.value = this.link; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');
    },

    // 同意
    submitSuccess(row) {
      this.$confirm('同意该成员加入企业?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enterpriseProcessMember(row.member_code).then(res => {
          console.log(res);
          if (res.code == 20000) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.enterpriseMemberList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },

    deleteMmber(row) {
      this.$confirm('是否将该成员移出企业?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enterpriseDeleteMember(row.member_code).then(res => {
        if (res.code == 20000) {
          this.enterpriseMemberList()
          this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      })
    }
  }
}
</script>

<style scoped lang="scss">
.memberManagement {
  padding: 20px;
}

.company_name {
  display: flex;
  align-items: center;

  .link-url {
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    padding: 10px;
    width: calc(100% - 40px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.btn_list-mask {
  display: flex;
  margin-bottom: 20px;

  .mask {
    background-color: #F2F3F5;
    border-radius: 2px;
    padding: 3px;
  }
  .item {
    margin: 0;
    padding: 4px 12px;
    color: #4E5969;
    font-size: 14px;
    font-weight: 400;
    border: none;
    background-color: #F2F3F5;
  }

  .item.item-on {
    background-color: #fff;
    color: #4E5969;
  }
}

.search-or-add_member {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .searchs {
    width: 216px;
  }
}
</style>

<style lang="scss">
.search-or-add_member {
  .searchs {
    width: 216px;
    height: 32px;
    line-height: 32px;

    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }

    .el-input__icon {
      height: 32px;
      line-height: 32px;
    }
  }

  .memeber {
    background-color: #206EF7;
    color: #FFFFFF;
    padding: 6px 10px;
  }
}
</style>