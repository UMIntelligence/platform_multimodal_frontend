/**
 * 订单记录
 */
<template>
  <div class="container">
    <GoBack></GoBack>
    <div class="searchs">
      <div class="searchs_left" style="width: 260px">
        <el-input
          class="searchs_input"
          v-model="searchValue"
          placeholder="搜索订单号"
          style="padding-left: 16px; width: 210px"
          @change="search()"
        ></el-input>
        <img
          class="searchs_img"
          src="../../assets/images/search.png"
          alt=""
          @click="search()"
        />
      </div>
      <div class="searchs_left">
        <span style="color: #b2b2b2; margin-left: 20px">状态：</span>
        <el-select
          v-model="orderStatus"
          placeholder="请选择订单状态"
          @change="search"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="history_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F5F6FA', color: '#999' }"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :default-expand-all="defaultExpandAll"
      >
        <el-table-column type="expand" width="55">
          <template slot-scope="scope">
            <el-form
              label-position="left"
              class="demo-table-expand"
              style="margin-left: 50px; width: 300px"
            >
              <el-form-item label="订单号：" style="margin-bottom: 0">
                <span>{{ scope.row.order_id }}</span>
              </el-form-item>
              <el-form-item label="金额：" style="margin-bottom: 0">
                <span>{{ scope.row.total_amount }}</span>
              </el-form-item>
              <el-form-item label="套餐：" style="margin-bottom: 0">
                <span>{{ scope.row.prod_name }}</span>
              </el-form-item>
              <el-form-item
                label="单价："
                v-if="scope.row.prod_cate_id == '5'"
                style="margin-bottom: 0"
              >
                <span>{{ scope.row.prod_price }}</span>
              </el-form-item>
              <el-form-item
                label="数量："
                v-if="scope.row.prod_cate_id == '5'"
                style="margin-bottom: 0"
              >
                <span>{{ scope.row.quantity }}</span>
              </el-form-item>
              <el-form-item label="购买时间：" style="margin-bottom: 0">
                <span>{{ scope.row.created_at }}</span>
              </el-form-item>
              <el-form-item label="有效期：" style="margin-bottom: 0">
                <span>{{ scope.row.expire_at }}</span>
              </el-form-item>
              <el-form-item
                label="内容："
                v-if="
                  scope.row.prod_cate_id == '4' || scope.row.prod_cate_id == '5'
                "
                style="margin-bottom: 0"
              >
                <span v-if="scope.row.prod_cate_id == '4'"
                  >成员首次充值享有50%佣金</span
                >
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
            <span v-if="scope.row.status == 1" style="cursor: pointer"
              ><el-tag type="warning" @click="toPay(scope.row)"
                >待付款</el-tag
              ></span
            >
            <span v-if="scope.row.status == 2"
              ><el-tag type="success">已付款</el-tag></span
            >
            <span v-if="scope.row.status == 4"
              ><el-tag type="danger">已过期</el-tag></span
            >
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="时间"></el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 1"
              type="primary"
              plain
              @click="toPay(scope.row)"
              style="padding: 6px 10px"
              >去付款</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page_btn" v-if="tableData != null">
      <div class="btn_del" @click="delSelect()">删除</div>
      <div class="cancel_del" @click="toggleSelection()">取消</div>
      <!-- 分页组件 -->
      <Pagination
        v-bind:child-msg="pageparm"
        @callFather="callFather"
      ></Pagination>
    </div>

    <!-- 支付组件 -->
    <pay-public ref="Pay" :datas="datas"></pay-public>
  </div>
</template>

<script>
import { payOrder, delOrder, resetPay } from "../../api/chatMG";
import Pagination from "../../components/Pagination";
import payPublic from "../../components/payPublic";
import GoBack from '../../components/goBack';
import httpUrls from "../../api/requestURL";

export default {
  name: "order",
  data() {
    return {
      searchValue: "",
      tableData: [],
      loginInfo: "",
      orderStatus: "0",
      multipleSelection: [],
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken"),
      },
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      options: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "待付款",
        },
        {
          value: "2",
          label: "已付款",
        },
        {
          value: "4",
          label: "已过期",
        },
      ],
      datas: {},
      defaultExpandAll: false,
    };
  },
  watch: {
    orderStatus: {
      deep: true,
      handler() {
        this.getOrderList();
      },
    },
  },
  // 注册组件
  components: {
    Pagination,
    payPublic,
    GoBack
  },

  mounted() {
    this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    document.title = httpUrls.name;
    if (this.$route.params.item != undefined) {
      this.searchValue = this.$route.params.item.order_id;
      this.getOrderList();
      this.defaultExpandAll = true;
    } else {
      this.getOrderList();
      this.defaultExpandAll = false;
    }
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getOrderList();
    },
    search() {
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.getOrderList();
    },
    // 获取对话列表
    getOrderList(bool = false) {
      let val = {
        user_id: this.loginInfo.user_id,
        // 'prod_cate_id': '3',
        status: this.orderStatus,
        order_id: this.searchValue,
        page_index: this.formInline.page,
        page_count: this.formInline.limit,
      };
      payOrder(val)
        .then((res) => {
          if (res.code == 20000) {
            this.tableData = res.data;
            this.pageparm.total = parseInt(res.total);
          } else {
            this.$message.error(res.msg);
          }
          if (bool && Number(res.total) != 0 && this.formInline.page > 1) {
            this.formInline.page--;
            this.getOrderList();
          }
        })
        .catch((err) => {
          this.$message.error("获取失败！");
        });
    },

    //多选
    handleSelectionChange(val) {
      let array = val;
      this.multipleSelection = [];
      array.forEach((row) => {
        this.multipleSelection.push(row.order_id);
      });
    },

    //删除
    delSelect() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定删除选中的信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let val = {
              order_ids: this.multipleSelection,
            };
            delOrder(val)
              .then((res) => {
                if (res.code == 20000) {
                  // this.formInline.page = 1;
                  this.getOrderList(true);
                  this.$message.success("删除成功！");
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch((err) => {
                this.$message.error("删除失败！");
              });
          })
          .catch(() => {
            this.toggleSelection();
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.$message.error("请选择删除信息");
      }
    },
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
      this.multipleSelection = [];
    },

    // 重新调起付款页面
    toPay(row) {
      if (row.source != "pc" && row.source != undefined) {
        this.$message.error("当前不支持此订单支付，请前往订单来源处进行支付");
        return;
      }
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      resetPay({ order_id: row.order_id, user_id: userInfo.user_id }).then(
        (res) => {
          if (res.code == 20000) {
            this.$refs.Pay.PayVisible = true;
            this.datas = {
              ...res.data[0],
              ...row,
              resetPay: 1,
              totalPrice: row.total_amount,
            };
          } else {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].order_id == row.order_id) {
                this.tableData[i].status = 4;
              }
            }

            this.$message.error(res.msg);
          }
        }
      );
    },
  },
};
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
}

.searchs_left {
  width: 223px;
  background: #ffffff;
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
.btn_del {
  background: #1f64ff;
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
  background: #f2f3f5;
  border-radius: 2px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #4e5969;
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
  background: #ffffff;
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

 
 