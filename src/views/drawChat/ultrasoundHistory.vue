<template>
  <div class="fourDUltrasound-history">
    <div style="height: 20px;"></div>
    <div @click="$router.go(-1)" style="cursor: pointer;margin-bottom: 20px;margin-left: 20px;">
      <i class="el-icon-arrow-left"></i>
      <span>返回</span>
    </div>

    <div class="image_list">
      <div class="item" v-for="(item, i) in chatHistoryList">
        <img :src="httpUrls.ossUrl + item.content" alt="" style="width: 100%;height: 100%;object-fit: contain;filter: blur(20px);position: absolute;z-index: 1;object-fit: cover;">
        <img :src="httpUrls.ossUrl + item.content" alt="" style="width: 100%;height: 100%;object-fit: contain;position: absolute;z-index: 2;" @click="dialogImageUrl = httpUrls.ossUrl + item.content, dialogVisible = true">
        <!-- <img src="httpUrls.ossUrl + item.content" alt="" style="width: 100%;height: 100%;"> -->
        <i class="el-icon-close del" @click="deleteDrawHistory(item, i)" style="position: absolute;right: 8px;top: 8px;z-index: 3;"></i>
        <i class="el-icon-download del" @click="download(item)" style="position: absolute;right: 8px;bottom: 8px;z-index: 3;"></i>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" class="draw_image-class_dark">
      <img width="100%" :src="dialogImageUrl" style="max-height: 800px;min-height: 500px;cursor: zoom-out;" alt="" @click="dialogVisible = false">
    </el-dialog>
  </div>
</template>

<script>
import { drawChatHistroy, ChatDelete, deleteFootprint } from '../../api/chatMG'
import httpUrls from '../../api/requestURL'

export default {
  name: 'fourDUltrasound-history',
  data() {
    return {
      httpUrls,
      page: 1,
      page_size: 50,
      chat_type: -1,
      chatHistoryList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  created() {
    this.getChatList()
  },

  methods: {
    // 获取对话列表
    getChatList() {
      let val = `chat_type=${this.chat_type}&page_size=${this.page_size}&page=${this.page}`
      drawChatHistroy(val).then(res => {
        if (res.code == 20000) {
          this.chatHistoryList = this.chatHistoryList.concat(res.data.data);
          this.page++
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error('获取失败！')
      })
    },
    
    deleteDrawHistory(item, i) {
      let val = {
        'session_codes': JSON.stringify([item.session_code]),
      }
      this.$confirm('是否删除所选信息?', '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          ChatDelete(val).then(res => {
            if(res.code == 20000) {
              this.chatHistoryList.splice(i, 1)
              this.$message.success('删除成功！')
              deleteFootprint(`type_code=cdu&eid=${item.session_code}`).then(res => {})
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error('删除失败！')
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },

    download(item) {
      let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image();
      img.crossOrigin = '*';//解决Canvas.toDataURL 图片跨域问题
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
        let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "photo.png"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        canvas = null;
      };
      img.src = httpUrls.ossUrl + item.content;
    },
  }
}
</script>

<style scoped>
.fourDUltrasound-history {
  background-color: #F1F2F5;
  min-height: 100%;
}

.image_list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
}

.image_list .item .del {
  display: none;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px;
  border-radius: 4px;
}

.image_list .item:hover .del {
  display: inline-block
}

.image_list .item {
  width: 200px;
  height: 200px;
  margin: 10px;
  /* border: 1px solid #000; */
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
</style>

<style>
.draw_image-class_dark .el-dialog {
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* max-height: 800px;
  min-height: 500px; */
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
  display: none;
}

.draw_image-class_dark .el-dialog__header {
  display: none;
}

.draw_image-class_dark .el-dialog__body {
  padding: 0;
}

</style>