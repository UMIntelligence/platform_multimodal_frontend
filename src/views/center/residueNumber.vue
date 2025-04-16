<template>
  <!-- 
    流量中心
   -->
  <div class="residue-number">
    <GoBackNew></GoBackNew>

    <div class="only_ai35" v-if="levelExpireTime">
      <div style="font-size: 14px;margin-right: 4px;">会员有效期：{{ levelExpireTime }}</div>
      <!-- <div style="font-size: 12px;color: #666666;"> (仅对AI35使用)</div> -->
    </div>

    <!-- new -->
    <!-- <div class="top">
      <div class="top-title">剩余全部算力：6350万</div>
    </div> -->

    <div class="public_package">
      <div>
        <div class="top-title">剩余全部算力：{{ hash_rates.total }}</div>
      </div>
      <div>
        <!-- /center/History 历史对话页面-->
        <el-button size="mini" style="border-color: #1F64FF;color: #1F64FF;font-size: 14px;padding: 10px 16px;"
          @click="$router.push('/shoppingMall')">前往AI商场</el-button>
        <el-button size="mini" type="primary" style="background-color: #1F64FF;font-size: 14px;padding: 10px 16px;"
          @click="$router.push('/order/Order')">查看订单</el-button>
      </div>
    </div>
    <!-- <div class="public_package-title">
      <span class="one">剩余通用算力：{{ totalPublicPackage }}</span>
      <span class="two">(在各模型上均可使用)</span>
    </div> -->
    <div class="item" style="display: flex;">
      <div class="line"></div>
      <div class="title" style="font-size: 14px;">已购买算力优惠包</div>
    </div>
    <template v-if="hash_rates.directed">
      <div class="public_package-title" style="display: flex;">
        <div class="one">剩余总算力：{{ hash_rates.total }}</div>
      </div>
      <div class="public_package-title">
        <span class="one">剩余通用算力：{{ hash_rates.universal }}</span>
        <span class="two">(这各功能上均可使用)</span>
      </div>
      <div class="public_package-title">
        <span class="one">剩余定向算力：{{ hash_rates.directed }}</span>
        <span class="two">(仅限用于AI对话模型)</span>
      </div>
    </template>
    <template v-else>
      <div class="public_package-title" style="display: flex;">
        <div class="one">剩余算力：{{ hash_rates.total }}</div>
      </div>
    </template>
    
    <el-table :header-cell-style="headerRowStyle" :data="publicPackage" style="width: 100%">
      <el-table-column prop="created_at" label="购买时间">
      </el-table-column>
      <el-table-column prop="prod_name" label="套餐">
      </el-table-column>
      <el-table-column prop="total_amount" label="购买金额">
      </el-table-column>
      <el-table-column prop="points" label="算力">
      </el-table-column>
      <el-table-column prop="expire_at" label="到期时间">
      </el-table-column>
    </el-table>

    <div class="public_package">
      <div class="item" style="margin-bottom: 12px; ">
        <div class="line"></div>
        <div class="title">已购买通用算力包</div>
      </div>
    </div>
    <div class="public_package-title" v-if="staticPackage.length != 0">
      <span class="one">剩余通用算力：{{ hash_rates.package }}</span>
      <span class="two">(在各模型上均可使用)</span>
    </div>
    <el-table :header-cell-style="headerRowStyle" :data="staticPackage" style="width: 100%">
      <el-table-column prop="created_at" label="购买时间">
      </el-table-column>
      <el-table-column prop="prod_name" label="套餐">
      </el-table-column>
      <el-table-column prop="total_amount" label="购买金额">
      </el-table-column>
      <el-table-column prop="points" label="算力">
      </el-table-column>
      <el-table-column prop="" label="到期时间">
      </el-table-column>
    </el-table>

    <!-- 系统 -->
    <div class="public_package">
      <div class="item" style="margin-bottom: 12px; ">
        <div class="line"></div>
        <div class="title">系统赠送通用算力包记录</div>
      </div>
    </div>
    <div class="public_package-title" v-if="staticPackage.length != 0">
      <span class="one">剩余赠送通用算力：{{ }}</span>
      <span class="two">(在各模型上均可使用)</span>
    </div>
    <el-table :header-cell-style="headerRowStyle" :data="systemPackage" style="width: 100%">
      <el-table-column prop="created_at" label="赠送时间">
      </el-table-column>
      <el-table-column prop="hash_rates" label="赠送算力">
      </el-table-column>
      <el-table-column prop="reason" label="赠送来源">
      </el-table-column>
      <el-table-column prop="expire_at" label="到期时间">
      </el-table-column>
    </el-table>

    <div class="public_package" style="margin-bottom: 12px;">
      <div class="item">
        <div class="line"></div>
        <div class="title">算力使用规则</div>
      </div>
    </div>
    <el-table :header-cell-style="headerRowStyle" :data="usageRules" style="width: 100%">
      <el-table-column prop="model" label="模型">
      </el-table-column>
      <el-table-column prop="unit" label="单位">
      </el-table-column>
      <el-table-column prop="consume_points" label="消耗算力">
        <template slot-scope="scope">
          {{ scope.row.consume_points }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserInfo, pricingRules, billingCenter } from '../../api/chatMG'
import GoBackNew from '../../components/GoBackNew'

export default {
  name: 'residueNumber',
  data() {
    return {
      hash_rates: {},  //总算力等数据
      dataList: [],
      userInfo: {},
      totalResidue: 0,
      staticPackage: [], //算力包
      publicPackage: [],  //通用包
      systemPackage: [],  //系统赠送
      totalStaticPackage: [],

      totalPublicPackage: 0,
      levelExpireTime: '',
      usageRules: [
        { model: 'AI35', unit: '1k token', consume: '4' },
        { model: 'AI40', unit: '1k token', consume: '65' },
        { model: '文心一言', unit: '1k token', consume: '4' },
        { model: '讯飞星火', unit: '1k token', consume: '4' },
        { model: '百度绘画', unit: '张', consume: '35' },
        { model: 'DALL·E2', unit: '张', consume: '35' },
        { model: 'Midjourney', unit: '张', consume: '50' },
      ]
    }
  },
  components: {
    GoBackNew
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    //处理时间
    endTime(row) {
      let date = new Date(row.created_at).getTime();
      let endTime = new Date(date + 365 * 24 * 60 * 60 * 1000);
      return endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes() + ':' + endTime.getSeconds();
    },
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        if (res.code == 20000) {
          this.userInfo = res.data
          // let count = Object.keys(res.data.member.data).length > 0 ? res.data.member.data.count : 0
          let packages = res.data.package
          // 会员次数和流量包
          // this.dataList.push({ month: count == 0 ? 0 : count.WENXIN.month + '/次', value: packages.wenxin.value + '/token', name: '文心一言' })
          // this.dataList.push({ month: count == 0 ? 0 : count.XUNFEI.month + '/次', value: packages.xunfei.value + '/token', name: '讯飞星火' })
          // this.dataList.push({ month: count == 0 ? 0 : count.AI35.month + '/次', value: packages.gpt35.value + '/token', name: 'AI35' })
          // this.dataList.push({ month: count == 0 ? 0 : count.AI40.month + '/次', value: packages.gpt40.value + '/token', name: 'AI40' })
          // this.dataList.push({ month: count == 0 ? 0 : count.MJ.month + '/张', value: packages.mj.value + '/张', name: 'Midjourney' })
          // this.dataList.push({ month: count == 0 ? 0 : count.DALLE_2.month + '/张', value: packages.dalle2.value + '/张', name: 'DALL·E 2' })
          // this.dataList.push({ month: count == 0 ? 0 : count.BAIDU_DRAWING.month + '/张', value: packages.baidu_drawing.value + '/张', name: '百度绘画' })
          // 通用流量包
          // this.totalResidue = Math.floor(packages.universal.total * 100) / 100
          // this.getPricingRules()
          // this.getPricingRules(res.data.user_id)
          this.getBillingCenter(res.data.user_id)
          // if (res.data.level_expire_time != null) {
          //   this.levelExpireTime = res.data.level_expire_time.split(' ')[0]
          // }
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('获取用户信息失败！');
      })
    },

    // 计费中心
    getBillingCenter(id) {
      billingCenter({ user_id: id }).then(res => {
        if (res.code == 20000) {
          this.hash_rates = Object.assign({}, res.data.hash_rates)
          this.publicPackage = []
          this.staticPackage = []
          //算力规则
          this.usageRules = res.data.rules;
          // 通用包
          if (res.data[3] != undefined) {
            res.data[3].forEach(v => {
              if (this.publicPackage.length < 5) {
                this.publicPackage.push(v)
              }
            });
          }
          this.totalPublicPackage = res.data.universal_rest
          if (res.data[6] != undefined) {
            res.data[6].forEach(v => {
              if (this.staticPackage.length < 5) {
                this.staticPackage.push(v)
              }
            });
          }
          //系统赠送
          if (res.data[9] != undefined) {
            res.data[9].forEach(v => {
              this.systemPackage.push(v)
            })
          }
          // 流量包
          let packagesRest = []
          let originalData = {
            AI35: 'AI35',
            AI40: 'AI40',
            DALLE2: 'DALL·E2',
            baidu_drawing: '百度绘画',
            wenxin: '文心一言',
            xunfei: '讯飞星火',
            mj: 'Midjourney',
            chatglm: 'ChatGLM',
            claude: 'Claude',
            sensecore: '商汤日日新',
            stablediffusion: 'stable diffusion'
          }
          let pageRest = res.data.packages_rest
          for (const key in pageRest) {
            for (const keyss in originalData) {
              if (key == keyss && (key != 'AI35' && key != 'AI40' && key != 'DALLE2' && key != 'claude')) {
                packagesRest.push({ name: originalData[keyss], value: pageRest[key] })
              }
            }
          }
          this.totalStaticPackage = packagesRest
        }
      })
    },

    // 查看详情
    chaKanDetail(row) {
      this.$router.push({
        name: '订单记录',
        params: { item: row }
      })
    },

    headerRowStyle() {
      return 'background: #F5F7FA;color: #333;font-size: 14px;font-weight: 500;line-height: 22px;'
    }
  }
}
</script>

<style scoped>
.top-title {
  font-weight: 600;
  /* margin: 15px 0px; */
}

.top-cont {
  color: rgb(64, 98, 228);
  font-size: 14px;
}

.top-cont span:last-child {
  color: rgb(145, 145, 145);
}

.residue-number {
  padding: 70px 5% 40px 5%;
  position: relative;
}

.only_ai35 {
  background: #EBF1FD;
  padding: 10px 16px;
  color: #2B2B2C;
  font-weight: 500;
  display: flex;
}

.public_package {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}

.public_package .item {
  display: flex;
}

.public_package .item .title {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.item .line {
  border-radius: 10px;
  background: #1F64FF;
  width: 4px;
  height: 20px;
  margin-right: 8px;
}

.public_package-title {
  color: #1F64FF;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0px;
}

.public_package-title .one {
  color: rgb(64, 90, 223);
  margin-right: 5px;
}

.public_package-title .two {
  color: #666666;
}

.package_list {
  display: flex;
  flex-wrap: wrap;
}
</style>