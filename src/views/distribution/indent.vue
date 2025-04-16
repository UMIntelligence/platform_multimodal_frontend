<template>
  <!-- 
    提现记录
   -->
  <div class="container">
    <GoBack></GoBack>
    <div class="searchs">
      <div style="display: flex;">
          <div class="searchs_left" style="width: 260px;margin-right: 20px;">
              <el-input class="searchs_input" v-model="searchValue" placeholder="搜索订单号" style="padding-left: 16px;width: 210px;" @change="queryCommissionHistory()"></el-input>
              <img class="searchs_img" src="../../assets/images/search.png" alt="" @click="queryCommissionHistory()">
          </div>
          <div class="searchs_left">
            <span style="color: #b2b2b2;margin-left: 20px;">类型：</span>
              <el-select v-model="chatType" placeholder="请选择对话类型"  @change="queryCommissionHistory()">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
      </div>
    </div>
    <div class="history_table">
      <el-table :data="tableData"  style="width: 100%" :header-cell-style="{background:'#F5F7FA',color:'#333333'}" ref="multipleTable">
        <el-table-column prop="order_no" label="提现单号"></el-table-column>
        <el-table-column prop="withdrawal_amount" label="提现金额"></el-table-column>
        <el-table-column prop="bank" label="到账银行"></el-table-column>
        <el-table-column prop="reason" label="驳回原因">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.reason || '-' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="订单状态">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.w_status == 1" class="indent_process">审核中</span>
              <span v-else-if="scope.row.w_status == 3" class="indent_reject">已驳回</span>
              <span v-else-if="scope.row.w_status == 2" class="indent_withdrawal">已提现</span>
            </div>
          </template>
        </el-table-column>
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
import { withdrawal } from '../../api/distribution'
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

    // 提现记录列表
    queryCommissionHistory() {
      let data = `page=${this.formInline.page}&page_size=${this.formInline.limit}&order_no=${this.searchValue}&w_status${this.chatType}`
      withdrawal(data).then(res => {
        this.totalPageSize = res.data.total
        this.tableData = res.data.data
      })
    },

    handleSizeChange(val) {
      this.formInline.limit = val
      this.queryCommissionHistory()
    },
    handleCurrentChange(val) {
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
    position: relative;
    background: #fff;
}

.searchs_left {
    width: 223px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    height: 40px;
    display: flex;
    align-items: center;
}

.searchs_img {
    width: 15px;
    height: 15px;
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
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
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
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #4E5969;
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    margin-left: 20px;
    cursor: pointer;
}

.indent_process, .indent_reject, .indent_withdrawal {
  font-weight: 400;
  font-size: 12px;
  color: #F5AC3E;
  background: rgba(245, 172, 62, 0.15);
  border-radius: 2px;
  padding: 2px 12px;
}

.indent_reject {
  color: #EB504B;
  background: rgba(235, 80, 75, 0.15);
}
.indent_withdrawal {
  color: #52C41A;
  background: rgba(82, 196, 26, 0.16);
}
</style>
<style>
   .searchs .el-input__inner {
        background: #FFFFFF;
        border: none;
        border-radius: 6px;
        height: 38px;
        font-size: 14px;
        padding: 0 10px;
        width: 150px;
    }

    .searchs .searchs_input input {
        width: 210px;
    }
</style>