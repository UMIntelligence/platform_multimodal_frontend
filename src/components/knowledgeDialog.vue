<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="460px">
    <div v-if="type != 0 && type != 4">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="data.group_id?'分组名称':data.menuIndex?'分组名称':(knowledgeLabel=='文档库'?'文件名称':'网址')">
          <el-input :disabled="type == 2" v-model="form.name" placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item label="分组描述">
          <el-input v-model="form.desc" :placeholder="type == 3 || type == 1?'请输入分组描述':''"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="delete-box" v-else>
      <i class="el-icon-warning" style="font-size: 18px;color: rgb(222, 160, 84);"></i>
      <div>是否删除【{{data.group_name}}】？<span>删除后将无法恢复数据</span></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { deleteModel,editModel,deleteDocument,editDocument,deleteWebsite,editWebsite,deleteImage,editImage } from "../api/knowledge";
export default {
  name: "knowledge-dialog",
  data() {
    return {
      dialogVisible: false,
      // title: "创建分组",
      form:{
        name:'',
        desc:''
      }
    };
  },
  props:{
    type: {   //类型：0删除，1添加，2编辑，3编辑分组，4删除分组
      type: Number,
      default: 2,
    },
    title: {  //弹出框标题
      type: String,
      default: 4,
    },
    data: {  //分组ID...
      type: Object,
      default: {},
    },
  },
  watch:{
    dialogVisible: {
      deep: true,
      handler() {
        if (this.dialogVisible && (this.type == 3  || this.type == 2)) { //编辑
          this.$set(this.form,'desc',this.data.group_desc)
          this.$set(this.form,'name',this.data.group_name)
        }
        if(!this.dialogVisible && (this.type == 1 || this.type == 3 || this.type == 4)){
          this.$emit('menu')
        }
        if(!this.dialogVisible){
          this.form = {
            name:'',
            desc:''
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(["knowledgeLabel"]),
  },
  methods: {
    handleSubmit() {
      if(this.type == 0 || this.type == 4){
        this.knowledgeDelete()  //知识库删除
      }else if(this.type == 2 || this.type == 3){
        this.knowledgeEdit()    //知识库编辑
      }else{
        this.knowledgeCreated()
        // console.log(this.data,'创建')
      }
    },
    knowledgeEdit(){//文档库/网址库编辑
      if (this.knowledgeLabel == '文档库') {
        let requestData;
        if (this.type == 3) { //编辑分组
          requestData = {
            user_id:this.data.user_id,
            group_id:this.data.group_id,
            group_name:this.form.name,
            group_desc:this.form.desc
          }
        } else {  //编辑表格
          requestData = {
            user_id:this.data.user_id,
            file_desc:this.form.desc,
            file_id:this.data.file_id
          }
        }
        //判断编辑分组
        if (this.type == 3 && this.data.menuStatus == 0) {
          let obj = {
            groupName:this.form.name,
            groupDesc:this.form.desc
          }
          localStorage.setItem('menuDocument',JSON.stringify(obj))
          this.$emit('menu')
          this.$message.success('编辑成功！')
          this.dialogVisible = false
          return
        }
        // console.log(requestData,'文档编辑数据')
        editDocument(requestData).then(res => {
          if (res.code == 20000) {  
            this.$message.success('编辑成功！')
            this.dialogVisible = false;
            if (this.type == 2) {
              this.$emit('data')
            }else{
              this.$emit('menu')
            }
          }else{
            this.$message.error(res.msg)
          }
        })
      }else if(this.knowledgeLabel == '网址库'){
        let requestData;
        //判断是分组编辑还是表格编辑
        if (this.type == 3) { //编辑分组
          requestData = {
            user_id:this.data.user_id,
            group_id:this.data.group_id,
            group_name:this.form.name,
            group_desc:this.form.desc
          }
        } else {  //编辑表格
          requestData = {
            user_id:this.data.user_id,
            url_title:this.form.desc,
            url_id:this.data.url_id
          }
        }
        //判断是否编辑本地分组栏，进入则修改本地存储
        if (this.type == 3 && this.data.menuStatus == 0) {
          let obj = {
            groupName:this.form.name,
            groupDesc:this.form.desc
          }
          localStorage.setItem('menuWebsite',JSON.stringify(obj))
          this.$message.success('编辑成功！')
          this.dialogVisible = false;
          this.$emit('menu')
          return
        }
        editWebsite(requestData).then(res => {
          if(res.code == 20000){
          this.$message.success('编辑成功！')
          this.dialogVisible = false;
            this.$emit('data')
          }else{
            this.$message.error(res.msg)
          }
        })
      }else if(this.knowledgeLabel == '图片库'){
        //判断是否编辑本地分组栏，进入则修改本地存储
        if (this.type == 3 && this.data.menuStatus == 0) {
          let obj = {
            groupName:this.form.name,
            groupDesc:this.form.desc
          }
          localStorage.setItem('menuImage',JSON.stringify(obj))
          this.$message.success('编辑成功！')
          this.dialogVisible = false;
          this.$emit('menu')
          return
        }
        let requestData;
        //判断是分组编辑还是表格编辑
        if (this.type == 3) { //编辑分组
          requestData = {
            user_id:this.data.user_id,
            group_id:this.data.group_id,
            group_name:this.form.name,
            group_desc:this.form.desc
          }
        } else {  //编辑表格
          requestData = {
            user_id:this.data.user_id,
            url_title:this.form.desc,
            url_id:this.data.url_id
          }
        }
        
        editImage(requestData).then(res => {
          if(res.code == 20000){
            this.$message.success('编辑成功！')
            this.$emit('menu')
            this.dialogVisible = false;
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        // console.log(this.data.menuStatus,123654987)
        //判断是否编辑本地分组栏，进入则修改本地存储
        if (this.type == 3 && this.data.menuStatus == 0) {
          let obj = {
            groupName:this.form.name,
            groupDesc:this.form.desc
          }
          localStorage.setItem('menuAgent',JSON.stringify(obj))
          this.$message.success('编辑成功！')
          this.dialogVisible = false;
          this.$emit('menu')
          return
        }else{
          let requestData = {
            user_id:this.data.user_id,
            group_id:this.data.group_id,
            group_name:this.form.name,
            group_desc:this.form.desc
          }

          editModel(requestData).then(res => {
            if(res.code == 20000){
              this.$message.success('编辑成功！')
              this.dialogVisible = false;
              this.$emit('menu')
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      }
      // this.dialogVisible = false;
    },
    knowledgeDelete(){  //文档库/网址库删除
      if (this.knowledgeLabel == '文档库') {
        if(this.data.menuStatus == 0){
          localStorage.setItem('menuDocument',null)
          this.$message.success('删除成功')
          this.$emit('menu')
        }else{
          let requestData = {
          user_id:this.data.user_id,
          group_id:this.data.group_id,
          file_id:this.data.file_id
        }
        deleteDocument(requestData).then(res => {
          if (res.code == 20000) {
            this.$message.success('删除成功')
            if(this.type == 0){
              this.$emit('data')
            }else{
              this.$emit('menu')
            }
          }
        })
        }
      }else if(this.knowledgeLabel == '网址库'){
        // 判断是否是本地删除
        if(this.data.menuStatus == 0){
          localStorage.setItem('menuWebsite',null)
          this.$message.success('删除成功')
          this.$emit('menu')
        }else{
          let requestData = {}
          if(this.type == 0){   //表格删除
            requestData = {
              user_id:this.data.user_id,
              url_id:this.data.url_id,
            }
          }else{
            requestData = {
              user_id:this.data.user_id,
              group_id:this.data.group_id,
            }
          }
          deleteWebsite(requestData).then(res => {
            if (res.code == 20000) {
              this.$message.success('删除成功')
              if(this.type == 0){
                this.$emit('data')
              }else{
                this.$emit('menu')
              }
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      }else if(this.knowledgeLabel == '图片库'){
        // 判断是否是本地删除
        if(this.data.menuStatus == 0){
          localStorage.setItem('menuImage',null)
          this.$message.success('删除成功')
          this.$emit('menu')
        }else{
          let requestData = {}
          if(this.type == 0){   //表格删除
            requestData = {
              user_id:this.data.user_id,
              url_id:this.data.url_id,
            }
          }else{
            requestData = {
              user_id:this.data.user_id,
              group_id:this.data.group_id,
            }
          }
          deleteImage(requestData).then(res => {
            if (res.code == 20000) {
              this.$message.success('删除成功')
              if(this.type == 0){
                this.$emit('data')
              }else{
                this.$emit('menu')
              }
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      }else{
        deleteModel().then(res => {

        })
      }
      this.dialogVisible = false;
    },
    knowledgeCreated(){ //分组创建
      if (!this.form.name) {
        this.$message.error('请输入分组名称！')
        return
      }
      let obj = {   //构建本地分组数据
        groupName:this.form.name,
        groupDesc:this.form.desc
      }
      if(this.data.menuIndex == '1-1'){   //进入图片库分组创建
        localStorage.setItem('menuImage',JSON.stringify(obj));
      }else if(this.data.menuIndex == '1-2'){ //文档库分组创建
        localStorage.setItem('menuDocument',JSON.stringify(obj));
      }else if(this.data.menuIndex == '1-3'){   //网址库分组创建
        localStorage.setItem('menuWebsite',JSON.stringify(obj))
      }else{    //智能体分组创建
        localStorage.setItem('menuAgent',JSON.stringify(obj))
      }
      this.$emit('menu')    //刷新菜单栏数据
      this.$message.success('创建成功！')
      this.dialogVisible = false  //关闭创建弹出框
    }
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-dialog__body{
  min-height: 60px;
  padding-bottom: 0px;
  padding-top: 20px;
}
.delete-box{
  display: flex;
  align-items: center;
  span{
    color: rgb(174, 62, 47);
  }
}
</style>