/**
 * 商务合作
 */
<template>
  <div class="container">
    <div class="container_banner">
        <img :src='httpUrls.ossUrl + "static/picture/ab796c12-ee4c-4964-b714-9f6f984e87b8.jpg"' alt="" class="img">
        <div class="title_list">
            <div class="item-title">
                <div class="dian"></div>
                AI数字人虚拟直播系统
            </div>
            <div class="item-content">AI直播数字人源码、OEM、城市代理；-点击体验（下载PC安装包）</div>
            <div class="title-line"></div>
            <div class="item-title">
                <div class="dian"></div>
                无人直播伴侣
            </div>
            <div class="item-content">无人直播伴侣，实景直播，自动带货，手机端操作； --点击体验（下载Android安装包）</div>
            <div class="title-line"></div>
            <div class="item-title">
                <div class="dian"></div>
                短视频矩阵SEO
            </div>
            <div class="item-content">基于AI能力，批量生产短视频，布局到10多个短视频平台，关键词霸屏；</div>
            <div class="item-title">
                <div class="dian"></div>
                AI 能力定制
            </div>
            <div class="item-content">AI 对话、AI绘图、AI视频生成等能力定制开发；</div>
            <div class="title-line"></div>
            <div class="item-title">
                <div class="dian"></div>
                企业/行业数字员工
            </div>
            <div class="item-content">根据企业/行业状况，打造 RPA 数字员工；</div>
            <div class="title-line"></div>
            <div class="item-title">
                <div class="dian"></div>
                企业/行业AI能力定制开发
            </div>
            <div class="item-content">根据企业/行业情况，定制专属的AI能力，降本增效；</div>
            <div class="title-line"></div>
            <div class="item-title">
                <div class="dian"></div>
                基于 AIGC 的能力定制
            </div>
            <div class="item-content">公司专注于 AIGC 领域，欢迎对此感兴趣的朋友，欢迎咨询，合作共赢。</div>
        </div>
    </div>

    <div class="cont_input">
        <el-form style="width: 500px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="合作类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择合作类型" style="width: 100%;">
                    <el-option
                    v-for="item in typeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="合作意向" prop="text">
                <el-input type="textarea" v-model="ruleForm.text" placeholder="请输入内容" class="container_textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 70%;margin: 0 auto;display: block;background-color: #1f64ff;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
      <div style="width: 234px;"></div>
    </div>
  </div>
</template>

<script>
import { business } from '../../api/chatMG'
import httpUrls from '../../api/requestURL'
export default {
  name: 'order',
  data() {
    var checkPhone = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请输入您的手机号"))
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error("请输入正确的手机号"))
        } else {
            callback()
        }
    };
    return {
        userName: '',
        isName: false,
        httpUrls,
        userMsg: '',
        phone: '',
        isPhone: false,
        phoneMsg: '',
        remark: '',
        isClick: true,

        typeArr: [{
            label: 'AI数字人虚拟直播系统', value: 10
        }, {
            label: '无人直播伴侣', value: 11
        }, {
            label: '短视频矩阵SEO', value: 12
        }, {
            label: 'AI 能力定制', value: 13
        }, {
            label: '企业/行业数字员工', value: 14
        }, {
            label: '企业/行业AI能力定制开发', value: 15
        }, {
            label: '基于 AIGC 的能力定制', value: 16
        }, {
            label: '申请服务商', value: 20
        }],

        ruleForm: {
            type: '',
          name: '',
          phone: '',
          text: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择您的合作意向', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入您的手机号', trigger: 'blur' },
            { validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' },
          ],
        }

    }
  },
  // 注册组件
  components: {
     
  },

  /**
   * 创建完毕
   */
  created() {
    
  },

  mounted() {
    document.title = '商务合作-无忧秘书'
    let metaKeywords = document.createElement('meta')
    metaKeywords.id = 'chat-meta-keywords'
    metaKeywords.name = 'keywords'
    metaKeywords.content = '源码钉钉,源码开发,AI智能软件开发,定制AI源码,API接口,API接入'
    document.getElementsByTagName('head')[0].appendChild(metaKeywords)

    let metaDescription = document.createElement('meta')
    metaDescription.id = 'chat-meta-description'
    metaDescription.name = 'description'
    metaDescription.content = httpUrls.name + '商务合作目前涉及的项目有城市运营商的AI智能实现,承接中小微企业的源码定制需求,还承接API接口业务,目前可以承接的接口有:GPT3.5,GPT4.0,dall-e2,百度AI绘画,通义千问,讯飞星火,文心一言等.欢迎前来合作共赢!'
    document.getElementsByTagName('head')[0].appendChild(metaDescription)
  },

  beforeDestroy() {
    // document.getElementById('chat-meta-keywords').remove()
    // document.getElementById('chat-meta-description').remove()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    submitForm(formName) {
        if (!this.isClick) return
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isClick = false
            let val = {
                'type': this.ruleForm.type,
                'name': this.ruleForm.name,
                'phone': this.ruleForm.phone,
                'details': this.ruleForm.text
            }

            business(val).then(res => {
                if (res.code == 20000) {
                this.$message.success('提交成功');
                this.ruleForm = {
                    type: '',
                    name: '',
                    phone: '',
                    text: ''
                },
                this.isClick = true;
                } else {
                    this.isClick = true;
                    this.$message.error(res.msg);
                }
            }).catch(err => {
                this.isClick = true;
                this.$message.error('信息提交失败！');
            })
          }
        });
      },

    userCheck() {
        if(this.userName == '') {
            this.isName = true;
            this.userMsg = '请输入您的姓名'
            return
        } else {
            this.isName = false;
            this.userMsg = ''
        }
    },

    phoneCheck() {
        if(this.phone == '') {
            this.isPhone = true;
            this.phoneMsg = '手机号不能为空';
            return
        } else {
            this.isPhone = false;
            this.phoneMsg = '';
        }

        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(TEL_REGEXP.test(this.phone)){
            this.isPhone = false;
            this.phoneMsg = '';
        } else {
            this.isPhone = true;
            this.phoneMsg = '手机号格式不正确';
            return
        }
    },

    submit() {
        if(this.userName == '') {
            this.isName = true;
            this.userMsg = '请输入您的姓名'
            return false;
        } else {
            this.isName = false;
            this.userMsg = ''
        }

        if(this.phone == '') {
            this.isPhone = true;
            this.phoneMsg = '手机号不能为空';
            return false;
        } else {
            this.isPhone = false;
            this.phoneMsg = '';
        }

        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(TEL_REGEXP.test(this.phone)){
            this.isPhone = false;
            this.phoneMsg = '';
        } else {
            this.isPhone = true;
            this.phoneMsg = '手机号格式不正确';
            return false;
        }

        if(this.isClick == false) {
            return false;
        }
        this.isClick = false;

        let val = {
            'name': this.userName,
            'phone': this.phone,
            'details': this.remark
        }

        business(val).then(res => {
            if (res.code == 20000) {
               this.$message.success('提交成功');
               this.userName = '';
               this.phone = '';
               this.remark = '';
               this.isClick = true;
            } else {
                this.isClick = true;
                this.$message.error(res.msg);
            }
        }).catch(err => {
            this.isClick = true;
            this.$message.error('信息提交失败！');
        })
    }
  }
}
</script>

<style scoped>
   .cont_input {
      display: flex;
      width: 734px;
      margin: auto;
      margin-bottom: 28px;
      margin-top: 30px;
   }

   .cont_text {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
   }
   .text_left {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 80px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 34px;
      margin-right: 15px;
   }
   .text_right {
      display: flex;
      flex-direction: column;
   }

   .warn_text {
        font-style: normal;
        font-size: 12px;
        line-height: 22px;
        color: #db3232;
        text-align: left;
    }

   .btn_submit {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        
   }

   .btn_text {
        background: #1F64FF;
        box-shadow: 0px 2px 6px rgba(98, 98, 98, 0.1);
        border-radius: 6px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 250%;
        color: #fff;
        width: 50%;
        text-align: center;
        cursor: pointer;
   }

.container_banner {
    position: relative;
}

.container_banner .img {
    width: 100%;
    /* margin: 40px auto; */
    display: block;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    height: 100%;

    /* left: 50%;
    transform: translateX(-50%); */
}

.title_list {
    /* margin-top: 40px; */
    /* top: 0;
    left: 15%;
    height: 100%; */
    margin-left: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.item-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.item-content {
    font-size: 16px;
    color: #666;
    margin: 10px 0 15px 0;
}

.dian {
    width: 10px;
    height: 10px;
    background-color: #1F64FF;
    border-radius: 50%;
    margin-right: 20px;
}

.title-line {
    border-bottom: 1px solid #e1e1e1;
}


@media (width >= 1860px) {
    .item-title {
        font-size: 18px;
        margin-top: 20px;
    }
    .item-content {
        font-size: 16px;
        margin: 10px 0 15px 0;
    }
}

@media (width < 1860px) and (width >= 1400px) {
    .item-title {
        font-size: 16px;
        margin-top: 10px;
    }
    .item-content {
        font-size: 14px;
        margin: 5px 0 8px 0;
    }
}

@media (width < 1400px) {
    .item-title {
        font-size: 14px;
        margin-top: 10px;
    }
    .item-content {
        font-size: 12px;
        margin: 5px 0 0 0;
    }
}
</style>
<style>
   .cont_input .el-input__inner {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #DCDFE6;;
        height: 40px;
        font-size: 14px;
        padding-left: 10px;
    } 

    .container_textarea textarea {
        height: 72px;
        padding: 5px 10px;
    }
</style>

 
 