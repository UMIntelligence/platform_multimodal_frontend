<template>
  <div>
    <el-dialog title="邀请奖励规则" :visible.sync="shareDialogVisible" width="580px">
      <div class="main">
        <div>1.将你的推广海报分享给未使用过的好友，他/她首次打开成功注册后，你将获得100万通用算力奖励。</div>
        <div>2.好友打开注册后，他/她也将获得50万通用算力奖励。</div>
        <div>3.该邀请奖励规则针对分享的每一个新用户（未使用过有效）。例如：A使用过无忧秘书智脑，而B和C从未使用过，是新用户，那么B和C都通过A的邀请海报成功注册后，B和C能各自得到50万算力，A可以共获得（100+100=）200万通用算力</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shareDialogVisible = false ,$router.push('/share')">确定</el-button>
        <el-button @click="cancellation">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "shareRule",
  props: {
  },
  data() {
    return {
      shareDialogVisible: false,
      Register:"",
      Pay:''
    }
  },
  methods: {
    //取消
    cancellation(){
      this.shareDialogVisible = false //关闭当前
      this.$emit('cancellation',true)
    }
  },
}
</script>

<style scoped>
.main >div{
  margin-bottom: 10px;
}
.main >div:last-child{
  margin-bottom: 0px;
}
</style>