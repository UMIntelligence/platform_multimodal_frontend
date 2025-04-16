<template>
  <div id="main">
    <div class="go-back">
    <div @click="$router.go(-1)" class="go_back-item">
      <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../../assets/images/right.png" alt="">
      <span style="margin-left: 8px;">返回</span>
    </div>
  </div>
    <nav>
      <img
        :src="
          httpUrls.ossUrl +
          'static/picture/093a8cd8-7ccf-4c47-9114-42402f33a090.png'
        "
        alt=""
      />
      <div>
        <div class="nav-text">
          <div>Stable Diffusion服务器租赁&购买</div>
          <div>限时特价优惠</div>
          <div @click="dialogVisible = true" style="cursor: pointer">
            <span style="margin-left: 10px">立即报名</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#2755E4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
    <div class="content">
      <div class="content-top">
        <div class="content-title">
          <img
            :src="
              httpUrls.ossUrl +
              'static/picture/ba11c8e3-a11b-4084-b704-f312f10d6a7d.png'
            "
            alt=""
          />
          <div>1.AI绘画专用主机购买</div>
        </div>
        <div class="content1-main">
          <div class="tips">
            <div>原价：<span>￥9800</span></div>
            <div>
              显示特价优惠<span>￥<b>6980</b></span>
            </div>
          </div>
          <div class="content1-table">
            <div class="tab-header">AIGC高性能算力主机</div>
            <div class="tab-tr">
              <div class="tab-td">CPU</div>
              <div class="tab-td">12核24线程</div>
            </div>
            <div class="tab-tr">
              <div class="tab-td">内存</div>
              <div class="tab-td">32G</div>
            </div>
            <div class="tab-tr">
              <div class="tab-td">GPU</div>
              <div class="tab-td">12G独立显存<span>(RTX3060)</span></div>
            </div>
            <div class="tab-tr">
              <div class="tab-td">硬盘</div>
              <div class="tab-td"><span>1TB</span>高速固态SSD</div>
            </div>
            <div class="tab-tr">
              <div class="tab-td">主板</div>
              <div class="tab-td">intel芯片旗舰主板</div>
            </div>
            <div class="tab-tr">
              <div class="tab-td">电源</div>
              <div class="tab-td">650W高效能</div>
            </div>
            <div class="tab-tr">
              <div class="tab-td">机箱</div>
              <div class="tab-td">高品质商务机箱 结实耐用</div>
            </div>
          </div>
          <div class="content1-text">
            <div>
              <div>满足多场景的AIGC算力需求：</div>
              <div>
                运行SD（stable Diffusion），3s出图；高效率sd
                lora模型训练；可运行AI大语言模型（chatglm3），离线对话；可运行虚拟数字人，高性能直播数字人算力主机跑分35万+，高性能光追显卡，畅玩吃鸡等3D大型游戏
              </div>
            </div>
            <div>
              <div>
                <div>买即送</div>
                <div>商务键盘鼠标*1，21英寸高清显示器*1</div>
              </div>
              <div>
                <div>预安装</div>
                <div>
                  SD（stable
                  Diffusion）软件，超过20个模型；AI大语言模型chatglm3，离线对话，不用付第三方费用；
                </div>
              </div>
              <div>
                <div>送AIGC课程</div>
                <div>
                  <div>
                    1.超过32集AIGC课程，包含入门、初级、中级、进阶、高级，五个章节，后续持续更新；
                  </div>
                  <div>
                    2.SD课程16集，包含安装、工具介绍、使用技巧、实用设计、模型训练，后续持续更新；
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom">
            <div>
              <div>
                <!-- 线 -->
                <div></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4.25"
                    cy="3.75"
                    r="3.25"
                    fill="white"
                    stroke="#1F64FF"
                  />
                </svg>
              </div>
              <div>报名购买</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4.25"
                    cy="3.75"
                    r="3.25"
                    fill="white"
                    stroke="#1F64FF"
                  />
                </svg>
                <!-- 线 -->
                <div></div>
              </div>
            </div>
            <div>
              <!-- 表单 -->
              <div>
                <el-form
                  label-position="top"
                  :model="ruleForm1"
                  :rules="rules1"
                  ref="ruleForm1"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="ruleForm1.name"
                      placeholder="请输入您的姓名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input
                      v-model="ruleForm1.phone"
                      placeholder="请输入您的手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div
                      class="form-submit"
                      @click="submitForm('ruleForm1', 21)"
                    >
                      提交
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <!-- 二维码 -->
              <div>
                <div>客服微信二维码</div>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/e83a102c-528c-446d-a92a-50bcc20d5489.png'
                  "
                  alt=""
                />
                <div>扫码添加微信:youmikf8<span @click="handleCope()">点击复制</span></div>
                <div>客服电话: 19075692560</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-center">
        <div class="content-title">
          <img
            :src="
              httpUrls.ossUrl +
              'static/picture/ba11c8e3-a11b-4084-b704-f312f10d6a7d.png'
            "
            alt=""
          />
          <div>2.云服务器租赁</div>
        </div>
        <div class="content2-main">
          <div>
            <div>
              <div
                style="
                  color: white;
                  background: linear-gradient(
                    90deg,
                    #0b83ff 0.01%,
                    #a5d0ff 110.8%
                  );
                "
              >
                初级版
              </div>
              <div>
                <div>RTX<span>12G</span>独立显卡</div>
                <div>￥0.08<span>/分钟</span></div>
              </div>
            </div>
            <div>
              <div
                style="
                  color: #c7751b;
                  background: linear-gradient(
                    270deg,
                    #ffc177 18.57%,
                    #ffe3b5 129.47%
                  );
                "
              >
                初级版
              </div>
              <div>
                <div>RTX<span>16G</span>独立显卡</div>
                <div>￥0.12<span>/分钟</span></div>
              </div>
            </div>
            <div>
              <div
                style="
                  color: #f8c587;
                  background: linear-gradient(
                    270deg,
                    #171614 18.57%,
                    #5d4b36 129.47%
                  );
                "
              >
                初级版
              </div>
              <div>
                <div>RTX<span>24G</span>独立显卡</div>
                <div>￥0.2<span>/分钟</span></div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom">
            <div>
              <div>
                <!-- 线 -->
                <div></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4.25"
                    cy="3.75"
                    r="3.25"
                    fill="white"
                    stroke="#1F64FF"
                  />
                </svg>
              </div>
              <div>报名租凭</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4.25"
                    cy="3.75"
                    r="3.25"
                    fill="white"
                    stroke="#1F64FF"
                  />
                </svg>
                <!-- 线 -->
                <div></div>
              </div>
            </div>
            <div>
              <!-- 表单 -->
              <div>
                <el-form
                  label-position="top"
                  :model="ruleForm2"
                  :rules="rules2"
                  ref="ruleForm2"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="ruleForm2.name"
                      placeholder="请输入您的姓名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input
                      v-model="ruleForm2.phone"
                      placeholder="请输入您的手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div
                      class="form-submit"
                      @click="submitForm('ruleForm2', 22)"
                    >
                      提交
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <!-- 二维码 -->
              <div>
                <div>客服微信二维码</div>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/e83a102c-528c-446d-a92a-50bcc20d5489.png'
                  "
                  alt=""
                />
                <div>扫码添加微信:youmikf8<span @click="handleCope()">点击复制</span></div>
                <div>客服电话: 19075692560</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <div class="content-title">
          <img
            :src="
              httpUrls.ossUrl +
              'static/picture/ba11c8e3-a11b-4084-b704-f312f10d6a7d.png'
            "
            alt=""
          />
          <div>3.AI绘画训练营</div>
        </div>
        <div class="content3-main">
          <div>
            <div>
              <div>先导课免费听</div>
              <div>你能获得什么?</div>
            </div>
            <div>
              <div>
                <div>高效学习</div>
                <div>无需下载安装软件 边学边练，一站式学习</div>
              </div>
              <div>
                <div>资源提供</div>
                <div>学完提供兼职渠道 渠道有保障</div>
              </div>
              <div>
                <div>优质服务</div>
                <div>随时解答学习问题 的1V1教务团队</div>
              </div>
              <div>
                <div>AI绘画</div>
                <div>基础参数，风格变化 人物模型，动画设计</div>
              </div>
              <div>
                <div>应用落地</div>
                <div>自媒体/工作转换/ 兴趣增收</div>
              </div>
              <div>
                <div>AI绘画</div>
                <div>专业且有实战经验 的老师教学指导</div>
              </div>
            </div>
          </div>
          <div class="content-box-bottom">
            <div>
              <div>
                <!-- 线 -->
                <div></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4.25"
                    cy="3.75"
                    r="3.25"
                    fill="white"
                    stroke="#1F64FF"
                  />
                </svg>
              </div>
              <div>立即报名</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle
                    cx="4.25"
                    cy="3.75"
                    r="3.25"
                    fill="white"
                    stroke="#1F64FF"
                  />
                </svg>
                <!-- 线 -->
                <div></div>
              </div>
            </div>
            <div>
              <!-- 表单 -->
              <div>
                <el-form
                  label-position="top"
                  :model="ruleForm3"
                  :rules="rules3"
                  ref="ruleForm3"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="ruleForm3.name"
                      placeholder="请输入您的姓名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input
                      v-model="ruleForm3.phone"
                      placeholder="请输入您的手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div
                      class="form-submit"
                      @click="submitForm('ruleForm3', 23)"
                    >
                      提交
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <!-- 二维码 -->
              <div>
                <div>客服微信二维码</div>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/e83a102c-528c-446d-a92a-50bcc20d5489.png'
                  "
                  alt=""
                />
                <div>扫码添加微信:youmikf8<span @click="handleCope()">点击复制</span></div>
                <div>客服电话: 19075692560</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="立即报名" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form
          label-position="left"
          :model="applicationRuleForm"
          :rules="applicationRules"
          ref="applicationRuleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="applicationRuleForm.name"
              placeholder="请输入您的姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="applicationRuleForm.phone"
              placeholder="请输入您的手机号码"
            ></el-input>
          </el-form-item>
          <div
              style="width: 40%;padding: 9px;"
              class="form-submit"
              @click="submitForm('applicationRuleForm', 21)"
            >
              立即提交
            </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import httpUrls from "../../api/requestURL";
import { shoppingServer } from "../../api/chatMG";
export default {
  name: "shoppingServer",
  data() {
    return {
      dialogVisible: false, //对话框
      httpUrls,
      qinK: {
        name: "",
        phone: "",
      },
      ruleForm1: {
        name: "",
        phone: "",
      },
      rules1: {
        name: [{ required: true, message: "请输入你的姓名!", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入你的手机号码!", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            pattern: /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{4}[- ]?\d{4}$/,
            message: "请输入有效的手机号码!",
          },
        ],
      },
      ruleForm2: {
        name: "",
        phone: "",
      },
      rules2: {
        name: [{ required: true, message: "请输入你的姓名!", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入你的手机号码!", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            pattern: /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{4}[- ]?\d{4}$/,
            message: "请输入有效的手机号码!",
          },
        ],
      },
      ruleForm3: {
        name: "",
        phone: "",
      },
      rules3: {
        name: [{ required: true, message: "请输入你的姓名!", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入你的手机号码!", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            pattern: /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{4}[- ]?\d{4}$/,
            message: "请输入有效的手机号码!",
          },
        ],
      },
      //报名表单
      applicationRuleForm: {
        name: "",
        phone: "",
      },
      applicationRules: {
        name: [{ required: true, message: "请输入你的姓名!", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入你的手机号码!", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            pattern: /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{4}[- ]?\d{4}$/,
            message: "请输入有效的手机号码!",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(type);
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          console.log(this[formName]);
          let requestData = {
            type,
            name: this[formName].phone,
            phone: this[formName].phone,
            user_id: userInfo.user_id,
          };
          shoppingServer(requestData).then((res) => {
            if (res.code == 20000) {
              this[formName] = this.qinK;
              this.$message.success("提交成功");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("提交失败,请检查你的信息是否正确");
          return false;
        }
      });
    },
    handleCope(){
      var input = document.createElement("input"); // 创建input对象
					input.value = '19075692560'; // 设置复制内容
					document.body.appendChild(input); // 添加临时实例
					input.select(); // 选择实例内容
					document.execCommand("Copy"); // 执行复制
					document.body.removeChild(input); // 删除临时实例
          this.$message.success('已复制该微信号')
    }
  },
};
</script>
<style lang="scss" scoped>
.el-dialog /deep/ .el-form-item__content {
  margin-left: 0px;
  // display: flex;
  // justify-content: center;
}
/deep/ .el-form-item__label {
  padding-bottom: 3px;
  line-height: 23px;
  color: #000;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
}

.el-form-item {
  margin-bottom: 18px !important;
}

.form-submit {
  gap: 10px;
  text-align: center;
  background: #1f64ff;
  color: white;
  font-family: PingFang SC;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  margin: auto;
}

#main {
  width: 100%;
  height: auto;
  background-color: #f1f2f5;
  box-sizing: border-box;
  padding: 0px;
  position: relative;
  .go-back{
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 100000000;
  color: #FFF;
}
.go_back-item {
  display: flex;
  cursor: pointer;
  
  transition: all .2s;
}
  nav {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #2755e4;
    width: 100%;
    height: 205px;
    overflow: hidden;
    > img {
      position: absolute;
      height: calc(100% - 20px);
      width: 100%;
    }

    > div {
      z-index: 1;

      .nav-text {
        position: relative;
        left: 155px;

        > div:first-child {
          text-align: center;
          font-family: Douyin Sans;
          font-size: 34px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          background: linear-gradient(
            90deg,
            #c7f8fd 1.9%,
            #e2faff 23.59%,
            #fff 66.5%,
            #c6f9fc 101.21%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        > div:nth-child(2) {
          color: #3df6fe;
          font-family: Douyin Sans;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        > div:last-child {
          margin-top: 10px;
          background-color: white;
          width: 150px;
          height: 38px;
          border-radius: 4px;
          color: #2755e4;
          text-align: center;
          font-family: PingFang SC;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .content {
    width: 75%;
    position: relative;
    top: -10px;
    margin: auto;

    > div {
      background: white;
      border-radius: 8px;
      padding: 30px 50px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }

    .content-box-bottom {
      > div:first-child {
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        > div:nth-child(1) {
          width: 44%;
          display: flex;
          align-items: center;

          div {
            width: 100%;
            height: 0.75px;
            background-color: #0378fe;
          }
        }

        > div:nth-child(2) {
          width: 12%;
          color: #1f64ff;
          font-family: PingFang SC;
          font-size: 17px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          text-align: center;
        }

        > div:nth-child(3) {
          width: 44%;
          display: flex;
          align-items: center;

          div {
            width: 100%;
            height: 0.75px;
            background-color: #0378fe;
          }
        }
      }

      > div:last-child {
        display: flex;
        justify-content: space-between;

        > div:first-child {
          width: 56%;
        }

        > div:last-child {
          width: 44%;

          div:nth-child(1) {
            color: #000;
            text-align: center;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%;
            margin-bottom: 12px;
          }

          img {
            width: 100px;
            height: 100px;
            text-align: center;
            position: relative;
            left: 50%;
            transform: translate(-50%);
          }

          div:nth-child(3) {
            text-align: center;
            margin: auto;

            margin-top: 5.5px;
            color: #000;
            font-family: PingFang SC;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            span {
              margin-left: 16.5px;
              color: #1f64ff;
              font-family: PingFang SC;
              font-size: 13px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }

          div:nth-child(4) {
            margin: auto;

            margin-top: 17.5px;
            text-align: center;
            color: #000;
            font-family: PingFang SC;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
      }
    }

    .content-title {
      width: 216px;
      height: 29px;
      position: relative;
      margin: auto;

      > img {
        position: absolute;
      }

      > div {
        z-index: 10;
        box-sizing: border-box;
        position: absolute;
        white-space: nowrap;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: white;
      }
    }

    .content1-main {
      .tips {
        display: flex;
        justify-content: center;
        align-items: end;
        margin-top: 16.5px;

        > div:first-child {
          margin-right: 88px;
          color: #3f3f3f;
          font-family: PingFang SC;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin-bottom: 3px;

          span {
            color: #3f3f3f;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-decoration-line: strikethrough;
          }
        }

        > div:last-child {
          color: #000;
          font-family: PingFang SC;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;

          span {
            color: #ff2727;
            font-family: DIN;
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
        }
      }

      .content1-table {
        width: 100%;

        .tab-header {
          width: 100%;
          line-height: 32px;
          color: #fff;
          font-family: PingFang SC;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          text-align: center;
          background: #6bc8ff;
          border-radius: 5px 5px 0px 0px;
        }

        .tab-tr {
          width: 100%;

          background: #e4f5ff;
          border-bottom: 1px solid #ace0ff;
          display: flex;

          > div {
            padding: 6px 0px;

            span {
              color: #1f64ff;
            }
          }

          .tab-td:first-child {
            width: 35%;
            border-right: 1px solid #ace0ff;
            padding-right: 36px;
            box-sizing: border-box;
            color: #3e3e3e;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-align: end;
            /* 21px */
          }

          .tab-td:last-child {
            width: 65%;
            padding-left: 30px;
            box-sizing: border-box;
            color: #000;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            /* 21px */
          }
        }

        .tab-tr:last-child {
          border-bottom: 0px;
        }
      }

      .content1-text {
        margin-top: 20px;

        > div:first-child {
          margin-bottom: 20px;

          div:first-child {
            color: #3e3e3e;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }

          div:last-child {
            color: #3e3e3e;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }

        > div:last-child {
          > div {
            margin-bottom: 20px;

            > div:first-child {
              text-align: center;
              padding: 0px 11.5px;
              color: #fff;
              font-family: PingFang SC;
              font-size: 17px;
              font-style: normal;
              font-weight: 500;
              line-height: 27px;
              border-radius: 20px;
              background: #78cff9;
              display: inline-block;
            }

            > div:last-child {
              color: #000;
              font-family: PingFang SC;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
      }
    }

    .content2-main {
      margin-top: 30px;

      > div:first-child {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20.5px;

        > div {
          width: 28%;

          > div:first-child {
            border-radius: 20px;
            padding: 3px 11px;
            font-family: PingFang SC;
            font-size: 17px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-bottom: 9px;
            display: inline-block;
          }

          > div:last-child {
            width: 100%;
            border-radius: 5px;
            background: #e4f5ff;
            padding: 9.5px 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div:first-child {
              color: #4b4e54;
              font-family: PingFang SC;
              font-size: 15px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;

              span {
                color: #0378fe;
                font-family: PingFang SC;
                font-size: 15px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
              }
            }

            div:last-child {
              color: #0378fe;
              font-family: DIN;
              font-size: 21px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;

              span {
                color: #000;
                font-family: PingFang SC;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
              }
            }
          }
        }
      }
    }

    .content3-main {
      margin-top: 20.5px;

      > div:first-child {
        margin-bottom: 20.5px;

        //头部
        > div:first-child {
          width: 27%;
          display: flex;
          align-items: center;
          border-radius: 20px;
          background: #e4f5ff;

          div:first-child {
            padding: 0px 11.5px;
            text-align: center;
            border-radius: 20px;
            background: #78cff9;
            color: #fff;
            font-family: PingFang SC;
            font-size: 17px;
            font-style: normal;
            font-weight: 500;
            line-height: 30px;
          }

          div:last-child {
            color: #000;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-left: 15px;
          }
        }

        > div:last-child {
          margin-top: 27.5px;
          display: flex;
          justify-content: space-between;

          > div {
            padding: 12px 0px;
            border-radius: 5px;
            background: #e4f5ff;
            width: 157px;

            > div:first-child {
              color: #0378fe;
              font-family: Douyin Sans;
              font-size: 18px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-align: center;
            }

            > div:last-child {
              width: 70%;
              color: #4b4e54;
              margin: auto;
              margin-top: 6.5px;
              text-align: center;
              font-family: PingFang SC;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 150%;
              /* 18px */
            }
          }
        }
      }
    }
  }
}
</style>