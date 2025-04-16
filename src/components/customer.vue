<template>
    <div class="customer-wrap">
        <el-dialog
            title="微信扫码，联系客服"
            :visible.sync="customergVisible"
            width="400px"
            center>
            
            <div class="cust_img">
                <img class="tip_img" src="../assets/images/code.png" alt="">
            </div>
            
        </el-dialog>
    </div>
  </template>
  <script type="text/ecmascript-6">
 
  export default {
    name: 'customer',
    data() {
      return {
         customergVisible: false,
      }
    },
    // 创建完毕状态(里面是操作)
    created() {
     
      
    },
    // 里面的函数只有调用才会执行
    methods: {
        
        
    }
  }
  </script>
  
  <style scoped>
       .cust_img{
          display: flex;
          justify-content: center;
       }
       .tip_img {
          width: 220px;
          height: 220px;
       }

  </style>

<style>
  .customer-wrap .el-dialog__body {
      padding: 10px 0 30px 0px !important;
  }

  .customer-wrap .el-dialog__header {
      padding: 30px 10px 0px 10px !important;
  }


</style>
  