<template>
  <div class="main-child">
    <!-- 概览 -->
    <div class="top">
      <div class="top-box">
        <div class="box-top">企业/团队信息</div>
        <div class="box-container">
          <div class="child_1">
            <img src="https://www.umi6.com/assets/images/t_logo.png" alt="" />

          </div>
        </div>
      </div>
      <div class="top-box">
        <div class="box-top">数据统计</div>
        <div class="box-container">
          <div class="child_2">
            <div class="child_2_column">
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>账号数量</div>
                </div>
                <div class="value">480</div>
              </div>
              <div class="line"></div>
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>官网内容库</div>
                </div>
                <div class="value">200</div>
              </div>
            </div>
            <div class="child_2_column">
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>部门数量</div>
                </div>
                <div class="value">12</div>
              </div>
              <div class="line"></div>
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>文档库</div>
                </div>
                <div class="value">126</div>
              </div>
            </div>
            <div class="child_2_column">
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>AI智能体数量</div>
                </div>
                <div class="value">240</div>
              </div>
              <div class="line"></div>
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>图片库</div>
                </div>
                <div class="value">89</div>
              </div>
            </div>
            <div class="child_2_column">
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>知识库数量</div>
                </div>
                <div class="value">4592</div>
              </div>
              <div class="line"></div>
              <div class="column_box">
                <div class="label">
                  <div class="radius"></div>
                  <div>网址库</div>
                </div>
                <div class="value">104</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-box">
        <div class="box-top">快捷入口</div>
        <div class="box-container">
          <div class="child_3">
            <div class="column_box">
              <div class="column_left">
                <img
                  :src="
                    httpUrls.ossUrl +
                    '/xcx/com/message_center/Group_427320225@2x.png'
                  "
                  alt=""
                />
                <div>添加成员</div>
              </div>
              <img
                :src="
                  httpUrls.ossUrl +
                  '/xcx/com/message_center/vuesax_linear_arrow-right@2xaa.png'
                "
                class="column_right"
                alt=""
              />
            </div>
            <div class="column_box">
              <div class="column_left">
                <img
                  :src="
                    httpUrls.ossUrl +
                    '/xcx/com/message_center/vuesax_fill_sms@2x.png'
                  "
                  alt=""
                />
                <div>邀请成员</div>
              </div>
              <img
                :src="
                  httpUrls.ossUrl +
                  '/xcx/com/message_center/vuesax_linear_arrow-right@2xaa.png'
                "
                class="column_right"
                alt=""
              />
            </div>
            <div class="column_box">
              <div class="column_left">
                <img
                  :src="
                    httpUrls.ossUrl +
                    '/xcx/com/message_center/vuesax_fill_shield-security@2x.png'
                  "
                  alt=""
                />
                <div>组织权限</div>
              </div>
              <img
                :src="
                  httpUrls.ossUrl +
                  '/xcx/com/message_center/vuesax_linear_arrow-right@2xaa.png'
                "
                class="column_right"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="box-top">活跃成员</div>
      <div class="container-box">
        <!-- 简述数据部分 -->
        <div class="sketch">
          <div>
            <div>昨日活跃人数</div>
            <div>
              <span>32</span>
              <span>人</span>
            </div>
          </div>
          <div>
            <div>昨日活跃率</div>
            <div>
              <span>86</span>
              <span>%</span>
            </div>
          </div>
        </div>
        <div id="echarts-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from "../../../api/requestURL";
import * as echarts from "echarts";
export default {
  data() {
    return {
      httpUrls,
      chartOptions: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            //右上角工具栏
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            // saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Evaporation", "Precipitation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2024-04-25",
              "2024-04-26",
              "2024-04-27",
              "2024-04-28",
              "2024-04-29",
              "2024-04-30",
              "2024-05-1",
              "2024-05-2",,
              "2024-05-3",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Precipitation",
            min: 0,
            max: 1500,
            interval: 300,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "Temperature",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            itemStyle:{
              color: "#00B2FF" 
            },
            data: [
              150, 350, 545, 680, 790, 889, 989, 1024, 860
            ],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " °C";
              },
            },
            itemStyle:{
              color: "#0048FF" 
            },
            data: [
              15 ,38,26, 43, 58, 50, 60, 70,88
            ],
          },
        ],
      },
    };
  },
  components: {
  },
  mounted(){
    this.init()
  },
  methods:{
    //初始化图表
    init(){
      var chartDom = document.getElementById('echarts-box');
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.chartOptions)
    }
  }
};
</script>

<style lang="scss" scoped>
.main-child {
  width: 100%;
  border-left: 0px solid #ccc !important;
  .top {
    width: 100%;
    height: 360px;
    display: flex;
    justify-content: space-between;
    .top-box {
      width: calc(100% / 3 - 20px);
      background: #ffffff;
      border-radius: 16px 16px 16px 16px;
      .box-container {
        width: 100%;
        height: calc(100% - 62px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        position: relative;
        > div {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .child_1 {
          text-align: center;
          width: calc(100% - 80px);
          img {
            width: 100px;
            height: 100px;
          }
          div:nth-child(2) {
            margin-top: 20px;
            margin-bottom: 14px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
          }
          div:last-child {
            font-weight: 400;
            font-size: 14px;
            color: #666666;
          }
        }
        .child_2 {
          width: calc(100% - 40px);
          padding: 40px 0px;
          box-sizing: border-box;
          .child_2_column {
            display: flex;
            justify-content: space-between;
            margin-bottom: 35px;
            .column_box {
              width: 42%;
              display: flex;
              .label {
                display: flex;
                align-items: center;
                width: 70%;
                .radius {
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  margin-right: 6px;
                  background: #d9d9d9;
                }
                > div:last-child {
                  font-weight: 500;
                  font-size: 14px;
                  color: #666666;
                }
              }
              .value {
                font-weight: 600;
                font-size: 14px;
                color: #000000;
              }
            }
            .line {
              width: 1px;
              height: 20px;
              background: #e6e6e6;
            }
          }
          .child_2_column:last-child {
            margin: 0px;
          }
        }
        .child_3 {
          width: 100%;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
          // display: flex;
          // flex-direction: column;
          // align-items: center;
          // gap: 20;
          .column_box {
            width: 100%;
            height: calc(100% / 3 - 16px);
            padding: 24px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            flex: 1;
            cursor: pointer;
            .column_left {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
              }
              > div:last-child {
                margin-left: 10px;
                font-weight: 400;
                font-size: 16px;
                color: #000000;
              }
            }
            .column_right {
              width: 16px;
              height: 16px;
            }
          }
          .column_box:nth-child(1) {
            background: #eff4ff;
          }
          .column_box:nth-child(2) {
            background: #effaff;
            margin: 20px 0px;
          }
          .column_box:nth-child(3) {
            background: #edfff4;
          }
        }
      }
    }
  }
  .box-top {
    padding: 20px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    border-bottom: 1px solid #ebebeb;
  }
  .container {
    width: 100%;
    border-radius: 10px 10px 10px 10px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 20px;
    .sketch {
      display: flex;
      > div:first-child {
        margin-right: 80px;
      }
      > div {
        div:first-child {
          font-weight: 400;
          color: #999999;
          font-size: 14px;
        }
        div:last-child {
          text-orientation: mixed;
          span:first-child {
            font-weight: 600;
            font-size: 32px;
            color: #28292e;
          }
          span:last-child {
            font-weight: 500;
            font-size: 14px;
            color: #28292e;
          }
        }
      }
    }
    .container-box{
      padding: 20px;
      box-sizing: border-box;
    }
    #echarts-box{
      width: 100%;
      height: 400px;
    }
  }
}
</style>