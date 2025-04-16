<template>
  <div class="go-back">
    <div @click="goBackPage" :class="isShowSidbar ? 'go_back-item' : 'go_back-item-on'">
      <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../assets/images/right.png" alt="">
      <span style="margin-left: 8px;">返回</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'go-back-new',
  computed: {
    ...mapGetters(['isShowSidbar'])
  },
  methods: {
    goBackPage() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.go-back{
  position: absolute;
  left: 30px;
  top: 20px;
}
.go_back-item {
  display: flex;
  cursor: pointer;
 
  transition: all .2s;
}

.go_back-item-on {
  display: flex;
  cursor: pointer;
  position: absolute;
  left: 30px;
  top: 80px;
  transition: all .2s;
}
</style>