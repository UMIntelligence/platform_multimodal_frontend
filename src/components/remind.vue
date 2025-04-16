<template>
  <div>
    <el-dialog
      @close="handleRemindF"
      title="算力不足提醒"
      :visible="centerDialogVisible"
      width="440px"
      center
    >
      <div>
        <div>
          <strong>您好，尊敬的用户！</strong>
          <div>
            您目前所剩余的算力不足以使用该功能，请您进行前往购买或分享新人获得算力!
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="position: relative; height: 45px">
        <div style="position: absolute; left: 0px; display: flex">
          <el-button type="primary" @click="toIndex(1)">购买算力</el-button>
          <el-button type="primary" @click="toIndex(2)">分享好友</el-button>
        </div>
        <el-button @click="handleRemindF" style="position: absolute; right: 0px"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 登录 -->
    <register ref="Register"></register>
    <!-- 分享好友 -->
    <shareRule ref="shareRule" @cancellation="handleCancellation"></shareRule>
    <!-- 支付 -->
    <pay ref="Pay"></pay>
  </div>
</template>
<script>
import register from "./register";
import pay from "./pay";
import shareRule from "./shareRule";
import store from "../vuex/index";
import { mapState, mapGetters } from "vuex";
export default {
  name: "remind",
  props: {},
  data() {
    return {
      Register: "",
      Pay: "",
      shareRule: "",
    };
  },
  components: {
    register,
    pay,
    shareRule,
  },
  computed: mapState({
    centerDialogVisible: (state) => state.id.remindBool,
  }),
  methods: {
    handleRemindF() {
      store.dispatch("id/SET_REMINDF", false);
    },
    // 前往购买
    toIndex(val) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
      } else if (val == 1) {
        console.log(1);
        this.$refs.Pay.PayVisible = true;
      } else if (val == 2) {
        //好友分享
        this.$refs.shareRule.shareDialogVisible = true;
      }
      store.dispatch("id/SET_REMINDF", false);
    },
    // 分享规则组件回调事件
    handleCancellation(val) {
      console.log(val);
      store.dispatch("id/SET_REMINDT", val);
    },
  },
};
</script>
