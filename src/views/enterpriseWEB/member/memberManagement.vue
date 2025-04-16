<template>
  <div class="main-child">
    <nav>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="flex">
            <img
              :src="
                httpUrls.ossUrl +
                'xcx/com/message_center/Group_427319899@2x (1).png'
              "
              alt=""
            />
            <div>小杨哥的团队</div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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
        <el-table-column prop="name" label="用户名" sortable></el-table-column>
        <el-table-column prop="address" label="工号" sortable>
        </el-table-column>
        <el-table-column prop="address" label="手机号"> </el-table-column>
        <el-table-column prop="address" label="邮箱"> </el-table-column>
        <el-table-column prop="address" label="部门"> </el-table-column>
        <el-table-column prop="address" label="职位"> </el-table-column>
        <el-table-column prop="address" label="创建时间" sortable>
        </el-table-column>
        <el-table-column prop="address" label="最后登录时间" sortable>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="departmentEdit(scope)">编辑</el-button>
            <el-popover
              placement="bottom-end"
              width="400"
              popper-class="memberPopover"
              trigger="click"
            >
              <div class="popover-box">
                <div class="popover-box-item" @click="passwordVisible = true">
                  <img :src="addImg" alt="" />
                  <div>设置成员密码</div>
                </div>
                <div class="popover-box-item" @click="handleDelete">
                  <img :src="deleteImg" alt="" />
                  <div style="color: red">移除</div>
                </div>
              </div>
              <el-button type="text" slot="reference">更多</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 新建部门 -->
    <el-dialog width="690px" :visible.sync="departmentVisible" :show-close="false">
      <div class="department-box">
        <div class="department-box-header">
          <div>新建部门</div>
          <i class="el-icon-close" @click="departmentVisible = false"></i>
        </div>
        <el-form
          :model="ruleFormDepartment"
          :rules="rulesDepartment"
          ref="ruleFormDepartment"
          class="demo-ruleForm"
        >
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="ruleFormDepartment.name" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select
              ref="selectUpResId"
              v-model="queryParams_buMen.labelName"
              placeholder="选择所属部门"
              class="treeselect-main"
            >
              <el-option label="研发部" value="0" hidden></el-option>
              <el-tree
                :data="deptOptions"
                :props="defaultProps"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                @node-click="handleNodeClick_buMen"
                :highlight-current="true"
                :current-node-key="currentKey"
              >
              </el-tree>
            </el-select>
          </el-form-item>
          <el-form-item label="部门负责人">
            <el-select
              v-model="ruleFormDepartment.two"
              placeholder="选择部门负责人"
            >
              <el-option label="小杨哥" value="0" hidden></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="department-box-bottom">
          <el-button @click="departmentVisible = false">取 消</el-button>
          <el-button type="primary" @click="departmentVisible = false"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 编辑成员信息 -->
    <el-dialog width="690px" :visible.sync="editVisible" :show-close="false">
      <div class="department-box">
        <div class="department-box-header">
          <div>编辑成员信息</div>
          <i class="el-icon-close" @click="editVisible = false"></i>
        </div>
        <div class="dialog_right_form">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="登录用户名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入登录用户名"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="手机号" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="所属部门">
                    <el-select
                      ref="selectUpResId"
                      v-model="queryParams_buMen.labelName"
                      placeholder="选择部门"
                      class="treeselect-main"
                    >
                      <el-option label="研发部" value="0" hidden></el-option>
                      <el-tree
                        :data="deptOptions"
                        :props="defaultProps"
                        :expand-on-click-node="false"
                        :check-on-click-node="true"
                        @node-click="handleNodeClick_buMen"
                        :highlight-current="true"
                        :current-node-key="currentKey"
                      >
                      </el-tree>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职位">
                    <el-select
                      ref="selectUpResId"
                      v-model="queryParams_zhiWei.labelName"
                      placeholder="选择职位"
                      class="treeselect-main"
                    >
                      <el-option label="研发部" value="0" hidden></el-option>
                      <el-tree
                        :data="deptOptions"
                        :props="defaultProps"
                        :expand-on-click-node="false"
                        :check-on-click-node="true"
                        @node-click="handleNodeClick_zhiWei"
                        :highlight-current="true"
                        :current-node-key="currentKey"
                      >
                      </el-tree>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="性别">
                    <el-select v-model="ruleForm.sex" placeholder="选择性别">
                      <el-option label="男" :value="0"> </el-option>
                      <el-option label="女" :value="1"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工号">
                    <el-input
                      v-model="ruleForm.name"
                      placeholder="请输工号（支持英文），数字和特殊符号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        <div class="department-box-bottom">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editVisible = false"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 设置成员密码 -->
    <el-dialog width="690px" :visible.sync="passwordVisible" :show-close="false">
      <div class="department-box">
        <div class="department-box-header">
          <div>设置成员密码</div>
          <i class="el-icon-close" @click="passwordVisible = false"></i>
        </div>
        <div class="dialog_right_form">
            <el-form
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item label="密码">
                <el-input v-model="memberPassword" placeholder="请输入成员密码"></el-input>
              </el-form-item>
            </el-form>
          </div>
        <div class="department-box-bottom">
          <el-button @click="passwordVisible = false">取 消</el-button>
          <el-button type="primary" @click="passwordVisible = false"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 添加成员 -->
    <add-member ref="meberRef"></add-member>
  </div>
</template>

<script>
import PaginationBase from "../../../components/PaginationBase.vue";
import addMember from "./components/addMember.vue";
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
      dialogArray: ["单个添加", "快速添加", "链接邀请"],
      dialogActive: 0,
      ruleForm: {
        name: "",
        sex: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        //树型组件数据结构
        children: "children",
        label: "label",
      },
      selectUpResId: null,
      queryParams_buMen: {
        //部门表单项
        labelName: "",
      },
      queryParams_zhiWei: {
        //职位表单项
        labelName: "",
      },
      currentKey: 1,
      deptOptions: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ], //树型菜单数据
      continue_checked: true, //继续添加下一条
      formInputArray: [""], //快速添加
      linkActive: 0,
      linkValue: "http://127.0.0.1/", //链接value
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      tableData: [{ name: "小杨哥", phone: "13261107791" }],
      departmentVisible: false, //部门弹出框
      //新建部门表单
      ruleFormDepartment: {
        name: "", //部门名称
        one: 0, //所属部门
        two: 0, //部门负责人
      },
      rulesDepartment: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
      },
      //编辑成员
      editVisible:false,
      passwordVisible:false,  //成员密码
      memberPassword:"",  //成员密码
    };
  },
  created() {
    // getMonitorTree
  },
  components: {
    PaginationBase,
    addMember
  },
  methods: {
    //获取所属部门数据
    // getMonitorTree() {},
    handleNodeClick_buMen(data) {
      this.queryParams_buMen.labelName = data.label;
      this.$refs.selectUpResId.blur(); //选中后隐藏下拉框
    },
    handleNodeClick_zhiWei(data) {
      this.queryParams_zhiWei.labelName = data.label;
      this.$refs.selectUpResId.blur(); //选中后隐藏下拉框
    },
    callFather(val) {
      console.log("触发callFather");
    },
    // 删除
    handleDelete() {
      this.$confirm("确定要移除选中的成员吗?", "移除成员", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //点击编辑
    departmentEdit(){
      this.editVisible = true;
    },
    //添加成员
    handleAddMember(){
      // console.log(this.$refs.meberRef)
      this.$refs.meberRef.dialogVisible = true;
    }
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
.department-box{
  .department-box-header{
    padding: 20px 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
  }
  .el-form{
    padding: 0px 24px !important;
  }
  .department-box-bottom{
    padding: 20px 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
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
    cursor: pointer;
  }
  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
}
/deep/ .el-dialog__header {
  padding: 0px !important;
}
/deep/ .el-dialog__body {
  padding: 0px !important;
}
/deep/ .el-input-group__append {
  background: #fff;
}
.el-select {
  width: 100%;
}
.dialog-box {
  width: 100%;
  height: auto;
  background: #ffffff;
  display: flex;
  .dialog_left {
    width: 240px;
    height: 576px;
    border-right: 1px solid #ebebeb;
    padding: 20px 16px;
    box-sizing: border-box;
    .dialog_left_title {
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      margin-bottom: 20px;
    }
    .dialog_left_item {
      width: 100%;
      padding: 14px 16px;
      box-sizing: border-box;
      border-radius: 10px 10px 10px 10px;
      color: #000000;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
    }
    .dialog_left_item.active {
      color: #3363f6;
      background: #ebf1ff;
    }
  }
  .dialog_right {
    width: calc(100% - 240px);
    height: 576px;
    position: relative;
    .dialog_right_title {
      width: 100%;
      padding: 20px 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f2f2f2;
      div {
        font-weight: 600;
        font-size: 16px;
        color: #000000;
      }
    }
    .dialog_right_form {
      width: 100%;
      height: 456px;
      overflow: auto;
      padding: 24px;
      box-sizing: border-box;
      .form_item_title {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 16px;
      }
      .form_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
        .el-input {
          width: calc(100% - 24px - 20px);
        }
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
      .addInput {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3363f6;
        font-weight: bold;
        font-size: 14px;
        color: #3363f6;
        line-height: 32px;
        width: 110px;
        border: 1px solid #3363f6;
        border-radius: 8px 8px 8px 8px;
        margin-top: 24px;
        cursor: pointer;
        i {
          font-weight: bold;
        }
        div {
          margin-left: 4px;
        }
      }
    }
    .dialog_link_top {
      display: flex;
      div {
        margin-right: 30px;
        cursor: pointer;
      }
      .active {
        color: #3363f5 !important;
      }
    }
    .dialog_right_link {
      padding: 24px;
      width: 100%;
      height: 456px;
      box-sizing: border-box;
      .dialog_link_box_title {
        font-weight: 500;
        font-size: 14px;
        color: #000000;
        margin-bottom: 16px;
      }
      .input_append {
        width: 100%;
        display: flex;
        align-content: center;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        div {
          font-weight: 500;
          font-size: 14px;
          color: #000000;
        }
      }
    }
    .dialog_right_bottom {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0px 24px;
      box-sizing: border-box;
      position: absolute;
      bottom: 20px;
      > div:last-child {
        display: flex;
        .btn {
          width: 88px;
          line-height: 32px;
          text-align: center;
          border-radius: 8px 8px 8px 8px;
          background: #ffffff;
          border: 1px solid #e6e6e6;
          font-weight: bold;
          font-size: 14px;
          color: #000000;
          cursor: pointer;
        }
        .btn:last-child {
          margin-left: 8px;
          background: #3363f6;
          border-color: #3363f6;
          color: #ffffff;
        }
      }
    }
  }
}
.main-child {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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