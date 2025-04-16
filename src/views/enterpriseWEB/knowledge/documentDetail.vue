<template>
  <div class="main">
    <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
    <div class="top">
      <div class="top_T">
        <div class="top_T_left">
          <img
            :src="httpUrls.ossUrl + 'xcx/com/message_center/Group_427319934@2x (2).png'"
            alt=""
          />
          <div>
            <div>产品知识库</div>
            <div>文档知识库支持上传文档，并用于AI智能体的训练</div>
          </div>
        </div>
        <div class="top_T_right">
          <el-upload
            class="upload-demo"
            :on-success="handleImageSuccess"
            :on-change="handleImageChange"
            :data="requestMiniCode"
            :action="httpUrls.ossUrl"
            :show-file-list="false"
          >
            <div class="upload-btn">
              <img
                :src="
                  httpUrls.ossUrl +
                  'xcx/com/message_center/vuesax_linear_export@2x.png'
                "
                alt=""
              />
              <div>上传内容</div>
            </div>
          </el-upload>
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
      <el-tabs style="margin-top: 10px;" v-model="activeName" @tab-click="handleTabsClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="文档" name="second"></el-tab-pane>
          <el-tab-pane label="上传文件" name="third"></el-tab-pane>
        </el-tabs>
        <div class="container-table">
          <el-table :data="tableData"  :header-cell-style="{'background':'#F6F6F6'}" style="width: 100%">
            <el-table-column prop="date" label="名称"></el-table-column>
            <el-table-column prop="name" label="创建人"></el-table-column>
            <el-table-column prop="address" label="手机号"> </el-table-column>
            <el-table-column prop="address" label="创建时间"> </el-table-column>
            <el-table-column prop="address" label="更新时间"> </el-table-column>
            <el-table-column prop="address" label="类型"> </el-table-column>
            <el-table-column prop="address" label="所属"> </el-table-column>
            <el-table-column prop="address" label="操作" width="170">
              <template slot-scope="scope">
                <el-button type="text" @click="handleLook">查看</el-button>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
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
export default {
  name: "documentDetail",
  data() {
    return {
      httpUrls,
      requestMiniCode: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "Enterprise_customization-role_list",
      },
      searchInput:'',
      tableData:[{}],
      activeName:"first",
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      navArray:[],
      navId:null,
      folder_id:1
    };
  },
  mounted(){
    if(!this.$route.query){
      return
    }
    this.navId = this.$route.query.id
    if(this.navId == 1) this.navArray = ['企业','产品知识库'];
    else if(this.navId == 2)this.navArray = ['部门','产品知识库'];
    else this.navArray = ['我的','产品知识库'];
  },
  methods: {
    // 获取向量库数据
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
    handleImageChange(file) {
      this.requestMiniCode.image = file.raw;
      this.requestMiniCode.image_name = file.name;
    },
    handleImageSuccess(response, file) {
      console.log(response.data.new_url, "成功图片");
    },
    handleTabsClick(val){
      console.log('触发handleTabsClick')
    },
    //查看
    handleLook(){
      this.$router.push('/enterpriseWEB/knowledge/documentPreview'+`?id=${this.navId}`)
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
        .upload-btn {
          display: flex;
          padding: 10px 15px;
          box-sizing: border-box;
          height: 40px;
          background: #3363f6;
          border-radius: 8px 8px 8px 8px;
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