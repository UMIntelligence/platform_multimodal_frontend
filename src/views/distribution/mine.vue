<template>
  <!-- 
    分销中心
   -->
  <div class="distribution-mine">
    <go-back></go-back>
    <div class="distribution">
      <div class="top_title">
        <img class="img" v-if="Number(data.d_level) == 2" src="../../assets/images/Diamonddistribution.png" alt="">
        <img class="img" v-else src="../../assets/images/GoldDistribution.png" alt="">
        <div class="title">{{ Number(data.d_level) == 2 ? '钻石' : '金牌' }}分销</div>
        <div class="periodValidity"
          style="color: #999;font-size: 16px;font-family: PingFang SC;line-height: 150%;letter-spacing: 0.2px;"
          v-if="Number(data.d_level) == 2">分销有效期:{{ data.expireTime }}</div>
        <div v-else></div>
      </div>
      <div class="mark">
        <div class="item">
          <div class="people_and_money">
            <div class="img">
              <img src="../../assets/images/mineMoney.png" alt="">
            </div>
            <div class="item-title">
              <div class="title_title">可提现佣金(元)</div>
              <div class="title-money">{{ data.withdraw_balance }}</div>
            </div>

            <div class="item-btn" style="right: 100px;bottom: 15px;">
              <!-- <el-button type="primary" @click="goWithdrawal">兑换算力</el-button> -->
              <el-button type="primary" @click="goWithdrawal">提现</el-button>
            </div>
            <div class="item-btn" style="right: 20px;bottom: 15px;">
              <el-button class="btn-el" @click="exchangeToken">兑换算力</el-button>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="people_and_money">
            <div class="img">
              <img src="../../assets/images/mineTotalMoney.png" alt="">
            </div>
            <div class="item-title">
              <div class="title_title">累计佣金（元）</div>
              <div class="title-money">{{ data.count_balance }}</div>
            </div>
            <div class="item-btn"></div>
          </div>
        </div>

        <div class="item">
          <div class="people_and_money">
            <div class="img">
              <img src="../../assets/images/minePeople.png" alt="">
            </div>
            <div class="item-title">
              <div class="title_title">我的成员（个）</div>
              <div class="title-money">{{ data.member }}</div>
            </div>
            <div class="item-btn">
              <el-button class="btn-el" @click="goMineMember">查看</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="more-distribution">
      <div class="title-title">更多内容</div>
      <div class="mark">
        <div class="item" @click="toShare">
          <div class="asdbgfasd">
            <div class="img">
              <img src="../../assets/images/minMoveupOther.png" alt="">
            </div>
            <div class="title">
              <div class="title_top">分享邀请</div>
              <div class="title_bottom">多种身份说明</div>
            </div>
          </div>
        </div>

        <div class="item" @click="toMember">
          <div class="asdbgfasd">
            <div class="img">
              <img src="../../assets/images/mineMoveup.png" alt="">
            </div>
            <div class="title">
              <div class="title_top">升级分销</div>
              <div class="title_bottom">享有更高权益</div>
            </div>
          </div>
        </div>

        <div class="item" @click="goNextPage(1)">
          <div class="asdbgfasd">
            <div class="img">
              <img src="../../assets/images/minMoveupming.png" alt="">
            </div>
            <div class="title">
              <div class="title_top">分佣说明</div>
              <div class="title_bottom">多种身份说明</div>
            </div>
          </div>
        </div>

        <div class="item" @click="goNextPage(2)">
          <div class="asdbgfasd">
            <div class="img">
              <img src="../../assets/images/mineMoveupMoney.png" alt="">
            </div>
            <div class="title">
              <div class="title_top">分佣明细</div>
              <div class="title_bottom">佣金来源更明细</div>
            </div>
          </div>
        </div>

        <div class="item" @click="goNextPage(3)">
          <div class="asdbgfasd">
            <div class="img">
              <img src="../../assets/images/mineMoveupHistory.png" alt="">
            </div>
            <div class="title">
              <div class="title_top">提佣记录</div>
              <div class="title_bottom">每笔账单都明细</div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="distribution-moveup">
      <img class="img_one" src="../../assets/images/moveupImgtwo.png" alt="">
      <img class="img_two" src="../../assets/images/moveupImgtwo.png" alt="">
      <img class="img_three" src="../../assets/images/moveupImg.png" alt="">
      <img class="img_four" src="../../assets/images/moveupImgthree.png" alt="">
      <div class="title">充值99元您将升级成为金牌分销,佣金由15%提升到30%,享有更高佣金福利!</div>
      <div class="btn" @click="toMember">立即升级</div>
    </div>

    <Pay ref="Pay" :datas="payInfo" @isupgradedistribution="isUpgradeDistribution"></Pay>

    <Register ref="Register"></Register>
  </div>
</template>

<script>
import Pay from '../../components/pay'
import GoBack from '../../components/goBack'
import Register from '../../components/register'

import { distributionDetails, exchange } from '../../api/distribution'
import httpUrls from '../../api/requestURL'

export default {
  name: 'distribution-mine',
  data() {
    return {
      payInfo: {},
      data: {}
    }
  },
  components: {
    Pay,
    GoBack,
    Register
  },
  created() {
    this.queryDistributino()
  },
  mounted() {
    document.title = httpUrls.name
  },
  methods: {
    toMember() {
      if (!this.showRegister()) {
        sessionStorage.setItem('distribution_level', this.data.d_level)
        this.$router.push('/upgradeDistribution/upgradeDistribution')
      }
    },
    //兑换算力
    exchangeToken() {
      this.$confirm('是否将佣金兑换成算力?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.data.withdraw_balance) {
          this.$message.error('抱歉,您可提现佣金为0');

          return
        }
        let requestData = { amount: this.data.withdraw_balance.toFixed(2) }
        exchange(requestData).then(res => {
          if (res.code == 20000) {
            this.$message.success('提现成功!');
            this.queryDistributino()
          }else{
            this.$message(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    goWithdrawal() {
      if (!this.showRegister()) {
        this.$router.push('/withdrawal/withdrawal')
      }
    },

    goMineMember() {
      if (!this.showRegister()) {
        this.$router.push('/mineMember/mineMember')
      }
    },
    queryDistributino() {
      distributionDetails().then(res => {
        let expireTime = ''
        if (res.data.expire_time != null) {
          expireTime = res.data.expire_time.split('T')[0].split('-')
        }
        this.data = { ...res.data, expireTime: expireTime[0] + '/' + expireTime[1] + '/' + expireTime[2] }
        sessionStorage.setItem('number_money', res.data.withdraw_balance)
      })
    },

    isUpgradeDistribution(msg) {
      if (msg == '成功') {
        this.data.d_level = 2
      }
    },

    goNextPage(type) {
      if (!this.showRegister() || type == 1) {
        switch (type) {
          case 1:
            this.$router.push('/illustrate/illustrate')
            break;
          case 2:
            this.$router.push('/mineDetail/mineDetail')
            break;
          case 3:
            this.$router.push('/indent/indent')
            break;
        }
      }
    },

    toShare() {
      this.$router.push('/share/share')
      sessionStorage.setItem('sahre_friend', '2')
    },

    showRegister() {
      if (JSON.parse(localStorage.getItem('userInfo')).role == 'guess') {
        this.$refs.Register.registerVisible = true
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.distribution-mine {
  padding: 70px 5% 40px 5%;
  position: relative;
}

.distribution,
.more-distribution {
  width: calc(100% - 146px);
  background: #F6F8FB;
  border-radius: 12px;
  padding: 30px 53px;
  margin-bottom: 20px;
  padding-bottom: 14px;
}

.distribution .top_title {
  display: flex;
  margin-bottom: 20px;
}

.distribution .top_title .img {
  width: 24px;
  margin-right: 10px;
}

.distribution .top_title .title {
  font-weight: 600;
  font-size: 16px;
  color: #333333;
  margin-right: 20px;
}

.distribution .mark {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}


.distribution .mark .item {
  width: calc(33% - 20px);
  display: flex;
  position: relative;
  margin: 0 10px;
  margin-bottom: 16px;
  transition: all 0.2s;
}

@media (width >=1280px) {
  .distribution .mark .item {
    width: calc(33% - 20px);
  }
}

@media (width < 1280px) and (width > 900px) {
  .distribution .mark .item {
    width: calc(50% - 20px);
  }
}

@media (width <=900px) {
  .distribution .mark .item {
    width: 100%;
  }
}

.people_and_money {
  border-radius: 12px;
  background-color: #FFFFFF;
  padding: 20px;
  display: flex;
  width: calc(100% - 40px);
}

.distribution .mark .item .img {
  margin-right: 16px;
}

.distribution .mark .item .img img {
  width: 54px;
  height: 54px;
}

.distribution .mark .item .item-title .title_title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  white-space: nowrap;
}

.distribution .mark .item .item-title .title-money {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}

.distribution .mark .item .item-btn {
  width: 96px;
  position: absolute;
  right: 0;
  bottom: 20px;
}

.more-distribution .title-title {
  font-weight: 600;
  font-size: 16px;
  color: #333333;
  margin-bottom: 20px;
}

.more-distribution .mark {
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;
}

.more-distribution .mark .item {
  margin: 0 10px;
  margin-bottom: 16px;
  width: calc(20% - 20px);
  transition: all 0.2s;
}

@media (width >=1600px) {
  .more-distribution .mark .item {
    width: calc(20% - 20px);
  }
}

@media (width < 1600px) and (width > 1440px) {
  .more-distribution .mark .item {
    width: calc(25% - 20px);
  }
}

@media (width <=1440px) and (width > 1280px) {
  .more-distribution .mark .item {
    width: calc(33% - 20px);
  }
}

@media (width <=1280px) and (width > 900px) {
  .more-distribution .mark .item {
    width: calc(50% - 20px);
  }
}

@media (width <=900px) {
  .more-distribution .mark .item {
    width: 100%;
  }
}

.asdbgfasd {
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  padding: 20px;
  width: calc(100% - 40px);
  transition: all .2s;
  cursor: pointer;
  display: flex;
}

.asdbgfasd:hover {
  transform: scale(1.04);
  border: 1px solid #1F64FF;
}

.more-distribution .mark .item .img img {
  width: 54px;
  height: 54px;
  margin-right: 16px;
}

.more-distribution .mark .item .title .title_top {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
}

.more-distribution .mark .item .title .title_bottom {
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #999999;
}

.distribution-moveup {
  background-color: #0D39E2;
  border-radius: 10px;
  height: 156px;
  position: relative;
  width: calc(100% - 40px);
}

.distribution-moveup .img_one {
  position: absolute;
  left: 32px;
  top: 14px;
  width: 45px;
  height: 45px;
}

.distribution-moveup .img_two {
  position: absolute;
  bottom: 14px;
  left: 50%;
  width: 35px;
  height: 35px;
}

.distribution-moveup .img_three {
  position: absolute;
  right: 30%;
  top: 50%;
  transform: translateY(-50%);
  width: 137px;
}

@media (width < 1760px) {
  .distribution-moveup .img_three {
    right: 20%;
  }
}

.distribution-moveup .img_four {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 142px;
}

.distribution-moveup .btn {
  position: absolute;
  right: 40px;
  bottom: 50%;
  transform: translateY(50%);
  padding: 8px 35px;
  background: linear-gradient(180deg, #F7D14C 0%, #E9BB0E 100%);
  color: #FFFFFF;
  border-radius: 1000px;
  cursor: pointer;
}

.distribution-moveup .title {
  font-weight: 400;
  font-size: 20px;
  color: #FFFFFF;
  margin: auto 0 auto 100px;
  line-height: 156px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 55%;
}

@media (width < 1280px) {
  .distribution-moveup .title {
    width: 40%;
  }
}
</style>

<style>
.distribution .mark .item .item-btn .btn-el {
  border: 1px solid #1F64FF;
  border-radius: 6px;
  color: #1F64FF;
}
</style>