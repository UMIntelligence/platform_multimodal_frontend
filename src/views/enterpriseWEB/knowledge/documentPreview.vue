<template>
  <div class="main">
    <EnterpriseNav :itemArray="navArray"></EnterpriseNav>
    <div class="container">
      <div class="left">
        <div class="left-top">
          <div>
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input2"
            >
            </el-input>
          </div>
          <img
            :src="httpUrls.ossUrl + 'xcx/com/message_center/Subtract@2x.png'"
            alt=""
          />
        </div>
        <div class="left-content">
          <div class="left-list">
            <div class="left-box active">
              <img :src="defaultIcon" alt="">
              <div>文档1</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-content" v-loading="loading" element-loading-text="文件加载中...">
          <VueOfficePdf v-if="fileType == 'pdf'" :src="fileUrl" @rendered="rendered"></VueOfficePdf>
          <VueOfficeDocx v-else-if="fileType == 'docx'" :src="fileUrl" @rendered="rendered"></VueOfficeDocx>
          <VueOfficeExcel v-else-if="fileType == 'excel'" :src="fileUrl" @rendered="rendered"></VueOfficeExcel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnterpriseNav from "../../../components/enterprise_nav.vue";
import httpUrls from "../../../api/requestURL";
//引入VueOfficeDocx组件
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
// import '@vue-office/docx/lib/index.css'
// import '@vue-office/excel/lib/index.css'
// import '@vue-office/pdf/lib/index.css'


export default {
  name: "documentPreview",
  data() {
    return {
      httpUrls,
      menuIndex: "",
      activeIcon:httpUrls.ossUrl + "xcx/com/message_center/Files__ File Document@2x.png",
      defaultIcon: httpUrls.ossUrl + "xcx/com/message_center/Files__ File Document@2x (1).png",
      input2: "",
      fileUrl:httpUrls.ossUrl + 'message_center/5555.docx',
      fileType:null,
      loading: true,
      navArray:[],
      navId:null,
    };
  },
  mounted(){
    this.fileType = this.fileUrl.split('.').pop();
    if(!this.$route.query){
      return
    }
    this.navId = this.$route.query.id;
    if(this.navId == 1) this.navArray = ['企业','产品知识库','需求文档'];
    else if(this.navId == 2)this.navArray = ['部门','产品知识库','需求文档'];
    else this.navArray = ['我的','产品知识库','需求文档'];
  },
  methods: {
    //选中菜单项
    selectMenu(index, indexPath) {
      this.menuIndex = index;
      this.init();
    },
    rendered() {
      console.log('渲染完成')
      this.loading = false
    },
  },
  components: {
    EnterpriseNav,
    VueOfficeDocx,
    VueOfficePdf,
    VueOfficeExcel
  },
};
</script>

<style lang="scss" scoped>
/deep/ .vue-office-pdf-wrapper{
  background-color: rgba(0, 0, 0, 0) !important;
}
/deep/ canvas{
  width: 100% !important;
}
.main {
  width: 100%;
  min-height: 100%;
  border-left: 1px solid #ebebeb;
  box-sizing: border-box;
  overflow: hidden;
  .container {
    width: 100%;
    height: calc(100% - 57px);
    display: flex;
    .left {
      width: 240px;
      height: 100%;
      padding: 17px 10px;
      box-sizing: border-box;
      .left-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        box-sizing: border-box;
        gap: 8px;
        img{
          width: 26px;
          height: 26px;
          cursor: pointer;
        }
      }
      .left-content{
        width: 100%;
        height: calc(100% - 40px);
        padding: 20px 10px;
        box-sizing: border-box;
        overflow-y: auto;
        .left-box{
          width: 100%;
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 8px 8px 8px 8px;
          font-weight: bold;
          font-size: 14px;
          color: #000000;
          padding: 9px 8px;
          box-sizing: border-box;
          cursor: pointer;
          img{
            width: 24px;
            height: 24px;
          }
        }
        .left-box:hover{
          background: rgb(204,204,204);
        }
        .left-box.active{
          background: #F3F7FF !important;
          color: #3363F6 !important;
        }
      }
      // .el-menu-vertical-demo {
      //   width: 100% !important;
      // }
      // /deep/ .el-submenu__title {
      //   border-radius: 4px;
      // }
      // .el-submenu-title {
      //   display: flex;
      //   align-items: center;
      //   border-radius: 4px;
      //   span {
      //     color: #1f64ff;
      //     font-size: 14px;
      //     font-weight: bold;
      //     margin-left: 6px;
      //   }
      //   img {
      //     width: 24px;
      //     height: 24px;
      //   }
      // }
      // .el-menu-item {
      //   display: flex;
      //   justify-content: flex-end;
      // }
      // .menu-item-box {
      //   width: calc(100% - 20px);
      //   height: 100%;
      //   // display: flex;
      //   // justify-content: space-between;
      // }
    }
    .right {
      width: calc(100% - 240px);
      height: 100%;
      background: #f6f8fa;
      overflow: auto;
      padding: 40px 0px;
      box-sizing: border-box;
      .right-content {
        width: 85%;
        margin: auto;
        // height: 1000px;
        min-height: 100%;
        background-color: #fff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.03);
        border-radius: 20px 20px 20px 20px;
        border: 1px solid #f0f0f0;
        padding: 60px;
        box-sizing: border-box;
      }
    }
  }
}
</style>