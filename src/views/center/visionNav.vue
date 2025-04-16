<template>
  <main>
    <div class="go-back" style="z-index: 10;">
      <div @click="$router.go(-1)" class="go_back-item-on">
        <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../../assets/images/right.png" alt="">
        <span style="margin-left: 8px;">返回</span>
      </div>
    </div>
    <!-- 导航栏 -->
    <nav>
      <div class="nav-left">
        <img src="../../assets/images/Frame-logo.jpg" />
        <div>
          <div>你好，欢迎来到AI视觉馆！</div>
          <div>全新功能，即刻体验</div>
        </div>
      </div>
      <div class="nav-right">
        <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入内容"></el-input>
        <el-button style="margin-left: 15px;" @click="handleSearch">确定</el-button>
      </div>
    </nav>
    <!-- 主题内容 -->
    <section>
      <div class="section-top">
        <!-- <span @click="title = 'hot'" :style="title == 'hot' ? 'color: blue;' : ''">热门功能</span> -->
        <span>全部功能</span>
      </div>
      <div class="section-main">
        <!-- 全部功能 -->
        <div class="whole" v-if="title == 'whole'">
          <div class="domHover" v-if="bool == true" @click="toPage(boolInput)">
            <img :src='httpUrls.ossUrl + "static/picture/abc1ba35-b9b6-4450-96f9-bbecbb225579.jpg"'
              v-if="boolInput == '人脸融合'">
            <img :src='httpUrls.ossUrl + "static/picture/294e872a-ae09-47d0-89c7-b1b7afcc387a.jpg"'
              v-if="boolInput == '人像年龄变化'">
            <img :src='httpUrls.ossUrl + "static/picture/ad068d73-fdd0-46df-b611-961cfda6116f.jpg"'
              v-if="boolInput == '智能变美'">
            <img :src='httpUrls.ossUrl + "static/picture/268c961d-8e31-4f01-9ae2-b4a8862b9516.png"'
              v-if="boolInput == '人物抠图'">
            <svg v-if="boolInput == '人像特效'" xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17"
              fill="none">
              <path
                d="M12.125 6.75L12.4532 7.38479C12.7386 7.93671 13.1883 8.38641 13.7402 8.67178L14.375 9L13.7402 9.32822C13.1883 9.61359 12.7386 10.0633 12.4532 10.6152L12.125 11.25L11.7968 10.6152C11.5114 10.0633 11.0617 9.61359 10.5098 9.32822L9.875 9L10.5098 8.67178C11.0617 8.38641 11.5114 7.93671 11.7968 7.38479L12.125 6.75Z"
                fill="#1F64FF" />
              <path
                d="M15.875 2.25L16.2032 2.88479C16.4886 3.43671 16.9383 3.88641 17.4902 4.17178L18.125 4.5L17.4902 4.82822C16.9383 5.11359 16.4886 5.56329 16.2032 6.11521L15.875 6.75L15.5468 6.11521C15.2614 5.56329 14.8117 5.11359 14.2598 4.82822L13.625 4.5L14.2598 4.17178C14.8117 3.88641 15.2614 3.43671 15.5468 2.88479L15.875 2.25Z"
                fill="black" />
              <path
                d="M10.625 11.625C10.625 13.1328 9.94043 14.4808 8.86516 15.375C8.00012 15.375 8.43468 15 7.25012 15C5.94025 15 5.1259 13.9656 4.24998 13.125C3.32548 12.2378 2.75011 12.2575 2.75011 10.875C2.75011 9.49248 1.45048 8.99438 2.37498 8.10718C3.2509 7.2666 4.44011 6.75 5.74998 6.75C8.44237 6.75 10.625 8.93261 10.625 11.625Z"
                fill="#DCEBFF" />
              <path
                d="M5 7.5C5.24945 7.98245 5.64255 8.37555 6.125 8.625C5.64255 8.87445 5.24945 9.26755 5 9.75C4.75055 9.26755 4.35745 8.87445 3.875 8.625C4.35745 8.37555 4.75055 7.98245 5 7.5Z"
                fill="#1F64FF" />
              <path d="M12.081 2.25062L4.95802 13.5456" stroke="black" stroke-width="1.125" />
              <path
                d="M15.875 8.25C15.875 11.9779 12.8529 15 9.125 15C5.39708 15 2.375 11.9779 2.375 8.25C2.375 4.52208 5.39708 1.5 9.125 1.5C10.6784 1.5 12.1093 2.02475 13.25 2.90666"
                stroke="black" stroke-width="1.125" />
            </svg>
            <img :src='httpUrls.ossUrl + "static/picture/26299a3a-7097-48f2-a25d-e2936f03745e.jpg"'
              v-if="boolInput == '通用文字识别'">
            <img :src='httpUrls.ossUrl + "static/picture/bbfb6f39-9c3f-4da7-a1ce-9735c4ad7f89.jpg"'
              v-if="boolInput == '人像漫画'">
            <svg v-if="boolInput == '3D游戏风'" width="19" height="17" viewBox="0 0 19 17" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.875 2.25L16.2032 2.88479C16.4886 3.43671 16.9383 3.88641 17.4902 4.17178L18.125 4.5L17.4902 4.82822C16.9383 5.11359 16.4886 5.56329 16.2032 6.11521L15.875 6.75L15.5468 6.11521C15.2614 5.56329 14.8117 5.11359 14.2598 4.82822L13.625 4.5L14.2598 4.17178C14.8117 3.88641 15.2614 3.43671 15.5468 2.88479L15.875 2.25Z"
                fill="black" />
              <path
                d="M2.375 13.5L2.4476 13.6404C2.73297 14.1923 3.18267 14.642 3.73459 14.9274L3.875 15L3.7346 15.0726C3.18267 15.358 2.73297 15.8077 2.4476 16.3596L2.375 16.5L2.3024 16.3596C2.01703 15.8077 1.56733 15.358 1.01541 15.0726L0.875 15L1.01541 14.9274C1.56733 14.642 2.01703 14.1923 2.3024 13.6404L2.375 13.5Z"
                fill="black" />
              <path
                d="M10.625 11.625C10.625 13.1328 9.94043 14.4808 8.86516 15.375C8.00012 15.375 8.43468 15 7.25012 15C5.94025 15 5.1259 13.9656 4.24998 13.125C3.32548 12.2378 2.75011 12.2575 2.75011 10.875C2.75011 9.49248 1.45048 8.99438 2.37498 8.10718C3.2509 7.2666 4.44011 6.75 5.74998 6.75C8.44237 6.75 10.625 8.93261 10.625 11.625Z"
                fill="#DCEBFF" />
              <path
                d="M15.875 8.25C15.875 11.9779 12.8529 15 9.125 15C5.39708 15 2.375 11.9779 2.375 8.25C2.375 4.52208 5.39708 1.5 9.125 1.5C10.6784 1.5 12.1093 2.02475 13.25 2.90666"
                stroke="black" stroke-width="1.125" />
              <path
                d="M6.69725 4.336C7.18325 4.336 7.5815 4.45075 7.8785 4.687C8.16875 4.92325 8.31725 5.24725 8.31725 5.66575C8.31725 6.19225 8.04725 6.54325 7.514 6.71875C7.7975 6.8065 8.02025 6.93475 8.16875 7.11025C8.33075 7.2925 8.41175 7.52875 8.41175 7.81225C8.41175 8.25775 8.2565 8.62225 7.946 8.90575C7.622 9.196 7.19675 9.3445 6.67025 9.3445C6.17075 9.3445 5.76575 9.21625 5.462 8.95975C5.1245 8.67625 4.9355 8.25775 4.895 7.71775H5.69825C5.71175 8.02825 5.80625 8.27125 5.99525 8.44C6.164 8.59525 6.38675 8.67625 6.6635 8.67625C6.96725 8.67625 7.21025 8.5885 7.38575 8.41975C7.541 8.2645 7.622 8.0755 7.622 7.846C7.622 7.56925 7.53425 7.36675 7.37225 7.2385C7.21025 7.1035 6.974 7.04275 6.6635 7.04275H6.326V6.44875H6.6635C6.947 6.44875 7.163 6.388 7.3115 6.2665C7.45325 6.145 7.5275 5.96275 7.5275 5.7265C7.5275 5.49025 7.46 5.31475 7.33175 5.19325C7.19 5.07175 6.98075 5.011 6.704 5.011C6.4205 5.011 6.2045 5.0785 6.04925 5.22025C5.88725 5.362 5.79275 5.578 5.76575 5.86825H4.9895C5.03 5.38225 5.2055 5.00425 5.5295 4.73425C5.83325 4.46425 6.22475 4.336 6.69725 4.336ZM9.14486 4.4305H10.9066C11.6896 4.4305 12.2769 4.6465 12.6819 5.0785C13.0666 5.4835 13.2624 6.07075 13.2624 6.84025C13.2624 7.603 13.0666 8.19025 12.6819 8.602C12.2769 9.034 11.6896 9.25 10.9066 9.25H9.14486V4.4305ZM9.93461 5.1055V8.575H10.7581C11.3589 8.575 11.7976 8.43325 12.0744 8.1565C12.3444 7.873 12.4794 7.43425 12.4794 6.84025C12.4794 6.23275 12.3444 5.78725 12.0744 5.51725C11.7976 5.2405 11.3589 5.1055 10.7581 5.1055H9.93461Z"
                fill="#1F64FF" />
            </svg>
            <svg v-if="boolInput == '发型编辑'" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17"
              fill="none">
              <circle cx="7.5" cy="6.75" r="4.5" fill="#DCEBFF" />
              <path
                d="M3 16.5V9.375V8.25C3 4.93629 5.68629 2.25 9 2.25V2.25C12.3137 2.25 15 4.93629 15 8.25V9.375V12.9375V16.5"
                stroke="#1F64FF" stroke-width="1.125" />
              <path
                d="M15.75 2.25L15.8226 2.3904C16.108 2.94233 16.5577 3.39203 17.1096 3.6774L17.25 3.75L17.1096 3.8226C16.5577 4.10797 16.108 4.55767 15.8226 5.1096L15.75 5.25L15.6774 5.10959C15.392 4.55767 14.9423 4.10797 14.3904 3.8226L14.25 3.75L14.3904 3.6774C14.9423 3.39203 15.392 2.94233 15.6774 2.39041L15.75 2.25Z"
                fill="black" />
              <path
                d="M2.25 0L2.57822 0.634786C2.86359 1.18671 3.31329 1.63641 3.86521 1.92178L4.5 2.25L3.86521 2.57822C3.31329 2.86359 2.86359 3.31329 2.57822 3.86521L2.25 4.5L1.92178 3.86521C1.63641 3.31329 1.18671 2.86359 0.634786 2.57822L0 2.25L0.634787 1.92178C1.18671 1.63641 1.63641 1.18671 1.92178 0.634787L2.25 0Z"
                fill="black" />
              <path
                d="M4.875 9.75H13.125V10.875C13.125 13.1532 11.2782 15 9 15V15C6.72183 15 4.875 13.1532 4.875 10.875V9.75Z"
                stroke="black" stroke-width="1.125" />
            </svg>
            <img :src='httpUrls.ossUrl + "static/picture/11999ce7-e3ff-413a-b29f-fe871f26b041.png"'
              v-if="boolInput == '图像增强'">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none"
              v-if="boolInput == '老照片修复'" alt="">
              <rect x="10" y="1.5" width="6" height="11.25" fill="#DCEBFF" />
              <rect x="1" y="1.5" width="15" height="12" rx="1.5" stroke="black" stroke-width="1.125" />
              <rect x="6.625" y="0.75" width="3.75" height="13.5" fill="white" />
              <path d="M1.375 13.125L9.49473 6.95401C10.1776 6.43499 11.1559 6.59331 11.6403 7.30123L15.625 13.125"
                stroke="black" stroke-width="1.125" />
              <rect x="7.9375" width="1.125" height="15" fill="black" />
              <circle cx="4.375" cy="4.875" r="1.125" fill="#1F64FF" />
            </svg>
            <svg v-if="boolInput == '活体照片'" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"
              fill="none">
              <rect x="1.5" y="2" width="7.5" height="11.25" fill="#DCEBFF" />
              <rect x="1.5" y="2" width="15" height="12" rx="1.5" stroke="black" stroke-width="1.125" />
              <rect x="9" y="1.25" width="1.5" height="13.5" fill="white" />
              <path d="M1.875 13.625L6.01421 9.48579C6.37619 9.12381 6.98642 9.22284 7.21536 9.68071L9 13.25"
                stroke="black" stroke-width="1.125" />
              <rect x="8.4375" y="0.5" width="1.125" height="15" fill="black" />
              <circle cx="4.875" cy="5.375" r="1.125" fill="#1F64FF" />
              <path
                d="M11.625 9.5213V7.52119C11.625 7.23326 11.9361 7.05275 12.1861 7.1956L13.7417 8.08454C13.9792 8.22024 13.9962 8.55631 13.7736 8.71528L12.218 9.82645C11.9698 10.0037 11.625 9.82632 11.625 9.5213Z"
                stroke="#1F64FF" stroke-width="1.125" />
            </svg>
            <img v-if="boolInput == '表情编辑'"
              :src='httpUrls.ossUrl + "static/picture/42397d93-a896-418a-93f3-b7605c433314.png"' />
            <svg v-if="boolInput == '头发分割'" width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="1.25" y="7.25" width="13.5" height="7.5" fill="#DCEBFF" />
              <path d="M4.25 1.25H1.625C1.41789 1.25 1.25 1.41789 1.25 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M4.25 14.75H1.625C1.41789 14.75 1.25 14.5821 1.25 14.375V11.75" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 1.25H14.375C14.5821 1.25 14.75 1.41789 14.75 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 14.75H14.375C14.5821 14.75 14.75 14.5821 14.75 14.375V11.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" />
              <circle cx="8" cy="8" r="5.25" stroke="black" stroke-width="1.125" />
              <path d="M9.125 9.5C9.125 9.5 8.675 10.25 8 10.25C7.325 10.25 6.875 9.5 6.875 9.5" stroke="#1F64FF"
                stroke-width="0.75" stroke-linecap="round" />
            </svg>
            <svg v-if="boolInput == '图片拉伸修复'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              viewBox="0 0 16 16" fill="none">
              <path d="M2.375 14.75V12.875L6.875 8.375L9.5 10.625L14.75 4.625V14.75H2.375Z" fill="#DCEBFF" />
              <path d="M4.25 1.25H1.625C1.41789 1.25 1.25 1.41789 1.25 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M4.25 14.75H1.625C1.41789 14.75 1.25 14.5821 1.25 14.375V11.75" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 1.25H14.375C14.5821 1.25 14.75 1.41789 14.75 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 14.75H14.375C14.5821 14.75 14.75 14.5821 14.75 14.375V11.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" />
              <path d="M2.75 12.875L6.875 8.375L9.5 10.625L13.25 6.5" stroke="black" stroke-width="1.125"
                stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.375 1.625L11.75 4.25" stroke="black" stroke-width="1.125" stroke-linecap="round"
                stroke-linejoin="round" />
              <circle cx="4.625" cy="5.375" r="1.125" fill="#1F64FF" />
            </svg>
            <svg v-if="boolInput == '图片超分辨率'" xmlns="http://www.w3.org/2000/svg" width="18" height="16"
              viewBox="0 0 18 16" fill="none">
              <rect x="9" y="14" width="12" height="7.5" transform="rotate(-90 9 14)" fill="#DCEBFF" />
              <rect x="1.5" y="2" width="15" height="12" rx="1.5" stroke="black" stroke-width="1.125" />
              <path d="M2.25 13.25L10.3787 8.6555C10.672 8.48973 11.0399 8.53987 11.2781 8.7781L16.125 13.625"
                stroke="black" stroke-width="1.125" />
              <circle cx="4.875" cy="5.375" r="1.125" fill="#1F64FF" />
              <path
                d="M12.75 3.5L13.0782 4.13479C13.3636 4.68671 13.8133 5.13641 14.3652 5.42178L15 5.75L14.3652 6.07822C13.8133 6.36359 13.3636 6.81329 13.0782 7.36521L12.75 8L12.4218 7.36521C12.1364 6.81329 11.6867 6.36359 11.1348 6.07822L10.5 5.75L11.1348 5.42178C11.6867 5.13641 12.1364 4.68671 12.4218 4.13479L12.75 3.5Z"
                fill="black" />
              <path
                d="M4.875 8C5.12445 8.48245 5.51755 8.87555 6 9.125C5.51755 9.37445 5.12445 9.76755 4.875 10.25C4.62555 9.76755 4.23245 9.37445 3.75 9.125C4.23245 8.87555 4.62555 8.48245 4.875 8Z"
                fill="#1F64FF" />
            </svg>
            <svg v-if="boolInput == '图片配文'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
              fill="none">
              <rect x="1.5" y="0.75" width="9.75" height="15" rx="0.75" stroke="black" stroke-width="1.125" />
              <rect x="3.75" y="3" width="5.25" height="1.125" rx="0.5625" fill="#1F64FF" />
              <rect x="3.75" y="5.25" width="3.75" height="1.125" rx="0.5625" fill="#1F64FF" />
              <rect x="3.75" y="7.5" width="12.75" height="9.75" rx="0.75" fill="white" stroke="black"
                stroke-width="1.125" />
              <path d="M5.625 16.6875V15L8.25 12L12 14.625L15 11.25V16.6875H5.625Z" fill="#DCEBFF" />
              <path d="M5.625 15L8.25 12L12 14.625L14.625 11.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12.75" cy="9.75" r="0.75" fill="#1F64FF" />
            </svg>
            <svg v-if="boolInput == '图片方向矫正'" xmlns="http://www.w3.org/2000/svg" width="18" height="13"
              viewBox="0 0 18 13" fill="none">
              <path d="M0.75 11.625H4.13787C4.2715 11.625 4.33843 11.4634 4.24393 11.3689L2.625 9.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.25 11.625H13.8621C13.7285 11.625 13.6616 11.4634 13.7561 11.3689L15.375 9.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.125 11.25L4.125 8.25L6.75 6L10.5 8.625L13.5 5.25L13.875 8.25L11.625 11.25H10.125H7.125Z"
                fill="#DCEBFF" />
              <path
                d="M14.25 1.5H3C2.58579 1.5 2.25 1.83579 2.25 2.25V6.10027C2.25 6.27766 2.31288 6.44931 2.42746 6.58473L6.15031 10.9845C6.29281 11.1529 6.50224 11.25 6.72285 11.25H10.5272C10.7478 11.25 10.9572 11.1529 11.0997 10.9845L14.8225 6.58473C14.9371 6.44931 15 6.27766 15 6.10027V2.25C15 1.83579 14.6642 1.5 14.25 1.5Z"
                stroke="black" stroke-width="1.125" />
              <path d="M4.125 8.25L6.75 6L10.5 8.625L13.125 5.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="11.25" cy="3.75" r="0.75" fill="#1F64FF" />
            </svg>
            <div>{{ boolInput }}</div>
          </div>
          <div class="domHover" v-else @click="toPage(item)" v-for="(item, index) in whole" :key="index">
            <img :src='httpUrls.ossUrl + "static/picture/abc1ba35-b9b6-4450-96f9-bbecbb225579.jpg"'
              v-if="item == '人脸融合'">
            <img :src='httpUrls.ossUrl + "static/picture/294e872a-ae09-47d0-89c7-b1b7afcc387a.jpg"'
              v-if="item == '人像年龄变化'">
            <img :src='httpUrls.ossUrl + "static/picture/ad068d73-fdd0-46df-b611-961cfda6116f.jpg"' v-if="item == '智能变美'">
            <img :src='httpUrls.ossUrl + "static/picture/268c961d-8e31-4f01-9ae2-b4a8862b9516.png"' v-if="item == '人物抠图'">
            <svg v-if="item == '人像特效'" xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17"
              fill="none">
              <path
                d="M12.125 6.75L12.4532 7.38479C12.7386 7.93671 13.1883 8.38641 13.7402 8.67178L14.375 9L13.7402 9.32822C13.1883 9.61359 12.7386 10.0633 12.4532 10.6152L12.125 11.25L11.7968 10.6152C11.5114 10.0633 11.0617 9.61359 10.5098 9.32822L9.875 9L10.5098 8.67178C11.0617 8.38641 11.5114 7.93671 11.7968 7.38479L12.125 6.75Z"
                fill="#1F64FF" />
              <path
                d="M15.875 2.25L16.2032 2.88479C16.4886 3.43671 16.9383 3.88641 17.4902 4.17178L18.125 4.5L17.4902 4.82822C16.9383 5.11359 16.4886 5.56329 16.2032 6.11521L15.875 6.75L15.5468 6.11521C15.2614 5.56329 14.8117 5.11359 14.2598 4.82822L13.625 4.5L14.2598 4.17178C14.8117 3.88641 15.2614 3.43671 15.5468 2.88479L15.875 2.25Z"
                fill="black" />
              <path
                d="M10.625 11.625C10.625 13.1328 9.94043 14.4808 8.86516 15.375C8.00012 15.375 8.43468 15 7.25012 15C5.94025 15 5.1259 13.9656 4.24998 13.125C3.32548 12.2378 2.75011 12.2575 2.75011 10.875C2.75011 9.49248 1.45048 8.99438 2.37498 8.10718C3.2509 7.2666 4.44011 6.75 5.74998 6.75C8.44237 6.75 10.625 8.93261 10.625 11.625Z"
                fill="#DCEBFF" />
              <path
                d="M5 7.5C5.24945 7.98245 5.64255 8.37555 6.125 8.625C5.64255 8.87445 5.24945 9.26755 5 9.75C4.75055 9.26755 4.35745 8.87445 3.875 8.625C4.35745 8.37555 4.75055 7.98245 5 7.5Z"
                fill="#1F64FF" />
              <path d="M12.081 2.25062L4.95802 13.5456" stroke="black" stroke-width="1.125" />
              <path
                d="M15.875 8.25C15.875 11.9779 12.8529 15 9.125 15C5.39708 15 2.375 11.9779 2.375 8.25C2.375 4.52208 5.39708 1.5 9.125 1.5C10.6784 1.5 12.1093 2.02475 13.25 2.90666"
                stroke="black" stroke-width="1.125" />
            </svg>
            <img v-if="item == '表情编辑'"
              :src='httpUrls.ossUrl + "static/picture/42397d93-a896-418a-93f3-b7605c433314.png"' />
            <img :src='httpUrls.ossUrl + "static/picture/26299a3a-7097-48f2-a25d-e2936f03745e.jpg"'
              v-if="item == '通用文字识别'">
            <img :src='httpUrls.ossUrl + "static/picture/bbfb6f39-9c3f-4da7-a1ce-9735c4ad7f89.jpg"' v-if="item == '人像漫画'">
            <svg v-if="item == '3D游戏风'" width="19" height="17" viewBox="0 0 19 17" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.875 2.25L16.2032 2.88479C16.4886 3.43671 16.9383 3.88641 17.4902 4.17178L18.125 4.5L17.4902 4.82822C16.9383 5.11359 16.4886 5.56329 16.2032 6.11521L15.875 6.75L15.5468 6.11521C15.2614 5.56329 14.8117 5.11359 14.2598 4.82822L13.625 4.5L14.2598 4.17178C14.8117 3.88641 15.2614 3.43671 15.5468 2.88479L15.875 2.25Z"
                fill="black" />
              <path
                d="M2.375 13.5L2.4476 13.6404C2.73297 14.1923 3.18267 14.642 3.73459 14.9274L3.875 15L3.7346 15.0726C3.18267 15.358 2.73297 15.8077 2.4476 16.3596L2.375 16.5L2.3024 16.3596C2.01703 15.8077 1.56733 15.358 1.01541 15.0726L0.875 15L1.01541 14.9274C1.56733 14.642 2.01703 14.1923 2.3024 13.6404L2.375 13.5Z"
                fill="black" />
              <path
                d="M10.625 11.625C10.625 13.1328 9.94043 14.4808 8.86516 15.375C8.00012 15.375 8.43468 15 7.25012 15C5.94025 15 5.1259 13.9656 4.24998 13.125C3.32548 12.2378 2.75011 12.2575 2.75011 10.875C2.75011 9.49248 1.45048 8.99438 2.37498 8.10718C3.2509 7.2666 4.44011 6.75 5.74998 6.75C8.44237 6.75 10.625 8.93261 10.625 11.625Z"
                fill="#DCEBFF" />
              <path
                d="M15.875 8.25C15.875 11.9779 12.8529 15 9.125 15C5.39708 15 2.375 11.9779 2.375 8.25C2.375 4.52208 5.39708 1.5 9.125 1.5C10.6784 1.5 12.1093 2.02475 13.25 2.90666"
                stroke="black" stroke-width="1.125" />
              <path
                d="M6.69725 4.336C7.18325 4.336 7.5815 4.45075 7.8785 4.687C8.16875 4.92325 8.31725 5.24725 8.31725 5.66575C8.31725 6.19225 8.04725 6.54325 7.514 6.71875C7.7975 6.8065 8.02025 6.93475 8.16875 7.11025C8.33075 7.2925 8.41175 7.52875 8.41175 7.81225C8.41175 8.25775 8.2565 8.62225 7.946 8.90575C7.622 9.196 7.19675 9.3445 6.67025 9.3445C6.17075 9.3445 5.76575 9.21625 5.462 8.95975C5.1245 8.67625 4.9355 8.25775 4.895 7.71775H5.69825C5.71175 8.02825 5.80625 8.27125 5.99525 8.44C6.164 8.59525 6.38675 8.67625 6.6635 8.67625C6.96725 8.67625 7.21025 8.5885 7.38575 8.41975C7.541 8.2645 7.622 8.0755 7.622 7.846C7.622 7.56925 7.53425 7.36675 7.37225 7.2385C7.21025 7.1035 6.974 7.04275 6.6635 7.04275H6.326V6.44875H6.6635C6.947 6.44875 7.163 6.388 7.3115 6.2665C7.45325 6.145 7.5275 5.96275 7.5275 5.7265C7.5275 5.49025 7.46 5.31475 7.33175 5.19325C7.19 5.07175 6.98075 5.011 6.704 5.011C6.4205 5.011 6.2045 5.0785 6.04925 5.22025C5.88725 5.362 5.79275 5.578 5.76575 5.86825H4.9895C5.03 5.38225 5.2055 5.00425 5.5295 4.73425C5.83325 4.46425 6.22475 4.336 6.69725 4.336ZM9.14486 4.4305H10.9066C11.6896 4.4305 12.2769 4.6465 12.6819 5.0785C13.0666 5.4835 13.2624 6.07075 13.2624 6.84025C13.2624 7.603 13.0666 8.19025 12.6819 8.602C12.2769 9.034 11.6896 9.25 10.9066 9.25H9.14486V4.4305ZM9.93461 5.1055V8.575H10.7581C11.3589 8.575 11.7976 8.43325 12.0744 8.1565C12.3444 7.873 12.4794 7.43425 12.4794 6.84025C12.4794 6.23275 12.3444 5.78725 12.0744 5.51725C11.7976 5.2405 11.3589 5.1055 10.7581 5.1055H9.93461Z"
                fill="#1F64FF" />
            </svg>
            <svg v-if="item == '发型编辑'" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17"
              fill="none">
              <circle cx="7.5" cy="6.75" r="4.5" fill="#DCEBFF" />
              <path
                d="M3 16.5V9.375V8.25C3 4.93629 5.68629 2.25 9 2.25V2.25C12.3137 2.25 15 4.93629 15 8.25V9.375V12.9375V16.5"
                stroke="#1F64FF" stroke-width="1.125" />
              <path
                d="M15.75 2.25L15.8226 2.3904C16.108 2.94233 16.5577 3.39203 17.1096 3.6774L17.25 3.75L17.1096 3.8226C16.5577 4.10797 16.108 4.55767 15.8226 5.1096L15.75 5.25L15.6774 5.10959C15.392 4.55767 14.9423 4.10797 14.3904 3.8226L14.25 3.75L14.3904 3.6774C14.9423 3.39203 15.392 2.94233 15.6774 2.39041L15.75 2.25Z"
                fill="black" />
              <path
                d="M2.25 0L2.57822 0.634786C2.86359 1.18671 3.31329 1.63641 3.86521 1.92178L4.5 2.25L3.86521 2.57822C3.31329 2.86359 2.86359 3.31329 2.57822 3.86521L2.25 4.5L1.92178 3.86521C1.63641 3.31329 1.18671 2.86359 0.634786 2.57822L0 2.25L0.634787 1.92178C1.18671 1.63641 1.63641 1.18671 1.92178 0.634787L2.25 0Z"
                fill="black" />
              <path
                d="M4.875 9.75H13.125V10.875C13.125 13.1532 11.2782 15 9 15V15C6.72183 15 4.875 13.1532 4.875 10.875V9.75Z"
                stroke="black" stroke-width="1.125" />
            </svg>
            <img :src='httpUrls.ossUrl + "static/picture/11999ce7-e3ff-413a-b29f-fe871f26b041.png"' v-if="item == '图像增强'">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none"
              v-if="item == '老照片修复'" alt="">
              <rect x="10" y="1.5" width="6" height="11.25" fill="#DCEBFF" />
              <rect x="1" y="1.5" width="15" height="12" rx="1.5" stroke="black" stroke-width="1.125" />
              <rect x="6.625" y="0.75" width="3.75" height="13.5" fill="white" />
              <path d="M1.375 13.125L9.49473 6.95401C10.1776 6.43499 11.1559 6.59331 11.6403 7.30123L15.625 13.125"
                stroke="black" stroke-width="1.125" />
              <rect x="7.9375" width="1.125" height="15" fill="black" />
              <circle cx="4.375" cy="4.875" r="1.125" fill="#1F64FF" />
            </svg>
            <svg v-if="item == '活体照片'" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"
              fill="none">
              <rect x="1.5" y="2" width="7.5" height="11.25" fill="#DCEBFF" />
              <rect x="1.5" y="2" width="15" height="12" rx="1.5" stroke="black" stroke-width="1.125" />
              <rect x="9" y="1.25" width="1.5" height="13.5" fill="white" />
              <path d="M1.875 13.625L6.01421 9.48579C6.37619 9.12381 6.98642 9.22284 7.21536 9.68071L9 13.25"
                stroke="black" stroke-width="1.125" />
              <rect x="8.4375" y="0.5" width="1.125" height="15" fill="black" />
              <circle cx="4.875" cy="5.375" r="1.125" fill="#1F64FF" />
              <path
                d="M11.625 9.5213V7.52119C11.625 7.23326 11.9361 7.05275 12.1861 7.1956L13.7417 8.08454C13.9792 8.22024 13.9962 8.55631 13.7736 8.71528L12.218 9.82645C11.9698 10.0037 11.625 9.82632 11.625 9.5213Z"
                stroke="#1F64FF" stroke-width="1.125" />
            </svg>
            <svg v-if="item == '头发分割'" width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="1.25" y="7.25" width="13.5" height="7.5" fill="#DCEBFF" />
              <path d="M4.25 1.25H1.625C1.41789 1.25 1.25 1.41789 1.25 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M4.25 14.75H1.625C1.41789 14.75 1.25 14.5821 1.25 14.375V11.75" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 1.25H14.375C14.5821 1.25 14.75 1.41789 14.75 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 14.75H14.375C14.5821 14.75 14.75 14.5821 14.75 14.375V11.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" />
              <circle cx="8" cy="8" r="5.25" stroke="black" stroke-width="1.125" />
              <path d="M9.125 9.5C9.125 9.5 8.675 10.25 8 10.25C7.325 10.25 6.875 9.5 6.875 9.5" stroke="#1F64FF"
                stroke-width="0.75" stroke-linecap="round" />
            </svg>
            <svg v-if="item == '图片拉伸修复'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
              fill="none">
              <path d="M2.375 14.75V12.875L6.875 8.375L9.5 10.625L14.75 4.625V14.75H2.375Z" fill="#DCEBFF" />
              <path d="M4.25 1.25H1.625C1.41789 1.25 1.25 1.41789 1.25 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M4.25 14.75H1.625C1.41789 14.75 1.25 14.5821 1.25 14.375V11.75" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 1.25H14.375C14.5821 1.25 14.75 1.41789 14.75 1.625V4.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" />
              <path d="M11.75 14.75H14.375C14.5821 14.75 14.75 14.5821 14.75 14.375V11.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" />
              <path d="M2.75 12.875L6.875 8.375L9.5 10.625L13.25 6.5" stroke="black" stroke-width="1.125"
                stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.375 1.625L11.75 4.25" stroke="black" stroke-width="1.125" stroke-linecap="round"
                stroke-linejoin="round" />
              <circle cx="4.625" cy="5.375" r="1.125" fill="#1F64FF" />
            </svg>
            <svg v-if="item == '图片超分辨率'" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"
              fill="none">
              <rect x="9" y="14" width="12" height="7.5" transform="rotate(-90 9 14)" fill="#DCEBFF" />
              <rect x="1.5" y="2" width="15" height="12" rx="1.5" stroke="black" stroke-width="1.125" />
              <path d="M2.25 13.25L10.3787 8.6555C10.672 8.48973 11.0399 8.53987 11.2781 8.7781L16.125 13.625"
                stroke="black" stroke-width="1.125" />
              <circle cx="4.875" cy="5.375" r="1.125" fill="#1F64FF" />
              <path
                d="M12.75 3.5L13.0782 4.13479C13.3636 4.68671 13.8133 5.13641 14.3652 5.42178L15 5.75L14.3652 6.07822C13.8133 6.36359 13.3636 6.81329 13.0782 7.36521L12.75 8L12.4218 7.36521C12.1364 6.81329 11.6867 6.36359 11.1348 6.07822L10.5 5.75L11.1348 5.42178C11.6867 5.13641 12.1364 4.68671 12.4218 4.13479L12.75 3.5Z"
                fill="black" />
              <path
                d="M4.875 8C5.12445 8.48245 5.51755 8.87555 6 9.125C5.51755 9.37445 5.12445 9.76755 4.875 10.25C4.62555 9.76755 4.23245 9.37445 3.75 9.125C4.23245 8.87555 4.62555 8.48245 4.875 8Z"
                fill="#1F64FF" />
            </svg>
            <svg v-if="item == '图片配文'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
              fill="none">
              <rect x="1.5" y="0.75" width="9.75" height="15" rx="0.75" stroke="black" stroke-width="1.125" />
              <rect x="3.75" y="3" width="5.25" height="1.125" rx="0.5625" fill="#1F64FF" />
              <rect x="3.75" y="5.25" width="3.75" height="1.125" rx="0.5625" fill="#1F64FF" />
              <rect x="3.75" y="7.5" width="12.75" height="9.75" rx="0.75" fill="white" stroke="black"
                stroke-width="1.125" />
              <path d="M5.625 16.6875V15L8.25 12L12 14.625L15 11.25V16.6875H5.625Z" fill="#DCEBFF" />
              <path d="M5.625 15L8.25 12L12 14.625L14.625 11.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12.75" cy="9.75" r="0.75" fill="#1F64FF" />
            </svg>
            <svg v-if="item == '图片方向矫正'" xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13"
              fill="none">
              <path d="M0.75 11.625H4.13787C4.2715 11.625 4.33843 11.4634 4.24393 11.3689L2.625 9.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.25 11.625H13.8621C13.7285 11.625 13.6616 11.4634 13.7561 11.3689L15.375 9.75" stroke="black"
                stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.125 11.25L4.125 8.25L6.75 6L10.5 8.625L13.5 5.25L13.875 8.25L11.625 11.25H10.125H7.125Z"
                fill="#DCEBFF" />
              <path
                d="M14.25 1.5H3C2.58579 1.5 2.25 1.83579 2.25 2.25V6.10027C2.25 6.27766 2.31288 6.44931 2.42746 6.58473L6.15031 10.9845C6.29281 11.1529 6.50224 11.25 6.72285 11.25H10.5272C10.7478 11.25 10.9572 11.1529 11.0997 10.9845L14.8225 6.58473C14.9371 6.44931 15 6.27766 15 6.10027V2.25C15 1.83579 14.6642 1.5 14.25 1.5Z"
                stroke="black" stroke-width="1.125" />
              <path d="M4.125 8.25L6.75 6L10.5 8.625L13.125 5.25" stroke="black" stroke-width="1.125"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="11.25" cy="3.75" r="0.75" fill="#1F64FF" />
            </svg>
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import httpUrls from '../../api/requestURL'
export default {
  name: "visionNav",
  data() {
    return {
      httpUrls,
      input: '',
      hotData: ["智能变美", "人像年龄变化", "人物抠图", "人像特效", "通用文字识别", "人像漫画", "图像增强", "老照片修复"],
      whole: ["人脸融合", "人像年龄变化", "智能变美", "人物抠图", "人像特效", "表情编辑", "通用文字识别", "人像漫画", "3D游戏风", "发型编辑", "图像增强", "老照片修复", "活体照片", "头发分割", "图片拉伸修复", "图片超分辨率", "图片配文", "图片方向矫正",],
      title: 'whole',
      bool: false,   //判断隐藏状态
      boolInput: "a",   //显示某个功能
    }
  },
  watch: {
    input: {
      deep: true,
      handler() {
        if (this.input == '') {
          this.bool = false;
        }
      }
    },
  },
  methods: {
    toPage(title) {
      if (title != '老照片修复' && title != '活体照片' && title != '图片拉伸修复' && title != '头发分割' && title != '图片超分辨率' && title != '图片方向矫正') {
        this.$router.push(`/vision/vision?title=${title}`)
      } else {
        this.$message('正在开发中...');
      }
    },
    handleSearch() {
      if (this.input == '') {
        this.$message('请输入你想要查找的功能')
        return
      };
      let index = this.whole.findIndex(item => item == this.input);
      if (index == -1) {
        this.$message.error('未查找到该功能');
        return
      }
      this.title = 'whole';
      this.bool = true;
      this.boolInput = this.input;
      console.log(this.input)
    }
  },
}
</script>

<style scoped>
.el-icon-present {
  /* background: red; */
  font-size: 25px;
}

.go-back {
  cursor: pointer;
  position: relative;
  left: 0px;
  top: 10px;
}

.go_back-item-on {
  display: flex;
  transition: all .2s;
}

main {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

nav {
  /* position:relative;
  top: 100px; */
  margin-top: 50px;
  display: flex;
}

.nav-left {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.nav-left img {
  margin-right: 15px
}

.nav-left>div div:first-child {
  font-size: 20px;
  font-weight: 600px;
}

.nav-left>div div:last-child {
  font-size: 14px;
  line-height: 30px;
}

.nav-right {
  display: flex;
  align-items: center;
}

section {
  margin-top: 40px;
}

.section-top {
  display: flex;
  font-size: 23px;
  margin-bottom: 20px;
}

.section-top span:first-child {
  margin-right: 20px;
}

.section-top span:hover {
  cursor: pointer;
}

.section-main>div {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}

.section-main img {
  width: 18px;
  height: 18px;
}

.hot {
  width: 620px;
}

.hot>div {
  margin-right: 15px;
  display: flex;
  align-items: center;
  width: 140px;
  height: 70px;
  margin-bottom: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 7px;
}

.hot>div div {
  margin-left: 7px;
}

.whole {
  width: 920px;
}

.whole>div {
  margin-right: 15px;
  display: flex;
  align-items: center;
  width: 140px;
  height: 70px;
  background: white;
  margin-bottom: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 7px;
}

.whole>div div {
  margin-left: 7px;
}

.domHover {
  cursor: pointer;
}</style>