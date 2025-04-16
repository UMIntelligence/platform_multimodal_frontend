<template>
  <div class="main-child">
    <nav>小杨哥的团队</nav>
    <div class="container">
      <div class="top">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
        <div>20个成员</div>
      </div>
      <el-table
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
        <el-table-column prop="date" label="姓名" sortable></el-table-column>
        <el-table-column prop="name" label="部门"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="新建职位" :visible.sync="dialogVisible" width="615px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="职位名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入职位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属分组">
          <el-select v-model="ruleForm.region" placeholder="请选择职位分组">
            <el-option label="技术" value="shanghai"></el-option>
            <el-option label="设计" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpUrls from "@/api/requestURL";
export default {
  data() {
    return {
      httpUrls,
      searchValue: "",
      tableData: [{}],
      addImg:
        httpUrls.ossUrl +
        "xcx/com/message_center/vuesax_linear_add-circle@2x.png",
      deleteImg:
        httpUrls.ossUrl + "xcx/com/message_center/vuesax_linear_trash@2x.png",
      dialogVisible: false,
      ruleForm: {
        name: "",
        region: "",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
    };
  },
};
</script>

<style>
.memberPopover {
  padding: 0px !important;
  width: 148px !important;
  min-width: 130px !important;
}
</style>
<style lang="scss" scoped>
/deep/ .el-dialog__header {
  border-bottom: 1px solid #f2f2f2;
}
/deep/ .el-dialog__body {
  padding: 20px !important;
}
.el-select{
  width: 100% !important;
}
.flex {
  /deep/ .el-breadcrumb__inner {
    display: flex;
    align-items: center;
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}
.popover-box {
  width: 148px;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  .popover-box-item {
    padding: 15px 18px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }
  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
}
.main-child {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  nav {
    width: 100%;
    line-height: 64px;
    padding: 0px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;
    background-color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
  }

  .container {
    width: calc(100% - 40px);
    height: calc(100% - 114px);
    overflow: auto;
    margin: 20px auto;
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    padding: 30px;
    box-sizing: border-box;

    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .el-input {
        width: 320px;
      }
      > div:last-child {
        font-weight: 400;
        font-size: 14px;
        color: #292f3a;
      }
    }
  }
}
</style>