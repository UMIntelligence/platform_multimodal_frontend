<template>
  <div class="main">
    <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
    <div class="top">
      <div class="top_T">
        <div class="top_T_left">
          <img
            :src="httpUrls.ossUrl + 'xcx/com/message_center/Group_427319934@2x (3).png'"
            alt=""
          />
          <div>
            <div>网址知识库</div>
            <div>网址知识库支持上传网址，网页的文字内容将用于AI智能体的训练</div>
          </div>
        </div>
        <div class="top_T_right">
          <div>
            <el-input
            placeholder="请输入内容"
            v-model="websiteInput"
          >
          </el-input>
          </div>
          <div class="upload-btn" @click="handleAddWebsite()">
            <img
              :src="
                httpUrls.ossUrl +
                'xcx/com/message_center/vuesax_linear_add@2x (1).png'
              "
              alt=""
            />
            <div>添加</div>
          </div>
        </div>
      </div>
      <div class="top_B">
        <div>
          <el-input
            placeholder="搜索要查找的功能"
            prefix-icon="el-icon-search"
            v-model="searchInput"
          >
          </el-input>
        </div>
        <div>查询</div>
      </div>
    </div>
    <div class="container">
        <!-- <el-tabs style="margin-top: 10px;" v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="文档" name="second"></el-tab-pane>
          <el-tab-pane label="上传文件" name="third"></el-tab-pane>
        </el-tabs> -->
        <div class="container-table">
          <el-table :data="tableData"  :header-cell-style="{'background':'#F6F6F6'}" style="width: 100%">
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
            <el-table-column prop="address" label="操作" width="170">
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
  </div>
</template>

<script>
import EnterpriseNav from "../../../components/enterprise_nav.vue";
import PaginationBase from "../../../components/PaginationBase.vue";
import httpUrls from "../../../api/requestURL";
import {getVector,uploadFolder,createFolder,deleteFolder,editFolder} from "@/api/enterprise";
import dayjs from "dayjs";
export default {
  name: "documentDetail",
  data() {
    return {
      dayjs,
      httpUrls,
      websiteInput:'',  //网址
      searchInput:"",
      tableData:[],
      activeName:"first",
      pageparm: {
        currentPage: 1,
        pageSize: 7,
        total: 10,
      },
      navArray:[],
      navId:null,
      folder_id:82, //文件夹ID
    };
  },
  mounted(){
    if(!this.$route.query){
      return
    }
    this.navId = parseInt(this.$route.query.id)
    if(this.navId == 1) this.navArray = ['企业','产品知识库'];
    else if(this.navId == 2)this.navArray = ['部门','产品知识库'];
    else this.navArray = ['我的','产品知识库'];
    this.init()
  },
  methods: {
    init(){
      let user_id = 1;
      let requestData = {
        file_name:this.searchInput,
        user_id,
        authority: null, //权限
        belong: this.navId, //分类
        exist_vector: 0, //知识库标识符
        parent_id: this.folder_id, //文件夹ID
        page_size:this.pageparm.pageSize,
        page:this.pageparm.currentPage
      };
      getVector(requestData).then(res => {
        if(res.code == 20000){
          this.tableData = res.data;
          this.pageparm.total = res.total;
        }
      })
    },
    callFather(val) {
      this.pageparm.currentPage = val.currentPage;
      this.init()
    },
    // 添加网址库数据
    handleAddWebsite(){
      let user_id = 1;
      let requestData = {
        user_id,
        parent_id:this.folder_id,
        vector_style:4, //网址库
        file_infos:[
          {
            web_path:this.websiteInput,
            file_name:this.websiteInput
          }
        ],
        belong:this.navId,
        vector_id:"vector_82"
      };
      uploadFolder(requestData).then(res => {
        if(res.code == 20000){
          this.$message.success("网址上传成功！");
          this.websiteInput = "";
          this.init();
        }
      })
    },
    //查看
    handleLook(row){
      window.open(row.file_name,"_blank")
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
            user_id,
            parent_id:item.parent_id,
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
    handleTime(val){
      //月份是从0月开始获取的，所以要+1;
      let month = new Date(val).getMonth() + 1;
      //日
      let day = new Date(val).getDate();
      //时
      let hour = new Date(val).getHours();
      //分
      let minute = new Date(val).getMinutes();
      //秒
      let second = new Date(val).getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;
      return date
    }
  },
  components: {
    EnterpriseNav,
    PaginationBase,
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
  .top {
    width: 100%;
    padding: 30px 50px;
    padding-bottom: 0px;
    box-sizing: border-box;
    .top_T {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top_T_left {
        display: flex;
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 10px;
        }
        > div {
          height: 48px;
          div:first-child {
            font-weight: 600;
            font-size: 16px;
            color: #000000;
          }
          div:last-child {
            font-weight: 400;
            color: #666666;
            font-size: 14px;
            margin-top: 6px;
          }
        }
      }
      .top_T_right {
        display: flex;
        >div:first-child{
          width: 320px;
          margin-right: 20px;
        }
        .upload-btn {
          display: flex;
          padding: 10px 15px;
          box-sizing: border-box;
          height: 40px;
          background: #3363f6;
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
            color: #ffffff;
          }
        }
      }
    }
    .top_B {
      display: flex;
      align-items: center;
      margin-top: 29px;
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
  }
  .container {
    width: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
  }
}
</style>