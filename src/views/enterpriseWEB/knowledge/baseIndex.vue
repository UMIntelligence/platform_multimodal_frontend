<template>
  <div class="main">
    <nav>
      <img
        src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xc/com/message_center/Group 427318874.png"
        alt=""
      />
      <div>xxxx科技公司</div>
    </nav>
    <div class="top">
      <div class="top-row">
        <div class="title-nav">
          <div>知识库</div>
          <div>知识库支持上传文本、图片和视频，并用于AI智能体的训练</div>
        </div>
        <div class="content">
          <div
            class="content_box"
            v-for="(item, index) in topData"
            :key="index"
            @click="handleDetail(item)"
          >
            <div>
              <img :src="item.image" alt="" />
              <div>{{ item.title }}</div>
            </div>
            <img
              src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/vuesax_linear_arrow-right@2xaa.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="top-row">
        <div class="title">新建知识库</div>
        <div class="content">
          <div class="content_box" @click="dialogFormVisible = true">
            <div>
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319938@2xasd.png"
                alt=""
              />
              <div>新建知识库</div>
            </div>
          </div>
          <div
            class="content_box"
            @click="$router.push('/enterpriseWEB/createBase')"
          >
            <div>
              <img
                src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319938@2xasd.png"
                alt=""
              />
              <div>新建企业私有知识库</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container-top">
        <div class="title">最近访问</div>
        <div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </div>
      </div>
      <div class="container-content">
        <el-tabs v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="企业" name="1"></el-tab-pane>
          <el-tab-pane label="部门" name="2"></el-tab-pane>
          <el-tab-pane label="我的" name="3"></el-tab-pane>
        </el-tabs>
        <div class="container_c_father">
          <el-table
            :data="tableData"
            :header-cell-style="{ background: '#F6F6F6' }"
            style="width: 100%"
          >
            <el-table-column prop="file_name" label="名称"></el-table-column>
            <el-table-column prop="user_name" label="创建人"></el-table-column>
            <el-table-column prop="phone" label="手机号"> </el-table-column>
            <el-table-column prop="address" label="创建时间">
              <template slot-scope="scope">
                {{dayjs(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")}}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="更新时间"> 
              <template slot-scope="scope">
                {{dayjs(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss")}}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.vector_style == 1">官网内容库</span>
                <span v-else-if="scope.row.vector_style == 2">图片知识库</span>
                <span v-else-if="scope.row.vector_style == 3">文档知识库</span>
                <span v-else-if="scope.row.vector_style == 4">网址知识库</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="所属">
              <template slot-scope="scope">
                 <el-tag v-if="scope.row.belong == 1">企业</el-tag>
                 <el-tag v-else-if="scope.row.belong == 2">部门</el-tag>
                 <el-tag v-else-if="scope.row.belong == 3">我的</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="160px">
              <template slot-scope="scope">
                <el-button type="text" @click="handleLook(scope.row)">查看</el-button>
                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="container_c_bottom">
          <PaginationBase
            v-bind:child-msg="pageparm"
            @callFather="callFather"
          ></PaginationBase>
        </div> 
      </div>
    </div>
    <!-- 创建知识库 -->
    <el-dialog
      title="新建知识库"
      width="590px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="所属" prop="belong">
          <el-select
            v-model="ruleForm.belong"
            placeholder="请选择所属公司/部门"
            class="select_W"
          >
            <el-option label="企业" value="1"></el-option>
            <el-option label="部门" value="2"></el-option>
            <el-option label="我的" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="知识库名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入知识库名称"
            show-word-limit
            maxlength="255"
          ></el-input>
        </el-form-item>
        <el-form-item label="可见范围" prop="view_range">
          <el-select
            v-model="ruleForm.view_range"
            class="select_W"
            placeholder="请选择所属公司/部门"
          >
            <el-option label="私有" :value="1"></el-option>
            <el-option label="公开" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="vector_style">
          <el-select
            v-model="ruleForm.vector_style"
            placeholder="请选择知识库类型"
            class="select_W"
          >
            <el-option label="官网内容库" :value="1"></el-option>
            <el-option label="图片知识库" :value="2"></el-option>
            <el-option label="文档知识库" :value="3"></el-option>
            <el-option label="网址知识库" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            v-model="ruleForm.description"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PaginationBase from "../../../components/PaginationBase.vue";
import { getVector, createBase,deleteFolder,editFolder } from "@/api/enterprise";
import dayjs from "dayjs";
export default {
  name: "knowledgeBase_index",
  data() {
    return {
      topData: [
        {
          title: "深圳xxxx公司",
          image:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319934@2x.png",
          id: 1,
        },
        {
          title: "所属部门-运营部",
          image:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319937@2x.png",
          id: 2,
        },
        {
          title: "我的知识库",
          image:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427319125@2x (1).png",
          id: 3,
        },
      ],
      dayjs,
      input2: "", //搜索框value
      activeName: "0",
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 7,
        total: 10,
      },
      tableData: [], //列表数据
      dialogFormVisible: false,
      ruleForm: {
        belong: "", //所属
        name: "", //知识库名称
        view_range: "", //可见范围
        vector_style: "", //类型
        description: "", //描述
      },
      rules: {
        belong: [
          { required: true, message: "请选择所属公司/部门", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入知识库名称", trigger: "blur" },
        ],
        view_range: [
          { required: true, message: "请选择可见范围", trigger: "change" },
        ],
        vector_style: [
          { required: true, message: "请选择知识库类型", trigger: "change" },
        ],
      },
      userInfo: null, //用户信息
    };
  },
  components: {
    PaginationBase,
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.init();
  },
  methods: {
    // 获取向量库数据
    init() {
      // this.userInfo["user_id"]
      let user_id = this.userInfo.user_id; //获取用户ID
      let requestData = {
        authority: null, //权限
        belong: parseInt(this.activeName), //分类
        file_name: this.input2, //文件夹
        user_id, //用户ID
        exist_vector: 1, //上级ID
        folder_id: 0, //文件夹ID
        page_size:this.pageparm.pageSize,
        page:this.pageparm.currentPage
      };
      if (this.activeName == 0) delete requestData.belong; //"全部"不传分类字段
      getVector(requestData).then((res) => {
        this.pageparm.total = res.total;
        this.tableData = res.data;
      });
    },
    callFather(val) {
      console.log(val,"触发callFather");
      this.pageparm.currentPage = val.currentPage;
      this.init()
    },
    //点击权限分类
    handleTabsClick(val) {
      console.log("触发handleTabsClick");
      this.init()
    },
    //进入详情页面
    handleDetail(val) {
      this.$router.push(`/enterpriseWEB/knowledge/baseDetail?id=${val.id}`);
    },
    //查看
    handleLook({vector_style,belong}){
      if(vector_style == '2')this.$router.push('/enterpriseWEB/knowledge/imageDetail' + `?id=${belong}`)
      else if(vector_style == '4')this.$router.push('/enterpriseWEB/knowledge/websiteDetail' + `?id=${belong}`)
      else if(vector_style == '3') this.$router.push('/enterpriseWEB/knowledge/documentDetail' + `?id=${belong}`)
      else if(vector_style == '1') this.$router.push('/enterpriseWEB/knowledge/enterprise_Information' + `?id=${belong}`)
    },
    //新建知识库
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let user_id = this.userInfo.user_id;
          let requestData = {
            authority: null, //权限
            file_name: this.ruleForm.name, //向量库名称
            vector_style: this.ruleForm.vector_style, //知识库类型
            index_model: null, //	索引模型
            vector_model: null, //文件处理模型
            parent_id: 0, //上一级ID
            user_id, //用户ID
            belong: parseInt(this.ruleForm.belong), //所属
            view_range: parseInt(this.ruleForm.view_range), //可见范围
            description: this.ruleForm.description, //描述
            exist_vector: 1,
          };
          createBase(requestData).then((res) => {
            if (res.code == 20000) {
              this.dialogFormVisible = false;
              this.$message.success('创建成功！');
              this.ruleForm = {
                belong: "", //所属
                name: "", //知识库名称
                view_range: "", //可见范围
                vector_style: "", //类型
                description: "", //描述
              }
              this.init()
              // let vector_style = this.ruleForm.vector_style;
              // if (vector_style == 0)
              //   this.$router.push("/enterpriseWEB/createBase");
              // else if (vector_style == 1)
              //   this.$router.push(
              //     "/enterpriseWEB/knowledge/imageDetail" +
              //       `?id=${this.ruleForm.belong}`
              //   );
              // else if (vector_style == 2)
              //   this.$router.push(
              //     "/enterpriseWEB/knowledge/websiteDetail" +
              //       `?id=${this.ruleForm.belong}`
              //   );
              // else if (vector_style == 3)
              //   this.$router.push(
              //     "/enterpriseWEB/knowledge/documentDetail" +
              //       `?id=${this.ruleForm.belong}`
              //   );
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑
    handleEdit(item){
      this.$prompt('请输入知识库名称', '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入知识库名称'
        }).then(({ value }) => {
          let user_id = this.userInfo.user_id;
          let requestData = {
            user_id,
            parent_id:item.folder_id,
            file_name:value,
            folder_id:item.folder_id,
            vector_style:item.vector_style,
            index_model:item.index_model,
            vector_model:item.vector_model,
            belong:this.$route.query.id,
            view_range:item.view_range,
            description:item.description,
          }
          editFolder(requestData).then(res => {
            this.$message.success("编辑成功！");
            this.init()
          })
        }).catch(() => {});
    },
    //删除知识库
    handleDelete({folder_id}){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFolder({folder_id}).then(res => {
          if(res.code = '20000'){
            this.$message.success("删除成功!");
            this.init()
          }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
  },
};
</script>

<style lang="scss" scoped>
.select_W {
  width: 100% !important;
}
.popover {
  border-radius: 4px;
  box-shadow: 0px 5px 20px 0px rgba(51, 51, 51, 0.05);
  z-index: 100;
  > div {
    padding: 8px 0px;
    background: rgb(253, 253, 253);
    // text-align: center;
  }
  > div:first-child {
    border-bottom: 1px solid #ccc;
  }
}
.main {
  width: 100%;
  box-sizing: border-box;
  nav {
    width: 100%;
    padding: 16px 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    img {
      width: 24px;
      height: auto;
    }
    div {
      font-weight: 400;
      font-size: 14px;
    }
  }
  .title-nav > div:first-child {
    font-weight: 600;
    font-size: 16px;
    color: #000000;
  }
  .title-nav > div:last-child {
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    margin-top: 4px;
  }
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    margin-bottom: 16px;
  }
  .top {
    width: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
    .top-row {
      width: 100%;
      margin-top: 20px;
      .content {
        width: 100%;
        display: flex;
        margin-top: 16px;
        .content_box {
          width: 300px;
          padding: 24px 20px;
          box-sizing: border-box;
          border: 1px solid #f2f2f2;
          border-radius: 10px 10px 10px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          position: relative;
          top: 0px;
          box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0);
          transition: all 0.6s;
          margin-right: 20px;
          > div:first-child {
            display: flex;
            align-items: center;
            font-family: PingFang SC, PingFang SC;
            img {
              width: 32px;
              margin-right: 8px;
            }
          }
          > img {
            width: 16px;
            height: 16px;
            opacity: 0;
            transition: all 0.6s;
          }
        }
        .content_box:hover {
          box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.04);
          top: -10px;
          > img {
            width: 16px;
            height: 16px;
            opacity: 1;
          }
        }
      }
    }
  }
  .container {
    width: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
    .container-top {
      margin-top: 20px;
      > div:last-child {
        width: 320px;
        margin-bottom: 10px;
      }
    }
    .container-content {
      width: 100%;
      .container_c_father {
        width: 100%;
      }
    }
  }
}
</style>
