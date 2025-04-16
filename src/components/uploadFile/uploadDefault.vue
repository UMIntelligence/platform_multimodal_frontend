<template>
  <div class="upload-file">
      <img v-for="(item, i) in urlList" :src="item" alt="" :key="item" :class="(i + 1) % 4 == 0 && i != 0 ? '' : 'file_img'" style="width: 80px;height: 80px;margin-bottom: 20px;">
    <el-upload
      style="margin: 0 0 20px 0;"
      class="upload_list"
      v-if="showUpload"
      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
      list-type="picture-card"
      :auto-upload="true"
      :limit="6"
      :show-file-list="false"
      :data="requestData"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :headers="headerData"
      :on-success="handleSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'

export default {
  data() {
    return {
      httpUrls: httpUrls,
      showUpload: true,
      dialogImageUrl: '',
      dialogVisible: false,
      requestData: {
        image: null,
        oss_dir: 'static',
        cate: 'website',
        image_name: ''
      },
      urlList: [],
      imageLength: 0,
      headerData: {}
    };
  },
  props: {
    resetImgList: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    resetImgList: {
      deep: true,
      handler() {
        if (this.resetImgList) {
          this.urlList = []
        }
      }
    }
  },

  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.imageLength = fileList.length
      this.requestData.image = file.raw
      this.requestData.image_name = file.name
      if (fileList.length == 6) {
        this.showUpload = false
      } else {
        this.showUpload = true
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.code == 20000) {
        this.$emit('imageurl', response.data)
        this.urlList.push(response.data)
      }
    }
  }
}
</script>

<style>
.upload-file {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 15px;
}
.upload_list .el-upload {
  width: 80px;
  height: 80px;
  line-height: 80px;
}

.file_img {
  margin-right: 9px;
}
</style>