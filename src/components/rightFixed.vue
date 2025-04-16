<template>
  <div class="right-fixed">
    <div class="service_cion" v-if="serviceCOde">
      <i class="el-icon-error close" @click="closeServiceCode"></i>
      <img
        :src="httpUrls.ossUrl + 'static/picture/8b675949-9870-41ae-8dba-9a9e066c036f.png'"
        alt=""
      />
      <img class="customerImg" :src="customerImg" alt="" />
    </div>
    <div class="cooperate">
      <i class="el-icon-remove reduce" v-if="modelItem" @click="closeModelItem"></i>
      <div class="newBtn amplify" v-else @click="showMOdelItem">
        <img
          src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319231.png"
        />
      </div>
      <div class="cooperate-item" v-if="modelItem">
        <div class="cooperate_show">
          <!-- <img class="bg" src="../assets/images/fixed_right_icon-bg.png" alt=""> -->
          <img class="icon" src="../assets/images/service_cion_right.png" alt="" />
          <span class="text">合作咨询</span>
        </div>
        <div class="cooperate_hideen">
          <div class="line"></div>
          <img src="../assets/images/phone_cion.png" alt="" />
          <div>
            <div style="font-size: 12px; margin-bottom: 4px">合作咨询</div>
            <div style="font-size: 16px; font-weight: bold; white-space: nowrap">
              153-6148-6289
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fxid-right" v-if="modelItem">
      <div class="fixed-item">
        <div
          @mouseenter="clickSelect(2)"
          @mouseleave="handleLeave(2)"
          class="fixed-click"
        >
          <img
            class="img"
            v-if="!miniProgVisible"
            src="../assets/images/MiniprogramNo.png"
            alt=""
          />
          <img
            class="img"
            v-if="miniProgVisible"
            src="../assets/images/MiniprogramYes.png"
            alt=""
          />
          <div :class="miniProgVisible ? 'popper_class-item on' : 'popper_class-item'">
            小程序
          </div>
        </div>
        <div class="fixed-mark wechart-mini" v-if="miniProgVisible">
          <div class="mark"></div>
          <img
            style="width: 160px; height: 160px"
            :src="
              httpUrls.ossUrl + 'static/picture/c94d71e3-9a2c-4033-b3f6-fe2c3720057a.png'
            "
            alt=""
          />
          <div>扫一扫体验小程序</div>
        </div>
      </div>
      <div class="fixed-item">
        <div
          @mouseenter="clickSelect(3)"
          @mouseleave="handleLeave(3)"
          class="fixed-click"
        >
          <img
            class="img"
            v-if="!serviceVisible"
            src="../assets/images/serviceNo.png"
            alt=""
          />
          <img
            class="img"
            v-if="serviceVisible"
            src="../assets/images/serviceYes.png"
            alt=""
          />
          <div :class="serviceVisible ? 'popper_class-item on' : 'popper_class-item'">
            客服
          </div>
        </div>
        <div class="fixed-mark wechart-servies" v-if="serviceVisible">
          <div class="mark"></div>
          <img style="width: 160px; height: 160px" :src="customerImg" alt="" />
          <div>AIGC前沿信息分享</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import httpUrls from "../api/requestURL";
import { pictures } from "../api/chatMG";

export default {
  name: "right-fixed",
  data() {
    return {
      httpUrls,
      wechartVisible: false,
      miniProgVisible: false,
      serviceVisible: false,
      serviceCOde: true,
      modelItem: true,
      customerImg: "",
    };
  },

  computed: {
    ...mapGetters(["contactService", "mini", "officialAccount"]),
  },
  mounted() {
    this.init();
  },

  methods: {
    //获取客服二维码图片
    init() {
      pictures().then((res) => {
        console.log(res, "客服二维码");
        res.data.forEach((item) => {
          if (item.type == 8) this.customerImg = item.pic_url;
        });
      });
    },
    // 隐藏popover的弹出框
    hiddenPopover(num) {
      switch (num) {
        case 1:
          this.wechartVisible = false;
          break;
        case 2:
          this.miniProgVisible = false;
          break;
        case 3:
          this.serviceVisible = false;
          break;
      }
    },

    //鼠标移出
    handleLeave(num) {
      switch (num) {
        case 1:
          this.wechartVisible = true;
          this.miniProgVisible = false;
          this.serviceVisible = false;
          break;
        case 2:
          this.wechartVisible = false;
          this.miniProgVisible = false;
          this.serviceVisible = false;
          break;
        case 3:
          this.wechartVisible = false;
          this.miniProgVisible = false;
          this.serviceVisible = false;
          break;
      }
    },
    //  鼠标移入
    clickSelect(num) {
      switch (num) {
        case 1:
          this.wechartVisible = true;
          this.miniProgVisible = false;
          this.serviceVisible = false;
          break;
        case 2:
          this.wechartVisible = false;
          this.miniProgVisible = true;
          this.serviceVisible = false;
          break;
        case 3:
          this.wechartVisible = false;
          this.miniProgVisible = false;
          this.serviceVisible = true;
          break;
      }
    },
    closeServiceCode() {
      this.serviceCOde = false;
    },

    closeModelItem() {
      this.serviceCOde = false;
      this.modelItem = false;
    },

    showMOdelItem() {
      this.serviceCOde = true;
      this.modelItem = true;
    },
  },
};
</script>

<style scoped>
.customerImg {
  width: 130px;
  height: 130px !important;
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0%);
  z-index: 5;
}
.newBtn {
  cursor: pointer;
}
.right-fixed {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.fxid-right {
  width: 62px;
  background-color: #fff;
  box-shadow: 0px 4px 14px rgba(51, 51, 51, 0.1);
  border-radius: 30px;
  padding: 1px 0;
  margin-right: 10px;
  margin-top: 20px;
}

.fixed-item {
  display: flex;
  flex-wrap: wrap;
  margin: 22px auto;
  position: relative;
}

.fixed-click {
  margin: 0 auto;
  cursor: pointer;
}

.fixed-item .on {
  color: #1f64ff;
}

.fixed-mark {
  position: absolute;
  right: 62px;
  top: -50%;
  background-color: #fff;
  padding: 20px 20px;
  box-shadow: 1px 4px 10px rgba(170, 178, 200, 0.45);
  text-align: center;
  border-radius: 8px;
  /* font-family: 'PingFang SC'; */
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  margin-right: 6px;
}
.fixed-mark > i {
  position: absolute;
  top: 10px;
  right: 8px;
}

.fixed-mark > .mark {
  width: 24px;
  height: 24px;
  background-color: #fff;
  transform: rotateZ(45deg);
  position: absolute;
  right: 0;
  top: 39px;
}

.wechart-mini {
  top: -90px;
}
.wechart-mini > .mark {
  top: 47%;
}

.wechart-servies {
  top: -158px;
}

.wechart-servies > .mark {
  top: 80%;
}

.fixed-item .img {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  display: block;
}

.service_cion {
  position: relative;
}

.service_cion .close {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.service_cion img {
  height: 260px;
}

.reduce,
.amplify {
  color: #1f64ff;
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 0;
}

.amplify {
  right: -25px;
  font-size: 32px;
}

.cooperate {
  position: relative;
}

.cooperate-item {
  position: relative;
  margin: 10px 10px 0 0;
}

.cooperate_show {
  position: relative;
  background: url("../assets/images/fixed_right_icon-bg.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 62px;
  cursor: pointer;
}

.cooperate_show .text {
  width: 14px;
  font-size: 14px;
  line-height: 21px;
  color: #fff;
  display: inline-block;
}

.cooperate_hideen {
  position: absolute;
  top: 30%;
  right: 72px;
  display: none;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cooperate_hideen img {
  width: 44px;
  margin-right: 10px;
}

.cooperate_hideen .line {
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  right: -6px;
  top: 50%;
  z-index: -1;
  transform: translateY(-50%) rotateZ(45deg);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.cooperate-item:hover .cooperate_hideen {
  display: flex;
}
</style>
