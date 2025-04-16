<template>
  <!-- AI视觉馆 -->
  <div class="vision">
    <div class="go-back" style="z-index: 10">
      <div @click="$router.go(-1)" class="go_back-item-on">
        <img
          style="width: 10px; transform: rotateZ(180deg); margin: auto 0"
          src="../../assets/images/right.png"
          alt=""
        />
        <span style="margin-left: 8px">返回</span>
      </div>
    </div>
    <!-- 背景图片 -->
    <img
      class="bgImage"
      :src="
        httpUrls.ossUrl +
        'static/picture/191fcd48-8446-4ace-8362-d35f871f3bbc.png'
      "
    />
    <!-- 左边主体内容 -->
    <div class="main">
      <!-- 标题 -->
      <div class="top_title">{{ title }}</div>
      <!-- 提示 -->
      <div class="top-tips">{{ titleContent }}</div>
      <!-- 提示 -->
      <!-- chat_type != '28' && chat_type != '30' && chat_type != '31' && title !='智能美妆' && title !='图像风格转换' && title !='照片修图' -->
      <div class="top-prompt" v-if="false">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#1F64FF"
            />
            <path
              d="M12 8V12"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 16H12.01"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span>选择内容视频＞选择风格图＞一键生成风格视频</span>
      </div>
      <!-- 大图示例和用户生成图片，以及各种错误提示区 -->
      <div
        class="workspace_main"
        :style="title == '人脸视频风格' ? 'height: 70%;overflow-y: auto;' : ''"
      >
        <div class="workspace_mask">
          <div class="img_msk">
            <!-- 示例 -->
            <div v-if="chatList.length == 0">
              <!-- 显示图片 -->
              <img
                class="img"
                v-if="
                  photo &&
                  chat_type != 28 &&
                  chat_type != 29 &&
                  chat_type != 30 &&
                  chat_type != 31 &&
                  chat_type != 36 &&
                  chat_type != 37 &&
                  chat_type != 38 &&
                  chat_type != 46
                "
                :src="httpUrls.ossUrl + photo"
                alt=""
              />
              <video
                v-else-if="
                  (chat_type == 28 && photo) ||
                  (chat_type == 29 && photo) ||
                  (chat_type == 30 && photo) ||
                  (chat_type == 31 && photo) ||
                  (chat_type == 36 && photo) ||
                  (chat_type == 37 && photo) ||
                  (chat_type == 38 && photo) ||
                  (chat_type == 46 && photo)
                "
                :src="httpUrls.ossUrl + photo"
                width="400"
                height="400"
                autoplay
                controls
                id="successVideo"
              ></video>
              <div
                class="noImg"
                v-else-if="
                  chat_type != 38 &&
                  chat_type != 37 &&
                  chat_type != 36 &&
                  chat_type != 33 &&
                  chat_type != 28 &&
                  chat_type != 30 &&
                  chat_type != 31 &&
                  !photo
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="123"
                  height="108"
                  viewBox="0 0 103 108"
                  fill="none"
                >
                  <rect
                    width="102.484"
                    height="106.25"
                    transform="translate(0 1)"
                    fill="white"
                  />
                  <path
                    d="M101.962 62.267C102.562 47.267 78.7955 38.9339 67.4621 37.5172C55.5455 31.3505 30.2622 18.4672 24.4622 16.2672C17.2123 13.5172 6.6142 18.5029 2.2122 25.7656C-2.78757 34.0146 2.21218 49.7657 3.21218 58.2673C3.79611 63.2315 1.96216 64.2657 4.21215 80.7658C6.46215 97.2658 19.2122 98.5171 31.7122 97.2674C43.4065 96.0982 55.4622 93.5171 77.4622 88.7671C99.4622 84.0171 101.402 76.2671 101.962 62.267Z"
                    fill="url(#paint0_linear_8427_26879)"
                  />
                  <path
                    d="M23.0255 72.4991C25.3672 70.0508 27.6939 71.1378 29.909 73.5406L21.0254 60.999L21.2754 57.999L23.0255 55.749C22.2754 53.999 20.5254 49.999 23.7754 49.999C25.6793 49.999 29.7754 51.749 30.2754 52.499C30.7754 53.249 49.3416 58.8136 53.2754 60.999C60.0254 64.7489 69.0254 51.9989 71.7754 50.9989C74.5253 49.999 77.2753 48.249 79.7753 49.999C80.6197 50.5901 82.2669 52.2044 78.5253 55.749C73.7753 60.2491 70.0254 67.7489 69.0254 78.749C68.1515 88.3613 72.6088 101.666 73.7754 106.749H37.0255C35.6869 101.807 32.6426 93.5971 29.7754 87.9991C23.2754 78.4991 21.1159 74.4955 23.0255 72.4991Z"
                    fill="white"
                  />
                  <path
                    d="M26.0254 36.2501V1H51.5254L56.7754 11.75H76.2754V36.0001L26.0254 36.2501Z"
                    fill="white"
                    stroke="black"
                    stroke-width="0.5"
                    stroke-dasharray="2 2"
                  />
                  <path
                    d="M24.0254 34.5H78.5253V46.5C78.5253 47.6046 77.6299 48.5 76.5253 48.5H26.0254C24.9208 48.5 24.0254 47.6046 24.0254 46.5V34.5Z"
                    fill="#1F64FF"
                    stroke="black"
                    stroke-width="0.5"
                  />
                  <path
                    d="M84.1313 19.5094C86.0774 17.435 90.9528 14.0578 88.0503 10.9532C86.0337 8.79609 84.2987 11.4408 84.5749 13.4376C84.8511 15.4344 88.859 16.4825 90.9701 15.0886C93.0813 13.6947 96.0493 6.99844 94.1474 5.69602C92.2455 4.3936 90.3785 5.15299 89.4946 6.6842C88.6108 8.21541 90.799 10.5864 92.4143 10.8192C94.0296 11.052 99.0291 7.49408 99.8957 4.93251"
                    stroke="#C9C9C9"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.5093 35.3785C14.435 33.4324 11.0578 28.557 7.9532 31.4594C5.79609 33.4761 8.44081 35.2111 10.4376 34.9348C12.4344 34.6586 13.4825 30.6508 12.0886 28.5396C10.6947 26.4284 3.99844 23.4604 2.69603 25.3623C1.39361 27.2642 2.15299 29.1313 3.6842 30.0151C5.21541 30.8989 7.58635 28.7107 7.81914 27.0954C8.05194 25.4801 4.49408 20.4806 1.93252 19.614"
                    stroke="#C9C9C9"
                    stroke-linecap="round"
                  />
                  <path
                    d="M47 27.9648V19.7082C47 18.9438 47.8229 18.462 48.4895 18.8362L54.682 22.3127C55.3068 22.6635 55.3707 23.5384 54.8035 23.9763L48.6111 28.7564C47.9537 29.2638 47 28.7952 47 27.9648Z"
                    stroke="black"
                    stroke-width="0.5"
                    stroke-dasharray="2 2"
                  />
                  <path
                    d="M64.7754 59.75C68.5754 56.35 75.942 51.4167 79.0254 49.5L76.0254 48.75C73.2754 49 68.0254 52.7 63.0254 57.5C56.7754 63.5 52.5254 60.5 49.5254 59.25C46.5254 58 32.5254 52.25 31.0254 52.5C30.0195 52.6677 28.6921 53.8333 28.0254 54.75C28.2754 54.5833 29.1254 54.5 31.5254 54.5C34.5254 54.5 52.7754 62.75 56.0254 63.5C59.2754 64.25 60.0254 64 64.7754 59.75Z"
                    fill="#E5E5E5"
                  />
                  <path
                    d="M26.5254 51.5006C25.5254 50.9006 22.8587 51.2506 21.7754 51.5006C22.0745 51.0892 21.6 50.75 22.7754 49.75C23.5016 49.1322 25.0036 48.8901 25.7754 49.0004C27.1754 49.2004 29.9421 51.3333 31.5254 52.25L29.0254 53.2504C28.6087 52.9172 27.5254 52.1006 26.5254 51.5006Z"
                    fill="#E5E5E5"
                  />
                  <path
                    d="M37.0255 107.251C35.1921 101.167 30.5255 87.8005 26.5255 83.0005C21.5255 77.0005 22.2758 72.4999 23.5255 71.7505C24.7751 71.001 27.0753 69.8008 29.2753 73.0008"
                    stroke="black"
                    stroke-width="0.5"
                  />
                  <path
                    d="M74.1512 107.076C71.5679 100.493 68.1512 86.5763 69.4012 76.826C70.7899 65.9944 74.9012 58.8262 78.6512 55.5762C82.4012 52.3262 81.1922 49.6003 77.6513 49.0759C70.9012 48.0762 61.9012 59.8259 57.6512 61.0759C53.4012 62.3259 33.006 50.497 29.9013 52.8259C27.9011 54.3262 25.4013 55.5759 34.6513 62.3259C42.0513 67.7259 47.0679 71.4092 48.6512 72.5759"
                    stroke="black"
                    stroke-width="0.5"
                  />
                  <path
                    d="M37.4003 73.3267C31.4836 67.0767 19.1507 53.9941 22.1505 50.3271C25.1508 46.6595 29.3171 51.6595 31.9004 52.5762"
                    stroke="black"
                    stroke-width="0.5"
                  />
                  <path
                    d="M23.1517 55.5762C22.235 56.2428 20.5517 58.2762 21.1517 61.0762C21.506 62.7296 25.7198 67.9744 29.9016 73.8262C32.8016 77.8843 36.4016 81.5762 37.6516 85.3262"
                    stroke="black"
                    stroke-width="0.5"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8427_26879"
                      x1="50.9994"
                      y1="15.5"
                      x2="50.9994"
                      y2="97.6254"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FEFAFA" />
                      <stop offset="1" stop-color="#DFE8FE" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>暂无风格图片/视频</div>
              </div>
              <div
                class="noImg"
                v-else-if="
                  (chat_type == 38 && !photo) ||
                  (chat_type == 37 && !photo) ||
                  (chat_type == 36 && !photo) ||
                  (chat_type == 33 && !photo) ||
                  (chat_type == 28 && !photo) ||
                  (chat_type == 30 && !photo) ||
                  (chat_type == 31 && !photo)
                "
              >
                <div class="uploadImg domHover">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17 8L12 3L7 8"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 3L12 15"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <el-upload
                    style="
                      background: rgba(0, 0, 0, 0);
                      height: 20px;
                      border: 0px;
                    "
                    class="menter-avatar-uploader yesUpload"
                    :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                    :headers="headerData"
                    :show-file-list="false"
                    :data="fileRequestData"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-change="handleAvatarChange"
                  >
                    <div>上传{{ chat_type == 33 ? "图片" : "视频" }}</div>
                  </el-upload>
                </div>
                <div>
                  <div>
                    {{ chat_type == 33 ? "图片" : "视频" }}大小不超过5MB
                  </div>
                </div>
              </div>
            </div>

            <!-- 没钱了 -->
            <div
              v-if="!isuser"
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #ebebeb;
              "
            >
              <div style="font-size: 14px; margin-bottom: 20px">
                十分抱歉，您的次数已用完，请购买流量包等产品
              </div>
              <el-button
                v-if="!isuser"
                @click="$refs.Pay.PayVisible = true"
                style="
                  width: 179px;
                  height: 40px;
                  text-align: center;
                  background: #ff9b17;
                  color: #ffffff;
                "
                >购买套餐</el-button
              >
            </div>

            <!-- 结果 -->
            <div
              v-else-if="
                isBtn && title != '通用文字识别' && title != '图片配文'
              "
            >
              <img
                class="img"
                style="cursor: zoom-in"
                :src="httpUrls.ossUrl + chatList[1].image_urls[0].url"
                alt=""
                v-if="
                  isBtn &&
                  chat_type != 28 &&
                  chat_type != 29 &&
                  chat_type != 30 &&
                  chat_type != 31 &&
                  chat_type != 36 &&
                  chat_type != 37 &&
                  chat_type != 46
                "
                @click="dialogVisible = true"
              />
              <video
                v-else-if="
                  (chat_type == 28 && isBtn) ||
                  (chat_type == 29 && isBtn) ||
                  (chat_type == 30 && isBtn) ||
                  (chat_type == 31 && isBtn) ||
                  (chat_type == 36 && isBtn) ||
                  (chat_type == 37 && isBtn) ||
                  (chat_type == 46 && isBtn)
                "
                :src="httpUrls.ossUrl + chatList[1].image_urls[0].url"
                width="400"
                height="400"
                autoplay
                controls
                id="isBtnVideo"
              ></video>
            </div>

            <!-- 生成中 -->
            <div
              v-if="isTimeChat"
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <el-progress
                type="circle"
                color="#B5CCFF"
                define-back-color="#1F64FF"
                :percentage="percentageNumber"
              ></el-progress>
              <div v-if="isTimeChat">生成中，耗时{{ timer }}秒</div>
            </div>
            <!-- 风格效果图 -->
            <div class="fusion" v-if="oldPhoto">
              <img :src="httpUrls.ossUrl + oldPhoto" />
              <div>风格图</div>
            </div>
          </div>
          <!-- 下载 -->
          <div class="functional_area">
            <div class="lines"></div>
            <div class="child domHover" @click="downloadImgs()">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25"
                    stroke="#333333"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.25 7.5L9 11.25L12.75 7.5"
                    stroke="#333333"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 11.25V2.25"
                    stroke="#333333"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>下载</div>
            </div>
            <div class="child domHover" @click="fullScreen()">
              <div>
                <img src="../../assets/images/vision/全屏.png" />
              </div>
              <div>全屏</div>
            </div>
          </div>
          <!-- 通用文字识图 / 图片配文-->
          <!-- <div class="textImage" v-if="title == '视频画质评分' && chatList.length != 0">
            <div class="textImage-sucai">
              <div class="sucai-title">
                <div>识别结果</div>
              </div>
              <div class="textImage-conter" v-if="chatList[1].result_list.length != 0">
                <div v-for="item in chatList[1].result_list" :key="item">
                  {{ item }}
                </div>
              </div>
              <div class="textImage-conter" v-else></div>
            </div>
          </div> -->
          <!-- 人脸视频风格 / 照片裁剪-->
          <div
            class="face"
            v-if="title == '照片修图' || title == '通用视频生成'"
          >
            <!-- 内容视频选择 -->
            <div class="face-sucai">
              <div class="sucai-title">
                <div>内容{{ title == "照片修图" ? "照片" : "视频" }}选择</div>
                <span v-if="title == '通用视频生成'">推荐添加15s内的视频</span>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :headers="headerData"
                      :data="fileRequestData"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :on-change="handleAvatarChange"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="78"
                        height="78"
                        viewBox="0 0 78 78"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="77"
                          height="77"
                          rx="4.5"
                          fill="white"
                          stroke="#F2F3F5"
                        />
                        <rect
                          x="31"
                          y="38"
                          width="14"
                          height="1.5"
                          rx="0.75"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="37"
                          y="46"
                          width="14"
                          height="1.5"
                          rx="0.75"
                          transform="rotate(-90 37 46)"
                          fill="#D9D9D9"
                        />
                      </svg>
                    </el-upload>
                  </div>
                  <div class="textNo">
                    {{ chat_type == 29 ? "内容视频" : "内容照片" }}
                  </div>
                </div>
                <template v-if="title != '通用视频生成'">
                  <div
                    class="face-boxs domHover"
                    @click="
                      checkItem(0, 0),
                        (photo =
                          'static/picture/e42dcc7e-867a-4126-a6ea-78fa6e54ed87.png')
                    "
                  >
                    <img
                      :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/e42dcc7e-867a-4126-a6ea-78fa6e54ed87.png'
                      "
                    />
                    <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">
                      示例1
                    </div>
                  </div>
                  <div
                    class="face-boxs domHover"
                    @click="
                      checkItem(0, 1),
                        (photo =
                          'static/picture/6f4577cf-820e-4569-87cd-575ed642579a.jpg')
                    "
                  >
                    <img
                      :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/6f4577cf-820e-4569-87cd-575ed642579a.jpg'
                      "
                    />
                    <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                      示例2
                    </div>
                  </div>
                  <div
                    class="face-boxs domHover"
                    @click="
                      checkItem(0, 2),
                        (photo =
                          'static/picture/02ec72de-874f-474c-9b4f-806652a6ea1e.jpg')
                    "
                  >
                    <img
                      :class="checkNumT == 2 ? 'imgOn' : 'imgNo'"
                      :src="
                        httpUrls.ossUrl +
                        'static/picture/02ec72de-874f-474c-9b4f-806652a6ea1e.jpg'
                      "
                    />
                    <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">
                      示例3
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="face-boxs domHover"
                    @click="(photo = item.url), checkItem(0, index + 1)"
                    v-for="(item, index) in createVedioSuCai"
                    :key="index"
                  >
                    <img
                      :class="checkNumT == index + 1 ? 'imgOn' : 'imgNo'"
                      :src="httpUrls.ossUrl + item.src"
                    />
                    <div :class="checkNumT == index + 1 ? 'textOn' : 'textNo'">
                      {{ item.name }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- 风格图选择 -->
            <div class="face-sucai">
              <div class="sucai-title">
                <div>风格图选择</div>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :headers="headerData"
                      :data="fileRequestData"
                      :on-success="handleAvatarSuccessR"
                      :before-upload="beforeAvatarUploadR"
                      :on-change="handleAvatarChange"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="78"
                        height="78"
                        viewBox="0 0 78 78"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="77"
                          height="77"
                          rx="4.5"
                          fill="white"
                          stroke="#F2F3F5"
                        />
                        <rect
                          x="31"
                          y="38"
                          width="14"
                          height="1.5"
                          rx="0.75"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="37"
                          y="46"
                          width="14"
                          height="1.5"
                          rx="0.75"
                          transform="rotate(-90 37 46)"
                          fill="#D9D9D9"
                        />
                      </svg>
                    </el-upload>
                  </div>
                  <div class="textNo">风格图</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(1, 0),
                      (oldPhoto =
                        'static/picture/0c241bb7-9d5b-400f-96e9-bde705e2f2d5.png')
                  "
                >
                  <img
                    :class="checkNumB == 0 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/0c241bb7-9d5b-400f-96e9-bde705e2f2d5.png'
                    "
                  />
                  <div :class="checkNumB == 0 ? 'textOn' : 'textNo'">示例1</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(1, 1),
                      (oldPhoto =
                        'static/picture/6714fe39-5375-492f-964f-7124ee9742b3.jpg')
                  "
                >
                  <img
                    :class="checkNumB == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/6714fe39-5375-492f-964f-7124ee9742b3.jpg'
                    "
                  />
                  <div :class="checkNumB == 1 ? 'textOn' : 'textNo'">示例2</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(1, 2),
                      (oldPhoto =
                        'static/picture/e9abd2d3-4b93-4b32-b78e-f745ff37b549.jpg')
                  "
                >
                  <img
                    :class="checkNumB == 2 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/e9abd2d3-4b93-4b32-b78e-f745ff37b549.jpg'
                    "
                  />
                  <div :class="checkNumB == 2 ? 'textOn' : 'textNo'">示例3</div>
                </div>
              </div>
            </div>
            <!-- 音频选择 -->
            <div class="face-sucai" v-if="title == '通用视频生成'">
              <div class="sucai-title">
                <div>音频选择</div>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :headers="headerData"
                      :data="fileRequestData"
                      :on-success="handleAvatarSuccessAudio"
                      :before-upload="beforeAvatarUploadAudio"
                      :on-change="handleAvatarChange"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="78"
                        height="78"
                        viewBox="0 0 78 78"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="77"
                          height="77"
                          rx="4.5"
                          fill="white"
                          stroke="#F2F3F5"
                        />
                        <rect
                          x="31"
                          y="38"
                          width="14"
                          height="1.5"
                          rx="0.75"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="37"
                          y="46"
                          width="14"
                          height="1.5"
                          rx="0.75"
                          transform="rotate(-90 37 46)"
                          fill="#D9D9D9"
                        />
                      </svg>
                    </el-upload>
                  </div>
                  <div class="textNo">音频</div>
                </div>
                <div
                  class="face-boxs domHover"
                  v-for="(item, index) in voiceList"
                  :key="index"
                  @click="(audioPhoto = item.url), checkItem(2, index + 1)"
                >
                  <img
                    :class="checkNumAudio == index + 1 ? 'imgOn' : 'imgNo'"
                    :src="httpUrls.ossUrl + item.src"
                  />
                  <div
                    :class="checkNumAudio == index + 1 ? 'textOn' : 'textNo'"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="face" v-if="title == '照片裁剪'">
            <div class="face-sucai">
              <div class="sucai-title">
                <div>参数设置</div>
              </div>
              <div>
                <el-form
                  label-position="left"
                  :model="ruleForm1"
                  :rules="rules1"
                  ref="ruleForm1"
                  label-width="80px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="裁剪宽度" prop="width">
                    <el-input
                      v-model="ruleForm1.width"
                      placeholder="请输入你要裁剪的宽度"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="裁剪高度" prop="height">
                    <el-input
                      v-model="ruleForm1.height"
                      placeholder="请输入你要裁剪的高度"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <!-- 视频人像卡通画 -->
          <div class="age">
            <div class="age-sucai">
              <div
                class="face-conter"
                v-if="title == '视频降噪' || title == '视频增强'"
              >
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    {{ title == "视频降噪" ? "视频降噪" : "视频增强" }}
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '视频封面生成'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    图片封面
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 2)"
                >
                  <img
                    :class="checkNumT == 2 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">
                    gif封面
                  </div>
                </div>
              </div>
              <div
                class="face-conter"
                v-if="title == '人脸素描' || title == '人脸修复'"
              >
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    {{ chat_type == 39 ? "人脸修复" : "人脸素描" }}
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '智能美妆'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  v-for="item in 7"
                  :key="item"
                  @click="(guoManCheck = 'anime'), checkItem(0, item + 1)"
                >
                  <img
                    :class="checkNumT == item + 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == item + 1 ? 'textOn' : 'textNo'">
                    {{
                      item == 1
                        ? "整妆"
                        : item == 2
                        ? "基础妆"
                        : item == 3
                        ? "少女妆"
                        : item == 4
                        ? "活力妆"
                        : item == 5
                        ? "优雅妆"
                        : item == 6
                        ? "魅惑妆"
                        : item == 7
                        ? "梅子妆"
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '人脸滤镜'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  v-for="item in 6"
                  :key="item"
                  @click="(guoManCheck = 'anime'), checkItem(0, item + 1)"
                >
                  <img
                    :class="checkNumT == item + 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == item + 1 ? 'textOn' : 'textNo'">
                    {{
                      item == 1
                        ? "默认"
                        : item == 2
                        ? "向日葵"
                        : item == 3
                        ? "桔梗"
                        : item == 4
                        ? "垦丁"
                        : item == 5
                        ? "大理"
                        : item == 6
                        ? "丽江"
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div
                class="face-conter"
                v-if="(title == '皮肤病检测' && !isBtn) || title == '智能瘦脸'"
              >
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    {{ chat_type == 35 ? "皮肤病检测" : "智能瘦脸" }}
                  </div>
                </div>
              </div>
              <div
                class="face-conter"
                v-if="
                  title == '物体识别' ||
                  title == '车型识别' ||
                  title == '图像主体检测' ||
                  title == '黑白图像填色'
                "
              >
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    {{
                      chat_type == 47
                        ? "物体识别"
                        : chat_type == 53
                        ? "车型识别"
                        : chat_type == 54
                        ? "图像主体检测"
                        : chat_type == 55
                        ? "黑白图像填色"
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div
                class="face-conter"
                v-if="
                  title == '图像标志擦除' ||
                  title == '商品抠图' ||
                  title == '人体轮廓分割' ||
                  title == '清晰度增强'
                "
              >
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    {{
                      chat_type == 49
                        ? "图像标志擦除"
                        : chat_type == 50
                        ? "商品抠图"
                        : chat_type == 51
                        ? "人体轮廓分割"
                        : chat_type == 57
                        ? "清晰度增强"
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '图像风格转换'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">默认</div>
                </div>
                <div
                  class="face-boxs domHover"
                  v-for="item in 9"
                  :key="item"
                  @click="(guoManCheck = 'anime'), checkItem(0, item)"
                >
                  <img
                    :class="checkNumT == item ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == item ? 'textOn' : 'textNo'">
                    {{
                      item == 1
                        ? "卡通画"
                        : item == 2
                        ? "铅笔画"
                        : item == 3
                        ? "彩色铅笔画风格"
                        : item == 4
                        ? "彩色糖块油画"
                        : item == 5
                        ? "神奈川冲浪里油画"
                        : item == 6
                        ? "薰衣草油画"
                        : item == 7
                        ? "奇异油画"
                        : item == 8
                        ? "呐喊油画"
                        : "哥特油画"
                    }}
                  </div>
                </div>
              </div>
              <div class="text-box" v-if="chat_type == 35 && isBtn">
                <div>调用结果</div>
                <div v-for="(item, index) in textData" :key="index">
                  {{ item.label }}：{{ item.val }}
                </div>
              </div>
              <div class="text-box" v-if="chat_type == 46 && isBtn">
                <div>调用结果</div>
                <div>压缩程度：{{ textData.compressiveStrength }}</div>
                <div>噪声程度：{{ textData.noiseIntensity }}</div>
                <div>模糊程度：{{ textData.blurriness }}</div>
                <div>对比度：{{ textData.colorContrast }}</div>
                <div>饱和度：{{ textData.colorSaturation }}</div>
                <div>亮度：{{ textData.luminance }}</div>
                <div>颜色丰富度：{{ textData.colorfulness }}</div>
                <div>表示主观质量评分：{{ textData.mosScore }}</div>
              </div>
              <div
                class="text-box"
                v-if="chat_type == 53 && isBtn"
                style="font-size: 13px"
              >
                <div>调用结果</div>
                <div>车辆颜色：{{ textData.color_result }}</div>
                <div
                  v-for="(child, index) in textData.result"
                  :key="index"
                  style="display: flex; justify-content: space-between"
                >
                  <div>车型名称:{{ child.name }}</div>
                  <div>年份:{{ child.year }}</div>
                  <div>
                    置信度:{{ (Math.ceil(child.score * 100) / 100).toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="text-box" v-if="chat_type == 54 && isBtn">
                <div>调用结果</div>
                <div
                  v-for="(child, index) in textData"
                  :key="index"
                  style="display: flex; justify-content: space-between"
                >
                  <div>{{ child.name }}</div>
                  <div>
                    置信度:{{ (Math.ceil(child.score * 100) / 100).toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '视频人像卡通画'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">
                    关闭特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'anime'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/4b53b848-13c3-4e50-bd5a-1b26d4aee8a4.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">日漫</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = '3d'), checkItem(0, 2)"
                >
                  <img
                    :class="checkNumT == 2 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/711dd2f1-5191-4351-a15d-b000566c1fc3.png'
                    "
                  />
                  <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">3D</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'handdrawn'), checkItem(0, 3)"
                >
                  <img
                    :class="checkNumT == 3 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d834507a-1db9-4432-8f91-c78abf68f7de.png'
                    "
                  />
                  <div :class="checkNumT == 3 ? 'textOn' : 'textNo'">手绘</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'sketch'), checkItem(0, 4)"
                >
                  <img
                    :class="checkNumT == 4 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/96727837-084c-471f-942c-5edf421f368d.png'
                    "
                  />
                  <div :class="checkNumT == 4 ? 'textOn' : 'textNo'">
                    铅笔画
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'artstyle'), checkItem(0, 5)"
                >
                  <img
                    :class="checkNumT == 5 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/4175a12e-2f9f-47e6-9e08-05b21fc12cce.png'
                    "
                  />
                  <div :class="checkNumT == 5 ? 'textOn' : 'textNo'">
                    艺术特效
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '视频字幕擦除'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">
                    关闭特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'hkcartoon'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    去除字幕
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '视频标志擦除'">
                <div
                  class="face-boxs domHover"
                  @click="handleClose(), checkItem(0, 0)"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 76px;
                      margin-top: 0px;
                      height: 76px;
                      border-radius: 4px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 27.5039C21.9036 27.5039 27.5 21.9075 27.5 15.0039C27.5 8.10035 21.9036 2.50391 15 2.50391C8.09644 2.50391 2.5 8.10035 2.5 15.0039C2.5 21.9075 8.09644 27.5039 15 27.5039Z"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 23L23 7"
                        stroke="#1D2028"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">
                    关闭特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="(guoManCheck = 'hkcartoon'), checkItem(0, 1)"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    去除标志
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="generate-tips" v-if="title != '视频增强'">{{ titleToken }}</div>
      <div class="generate-tips"  @click.stop="chargingVisible = true" style="text-decoration: underline;cursor: pointer;" v-else>计费标准</div>
      <div
        class="generate domHover"
        v-if="
          title != '人脸素描' &&
          title != '人脸修复' &&
          title != '智能美妆' &&
          title != '人脸滤镜' &&
          title != '皮肤病检测' &&
          title != '智能瘦脸' &&
          title != '视频人像卡通画' &&
          title != '物体识别' &&
          title != '车型识别' &&
          title != '图像主体检测' &&
          title != '黑白图像填色' &&
          title != '图像风格转换' &&
          title != '图像标志擦除' &&
          title != '商品抠图' &&
          title != '人体轮廓分割' &&
          title != '清晰度增强' &&
          title != '视频画质评分'
        "
      >
        <div @click="handleGenerate">
          <span>一键生成</span>
        </div>
      </div>
      <div class="generate" v-else>
        <el-upload
          style="display: inline-block; background-color: #1f64ff"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          :show-file-list="false"
          :data="fileRequestData"
          :headers="headerData"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handleAvatarChange"
        >
          <div>
            <span>{{
              title == "视频人像卡通画" || title == "视频画质评分"
                ? "上传视频"
                : "上传图片"
            }}</span>
          </div>
        </el-upload>
      </div>
    </div>
    <!-- 右边内容 -->
    <div class="work_area">
      <div class="work-title">历史记录</div>

      <div id="history-list">
        <div
          class="mask"
          id="history-mask"
          v-if="chatHistoryList.length != 0"
          v-for="(item, i) in chatHistoryList"
          :key="i"
          style="border-bottom: 1px dashed #999"
        >
          <div class="item-title">
            <div style="font-weight: bold">记录{{ i + 1 }}</div>
            <div>{{ item.create_time }}</div>
          </div>
          <div class="item-content">
            <div class="item-left">
              <div>原图</div>
              <img
                :src="httpUrls.ossUrl + item.origin_image"
                v-if="
                  chat_type != 28 &&
                  chat_type != 29 &&
                  chat_type != 30 &&
                  chat_type != 31 &&
                  chat_type != 36 &&
                  chat_type != 37 &&
                  chat_type != 38 &&
                  chat_type != 46
                "
              />
              <video
                v-else
                width="120"
                height="90"
                :src="httpUrls.ossUrl + item.origin_image"
              ></video>
            </div>
            <div class="item-right domHover" @click="getDetail(item)">
              <div>{{ title }}</div>
              <img
                v-show="item.result_image || item.origin_image"
                :src="
                  httpUrls.ossUrl +
                  (item.result_image != ''
                    ? item.result_image
                    : item.origin_image)
                "
                v-if="
                  chat_type != 28 &&
                  chat_type != 29 &&
                  chat_type != 30 &&
                  chat_type != 31 &&
                  chat_type != 36 &&
                  chat_type != 37 &&
                  chat_type != 46
                "
              />
              <video
                @click="photo = item.result_image"
                v-else
                :src="httpUrls.ossUrl + item.result_image"
                width="120"
                height="90"
              ></video>
            </div>
          </div>
        </div>
        <div class="noHistory" v-else>暂无数据</div>
      </div>
    </div>
    <el-dialog
      title="计费标准"
      :visible.sync="chargingVisible"
      width="600px"
    >
      <div>
        <div class="charging-text">1.视频增强（按量收费）</div>
        <dl>
          <dt>（1）1分钟/120000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：≤720P</li>
              <li class="charging-text-child">上传视频帧率：≤30帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（2）1分钟/240000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：≤720P</li>
              <li class="charging-text-child">上传视频帧率：30帧&gt;=视频帧率&lt;=60帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（3）1分钟/480000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：≤720P</li>
              <li class="charging-text-child">上传视频帧率：60帧&gt;=视频帧率&lt;=120帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（4）1分钟/240000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：720p&gt;=视频分辨率&lt;=1440p</li>
              <li class="charging-text-child">上传视频帧率：≤30帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（5）1分钟/480000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：720p&gt;=视频分辨率&lt;=1440p</li>
              <li class="charging-text-child">上传视频帧率：30帧&gt;=视频帧率&lt;=60帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（6）1分钟/960000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：720p&gt;=视频分辨率&lt;=1440p</li>
              <li class="charging-text-child">上传视频帧率：60帧&gt;=视频帧率&lt;=120帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（7）1分钟/720000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：1440p&gt;=视频分辨率&lt;=2160p</li>
              <li class="charging-text-child">上传视频帧率：≤30帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（8）1分钟/1440000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：1440p&gt;=视频分辨率&lt;=2160p</li>
              <li class="charging-text-child">上传视频帧率：30帧&gt;=视频帧率&lt;=60帧</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>（9）1分钟/2880000算力</dt>
          <dd>
            <ul>
              <li class="charging-text-child">上传视频分辨率：1440p&gt;=视频分辨率&lt;=2160p</li>
              <li class="charging-text-child">上传视频帧率：60帧&gt;=视频帧率&lt;=120帧</li>
            </ul>
          </dd>
        </dl>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="550px"
      class="draw_image-class_dark"
    >
      <img
        v-if="dialogImg"
        :src="httpUrls.ossUrl + dialogImg"
        style="min-width: 550px; height: auto"
        alt=""
        @click="dialogVisible = false"
      />
      <img
        v-else
        :src="httpUrls.ossUrl + photo"
        style="min-width: 550px; height: auto"
        alt=""
        @click="dialogVisible = false"
      />
    </el-dialog>
    <register ref="Register"></register>
  </div>
</template>

<script>
import goBack from "../../components/goBack";
import httpUrls from "../../api/requestURL";
import remind from "../../components/remind.vue";
import store from "../../vuex/index";
import {
  drawChatHistroy,
  drawChatHistroyNew,
  ChatDelete,
  ChatDeleteNew,
  submitFootprint,
  deleteFootprint,
  chatCreateImage,
  newbaiduDrawDetail,
  chatDetail,
  baiduDraw,
} from "../../api/chatMG";
import { mapGetters } from "vuex";
import register from "../../components/register";
export default {
  name: "vision",
  components: {
    goBack,
    register,
  },
  data() {
    return {
      chargingVisible:false,
      file: {},
      // 照片裁剪表单
      ruleForm1: {
        width: "",
        height: "",
      },
      rules1: {
        width: [
          { required: true, message: "请输入需要裁剪的宽度!", trigger: "blur" },
        ],
        height: [
          { required: true, message: "请输入需要裁剪的高度!", trigger: "blur" },
        ],
      },
      textData: [], //接口返回文本数据
      createVedioFile: [], //视频生成file文件
      createVedioSuCai: [
        //内容视频
        {
          src: "/xcx/com/message_center/生成1.png",
          url: "xcx/com/message_center/bbxtysp.mp4",
          name: "示例1",
        },
        {
          src: "/xcx/com/message_center/生成2.png",
          url: "xcx/com/message_center/bbxtysp2.mp4",
          name: "示例2",
        },
        {
          src: "/xcx/com/message_center/生成3.png",
          url: "xcx/com/message_center/bbxtysp3.mp4",
          name: "示例3",
        },
      ],
      voiceList: [
        //音频数据
        {
          src: "xcx/com/message_center/Rectangle%20346253495252.png",
          name: "示例1",
          url: "xcx/com/message_center/y2332.mp3",
        },
        {
          src: "xcx/com/message_center/Rectangle%203462535255.png",
          name: "示例2",
          url: "xcx/com/message_center/y2332.mp3",
        },
        {
          src: "xcx/com/message_center/Rectangle%2034625353.png",
          name: "示例3",
          url: "xcx/com/message_center/y2332.mp3",
        },
      ],
      centerDialogVisible: false,
      httpUrls,
      sliderNum: 0, //滑块滚动
      dialogVisible: false,
      dialogImg: "", //大屏图片
      title: "",
      checkNumT: null,
      checkNumB: null,
      checkNumAudio: null,
      fileRequestData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_image-list",
      },
      page_size: 10,
      page: 1,
      close: false, //关闭
      photo: "", //内容图/
      oldPhoto: "", //风格图
      audioPhoto: "", //音频路径
      ageCheck: "", //选择年龄
      guoManCheck: "", //选择国漫
      enhance: "", //图像增强
      three_d: null, //3D游戏特效
      living: null, //活体照片
      segmentation: null, //头发分割
      repair: null, //图片拉伸修复
      high: null, //图片超分辨率
      direction: null, //图片方向矫正
      chatList: [],
      chatHistoryList: [], //历史记录
      srcList: [], //图片数组
      //绘画
      requestData: {},
      chat_type: null, // 类型
      model: "", //模型
      isShowTemplateChat: true,
      isTimeChat: false,
      sendValue: "",
      timer: 0,
      t_time: 0,
      percentageNumber: 0, //绘画图片进度

      isBtn: false, //防止重新发送
      isuser: true, //使用次数是否用完
      isShowHelpImg: false,
      isShowStepOnImg: false,
      isShowTemplateSelte: false,
      dialogTitleVisible: false,
      isShowassociation: false,
      isShowChecked: false,
      isDetail: false,
      isShow: false,
      isfinish: false,
      actionType: 3, // 是否为图文生图 3：文字；5：图文生图
      loginInfo: null,
      isClickChat: false, // 点击了历史会话
      randomStr: 0, // 随机数，用于刷新历史会话
      startNewChat: false, // 开启新会话
      headerData: {}
    };
  },
  computed: {
    titleContent() {
      let text;
      switch (this.title) {
        case "通用视频生成":
          text = "";
          break;
        case "视频降噪 ":
          text = "";
          break;
        case "视频人像卡通画":
          text = "上传视频选择不同风格生成对应的卡通人像";
          break;
        case "视频标志擦除":
          text = "去除视频中所附带的标志，可用于素材二次创作";
          break;
        case "视频字幕擦除":
          text = "去除视频下方白色字幕，可用于素材再创作";
          break;
        case "视频增强":
          text = "";
          break;
        case "照片修图":
          text = "输入内容图和风格图，进行融合";
          break;
        case "照片裁剪":
          text =
            "判断主体位置最佳裁剪图片或自定义裁剪，上传小于3MB，分辨率小于2000x2000像素的图片生成更快哦";
          break;
        case "人脸素描":
          text = "输入一张人物图像，自动裁剪其头部区域，生成大头照下的素描画。";
          break;
        case "人脸修复":
          text = "输入包含人脸的图像，可对人脸进行细节增强，优化人脸图像质量。";
          break;
        case "皮肤病检测":
          text =
            "对输入的皮肤自然图像进行皮肤病分类预测，可检测出湿疹、银屑病、荨麻疹、寻常痤疮等24种常见疾病。";
          break;
        case "智能瘦脸":
          text =
            "输入一张人物图像，系统自动检测并分析人脸五官特征，生成脸部五官调整瘦脸后的图像。";
          break;
        case "智能美妆":
          text =
            "可模拟现实彩妆效果，通过添加口红，高光，整妆等彩妆素材，选择不同美妆类型，进一步提升人脸美化效果。";
          break;
        case "人脸滤镜":
          text =
            "对图像进行统一修改风格，包括向日葵、垦丁、大理等效果，对图像整体风格调整滤镜效果。";
          break;
        case "车型识别":
          text = "识别图片中包含的车辆，获取车辆品牌型号及车型百科信息。";
          break;
        case "图像主体检测":
          text = "检测图片中包含的物体名称等信息。";
          break;
        case "黑白图像填色":
          text = "智能识别黑白图像内容并填充色彩，是黑白图像变得鲜活";
          break;
        case "图像风格转换":
          text = "将图像转化为卡通画、铅笔画等多种艺术风格的效果";
          break;
        case "清晰度增强":
          text =
            "对压缩后的模糊图像实现智能快速去噪，优化图像纹理细节，提高整体清晰度。";
          break;
        case "图像标志擦除":
          text = "自动检测与擦除图像中的常见标志，可用于图像素材的再创作";
          break;
        case "商品抠图":
          text = "识别输入图像中的商品轮廓，与背景进行分离";
          break;
        case "人体轮廓分割":
          text = "识别输入图像中的人体轮廓，与背景进行分离";
          break;
        default:
          break;
      }
      console.log(text, "---文本");
      return text;
    },
    titleToken() {
      let text;
      switch (this.title) {
        case "通用视频生成":
          text = "消耗24000算力/分钟";
          break;
        case "视频降噪 ":
          text = "免费";
          break;
        case "视频人像卡通画":
          text = "消耗30000算力/分钟";
          break;
        case "视频标志擦除":
          text = "消耗24000算力/分钟";
          break;
        case "视频字幕擦除":
          text = "消耗12000算力/分钟";
          break;
        case "视频增强":
          text = "消耗120000算力/分钟";
          break;
        case "照片修图":
          text = "消耗600算力/次";
          break;
        case "照片裁剪":
          text = "消耗600算力/次";
          break;
        case "人脸素描":
          text = "消耗900算力/次";
          break;
        case "人脸修复":
          text = "消耗3000算力/次";
          break;
        case "皮肤病检测":
          text = "免费";
          break;
        case "智能瘦脸":
          text = "消耗900算力/次";
          break;
        case "智能美妆":
          text = "消耗900算力/次";
          break;
        case "人脸滤镜":
          text = "免费";
          break;
        case "车型识别":
          text = "消耗90算力/次";
          break;
        case "图像主体检测":
          text = "消耗60算力/次";
          break;
        case "黑白图像填色":
          text = "消耗300算力/次";
          break;
        case "图像风格转换":
          text = "消耗1350算力/次";
          break;
        case "清晰度增强":
          text = " 消耗240算力/次";
          break;
        case "图像标志擦除":
          text = "消耗300算力/次";
          break;
        case "商品抠图":
          text = "消耗60算力/次";
          break;
        case "人体轮廓分割":
          text = "消耗60算力/次";
          break;
        case "视频画质评分":
          text = "消耗2400算力/分钟";
          break;
        default:
          break;
      }
      console.log(text, "---文本");
      return text;
    },
  },
  created() {
    this.title = this.$route.query.title;
  },
  watch: {
    $route:{
      deep:true,
      handler(){
        this.title = this.$route.query.title;
      }
    },  
    // 监听选择title
    title: {
      deep: true,
      handler() {
        switch (this.title) {
          case "视频人像卡通画":
            this.chat_type = 28;
            this.checkNumT = 0;
            this.photo =
              "static/mentor_image-list/3330f580-5ee7-418e-a2e1-ae703a429391.mp4";
            break;
          case "通用视频生成":
            this.chat_type = 29;
            break;
          case "视频标志擦除":
            this.chat_type = 30;
            this.checkNumT = 1;
            break;
          case "视频字幕擦除":
            this.chat_type = 31;
            this.checkNumT = 1;
            break;
          case "照片修图":
            this.chat_type = 32;
            break;
          case "照片裁剪":
            this.chat_type = 33;
            break;
          case "皮肤病检测":
            this.chat_type = 35;
            this.checkNumT = 0;
            break;
          case "视频降噪":
            this.chat_type = 36;
            this.checkNumT = 0;
            break;
          case "视频增强":
            this.chat_type = 37;
            this.checkNumT = 0;
            break;
          case "视频封面生成":
            this.chat_type = 38;
            this.checkNumT = 0;
            break;
          case "人脸修复":
            this.chat_type = 39;
            this.checkNumT = 0;
            break;
          case "人脸素描":
            this.chat_type = 40;
            this.checkNumT = 0;
            break;
          case "智能瘦脸":
            this.chat_type = 41;
            this.checkNumT = 0;
            break;
          case "智能美妆":
            this.chat_type = 42;
            this.checkNumT = 0;
            break;
          case "人脸滤镜":
            this.chat_type = 43;
            this.checkNumT = 0;
            break;
          case "视频画质评分":
            this.chat_type = 46;
            this.checkNumT = 0;
            this.photo =
              "static/mentor_image-list/9194b00d-78c3-4e8f-ada7-a15713f8ec7e.mp4";
            break;
          case "物体识别":
            this.chat_type = 47;
            this.checkNumT = 0;
            break;
          case "图像标志擦除":
            this.chat_type = 49;
            this.checkNumT = 0;
            break;
          case "商品抠图":
            this.chat_type = 50;
            this.checkNumT = 0;
            break;
          case "人体轮廓分割":
            this.chat_type = 51;
            this.checkNumT = 0;
            break;
          case "车型识别":
            this.chat_type = 53;
            this.checkNumT = 0;
            break;
          case "图像主体检测":
            this.chat_type = 54;
            this.checkNumT = 0;
            break;
          case "黑白图像填色":
            this.chat_type = 55;
            this.checkNumT = 0;
            break;
          case "图像风格转换":
            this.chat_type = 56;
            this.checkNumT = 0;
            break;
          case "清晰度增强":
            this.chat_type = 57;
            this.checkNumT = 0;
            break;
          default:
            break;
        }
        // console.log(this.title, this.chat_type, this.photo == "");
        this.getChatList();
      },
    },
    photo: {
      deep: true,
      handler() {
        console.log(this.photo);
        if (this.chat_type == 29) {
          let fileObj = {
            file_type: "video",
            file_url: this.photo,
            file_name: this.photo,
          };
          let index = this.createVedioFile.findIndex(
            (item) => item.file_type == fileObj.file_type
          );
          if (index == -1) {
            this.createVedioFile.push(fileObj);
          } else {
            this.createVedioFile.splice(index, 1, fileObj);
          }
          this.fileRequestData.image_name = this.photo;
        }
      },
    },
    audioPhoto: {
      //监听音频数据，生成file文件
      deep: true,
      handler() {
        if (this.chat_type == 29) {
          let fileObj = {
            file_type: "audio",
            file_url: this.audioPhoto,
            file_name: this.audioPhoto,
          };
          let index = this.createVedioFile.findIndex(
            (item) => item.file_type == fileObj.file_type
          );
          if (index == -1) {
            this.createVedioFile.push(fileObj);
          } else {
            this.createVedioFile.splice(index, 1, fileObj);
          }
        }
      },
    },
    oldPhoto: {
      //监听音频数据，生成file文件
      deep: true,
      handler() {
        console.log(this.oldPhoto);
        if (this.chat_type == 29) {
          let fileObj = {
            file_type: "image",
            file_url: this.oldPhoto,
            file_name: this.oldPhoto.split("/").pop(),
          };
          let index = this.createVedioFile.findIndex(
            (item) => item.file_type == fileObj.file_type
          );
          if (index == -1) {
            this.createVedioFile.push(fileObj);
          } else {
            this.createVedioFile.splice(index, 1, fileObj);
          }
        }
      },
    },
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
    if (this.$route.query.eid != undefined) {
      chatDetail(this.$route.query.eid).then((res) => {
        console.log(res, "体验馆");
      });
    }
  },
  methods: {
    fullScreen() {
      if (!this.photo && !this.dialogImg) {
        return;
      }
      if (
        (this.chat_type == 28 && !this.isBtn) ||
        (this.chat_type == 29 && !this.isBtn) ||
        (this.chat_type == 30 && !this.isBtn) ||
        (this.chat_type == 31 && !this.isBtn) ||
        (this.chat_type == 36 && !this.isBtn) ||
        (this.chat_type == 37 && !this.isBtn) ||
        (this.chat_type == 38 && !this.isBtn) ||
        (this.chat_type == 46 && !this.isBtn)
      ) {
        let dom = document.getElementById("successVideo");
        dom.requestFullscreen();
      } else if (
        (this.chat_type == 28 && this.isBtn) ||
        (this.chat_type == 29 && this.isBtn) ||
        (this.chat_type == 30 && this.isBtn) ||
        (this.chat_type == 31 && this.isBtn) ||
        (this.chat_type == 36 && this.isBtn) ||
        (this.chat_type == 37 && this.isBtn) ||
        (this.chat_type == 38 && this.isBtn) ||
        (this.chat_type == 46 && this.isBtn)
      ) {
        let dom = document.getElementById("isBtnVideo");
        dom.requestFullscreen();
      } else {
        this.dialogVisible = true;
      }
    },
    handleAaa() {
      this.$store.dispatch("id/SET_REMINDT", true);
    },
    // 关闭特效
    handleClose() {
      console.log("进入关闭");
      this.close = true;
      this.chatList = [];
      this.isBtn = false;
      this.ageCheck = "";
      this.guoManCheck = "";
      this.enhance = "";
      this.effects = "";
      this.dialogImg = "";
      this.emoticon = ""; //表情编辑
      this.hair = null; //发型编辑
      this.three_d = null; //3D游戏风
      this.living = null; //活体照片
      this.segmentation = null; //头发分割
      this.repair = null; //图片拉伸修复
      this.high = null; //图片拉伸修复
      this.direction = null; //图片方向矫正
    },
    checkItem(index, type) {
      if (index == 1) {
        this.checkNumB = type;
      } else if (index == 2) {
        this.checkNumAudio = type;
      } else {
        this.checkNumT = type;
        console.log(this.checkNumT);
        console.log("开启特效");
        if (!this.photo) {
          this.$message("请先上传文件");
          return;
        }
        // 改变类型时判断是否是视频
        if (
          this.chat_type == 29 ||
          this.chat_type == 30 ||
          this.chat_type == 31 ||
          this.chat_type == 36 ||
          this.chat_type == 37 ||
          this.chat_type == 38
        ) {
          return;
        }
        if (this.title == "视频人像卡通画") {
          console.log(this.guoManCheck, "类型");
          this.requestData = {
            prompt: "视频人像卡通画", //提示文字
            chat_type: "28", //# 类型必传'16'
            n: 1, //# 张数默认1
            style: this.guoManCheck,
            action_type: 6, //6表示生成视频
            origin_image: this.photo, //原图
            file_extension: this.fileRequestData.image_name
              ? this.fileRequestData.image_name.split(".")[1]
              : "mp4", //上传文件后缀
          };
        } else if (this.title == "人脸素描") {
          this.requestData = {
            prompt: "人脸素描", //提示文字
            chat_type: "40", //# 类型必传'16'
            style: "head",
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "人脸修复") {
          this.requestData = {
            prompt: "人脸修复", //提示文字
            chat_type: "39", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "智能美妆") {
          this.requestData = {
            prompt: "智能美妆", //提示文字
            chat_type: "42", //# 类型必传'16'
            n: 1, //# 张数默认1
            style: `${type - 2}`,
            strength: 1,
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "人脸滤镜") {
          this.requestData = {
            prompt: "人脸滤镜", //提示文字
            chat_type: "43", //# 类型必传'16'
            n: 1, //# 张数默认1
            style:
              type == 2
                ? "默认"
                : type == 3
                ? "向日葵"
                : type == 4
                ? "桔梗"
                : type == 5
                ? "垦丁"
                : type == 6
                ? "大理"
                : type == 7
                ? "丽江"
                : "",
            action_type: 3, //6表示生成视频
            strength: "1",
            origin_image: this.photo, //原图
          };
        } else if (this.title == "皮肤病检测") {
          this.requestData = {
            prompt: "皮肤病检测", //提示文字
            chat_type: "35", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "智能瘦脸") {
          this.requestData = {
            prompt: "智能瘦脸", //提示文字
            chat_type: "41", //# 类型必传'16'
            n: 1, //# 张数默认1
            style: "1.0",
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
          console.log(this.requestData);
        } else if (this.title == "物体识别") {
          this.requestData = {
            prompt: "物体识别", //提示文字
            chat_type: "47", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
          console.log(this.requestData);
        } else if (this.title == "图像标志擦除") {
          this.requestData = {
            prompt: "图像标志擦除", //提示文字
            chat_type: "49", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "商品抠图") {
          this.requestData = {
            prompt: "商品抠图", //提示文字
            chat_type: "50", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "人体轮廓分割") {
          this.requestData = {
            prompt: "人体轮廓分割", //提示文字
            chat_type: "51", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
          console.log(this.requestData);
        } else if (this.title == "车型识别") {
          this.requestData = {
            prompt: "车型识别", //提示文字
            chat_type: "53", //# 类型必传'16'
            n: 1, //# 张数默认1
            style: "1.0",
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
          console.log(this.requestData);
        } else if (this.title == "图像主体检测") {
          this.requestData = {
            prompt: "图像主体检测", //提示文字
            chat_type: "54", //# 类型必传'16'
            n: 1, //# 张数默认1
            style: "1.0",
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
          console.log(this.requestData);
        } else if (this.title == "黑白图像填色") {
          this.requestData = {
            prompt: "黑白图像填色", //提示文字
            chat_type: "55", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "图像风格转换") {
          this.requestData = {
            prompt: "图像风格转换", //提示文字
            chat_type: "56", //# 类型必传'16'
            n: 1, //# 张数默认1
            style:
              type == 1
                ? "cartoon"
                : type == 2
                ? "pencil"
                : type == 3
                ? "color_pencil"
                : type == 4
                ? "warm"
                : type == 5
                ? "wave"
                : type == 6
                ? "lavender"
                : type == 7
                ? "mononoke"
                : type == 8
                ? "scream"
                : "gothic",
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
        } else if (this.title == "清晰度增强") {
          this.requestData = {
            prompt: "清晰度增强", //提示文字
            chat_type: "57", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //6表示生成视频
            origin_image: this.photo, //原图
          };
          console.log(this.requestData);
        }
        this.imageSend();
      }
    },
    // 一键生成
    handleGenerate() {
      if (!this.photo && !this.oldPhoto) {
        this.$message.error("请先上传文件");
        return;
      }
      if (this.title == "照片修图") {
        this.requestData = {
          prompt: "照片修图", //提示文字
          chat_type: "32", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 3, //3表示生成图片
          origin_image: this.photo, //原图
          refer_image: this.oldPhoto, //内容图
        };
      } else if (this.title == "照片裁剪") {
        this.requestData = {
          prompt: "照片裁剪", //提示文字
          chat_type: "33", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 3, //3表示生成图片
          origin_image: this.photo, //原图
          size: this.ruleForm1.width + "*" + this.ruleForm1.height,
        };
      } else if (this.title == "视频人像卡通画") {
        console.log(this.guoManCheck);
        this.requestData = {
          prompt: "视频人像卡通画", //提示文字
          chat_type: "28", //# 类型必传'16'
          n: 1, //# 张数默认1
          style: this.guoManCheck,
          action_type: 6, //6表示生成视频
          origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
        };
      } else if (this.title == "视频字幕擦除") {
        this.requestData = {
          prompt: "视频字幕擦除", //提示文字
          chat_type: "31", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 6, //6表示生成视频
          origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
        };
      } else if (this.title == "视频标志擦除") {
        this.requestData = {
          prompt: "视频标志擦除", //提示文字
          chat_type: "30", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 6, //6表示生成视频
          origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
        };
      } else if (this.title == "通用视频生成") {
        this.requestData = {
          prompt: "通用视频生成", //提示文字
          chat_type: "29", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 6, //6表示生成视频
          style: "normal",
          // origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
          scene: "costume", //场景
          file_list: this.createVedioFile,
        };
      } else if (this.title == "视频降噪") {
        this.requestData = {
          prompt: "视频降噪", //提示文字
          chat_type: "36", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 6, //6表示生成视频
          origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
        };
      } else if (this.title == "视频封面生成") {
        this.requestData = {
          prompt: "视频封面生成", //提示文字
          chat_type: "38", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 6, //6表示生成视频
          style: this.checkNumT == 2 ? "True" : "False",
          origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
        };
      } else if (this.title == "视频增强") {
        this.requestData = {
          prompt: "视频增强", //提示文字
          chat_type: "37", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 6, //6表示生成视频
          origin_image: this.photo, //原图
          file_extension: this.fileRequestData.image_name.split(".")[1], //上传文件后缀
        };
      }
      this.imageSend();
    },
    // 绘画方法
    imageSend() {
      console.log("进入绘画方法");
      this.percentageNumbe = 0;
      this.isShowassociation = false;
      this.isShowChecked = false;
      this.chatList.forEach((v) => {
        v.checked = false;
      });
      this.chatList = [];
      this.isDetail = false;
      this.isShow = true; // 快速提问
      this.isfinish = false; // 完成打字效果
      this.isBtn = false; // 是否允许重发

      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() + 1;
      //日
      let day = new Date().getDate();
      //时
      let hour = new Date().getHours();
      //分
      let minute = new Date().getMinutes();
      //秒
      let second = new Date().getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let date = month + "/" + day + " " + hour + "-" + minute + "-" + second;

      let sendVal = {
        // 询问者问题展示
        create_time: date,
        finish_reason: "length",
        session_code: "",
        chat_group_code: "",
        role: "user",
        content: this.sendValue,
        checked: false,
        help: false,
        stepOn: false,
        timer: false,
        isShowOldChat: true,
      };

      this.chatList.push(sendVal);
      this.$store.dispatch("user/changeChatListLength", this.chatList.length);

      this.isTimeChat = true;

      this.timer = 0;
      this.t_time = setInterval(() => {
        this.timer += 1;
        if (this.timer == 180) {
          // this.percentageNumber = 99;
          // this.isTimeChat = false;
          // this.chatList.length = 0;
          // this.timer = 0;
          // clearInterval(this.t_time);
          this.$message({
            showClose: true,
            duration: 5000,
            message: '"当前生成时间较长，请稍后前来查看..."',
          });
        }
        if (Number((Math.random() * 10).toFixed(0)) % 2 == 0) {
          let num = Number((Math.random() * 10).toFixed(0));
          this.percentageNumber =
            this.percentageNumber + num >= 97
              ? 97
              : this.percentageNumber + num;
        }
      }, 1000);

      this.sendValue = "";
      console.log(this.requestData, "绘画接口传递数据");
      if (
        this.chat_type == 32 ||
        this.chat_type == 33 ||
        this.chat_type == 35 ||
        this.chat_type == 39 ||
        this.chat_type == 40 ||
        this.chat_type == 41 ||
        this.chat_type == 42 ||
        this.chat_type == 43 ||
        this.chat_type == 47 ||
        this.chat_type == 49 ||
        this.chat_type == 50 ||
        this.chat_type == 51 ||
        this.chat_type == 53 ||
        this.chat_type == 54 ||
        this.chat_type == 55 ||
        this.chat_type == 56 ||
        this.chat_type == 57
      ) {
        chatCreateImage(this.requestData).then((res) => {
          if (res.code == 20000) {
            this.CreateImage(res.data);
          } else if (
            res.code == 50001 ||
            res.code == 50000 ||
            res.code == 40017
          ) {
            if (res.code == 40017 && this.chat_type == 33) {
              this.$message.error("请检查您输入的宽高是否符合规范的格式");
            } else {
              this.$message.error("网络异常，请稍后重试...");
            }
            this.percentageNumber = 99;
            this.chatList.length = 0;
            clearInterval(this.t_time);
          } else if (res.code == 40027) {
            this.$message.error("图像合成失败，请重新上传");
            this.percentageNumber = 99;
            this.chatList.length = 0;
            clearInterval(this.t_time);
          } else if (
            res.code == 40022 &&
            JSON.parse(localStorage.getItem("userInfo")).role != "user"
          ) {
            this.$message.error(res.msg);
            this.percentageNumber = 99;
            this.chatList.length = 0;
            clearInterval(this.t_time);
          } else {
            this.$message.error(res.msg);
            this.percentageNumber = 99;
            this.chatList.length = 0;
            clearInterval(this.t_time);
          }
        });
      } else {
        //异步绘画
        this.asyncCreateImage();
      }
    },
    //异步生成
    asyncCreateImage() {
      baiduDraw(this.requestData).then((res) => {
        if (res.code == 20000) {
          this.asyncResultImage(res.data.task_id);
        } else if (
          res.code == 50001 ||
          res.code == 50000 ||
          res.code == 40017
        ) {
          this.percentageNumber = 99;
          this.isTimeChat = false;
          this.chatList.length = 0;
          clearInterval(this.t_time);
          this.$message.error("网络异常，请稍后重试...");
        } else if (res.code == 40027) {
          clearInterval(this.t_time);
          this.$message.error("图像合成失败，请重新上传");
          this.isTimeChat = false;
          this.percentageNumber = 99;
          this.chatList.length = 0;
          clearInterval(this.t_time);
        } else if (
          res.code == 40022 &&
          JSON.parse(localStorage.getItem("userInfo")).role != "user"
        ) {
          this.$message.error(res.msg);
          clearInterval(this.t_time);
          this.percentageNumber = 99;
          this.isTimeChat = false;
          this.chatList.length = 0;
        } else {
          clearInterval(this.t_time);
          this.$message.error(res.msg);
          this.percentageNumber = 99;
          this.isTimeChat = false;
          this.chatList.length = 0;
        }
      });
    },
    //异步查询绘画结果
    asyncResultImage(val) {
      let code = val;
      newbaiduDrawDetail(`task_id=${code}`).then((res) => {
        if (!res.data) {
          setTimeout(() => {
            this.asyncResultImage(code);
          }, 1000);
        } else {
          console.log(res.data, "--异步绘画结果");
          // let data = res.data[0];
          // let obj = {
          //   image_code: data.image_code,
          //   msg_code: data.msg_code,
          //   results: [
          //     {
          //       result_image: data.result_image?data.result_image:data.origin_image,
          //     },
          //   ],
          // };

          this.CreateImage(res.data);
        }
      });
    },
    //创建图片
    CreateImage(data) {
      console.log(data, "生成图片");
      setTimeout(() => {
        this.isuser = true;
        let img_urls = [];
        let url_val;
        if (data.results) {
          console.log("进入if");
          url_val = {
            url: data.results[0].result_image
              ? data.results[0].result_image
              : data.results[0].origin_image,
          };
          this.dialogImg = data.results[0].result_image
            ? data.results[0].result_image
            : data.results[0].origin_image; //弹出框图片
        } else {
          console.log("进入else");
          if (this.chat_type == 46) {
            url_val = { url: this.photo };
            this.dialogImg = this.photo;
          } else if (this.chat_type == 38) {
            url_val = {
              url: data[0].result_list[0],
            };
            this.dialogImg = data[0].result_list[0];
          } else {
            url_val = {
              url: data[0].result_image
                ? data[0].result_image
                : data[0].origin_image,
            };
            this.dialogImg = data[0].result_image
              ? data[0].result_image
              : data[0].origin_image; //弹出框图片
          }
        }

        img_urls.push(url_val);
        let obj;
        obj = {
          // "create_time": val.data[0].create_time,
          finish_reason: "stop",
          session_code: data.image_code,
          chat_group_code: data.msg_code,
          image_urls: img_urls,
          origin_image: data.origin_image, //判断三元表达式赋值图片
          result_image: data.result_image
            ? data.result_image
            : data.origin_image, //判断三元表达式赋值图片
          url_base: null,
          help: false,
          stepOn: false,
          isShowOldChat: true,
          timer: this.timer,
          is_mod: 0,
        };
        console.log(obj, "obj-----------");
        if (this.chat_type == 35) {
          //如果等于皮肤病检测将接口返回的文本赋值
          let objData = data.results[0].result_list;
          this.textData = Object.keys(objData).map((key) => {
            return {
              label: key,
              val: objData[key],
            };
          });
        }
        if (this.chat_type == 53 || this.chat_type == 54) {
          this.textData = data.results[0].result_list;
        }
        //视频评分
        if (this.chat_type == 46) {
          this.textData = data[0].result_list[0].videoQualityInfo;
        }
        this.chatList.push(obj);
        this.percentageNumber = 99;
        clearInterval(this.t_time);
        this.randomStr = Math.random();
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
        this.isBtn = true;
        this.isTimeChat = false;
        this.percentageNumber = 0;
        //视频评分
        if (this.chat_type == 46) {
          submitFootprint({
            type_name: this.title,
            type_code: "image",
            image_url: obj.image_urls[0].url,
            title: this.title,
            eid: data.image_code,
          }).then((res) => {});
        } else {
          // 保存最近使用
          submitFootprint({
            type_name: this.title,
            type_code: "image",
            image_url: obj.image_urls[0].url,
            title: this.title,
            eid: data.image_code,
          }).then((res) => {});
        }
        this.getChatList();
      }, 500);
    },
    // 获取绘画历史列表
    getChatList() {
      this.$nextTick(() => {
        let historyList = document.getElementById("history-list");
        let historyMask = document.getElementById("history-mask");
        historyList.addEventListener("scroll", (e) => {
          if (
            e.target.scrollTop + e.target.offsetHeight >=
            historyMask.offsetHeight
          ) {
            console.log("触发");
            this.getChatList("gundong");
          }
        });
      });
      let requestData = `chat_type=${this.chat_type}&page_size=${this.page_size}&page=${this.page}`;
      drawChatHistroyNew(requestData).then((res) => {
        this.chatHistoryList = res.data.data;
      });
    },
    // 下载
    async downloadImgs() {
      let vedioUrl;
      if (this.dialogImg) {
        vedioUrl = httpUrls.ossUrl + this.dialogImg;
      } else {
        vedioUrl = httpUrls.ossUrl + this.photo;
      }
      const response = await fetch(vedioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "无忧秘书." + vedioUrl.split(".").pop(); // 这里设置你想要的文件名
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // let canvas = document.createElement("canvas"),
      //   ctx = canvas.getContext("2d"),
      //   img = new Image();
      // img.crossOrigin = "*"; //解决Canvas.toDataURL 图片跨域问题
      // img.onload = () => {
      //   canvas.height = img.height;
      //   canvas.width = img.width;
      //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      //   let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 获取到图片的格式
      //   let dataURL = canvas.toDataURL("image/" + ext); // 得到base64 编码的 dataURL
      //   var a = document.createElement("a"); // 生成一个a元素
      //   var event = new MouseEvent("click"); // 创建一个单击事件
      //   a.download = "photo.png"; // 设置图片名称
      //   a.href = dataURL; // 将生成的URL设置为a.href属性
      //   a.dispatchEvent(event); // 触发a的单击事件
      //   canvas = null;
      // };
      // img.src = url;
    },
    //文件上传
    handleAvatarChange(file, fileList) {
      // console.log(file,'文件上传')
      this.fileRequestData.image = file.raw;
      this.fileRequestData.image_name = file.name;
    },
    // 内容图片上传
    handleAvatarSuccess(res, file) {
      console.log(res, "内容图片上传");
      this.photo = res.data.new_url;
      this.srcList = [res.data.new_url];
      this.chatList.length = 0;
      this.isBtn = false;
      this.checkNumT = 0;
      if (this.chat_type == 29) {
        let fileObj = {
          file_url: file.response.data.new_url,
          file_type: "video",
          file_name: file.response.data.new_url.split("/").pop(),
        };
        this.createVedioFile.push(fileObj);
      }
      if (this.chat_type == 46) {
        this.requestData = {
          prompt: "视频质量评分", //提示文字
          chat_type: "46", //# 类型必传'16'
          action_type: 6, //3表示生成图片
          file_extension: "mp4",
          model: "general", //
          origin_image: this.photo, //原图
        };
        this.imageSend();
      }
    },
    //获取绘画详情
    getDetail(item) {
      // console.log(item)
      // chatDetail(item.image_code).then(res => {
      //   console.log(res)
      // })

      this.chatList.length = 0;
      this.isBtn = false;
      if (this.title == "皮肤病检测") {
        this.photo = item.origin_image;
      } else {
        this.photo =
          item.result_image != "" ? item.result_image : item.origin_image;
      }
      console.log("进入详情", item);
    },
    // 风格图图片上传
    handleAvatarSuccessR(res, file) {
      this.$message.success('上传成功')
      this.oldPhoto = res.data.new_url;
      this.checkNumB = null;
      if (this.chat_type == 29) {
        let fileObj = {
          file_url: file.response.data.new_url,
          file_type: "image",
          file_name: file.response.data.new_url.split("/").pop(),
        };
        this.createVedioFile.push(fileObj);
      }
    },
    //音频上传
    handleAvatarSuccessAudio(res, file) {
      this.$message.success('上传成功')
      if (this.chat_type == 29) {
        let fileObj = {
          file_url: file.response.data.new_url,
          file_type: "audio",
          file_name: file.response.data.new_url.split("/").pop(),
        };
        this.audioPhoto = res.data.new_url;
        this.createVedioFile.push(fileObj);
      }
      // this.checkNum = 0;
      // this.oldPhoto = res.data.new_url;
    },
    handleAvatarChange(file, fileList) {
      this.fileRequestData.image = file.raw;
      this.fileRequestData.image_name = file.name;
    },
    beforeAvatarUploadR(file) {
      let istype =
        file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
        file.type == "image/png" ||
        file.type == "image/bmp";
      if (!istype) {
        this.$message.error("上传的图片格式仅支持jpg，png，bmp");
        
      }
      return istype;
    },
    beforeAvatarUploadAudio(file) {
      let istype =
        file.name.substring(file.name.lastIndexOf(".") + 1) == "mp3" ||
        file.name.substring(file.name.lastIndexOf(".") + 1) == "wav"
      if (!istype) {
        this.$message.error("上传的音频格式仅支持mp3，wav");
        
      }
      return istype;
    },
    beforeAvatarUpload(file) {
      let istype; //上传图片类型
      switch (this.chat_type) {
        case 29:
          istype =
            file.type == "video/mp4" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "avi" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mkv" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mov";
          break;
        case 30:
          istype = file.type == "video/mp4";
          break;
        case 31:
          istype = file.type == "video/mp4";
          break;
        case 32:
          istype =
            file.type == "image/jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png";
          break;
        case 33:
          istype =
            file.type == "image/jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp" ||
            file.type == "image/webp";
          break;
        case 34:
          istype =
            file.type == "image/jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp";
          break;
        case 36:
          istype =
            file.type == "video/mp4" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "avi" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mkv" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "flv" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mpg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mpg" ||
            file.type == "video/ts" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "ts" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mov" ||
            file.type == "video/mov";
          break;
        case 37:
          console.log(file.type, "1111111");
          istype =
            file.type == "video/mp4" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "avi" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mkv" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "flv" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mpg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "ts" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "mov";
          break;
        case 38:
          istype =
            file.type == "video/mp4" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "rmvb" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "flv" ||
            file.type == "video/ts" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "ts";
          break;
        case 39:
          istype =
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "bmp";
          break;
        case 40:
          istype =
            file.type == "image/jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png";
          break;
        case 41:
          istype =
            file.type == "image/jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png";
          break;
        case 43:
          istype =
            file.type == "image/jpeg" ||
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp";
          break;
        case 46:
          istype = file.type == "video/mp4";
          break;
        case 53:
          istype =
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp";
          break;
        case 54:
          istype =
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp";
          break;
        case 55:
          istype =
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp";
          break;
        case 56:
          istype =
            file.name.substring(file.name.lastIndexOf(".") + 1) == "jpg" ||
            file.type == "image/png" ||
            file.type == "image/bmp";
          break;
        default:
          break;
      }
      if (!istype) {
        switch (this.chat_type) {
          case 29:
            this.$message.error("上传文件格式错误仅支持mp4、avi、mkv、movs。");
            break;
          case 30:
            this.$message.error("上传的视频格式仅支持MP4");
            break;
          case 31:
            this.$message.error("上传的视频格式仅支持MP4");
            break;
          case 32:
            this.$message.error("上传的图片格式仅支持jpeg，jpg，png");
            break;
          case 33:
            this.$message.error(
              "上传的图片格式仅支持jpeg，jpg，png，bmp，webp"
            );
            break;
          case 34:
            this.$message.error("上传的图片格式仅支持jpeg，jpg，png，bmp");
            break;
          case 34:
            this.$message.error("上传的图片格式仅支持jpg，png");
            break;
          case 36:
            this.$message.error(
              "上传文件格式错误仅支持mp4、avi、mkv、flv、mov、mpg、ts、mxf。"
            );
            break;
          case 37:
            this.$message.error(
              "上传文件格式错误仅支持mp4、avi、mkv、flv、mov、mpg、ts。"
            );
            break;
          case 38:
            this.$message.error("上传文件格式仅支持mp4、rmvb、flv、ts。");
            break;
          case 39:
            this.$message.error("上传的图片格式仅支持jpeg，jpg，png，bmp");
            break;
          case 40:
            this.$message.error("上传的图片格式仅支持jpeg，jpg，png");
            break;
          case 41:
            this.$message.error("上传的图片格式仅支持jpeg，jpg，png");
            break;
          case 43:
            this.$message.error("上传的图片格式仅支持jpeg，jpg，png，bmp");
            break;
          case 46:
            this.$message.error("上传的视频格式仅支持MP4");
            break;
          case 53:
            this.$message.error("上传的图片格式仅支持jpg，png，bmp");
            break;
          case 54:
            this.$message.error("上传的图片格式仅支持jpg，png，bmp");
            break;
          case 55:
            this.$message.error("上传的图片格式仅支持jpg，png，bmp");
            break;
          case 56:
            this.$message.error("上传的图片格式仅支持jpg，png，bmp");
            break;
          default:
            break;
        }
      }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return istype;
    },
  },
};
</script>

<style scoped>
.charging-text{
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  line-height: 22px;
}
ul,li{
  margin: 0;
  padding-left: 0px;
}
ul{
  padding-left: 13px;

}
.charging-text-child{
  color: #999;
  font-weight: lighter;
  line-height: 22px;
}
.top-tips {
  font-size: 14px;
  text-align: center;
  color: #999;
}
.text-box {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 7px;
  background: #fff;
}
/* .el-form-item {
  margin-bottom: 10px !important;
} */
.fusion {
  width: 120px;
  height: 120px;
  z-index: 2;
  position: absolute;
  right: 0px;
  top: 0px;
  border-radius: 6px;
  overflow: hidden;
  opacity: 0.8;
}

.fusion img {
  width: 100%;
  height: 100%;
}

.fusion div {
  width: 100%;
  line-height: 18px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 0px;
}

.menter-avatar-uploader.yesUpload .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* line-height: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  border: 0px;
}

.menter-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* // width: 80px;
    // height: 80px;
    // line-height: 80px; */
  text-align: center;
}

.menter-avatar {
  width: 78px;
  height: 78px;
  display: block;
}

.top-prompt {
  background: #e8f3ff;
  width: 400px;
  height: 34px;
  flex-shrink: 0;
  padding: 5px 16px;
  box-sizing: border-box;
  display: flex;
  margin: auto;
  margin-bottom: 16px;
}

.top-prompt span {
  color: #1d2129;
  line-height: 24px;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}

.go-back {
  cursor: pointer;
  position: absolute;
  left: 56px;
  top: 50px;
}

.go_back-item-on {
  display: flex;
  transition: all 0.2s;
}

.vision {
  background-color: #f1f2f5;
  display: flex;
  height: calc(100%);
  position: relative;
}

.vision .bgImage {
  width: 100%;
  height: 100%;
  position: absolute;
}

.vision .main {
  width: calc(100% - 340px);
  height: 100%;
  overflow-y: auto;
  z-index: 1;
  padding-bottom: 30px;
  box-sizing: border-box;
}

.main .top_title {
  text-align: center;
  margin-top: 40px;
  color: #333;

  font-family: PingFang SC;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 15px;
  /* 54px */
}

.main .workspace_main {
  width: 100%;
  max-height: 630px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  margin-bottom: 0px;
}

.workspace_mask {
  position: relative;
  margin: auto;
}

.workspace_main .img_msk .img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  z-index: 2;
  border-radius: 10px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}

.filter_img {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: 1;
  object-fit: cover;
}

.workspace_main .img_msk {
  width: 400px;
  height: 400px;
  border-radius: 10px;

  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
    0px 10px 33px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  display: flex;
}

.noImg {
  /* width: 123px; */
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.noImg > div:last-child {
  margin-top: 13px;
  color: #9e9e9e;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.noImg .uploadImg {
  width: 150px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white !important;
  border-radius: 4px;
  background: #1f64ff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.noImg .uploadImg div {
  margin-left: 5px;
}
.uploadImg /deep/ .el-upload {
  height: 20px;
  background: rgba(0, 0, 0, 0);
  border: 0px;
}
.noImg .menter-avatar-uploader {
  height: 20px !important;
  background: rgba(0, 0, 0, 0) !important;
  border: 0px !important;
}

.noImg /deep/ .el-upload--text {
  margin: auto;
}

.noImg .el-upload {
  height: 20px !important;
  background: rgba(0, 0, 0, 0) !important;
  border: 0px !important;
}

.functional_area {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -106px;
  top: 0;
  z-index: 3;
  background-color: #ffffff;
  padding: 34px 23px;
  border-radius: 8px;
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 10px 33px rgba(0, 0, 0, 0.1));
}

.functional_area .lines {
  width: 30px;
  height: 30px;
  position: absolute;
  background-color: #ffffff;
  left: -5px;
  top: 30px;
  z-index: -1;
  transform: rotateZ(45deg);
}

.functional_area .child {
  width: 36px;
  margin-bottom: 24px;
}

.functional_area .child:last-child {
  margin-bottom: 0px;
}

.functional_area .child > div:first-child {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #666;
}

/* .functional_area .child>div:first-child img:last-child {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50% -50%);
  } */

.functional_area .child > div:last-child {
  color: #333;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  line-height: 35px;
}

.face {
  width: 400px;
  margin-top: 24px;
}

.face-sucai {
  width: 100%;
  position: relative;
}

.sucai-title {
  display: flex;
  box-sizing: border-box;
}

.sucai-title div {
  position: relative;
  color: black;
  text-align: center;
  font-family: PingFang SC;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
}

.sucai-title span {
  color: #86909c;
  margin-left: 16px;
  text-align: center;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.face-conter {
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 16px;
  width: 400px;
  flex-wrap: wrap;
}

.face-boxs {
  width: 76px;
  margin-right: 12px;
}

/* .face-boxs div:last-child {
    color: #86909C;
  
    margin-top: 5px;
    text-align: center;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  } */

.imgNo {
  width: 76px;
  height: 76px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0);
}

.imgOn {
  width: 76px;
  height: 76px;
  border-radius: 4px;
  border: 1px solid rgb(31, 100, 255);
}

.textOn {
  color: rgb(31, 100, 255);
  margin-bottom: 5px;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.textNo {
  color: #86909c;
  margin-bottom: 5px;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.age {
  width: 400px;
  margin-top: 20px;
}

.age-title {
  color: #888f9b;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.textImage {
  width: 400px;
  margin-top: 20px;
}

.textImage-conter {
  margin-top: 12px;
  width: 400px;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}

.generate {
  display: flex;
  width: 400px;
  /* padding: 10px 217px 10px 115px; */
  position: relative;
  left: 50%;
  transform: translate(-50%);
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 6px;
  background: #1f64ff;
}

.generate span:first-child {
  color: var(--text-text-white, #fff);
  text-align: center;
  font-family: PingFang SC;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  /* 141.176% */
}

.btn-tips {
  position: fixed;
  bottom: 40px;
  z-index: 9999;
  width: 100%;
}

.generate-tips {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 400px;
  color: rgba(31, 100, 255, 0.9);
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 0px;
  /* 200% */
}

.history {
  margin-top: 8px;
  width: 400px;
  color: #1f64ff;
  text-align: right;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 19.5px */
}

/* 右边内容 */
.vision .work_area {
  width: 340px;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
}

.work-title {
  color: #333;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 5px;
  border-bottom: 1px solid #efeff2;
}

.noHistory {
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #ccc;
}

.work_area .mask {
}

.work_area .item {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  position: relative;
}

.work_area .item .del {
  display: none;
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px;
  border-radius: 4px;
}

.work_area .item:hover .del {
  display: inline-block;
}

.work_area .item .img {
  width: 78px;
  height: 78px;
  object-fit: cover;
}

.work_area .item .img-on {
  border: 1px solid #1f64ff;
}

.draw_image-class_dark .el-dialog {
  /* box-sizing: border-box; */
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* max-height: 800px;
    min-height: 500px; */
  background-color: transparent;
  box-shadow: 0 0 0 transparent;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  /* width: auto; */
}

.draw_image-class_dark .el-dialog__headerbtn {
  display: none;
}

.draw_image-class_dark .el-dialog__header {
  display: none;
}

.draw_image-class_dark .el-dialog__body {
  padding: 0;
}

.domHover {
  cursor: pointer;
}

.item-title {
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
}

.item-title div:last-child {
  font-size: 13px;
}

.item-content {
  display: flex;
  justify-content: space-between;
  /* padding: 0px 20px; */
  box-sizing: border-box;
}

.item-content img {
  width: 120px;
  height: 90px;
  object-fit: cover;
}

.item-content > div div:first-child {
  width: 120px;
  margin-bottom: 10px;
  font-size: 15px;
}
</style>
