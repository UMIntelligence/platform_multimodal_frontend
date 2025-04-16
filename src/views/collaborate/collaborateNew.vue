<template>
  <div class="main">
    <!-- 背景图片 -->
    <img
      class="bg_img"
      src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319556@2xasas.png"
    />
    <!-- 头部 -->
    <header>
      <div>
        <span>探索AI时代的</span>
        <span>全新协作模式</span>
      </div>
      <div>-xxxx，激活企业/个人无限智造力-</div>
    </header>
    <!-- 主体内容 -->
    <main>
      <!-- 内容1 -->
      <div class="content_1">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in navData" :key="index">
            <div class="nav-box">
              <div class="navBox_content">
                <div>
                  <img :src="item.img" alt="" />
                  <div>{{ item.title }}</div>
                </div>
                <div>{{ item.desc }}</div>
                <ul>
                  <li v-for="text in item.arr" :key="text">{{ text }}</li>
                </ul>
              </div>
              <div class="line"></div>
              <div class="navBox_bottom">
                <div>了解详情</div>
                <img
                  src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/vuesax_linear_arrow-right@2x.png"
                  alt=""
                />
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div></div>
          </el-col>
          <el-col :span="8">
            <div></div>
          </el-col>
        </el-row>
      </div>
      <!-- 内容2-表单 -->
      <div class="content_2">
        <div class="from-title">
          <span>AI能力解决方案</span>
          <span>定制开发</span>
        </div>
        <div>
          <el-form
            style="width: 600px"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="合作类型" prop="type">
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择合作类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in typeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="ruleForm.phone"
                placeholder="请输入您的手机号"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item label="合作意向" prop="text">
              <el-input
                type="textarea"
                v-model="ruleForm.text"
                placeholder="请输入内容"
                class="container_textarea"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="
                  width: 70%;
                  margin: 0 auto;
                  display: block;
                  background-color: #1f64ff;
                "
                type="primary"
                @click="submitForm('ruleForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { business } from "../../api/chatMG";
import httpUrls from "../../api/requestURL";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      httpUrls,
      navData: [
        {
          title: "AI数字人虚拟直播系统",
          img:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319597@2x_icon1.png",
          desc: "ai数字人虚拟直播系统",
          arr: [
            "数字人主播，实现24/7不间断的直播内容创作与互动。",
            "提供完全可定制的数字人直播解决方案，满足个性化需求。",
            "品牌个性化定制，打造专属的数字人直播品牌形象。",
          ],
          page: "",
        },
        {
          title: "AI数字孪生",
          img:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319597@2x (1)_icon2.png",
          desc: "数字复活、数字分身、数字生命",
          arr: [
            "精准复刻显示，留住每个瞬间。",
            "随时随地的个人代理，提示生活效率。",
            "个性化智能伙伴，丰富你的虚拟体验。",
          ],
          page: "",
        },
        {
          title: "AI智能创作系统",
          img:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319598@2x_icon3.png",
          desc: "AI对话、AI绘画、AI应用创作",
          arr: [
            "智能互动，提供拟人化沟通体验，增强用户参与感。",
            "创新艺术根据，激发无限创意，实现个性化视觉创作。",
            "自动化变成，简化应用开发流程，加速产品上市速度。",
          ],
          page: "",
        },
        {
          title: "企业AI知识库",
          img:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319598@2x (1)_icon4.png",
          desc: "AI数字员工、AI知识对话、自我AI进化的企业知识资产",
          arr: [
            "构建全面、智能的企业信息管理平台，提升决策效率。",
            "24/7不间断的智能助手，优化企业运营流程。",
            "自然语言处理技术，实现高效准确的信息交互。",
          ],
          page: "",
        },
        {
          title: "AI知识库+数字人实时互动系统",
          img:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319598@2x (2)_icon5.png",
          desc: "AI智能客服、AI数字名片、AI数字人看板",
          arr: [
            "全天候即时响应，提升客户服务体验。",
            "个性化智能推荐，打造专属商务互动。",
            "实时数据分析展示，直观呈现关键业务指标。",
          ],
          page: "",
        },
        {
          title: "无人直播伴侣、短视频矩阵SEO",
          img:
            "https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319598@2x (3)_icon6.png",
          desc: "无人直播伴侣，实景直播，自动带货，手机端操作",
          arr: ["基于AI能力，批量生产短视频，布局到10多个短视频平台，关键词霸屏。"],
          page: "",
        },
      ],
      ruleForm: {
        type: "",
        name: "",
        phone: "",
        text: "",
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        type: [{ required: true, message: "请选择您的合作意向", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          { validator: checkPhone, message: "请输入正确的手机号", trigger: "blur" },
        ],
      },
      typeArr: [
        {
          label: "AI数字人虚拟直播系统",
          value: 10,
        },
        {
          label: "无人直播伴侣",
          value: 11,
        },
        {
          label: "短视频矩阵SEO",
          value: 12,
        },
        {
          label: "AI 能力定制",
          value: 13,
        },
        {
          label: "企业/行业数字员工",
          value: 14,
        },
        {
          label: "企业/行业AI能力定制开发",
          value: 15,
        },
        {
          label: "基于 AIGC 的能力定制",
          value: 16,
        },
        {
          label: "申请服务商",
          value: 20,
        },
      ],
    };
  },
  mounted() {
    document.title =document.title = '商务合作-无忧秘书'
    let metaKeywords = document.createElement("meta");
    metaKeywords.id = "chat-meta-keywords";
    metaKeywords.name = "keywords";
    metaKeywords.content = "源码钉钉,源码开发,AI智能软件开发,定制AI源码,API接口,API接入";
    document.getElementsByTagName("head")[0].appendChild(metaKeywords);

    let metaDescription = document.createElement("meta");
    metaDescription.id = "chat-meta-description";
    metaDescription.name = "description";
    metaDescription.content =
      httpUrls.name +
      "商务合作目前涉及的项目有城市运营商的AI智能实现,承接中小微企业的源码定制需求,还承接API接口业务,目前可以承接的接口有:GPT3.5,GPT4.0,dall-e2,百度AI绘画,通义千问,讯飞星火,文心一言等.欢迎前来合作共赢!";
    document.getElementsByTagName("head")[0].appendChild(metaDescription);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let val = {
            type: this.ruleForm.type,
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            details: this.ruleForm.text,
          };

          business(val)
            .then((res) => {
              if (res.code == 20000) {
                this.$message.success("提交成功");
                (this.ruleForm = {
                  type: "",
                  name: "",
                  phone: "",
                  text: "",
                }),
                  (this.isClick = true);
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.isClick = true;
              this.$message.error("信息提交失败！");
            });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;
  padding-top: 50px;
  background: #f6f8fa;

  .bg_img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0px;
    z-index: 2;
  }
  header {
    text-align: center;
    position: relative;
    z-index: 4;
    div:first-child {
      font-size: 44px;
      font-weight: 600;
      font-style: normal;
      span:last-child {
        background: linear-gradient(0deg, #0d99ff 0%, #2263ff 54%, #1759ff 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-left: 5px;
      }
    }
    div:last-child {
      font-weight: 500;
      font-size: 28px;
      color: #777b80;
      margin-top: 8px;
    }
  }
  main {
    width: calc(100% - 40px);
    // position: relative;
    position: relative;
    z-index: 4;
    padding: 20px 20px 50px 20px;
    > div {
      // width: 75%;
      // min-width: 1145px;
      margin: auto;
      margin-top: 50px;
    }
    .nav-box {
      width: 100%;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.04);
      margin-bottom: 30px;
      position: relative;
      top: 0px;
      transition: all 0.6s;
      .navBox_content {
        padding: 20px 16px;
        box-sizing: border-box;
        > div:nth-child(1) {
          display: flex;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
          }
          div {
            margin-left: 6px;
            font-weight: 600;
          }
        }
        > div:nth-child(2) {
          font-weight: 500;
          font-size: 14px;
          color: #909090;
          margin-top: 6px;
          margin-bottom: 14px;
        }
        ul {
          padding-left: 16px;
          margin: 0;
          height: 48px;
          li {
            font-weight: 500;
            font-size: 12px;
            // text-overflow: ellipsis;
            // overflow: hidden;
            // white-space: nowrap;
          }
          li::marker {
            width: 16px;
            height: 16px;
            color: #b5bccc; /* 修改此处颜色以改变小圆点颜色 */
          }
        }
      }
      .line {
        width: 100%;
        height: 1px;
        background: #f5f5f5;
      }
      .navBox_bottom {
        width: 100%;
        padding: 13px 20px;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 14px;
        color: #1f64ff;
        display: flex;
        align-items: center;
        div {
          cursor: pointer;
        }
        img {
          width: 16px;
          height: 16px;
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }
    .nav-box:hover {
      top: -10px;
    }
    .from-title {
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 44px;
      color: #000000;
      span:last-child {
        color: #1d5eff;
        margin-left: 5px;
      }
    }
    .content_2 {
      > div:first-child {
        margin-bottom: 50px;
      }
      > div:last-child {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
