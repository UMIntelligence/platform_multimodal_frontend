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
      <div class="top-prompt" v-if="title == '人脸融合'">
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
        <span>选择素材图＞选择融合图＞一键生成融合图</span>
      </div>
      <!-- 大图示例和用户生成图片，以及各种错误提示区 -->
      <div
        class="workspace_main"
        :style="title == '人脸融合' ? 'height: 70%;overflow-y: auto;' : ''"
      >
        <div class="workspace_mask">
          <div class="img_msk">
            <!-- 示例 -->
            <div
              v-if="
                chatList.length == 0 &&
                title != '通用文字识别' &&
                title != '图片配文'
              "
            >
              <!-- 显示图片 -->
              <img
                class="img"
                v-if="photo"
                :src="httpUrls.ossUrl + photo"
                alt=""
              />
              <div class="noImg" v-else>
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
                <div>暂无融合图片</div>
              </div>
            </div>

            <!-- 通用文字识别示例 -->
            <div v-if="title == '通用文字识别' || title == '图片配文'">
              <!-- 显示图片 -->
              <img
                class="img"
                v-if="photo"
                :src="httpUrls.ossUrl + photo"
                alt=""
              />
              <div class="noImg" v-else>
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
                <div>暂无上传图片</div>
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
              <!-- 虚影图片 -->
              <!-- <img class="filter_img" :src="httpUrls.ossUrl + chatList[1].image_urls[0].url" alt=""> -->
              <!-- 显示图片 -->
              <img
                class="img"
                style="cursor: zoom-in"
                :src="httpUrls.ossUrl + chatList[1].image_urls[0].url"
                alt=""
                v-if="isBtn"
                @click="dialogVisible = true"
              />
              <!-- <div class="draw-result-tips">
                <img class="tips_img" src="../../assets/images/alert-triangle.png" />
                <span>当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉</span>
              </div> -->
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
          </div>
          <!-- 下载 -->
          <div class="functional_area">
            <div class="lines"></div>
            <div class="child domHover" @click="downloadImgs">
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
            <div class="child domHover" @click="dialogVisible = true">
              <div>
                <img src="../../assets/images/vision/全屏.png" />
              </div>
              <div>全屏</div>
            </div>
          </div>
          <!-- 人脸融合 -->
          <div class="face" v-if="title == '人脸融合'">
            <!-- 素材图选择 -->
            <div class="face-sucai">
              <div class="sucai-title">
                <div>素材图选择</div>
                <span>图片需要包含人脸</span>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :data="requestData"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :on-change="handleAvatarChange"
                      :headers="headerData"
                    >
                      <img
                        v-if="photo"
                        :src="httpUrls.ossUrl + photo"
                        class="menter-avatar"
                      />
                      <svg
                        v-else
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
                  <div class="textNo">素材图</div>
                </div>
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
                  <div :class="checkNumT == 0 ? 'textOn' : 'textNo'">示例1</div>
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
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">示例2</div>
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
                  <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">示例3</div>
                </div>
              </div>
            </div>
            <!-- 融合图选择 -->
            <div class="face-sucai">
              <div class="sucai-title">
                <div>融合图选择</div>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :data="requestData"
                      :on-success="handleAvatarSuccessR"
                      :before-upload="beforeAvatarUpload"
                      :on-change="handleAvatarChange"
                      :headers="headerData"
                    >
                      <img
                        v-if="oldPhoto"
                        :src="httpUrls.ossUrl + oldPhoto"
                        class="menter-avatar"
                      />
                      <svg
                        v-else
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
                  <div class="textNo">融合图</div>
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
          </div>
          <!-- 年龄/人物漫画/智能变美 -->
          <div
            class="age"
            v-if="
              title != '人脸融合' ||
              title != '通用文字识图' ||
              title != '图片配文' ||
              title != '人物抠图'
            "
          >
            <div class="age-title" v-if="title == '智能变美'">
              滑动查看效果对比
            </div>
            <div style="width: 298px; margin: auto" v-if="title == '智能变美'">
              <el-slider
                v-model="sliderNum"
                :step="10"
                @change="handleSlider"
                :show-tooltip="false"
              ></el-slider>
            </div>
            <div class="age-sucai">
              <div class="face-conter" v-if="title == '人像年龄变化'">
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 0), handleClose(), (ageCheck = '0')"
                >
                  <div
                    :class="checkNumT == 0 ? 'imgOn' : 'imgNo'"
                    :style="
                      checkNumT == 0
                        ? 'border: 1px solid rgb(31, 100, 255)'
                        : 'border: 1px solid rgba(0,0,0,0.1);'
                    "
                    style="
                      width: 78px;
                      height: 70px;
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
                  @click="checkItem(0, 1), (ageCheck = '5')"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    变年轻
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 2), (ageCheck = '70')"
                >
                  <img
                    :class="checkNumT == 2 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变老点.jpg"
                  />
                  <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">
                    变老点
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '人像漫画'">
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 0), handleClose()"
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
                  @click="checkItem(0, 1), (guoManCheck = 'hkcartoon')"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/guoM.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">国漫</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 2), (guoManCheck = 'jpcartoon')"
                >
                  <img
                    :class="checkNumT == 2 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/riM.jpg"
                  />
                  <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">日漫</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 3), (guoManCheck = 'classic_cartoon')"
                >
                  <img
                    :class="checkNumT == 3 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/guoM.jpg"
                  />
                  <div :class="checkNumT == 3 ? 'textOn' : 'textNo'">复古</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 4), (guoManCheck = 'tccartoon')"
                >
                  <img
                    :class="checkNumT == 4 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/guoM.jpg"
                  />
                  <div :class="checkNumT == 4 ? 'textOn' : 'textNo'">萌漫</div>
                </div>
              </div>
              <div class="face-conter domHover" v-if="title == '智能变美'">
                <div class="face-boxs" @click="checkItem(0, 0), handleClose()">
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
                <div class="face-boxs domHover" @click="checkItem(0, 1)">
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
              </div>
              <div
                class="face-conter"
                v-if="
                  title == '老照片修复' ||
                  title == '图像增强' ||
                  title == '3D游戏风' ||
                  title == '活体照片' ||
                  title == '头发分割' ||
                  title == '图片拉伸修复' ||
                  title == '图片超分辨率' ||
                  title == '图片方向矫正'
                "
              >
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 0), handleClose()"
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
                  @click="checkItem(0, 1), (guoManCheck = 'hkcartoon')"
                  v-if="title == '老照片修复'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/7d39ced7-172a-480e-8857-c4a479f9a1a5.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 1), (enhance = '2k')"
                  v-if="title == '图像增强'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 1), (three_d = 'three_d_game_cartoon')"
                  v-if="title == '3D游戏风'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    src="../../assets/images/vision/变年轻.jpg"
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 1), (living = 'three_d_game_cartoon')"
                  v-if="title == '活体照片'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d521efaa-8e08-4039-b749-6652c736a61d.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(0, 1), (segmentation = 'three_d_game_cartoon')
                  "
                  v-if="title == '头发分割'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d521efaa-8e08-4039-b749-6652c736a61d.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 1), (repair = 'three_d_game_cartoon')"
                  v-if="title == '图片拉伸修复'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d521efaa-8e08-4039-b749-6652c736a61d.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 1), (high = 'three_d_game_cartoon')"
                  v-if="title == '图片超分辨率'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d521efaa-8e08-4039-b749-6652c736a61d.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 1), (direction = 'three_d_game_cartoon')"
                  v-if="title == '图片方向矫正'"
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d521efaa-8e08-4039-b749-6652c736a61d.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">
                    开启特效
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '人像特效'">
                <!-- 关闭 -->
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 0), handleClose()"
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
                  v-for="(item, index) in effectsData"
                  :key="index"
                  @click="checkItem(0, index + 1), (effects = item.style)"
                >
                  <img
                    :class="checkNumT == index + 1 ? 'imgOn' : 'imgNo'"
                    :src="httpUrls.ossUrl + item.url"
                  />
                  <div :class="checkNumT == index + 1 ? 'textOn' : 'textNo'">
                    {{ item.title }}
                  </div>
                </div>
              </div>

              <div class="face-conter" v-if="title == '表情编辑'">
                <!-- 关闭 -->
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 0), handleClose()"
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
                  v-for="(item, index) in emoticonData"
                  :key="index"
                  @click="checkItem(0, index + 1), (emoticon = item.style)"
                >
                  <img
                    :class="checkNumT == index + 1 ? 'imgOn' : 'imgNo'"
                    :src="httpUrls.ossUrl + item.url"
                  />
                  <div :class="checkNumT == index + 1 ? 'textOn' : 'textNo'">
                    {{ item.title }}
                  </div>
                </div>
              </div>
              <div class="face-conter" v-if="title == '发型编辑'">
                <!-- 关闭 -->
                <div
                  class="face-boxs domHover"
                  @click="checkItem(0, 0), handleClose()"
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
                  v-for="(item, index) in hairData"
                  :key="index"
                  @click="checkItem(0, index + 1), (hair = item.style)"
                >
                  <img
                    :class="checkNumT == index + 1 ? 'imgOn' : 'imgNo'"
                    :src="httpUrls.ossUrl + item.url"
                  />
                  <div :class="checkNumT == index + 1 ? 'textOn' : 'textNo'">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 通用文字识图 / 图片配文-->
          <div
            class="textImage"
            v-if="
              (title == '通用文字识别' && chatList.length != 0) ||
              (title == '图片配文' && chatList.length != 0)
            "
          >
            <div class="textImage-sucai">
              <div class="sucai-title">
                <div>识别结果</div>
              </div>
              <div
                class="textImage-conter"
                v-if="chatList[1].result_list.length != 0"
              >
                <div v-for="item in chatList[1].result_list" :key="item">
                  {{ item }}
                </div>
              </div>
              <div class="textImage-conter" v-else>
                <div>未识别出文字，请重新上传</div>
              </div>
            </div>
          </div>
          <!-- 人物抠图 -->
          <div class="face" v-if="title == '人物抠图'">
            <div class="age-title" v-if="title == '人物抠图'">
              请分别选择一张人物照和背景图
            </div>
            <!-- 素材图选择 -->
            <div class="face-sucai">
              <div class="sucai-title">
                <div>素材图选择</div>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :data="requestData"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :on-change="handleAvatarChange"
                      :headers="headerData"
                    >
                      <img
                        v-if="photo"
                        :src="httpUrls.ossUrl + photo"
                        class="menter-avatar"
                      />
                      <svg
                        v-else
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
                  <div class="textNo">素材图</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(0, 1),
                      (photo =
                        'static/picture/8fd3be74-cbff-44a8-b1d4-6b1657379ad7.png')
                  "
                >
                  <img
                    :class="checkNumT == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/8fd3be74-cbff-44a8-b1d4-6b1657379ad7.png'
                    "
                  />
                  <div :class="checkNumT == 1 ? 'textOn' : 'textNo'">示例1</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(0, 2),
                      (photo =
                        'static/picture/6f519478-1a69-42db-b710-254bc33f07ff.png')
                  "
                >
                  <img
                    :class="checkNumT == 2 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/6f519478-1a69-42db-b710-254bc33f07ff.png'
                    "
                  />
                  <div :class="checkNumT == 2 ? 'textOn' : 'textNo'">示例2</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(0, 3),
                      (photo =
                        'xcx/com/message_center/lQLPKc5WOEcWeb3NAsjNAgCwQwgPy2IUbzAF7sNX13zaAA_512_712.png')
                  "
                >
                  <img
                    :class="checkNumT == 3 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'xcx/com/message_center/lQLPKc5WOEcWeb3NAsjNAgCwQwgPy2IUbzAF7sNX13zaAA_512_712.png'
                    "
                  />
                  <div :class="checkNumT == 3 ? 'textOn' : 'textNo'">示例3</div>
                </div>
              </div>
            </div>
            <!-- 融合图选择 -->
            <div class="face-sucai">
              <div class="sucai-title">
                <div>融合图选择</div>
              </div>
              <div class="face-conter">
                <div class="face-boxs">
                  <div style="margin: 0px">
                    <el-upload
                      class="menter-avatar-uploader yesUpload"
                      :action="httpUrls.loginUrl + 'api/user/oss_upload'"
                      :show-file-list="false"
                      :data="requestData"
                      :on-success="handleAvatarSuccessR"
                      :before-upload="beforeAvatarUpload"
                      :on-change="handleAvatarChange"
                      :headers="headerData"
                    >
                      <img
                        v-if="oldPhoto"
                        :src="httpUrls.ossUrl + oldPhoto"
                        class="menter-avatar"
                      />
                      <svg
                        v-else
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
                  <div class="textNo">融合图</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(1, 1),
                      (oldPhoto =
                        'static/picture/d1db97de-66e5-4bee-a4f7-8db61b3539ca.png')
                  "
                >
                  <img
                    :class="checkNumB == 1 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/d1db97de-66e5-4bee-a4f7-8db61b3539ca.png'
                    "
                  />
                  <div :class="checkNumB == 1 ? 'textOn' : 'textNo'">示例1</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(1, 2),
                      (oldPhoto =
                        'static/picture/353e7651-b0b4-4ca7-aa67-8e4f12d3c0e4.png')
                  "
                >
                  <img
                    :class="checkNumB == 2 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/353e7651-b0b4-4ca7-aa67-8e4f12d3c0e4.png'
                    "
                  />
                  <div :class="checkNumB == 2 ? 'textOn' : 'textNo'">示例2</div>
                </div>
                <div
                  class="face-boxs domHover"
                  @click="
                    checkItem(1, 3),
                      (oldPhoto =
                        'static/picture/0736e476-0dad-4346-8804-41bf831667dd.png')
                  "
                >
                  <img
                    :class="checkNumB == 3 ? 'imgOn' : 'imgNo'"
                    :src="
                      httpUrls.ossUrl +
                      'static/picture/0736e476-0dad-4346-8804-41bf831667dd.png'
                    "
                  />
                  <div :class="checkNumB == 3 ? 'textOn' : 'textNo'">示例3</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 生成 -->

          <!-- 历史记录 -->
          <!-- <div class="history">历史记录</div> -->
          <div></div>
        </div>
      </div>
      <div class="generate-tips">{{tokenPrice}}/次</div>
      <div
        class="generate domHover"
        v-if="title == '人脸融合' || title == '人物抠图'"
      >
        <div @click="handleGenerate">
          <span>一键生成</span>
        </div>
      </div>
      <div class="generate" v-if="title != '人脸融合' && title != '人物抠图'">
        <el-upload
          style="background-color: #1f64ff"
          :action="httpUrls.loginUrl + 'api/user/oss_upload'"
          :show-file-list="false"
          :data="requestData"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handleAvatarChange"
          :headers="headerData"
        >
          <div>
            <span>上传图片</span>
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
              <img :src="httpUrls.ossUrl + item.origin_image" />
            </div>
            <div class="item-right domHover" @click="getDetail(item)">
              <div>{{ title }}</div>
              <img
                v-show="item.result_image"
                :src="httpUrls.ossUrl + item.result_image"
              />
            </div>
          </div>
          <!-- <div class="item" >
          <img v-if="title=='通用文字识别'" class="img" :src="httpUrls.ossUrl + 'static/picture/0736e476-0dad-4346-8804-41bf831667dd.png'"/>
          <img v-else class="img" :src="httpUrls.ossUrl + 'static/picture/0736e476-0dad-4346-8804-41bf831667dd.png'" alt="">
          <i class="el-icon-close del" @click="deleteDrawHistory(item, i)"></i>
        </div> -->
        </div>
        <div class="noHistory" v-else>暂无数据</div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="550px"
      class="draw_image-class_dark"
    >
      <img
        v-if="dialogImg"
        :src="httpUrls.ossUrl + dialogImg"
        style="
          width: 100%;
          mix-height: 800px;
          min-height: 500px;
          cursor: zoom-out;
        "
        alt=""
        @click="dialogVisible = false"
      />
      <img
        v-else
        :src="httpUrls.ossUrl + photo"
        style="width: 100%max-height: 800px;min-height: 500px;cursor: zoom-out;"
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
  chatDetailNew,
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
      centerDialogVisible: false,
      httpUrls,
      sliderNum: 0, //滑块滚动
      dialogVisible: false,
      dialogImg: "", //大屏图片
      title: "",
      checkNumT: null,
      checkNumB: null,
      requestData: {
        image: null,
        image_name: null,
        oss_dir: "static",
        cate: "mentor_image-list",
      },
      page_size: 10,
      page: 1,
      close: false, //关闭
      photo: "", //上传后图片
      oldPhoto: "", //素材图
      ageCheck: "", //选择年龄
      guoManCheck: "", //选择国漫
      enhance: "", //图像增强
      effects: "", //人像特效
      effectsData: [
        //人像特效数组
        {
          title: "皮克斯",
          style: "pixar",
          url: "static/picture/85b9e81e-c4fd-4a2b-972e-14effee099f1.png",
        },
        {
          title: "3D卡通风",
          style: "3d_cartoon",
          url: "static/picture/661da5b5-fef2-4b76-8ea5-07f336ee4890.png",
        },
        {
          title: "天使",
          style: "angel",
          url: "static/picture/92b5d5f8-d421-4ae1-a352-98b9b1749ca8.png",
        },
        {
          title: "恶魔",
          style: "demon",
          url: "static/picture/65d0aefe-8c23-450c-8a9a-93ba32a41abc.png",
        },
        {
          title: "浮世绘",
          style: "ukiyoe_cartoon",
          url: "static/picture/f5e11170-7f53-45de-963f-b274b3c50d9a.png",
        },
        {
          title: "波普风",
          style: "bopu_cartoon",
          url: "static/picture/75105838-26b5-4fac-ac66-b592c769fab9.png",
        },
        {
          title: "美漫风",
          style: "amcartoon",
          url: "static/picture/828e6b7d-de55-44bb-bee7-e53938fd6225.png",
        },
      ],
      emoticon: "", //表情编辑
      emoticonData: [
        {
          title: "露齿笑",
          style: "0",
          url: "static/picture/71a93959-4df5-49f2-8841-cc6586bb6d1d.png",
        },
        {
          title: "嘟嘟嘴",
          style: "1",
          url: "static/picture/2e5f55b8-467c-47b4-8340-cccc16b4402e.png",
        },
        {
          title: "不高兴",
          style: "2",
          url: "static/picture/e20605d7-5bf4-40f6-bf76-f5876136832c.png",
        },
        {
          title: "闭嘴笑",
          style: "3",
          url: "static/picture/0b840f2a-b00e-4702-8593-75248ba84475.png",
        },
      ],
      hair: 0, //发型编辑
      hairData: [
        {
          title: "刘海",
          style: "0",
          url: "static/picture/6dc401ed-ec0f-4551-b98d-19820da22deb.JPG",
        },
        {
          title: "长发",
          style: "1",
          url: "static/picture/7fb105f0-4e9a-4e48-a0a6-bfa223a01e10.JPG",
        },
        {
          title: "刘海加长发",
          style: "2",
          url: "static/picture/0b945447-64f1-4813-95dd-208e94ff7352.JPG",
        },
        {
          title: "增发",
          style: "3",
          url: "static/picture/e05dd39f-8af3-4c65-b773-bb46d9274148.JPG",
        },
      ],
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
    ...mapGetters(["workTitle"]),
    titleContent() {
      let text;
      switch (this.title) {
        case "通用文字识别":
          text = "可识别所上传图片中所包含的文字内容";
          break;
        case "人脸融合":
          text = "";
          break;
        case "人物抠图":
          text = "提供素材图和融合图进行融合";
          break;
        case "人像年龄变化":
          text = "上传图片，可根据需要选择变老或者变年轻";
          break;
        case "智能变美":
          text = "上传图片，对图片内的人像人脸进行美颜";
          break;
        case "人像漫画":
          text = "上传包含人像的图片，可选择不同类型的漫画生成对应的漫画人像";
          break;
        case "老照片修复":
          text = "修复所提供图片的清晰度、分辨率等";
          break;
        case "图像增强":
          text = "综合提高所上传图片的整体质量";
          break;
        case "人像特效":
          text = "上传含人像的图片，选择不同特效生成对应效果";
          break;
        case "表情编辑":
          text = "上传含人脸的图片，选择不同表情生成对应的效果";
          break;
        case "发型编辑":
          text = "上传含人像的图片，选择不同发型生成对应的效果";
          break;
        case "3D游戏风":
          text = "可对所上传人像图进行3D游戏风格处理";
          break;
        case "图片配文":
          text = "根据上传的图片内容自动匹配文字内容，如诗歌、短文等";
          break;
        default:
          break;
      }
      return text;
    },
    tokenPrice(){
      let price;
      switch (this.title) {
        case "通用文字识别":
        price = "150";
          break;
        case "人脸融合":
        price = "1500";
          break;
        case "人物抠图":
        price = "1200";
          break;
        case "人像年龄变化":
        price = "789";
          break;
        case "智能变美":
        price = "1500";
          break;
        case "人像漫画":
        price = "3000";
          break;
        case "老照片修复":
        price = "1500";
          break;
        case "图像增强":
        price = "600";
          break;
        case "人像特效":
        price = "6000";
          break;
        case "表情编辑":
        price = "2400";
          break;
        case "发型编辑":
        price = "2400";
        break;
        case "3D游戏风":
        price = "7212";
        break;
        case "图片配文":
        price = "";
          break;
        default:
          break;
      }
      return '消耗'+price + '算力';
    }
  },
  created() {
    this.title = this.$route.query.title;
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.headerData.authorization = userInfo.token
    this.headerData.role = userInfo.role
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
          case "通用文字识别":
            this.chat_type = 19;
            break;
          case "人脸融合":
            this.chat_type = 21;
            break;
          case "人物抠图":
            this.chat_type = 20;
            break;
          case "人像年龄变化":
            this.chat_type = 16;
            break;
          case "智能变美":
            this.chat_type = 17;
            break;
          case "人像漫画":
            this.chat_type = 18;
            break;
          case "老照片修复":
            this.chat_type = 18;
            break;
          case "图像增强":
            this.chat_type = 27;
            break;
          case "人像特效":
            this.chat_type = 22;
            break;
          case "表情编辑":
            this.chat_type = 26;
            break;
          case "发型编辑":
            this.chat_type = 23;
            console.log("进入发型编辑");
          case "3D游戏风":
            this.chat_type = 24;
            console.log("进入3D游戏风");
          case "图片配文":
            this.chat_type = 25;
            console.log("进入图片配文");
            break;
          default:
            break;
        }
        if (this.title == "发型编辑" && this.chat_type == 25) {
          this.chat_type = 23;
          this.title = "发型编辑";
        }
        if (this.title == "3D游戏风" && this.chat_type == 25) {
          this.chat_type = 24;
          this.title = "3D游戏风";
        }
        console.log(this.title, this.chat_type);
        this.getChatList();
      },
    },
    // 监听选择年龄
    ageCheck: {
      deep: true,
      handler() {
        console.log("触发年龄监听");
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.ageCheck == 70 || this.ageCheck == 5) {
          this.requestData = {
            prompt: "人像年龄变化", //提示文字
            chat_type: "16", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: "all_age_generation", //
            change_degree: parseInt(this.ageCheck),
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //国漫
    guoManCheck: {
      deep: true,
      handler() {
        console.log("触发国漫监听");
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "人像漫画", //提示文字
            chat_type: "18", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: "jpcartoon", //
            style: this.guoManCheck,
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //图像增强
    enhance: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "图像增强", //提示文字
            chat_type: "27", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //3表示生成图片
            model: "enhance_photo_v2", //
            size: this.enhance,
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    effects: {
      deep: true,
      handler() {
        console.log("进入人像特效监听");
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.effects) {
          this.requestData = {
            prompt: "人像特效", //提示文字
            chat_type: "22", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //3表示生成图片
            model: "potrait_effect", //
            style: this.effects,
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    emoticon: {
      //表情编辑
      deep: true,
      handler() {
        console.log("进入表情编辑", this.emoticon);
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.emoticon !== "") {
          this.requestData = {
            prompt: "表情编辑", //提示文字
            chat_type: "26", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //3表示生成图片
            model: "emoticon_edit", //
            style: this.emoticon,
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    hair: {
      //发型编辑
      deep: true,
      handler() {
        console.log("进入发型编辑", this.hair);
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.hair != null) {
          this.requestData = {
            prompt: "表情编辑", //提示文字
            chat_type: "23", //# 类型必传'16'
            n: 1, //# 张数默认1
            action_type: 3, //3表示生成图片
            model: "hair_style", //
            style: this.hair,
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //3D游戏风
    three_d: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "3D游戏风", //提示文字
            chat_type: "24", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: this.three_d, //
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //活体照片
    living: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "活体照片", //提示文字
            chat_type: "24", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: this.three_d, //
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //头发分割
    segmentation: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "头发分割", //提示文字
            chat_type: "24", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: this.three_d, //
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //图片拉伸修复
    repair: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "图片拉伸修复", //提示文字
            chat_type: "24", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: this.three_d, //
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //图片超分辨率
    high: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "图片超分辨率", //提示文字
            chat_type: "24", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: this.three_d, //
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
    //图片方向矫正
    direction: {
      deep: true,
      handler() {
        if (!this.photo) {
          this.$message.error("请先上传图片");
          this.checkNumT = 0;
          this.handleClose();
        } else if (this.checkNumT) {
          this.requestData = {
            prompt: "图片方向矫正", //提示文字
            chat_type: "24", //# 类型必传'16'
            n: 1, //# 张数默认1
            quality: "standard", //# 标准 可选standard，hd。 默认传standard，chat_type=15传
            action_type: 3, //3表示生成图片
            model: this.three_d, //
            origin_image: this.photo, //原图
          };
          //创建图片方法
          this.imageSend();
        }
      },
    },
  },
  mounted() {
    if (this.$route.query.eid != undefined) {
      chatDetail(this.$route.query.eid).then((res) => {
        console.log(res, "体验馆");
      });
    }
  },
  methods: {
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
      if (index) {
        this.checkNumB = type;
      } else {
        this.checkNumT = type;
      }
    },
    // 一键生成
    handleGenerate() {
      if (!this.photo) {
        this.$message.error("请上传素材图");
        return;
      }
      if (!this.oldPhoto) {
        this.$message.error("请上传融合图");
        return;
      }
      if (this.title == "人脸融合") {
        if (!this.photo) {
          this.$message.error("请选择或上传你的素材图片");
          return;
        }
        if (!this.oldPhoto) {
          this.$message.error("请选择或上传要融合的图片");
          return;
        }
        this.requestData = {
          prompt: "人脸融合", //提示文字
          chat_type: "21", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 3, //3表示生成图片
          model: "face_swap", //
          origin_image: this.photo, //原图
          change_degree: 1,
          refer_image: this.oldPhoto, //素材图
        };
        this.imageSend();
      } else if (this.title == "人物抠图") {
        this.requestData = {
          prompt: "人物抠图", //提示文字
          chat_type: "20", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 3, //3表示生成图片
          model: "human_segment", //
          origin_image: this.photo, //原图
          quality: 1,
          refer_image: this.oldPhoto, //素材图
        };
        this.imageSend();
      }
    },

    //滑动组件回调
    handleSlider() {
      if (!this.photo) {
        this.$message.error("请先上传图片");
        this.checkNumT = 0;
        this.handleClose();
        return;
      }
      this.requestData = {
        prompt: "智能变美", //提示文字
        chat_type: "17", //# 类型必传'16'
        n: 1, //# 张数默认1
        quality: this.sliderNum / 100, //# 标准 可选standard，hd。 默认传standard，chat_type=15传
        action_type: 3, //3表示生成图片
        model: "face_pretty", //
        origin_image: this.photo, //原图
      };
      //创建图片方法
      this.imageSend();
    },
    // 绘画方法
    imageSend() {
      if (this.isTimeChat == true) {
        this.$message.error("当前图片正在生成中，请稍后再试");
        return;
      }
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
      chatCreateImage(this.requestData).then((res) => {
        console.log(res, "---绘画图片接口返回数据");
        if (res.code == 20000) {
          this.CreateImage(res.data);
        } else if (
          res.code == 50001 ||
          res.code == 50000 ||
          res.code == 40017
        ) {
          this.$message.error("网络异常，请稍后重试...");
          this.percentageNumber = 99;
          this.chatList.length = 0;
          this.isTimeChat = false;
          clearInterval(this.t_time);
        } else if (res.code == 40027) {
          if (this.chat_type == 20) {
            this.$message.error("图像合成失败，请重新上传示例图");
          } else {
            this.$message.error("图像合成失败，请重新上传");
          }
          this.percentageNumber = 99;
          this.chatList.length = 0;
          this.isTimeChat = false;
          clearInterval(this.t_time);
        } else if (
          res.code == 40022 &&
          JSON.parse(localStorage.getItem("userInfo")).role != "user"
        ) {
          this.$message.error("请登录...");
          this.percentageNumber = 99;
          this.chatList.length = 0;
          this.isTimeChat = false;
          // this.$refs.Register.registerVisible = true
        }
      });
    },
    //创建图片
    CreateImage(data) {
      // console.log(data, "---绘画图片传递数据")
      setTimeout(() => {
        this.isuser = true;
        let img_urls = [];
        let url_val = { url: data.results[0].result_image };
        this.dialogImg = data.results[0].result_image;
        img_urls.push(url_val);
        let obj;
        if (this.title == "通用文字识别" || this.title == "图片配文") {
          obj = {
            // "create_time": val.data[0].create_time,
            finish_reason: "stop",
            session_code: data.image_code,
            chat_group_code: data.msg_code,
            image_urls: [{ url: data.results[0].origin_image }],
            origin_image: data.origin_image,
            result_image: data.result_image,
            url_base: null,
            help: false,
            stepOn: false,
            isShowOldChat: true,
            timer: this.timer,
            is_mod: 0,
            result_list: data.results[0].result_list,
          };
        } else {
          obj = {
            // "create_time": val.data[0].create_time,
            finish_reason: "stop",
            session_code: data.image_code,
            chat_group_code: data.msg_code,
            image_urls: img_urls,
            origin_image: data.origin_image,
            result_image: data.result_image,
            url_base: null,
            help: false,
            stepOn: false,
            isShowOldChat: true,
            timer: this.timer,
            is_mod: 0,
          };
        }
        // console.log(obj, '-------');
        // data.results[0].result_list
        this.chatList.push(obj);
        this.percentageNumber = 99;
        clearInterval(this.t_time);
        this.randomStr = Math.random();
        this.$store.dispatch("user/changeChatListLength", this.chatList.length);
        this.isBtn = true;
        this.isTimeChat = false;
        this.percentageNumber = 0;
        // 保存最近使用
        submitFootprint({
          type_name: this.title,
          type_code: "image",
          image_url: obj.image_urls[0].url,
          title: this.title,
          eid: data.image_code,
        }).then((res) => {});
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
    downloadImgs() {
      let url;
      if (this.dialogImg) {
        url = httpUrls.ossUrl + this.dialogImg;
      } else {
        url = httpUrls.ossUrl + this.photo;
      }
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

      // const a = document.createElement("a");
      // a.style.display = "none";
      // a.href = url;
      // a.download = "无忧秘书." + url.split(".").pop(); // 这里设置你想要的文件名
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // img.src = url;

      const iframe = document.createElement("iframe");
      iframe.setAttribute("hidden", "hidden");
      document.body.appendChild(iframe);
      iframe.onload = () => {
        if (iframe) {
          iframe.setAttribute("src", "about:blank");
        }
      };
      iframe.setAttribute("src", url);
    },
    //文件上传
    handleAvatarChange(file, fileList) {
      this.requestData.image = file.raw;
      this.requestData.image_name = file.name;
    },
    // 素材图片上传
    handleAvatarSuccess(res, file) {
      console.log(res.data);
      this.photo = res.data.new_url;
      this.srcList = [res.data.new_url];
      this.chatList.length = 0;
      this.isBtn = false;
      this.checkNumT = 0;
      this.handleClose();
      console.log(this.isBtn, "判断小子");
      if (this.title == "通用文字识别" && this.photo != "") {
        this.requestData = {
          prompt: "通用文字识别", //提示文字
          chat_type: "19", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 3, //3表示生成图片
          model: "ocr_normal", //
          origin_image: this.photo, //原图
        };
        this.chat_type = 19;
        // this.chatList.length = 0;

        this.imageSend();
      } else if (this.title == "图片配文" && this.photo != "") {
        this.requestData = {
          prompt: "图片配文", //提示文字
          chat_type: "25", //# 类型必传'16'
          n: 1, //# 张数默认1
          action_type: 3, //3表示生成图片
          model: "poem_material", //
          origin_image: this.photo, //原图
        };

        this.chat_type = 25;
        // this.chatList.length = 0;
        this.imageSend();
      }
    },
    //获取绘画详情
    getDetail(item) {
      chatDetailNew(item.image_code).then((res) => {
        this.chatList.length = 0;
        this.isBtn = true;
        this.chatList = res.data
        if (this.title == "通用文字识别" || this.title == "图片配文" ) {
          this.photo = res.data[1].origin_image;
          this.$set(this.chatList[1],'result_list',JSON.parse(this.chatList[1]['result_list']))
        } else {
          let img_urls = [];
          let url_val = { url: res.data[1].result_image };
          this.dialogImg = res.data[1].result_image;
          img_urls.push(url_val);
           this.$set(this.chatList[1],'image_urls',img_urls)
        }
      });
    },
    // 融合图图片上传
    handleAvatarSuccessR(res, file) {
      this.oldPhoto = res.data.new_url;
    },
    handleAvatarChange(file, fileList) {
      this.requestData.image = file.raw;
      this.requestData.image_name = file.name;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file, "进入");
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>

<style scoped>
.generate /deep/.el-upload {
  display: block;
  color: red;
}
.top-tips {
  font-size: 14px;
  text-align: center;
  color: #999;
}
.menter-avatar-uploader.yesUpload .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 78px;
  height: 78px;
  /* line-height: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menter-avatar-uploader.yesUpload .el-upload:hover {
  border-color: #409eff;
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
  width: 123px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.noImg div {
  margin-top: 13px;
  color: #9e9e9e;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  margin-top: 10px;
}

.face-sucai {
  width: 100%;
  position: relative;
}

.sucai-title {
  display: flex;
  box-sizing: border-box;
  /* margin-bottom: 10px; */
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
  margin-bottom: 0px;
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
  margin-top: 5px;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.textNo {
  color: #86909c;

  margin-top: 5px;
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
  margin-top: 10px;
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
