/** * 历史会话 */
<template>
  <div class="container">
    <GoBack></GoBack>

    <div class="searchs">
      <div style="display: flex">
        <div class="searchs_left" style="width: 260px; margin-right: 20px">
          <el-input
            class="searchs_input"
            v-model="searchValue"
            placeholder="请输入标题"
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
          <span style="color: #b2b2b2; margin-left: 20px">类型：</span>
          <el-select v-model="chatType" placeholder="请选择对话类型" @change="search()">
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
    </div>
    <div class="history_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F5F6FA', color: '#999' }"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="220"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="chat_type" label="对话类型">
          <template slot-scope="scope">
            <div>
              <div v-if="Number(scope.row.chat_type) == 0">AI35</div>
              <div v-if="Number(scope.row.chat_type) == 1">AI40</div>
              <div v-if="Number(scope.row.chat_type) == 2">DALL·E2</div>
              <div v-if="Number(scope.row.chat_type) == 3">百度绘画</div>
              <div v-if="Number(scope.row.chat_type) == 4">文心一言</div>
              <div v-if="Number(scope.row.chat_type) == 5">讯飞星火</div>
              <div v-if="Number(scope.row.chat_type) == 6">Midjourney</div>
              <div v-if="Number(scope.row.chat_type) == 7">Claude</div>
              <div v-if="Number(scope.row.chat_type) == 8">ChatGLM</div>
              <div v-if="Number(scope.row.chat_type) == 9">Stable Diffusion</div>
              <div v-if="Number(scope.row.chat_type) == 10">通义千问</div>
              <div v-if="Number(scope.row.chat_type) == 12">360智脑</div>
              <div v-if="Number(scope.row.chat_type) == 1000">火山云雀</div>
              <div v-if="Number(scope.row.chat_type) == 1001">腾讯混元</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="提问时间"
          width="200px"
        ></el-table-column>
      </el-table>
    </div>

    <div class="page_btn" v-if="tableData != null">
      <div class="btn_del" @click="delSelect()">删除</div>
      <div class="cancel_del" @click="toggleSelection()">取消</div>
      <!-- 分页组件 -->
      <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    </div>
  </div>
</template>

<script>
import { chatList, ChatDelete } from "../../api/chatMG";
import Pagination from "../../components/Pagination";
import GoBack from "../../components/goBack";
import httpUrls from "../../api/requestURL";
export default {
  name: "history",
  data() {
    return {
      searchValue: "",
      chatType: "-1",
      tableData: [],
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
          value: "-1",
          label: "全部",
        },
        {
          value: "0",
          label: "AI35",
        },
        {
          value: "1",
          label: "AI40",
        },
        {
          value: "4",
          label: "文心一言",
        },
        {
          value: "5",
          label: "讯飞星火",
        },
        {
          value: "2",
          label: "DALL E2",
        },
        {
          value: "3",
          label: "百度绘画",
        },
        {
          value: "6",
          label: "Midjourney",
        },
      ],
    };
  },
  // 注册组件
  components: {
    Pagination,
    GoBack,
  },

  /**
   * 创建完毕
   */
  created() {
    this.getChatList();
  },
  mounted() {
    document.title = httpUrls.name;
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //删除
    handleDelete() {},
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getChatList();
    },
    search() {
      this.formInline.page = 1;
      this.getChatList();
    },
    // 获取对话列表
    getChatList(bool = false) {
      let selectType = "";
      if (this.chatType == "-1") {
        selectType = "";
      } else {
        selectType = this.chatType;
      }

      let val = {
        chat_type: selectType,
        title: this.searchValue,
        page_size: this.formInline.limit,
        page: this.formInline.page,
      };
      let requestData = `chat_type=${selectType}&title=${this.searchValue}&page_size=${this.formInline.limit}&page=${this.formInline.page}`;
      chatList(requestData)
        .then((res) => {
          if (res.code == 20000) {
            this.tableData = res.data.data;
            this.pageparm.total = parseInt(res.data.total);
          } else {
            this.$message.error(res.msg);
          }
          if (bool && res.data.total != 0 && this.formInline.page > 1) {
            this.formInline.page--;
            this.getChatList();
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
        this.multipleSelection.push(row.session_code);
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
              session_codes: JSON.stringify(this.multipleSelection),
            };
            ChatDelete(val)
              .then((res) => {
                if (res.code == 20000) {
                  this.getChatList(true);
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

    // 点击行
    handleRowClick(row, column, event) {
      this.$confirm("是否延续当前对话", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("进入", row);
          switch (Number(row.chat_type)) {
            case 0:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 1:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 2:
              this.$router.push({
                name: "AI绘画",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 3:
              this.$router.push({
                name: "AI绘画",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 4:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 5:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 6:
              this.$router.push({
                name: "AI绘画",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 7:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 8:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 9:
              this.$router.push({
                name: "AI绘画",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 10:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 12:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 1000:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
            case 1001:
              this.$router.push({
                name: "chat",
                params: { code: row.session_code, id: row.chat_type },
              });
              break;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
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
  position: relative;
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
