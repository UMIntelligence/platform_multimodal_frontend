<template>
    <!-- 添加成员 -->
    <el-dialog :visible.sync="dialogVisible" width="1040px" :show-close="false">
      <div class="dialog-box">
        <div class="dialog_left">
          <div class="dialog_left_title">添加成员</div>
          <div
            :class="
              dialogActive == index
                ? 'dialog_left_item active'
                : 'dialog_left_item'
            "
            @click="dialogActive = index"
            v-for="(item, index) in dialogArray"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="dialog_right">
          <div class="dialog_right_title">
            <div v-if="dialogActive == 0">单个添加</div>
            <div v-else-if="dialogActive == 1">快速添加</div>
            <div class="dialog_link_top" v-else>
              <div
                :class="linkActive == 0 ? 'active' : ''"
                @click="linkActive = 0"
              >
                链接邀请
              </div>
              <div
                :class="linkActive == 1 ? 'active' : ''"
                @click="linkActive = 1"
              >
                邀请记录
              </div>
            </div>
            <div class=""></div>
            <i class="el-icon-close" @click="dialogVisible = false"></i>
          </div>
          <div class="dialog_right_form" v-if="dialogActive == 0">
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
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="邮箱或手机号" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入邮箱或手机号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="初始密码" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入初始密码"></el-input>
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
          <div class="dialog_right_form" v-if="dialogActive == 1">
            <div class="form_item_title">手机号</div>
            <el-input
              v-model="formInputArray[0]"
              placeholder="请输入手机号"
            ></el-input>
            <template v-if="formInputArray.length > 1">
              <div
                class="form_item"
                v-for="(item, index) in formInputArray.slice(1)"
                :key="index"
              >
                <el-input
                  v-model="formInputArray[index + 1]"
                  placeholder="请输入手机号"
                ></el-input>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'xcx/com/message_center/vuesax_linear_trash@2x (1).png'
                  "
                  @click="formInputArray.splice(index + 1, 1)"
                  alt=""
                />
              </div>
            </template>
            <div class="addInput" @click="formInputArray.push('')">
              <i class="el-icon-plus"></i>
              <div>添加</div>
            </div>
          </div>
          <!-- 链接邀请 -->
          <div class="dialog_right_link" v-if="dialogActive == 2">
            <div class="dialog_link_box" v-if="linkActive == 0">
              <div class="dialog_link_box_title">链接邀请</div>
              <el-input
                placeholder="请输入内容"
                :disabled="true"
                v-model="linkValue"
              >
                <template slot="append">
                  <div class="input_append">
                    <img
                      :src="
                        httpUrls.ossUrl +
                        'xcx/com/message_center/Group_427320305@2xrigd.png'
                      "
                      alt=""
                    />
                    <div>复制</div>
                  </div>
                </template>
              </el-input>
            </div>
            <div class="dialog_link_box" v-else>
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
                <el-table-column prop="name" label="用户姓名"></el-table-column>
                <el-table-column
                  prop="phone"
                  label="用户手机号"
                ></el-table-column>
                <el-table-column prop="address" label="加入时间" sortable>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="dialog_right_bottom" v-if="linkActive == 0">
            <el-checkbox v-if="dialogActive == 0" v-model="continue_checked"
              >继续添加下一条</el-checkbox
            >
            <div></div>
            <div>
              <div class="btn" @click="dialogVisible = false">取消</div>
              <div class="btn" @click="dialogVisible = false">确定</div>
            </div>
          </div>
          <div v-else>
            <PaginationBase
              v-bind:child-msg="pageparm"
              @callFather="callFather"
            ></PaginationBase>
          </div>
        </div>
      </div>
    </el-dialog>
</template>

<script>
import PaginationBase from "../../../../components/PaginationBase.vue";
import httpUrls from "@/api/requestURL";
export default {
  data(){
    return {
      httpUrls,
      dialogVisible:false,
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
    }
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
   },
  components:{
    PaginationBase
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header{
  padding: 0px !important;
}
/deep/ .el-dialog__body{
  padding: 0px !important;
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
</style>