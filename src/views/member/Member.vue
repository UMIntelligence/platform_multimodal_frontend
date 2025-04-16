/**
 * 基础菜单 升级会员
 */
<template>
  <div class="container">
      <div class="memeber_title_img">
        <img class="back_img" src="../../assets/images/member_bg.png" alt="">
        <div class="main_title">享受更高级别的服务和体验，让您的GPT使用更加便捷！</div>
    </div>

    <!-- <div class="mem_cont">
        <div class="cont" @click="current = index" v-for="(item, index) in memberList" :key="index">
            <div :class="[current == index ? 'box_top' : 'box_tops']">
                <div class="cont_top" style="justify-content: flex-end;">
                    <span class="top_text-valid" :style="current == index ? 'border-top-right-radius: 10px;' : ''">{{ item.prod_desc.valid }}</span>
                </div>
                <div class="cont_title">
                    <img class="title_img" src="../../assets/images/member_tip.png" alt="">
                    <span class="title_text">{{ item.prod_name }}</span>
                </div>
                <div class="price_main">
                    <div class="cont_price" style="margin: 20px 0 16px 0;">
                        <div class="price_l" style="vertical-align: bottom;">￥</div>
                        <div class="price_m" style="vertical-align: bottom;height: 28px;line-height: 28px;">{{ item.prod_price }}</div>
                    </div>
    
                    <div class="cont_price">
                        <div class="price_r">原价:{{ item.prod_origin_price }}</div>
                    </div>
                </div>

                <div class="date_number">
                    <div class="item">{{ item.prod_desc.count }}</div>
                </div>
            </div>
            <div class="cont_btn" @click.stop="isBtn ? goPay(index,item) : ''">
                <span class="btn_text">立即购买</span>
            </div>
        </div>
    </div> -->

    <!-- 通用流量包 -->
    <div class="traffic_packet" style="height: 100%;margin-bottom: 20px;">
        <div class="cont_title-traffic">
            <div class="cont_line-item">
                选择通用流量包，可在各模型上尽情使用
                <el-tooltip placement="top">
                    <div slot="content" class="tooltip_public">
                        购买通用包(流量包)后，价格将转换为算力使用<br />
                        1元=50算力<br />

                        聊天<br />
                        AI35：1k token消耗4算力<br />
                        AI40：1k token消耗65算力<br />
                        文心一言：1k token消耗4算力<br />
                        讯飞星火：1k token消耗4算力<br />

                        AI绘画<br />
                        DALLE.2：每张图消耗35算力<br />
                        百度绘画：每张图消耗35算力<br />
                        Midjourney：每张图消耗50算力<br />
                    </div>
                    <el-button icon="el-icon-question" style="padding: 0;background-color: transparent;border: none;color: #999999;"></el-button>
                </el-tooltip>
            </div>
        </div>
        <div class="item_title">通用流量包</div>

        <div class="traffic_packet-mask">
            <div class="traffic_packet-item" v-for="(item, index) in publicList" :key="index" style="position: relative;">
                <!-- 有效期 -->
            <div class="traffic_packet-item_title">{{ item.prod_desc.valid }}</div>

                <!-- 标题和内容 -->
                <div class="title" style="border-bottom: 1px solid #dedede;">
                    <div class="name" style="margin-bottom: 10px;font-size: 18px;">
                        {{item.prod_name}}
                    </div>
                    <div class="name" style="margin-bottom: 10px;font-size: 12px;color: #999999;">{{ item.prod_details.value }}</div>
                </div>

                <div class="pay-integral">{{ Number(item.prod_points) * item.shopNumber }}算力</div>
                <!-- 计算价格 -->
                <div class="pay-number" style="margin-bottom: 60px;">
                    <div style="display: flex;">
                        <div style="color: #F30C07;">￥{{ Number(item.prod_price) * item.shopNumber }}</div>
                        <div class="price_r" style="font-size: 12px;line-height: 21px;" v-if="Number(item.prod_origin_price) != Number(item.prod_price)">原价：{{ item.prod_origin_price }}</div>
                    </div>
                    <el-input-number class="select-number" v-model="item.shopNumber" size="mini" @change="event => handleChange(event, 0, item)" :min="1" :max="9999" label="描述文字"></el-input-number>
                </div>
                <div class="traffic_btn" @click.stop="isBtn ? goPay(index,item, 'page') : ''" style="position: absolute;left: 0;right: 0;bottom: 0;">立即购买</div>
            </div>
        </div>
    </div>


    
<!-- 流量包 -->
    <div class="traffic_packet" style="height: 100%;">
        <div class="cont_title-traffic">
            <div class="cont_line-item">我们提供多种流量包选择，以满足您不同的需求和预算，享受无限制的使用体验！</div>
        </div>
        <div class="item_title">更多轻松畅享流量包</div>

        <div class="traffic_packet-mask">
            <div class="traffic_packet-item" v-for="(item, index) in flowList" :key="index">
                <!-- 有效期 -->
                <div class="traffic_packet-item_title">{{ item.prod_desc.valid }}</div>
                <!-- 流量包名称 -->
                <div class="title">
                    <span class="name">{{item.prod_name}}</span>
                </div>
                <!-- 数量 -->
                <div class="token_number-mask">
                    <span class="member-content" v-if="item.prod_id == '13' || item.prod_id == '14' || item.prod_id == '22' || item.prod_id == '23' || item.prod_id == '27' || item.prod_id == '28' || item.prod_id == '30' || item.prod_id == '31'">
                        用量：
                        <span class="token_number">{{ item.shopNumber * Number(item.prod_desc.count) }}万</span>
                        token
                    </span>
                    <span class="member-content" v-else>
                        用量：
                        <span class="token_number">{{ item.shopNumber * Number(item.prod_desc.count) }}</span>
                        张
                    </span>
                </div>

                <!-- 计算价格 -->
                <div class="pay-number" style="margin-bottom: 20px;">
                    <div style="font-size: 18px;color: #F30C07;">￥{{Number((Number(item.prod_price) * item.shopNumber).toFixed(2))}}</div>
                    <el-input-number class="select-number" v-model="item.shopNumber" size="mini" @change="event => handleChange(event, 1, item)" :min="1" :max="9999" label="描述文字"></el-input-number>
                </div>
                <div class="traffic_btn" @click.stop="isBtn ? goPay(index,item, 'page') : ''">立即购买</div>
            </div>
        </div>
    </div>

    <!-- 绑定手机号 -->
    <el-dialog title="绑定手机" :visible.sync="bindVisible" width="400px" center :close-on-click-modal="false" :show-close="false">
        <div class="phone">
            <div class="mobile">
                <img class="mobile_img" src="../../assets/images/login_phone.png" alt="">
                <div class="mobile_input">
                    <el-input placeholder="请输入手机号" v-model="phone"></el-input>
                </div>
            </div>
            <div class="warn_tip" v-if="ismobile">
                <span class="warn_text">{{ phoneMsg }}</span> 
            </div>

            <div class="mobile">
                <img class="mobile_img" src="../../assets/images/verify_code.png" alt="">
                <div class="mobile_input">
                    <el-input placeholder="请输入验证码" v-model="code"></el-input>
                </div>
                <div class="verify" @click="handleSendCode">{{ countDown > 0 ? countDown + '秒' : '获取验证码' }}</div>
            </div>
            <div class="warn_tip" v-if="iscode">
                <span class="warn_text">{{ codeMsg }}</span> 
            </div>

            <div class="login_btn" @click="bindPhone()">绑定</div>
        </div>
        
    </el-dialog>

    <!-- 支付组件 -->
    <Pay ref="Pay" @getPhone="getPhone" :datas="payInfo" @closepay="closePay"></Pay>
    <!-- 客服组件 -->
    <Customer ref="Customer"></Customer>
    <!-- 注册组件 -->
    <Register ref="Register"></Register>

    <!-- <get-image-code @queryimagecode="queryImageCode" ref="imageCode"></get-image-code> -->
  </div>
</template>

<script>
import { products, phoneLogin, getCode } from '../../api/chatMG'
import Pay from '../../components/pay'
import Customer from '../../components/customer'
import Register from '../../components/register'
import httpUrls from '../../api/requestURL'
import getImageCode from '../../components/getImageCode'

export default {
  name: 'member',
  data() {
    return {
      memberList: [],
      flowList: [],
      publicList: [],

      // 流量包
      gpt35Number: 1,
      gpt40Number: 1,
      delleNumber: 1,
      baiduNumber: 1,
      wenxinNumber: 1,
      xunfeiNumber: 1,
      mjNumber: 1,
      
      // 通用流量包
      gpt35NumberPublic: 1,
      gpt40NumberPublic: 1,
      delleNumberPublic: 1,
      baiduNumberPublic: 1,
      current: 0,
      payInfo: {},
      bindVisible: false,

      // 手机号绑定
      ismobile: false,
      phoneMsg: '',
      phone: '',

      iscode: false,
      codeMsg: '',
      code: '',

      countDown: 0,
      downTimer: '',

      isClick: true,
      isBtn: true,

      vipTitle: [
        {title: '更快的响应速度', content: '优质网络、高带宽传输'},
        {title: '优先使用新功能', content: '紧跟模型版本'},
        {title: '回答问题更智能', content: '持续进化、智能不断升级'},
        {title: '可以关联上下文会话', content: '关联上下文、清晰主题'},
      ],
      aiNameList: [
        {title: 'AI35', content: '1000', contents2: '1000', activity: '1000', week: '1000', day: '100'},
        {title: 'AI40', content: '赠送10', contents2: '赠送10', activity: '赠送10', week: '赠送10', day: '赠送10'},
        {title: 'DALL·E 2', content: '赠送2', contents2: '赠送2', activity: '赠送2', week: '赠送2', day: '赠送2'},
        {title: '百度绘画', content: '赠送2', contents2: '赠送2', activity: '赠送2', week: '赠送2', day: '赠送2'},
      ],
      trafficPacket: 1
    }
  },
  // 注册组件
  components: {
    Pay,
    Customer,
    Register,
    getImageCode
  },

  /**
   * 创建完毕
   */
  created() {
      this.getMemberList()
  },

  mounted() {
    // document.title = httpUrls.name + '会员,更快速的响应速度,享有尊贵的特权,回答更多智能问题,满足并帮你解决更多的需求.'
    // let metaKeywords = document.createElement('meta')
    // metaKeywords.id = 'chat-meta-keywords'
    // metaKeywords.name = 'keywords'
    // metaKeywords.content = 'GPT3.5,GPT4.0,DALL·E2,百度绘画,AI聊天,人工智能聊天机器'
    // document.getElementsByTagName('head')[0].appendChild(metaKeywords)

    // let metaDescription = document.createElement('meta')
    // metaDescription.id = 'chat-meta-description'
    // metaDescription.name = 'description'
    // metaDescription.content = '拥有' + httpUrls.name + '尊贵会员,你就能享有尊贵的特权,能解决更多的需求和问题,可以关联上下文对话,' + httpUrls.name + '不仅仅是一款聊天机器,更是一个能够帮助你提高工作效率和创造力的全方位工具.'
    // document.getElementsByTagName('head')[0].appendChild(metaDescription)
  },

  beforeDestroy() {
    // document.getElementById('chat-meta-keywords').remove()
    // document.getElementById('chat-meta-description').remove()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    handleChange(e, type, item) {
        if (type === 0) {
            if (e == undefined) {
                this.$nextTick(() => {
                    for (let i = 0; i < this.publicList.length; i++) {
                            if (this.publicList[i].prod_id == item.prod_id) {
                                this.publicList[i].shopNumber = 1
                                // console.log(this.publicList);
                            }
                        }
                        this.$forceUpdate();//解决点击计数器失效问题
                    })
                } else {
                    for (let i = 0; i < this.publicList.length; i++) {
                        if (this.publicList[i].prod_id == item.prod_id) {
                            this.publicList[i].shopNumber = Math.ceil(e)
                        }
                    }
                    this.$forceUpdate();//解决点击计数器失效问题
                }
            } else {
                if (e == undefined) {
                    for (let i = 0; i < this.flowList.length; i++) {
                        if (this.flowList[i].prod_id == item.prod_id) {
                            this.flowList[i].shopNumber = 1
                        }
                    }
                    this.$forceUpdate();//解决点击计数器失效问题
                } else {
                    for (let i = 0; i < this.flowList.length; i++) {
                        if (this.flowList[i].prod_id == item.prod_id) {
                            this.flowList[i].shopNumber = Math.ceil(e)
                        }
                    }
                    this.$forceUpdate();//解决点击计数器失效问题
                }
            }
    },

    // 付款成功的回调，商品数量恢复默认
    closePay() {
        this.gpt35Number = 1
        this.gpt40Number = 1
        this.delleNumber = 1
        this.baiduNumber = 1
        this.wenxinNumber = 1
        this.xunfeiNumber = 1
        this.mjNumber = 1
        this.gpt35NumberPublic = 1
        this.gpt40NumberPublic = 1
        this.delleNumberPublic = 1
        this.baiduNumberPublic = 1
    },
    
    // 打开注册框
    goPay(index,item, page) {
        let loginInfo = JSON.parse(localStorage.getItem('userInfo'))
        // console.log(loginInfo);
        if (loginInfo.role == 'guess') {
            this.$refs.Register.registerVisible = true
            return
        }
        console.log(item);
        let totalPrice = 0 // 需要付款的价格
        let shopNumber = 1 // 商品数量
        totalPrice = Number((item.prod_price * item.shopNumber).toFixed(2))
        shopNumber = item.shopNumber
        if (page != 'page') { // 点击流量包不改变下标
            this.current = index;
        }
       this.payInfo = {...item, totalPrice, shopNumber};
       this.isBtn = false;
       setTimeout(() => {
            this.isBtn = true;
       }, 1000);
       this.$refs.Pay.PayVisible = true
    },

    // 打开绑定手机号弹窗
    getPhone() {
        this.bindVisible = true;
    },

    // 打开客服弹窗
    goCustomer() {
       this.$refs.Customer.customergVisible = true
    },

    // 获取会员列表
    getMemberList() {
      let val = {
        'prod_cate_id': [3, 5, 6]
      }
      products(val).then(res => {
          if (res.code == 20000) {
              let list = [
                {number: '不限次数', dataDate: '三年有效期'},
                {number: '不限次数', dataDate: '一年有效期'},
                {number: '3000次', dataDate: '90天有效期'},
                {number: '1000次', dataDate: '30天有效期'},
                {number: '100次', dataDate: '7天有效期'},
                // {number: '100次', dataDate: '2天有效期'},
            ]
            this.memberList = res.data[3] // 会员
            this.flowList = res.data[5] // 流量包
            this.publicList = res.data[6] // 通用流量包
            this.publicList.sort((a, b) => {
                return b.prod_price - a.prod_price
            })
            for (let i = 0; i < this.memberList.length; i++) {
                this.memberList[i] = {...this.memberList[i], ...list[i], shopNumber: 1}
            }
            for (let i = 0; i < this.flowList.length; i++) {
                this.flowList[i] = {...this.flowList[i], shopNumber: 1}
            }
            for (let i = 0; i < this.publicList.length; i++) {
                this.publicList[i] = {...this.publicList[i], shopNumber: 1}
            }
          } else {
              this.$message.error(res.msg)
          }
      }).catch(err => {
          this.$message.error('获取失败！')
      })
    },

    queryImageCode() {
        this.countDown = 60;
        this.downTimer = setInterval(() => {
            this.downCounter()
        }, 1000)

        if(this.isClick == false) {
            return false;
        }
        this.isClick = false;

        let val = { mobile: this.phone,action:"web",Ticket:this.ticket,Randstr:this.randstr };

        getCode(val).then(res => {
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
    handleSendCode() {
        if(this.phone == '') {
            this.ismobile = true;
            this.phoneMsg = '手机号不能为空';
            return false;
        } else {
            this.ismobile = false;
            this.phoneMsg = '';
        }

        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(TEL_REGEXP.test(this.phone)){
            this.ismobile = false;
            this.phoneMsg = '';
        } else {
            this.ismobile = true;
            this.phoneMsg = '手机号格式不正确';
            return false;
        }
        this.getTicket().then((isValid) => {
        if (isValid) {
          this.queryImageCode();
        }
      });
        // this.$refs.imageCode.dialogVisible = true
    },

    downCounter() {
        if ((this.countDown -= 1) <= 0) {
            this.isClick = true;
            clearInterval(this.downTimer)
        }
    },

    // 绑定手机
    bindPhone() {
        if(this.phone == '') {
            this.ismobile = true;
            this.phoneMsg = '手机号不能为空';
            return false;
        } else {
            this.ismobile = false;
            this.phoneMsg = '';
        }

        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(TEL_REGEXP.test(this.phone)){
            this.ismobile = false;
            this.phoneMsg = '';
        } else {
            this.ismobile = true;
            this.phoneMsg = '手机号格式不正确';
            return false;
        }
        
        if(this.code == '') {
            this.iscode = true;
            this.codeMsg = '验证码不能为空';
            return false;
        } else {
            this.iscode = false;
            this.codeMsg = '';
        }

        if(this.isClick == false) {
            return false;
        }
        this.isClick = false;

        let info = JSON.parse(localStorage.getItem("userInfo"));
        let val = {
            "mobile": this.phone,
            "code": this.code,
            "user_code": info.user_code
        }

        phoneLogin(val).then(res => {
            if (res.code == 20000) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                this.$store.dispatch('user/changeInfo', res.data.user_id);
                this.$root.Bus.$emit('loginInfo', 1) // 更新登录信息
                if(this.$route.path != '/index') {
                    this.$router.push({ path: '/index' });
                }
                this.$message.success('绑定成功！');
                this.registerVisible = false;
                this.isClick = true;
            } else {
                this.$message.error(res.msg);
                this.isClick = true;
            }
        }).catch(err => {
            this.$message.error('绑定失败!');
            this.isClick = true;
        })

     },
  }
}
</script>

<style scoped>
.cont_title-mark {
    position: absolute;
    left: 10%;
    bottom: 0;
    display: flex;
}
.cont_title-mark .cont_line {
    margin-left: 15px;
    height: 30px;
    width: 4px;
    background-color: #1F64FF;
    border-radius: 2px;
}
.cont_title-mark .cont_title-item {
    line-height: 30px;
    margin-left: 8px;
    font-weight: 400;
    font-size: 22px;
    color: #000000;
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
.back_img {
    width: 100%;
    left: 0;
    height: auto;
    position: absolute;
    z-index: -1;
    margin-top: -52px;
}

.mem_cont {
    display: flex;
    width: 80%;
    cursor: pointer;
    padding: 0 10%;
    flex-wrap: wrap;
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
    background: linear-gradient(135deg, #80A7FF 0%, #4D83FF 100%);
    border-radius: 5px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #FFFFFF;
    padding: 4px 20px;
}

.mem_cont .cont {
    width: calc(25% - 30px);
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
    border-radius: 10px;
    margin: 15px;
    transition: all .2s;
}

.mem_cont .cont:hover {
    transform: scale(1.05);
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
.title_img {
    width: 28px;
    height: 24px;
}
.tittle_text {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 200%;
    color: #222;
    margin-left: 5px;
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

.cont_li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 15%;
}
.li_img {
    width: 6px;
    height: 6px;
}
.li_r {
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    color: #4C535C;
    margin-left: 10px;
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
.ad {
    width: 100%;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.ad_title {
    width: 70%;
    margin: auto;
    margin-bottom: 20px;
}
.ad_text {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 150%;
    color: #000;
}

.ad_img {
    width: 70%;
    height: 162px;
    margin: auto;
    
}

.ad_slove {
    position: relative;
    left: 15%;
}

.ad_cont {
    position: absolute;
    top: 30px;
    left: 20px;
    
}

.ad_cont_text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
}

.ad_btn {
    background: #1F64FF;
    box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
    border-radius: 10px;
    width: 160px;
    padding: 10px 0;
    margin-top: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ad_btn_text {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #fff;
    cursor: pointer;
}

.month_price {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: #EB504B;
    text-align: center;
}

/* 手机号登录 */
.phone {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.mobile {
    width: 75%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #F5F6FA;
    border-radius: 10px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
}

.mobile_img {
    width: 14px;
    height: 16px;
    
}

.mobile_input {
    flex: 1;
    margin-left: 10px;
}
.verify {
    width: 90px;
    height: 38px;
    background: #fff;
    border: 1px solid #1F64FF;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #1F64FF;
    cursor: pointer;
}

.login_btn {
    width: 80%;
    height: 40px;
    background: #1F64FF;
    box-shadow: 1px 4px 10px rgba(31, 100, 255, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: #fff;
    margin-top: 30px;
    cursor: pointer;
}

.warn_tip {
    width: 80%;
}

.warn_text {
    font-style: normal;
    font-size: 12px;
    line-height: 22px;
    color: #db3232;
    text-align: left;
}

.VIP_title {
    margin-bottom: 50px;
    margin-top: 30px;
}

.VIP_title>.title {
    font-weight: 500;
    font-size: 24px;
    color: #333333;
    margin: 20px 0 15px 0;
    padding: 0 15%;
}

.VIP_title .item {
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
    padding: 0 15%;
}

.VIP_title_item {
    width: 20%;
}

.VIP_title_item .title_one {
    font-weight: 500;
    font-size: 22px;
    color: #1F64FF;
    margin: 12px 0 12px 12px;
    text-align: center;
}

.VIP_title_item .title_two {
    font-weight: 400;
    font-size: 12px;
    color: #888888;
    margin-left: 12px;
    margin-bottom: 12px;
    text-align: center;
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

.traffic_packet .cont_title-traffic {
    padding: 0 10%;
    display: flex;
}

.cont_title-traffic .cont_line {
    margin-left: 15px;
    height: 30px;
    width: 4px;
    background-color: #1F64FF;
    border-radius: 2px;
}
.cont_title-traffic .cont_line-item {
    line-height: 30px;
    margin-left: 15px;
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 22px;
    color: #333333;
}
/* .traffic_packet {
    margin-top: 60px;
} */
.traffic_packet .item_title {
    font-weight: 500;
    font-size: 16px;
    color: #333333;
    padding-left: 10%;
    margin-left: 15px;
}

.traffic_packet-mask {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10%;
    margin-bottom: 30px;
}

.traffic_packet-item {
    background: #F6F8FB;
    width: calc(25% - 30px);
    border-radius: 10px;
    margin: 15px;
    position: relative;
    transition: all 0.2s;
}

.traffic_packet-item_title {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    padding: 2px 4px;
    border-radius: 4px;
    background: linear-gradient(135deg, #80A7FF 0%, #4D83FF 100%);
    color: #FFFFFF;
}
.traffic_packet-item>.title {
    margin-bottom: 15px;
    padding: 12px 16px 0 16px;
}
.traffic_packet-item .title .name {
    font-weight: 500;
    font-size: 16px;
    color: #333333;
}

.traffic_packet-item .title .member-content {
    font-weight: 400;
    font-size: 14px;
    display: block;
    color: #999999;
    white-space: nowrap;
    margin-left: 10px;
}

.traffic_packet-item .pay-number {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
}

.pay-integral {
    color: #666;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 12px;
    padding: 0 16px;
}

.pay-number .title {
    font-weight: 400;
    font-size: 14px;
    color: #627BB5;
    margin-bottom: 6px;
}

.total-price {
    display: flex;
    font-weight: 500;
    font-size: 12px;
    color: #F30C07;
    margin: 12px 0;
    padding: 0 16px;
}

.traffic_btn {
    background: linear-gradient(90deg, #1F64FF 0%, #94B5FF 100%);
    box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
    border-radius: 0px 0px 10px 10px;
    padding: 11px 0;
    text-align: center;
    font-family: 'PingFang SC';
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
}

.token_number-mask {
    padding-left: 16px;
    margin-bottom: 10px;
    white-space: nowrap;
    font-size: 12px;
    color: #999999;
    border-bottom: 1px solid #dedede;
    padding-bottom: 10px;
}

.token_number {
    margin-right: 4px;
    padding: 2px 6px;
    background-color: #83A9FF;
    border-radius: 4px;
    font-size: 14px;
    color: #FFFFFF;
}


@media (width >= 1440px) {
    .mem_cont .cont {
        width: calc(25% - 30px);
    }
    .main_title {
        font-size: 38px;
    }
    .traffic_packet-item {
        width: calc(25% - 30px);
    }
}

@media (width < 1440px) and (width >= 960px) {
    .mem_cont .cont {
        width: calc(50% - 30px);
    }
    .main_title {
        font-size: 28px;
    }
    .traffic_packet-item {
        width: calc(50% - 30px);
    }   
}

@media (width < 960px) {
    .mem_cont .cont {
        width: calc(100% - 30px);
    }
    .main_title {
        font-size: 22px;
    }
    .traffic_packet-item {
        width: calc(100% - 30px);
    }
}
</style>

<style>
.select-number {
    width: 84px;
}
.select-number .el-input-number__increase {
    width: 20px;
    height: 20px;
    background-color: #FFFFFF;
    line-height: 20px;
    border: none;
}
.select-number .el-input-number__decrease {
    width: 20px;
    height: 20px;
    background-color: #FFFFFF;
    line-height: 20px;
    margin-right: 4px;
    border: none;
}

.select-number .el-input {
    height: 20px;
    line-height: 20px;
}

.select-number .el-input__inner {
    height: 20px;
    line-height: 20px;
    width: 36px;
    padding: 0;
    margin: 0 0 0 24px;
    border: none;
    background-color: #FFFFFF;
    border-radius: 4px;
}

.traffic_packet-item .title .tooltip_public {
    background-color: #333333;
}
</style>