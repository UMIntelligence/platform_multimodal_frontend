<template>
  <div class="main-child">
    <nav>
      <div>小杨哥的团队</div>
      <div>
        <div class="btn" @click="handleAddMember">
          <img
            :src="
              httpUrls.ossUrl +
              'xcx/com/message_center/vuesax_linear_add@2x (1).png'
            "
            alt=""
          />
          <div>添加成员</div>
        </div>
        <div class="btn">
          <img
            :src="
              httpUrls.ossUrl +
              'xcx/com/message_center/vuesax_linear_login@2x.png'
            "
            alt=""
          />
          <div>导入成员</div>
        </div>
        <div class="btn">
          <img
            :src="
              httpUrls.ossUrl +
              'xcx/com/message_center/vuesax_linear_login@2x (1).png'
            "
            alt=""
          />
          <div>导出成员</div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="top">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
        <div>2个成员</div>
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
        <el-table-column prop="name" label="角色" sortable></el-table-column>
        <el-table-column prop="address" label="部门" sortable>
        </el-table-column>
        <el-table-column prop="address" label="职位"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleSet(scope)">配置</el-button>
            <el-button type="text">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑团队" :visible.sync="editVisible" width="608px">
      <el-form
        :model="ruleFormVisible"
        :rules="rulesVisible"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="团队名称" prop="name">
          <el-input
            v-model="ruleFormVisible.name"
            placeholder="请输入团队名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="可见范围" prop="region">
          <el-select
            v-model="ruleFormVisible.region"
            placeholder="请选择可见范围"
          >
            <el-option value="公开 | 组织全部成员可见">公开 | 组织全部成员可见</el-option>
            <el-option value="私有 | 仅团队成员可见">私有 | 仅团队成员可见</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分组">
          <el-select
            v-model="ruleFormVisible.region"
            placeholder="请选择所属分组"
          >
            <el-option label="分组名称1" value="shanghai"></el-option>
            <el-option label="分组名称2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            v-model="ruleFormVisible.desc"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="设置角色" :visible.sync="setRoleVisible" width="560px">
      <div class="setRole-box">
        <div class="checkUser">
            <span>已选择用户：</span>
            <span>小杨哥</span>
        </div>
        <el-form
        :model="ruleFormRole"
        :rules="rulesRole"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="name">
          <el-select
            v-model="ruleFormRole.name"
            placeholder="请选择角色"
          >
            <el-option label="团队成员" value="shanghai"></el-option>
            <el-option label="团队管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleVisible = false">确 定</el-button>
      </span>
    </el-dialog>  
    <!-- 添加成员 -->
    <add-member ref="meberRef"></add-member>
  </div>
</template>

<script>
import httpUrls from "@/api/requestURL";
import addMember from "./components/addMember.vue";

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
      editVisible: false,
      ruleFormVisible: {
        name: "",
        region: "",
        desc: "",
      },
      rulesVisible: {
        name: [{ required: true, message: "请输入团队名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择可见范围", trigger: "change" },
        ],
      },
      ruleFormRole: {
        name:'',
      },
      rulesRole:{
         name: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      setRoleVisible:false, //设置角色
    };
  },
  methods:{
    //设置角色
    handleSet(){
      this.setRoleVisible = true;
    },
     //添加成员
    handleAddMember(){
      // console.log(this.$refs.meberRef)
      this.$refs.meberRef.dialogVisible = true;
    }
  },
  components: {
    addMember
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
/deep/ .el-dialog__header{
  border-bottom: 1px solid #F2F2F2;
}
/deep/ .el-dialog__body{
  // padding: 20px !important;
}
.el-select {
  width: 100% !important;
}
.el-form-item{
  margin-bottom: 10px !important;
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
  .checkUser{
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    margin-bottom: 14px;
    span:last-child{
      font-weight: bold;
      font-size: 14px;
      color: #3363F6;
    }
  }
  nav {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;
    background-color: #ffffff;
    > div {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      .btn {
        width: 110px;
        height: 32px;
        margin-left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 1px solid #e6e6e6;
        border-radius: 8px 8px 8px 8px;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        div {
          font-weight: bold;
          font-size: 14px;
        }
      }
      .btn:first-child {
        background: #3363f6;
        color: white;
        border: 1px solid #3363f6;
      }
    }
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