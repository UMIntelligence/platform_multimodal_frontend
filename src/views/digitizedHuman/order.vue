<template>
  <!-- 
    订单记录
   -->
  <div class="huamn-order">
    <div style="display: flex;justify-content: flex-end;margin-bottom: 20px;">
      <el-input placeholder="搜索订单号" prefix-icon="el-icon-search" v-model="searchValue" style="width: 240px;" @change="handleChangeSearch"></el-input>
    </div>

    <el-table :data="tableData" height="calc(100% - 112px)" style="width: 100%"
      :header-cell-style="{ background: '#F5F6FA', color: '#999' }" ref="multipleTable"
      @selection-change="handleSelectionChange" :default-expand-all="defaultExpandAll">
      <el-table-column type="expand" width="55">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand" style="margin-left: 50px;width: 300px;">
            <el-form-item label="订单号：" style="margin-bottom: 0;">
              <span>{{ scope.row.order_id }}</span>
            </el-form-item>
            <el-form-item label="金额：" style="margin-bottom: 0;">
              <span>{{ scope.row.total_amount }}</span>
            </el-form-item>
            <el-form-item label="套餐：" style="margin-bottom: 0;">
              <span>{{ scope.row.prod_name }}</span>
            </el-form-item>
            <el-form-item label="单价：" v-if="scope.row.prod_cate_id == '5'" style="margin-bottom: 0;">
              <span>{{ scope.row.prod_price }}</span>
            </el-form-item>
            <el-form-item label="数量：" v-if="scope.row.prod_cate_id == '5'" style="margin-bottom: 0;">
              <span>{{ scope.row.quantity }}</span>
            </el-form-item>
            <el-form-item label="购买时间：" style="margin-bottom: 0;">
              <span>{{ scope.row.created_at }}</span>
            </el-form-item>
            <el-form-item label="有效期：" style="margin-bottom: 0;">
              <span>{{ scope.row.expire_at }}</span>
            </el-form-item>
            <el-form-item label="内容：" v-if="scope.row.prod_cate_id == '4' || scope.row.prod_cate_id == '5'"
              style="margin-bottom: 0;">
              <span v-if="scope.row.prod_cate_id == '4'">成员首次充值享有50%佣金</span>
              <span v-else>{{ scope.row.prod_name }}使用权</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="order_id" label="订单号"></el-table-column>
      <el-table-column prop="prod_name" label="套餐"></el-table-column>
      <el-table-column prop="total_amount" label="金额"></el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <span v-if="scope.row.payment_method == 1">支付宝</span>
          <span v-if="scope.row.payment_method == 2">微信</span>
          <span v-if="scope.row.payment_method == 3">卡密兑换</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="cursor: pointer;"><el-tag type="warning"
              @click="toPay(scope.row)">待付款</el-tag></span>
          <span v-if="scope.row.status == 2"><el-tag type="success">已付款</el-tag></span>
          <span v-if="scope.row.status == 4"><el-tag type="danger">已过期</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="时间"></el-table-column>
      <el-table-column prop="caozuo" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" plain @click="toPay(scope.row)"
            style="padding: 6px 10px;">去付款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-template">
      <div class="page_btn" v-if="tableData != null">
        <div class="btn_del" @click="delSelect()">删除</div>
        <div class="cancel_del" @click="toggleSelection()">取消</div>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalPageSize">
      </el-pagination>
    </div>

    <pay-public ref="Pay" :datas="datas"></pay-public>
  </div>
</template>

<script>
import { payOrder, delOrder, resetPay } from '../../api/chatMG'
import payPublic from '../../components/payPublic'
export default {
  name: "human-order",
  data() {
    return {
      tableData: [],
      datas:{},
      searchValue: '',
      page: 1,
      pageSize: 10,
      totalPageSize: 0,
      defaultExpandAll: false,
      orderStatus: 0,
      multipleSelection: []
    }
  },

  components: {
    payPublic
  },

  created() {
    this.loginInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.getOrderList()
  },

  methods: {
    //多选
    handleSelectionChange(val) {
      let array = val;
      this.multipleSelection = [];
      array.forEach(row => {
        this.multipleSelection.push(row.order_id)
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getOrderList()
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.getOrderList()
    },

    handleChangeSearch() {
      this.getOrderList()
    },

    // 获取对话列表
    getOrderList() {
      let arr = [7, 8];
      let val = {
        'user_id': this.loginInfo.user_id,
        'prod_cate_id': [7, 8],
        'status': this.orderStatus,
        'order_id': this.searchValue,
        'page_index': this.page,
        'page_count': this.pageSize
      }
      payOrder(val).then(res => {
        if (res.code == 20000) {
          this.tableData = res.data;
          this.totalPageSize = Number(res.total)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error('获取失败！')
      })
    },

    // 重新调起付款页面
    toPay(row) {
      if (row.source != 'pc' && row.source != undefined) {
        this.$message.error('当前不支持此订单支付，请前往订单来源处进行支付')
        return
      }
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      resetPay({ 'order_id': row.order_id, 'user_id': userInfo.user_id }).then(res => {
        if (res.code == 20000) {
          this.$refs.Pay.PayVisible = true
          this.datas = { ...res.data[0], ...row, resetPay: 1, totalPrice: row.total_amount }
        } else {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].order_id == row.order_id) {
              this.tableData[i].status = 4
            }
          }

          this.$message.error(res.msg)
        }
      })
    },

    //删除
    delSelect() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let val = {
            'order_ids': this.multipleSelection,
          }
          delOrder(val).then(res => {
            if (res.code == 20000) {
              // this.formInline.page = 1;
              this.getOrderList(true);
              this.$message.success('删除成功！')
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error('删除失败！')
          })
        }).catch(() => {
          this.toggleSelection()
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$message.error('请选择删除信息')
      }
    },
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
      this.multipleSelection = [];
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination-template {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.huamn-order {
  height: calc(100% - 40px);
  padding: 20px;
}

.page_btn {
  display: flex;
  align-items: center;
}

.btn_del {
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
</style>