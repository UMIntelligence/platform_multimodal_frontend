/**
 * 基础菜单 升级钻石分销
 */
<template>
  <div class="container">
    <go-back></go-back>
    <div>
      <div class="memeber_title_img">
        <div class="main_title">金牌分销，获得30%佣金福利</div>
        <div class="item_title">- 相比普通分销，佣金提升15% -</div>
      </div>

      <div class="mem_cont">
        <div class="cont" @click="current = index" v-for="(item, index) in memberList" :key="index">
          <div class="box_top">
            <div class="cont_top" style="justify-content: flex-start">
              <span class="top_text">{{ item.prod_desc.valid }}</span>
            </div>
            <div class="cont_title">
              <span class="title_text">{{ item.prod_name }}</span>
            </div>
            <div class="price_main">
              <div class="cont_price" style="margin: 20px 0 16px 0;">
                <div class="price_l" style="vertical-align: bottom;">￥</div>
                <div class="price_m" style="vertical-align: bottom;height: 28px;line-height: 28px;">{{ item.prod_price }}</div>
              </div>
            </div>

            <div class="date_number"></div>
          </div>
          <div class="cont_btn" @click.stop="isBtn ? goPay(index,item) : ''">
            <span class="btn_text">立即购买</span>
          </div>
        </div>
      </div>
  
      <div style="display: flex;justify-content: center;margin-bottom: 50px;">
        <div class="up-distribution-illustrate">
          <div class="illustrate_title">升级金牌分销说明</div>
          <div class="illustrate_content">1、注册即0元成为普通分销，享有<span style=" color: #EB504B;">15%</span>佣金福利</div>
          <div class="illustrate_content" style="margin: 15px 0;">2、升级金牌分销，佣金将由<span style=" color: #EB504B;">15%</span>提升至<span style=" color: #EB504B;">30%</span></div>
          <div class="illustrate_content">3、想享有更高佣金，<span style=" color: #EB504B;cursor: pointer;" @click="$router.push('/chatServe')">点我</span>申请升级为服务商</div>
        </div>
      </div>
    </div>

    <div style="width: 248px;"></div>
    <!-- 支付组件 -->
    <Pay ref="Pay" :datas="payInfo"></Pay>

    <Register ref="Register"></Register>
  </div>
</template>

<script>
import { products } from '../../api/chatMG'
import Pay from '../../components/payShare'
import Customer from '../../components/customer'
import Register from '../../components/register'
import goBack from '../../components/goBack'
import httpUrls from '../../api/requestURL'
export default {
  name: 'member',
  data() {
    return {
      memberList: [],
      current: 0,
      payInfo: {},
      isBtn: true,
    }
  },
  // 注册组件
  components: {
    Pay,
    Customer,
    Register,
    goBack
  },

  /**
   * 创建完毕
   */
  created() {
      this.getMemberList()
  },

  mounted() {
    document.title = httpUrls.name
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 打开注册框
    goPay(index,item, page) {
      let loginInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (loginInfo.role == 'guess') {
          this.$refs.Register.registerVisible = true
          return
      }
      let level = sessionStorage.getItem('distribution_level')
      if (Number(level) == 2) {
        // 提示
        this.$confirm('您的账号已经升级为钻石分销，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let totalPrice = item.prod_price // 需要付款的价格
          let shopNumber = 1 // 商品数量
          this.payInfo = {...item, totalPrice, shopNumber};
      console.log(this.payInfo);

          this.isBtn = false;
          setTimeout(() => {
              this.isBtn = true;
          }, 1000);
          this.$refs.Pay.PayVisible = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });

      } else {
        let totalPrice = item.prod_price // 需要付款的价格
        let shopNumber = 1 // 商品数量
        this.payInfo = {...item, totalPrice, shopNumber};
      console.log(this.payInfo);

        this.isBtn = false;
        setTimeout(() => {
            this.isBtn = true;
        }, 1000);
        this.$refs.Pay.PayVisible = true
      }


    },

    // 获取会员列表
    getMemberList() {
      let val = {
        'prod_cate_id': [4]
      }
      products(val).then(res => {
        if (res.code == 20000) {
          this.memberList = res.data[4]
        } else {
            this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error('获取失败！')
      })
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  position: relative;
}
.memeber_title_img {
    position: relative;
    height: 180px;
    width: 100%;
    text-align: center;
}

.main_title {
    font-weight: 500;
    font-size: 38px;
    color: #333333;
    padding: 48px 0 20px 0;
}
.item_title {
    font-weight: 400;
    font-size: 22px;
    color: #999999;
}

.mem_cont {
    display: flex;
    width: 80%;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 10%;
}

.cont_top {
    height: 25px;
    display: flex;
    justify-content: flex-start;
}

.cont_tops {
    height: 21px;
    line-height: 21px;
}
.top_text {
    background: linear-gradient(180deg, #EE7863 0%, #EB504B 100%);
    border-radius: 10px 0px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #FFFFFF;
    padding: 4px 20px;
    
}

.top_text-valid {
    background: #FACD91;
    border-radius: 5px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #D9001B;
    padding: 4px 20px;
}

.mem_cont .cont {
    width: 260px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
    border-radius: 10px;
    margin: 15px;
    cursor: pointer;
    transition: all .2s;
}

.box_top {
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid #1F64FF;
    border-right: 1px solid #1F64FF;
    border-left: 1px solid #1F64FF;
    width: calc(100% - 2px);
}

.box_tops {
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0 0;
    width: 100%;
}
.cont_title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0 0 0;
}

.cont_price {
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.price_l {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #EB504B;
}
.price_m {
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    color: #EB504B;
}

.price_r {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-decoration-line: line-through;
    color: #999999;
    margin-left: 5px;
}

.cont_btn {
    background: linear-gradient(90deg, #1F64FF 0%, #94B5FF 100%);
    box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn_text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: #FFFFFF;
}

.date_number {
    margin: 8px 0 20px 0 ;
}

.date_number .item {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    text-align: center;
    color: #666666;
}

.up-distribution-illustrate {
  padding: 20px;
  margin-top: 60px;
  width: 100%;
  border: 1px solid #dedede;
}

.illustrate_title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #999999;
}
.illustrate_content {
  font-size: 14px;
  color: #333333;
}
</style>