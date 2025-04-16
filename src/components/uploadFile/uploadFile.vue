<template>
  <div class="add-upload-file">

    <el-upload
      class="upload-demo"
      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
      :limit="limit"
      :on-exceed="() => { return $message.error('文件上传超出最大限制！') }"
      :accept="accept"
      :file-list="fileListFile"
      :data="data"
      :on-change="handleUploadChange"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :on-error="handleError"
      ref="fileList"
      :headers="headerData"
      multiple
      :auto-upload="true">
      <el-button size="small" type="primary" icon="el-icon-upload2" style="background-color: #1f64ff;">点击上传</el-button>
      <div slot="tip" class="el-upload__tip title_prompt">{{ title }}</div>
    </el-upload>
  </div>
</template>

<script>
import httpUrls from '../../api/requestURL'

export default {
  data() {
    return {
      httpUrls: httpUrls,
      fileListFile: [],
      headerData: {}
    };
  },
  props: {
    // 请求时的参数
    data: {
      type: Object,
      default: () => {
        return {
          image: null,
          image_name: null,
          oss_dir: 'static',
          cate: 'problem_picture',
        }
      }
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 数据来源，在同一个页面中，可能会多次使用这个组件，可以使用它来区分是谁
    source: {
      type: String,
      default: ''
    },
    // 上传的最大数量
    limit: {
      type: Number,
      default: 1
    },
    // 上传的数据类型
    accept: {
      type: String,
      default: '.jpg,.png,.jpeg'
    },
    // 上传组件下方用来展示的标题
    title: {
      type: String,
      default: '请上传jpg/png文件，文件大小不超过5MB'
    }
  },
  watch: {
    fileList: {
      deep: true,
      handler() {
        this.fileListFile = []
        this.fileList.forEach(v => {
          this.fileListFile.push(v)
        })
      }
    }
  },
  mounted() {
    console.log(this.fileListFile);
    this.fileListFile = []
    this.fileList.forEach(v => {
      this.fileListFile.push(v)
    })

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
  },
  methods: {
    // 上传资料文件/文件
    handleUploadChange(file, fileList) {
      this.data.image = file.raw
      this.data.image_name = file.name
    },

    // 成功的回调
    handleSuccess(response, file, fileList) {
      if (response.code == 20000) {
        this.fileListFile.push({
          uid: file.uid,
          name: response.data.name,
          file_url: response.data.new_url
        })
        this.$emit('adduploadfile', {
          name: response.data.name,
          file_url: response.data.new_url,
          source: this.source,
          uid: file.uid
        })
      } else {
        if (response.code > 20000 && response.code < 50000) {
          this.$message.error(response.msg)
        } else {
          this.$message.error('网络异常，请重试')
        }
      }
    },
    
    beforeRemove(file, fileList) {
      this.$emit('removeuploadfile', {...file, source: this.source})
      this.fileListFile.forEach((v, i) => {
        if (v.uid == file.uid) {
          this.fileList.splice(i, 1)
        }
      })
    },

    handleError(err, file, fileList) {
      this.$message.error(err.msg)
    },
  }
}
</script>

<style>

.add-upload-file .upload-demo .el-upload-dragger {
  width: 300px;
  height: 140px;
}

.add-upload-file .upload-demo .el-upload-dragger .el-icon-upload {
  margin-top: 16px;
}

.add-upload-file .upload-demo .el-upload-list .el-upload-list__item {
  margin: 0;
}

.el-upload__tip {
  margin-top: 0;
  line-height: 20px;
}
</style>