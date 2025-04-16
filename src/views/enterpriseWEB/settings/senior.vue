<template>
  <div class="main-child">
    <!-- 高级设置 -->
    <div class="nav">
      <div>转让所有者</div>
      <div>
        你可以将知识库转让给任意成员，转让hou你的角色将变为普通成员，无法再管理当前知识库，此操作无法撤销，请谨慎
      </div>
    </div>
    <div class="top">
      <div>
        <img
          :src="
            httpUrls.ossUrl + 'xcx/com/message_center/Rectangle 34625122.png'
          "
          alt=""
        />
        <div>高考志愿推荐导师</div>
      </div>
      <div class="btn">转让</div>
    </div>
    <div class="bottom">
      <!-- 警告 -->
      <div class="warning">
        <div class="line"></div>
        <div>
          <img :src=" httpUrls.ossUrl + 'xcx/com/message_center/vuesax_linear_info-circle@2x.png'" alt="" />
          <div>危险区</div>
        </div>
        <div class="line"></div>
      </div>
      <div class="nav">
        <div>删除知识库</div>
        <div>
          删除知识库后，所有成员将无法继续访问当前知识库，知识库中的所有数据将会永久删除，此操作无法撤销，请谨慎
        </div>
      </div>
      <div class="btn">删除</div>
    </div>
  </div>
</template>

<script>
import httpUrls from "../../../api/requestURL";
export default {
  data() {
    return {
      httpUrls,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-child {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: #ffffff;
  .nav {
    margin-bottom: 30px;
    > div:first-child {
      font-weight: 600;
      font-size: 16px;
      color: #000000;
      margin-bottom: 4px;
    }
    > div:last-child {
      font-weight: 400;
      font-size: 14px;
      color: #666666;
    }
  }
  .top {
    margin-bottom: 50px;
    > div:first-child {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      font-weight: 500;
      font-size: 16px;
      color: #000000;
      img {
        margin-right: 10px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    > div:last-child {
      background: #3363f6;
    }
  }
  .btn {
    width: 140px;
    line-height: 40px;
    border-radius: 8px 8px 8px 8px;
    font-weight: bold;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }
  .bottom {
    .nav {
      margin-bottom: 24px !important;
    }
    .btn {
      background: #ff3333;
    }
    .warning {
      width: 740px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line {
        width: calc((100% - 128px) / 2);
        border-top: 1px dashed #ff897f;
        border-color: #ff897f;
      }
      > div:nth-child(2) {
        width: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 0px;
        box-sizing: border-box;
        background: #ffedeb;
        border-radius: 50px;
        img {
          width: 24px;
          height: 24px;
          margin-right: 2px;
        }
        div {
          font-weight: bold;
          font-size: 14px;
          color: #ff1400;
        }
      }
    }
  }
}
</style>