<template>
  <div class="main">
      <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
      <div class="top">
        <div class="top_left">
          <div>{{navId == 1?'企业':navId == 2?'部门':'我的'}}知识库</div>
          <div>知识库支持上传文本、图片和视频，并用于AI智能体的训练</div>
        </div>
        <div class="top_right" @click="dialogFormVisible = true">
          <i class="el-icon-plus"></i>
          <div>新建知识库</div>
        </div>
      </div>
      <div class="container">
        <div class="container-top">
          <div>
            <el-input
              placeholder="搜索要查找的功能"
              prefix-icon="el-icon-search"
              v-model="input2"
            >
            </el-input>
          </div>
          <div v-show="false">查询</div>
        </div>
        <el-tabs  v-if="this.navId == 2" style="margin-top: 10px;" v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部部门" name="first"></el-tab-pane>
          <el-tab-pane label="行政部" name="second"></el-tab-pane>
          <el-tab-pane label="商务部" name="third"></el-tab-pane>
        </el-tabs>
        <div class="container-table">
          <el-table
            :data="tableData"
            :header-cell-style="{ background: '#F6F6F6' }"
            style="width: 100%"
          >
            <el-table-column prop="file_name" label="名称"></el-table-column>
            <el-table-column prop="username" label="创建人"></el-table-column>
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
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                
                <el-button type="text" @click="handleLook(scope.row)">查看</el-button>

                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="container-bottom">
            <PaginationBase v-bind:child-msg="pageparm" @callFather="callFather"></PaginationBase>
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
import EnterpriseNav from "../../../components/enterprise_nav.vue";
import { getVector, createBase,deleteFolder,editFolder } from "@/api/enterprise";
import dayjs from "dayjs";
export default {
  name: "knowledge_base",
  data() {
    return {
      input2: "",
      dayjs,
      tableData:[],
      activeName:"first",
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 7,
        total: 10,
      },
      navArray:[],
      navId:null,
      ruleForm: {
        belong: "", //所属
        name: "", //知识库名称
        view_range: 1, //可见范围
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
      dialogFormVisible:false
    };
  },
  components: {
    PaginationBase,
    EnterpriseNav,
  },
  mounted(){
    if(!this.$route.query){
      return
    }
    this.navId = parseInt(this.$route.query.id);
    if(this.navId == 1) this.navArray = ['企业'];
    else if(this.navId == 2)this.navArray = ['所属部门'];
    else this.navArray = ['我的知识库'];
    this.init()
  },
  methods:{
    init(){
      // this.userInfo["user_id"]
      let user_id = 1; //获取用户ID
      let requestData = {
        belong: this.navId, //权限
        name: this.input2, //文件夹
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
    callFather({currentPage,pageSize}){
      this.pageparm.currentPage = currentPage;
      this.pageparm.pageSize = pageSize;
      this.init()
    },
    handleTabsClick(val){
      console.log('触发handleTabsClick');
      this.init()
    },
    //查看
    handleLook({vector_style}){
      if(vector_style == '2')this.$router.push('/enterpriseWEB/knowledge/imageDetail' + `?id=${this.navId}`)
      else if(vector_style == '4')this.$router.push('/enterpriseWEB/knowledge/websiteDetail' + `?id=${this.navId}`)
      else if(vector_style == '3') this.$router.push('/enterpriseWEB/knowledge/documentDetail' + `?id=${this.navId}`)
      else if(vector_style == '1') this.$router.push('/enterpriseWEB/knowledge/enterprise_Information' + `?id=${this.navId}`)
    },
  //新建知识库
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let requestData = {
            authority: null, //权限
            file_name: this.ruleForm.name, //向量库名称
            vector_style: this.ruleForm.vector_style, //知识库类型
            index_model: null, //	索引模型
            vector_model: null, //文件处理模型
            parent_id: 0, //上一级ID
            user_id: 1, //用户ID
            belong: this.ruleForm.belong, //所属
            view_range: parseInt(this.ruleForm.view_range), //可见范围
            description: this.ruleForm.description, //描述
            exist_vector: 1,
          };
          createBase(requestData).then((res) => {
            if (res.code == 20000) {
              this.ruleForm = {
                belong: "", //所属
                name: "", //知识库名称
                view_range: "", //可见范围
                vector_style: "", //类型
                description: "", //描述
              }
              this.dialogFormVisible = false;
              this.$message.success('创建成功！');
              this.init();
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
  handleEdit(item){
      this.$prompt('请输入知识库名称', '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入知识库名称'
        }).then(({ value }) => {
          let user_id = 1;
          let requestData = {
            user_id:1,
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建'
          });       
        });
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
  }
};
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
.main {
  width: 100%;
  box-sizing: border-box;
  .top {
    width: 100%;
    padding: 22px 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_left > div:first-child {
      font-weight: 600;
      font-size: 16px;
      color: #000000;
    }
    .top_left > div:last-child {
      font-weight: 400;
      font-size: 14px;
      color: #666666;
      margin-top: 4px;
    }
    .top_right {
      width: 140px;
      padding: 9px 0px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #1a52ff;
      border-radius: 8px 8px 8px 8px;
      cursor: pointer;
      > div:last-child {
        margin-left: 5px;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
  .container {
    width: 100%;
    padding: 0px 50px;
    margin-top: 8px;
    box-sizing: border-box;
    .container-top {
      display: flex;
      align-items: center;
      > div:first-child {
        width: 320px;
      }
      > div:last-child {
        line-height: 40px;
        padding: 0px 16px;
        margin-left: 10px;
        background: #3363f6;
        border-radius: 8px 8px 8px 8px;
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
    }
    .container-table{
      margin-top: 10px;
    }
    .container-bottom{
      margin-top: 20px;
    }
  }
}
</style>