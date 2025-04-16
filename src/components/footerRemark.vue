<template>
  <div class="footer_remark">
   
  </div>
</template>
<script>
import Agree from "../components/Agree";
export default {
  data() {
    return {};
  },
  components: {
    Agree,
  },
  methods: {
    showArgee(id) {
      this.$refs.Agree.agreeVisibleParent = true;
      if (id == 1) {
        this.$refs.Agree.agreeVisibleFour = true;
      } else if (id == 2) {
        this.$refs.Agree.agreeVisibleOne = true;
      } else if (id == 3) {
        this.$refs.Agree.agreeVisibleThree = true;
      }
    },
  },
};
</script>
<style scoped>
.footer_remark {
  box-sizing: border-box;
  width: 100%;
  line-height: 30px;
  background: rgb(241, 242, 245);
  display: flex;
  justify-content: center;
  color: #999999;
}
.remark {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  /* line-height: 150%; */
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
