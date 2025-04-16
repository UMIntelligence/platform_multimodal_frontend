<template>
  <div class="main-child" id="main-child">
    <!-- 权限组设置 -->
    <div class="top">
      <div class="top-left">
        <div>权限组设置</div>
        <div>
          权限组包含多个权限，这些权限可以一次赋予给管理员
        </div>
      </div>
      <div class="top-right">
        <i class="el-icon-plus"></i>
        <div>新建权限组</div>
      </div>
    </div>
    <div class="search">
      <div>
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
      </div>
      <div>2个权限组</div>
    </div>
    <div class="table">
      <!-- :max-height="tabHeight" -->
      <el-table
        :max-height="tabHeight"
        :data="tableData"
        :header-cell-style="{
          background: '#F6F6F6',
          color: '#000000',
          fontSize: '14px',
          fontWeight: 'bold',
        }"
        style="width: 100%"
        class="table"
      >
        <el-table-column prop="date" label="权限组"></el-table-column>
        <el-table-column prop="name" label="描述"></el-table-column>
        <el-table-column prop="address" label="权限"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text">配置</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <PaginationBase
        v-bind:child-msg="pageparm"
        @callFather="callFather"
      ></PaginationBase>
    </div>
  </div>
</template>

<script>
import PaginationBase from "../../../components/PaginationBase.vue";

export default {
  data() {
    return {
      searchValue: "",
      tabHeight: 0,
      tableData: [],
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
    };
  },
  components: {
    PaginationBase,
  },
  mounted() {
    this.$nextTick(() => {
      let dom = document.getElementById("main-child");
      this.tabHeight = dom.offsetHeight - 124 - 100 + "px";
    });
  },
  methods: {
    callFather(val) {
      console.log("触发callFather");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-child {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  overflow: hidden;
  background: #ffffff;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .top-left {
      > div:first-child {
        font-weight: 600;
        font-size: 16px;
        color: #000000;
        margin-bottom: 4px;
      }
      > div:last-child {
        font-weight: 400;
        font-size: 14px;
        color: #666666;
      }
    }
    .top-right {
      color: white;
      background: #3363f6;
      border-radius: 8px 8px 8px 8px;
      display: flex;
      align-items: center;
      padding: 10px 23px;
      cursor: pointer;
      > div:last-child {
        margin-left: 5px;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
  .search {
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    > div:first-child {
      width: 320px;
    }
    > div:last-child {
      font-weight: 400;
      font-size: 14px;
      color: #292f3a;
      vertical-align: bottom;
      line-height: 40px;
    }
  }
}
</style>