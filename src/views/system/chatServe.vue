<template>
  <div id="main">
    <main>
      <!-- 顶部标题 -->
      <div class="title domHover" @click="handleBack">
        <span class="homhover" > <i class="el-icon-arrow-left "></i> </span>
        {{ titleLabel}}
      </div>
      <!-- 主题内容 -->
      <section>
        <!-- 页面一  -->
        <div class="pageOne" v-if="pageLabel == 'pageOne'">
          <nav>注册升级服务商，将拥有更高佣金及权益，期待与你合作</nav>
          <div>
            <div>当前等级：<span>普通分销</span></div>
            <div><span>升级为金牌分销</span></div>
          </div>
          <div>当前分佣比例：成员充值金额的<span>15%</span></div>
          <div>
            <div class="domHover" @click="pageLabel = 'pageTwo'">申请服务商</div>
            <div class="domHover" @click="pageLabel = 'pageFour'">查看权益</div>
          </div>
        </div>
        <!-- 页面二 /注册服务商 -->
        <div class="pageTwo" v-if="pageLabel == 'pageTwo'">
          <nav>请在下方填写相关信息</nav>
          <div>
            <el-form :model="ruleFormA" :rules="rules" ref="ruleFormA" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入你的名字" v-model="ruleFormA.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input placeholder="请输入你的手机号" v-model="ruleFormA.phone"></el-input>
              </el-form-item>
              <el-form-item label="合作意向" prop="desc">
                <el-input type="textarea" placeholder="请输入内容" v-model="ruleFormA.desc"></el-input>
              </el-form-item>
            </el-form>
            <div class="formBtn" @click="submitForm('ruleFormA')">立即提交</div>
          </div>
        </div>
        <!-- 页面三 /服务商首页 -->
        <div class="pageThree" v-if="pageLabel == 'pageThree'">
          <nav class="serverIndex-nav">
            <div class="nav-left">用户：{{ userInfo.nick_name }}</div>
            <div class="nav-right">服务商状态：{{ !data.status ? '审核中' : data.status==2?'审核通过':'审核失败' }}</div>
            <div class="nav-right" v-if="tableData[0]['level_expire_time']">服务商到期时间：{{tableData[0]['level_expire_time']}}</div>
          </nav>
          <div>
            <!-- 主体第一行 -->
            <div class="serverIndex-one">
              <div>
                <div>我的成员人数</div>
                <div>{{ data.member }}</div>
                <div>
                  <div @click="pageLabel = 'pageSix', tableLabel = 'invite'">查看成员</div>
                </div>
              </div>
              <div>
                <div>累计佣金</div>
                <div>{{ data.count_balance + '元' }}</div>
                <div>
                  <div @click="pageLabel = 'pageSix', tableLabel = 'withdrawal'">查看明细</div>
                </div>
              </div>
              <div>
                <div>未提现金额</div>
                <div>{{ data.withdraw_balance + '元' }}</div>
                <div>
                  <div @click="goWithdrawal(data.withdraw_balance)">提现</div>
                </div>
              </div>
            </div>
            <!-- 主体第二行 -->
            <div class="serverIndex-two">
              <div class="domHover" @click="pageLabel = 'pageSix', tableLabel = 'invite'">
                <img :src='httpUrls.ossUrl + "static/picture/debe8200-358e-4b29-93e0-e0c91296192d.png"' />
                <div>团队成员管理</div>
              </div>
              <div class="domHover" @click="pageLabel = 'pageSix', tableLabel = 'deal'">
                <img :src='httpUrls.ossUrl + "static/picture/819c5028-a75f-4b65-bca9-0da67be14d7f.png"' />
                <div>成员交易明细</div>
              </div>
              <div class="domHover" @click="pageLabel = 'pageSix', tableLabel = 'withdrawal'">
                <img :src='httpUrls.ossUrl + "static/picture/458e4932-defb-4d97-90c0-39e90663c183.png"' />
                <div>提佣记录</div>
              </div>
              <div class="domHover" @click="pageLabel = 'pageFour'">
                <img :src='httpUrls.ossUrl + "static/picture/e0a452a4-c99f-4a4f-910f-9f88434cbb4e.png"' />
                <div>查看权益</div>
              </div>
            </div>
            <!-- 主体第三行 -->
            <div class="serverIndex-three">
              <div class="serverIndex-title">服务商状态</div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="start_time" label="注册服务商时间">
                </el-table-column>
                <!-- <el-table-column prop="d_level" label="服务商等级">
                </el-table-column> -->
                <el-table-column prop="level_expire_time" label="服务商到期时间">
                </el-table-column>
                <el-table-column label="审核状态">
                  <template slot-scope="scope">
                    <div class="status">
                      <div :style="scope.row.status == 0 ? 'background-color: #FEE3E2;' : 'background-color: #E0F5E4;'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                          <circle cx="2" cy="2" r="2" :fill="scope.row.status == 0 ? '#F74439' : '#32BE48;'" />
                        </svg>
                      </div>

                      <div :class="scope.row.status == 0 ? 'statusError' : 'statusSuccess'">{{ scope.row.status == 0 ?
                        '审核中'
                        : '审核成功' }}</div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- 页面四 /提交验证码 -->
        <div class="pageFour" style="position:relative;left: -32px;" v-if="pageLabel == 'pageFour'">
          <el-form :model="ruleFormB" :rules="rulesB" ref="ruleFormB" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
              <el-input placeholder="请输入你的手机号码" v-model="ruleFormB.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <div style="width: 100%;height: 40px;display: flex;justify-content:space-between;">
                <el-input placeholder="请输入验证码" style="width: 65%;" v-model="ruleFormB.code"></el-input>
                <el-button style="width: 30%;padding: 12px;" @click="handleSendCode">{{ countDown > 0 ? countDown + '秒' :
                  '获取验证码' }}</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div class="formBtn" @click="handleSubmit('ruleFormB')">提交并查看权益</div>
        </div>
        <!-- 页面五 /查看权益 -->
        <div class="pageFive" v-if="pageLabel == 'pageFive'">
          <nav>升级成为服务商后，您将尊享一下更多权益</nav>
          <div>
            <ul>
              <li>
                <div class="li-title">获得成员升级金牌分销的充值金额</div>
                <div class="li-content">你的成员升级成为金牌分销的充值金额99元都将归您所有</div>
              </li>
              <li>
                <div class="li-title">分佣比例升为50%</div>
                <div class="li-content">
                  您的分销团队成员充值的金额您都将获得最高50%的佣金比例<br> 1.您的分销团队成员若为普通用户（他没有下级分销成员），您将获得他所充值金额的 50%的分佣比例
                  <br>2.您的分销团队成员若为普通分销（假设他有1个下级分销成员A），您将获得他的分销成员A所充值金额的35%的分佣比例，他（您的团队成员）将获得A所充值金额的15%的分佣比例
                  <br>3.您的分销团队成员若为金牌分销（假设他有1个下级分销成员B），您将获得他的分销成员B所充值金额的20%的分佣比例，他（您的团队成员）将获得B所充值金额的30%的分佣比例
                </div>
              </li>
              <li>
                <div class="li-title">更加尊贵的身份标识</div>
                <div class="li-content">享有专属服务商身份标识</div>
              </li>
              <li>
                <div class="li-title">拥有属于自己的专属分销团队</div>
                <div class="li-content">您将畅享拥有自己的分销团队成员</div>
              </li>
            </ul>
          </div>
          <div v-if="data.status == null">
            <button class="domHover" @click="pageLabel = 'pageTwo'">申请服务商</button>
          </div>
        </div>
        <!-- 页面六 /提佣记录/成交明细 -->
        <div class="pageSix" v-if="pageLabel == 'pageSix'">
          <nav class="serverIndex-nav">
            <div class="nav-left">用户：{{ userInfo.nick_name }}</div>
            <div class="nav-right">服务商到期时间：{{ data.level_expire_time }}</div>
          </nav>
          <div class="pageSix-top" v-if="tableLabel == 'withdrawal'">
            <span>提拥明细</span>
            <span>提拥次数：<strong>{{ withdrawalData.length }}</strong></span>
            <span>提拥成功总金额：<strong>{{ withdrawalMoney }} 元</strong></span>
            <span>未提现金额： <strong>{{ withdrawalUndrawn }} 元</strong></span>
            <div class="domHover" @click="goWithdrawal(withdrawalUndrawn)">提现</div>
          </div>
          <div class="pageSix-top" v-if="tableLabel == 'deal'">
            <span>成交明细</span>
            <span>订单数：<strong>{{ dealData.length }}</strong></span>
            <span>累计佣金：<strong>{{ dealTotolMoney }} 元</strong></span>
          </div>
          <!-- 邀请链接 -->
          <div class="invite" v-if="tableLabel == 'invite'">
            <div>邀请链接</div>
            <div>{{ codeLink }}</div>
            <div @click="copyText">复制链接</div>
          </div>
          <div class="pageSix-top">
            <span>我的团队成员</span>
            <span>成员人数：<strong>{{ data.member }}人</strong></span>
          </div>
          <!-- 提佣表格 -->
          <el-table :data="withdrawalData" style="width: 100%" v-if="tableLabel == 'withdrawal'">
            <el-table-column prop="order_no" label="提现单号"></el-table-column>
            <el-table-column prop="withdrawal_amount" label="提现金额"></el-table-column>
            <el-table-column prop="create_time" label="提现时间">
            </el-table-column>
            <el-table-column prop="bank" label="到账银行">
            </el-table-column>
            <el-table-column prop="address" label="提现状态">
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.w_status == 1" class="indent_process">审核中</span>
                  <span v-else-if="scope.row.w_status == 3" class="indent_reject">已驳回</span>
                  <span v-else-if="scope.row.w_status == 2" class="indent_withdrawal">已提现</span>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="注册通过时间">
            </el-table-column> -->
          </el-table>
          <!-- 成交表格 -->
          <el-table :data="dealData" style="width: 100%" v-if="tableLabel == 'deal'">
            <el-table-column prop="order_no" label="提现单号">
            </el-table-column>
            <el-table-column prop="nick_name" label="购买人">
            </el-table-column>
            <el-table-column prop="create_time" label="购买时间">
            </el-table-column>
            <el-table-column prop="amount" label="充值金额">
            </el-table-column>
            <el-table-column prop="reward_commission" label="服务商分佣">
            </el-table-column>
            <el-table-column prop="commission_ratio" label="分佣比例">
            </el-table-column>
          </el-table>
          <!-- 团队成员表格 -->
          <el-table :data="teamData" style="width: 100%" v-if="tableLabel == 'invite'">
            <el-table-column prop="nick_name" label="名称">
            </el-table-column>
            <el-table-column prop="d_level" label="成员级别">
            </el-table-column>
            <el-table-column prop="t_nick_name" label="成员下级">
            </el-table-column>
            <el-table-column prop="create_time" label="加入团队时间">
            </el-table-column>
          </el-table>
        </div>
      </section>
      <!-- <get-image-code @queryimagecode="queryImageCode" ref="imageCode"></get-image-code> -->
    </main>
  </div>
</template>

<script>
import { getTeamdata, getchatServe,verifyCode } from '../../api/chatServe';
import { getCode, business, getUserInfo } from '../../api/chatMG';//申请服务商
import httpUrls from '../../api/requestURL';
import getImageCode from '../../components/getImageCode'; //验证码组件
import { withdrawal, queryQRCode, commissionHistory } from '../../api/distribution'

export default {
  data() {
    return {
      ticket:'',
      randstr:"",
      httpUrls,
      userInfo: {}, //用户信息
      ruleFormA: {   //申请服务商表单
        name: '',
        phone: null,
        desc: ''
      },
      ruleFormB: {  //查看权益表单
        phone: '',
        code: ""
      },
      pageLabel: 'pageOne',
      tableLabel: '',
      rules: {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '手机号不能为空！', trigger: 'blur' },
        ],
      },
      rulesB: {
        phone: [
          { required: true, message: '手机号不能为空！', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '验证码不能为空！', trigger: 'blur' },
        ],
      },
      data: {},  //服务商首页统计数据
      withdrawalData: [],  //提佣表格
      withdrawalMoney: 0,    //成功提现金额
      withdrawalUndrawn: 0,  //未成功提现金额
      dealData: [],   //成交表格
      dealTotolMoney: 0, //成交表格累计佣金
      teamData: [],   //团队成员表格
      tableData: [],   //首页表格
      codeLink: '',  //链接
      countDown: 0,
      iamgeCode: '',
      phoneMsg: '',
      ismobile: false,
      downTimer: '',
      isClick: true,
    }
  },
  // 注册组件
  components: {
    getImageCode
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.init()
  },
  computed: {
    titleLabel(){
      let pageLabel = this.pageLabel;
      let title = '';
      switch (pageLabel) {
        case 'pageOne':
          title = '注册升级服务商'
          break;
          case 'pageTwo':
          title = '填写信息'
          break;
          case 'pageThree':
          title = '服务商导航'
          break;
          case 'pageFour':
          title = '提交验证码'
          break;
          case 'pageFive':
          title = '查看权益'
          break;
          case 'pageSix':
            if (this.tableLabel == 'withdrawal') {
              title = '提佣记录'
            }else if (this.tableLabel == 'deal') {
              title = '成交明细'
            }else{
              title = '成员管理'
            }
          break;
        default:
          break;
      }
      return title
    }
  },
  methods: {
    //佣金提现
    goWithdrawal(val){
      if (val<=0) {
        this.$message('可提现金额为0元，请继续努力')
        return
      }else{
        this.$router.push('/withdrawal/withdrawal')
      }
    },
    // 数据初始化
    init() {
      let requestData = 'page=1&page_size=8&'
      //获取团队成员
      getTeamdata(requestData).then(res => {
        this.teamData = res.data.data;
        console.log(res, '获取团队成员')
      });
      //获取服务商统计数据
      getchatServe().then(res => {
        this.data = Object.assign({}, res.data);
        if (res.data.status != null) {
          this.pageLabel = 'pageThree'  //进入服务商首页
        } else {
          this.pageLabel = 'pageOne'    //申请服务商页面
        }
        console.log(res, '服务商统计数据')
      });
      // 用户中心数据
      getUserInfo().then(res => {
        console.log(res, "获取用户中心数据")
        let { status } = this.data
        let { start_time, level_expire_time, d_level } = res.data;
        this.tableData.push({ status, start_time, level_expire_time, d_level })
      })
      // 提佣表格数据
      withdrawal(requestData).then(res => {
        console.log(res.data, '提佣表格数据');
        let count = 0;
        let totalMoney = 0; //总金额
        res.data.data.forEach(item => {
          totalMoney += item.withdrawal_amount;
          if (item.indent_withdrawal == 2) {
            count += item.withdrawal_amount;
          }
        })
        this.withdrawalMoney = count;   //成功提现金额
        this.withdrawalUndrawn = totalMoney - count;
        this.withdrawalData = res.data.data
      })
      //成交明细数据
      commissionHistory(requestData).then(res => {
        this.dealData = res.data.data
        // dealTotolMoney
        res.data.data.forEach(item => {
          this.dealTotolMoney += item.reward_commission;   //计算累计佣金
        })
      });
      // 获取链接
      queryQRCode({ "q_type": 2, source: httpUrls.source }).then(res => {
        let data = res.data.split('//?')
        this.codeLink = data[0] + '/#/index?' + data[1]
      })
    },
    getTicket() {
      return new Promise((resolve, reject) => {
        let Captcha = new TencentCaptcha("193069182", (res) => {
          console.log(res);
          if (res.ret === 0) {
            this.ticket = res.ticket;
            this.randstr = res.randstr
            resolve(true);
          } else {
            resolve(false);
          }
        });
        Captcha.show();
      });
    },
    //手机号获取验证码
    handleSendCode() {
      if (this.ruleFormB.phone == '') {
        this.ismobile = true;
        this.phoneMsg = '手机号不能为空';
        this.$message.error(this.phoneMsg);
        return false;
      } else {
        this.ismobile = false;
        this.phoneMsg = '';
      }

      var TEL_REGEXP = /^1([39]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (TEL_REGEXP.test(this.ruleFormB.phone)) {
        this.ismobile = false;
        this.phoneMsg = '';
      } else {
        this.ismobile = true;
        this.phoneMsg = '手机号格式不正确';
        this.$message.error(this.phoneMsg);
        return false;
      }
      this.getTicket().then((isValid) => {
        if (isValid) {
          this.queryImageCode();
        }
      });
      // this.$refs.imageCode.dialogVisible = true
    },
    queryImageCode() {
      this.countDown = 60;
      this.downTimer = setInterval(() => {
        this.downCounter()
      }, 1000)

      if (this.isClick == false) {
        return false;
      }
      this.isClick = false;

      let val = { mobile: this.ruleFormB.phone,action:"web",Ticket:this.ticket,Randstr:this.randstr };
      getCode(val).then(res => {
        console.log(res, '获取验证码')
        if (res.code == 20000) {
          this.isClick = true;
        } else {
          this.$message.error(res.msg);
          this.isClick = true;
          this.countDown = 0
        }
      }).catch(err => {
        this.$message.error('获取验证码失败!');
        this.isClick = true;
      })
    },
    downCounter() {
      if ((this.countDown -= 1) <= 0) {
        this.isClick = true;
        clearInterval(this.downTimer)
      }
    },
    //注册服务商
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let requestData = {
            "type": "20",
            "name": this.ruleFormA.name,
            "phone": this.ruleFormA.phone,
            "details": this.ruleFormA.desc,
            "user_id": JSON.parse(localStorage.getItem('userInfo')).user_id
          }
          business(requestData).then(res => {
            if (res.code == 20000) {
              this.pageLabel = 'pageThree';
              this.init()
            } else {
              this.$message.error('网络异常，请稍后重试')
            }
            // console.log(res, "申请服务商")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 提交验证码
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let requestDate = {
            mobile: this.ruleFormB.phone,
            code: this.ruleFormB.code
          }
          verifyCode(requestDate).then(res => {
            console.log(res, '提交验证码')
            if (res.code == 20000) {
              this.pageLabel = 'pageFive';
            }else{
              this.$message.warning('抱歉，网络异常，请重新获取验证码')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 回退页面
    handleBack() {
      switch (this.pageLabel) {
        case 'pageOne':
          this.pageLabel = 'pageOne';
          break;
        case 'pageTwo':
          this.pageLabel = 'pageOne';
          break;
        case 'pageThree':
          this.$router.go(-1)
          this.pageLabel = 'pageThree';
          break;
        case 'pageFour':
          if (this.data.status == null) {
            this.pageLabel = 'pageOne';
          } else {
            this.pageLabel = 'pageThree';
          }
          break;
        case 'pageFive':
          if (this.data.status == null) {
            this.pageLabel = 'pageOne';
          } else {
            this.pageLabel = 'pageThree';
          }
          break;
        case 'pageSix':
          this.pageLabel = 'pageThree';
          break;
        default:
          break;
      }

    },
    // 复制链接
    copyText() {
      var input = document.createElement("input"); // 创建input对象
      input.value = '「' + httpUrls.name + '」是一个AI人工智能平台，点开链接直接打开快来参与吧！' + this.codeLink; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');
    },
  }
}
</script>

<style lang="scss" scoped>
.indent_process,
.indent_reject,
.indent_withdrawal {
  font-weight: 400;
  font-size: 12px;
  color: #F5AC3E;
  background: rgba(245, 172, 62, 0.15);
  border-radius: 2px;
  padding: 2px 12px;
}

.indent_reject {
  color: #EB504B;
  background: rgba(235, 80, 75, 0.15);
}

.indent_withdrawal {
  color: #52C41A;
  background: rgba(82, 196, 26, 0.16);
}

.el-table__header-wrapper .has-gutter .el-table__cell {
  background-color: #F6F8FA !important;
}

.domHover {
  cursor: pointer;
}

.status {
  display: flex;
  align-items: center;
}

.status>div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E0F5E4;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
}

.statusSuccess {
  color: #32BE48;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* 142.857% */
}

.statusError {
  color: #F74439;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 142.857% */
}

#main {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #F1F2F5;

  >main {
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 19px;
    box-sizing: border-box;

    .title {
      color: #666;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      margin-bottom: 19.5px;
      /* 21px */
    }

    nav {
      color: #000;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      margin-bottom: 20px;
      /* 24px */
    }
  }
}


.pageOne {
  >div {
    margin-bottom: 20px;

  }

  >div:nth-child(2) {
    display: flex;
    align-items: center;

    div:first-child {
      color: #000;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;

      /* 21px */
      span {
        color: #000;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
      }
    }

    div:last-child {
      width: 218px;
      height: 32px;

      flex-shrink: 0;
      border-radius: 3px;
      background: #1F64FF;
      color: #FFF;
      text-align: center;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      margin-left: 24px;

      span {
        line-height: 32px;

      }

      /* 21px */
    }
  }

  >div:nth-child(3) {
    color: #000;
    margin-bottom: 34px;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;

    /* 21px */
    span {
      color: #000;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
    }
  }

  >div:nth-child(4) {
    display: flex;

    // margin-top: 10px;
    >div {
      width: 218px;
      height: 48px;
      border-radius: 4px;
      text-align: center;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 48px;
    }

    div:first-child {
      color: #FFF;
      background: #1F64FF;


      /* 21px */
    }

    div:last-child {
      color: #1F64FF;
      background: white;
      border: 1px solid #1F64FF;
      margin-left: 20px;
    }
  }
}

.pageTwo {
  width: 450px;

  .formBtn {
    width: 260px;
    height: 48px;
    line-height: 48px;
    margin: auto;
    text-align: center;
    border-radius: 6px;
    background: #1F64FF;
    box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
    color: #FFF;
    font-family: PingFang SC;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    /* 27px */
    letter-spacing: 0.18px;
  }
}

// 页面三 /服务商首页
.pageThree {}

/* 导航栏 */
.serverIndex-nav {
  width: 100%;
  border-radius: 8px;
  background: #F2F6FF;
  display: flex;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 20px;
  color: #1E211F;
  font-family: PingFang SC;
  font-size: 13px !important;
  font-style: normal;
  font-weight: 400;

  /* 161.538% */
  /* 服务商到期时间 */
  .nav-right {
    margin-left: 45px;
  }
}



.serverIndex-one {
  display: flex;
}

/* 第一行子盒子 */
.serverIndex-one>div {
  width: 232px;
  height: 126px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px 0px;
  margin-right: 15px;
}

.serverIndex-one>div div:nth-child(1) {
  margin-bottom: 8px;
  text-align: center;
  color: #000;

  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 24px */
}

.serverIndex-one>div div:nth-child(2) {
  margin-bottom: 16px;
  text-align: center;
  color: #000;
  font-family: PingFang SC;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 36px */
}

.serverIndex-one>div div:nth-child(3) {
  display: flex;
  justify-content: center;
}

.serverIndex-one>div div:nth-child(3) div {
  border-radius: 4px;
  background: #1F64FF;
  display: inline-flex;
  padding: 8px 27px;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: 10px;
  color: white;
  cursor: pointer;
}



/* 第二行 */
.serverIndex-two {
  margin-top: 60px;
  display: flex;
}

.serverIndex-two>div {
  padding: 15px;
  width: 234px;
  box-sizing: border-box;
  display: flex;
  border: 1px solid #ccc;
  margin-right: 15px;
}

.serverIndex-two>div img {
  margin-right: 12px;
  border-radius: 8px;
  background-color: #999;
  width: 48px;
  height: 48px;
}

.serverIndex-two>div div {
  color: #000;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  /* 21px */
}

.serverIndex-three {
  margin-top: 30px;

  .serverIndex-title {
    color: #000;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-bottom: 18px;
    /* 24px */
  }
}

.el-table__header-wrapper .has-gutter {
  background-color: #F6F8FA !important;
}

.pageFour {
  width: 450px;

  .formBtn {
    width: 260px;
    height: 48px;
    line-height: 48px;
    margin: auto;
    text-align: center;
    border-radius: 6px;
    background: #1F64FF;
    box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
    color: #FFF;
    font-family: PingFang SC;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    /* 27px */
    letter-spacing: 0.18px;
  }
}

.pageFive {
  nav {
    color: #000;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    /* 24px */
  }

  >div:nth-child(2) {
    border-radius: 4px;
    background: #F0F4FF;
    padding: 20px;
    box-sizing: border-box;
    max-width: 1115px;
    margin-bottom: 35px;

    ul {
      margin: 0px;
      padding-left: 20px;

      li::marker {
        color: #1F64FF;
        width: 8px;
        height: 8px;
      }
    }

    li {
      margin-bottom: 16px;

      .li-title {
        color: #000;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        /* 21px */
      }

      .li-content {
        color: #666;
        font-family: PingFang SC;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        /* 19.5px */
      }
    }

    li:last-child {
      margin-bottom: 0px;
    }
  }

  >div:last-child {
    max-width: 1115px;
    display: flex;
    justify-content: center;

    button {
      width: 380px;
      line-height: 48px;
      border-radius: 6px;
      background: #1F64FF;
      color: white;
      border: 0px;
      box-shadow: 0px 2px 6px 0px rgba(98, 98, 98, 0.10);
    }
  }
}

.pageSix {
  .pageSix-top {
    color: #666;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    span {
      margin-right: 20px;
    }

    span:first-child {
      color: #000;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      /* 24px */
    }

    div {
      width: 88px;
      height: 32px;
      flex-shrink: 0;
      border-radius: 4px;
      background: #1F64FF;
      color: #FFF;

      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px;
      text-align: center;
      /* 21px */
    }

    /* 21px */
  }

  // 邀请链接
  .invite {
    display: flex;
    align-items: center;
    margin-bottom: 31px;

    >div:first-child {
      color: #000;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      margin-right: 20px;
      /* 24px */
    }

    >div:nth-child(2) {
      padding: 7px 12px;
      border-radius: 4px;
      border: 1.5px solid #EAEDF0;
      color: #5F5F60;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      /* 18px */
    }

    >div:last-child {
      margin-left: 20px;
      width: 88px;
      line-height: 32px;
      border-radius: 4px;
      background: #1F64FF;
      color: #FFF;
      text-align: center;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      /* 21px */
    }
  }
}</style>