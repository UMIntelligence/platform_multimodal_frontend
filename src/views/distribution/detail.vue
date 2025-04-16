<template>
  <!-- 
    分佣明细
   -->
  <div class="container">
    <GoBack></GoBack>

    <div class="searchs">
      <div style="display: flex;">
        <div class="searchs_left" style="width: 260px;margin-right: 20px;">
          <el-input class="searchs_input" v-model="searchValue" placeholder="搜索订单号" style="padding-left: 16px;width: 210px;" @change="queryCommissionHistory()"></el-input>
          <img class="searchs_img" src="../../assets/images/search.png" alt="" @click="queryCommissionHistory()">
        </div>
      </div>
    </div>
    <div class="history_table">
      <el-table :data="tableData"  style="width: 100%" :header-cell-style="{background:'#F5F7FA',color:'#333333'}" ref="multipleTable">
        <el-table-column prop="order_no" label="订单号"></el-table-column>
        <el-table-column prop="nick_name" label="购买人"></el-table-column>
        <el-table-column prop="amount" label="购买金额（元）"></el-table-column>
        <el-table-column prop="commission_ratio" label="佣金比例"></el-table-column>
        <el-table-column prop="reward_commission" label="佣金（元）"></el-table-column>
        <el-table-column prop="create_time" label="时间"></el-table-column>
      </el-table>
    </div>

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
import { commissionHistory } from '../../api/distribution'
import Pagination from '../../components/Pagination'
import GoBack from '../../components/goBack';
import httpUrls from '../../api/requestURL'
export default {
  name: 'mine-detail',
  data() {
    return {
      page: 1,
      pageSize: 10,
      totalPageSize: 0,
      searchValue: '',
      chatType: '',
      tableData: [],
      multipleSelection: [],
      formInline: {
          page: 1,
          limit: 10,
          varLable: '',
          varName: '',
          token: localStorage.getItem('logintoken')
      },
      // 分页参数
      pageparm: {
          currentPage: 1,
          pageSize: 10,
          total: 10
      },
      options: [{
        value: '0',
        label: '已提现'
      }, {
        value: '1',
        label: '已付款'
      }, {
        value: '2',
        label: '审核中'
      }, {
        value: '3',
        label: '已驳回'
      }],
    }
  },
  // 注册组件
  components: {
    Pagination,
    GoBack
  },
  created() {
    this.queryCommissionHistory()
  },
  mounted() {
    document.title = httpUrls.name
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    callFather() {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
    },

    queryCommissionHistory() {
      let data = `page=${this.formInline.page}&page_size=${this.formInline.limit}&order_no=${this.searchValue}`
      commissionHistory(data).then(res => {
        this.totalPageSize = res.data.total
        this.tableData = res.data.data
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.formInline.limit = val
      this.queryCommissionHistory()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.formInline.page = val
      this.queryCommissionHistory()
    },
  }
}
</script>

<style scoped>
   .container {
      padding: 20px 67px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
   }

   .searchs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        background: #fff;
        position: relative;
    }
    
    .searchs_left {
        width: 223px;
        background: #FFFFFF;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04);
        border-radius: 6px;
        height: 40px;
        display: flex;
        align-items: center;
        /* padding-left: 10px; */
    }

    .searchs_img {
        width: 15px;
        height: 15px;
        /* padding: 0 5px; */
        margin-right: 20px;
        cursor: pointer;
    }

    .history_table {
        width: 100%;
        height: auto;
    }
    
    .page_btn {
        display: flex;
        align-items: center;
        margin-top: 30px;
    }
    .btn_del{
        background: #1F64FF;
        border-radius: 2px;
        /* font-family: 'PingFang SC'; */
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        /* line-height: 22px; */
        color: #fff;
        padding: 0px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        cursor: pointer;
    }

    .cancel_del {
        background: #F2F3F5;
        border-radius: 2px;
        /* font-family: 'PingFang SC'; */
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        /* line-height: 22px; */
        color: #4E5969;
        padding: 0px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        margin-left: 20px;
        cursor: pointer;
    }

</style>
<style>
   .searchs .el-input__inner {
        background: #FFFFFF;
        /* box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04); */
        border: none;
        border-radius: 6px;
        height: 38px;
        font-size: 14px;
        padding: 0 10px;
        width: 150px;
        /* padding-left: 10px; */
        /* flex: 1; */
    }

    .searchs .searchs_input input {
        width: 210px;
    }
</style>