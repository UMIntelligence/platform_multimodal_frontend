<template>
  <el-dialog
    title="填写图片验证码"
    :visible.sync="dialogVisible"
    @open="getCode"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="500px">
    <div style="display: flex;">
      <el-input v-model="imageCode" style="height: 50px;margin-right: 20px;line-height: 50px;"></el-input>
      <img :src="imageSrc" alt="" @click="getCode" style="height: 50px;margin-right: 20px;">
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getImageCode } from '../api/chatMG'
export default {
  name: 'image-code',
  data() {
    return {
      dialogVisible: false,
      imageCode: '',
      imageSrc: '',
      imageId: '',
    }
  },

  // created() {
  //   this.getCode()
  // },

  methods: {
    submit() {
      if (this.imageCode == '') {
        this.$message.error('图片验证码不能为空')
        return
      }
      this.$emit('queryimagecode', {image_code: this.imageCode, image_id: this.imageId})
      this.dialogVisible = false
    },

    getCode() {
      this.imageCode = ''
      getImageCode().then(res => {
        console.log(res);
        this.imageSrc = res.data.image_code
        this.imageId = res.data.image_id
      })
    },
  }
}
</script>

<style scoped></style>