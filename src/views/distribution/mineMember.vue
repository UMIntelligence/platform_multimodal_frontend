<template>
  <!-- 
    我的成员
   -->
  <div class="mine-member">
    <go-back></go-back>
    <div class="member_title">成员人数：{{totalPageSize}}人</div>
    <el-table
      :show-header="false"
      empty-text="暂无成员"
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="avatar_url" label="头像" width="180">
        <template slot-scope="scope">
          <img :src="httpUrls.ossUrl + scope.row.avatar_url" alt="" style="width: 32px;height: 32px;">
        </template>
      </el-table-column>
      <el-table-column prop="nick_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="create_time" label="注册日期"></el-table-column>
    </el-table>

    <div style="display: flex;justify-content: flex-end;margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import GoBack from '../../components/goBack'
import { mineMembers } from '../../api/distribution'
import httpUrls from '../../api/requestURL'

export default {
  name: 'mine-member',
  data() {
    return {
      httpUrls,
      tableData: [],
      page: 1,
      pageSize: 10,
      totalPageSize: 0
    }
  },
  components: {
    GoBack
  },
  created() {
    this.queryMineMembers()
  },
  mounted() {
    document.title = httpUrls.name
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.queryMineMembers()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.queryMineMembers()
    },
    queryMineMembers() {
      let data = `page_size=${this.pageSize}&page=${this.page}`
      mineMembers(data).then(res => {
        this.tableData = res.data.data
        this.totalPageSize = res.data.total
      })
    }
  },
}
</script>

<style scoped>
.mine-member {
  width: calc(100% - 160px);
  padding: 70px 60px 40px 100px;
  position: relative;
}

.mine-member .member_title {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #1F64FF;
}
</style>