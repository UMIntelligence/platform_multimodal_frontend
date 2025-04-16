<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <div class="title">DALL-E</div>
      <div class="desc">输入描述性文本，使用 AI 轻松生成图像</div>
    </div>
    <!-- tab切换 -->
    <div class="nav">
      <div class="nav-box">
        <div :class="navCheck?'nav-item on':'nav-item'" @click="navCheck = !navCheck">
          <img v-if="!navCheck" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322151@2x (1).png" alt="">
          <img v-else src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322151@2x.png" alt="">
          <div>生成</div>
        </div>
        <div :class="!navCheck?'nav-item on':'nav-item'"  @click="navCheck = !navCheck">
          <img v-if="navCheck" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321575@2x.png" alt="">
          <img v-else src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427321575@2x (1).png" alt="">
          <div>历史</div>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- 图片生成 -->
      <div class="createImage" v-if="navCheck">
        <div class="left" v-if="true">
          <!-- 示例图片 -->
          <div class="example">
            <!-- 左侧大图片 -->
            <div class="example-left">
              <div class="exampleItem">
                <!-- 图片 -->
                <img class="exampleImg" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/chat/sd/189cc0a4-5fe0-49d1-851f-ecc0da42431b.png" alt="">
                <!-- 遮罩层 -->
                <div class="mask">
                  图片生成提示词图片生成提示词图片生成提示词图片生成提示词
                </div>
              </div>
            </div>
            <!-- 右侧 -->
             <div class="example-right">
              <div class="exampleItem" v-for="item in 4" :key="item">
                <!-- 图片 -->
                <img class="exampleImg" src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/chat/sd/189cc0a4-5fe0-49d1-851f-ecc0da42431b.png" alt="">
                <!-- 遮罩层 -->
                <div class="mask">图片生成提示词图片生成提示词图片生成提示词图片生成提示词</div>
              </div>
             </div>
          </div>
        </div>
        <!-- 加载状态 -->
       <div class="loading" v-else v-loading="false" element-loading-text="图片生成中..."></div>
        <!-- 右侧工具栏 -->
        <div class="tool">
          <div class="tool-label">
            <div class="tool-title">模型</div>
            <el-select
              v-model="value"
              placeholder="请选择绘画模型"
              style="width: 100%"
            >
              <el-option label="DALL-E 2.0" value="1" />
              <el-option label="DALL-E 2.0" value="2" />
            </el-select>
          </div>
          <div class="tool-label">
            <div class="tool-title">图片尺寸</div>
            <el-select
              v-model="value"
              placeholder="请选择图片尺寸"
              style="width: 100%"
            >
              <el-option label="1024*1024" value="1" />
              <el-option label="2560*2560" value="2" />
            </el-select>
          </div>
          <div class="tool-label">
            <div class="tool-title">图片数量</div>
            <div class="tool-number">
              <div class="numItem on">1</div>
              <div class="numItem">2</div>
              <div class="numItem">3</div>
              <div class="numItem">4</div>
            </div>
          </div>
          <div class="tool-label">
            <div class="tool-title">画质</div>
            <el-select
              v-model="value"
              placeholder="请选择图片画质"
              style="width: 100%"
            >
              <el-option label="标准" value="1" />
              <el-option label="高清" value="2" />
            </el-select>
          </div>
          <div class="tool-label">
            <div class="tool-title">描述词</div>
            <el-input
              v-model="textarea"
              maxlength="1000"
              :rows="5"
              style="width: 100%"
              placeholder="请输入描述词"
              show-word-limit
              type="textarea"
              :autosize="false"
            />
          </div>
          <div class="toolBtn">
            <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group_427322151@2x.png" alt="">
            <div>生成图片</div>
          </div>
        </div>
      </div>
      <!-- 历史记录 -->
      <div class="history" v-else>
        <div class="item" v-for="item in 24" :key="item">
          <img src="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/chat/sd/189cc0a4-5fe0-49d1-851f-ecc0da42431b.png" alt="">
        </div>
        <!-- <el-empty
          image="https://umi-intelligence.oss-cn-shenzhen.aliyuncs.com/xcx/com/message_center/Group 427319412@2x.png"
          description="暂无内容"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      navCheck:true
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #F5F5F7;
  padding-top: 19px;
  .header{
    width: calc(100% - 260px);
    margin: 0px auto;
    .title{
      font-weight: 800;
      font-size: 24px;
      color: #000000;
      margin-bottom: 10px;
    }
    .desc{
      font-weight: bold;
      font-size: 14px;
      color: #8A8E99;
    }
  }
  .nav{
    width: calc(100% - 260px);
    margin: 20px auto;
    padding: 10px 0px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16px 16px 16px 16px;
    border: 1px solid #F2F2F2;
    display: flex;
    justify-content: center;
    .nav-box{
      display: flex;
      padding: 4px;
      box-sizing: border-box;
      border: 1px solid #F2F2F2;
      border-radius: 10px 10px 10px 10px;
      .nav-item{
        width: 170px;
        display: flex;
        justify-content: center;
        padding: 6px 0px;
        box-sizing: border-box;
        gap: 5px;
        background: #fff;
        font-weight: 500;
        font-size: 14px;
        color: #000;
        border-radius: 10px 10px 10px 10px;
        cursor: pointer;
        img{
          width: 20px;
          height: 20px;
        }
      }
      .nav-item.on{
        color: #fff;
        background: #003FFF;
      }
    }
  }
  .container{
    width: calc(100% - 260px);
    margin: auto;
    .createImage{
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 10px;
      .loading{
        width: calc(100% - 300px - 10px);
        max-height: 614px;
        background: #fff;
        border-radius: 16px 16px 16px 16px;
        :deep(.el-loading-mask){
          border-radius: 16px 16px 16px 16px;
        }
      }
      .left{
        width: calc(100% - 300px - 10px);
        height: 614px;
        .example{
          width: 100%;
          height: 614px;
          display: flex;
          gap: 10px;
          .example-left{
            width: 50%;
            max-height: 614px;
            height: auto;
            border-radius: 16px 16px 16px 16px;
            .exampleItem{
              height: 614px;
              .exampleItem{
                height: 100%;
              }
              .exampleImg{
                max-height: 614px;
              }
            }
          }
          .example-right{
            width: 50%;
            max-height: 614px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            flex: 1 1;
            .exampleItem{
              width: calc(50% - 5px);
              max-height: calc(614px / 2 - 5px);
              .exampleImg{
                max-height: calc(614px / 2 - 5px);
              }
            }
          }
          .exampleItem{
            width: 100%;
            height: auto;
            position: relative;
            border-radius: 16px 16px 16px 16px;
            cursor: pointer;
            box-sizing: border-box;
            .exampleImg{
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 16px 16px 16px 16px;
            }
            .mask{
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              top: 0px;
              left: 0px;
              background: rgba(0,0,0,0.4);
              transition: all .6s;
              border-radius: 16px 16px 16px 16px;
              padding: 20px;
              box-sizing: border-box;
              font-weight: bold;
              font-size: 14px;
              color: #FFFFFF;
            }
          }
          .exampleItem:hover{
            .mask{
              opacity: 1;
            }
          }
        }
      }
      .tool{
        width: 300px;
        background: #fff;
        border-radius: 16px 16px 16px 16px;
        border: 1px solid #F2F2F2;
        padding: 20px;
        box-sizing: border-box;
        .tool-label{
          margin-bottom: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          .tool-title{
            font-weight: bold;
            font-size: 14px;
            color: #000000;
          }
          .tool-number{
            width: 100%;
            display: flex;
            align-items: center;
            gap: 16px;
            .numItem{
              width: 32px;
              height: 32px;
              box-sizing: border-box;
              line-height: 32px;
              text-align: center;
              background: #F5F5F5;
              border-radius: 10px 10px 10px 10px;
              border: 2px solid transparent;
              font-weight: bold;
              font-size: 14px;
              color: #000000;
              cursor: pointer;
            }
            .numItem.on{
              border: 2px solid #003FFF;
              color: #003FFF;
            }
          }
        }
        .toolBtn{
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 5px;
          background: #003FFF;
          border-radius: 10px 10px 10px 10px;
          font-weight: 600;
          font-size: 14px;
          color: #FFFFFF;
          padding: 9px 0px;
          box-sizing: border-box;
          cursor: pointer;
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .history{
      width: 100%;
      max-height: 614px;
      overflow-y: auto;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      .item{
        width: calc(100% / 6 - 20px);
        border-radius: 16px 16px 16px 16px;
        img{
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }
    .history::-webkit-scrollbar{
      width: 2px;
    }
    .el-empty{
      margin: 100px auto;
    }
  }
}
</style>