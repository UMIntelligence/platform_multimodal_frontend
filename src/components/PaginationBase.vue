/**
* 分页组件
*/ 
<template>
  <el-pagination class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="childMsg.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="childMsg.pageSize" layout="total, prev, pager, next" :total="childMsg.total">
  </el-pagination>
</template>
<script>
export default {
  name: 'PaginationBase',
  props: ['childMsg'],
  data() {
    return {
      pageparm: {
        currentPage: this.childMsg.currentPage,
        pageSize: this.childMsg.pageSize
      }
    }
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      this.pageparm.pageSize = val
      this.$emit('callFather', this.pageparm)
    },
    handleCurrentChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      this.pageparm.currentPage = val
      this.$emit('callFather', this.pageparm)
    }
  }
}
</script>

<style scoped>
.page-box {
  margin: 10px auto;
  text-align: end;
}
.page-box /deep/ .el-pager li{
  border-radius: 8px;
  background-color: rgba(0,0,0,0);
  border: 1px solid #DCDCDC;
}
.page-box /deep/ .el-pager li.active{
  background-color: #3363F6 !important;
  border: 1px solid rgba(0,0,0,0) !important;
}
</style>
