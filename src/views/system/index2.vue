<template>
  <div class="indexInd">
    <div class="ai-teacher">
      <img
        class="img-bg"
        :src="
          httpUrls.ossUrl +
          'static/picture/c3e38506-c82e-4a79-b380-0df653dd3915.png'
        "
        alt=""
      />
      <div style="width: 100%">
        <div class="teacher-my" v-if="userInfo.role == 'user'">
          <img
            :src="
              httpUrls.ossUrl +
              'static/picture/04292683-6683-407f-898c-843d9cbf7854.png'
            "
            alt=""
          />
          <div class="my-title">遇事不决问自己</div>
          <div class="my-box">
            <div>
              <img
                v-if="!userPhoto"
                class="image me_photo"
                style="width: 50px; height: 50px"
                src="../../assets/images/default_ai_icon.png"
                alt=""
              />
              <img
                v-else
                class="image me_photo"
                :src="httpUrls.ossUrl + userPhoto"
                alt=""
              />
              <span v-if="!userPhoto">我</span>
              <span v-else>{{ mentorOrMe[0].me.name }}</span>
            </div>
            <div>
              <div @click="toMeChat()">问自己</div>
              <div @click.self="editMeItem(mentorOrMe)">编辑资料</div>
              <div>*补充完善资料，我将成为您的孪生数字人</div>
            </div>
          </div>
        </div>
        <div class="teacher-box">
          <!-- 标题 -->
          <div class="box-title">
            <div>AI导师助你成功</div>
            <div @click="$router.push('/mengerMentor')">管理导师 ></div>
          </div>
          <!-- 导师盒子 -->
          <div class="box-content">
            <div
              class="box-center"
              v-for="(item, i) in mentorRecommend"
              :key="i"
            >
              <img
                :src="httpUrls.ossUrl + item.avatar"
                alt=""
                @click="toMentorChat(item)"
              />
              <span>{{ item.character_name }}</span>
              <div class="edit_btn" @click.stop="addMentor(item)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14 6.33398H2"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 2.33398L14 6.33398"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.26562 9.66602H14.2656"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.26562 9.66602L6.26564 13.666"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="index_top-title" style="z-index: 1">
      <div class="bg-box"></div>
      <img
        src="../../assets/images/index-content-bg.png"
        alt=""
        class="index-img"
      />

      <div class="top-left">
        <div>
          <div class="left_title">您想要AI帮你做什么？</div>
          <div class="left_content">
            {{ httpUrls.name }}一站式AIGC智能创作平台，释放无尽可能
          </div>
        </div>
      </div>

      <div class="top-right">
        <div class="item" @click="$router.push('chat/Chat')">
          <div class="titles">
            <div class="type">AI聊天</div>
            <img class="img" src="../../assets/images/indexIcon1.png" alt="" />
          </div>
          <div class="conts">有问题尽管问我，我来帮你解答</div>
        </div>
        <div class="item" @click="$router.push('drawChat/drawChat')">
          <div class="titles">
            <div class="type">AI绘画</div>
            <img
              class="img"
              :src="
                httpUrls.ossUrl +
                'static/picture/8745c558-7c27-427e-9a5d-7fc350f6505e.png'
              "
              alt=""
            />
          </div>
          <div class="conts">关键字生图，图生图</div>
        </div>
        <div
          class="item"
          @click="$router.push('/templateSelect/templateSelect')"
        >
          <div class="titles">
            <div class="type">助理中心</div>
            <img class="img" src="../../assets/images/indexIcon3.png" alt="" />
          </div>
          <div class="conts">人物互动/效率工具/娱乐生活/学习提升/工作助理</div>
        </div>
        <div
          class="item"
          @click="$router.push('/chataboratory/laboratoryDrawChat?value=9')"
        >
          <div class="titles">
            <div class="type">AI实验室</div>
            <img
              class="img"
              :src="
                httpUrls.ossUrl +
                'static/picture/14220f77-b514-42ba-9209-0617342a417d.png'
              "
              alt=""
            />
          </div>
          <div class="conts">AI35/AI40/midjourney等最新最强 产品等你来体验</div>
        </div>
        <div class="item" @click="$router.push('/visionNav/visionNav')">
          <div class="titles">
            <div class="type">AI视觉馆</div>
            <img
              class="img"
              :src="
                httpUrls.ossUrl +
                'static/picture/becb53a9-2dad-422d-a3cd-c7473043c05d.png'
              "
              alt=""
            />
          </div>
          <div class="conts">视频人脸融合/人物年龄变化等产品应有尽有</div>
        </div>
        <!-- <div class="item" @click="$router.push('/convert/index')">
          <div class="titles">
            <div class="type">音视频转写</div>
            <img class="img" src="../../assets/images/indexIcon4.png" alt="">
            <img class="right_img" src="../../assets/images/indexIcon5.png" alt="">
          </div>
          <div class="conts">录音备忘/本地文件转写</div>
        </div> -->
        <div class="item" @click="$router.push('/information/information')">
          <div class="titles">
            <div class="type">AI资讯</div>
            <img
              class="img"
              :src="
                httpUrls.ossUrl +
                'static/picture/25eccbdb-e213-4825-9f0d-8586f25aa2ba.png'
              "
              alt=""
            />
          </div>
          <div class="conts">最新精选的AI资讯尽在这里</div>
        </div>
        <div class="item" @click="$router.push('/manyModelChat/chat')">
          <div class="titles">
            <div class="type">多模型对话</div>
            <img
              class="img"
              :src="
                httpUrls.ossUrl +
                'static/picture/3c34ed7b-d508-46b3-a432-465ec38b4398.png'
              "
              alt=""
            />
          </div>
          <div class="conts">发布话题，沉浸式体验群聊场景</div>
        </div>
      </div>
    </div>

    <div class="index-content">
      <div class="recently">
        <div class="title_mask">
          <span class="title">最近打开</span>
          <span
            v-if="
              recentlyUseingList.length != 0 && recentlyUseingList.length <= 7
            "
            class="more"
            @click="showRecendly"
            >查看更多</span
          >
          <span v-else class="more" @click="hideRecently">收起</span>
        </div>
        <div class="list_mask" style="display: flex; flex-wrap: wrap">
          <div
            v-if="recentlyUseingList.length == 0"
            style="width: 100%; display: flex; justify-content: center"
          >
            <el-empty description="暂无数据" :image-size="88"></el-empty>
          </div>

          <div
            class="item"
            v-for="(item, i) in recentlyUseingList"
            @click="toPage(item)"
            :key="i"
          >
            <img
              v-if="
                item.type_code != 'real_time' &&
                item.type_code != 'real_file' &&
                item.image_url != '' &&
                item.image_url != undefined
              "
              class="imgs"
              :src="httpUrls.ossUrl + item.image_url"
              alt=""
            />
            <img
              v-else-if="item.type_code == 'chat'"
              class="imgs"
              src="../../assets/images/Frame427319895.png"
              alt=""
            />
            <img
              v-else-if="
                item.type_code == 'celebrity' || item.type_code == 'assistant'
              "
              class="imgs"
              src="../../assets/images/Frame427319897.png"
              alt=""
            />
            <img
              v-else-if="
                item.type_code == 'real_time' || item.type_code == 'real_file'
              "
              class="imgs"
              src="../../assets/images/Frame427319896.png"
              alt=""
            />
            <img
              v-else-if="item.type_code == 'cdu'"
              class="imgs"
              src="../../assets/images/frame2132323.png"
              alt=""
            />
            <div class="name">{{ item.name }}</div>
            <div class="titles">{{ item.title }}</div>
            <div class="time">{{ item.create_time }}</div>
          </div>
        </div>
      </div>

      <div class="column" v-for="(item, index) in columnData" :key="index">
        <!-- 标题 -->
        <div class="title_mask">
          <span class="title">{{ item.title }}</span>
          <span
            class="more"
            v-if="item.title == 'AI视觉馆'"
            @click="handleMonyVision(item.title)"
            >{{ visionMany }}</span
          >
        </div>
        <div class="vision">
          <!-- 子盒子 -->
          <div
            class="column-box"
            v-for="(child, i) in item.arr"
            @click="toPageTwo(item, child)"
            :key="i"
          >
            <div>
              <div style="position: relative">
                <!-- <img :src="child.url" :alt="child.title"> -->
                <img
                  :src="httpUrls.ossUrl + child.url"
                  style="width: 30px; height: 30px"
                  v-if="item.title == 'AI对话' && i == 4"
                  alt=""
                />
                <img
                  src="../../assets/img/logo3.png"
                  v-if="item.title == 'AI对话' && i == 0"
                  alt=""
                />
                <img
                  src="../../assets/img/讯飞星火认知大模型-AI大语言模型-星火大模型-科大讯飞1.png"
                  v-if="item.title == 'AI对话' && i == 1"
                  alt=""
                />
                <img
                  :src="httpUrls.ossUrl + child.url"
                  v-if="item.title == 'AI对话' && i == 3"
                  alt=""
                />
                <img
                  src="../../assets/img/通义1.png"
                  v-if="item.title == 'AI对话' && i == 2"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/85793da8-3fd1-420f-8a94-0b03b4e1989b.jpg'
                  "
                  v-if="item.title == 'AI绘画' && i == 0"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/5e052261-6ace-48c1-8c2a-3c6422207a3d.png'
                  "
                  v-if="item.title == 'AI绘画' && i == 1"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/90b3a7b1-1b0e-401b-bc2a-f71b56feb937.jpg'
                  "
                  v-if="item.title == 'AI绘画' && i == 2"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/abc1ba35-b9b6-4450-96f9-bbecbb225579.jpg'
                  "
                  v-if="item.title == 'AI视觉馆' && i == 0"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/294e872a-ae09-47d0-89c7-b1b7afcc387a.jpg'
                  "
                  v-if="item.title == 'AI视觉馆' && i == 1"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/26299a3a-7097-48f2-a25d-e2936f03745e.jpg'
                  "
                  v-if="item.title == 'AI视觉馆' && i == 2"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/bbfb6f39-9c3f-4da7-a1ce-9735c4ad7f89.jpg'
                  "
                  v-if="item.title == 'AI视觉馆' && i == 3"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/ad068d73-fdd0-46df-b611-961cfda6116f.jpg'
                  "
                  v-if="item.title == 'AI视觉馆' && i == 4"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/268c961d-8e31-4f01-9ae2-b4a8862b9516.png'
                  "
                  v-if="item.title == 'AI视觉馆' && i == 5"
                  alt=""
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  v-if="item.title == 'AI视觉馆' && i == 6"
                  alt=""
                >
                  <rect
                    x="10"
                    y="1.5"
                    width="6"
                    height="11.25"
                    fill="#DCEBFF"
                  />
                  <rect
                    x="1"
                    y="1.5"
                    width="15"
                    height="12"
                    rx="1.5"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <rect
                    x="6.625"
                    y="0.75"
                    width="3.75"
                    height="13.5"
                    fill="white"
                  />
                  <path
                    d="M1.375 13.125L9.49473 6.95401C10.1776 6.43499 11.1559 6.59331 11.6403 7.30123L15.625 13.125"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <rect x="7.9375" width="1.125" height="15" fill="black" />
                  <circle cx="4.375" cy="4.875" r="1.125" fill="#1F64FF" />
                </svg>
                <img
                  v-if="item.title == 'AI视觉馆' && i == 7"
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/11999ce7-e3ff-413a-b29f-fe871f26b041.png'
                  "
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  v-if="item.title == 'AI视觉馆' && i == 8"
                >
                  <path
                    d="M12.125 6.75L12.4532 7.38479C12.7386 7.93671 13.1883 8.38641 13.7402 8.67178L14.375 9L13.7402 9.32822C13.1883 9.61359 12.7386 10.0633 12.4532 10.6152L12.125 11.25L11.7968 10.6152C11.5114 10.0633 11.0617 9.61359 10.5098 9.32822L9.875 9L10.5098 8.67178C11.0617 8.38641 11.5114 7.93671 11.7968 7.38479L12.125 6.75Z"
                    fill="#1F64FF"
                  />
                  <path
                    d="M15.875 2.25L16.2032 2.88479C16.4886 3.43671 16.9383 3.88641 17.4902 4.17178L18.125 4.5L17.4902 4.82822C16.9383 5.11359 16.4886 5.56329 16.2032 6.11521L15.875 6.75L15.5468 6.11521C15.2614 5.56329 14.8117 5.11359 14.2598 4.82822L13.625 4.5L14.2598 4.17178C14.8117 3.88641 15.2614 3.43671 15.5468 2.88479L15.875 2.25Z"
                    fill="black"
                  />
                  <path
                    d="M10.625 11.625C10.625 13.1328 9.94043 14.4808 8.86516 15.375C8.00012 15.375 8.43468 15 7.25012 15C5.94025 15 5.1259 13.9656 4.24998 13.125C3.32548 12.2378 2.75011 12.2575 2.75011 10.875C2.75011 9.49248 1.45048 8.99438 2.37498 8.10718C3.2509 7.2666 4.44011 6.75 5.74998 6.75C8.44237 6.75 10.625 8.93261 10.625 11.625Z"
                    fill="#DCEBFF"
                  />
                  <path
                    d="M5 7.5C5.24945 7.98245 5.64255 8.37555 6.125 8.625C5.64255 8.87445 5.24945 9.26755 5 9.75C4.75055 9.26755 4.35745 8.87445 3.875 8.625C4.35745 8.37555 4.75055 7.98245 5 7.5Z"
                    fill="#1F64FF"
                  />
                  <path
                    d="M12.081 2.25062L4.95802 13.5456"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <path
                    d="M15.875 8.25C15.875 11.9779 12.8529 15 9.125 15C5.39708 15 2.375 11.9779 2.375 8.25C2.375 4.52208 5.39708 1.5 9.125 1.5C10.6784 1.5 12.1093 2.02475 13.25 2.90666"
                    stroke="black"
                    stroke-width="1.125"
                  />
                </svg>
                <img
                  v-if="item.title == 'AI视觉馆' && i == 9"
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/42397d93-a896-418a-93f3-b7605c433314.png'
                  "
                />
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <circle cx="7.5" cy="6.75" r="4.5" fill="#DCEBFF" />
                  <path
                    d="M3 16.5V9.375V8.25C3 4.93629 5.68629 2.25 9 2.25V2.25C12.3137 2.25 15 4.93629 15 8.25V9.375V12.9375V16.5"
                    stroke="#1F64FF"
                    stroke-width="1.125"
                  />
                  <path
                    d="M15.75 2.25L15.8226 2.3904C16.108 2.94233 16.5577 3.39203 17.1096 3.6774L17.25 3.75L17.1096 3.8226C16.5577 4.10797 16.108 4.55767 15.8226 5.1096L15.75 5.25L15.6774 5.10959C15.392 4.55767 14.9423 4.10797 14.3904 3.8226L14.25 3.75L14.3904 3.6774C14.9423 3.39203 15.392 2.94233 15.6774 2.39041L15.75 2.25Z"
                    fill="black"
                  />
                  <path
                    d="M2.25 0L2.57822 0.634786C2.86359 1.18671 3.31329 1.63641 3.86521 1.92178L4.5 2.25L3.86521 2.57822C3.31329 2.86359 2.86359 3.31329 2.57822 3.86521L2.25 4.5L1.92178 3.86521C1.63641 3.31329 1.18671 2.86359 0.634786 2.57822L0 2.25L0.634787 1.92178C1.18671 1.63641 1.63641 1.18671 1.92178 0.634787L2.25 0Z"
                    fill="black"
                  />
                  <path
                    d="M4.875 9.75H13.125V10.875C13.125 13.1532 11.2782 15 9 15V15C6.72183 15 4.875 13.1532 4.875 10.875V9.75Z"
                    stroke="black"
                    stroke-width="1.125"
                  />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 11"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.875 2.25L16.2032 2.88479C16.4886 3.43671 16.9383 3.88641 17.4902 4.17178L18.125 4.5L17.4902 4.82822C16.9383 5.11359 16.4886 5.56329 16.2032 6.11521L15.875 6.75L15.5468 6.11521C15.2614 5.56329 14.8117 5.11359 14.2598 4.82822L13.625 4.5L14.2598 4.17178C14.8117 3.88641 15.2614 3.43671 15.5468 2.88479L15.875 2.25Z"
                    fill="black"
                  />
                  <path
                    d="M2.375 13.5L2.4476 13.6404C2.73297 14.1923 3.18267 14.642 3.73459 14.9274L3.875 15L3.7346 15.0726C3.18267 15.358 2.73297 15.8077 2.4476 16.3596L2.375 16.5L2.3024 16.3596C2.01703 15.8077 1.56733 15.358 1.01541 15.0726L0.875 15L1.01541 14.9274C1.56733 14.642 2.01703 14.1923 2.3024 13.6404L2.375 13.5Z"
                    fill="black"
                  />
                  <path
                    d="M10.625 11.625C10.625 13.1328 9.94043 14.4808 8.86516 15.375C8.00012 15.375 8.43468 15 7.25012 15C5.94025 15 5.1259 13.9656 4.24998 13.125C3.32548 12.2378 2.75011 12.2575 2.75011 10.875C2.75011 9.49248 1.45048 8.99438 2.37498 8.10718C3.2509 7.2666 4.44011 6.75 5.74998 6.75C8.44237 6.75 10.625 8.93261 10.625 11.625Z"
                    fill="#DCEBFF"
                  />
                  <path
                    d="M15.875 8.25C15.875 11.9779 12.8529 15 9.125 15C5.39708 15 2.375 11.9779 2.375 8.25C2.375 4.52208 5.39708 1.5 9.125 1.5C10.6784 1.5 12.1093 2.02475 13.25 2.90666"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <path
                    d="M6.69725 4.336C7.18325 4.336 7.5815 4.45075 7.8785 4.687C8.16875 4.92325 8.31725 5.24725 8.31725 5.66575C8.31725 6.19225 8.04725 6.54325 7.514 6.71875C7.7975 6.8065 8.02025 6.93475 8.16875 7.11025C8.33075 7.2925 8.41175 7.52875 8.41175 7.81225C8.41175 8.25775 8.2565 8.62225 7.946 8.90575C7.622 9.196 7.19675 9.3445 6.67025 9.3445C6.17075 9.3445 5.76575 9.21625 5.462 8.95975C5.1245 8.67625 4.9355 8.25775 4.895 7.71775H5.69825C5.71175 8.02825 5.80625 8.27125 5.99525 8.44C6.164 8.59525 6.38675 8.67625 6.6635 8.67625C6.96725 8.67625 7.21025 8.5885 7.38575 8.41975C7.541 8.2645 7.622 8.0755 7.622 7.846C7.622 7.56925 7.53425 7.36675 7.37225 7.2385C7.21025 7.1035 6.974 7.04275 6.6635 7.04275H6.326V6.44875H6.6635C6.947 6.44875 7.163 6.388 7.3115 6.2665C7.45325 6.145 7.5275 5.96275 7.5275 5.7265C7.5275 5.49025 7.46 5.31475 7.33175 5.19325C7.19 5.07175 6.98075 5.011 6.704 5.011C6.4205 5.011 6.2045 5.0785 6.04925 5.22025C5.88725 5.362 5.79275 5.578 5.76575 5.86825H4.9895C5.03 5.38225 5.2055 5.00425 5.5295 4.73425C5.83325 4.46425 6.22475 4.336 6.69725 4.336ZM9.14486 4.4305H10.9066C11.6896 4.4305 12.2769 4.6465 12.6819 5.0785C13.0666 5.4835 13.2624 6.07075 13.2624 6.84025C13.2624 7.603 13.0666 8.19025 12.6819 8.602C12.2769 9.034 11.6896 9.25 10.9066 9.25H9.14486V4.4305ZM9.93461 5.1055V8.575H10.7581C11.3589 8.575 11.7976 8.43325 12.0744 8.1565C12.3444 7.873 12.4794 7.43425 12.4794 6.84025C12.4794 6.23275 12.3444 5.78725 12.0744 5.51725C11.7976 5.2405 11.3589 5.1055 10.7581 5.1055H9.93461Z"
                    fill="#1F64FF"
                  />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 12"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                >
                  <rect
                    x="1.5"
                    y="2"
                    width="7.5"
                    height="11.25"
                    fill="#DCEBFF"
                  />
                  <rect
                    x="1.5"
                    y="2"
                    width="15"
                    height="12"
                    rx="1.5"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <rect x="9" y="1.25" width="1.5" height="13.5" fill="white" />
                  <path
                    d="M1.875 13.625L6.01421 9.48579C6.37619 9.12381 6.98642 9.22284 7.21536 9.68071L9 13.25"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <rect
                    x="8.4375"
                    y="0.5"
                    width="1.125"
                    height="15"
                    fill="black"
                  />
                  <circle cx="4.875" cy="5.375" r="1.125" fill="#1F64FF" />
                  <path
                    d="M11.625 9.5213V7.52119C11.625 7.23326 11.9361 7.05275 12.1861 7.1956L13.7417 8.08454C13.9792 8.22024 13.9962 8.55631 13.7736 8.71528L12.218 9.82645C11.9698 10.0037 11.625 9.82632 11.625 9.5213Z"
                    stroke="#1F64FF"
                    stroke-width="1.125"
                  />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 13"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.25"
                    y="7.25"
                    width="13.5"
                    height="7.5"
                    fill="#DCEBFF"
                  />
                  <path
                    d="M4.25 1.25H1.625C1.41789 1.25 1.25 1.41789 1.25 1.625V4.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.25 14.75H1.625C1.41789 14.75 1.25 14.5821 1.25 14.375V11.75"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11.75 1.25H14.375C14.5821 1.25 14.75 1.41789 14.75 1.625V4.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11.75 14.75H14.375C14.5821 14.75 14.75 14.5821 14.75 14.375V11.75"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="5.25"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <path
                    d="M9.125 9.5C9.125 9.5 8.675 10.25 8 10.25C7.325 10.25 6.875 9.5 6.875 9.5"
                    stroke="#1F64FF"
                    stroke-width="0.75"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 14"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.375 14.75V12.875L6.875 8.375L9.5 10.625L14.75 4.625V14.75H2.375Z"
                    fill="#DCEBFF"
                  />
                  <path
                    d="M4.25 1.25H1.625C1.41789 1.25 1.25 1.41789 1.25 1.625V4.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.25 14.75H1.625C1.41789 14.75 1.25 14.5821 1.25 14.375V11.75"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11.75 1.25H14.375C14.5821 1.25 14.75 1.41789 14.75 1.625V4.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11.75 14.75H14.375C14.5821 14.75 14.75 14.5821 14.75 14.375V11.75"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2.75 12.875L6.875 8.375L9.5 10.625L13.25 6.5"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.375 1.625L11.75 4.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle cx="4.625" cy="5.375" r="1.125" fill="#1F64FF" />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 15"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <rect
                    x="1.5"
                    y="0.75"
                    width="9.75"
                    height="15"
                    rx="0.75"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <rect
                    x="3.75"
                    y="3"
                    width="5.25"
                    height="1.125"
                    rx="0.5625"
                    fill="#1F64FF"
                  />
                  <rect
                    x="3.75"
                    y="5.25"
                    width="3.75"
                    height="1.125"
                    rx="0.5625"
                    fill="#1F64FF"
                  />
                  <rect
                    x="3.75"
                    y="7.5"
                    width="12.75"
                    height="9.75"
                    rx="0.75"
                    fill="white"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <path
                    d="M5.625 16.6875V15L8.25 12L12 14.625L15 11.25V16.6875H5.625Z"
                    fill="#DCEBFF"
                  />
                  <path
                    d="M5.625 15L8.25 12L12 14.625L14.625 11.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle cx="12.75" cy="9.75" r="0.75" fill="#1F64FF" />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 16"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                >
                  <rect
                    x="9"
                    y="14"
                    width="12"
                    height="7.5"
                    transform="rotate(-90 9 14)"
                    fill="#DCEBFF"
                  />
                  <rect
                    x="1.5"
                    y="2"
                    width="15"
                    height="12"
                    rx="1.5"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <path
                    d="M2.25 13.25L10.3787 8.6555C10.672 8.48973 11.0399 8.53987 11.2781 8.7781L16.125 13.625"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <circle cx="4.875" cy="5.375" r="1.125" fill="#1F64FF" />
                  <path
                    d="M12.75 3.5L13.0782 4.13479C13.3636 4.68671 13.8133 5.13641 14.3652 5.42178L15 5.75L14.3652 6.07822C13.8133 6.36359 13.3636 6.81329 13.0782 7.36521L12.75 8L12.4218 7.36521C12.1364 6.81329 11.6867 6.36359 11.1348 6.07822L10.5 5.75L11.1348 5.42178C11.6867 5.13641 12.1364 4.68671 12.4218 4.13479L12.75 3.5Z"
                    fill="black"
                  />
                  <path
                    d="M4.875 8C5.12445 8.48245 5.51755 8.87555 6 9.125C5.51755 9.37445 5.12445 9.76755 4.875 10.25C4.62555 9.76755 4.23245 9.37445 3.75 9.125C4.23245 8.87555 4.62555 8.48245 4.875 8Z"
                    fill="#1F64FF"
                  />
                </svg>
                <svg
                  v-if="item.title == 'AI视觉馆' && i == 17"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                >
                  <path
                    d="M0.75 11.625H4.13787C4.2715 11.625 4.33843 11.4634 4.24393 11.3689L2.625 9.75"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.25 11.625H13.8621C13.7285 11.625 13.6616 11.4634 13.7561 11.3689L15.375 9.75"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.125 11.25L4.125 8.25L6.75 6L10.5 8.625L13.5 5.25L13.875 8.25L11.625 11.25H10.125H7.125Z"
                    fill="#DCEBFF"
                  />
                  <path
                    d="M14.25 1.5H3C2.58579 1.5 2.25 1.83579 2.25 2.25V6.10027C2.25 6.27766 2.31288 6.44931 2.42746 6.58473L6.15031 10.9845C6.29281 11.1529 6.50224 11.25 6.72285 11.25H10.5272C10.7478 11.25 10.9572 11.1529 11.0997 10.9845L14.8225 6.58473C14.9371 6.44931 15 6.27766 15 6.10027V2.25C15 1.83579 14.6642 1.5 14.25 1.5Z"
                    stroke="black"
                    stroke-width="1.125"
                  />
                  <path
                    d="M4.125 8.25L6.75 6L10.5 8.625L13.125 5.25"
                    stroke="black"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle cx="11.25" cy="3.75" r="0.75" fill="#1F64FF" />
                </svg>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/69ea21c8-0b75-4c7d-932c-27eef854aaba.png'
                  "
                  v-if="item.title == '助理中心' && i == 0"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/261676c7-51d8-4b94-8e83-b8028ff14c9c.png'
                  "
                  v-if="item.title == '助理中心' && i == 1"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/bed69971-1087-488b-a0b9-287f6f9a1e7b.png'
                  "
                  v-if="item.title == '助理中心' && i == 2"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/02b1b4e2-36ff-4e2c-a762-2356f0475b81.png'
                  "
                  v-if="item.title == '助理中心' && i == 3"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/426a26ef-1947-4739-acb3-a60301cf41c5.jpg'
                  "
                  v-if="item.title == '助理中心' && i == 4"
                  alt=""
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  v-if="
                    (item.title == 'AI实验室' && i == 0) ||
                    (item.title == 'AI实验室' && i == 5) ||
                    (item.title == 'AI实验室' && i == 1)
                  "
                >
                  <rect
                    x="0.6"
                    y="0.6"
                    width="32.8"
                    height="32.8"
                    rx="3.6"
                    fill="white"
                    stroke="#F4F5F9"
                    stroke-width="0.8"
                  />
                  <path
                    d="M23.6761 15.5487C24.0391 14.4592 23.9141 13.2657 23.3336 12.2746C22.4606 10.7546 20.7056 9.97259 18.9917 10.3406C18.2292 9.48158 17.1337 8.99307 15.9852 9.00007C14.2332 8.99607 12.6787 10.1241 12.1397 11.7911C11.0142 12.0216 10.0427 12.7262 9.4742 13.7247C8.5947 15.2407 8.7952 17.1517 9.97019 18.4518C9.60719 19.5413 9.73219 20.7348 10.3127 21.7258C11.1857 23.2459 12.9407 24.0279 14.6547 23.6599C15.4167 24.5189 16.5127 25.0074 17.6612 24.9999C19.4142 25.0044 20.9691 23.8754 21.5081 22.2069C22.6336 21.9764 23.6051 21.2718 24.1736 20.2733C25.0521 18.7573 24.8511 16.8477 23.6766 15.5477L23.6761 15.5487ZM17.6622 23.9544C16.9607 23.9554 16.2812 23.7099 15.7427 23.2604C15.7672 23.2474 15.8097 23.2239 15.8372 23.2069L19.0232 21.3668C19.1862 21.2743 19.2862 21.1008 19.2852 20.9133V16.4217L20.6316 17.1992C20.6461 17.2062 20.6556 17.2203 20.6576 17.2362V20.9558C20.6556 22.6099 19.3162 23.9509 17.6622 23.9544ZM11.2202 21.2028C10.8687 20.5958 10.7422 19.8843 10.8627 19.1938C10.8862 19.2078 10.9277 19.2333 10.9572 19.2503L14.1432 21.0903C14.3047 21.1848 14.5047 21.1848 14.6667 21.0903L18.5562 18.8443V20.3993C18.5572 20.4153 18.5497 20.4308 18.5372 20.4408L15.3167 22.3004C13.8822 23.1264 12.0502 22.6354 11.2207 21.2028H11.2202ZM10.3817 14.2482C10.7317 13.6402 11.2842 13.1752 11.9422 12.9337C11.9422 12.9612 11.9407 13.0097 11.9407 13.0437V16.7242C11.9397 16.9112 12.0397 17.0847 12.2022 17.1772L16.0917 19.4228L14.7452 20.2003C14.7317 20.2093 14.7147 20.2108 14.6997 20.2043L11.4787 18.3433C10.0472 17.5143 9.55619 15.6827 10.3812 14.2487L10.3817 14.2482ZM21.4446 16.8227L17.5552 14.5767L18.9017 13.7997C18.9152 13.7907 18.9322 13.7892 18.9472 13.7957L22.1681 15.6552C23.6021 16.4837 24.0936 18.3183 23.2651 19.7523C22.9146 20.3593 22.3626 20.8243 21.7051 21.0663V17.2758C21.7066 17.0887 21.6071 16.9157 21.4451 16.8227H21.4446ZM22.7846 14.8057C22.7611 14.7912 22.7196 14.7662 22.6901 14.7492L19.5042 12.9092C19.3427 12.8147 19.1427 12.8147 18.9807 12.9092L15.0912 15.1552V13.6002C15.0902 13.5842 15.0977 13.5687 15.1102 13.5587L18.3307 11.7006C19.7652 10.8731 21.5991 11.3656 22.4261 12.8007C22.7756 13.4067 22.9021 14.1162 22.7836 14.8057H22.7846ZM14.3592 17.5773L13.0122 16.7997C12.9977 16.7927 12.9882 16.7787 12.9862 16.7627V13.0432C12.9872 11.3871 14.3307 10.0451 15.9867 10.0461C16.6872 10.0461 17.3652 10.2921 17.9037 10.7401C17.8792 10.7531 17.8372 10.7766 17.8092 10.7936L14.6232 12.6337C14.4602 12.7262 14.3602 12.8992 14.3612 13.0867L14.3592 17.5763V17.5773ZM15.0907 16.0002L16.8232 14.9997L18.5557 15.9997V18.0003L16.8232 19.0003L15.0907 18.0003V16.0002Z"
                    fill="black"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  v-if="item.title == 'AI实验室' && i == 2"
                >
                  <g clip-path="url(#clip0_8495_26382)">
                    <path
                      d="M12.206 2.33398H9.75602L14.216 14.334H16.666L12.206 2.33398ZM5.12602 2.33398L0.666016 14.334H3.16602L4.06602 11.814H8.74602L9.65602 14.334H12.156L7.68602 2.33398H5.12602ZM4.88602 9.58398L6.40602 5.36398L7.93602 9.58398H4.88602Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8495_26382">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.666016 0.333984)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/d426d41b-c1e1-427e-b1bd-ec30c824ee14.jpg'
                  "
                  v-if="item.title == 'AI实验室' && i == 3"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/9d013074-eff9-476e-864c-e98c67e00fbe.jpg'
                  "
                  v-if="item.title == 'AI实验室' && i == 4"
                  alt=""
                />

                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/556a6c00-1c75-4b4e-aec8-3fbc49667b31.png'
                  "
                  v-if="item.title == '其他工具' && i == 0"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/454de80c-a72a-43fb-9cba-b0fe9ab79bbc.jpg'
                  "
                  v-if="item.title == '其他工具' && i == 1"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/37f44a6c-2178-46d1-8dd3-5b6b45c0abf7.jpg'
                  "
                  v-if="item.title == '其他工具' && i == 2"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/95813f3c-9298-46ea-9668-c1e132a9286d.jpg'
                  "
                  v-if="item.title == '其他工具' && i == 3"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/9d9edbc3-1458-4cd4-8550-3cad733dfb34.jpg'
                  "
                  v-if="item.title == '其他工具' && i == 4"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/d16ce67a-0d55-4c54-9163-a60756c3d785.jpg'
                  "
                  v-if="item.title == '其他工具' && i == 5"
                  alt=""
                />
                <img
                  :src="
                    httpUrls.ossUrl +
                    'static/picture/82949fd3-3f73-4c93-8460-a9e863046f4a.jpg'
                  "
                  v-if="item.title == '其他工具' && i == 6"
                  alt=""
                />
                <div
                  v-if="item.title == 'AI实验室' && i == 1"
                  style="
                    color: #fff;
                    position: absolute;
                    width: 100%;
                    bottom: 0px;
                    text-align: center;
                    border-radius: 0px 0px 2.667px 2.667px;
                    background: #1f64ff;
                    font-family: PingFang SC;
                    font-size: 8px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                  "
                >
                  40
                </div>
              </div>
              <div>{{ child.title }}</div>
            </div>
            <div>{{ child.content }}</div>
          </div>
        </div>
      </div>

      <!-- AI资讯 -->
      <div class="information">
        <div class="title_mask">
          <span class="title">AI资讯</span>
        </div>
        <div>
          <div
            class="information-box"
            v-for="(item, i) in informationData"
            :key="i"
            @click="handleDetails(item)"
          >
            <img class="information-img" :src="item.image" alt="" />
            <div class="information-content">
              <div>{{ item.title }}</div>
              <div>
                <div class="information-time">
                  日期{{ informationTime(item.create_time) }}
                </div>
                <div>阅读{{ item.read_count }}</div>
                <div>点赞{{ item.like_count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 官方推荐 -->
      <div class="recommend_eg">
        <div class="title_mask">
          <span class="title">官方推荐</span>
          <!-- <span class="more">查看更多</span> -->
        </div>
        <div class="mask">
          <div
            class="item domHover"
            @click="$router.push('/digitizedHuman/index')"
          >
            <img
              class="imgs"
              src="../../assets/images/2023-08-1112.021.png"
              alt=""
            />
            <div class="title">数字人定制</div>
          </div>

          <div
            class="item domHover"
            @click="$router.push('/drawChat/fourDUltrasound')"
          >
            <img
              class="imgs"
              src="../../assets/images/Maskgroup.png"
              alt=""
              style="border: 1px solid #ccc"
            />
            <div class="title">彩超宝宝照</div>
          </div>
          <div
            class="item domHover"
            @click="$router.push('/identify/identify')"
          >
            <div
              class="imgs"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ccc;
              "
            >
              <img
                src="../../assets/images/SD.png"
                alt=""
                style="width: 70px; height: 70px"
              />
            </div>
            <div class="title">看图说话</div>
          </div>
        </div>
      </div>
      <!-- 官方活动 -->
      <div class="recommend_eg">
        <div class="title_mask">
          <span class="title">官方活动</span>
        </div>
        <div class="mask">
          <div
            class="item domHover"
            @click="$router.push('/shoppingServer')"
          >
            <img
              class="imgs"
              :src='httpUrls.ossUrl + "static/picture/881b9e68-711d-4dd8-8c3d-8121731ea5a7.png"'
              alt=""
            />
            <div class="title">服务器购买&租凭</div>
          </div>
        </div>
      </div>
      <div class="footer_remark">

      </div>
    </div>

    <register ref="Register"></register>
  </div>
</template>

<script>
import { footprint } from "../../api/chatMG";
import {
  getMentorMe,
  getMetorList,
  batchMeTutor,
  deleteMentor,
  updateMentorMe,
  deleteMentorMe,
} from "../../api/mentor";
import { informationList, informationDetail } from "../../api/information"; //资讯接口
import httpUrls from "../../api/requestURL";
import { mapGetters } from "vuex";
import register from "../../components/register";

export default {
  name: "index-ind",
  data() {
    return {
      userInfo: {},
      httpUrls,
      showRecently: false,
      page: 1,
      pageSize: 7,
      mentorRecommend: [],
      recentlyUseingList: [],
      recommendList: [
        {
          name: "数字人定制",
          img: "../../assets/images/AIdrawNo.png",
        },
        {
          name: "彩超宝宝照",
          img: "../../assets/images/AIdrawNo.png",
        },
      ],
      isMeMsg: [],
      mentorOrMe: [],
      userPhoto: "",
      columnData: [
        {
          title: "AI对话",
          arr: [
            {
              title: "文心一言",
              content: "推荐百度新一代语言大模型",
              query: 4,
            },
            {
              title: "讯飞星火",
              content: "讯飞科大推出的新一代认知智能大模型",
              query: 5,
            },
            {
              title: "通义千问",
              content: "阿里巴巴集团推出的大语言模型",
              query: 10,
            },
            {
              url: "static/picture/0bd787ee-2f53-4216-b810-030f6ba2f55c.png",
              title: "360智脑",
              content: "由360集团推出的认知型通用大模型",
              query: 12,
            },
            {
              url: "static/picture/e70dcaf9-f3cb-40c1-99de-b739f09a7d18.png",
              title: "ChatGLM",
              content: "由智谱AI推出的千亿参赛对话大模型",
              query: 8,
            },
          ],
        },
        {
          title: "AI绘画",
          arr: [
            {
              title: "通义万相",
              content: "一个不断进化的AI艺术创作大模型",
              query: { value: 13, label: "通义万相", size: "1024*1024" },
            },
            {
              title: "百度绘画",
              content: "AI一下，文字成画将创意变成创作",
              query: { value: 3, label: "百度绘画", size: "1024*1024" },
            },
            {
              title: "火山引擎",
              content: "火山方舟推出的大模型服务，文生图",
              query: { value: 14, label: "火山引擎", size: "1024*1024" },
            },
          ],
        },
        {
          title: "AI视觉馆",
          arr: [
            {
              title: "人脸融合",
              content: "提供视频和图片即可进行人脸融合",
            },
            {
              title: "人像年龄变化",
              content: "提供视频和图片即可进行人脸融合",
            },
            {
              title: "通用文字识别",
              content: "上传图片即可进行通用文字识别",
            },
            {
              title: "人像漫画",
              content: "上传人像图即可生成相应的漫画人像",
            },
          ],
        },
        {
          title: "助理中心",
          arr: [
            {
              title: "人物互动",
              content: "在这里能与各个领域内的大佬进行互动",
              id: 4,
              tab_id: 1003,
            },
            {
              title: "效率工具",
              content: "多种常用的效率工具，应用尽有",
              id: 3,
              tab_id: "1001",
            },
            {
              title: "娱乐生活",
              content: "娱乐生活类的各种问题在这里都能有答案",
              id: 2,
              tab_id: "1000",
            },
            {
              title: "工作学习",
              content: "工作学习相关的问题在这里将有回答",
              id: 5,
              tab_id: "1005",
            },
            {
              title: "工作助理",
              content: "工作上遇到的各种问题，都能给你解决",
              id: 1,
              tab_id: "1006",
            },
          ],
        },
        {
          title: "AI实验室",
          arr: [
            {
              title: "AI35",
              content: "提供视频和图片即可进行人脸融合",
              query: 0,
            },
            {
              title: "AI40",
              content: "提供视频和图片即可进行人脸融合",
              query: 1,
            },
            {
              title: "Claude",
              content: "上传图片即可进行通用文字识别",
              query: 7,
            },
            {
              title: "Stable Diffusion",
              content: "上传人像图即可生成相应的漫画人像",
              query: { value: 9, label: "Stable Diffusion", size: "512*512" },
            },
            {
              title: "Midjourney",
              content: "上传图片，智能修图",
              query: 7,
            },
            {
              title: "DALL.E-3",
              content: "上传图片，智能修图",
              query: 7,
            },
          ],
        },
        {
          title: "其他工具",
          arr: [
            {
              title: "音视频转文字",
              content: "会议记录、课堂笔记等领域一键生稿",
              page: "/convert/index",
            },
            {
              title: "图生图",
              content: "根据图片和文字描述生成你需求的图",
            },
            {
              title: "文本识别",
              content: "智能识别图片中的内容",
              page: "/identify/identify",
            },
            {
              title: "彩超宝宝",
              content: "根据彩超图，预测宝宝未来的模样",
              page: "/drawChat/fourDUltrasound",
            },
            {
              title: "看图说话",
              content: "根据图片识别各种物体、人物等",
            },
            {
              title: "数字人",
              content: "数字人定制，想象无界",
              page: "/digitizedHuman/index",
            },
            {
              title: "文档对话",
              content: "上传文档，即可进行文档知识对话",
            },
          ],
        },
      ],
      visionMany: "查看更多",
      informationData: [],
    };
  },

  components: {
    register,
  },

  mounted() {
    // JSON.parse
    this.footprint();
    this.getMentorMe();
    this.getMetorList();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },

  computed: {
    ...mapGetters(["carouselMessage", "userInfoData"]),
  },

  watch: {
    // 用户信息发生改变，重置页面信息
    userInfoData: {
      deep: true,
      handler() {
        console.log('进入userInfoData')
        location.reload();
        this.footprint();
        this.getMentorMe();
        this.getMetorList();
      },
    },
  },

  methods: {
    handleMonyVision(val) {
      let index = this.columnData.findIndex((item) => item.title == val);
      let visionData = [
        {
          title: "人脸融合",
          content: "提供视频和图片即可进行人脸融合",
        },
        {
          title: "人像年龄变化",
          content: "提供视频和图片即可进行人脸融合",
        },
        {
          title: "通用文字识别",
          content: "上传图片即可进行通用文字识别",
        },
        {
          title: "人像漫画",
          content: "上传人像图即可生成相应的漫画人像",
        },
        {
          title: "智能变美",
          content: "上传图片，智能修图",
        },
        {
          title: "人物抠图",
          content: "上传图片即可人像抠图",
        },
        {
          title: "老照片修复",
          content: "上传照片即可生成相应的老照片",
        },
        {
          title: "图像增强",
          content: "上传照片即可生成使图片增强效果",
        },
        {
          title: "人像特效",
          content: "上传人像图即可生成相应的特效",
        },
        {
          title: "表情编辑",
          content: "上传人像图即可生成进行表情的编辑",
        },
        {
          title: "发型编辑",
          content: "上传人像图即可生成相应的发型",
        },
        {
          title: "3D游戏风",
          content: "上传人像图即可生成相应3D游戏人像",
        },
        {
          title: "活体照片",
          content: "上传人像图即可生成相应的活体照片",
        },
        {
          title: "头发分割",
          content: "上传人像图即可生成相应的头发分割效果",
        },
        {
          title: "图片拉伸修复",
          content: "上传人像图即可对图片进行拉伸修复",
        },
        {
          title: "图片配文",
          content: "上传人像图即可为图片配文",
        },
        {
          title: "图片超分辨率",
          content: "上传人像图即可生成超分辨率的图片",
        },
        {
          title: "图片方向矫正",
          content: "上传人像图即可对图片进行方向矫正",
        },
      ];
      if (this.visionMany == "查看更多") {
        this.visionMany = "收起";
        this.$set(this.columnData[index], "arr", visionData);
        console.log(this.columnData[index], "--查看更多");
      } else {
        this.visionMany = "查看更多";
        this.$set(this.columnData[index], "arr", visionData.slice(0, 4));
      }
    },
    //跳转Ai资讯
    handleDetails(val) {
      // 请求参数
      let data = {
        message_type: val.message_type,
        message_id: val.message_id,
      };
      sessionStorage.setItem("information", JSON.stringify(data));
      this.$router.push(`/information/information`);
    },
    informationTime(val) {
      let time = new Date(val);
      return time.getMonth() + 1 + "-" + time.getDate();
    },
    // 编辑我的信息
    editMeFn() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      getMentorMe({ user_id: userInfo.user_id, me_id: "478640263297094" }).then(
        (res) => {
          console.log(res);
        }
      );
    },
    // 判断是否登录
    loginRoNot() {
      let userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo.role !== "user") {
        this.$message({
          message: "当前尚未登录，请先登录",
          type: "warning",
        });
        this.$refs.Register.registerVisible = true;
        return false;
      } else {
        return true;
      }
    },
    createMe() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.role == "guess") {
        this.$refs.Register.registerVisible = true;
      } else {
        this.$router.push("/createMentor");
      }
    },
    //最近/查看更多
    showRecendly() {
      this.showRecently = true;
      this.page = 1;
      this.pageSize = 30;
      this.footprint();
    },
    //最近/收起
    hideRecently() {
      this.showRecently = false;
      this.page = 1;
      this.pageSize = 7;
      this.footprint();
    },

    footprint() {
      footprint(`page=${this.page}&page_size=${this.pageSize}`).then((res) => {
        res.data.data.forEach((v) => {
          if (v.type_code == "chat") {
            v.name = "聊天";
          } else if (v.type_code == "image") {
            v.name = "AI绘画";
          } else if (v.type_code == "celebrity") {
            v.name = "助理中心";
          } else if (v.type_code == "assistant") {
            v.name = "助理中心";
          } else if (v.type_code == "cdu") {
            v.name = "彩超宝宝";
          } else if (v.type_code == "real_time") {
            v.name = "实时录音";
          } else if (v.type_code == "real_file") {
            v.name = "音视频转写";
          }
        });
        if (this.page == 1) {
          this.recentlyUseingList = res.data.data;
        } else {
          this.recentlyUseingList = this.recentlyUseingList.concat(
            res.data.data
          );
        }
      });
    },

    toPage(item) {
      console.log(item, "跳转");
      if (item.type_code == "chat") {
        // 对话
        if (item.type_name == "chatGLM") {
          this.$router.push({
            name: "chat",
            params: {
              id: 8,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "文心一言") {
          this.$router.push({
            name: "chat",
            params: {
              id: 4,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "讯飞星火") {
          this.$router.push({
            name: "chat",
            params: {
              id: 5,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "通义千问") {
          this.$router.push({
            name: "chat",
            params: {
              id: 10,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "商汤日日新") {
          this.$router.push({
            name: "chat",
            params: {
              id: 11,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "文档对话") {
          this.$router.push("/document/chat");
        } else if (item.type_name == "导师对话") {
          // this.$router.push('/mentorChat')
          this.$router.push({
            path: `/mentorChat?eid=${item.eid}`,
          });
        }
      } else if (item.type_code == "image") {
        // 绘画
        // this.$router.push('/drawChat/drawChat')
        if (item.type_name == "Stable Diffusion") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 9,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "Midjourney") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 6,
              speakId: item.eid,
            },
          });
        } else if (item.type_name == "百度绘画") {
          this.$router.push({
            name: "AI绘画",
            params: {
              id: 3,
              speakId: item.eid,
            },
          });
        } else {
          this.$router.push(
            `/vision/vision?title=${item.type_name}&eid=${item.eid}`
          );
        }
      } else if (item.type_code == "celebrity") {
        this.$router.push("/templateSelect/templateSelect");
        sessionStorage.setItem("applicationId", 4);
      } else if (item.type_code == "assistant") {
        this.$router.push("/templateSelect/templateSelect");
        sessionStorage.setItem("applicationId", 3);
      } else if (item.type_code == "cdu") {
        this.$router.push("/drawChat/fourDUltrasound");
      } else if (item.type_code == "real_time") {
        this.$router.push("/convert/index");
      } else if (item.type_code == "real_file") {
        this.$router.push("/convert/index");
      }
    },

    toPageTwo(item, type) {
      switch (item.title) {
        case "AI对话":
          this.$router.push(`/chat/Chat?value=${type.query}`);
          break;
        case "AI绘画":
          this.$router.push("/drawChat/drawChat?value=" + type.query.value);
          sessionStorage.setItem("indexType", JSON.stringify(type.query.value));
          break;
        case "AI视觉馆":
          console.log(item);
          item.arr.forEach((item2, index) => {
            if (item2.title == type.title && index < 12) {
              this.$router.push(`/vision/vision?title=${type.title}`);
            } else if (item2.title == type.title && index >= 12) {
              this.$message("正在开发中...");
            }
          });
          break;
        case "助理中心":
          this.$router.push("/templateSelect/templateSelect");
          this.$store.dispatch("app/changeApplicationCenterId", type.id);
          sessionStorage.setItem("applicationId", type.id);
          sessionStorage.setItem("applicationType", type.tab_id);
          break;
        case "AI实验室":
          console.log(type);
          if (
            type.title == "AI35" ||
            type.title == "AI40" ||
            type.title == "Claude"
          ) {
            this.$router.push(
              `/chataboratory/laboratoryChat?value=${type.query}`
            );
            sessionStorage.setItem("indexType", type.query);
          } else if (type.query.value == 9) {
            this.$router.push(
              "/chataboratory/laboratoryDrawChat?value=" + type.query.value
            );
            sessionStorage.setItem("indexType", JSON.stringify(type.query));
          } else {
            this.$message("该模型正在升级中，敬请期待...");
          }
          break;
        case "其他工具":
          if (type.title == "数字人") {
            this.$router.push(type.page);
          } else if (type.title == "彩超宝宝") {
            this.$router.push("/drawChat/fourDUltrasound");
          } else if (type.title == "音视频转文字") {
            this.$router.push("/convert/index");
          } else if (type.title == "文本识别") {
            this.$router.push(`/vision/vision?title=通用文字识别`);
          } else if (type.title == "文档对话") {
            this.$router.push("/document/chat");
          } else if (type.title == "看图说话") {
            this.$router.push("/identify/identify");
          }

          break;
        default:
          break;
      }
    },

    // 获取“我”
    getMentorMe() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`;
      let obj = {
        user_id: userInfo.user_id,
        message_type: 2,
        page_index: 1,
        page_count: 4,
      };
      //获取资讯数据
      informationList(obj)
        .then((res) => {
          if (res.code == 20000) {
            this.informationData = res.data.slice(0, 4);
          }
        })
        .catch((err) => {
          console.log(err, "错误信息");
        });
      getMentorMe(data)
        .then((res) => {
          if (res.data.length == 0 || res.data == null) {
            this.isMeMsg = [];
          } else {
            console.log(res, "获取我");
            this.isMeMsg = res.data;
            let meId = [];
            res.data.forEach((v) => {
              meId.push(v.me_id);
            });
            batchMeTutor({ me_ids: JSON.stringify(meId) })
              .then((response) => {
                console.log(response.data, "----");
                this.mentorOrMe = response.data;
                this.userPhoto = response.data[0].me.photo;
              })
              .catch((err) => {
                console.log(err, "mentorOrMe错误");
              });
          }
        })
        .catch((err) => {
          console.log(err, "错误--获取我");
        });
    },

    // 获取推荐导师列表
    getMetorList() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // let data = userInfo.role !== 'user' ? `page_index=1&page_count=8&is_built_in=1` : `user_id=${userInfo.user_id}&get_all=1`;
      // let data = `user_id=${userInfo.user_id}&get_all=1`
      console.log("进入getMetorList函数");
      if (userInfo.role != "user") {
        getMetorList(`page_index=1&page_count=8&is_built_in=1`)
          .then((res) => {
            console.log(res.data, "导师数据");
            this.mentorRecommend = res.data;
          })
          .catch((err) => {
            console.log(err, "导师数据错误");
          });
      } else {
        let data = `user_id=${userInfo.user_id}&page_index=1&page_count=5`;
        getMentorMe(data).then((res) => {
          let meId = [];
          res.data.forEach((v) => {
            meId.push(v.me_id);
          });
          batchMeTutor({ me_ids: JSON.stringify(meId) }).then((response) => {
            console.log(response, "--我的专属导师");
            if (response.code == 20000) {
              this.mentorRecommend = response.data[0].tutor.filter(
                (item) =>
                  item.character_name != undefined &&
                  item.character_name != null
              );
            }
            //  = response.data
          });
        });
      }
    },

    // 导师去对话
    toMentorChat(item) {
      console.log(item, "导师对话");
      if (this.loginRoNot()) {
        sessionStorage.setItem("MENTOR_ITEM_MESSAGE", JSON.stringify(item));
        this.$router.push("/mentorChat");
      }
    },

    // 添加导师
    addMentor(item) {
      sessionStorage.setItem("ADD_MENTOR_ITEM_MESSAGE", JSON.stringify(item));
      this.$router.push("/selectMentor");
    },

    // 修改导师
    editMentorItem(item) {
      if (this.loginRoNot()) {
        sessionStorage.setItem(
          "EDIT_MENTOR_ITEM_MESSAGE",
          JSON.stringify(item)
        );
        this.$router.push("/createMineMentor");
      }
    },

    // 修改我
    editMeItem(item) {
      sessionStorage.setItem("EDIT_ME_ITEM_MSG", JSON.stringify(item));
      this.$router.push("/createMentor");
    },

    // 对话
    toMeChat() {
      if (this.loginRoNot()) {
        let item = this.mentorOrMe[0].me;
        let data = {
          avatar: item.photo,
          character_name: item.name,
          document: item.document,
          greeting: "你好，我是你自己，有什么问题我们一起沟通！",
          image: item.image,
          implicit_hint: item.implicit_hint,
          influence: item.influence,
          introduction: item.introduction,
          is_built_in: item.is_built_in,
          me_id: item.me_id,
          sort: item.sort,
          tutor_id: item.tutor_id,
          user_id: item.user_id,
          website: item.website,
        };
        sessionStorage.setItem("MENTOR_ITEM_MESSAGE", JSON.stringify(data));
        this.$router.push("/mentorChat");
      }
    },

    // 解绑导师
    deleteMentorItem(item) {
      console.log(item, this.mentorOrMe);
      let data = {
        user_id: item.user_id,
        me_id: item.me_id,
        tutor_id: item.tutor_id,
      };
      this.$confirm("此操作将永久删除该导师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMentor(data).then((res) => {
            if (res.code == 20000) {
              this.mentorOrMe.forEach((value, index) => {
                value.tutor.forEach((v, i) => {
                  if (v.tutor_id == item.tutor_id) {
                    this.$set(this.mentorOrMe[index].tutor, i, {
                      sort: v.sort,
                      style: v.style,
                    });
                  }
                });
              });
              this.$message.success("删除成功");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped >
.footer_remark {
  padding: 5px;
  width: 100%;
  background: transparent;
  z-index: 999;
  display: flex;
  justify-content: center;
  color: #999999;
}

.remark {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-box {
  width: 100%;
  height: 70%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(254, 255, 255, 1),
    rgba(241, 242, 245, 1)
  );
}
::-webkit-scrollbar {
  width: 30px;
}

::-webkit-scrollbar-thumb {
  background-color: #e4e0e0d5;
}

.vision {
  transition: 2s all;
}

.domHover {
  cursor: pointer;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.index-content {
  background-color: rgb(241, 242, 245);
  padding: 0px 30px 0px 30px;
  position: relative;
  /* top: -302px; */
}

.information > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* 资讯 */
.information-box {
  cursor: pointer;
  width: calc(50% - 20px);
  height: 150px;
  padding: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  display: flex;
}

.information-img {
  width: 180px;
  height: 100%;
  margin-right: 10px;
}

.information-content {
  width: 68%;
  height: 100%;
  position: relative;
}

.information-content > div:first-child {
  width: 100%;
  color: #333;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 150%;
  position: absolute;
  top: 0px;
}

.information-content > div:last-child {
  color: #a6a6a6;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  position: absolute;
  bottom: 0px;
  display: flex;
}

.information-content > div:last-child .information-time {
  margin-right: 51px;
}

.information-content > div:last-child div:last-child {
  margin-left: 16px;
}

/* 栏目 */
.column {
  margin: 10px 0px;
}

.column > div:last-child {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.column-box {
  width: 236px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
}

.column-box:hover {
  cursor: pointer;
}

.column-box:last-child {
  margin-right: 0px;
}

.column-box > div:first-child {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.column-box > div:first-child div:first-child {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 3.2px;
  border: 0.8px solid #f4f5f9;
  background: #fff;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.column-box > div:first-child div:first-child img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.column-box > div:first-child div:last-child {
  color: #000;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 24px */
}

.column-box > div:last-child {
  color: #8f8f8f;
  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 19.5px */
}

#logo {
  background-color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

/* .indexInd {
  position: relative;
  height: calc(100% - 30px);
} */

.index-img {
  width: calc(100% - 60px);
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: -1;
}

.index_top-title {
  /* display: flex;
  justify-content: space-around; */
  padding: 50px;
  position: relative;
  background-color: rgb(241, 242, 245);
  /* margin-top: 40px; */
}

.left_title {
  color: #19191a;
  font-family: PingFang SC;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 36px */
}

.left_content {
  color: #555557;

  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 18px */
}

.top-left {
  display: flex;
  align-items: center;
}

.top-right {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-end; */
  align-items: center;
}

.top-right .item {
  margin-right: 16px;
  margin-top: 16px;
  width: calc(16.8% - 50px);
  height: 110px;
  padding: 0 14px 14px 20px;
  border-radius: 8px;
  background-color: #ffffff;
  /* margin-bottom: 10px; */
  cursor: pointer;
}

.top-right .item:last-child {
  margin-right: 0px;
}

@media (width < 1350px) {
  .top-right .item {
    width: calc(50% - 50px);
    margin-top: 16px;
  }
}

.top-right .item .titles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.top-right .item .titles .type {
  color: #000;
  font-family: PingFang SC;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 30px */
}

.top-right .item .titles .img {
  width: 54px;
  height: 54px;
}

.top-right .item .conts {
  color: #302f2f;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 21px */
}

.right_img {
  position: absolute;
  width: 27px;
  height: 15px;
  right: 6px;
  top: 4px;
}

.title_mask {
  display: flex;
  justify-content: space-between;
  padding: 14px 0 10px 0;
}

.title_mask .title {
  color: #19191a;
  font-size: 14px;
  font-weight: 500;
}

.title_mask .more {
  color: #1f64ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.list_mask .item {
  width: 200px;
  height: 188px;
  border-radius: 8px;
  border: 1px solid #e9e9eb;
  position: relative;
  margin-bottom: 20px;
  margin-right: 20px;
}

.list_mask .item .imgs {
  width: 200px;
  height: 118px;
  box-sizing: border-box;
  /* border: 1px solid #000; */
  border-radius: 8px;
}

.list_mask .item .name {
  border-radius: 7px 0px;
  background: #1f64ff;
  padding: 4px;
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
}

.list_mask .item .titles {
  color: #19191a;
  font-size: 14px;
  font-weight: 500;
  margin: 7px 0 7px 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.list_mask .item .time {
  color: #8b8c8f;
  font-size: 12px;
  font-weight: 500;
  margin-left: 12px;
}

.recommend_eg .mask {
  padding: 20px;
  display: flex;
  border-radius: 8px;
  border: 1px solid #e9e9eb;
}

.recommend_eg .mask .item {
  margin-right: 20px;
  box-sizing: border-box;
}

.recommend_eg .mask .item .imgs {
  width: 198px;
  height: 119px;
  border-radius: 8px;
}

.recommend_eg .mask .item .title {
  color: #19191a;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
}

.recently-useing {
  position: fixed;
  left: 240px;
  top: 86px;
  right: 0;
  bottom: 0;
  padding: 0 20px;
  background-color: #ffffff;
}

.recently-useing .title {
  color: #19191a;
  font-size: 14px;
  font-weight: 500;
  margin: 20px 0 10px 0;
  display: flex;
  justify-content: space-between;
}

.recently-useing .list_mask .item {
  margin-bottom: 20px;
}

.ai-teacher {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 30px;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.ai-teacher .img-bg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 40px;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.ai-teacher > div .teacher-my {
  width: 400px;
  height: 188px;
  border-radius: 8px;
  background: linear-gradient(140deg, #c0eafe -32.97%, #fff 34.74%);
  position: relative;
  padding: 12px 16px;
  box-sizing: border-box;
}

.ai-teacher > div .teacher-my > img {
  width: 111px;
  height: 111px;
  position: absolute;
  right: 0;
  top: 0;
}

.ai-teacher > div .teacher-my .my-title {
  color: #19191a;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05);
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
}

.teacher-my .my-box {
  display: flex;
  position: relative;
  bottom: -20px;
}

.teacher-my .my-box > div:first-child {
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 10.455px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-box > div:first-child img {
  width: 120px;
  height: 120px;
  border-radius: 10.455px;
}

.my-box > div:first-child span {
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translate(-50%);
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
  letter-spacing: 0.7px;
}

.teacher-my .my-box > div:last-child {
  height: 120px;
  padding-top: 10px;
  box-sizing: border-box;
  margin-left: 10px;
}

.teacher-my .my-box > div:last-child div:nth-child(1) {
  width: 218px;
  line-height: 32px;
  flex-shrink: 0;
  border-radius: 3px;
  background: #1f64ff;
  text-align: center;
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.teacher-my .my-box > div:last-child div:nth-child(2) {
  margin-top: 21px;
  width: 216px;
  line-height: 32px;
  border: 1px solid #1f64ff;
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* 21px */
  text-align: center;
}

.teacher-my .my-box > div:last-child div:nth-child(2):hover {
  cursor: pointer;
}

.teacher-my .my-box > div:last-child div:nth-child(3) {
  color: #9b9b9b;
  margin-top: 4px;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  /* 18px */
}

.ai-teacher > div .teacher-box {
  max-width: 66%;
  margin-top: 20px;
  padding: 12px 16px;
  padding-bottom: 15px;
  height: 208px;
  flex-shrink: 0;
  border-radius: 8px;
  background: linear-gradient(140deg, #c0eafe -32.97%, #fff 34.74%);
  display: inline-block;
  box-sizing: border-box;
}

.teacher-box .box-title {
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
}

.teacher-box .box-title > div:first-child {
  color: #19191a;
  /* Drop Shadow */
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05);
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 24px */
}

.teacher-box .box-title > div:last-child {
  color: #9b9b9b;

  font-family: PingFang SC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 2px;
  /* 19.5px */
}

.teacher-box .box-title > div:last-child:hover {
  cursor: pointer;
}

.teacher-box .box-content {
  margin-top: 20px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}

.teacher-box .box-content .box-center {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  position: relative;
  margin-right: 9px;
}

.box-center:hover {
  cursor: pointer;
}

.box-content .box-center img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
}

.box-content .box-center span {
  position: absolute;
  left: 50%;
  bottom: 5px;
  display: inline-block;
  width: 100%;
  text-align: center;
  transform: translate(-50%);
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  /* font-style: normal; */
  font-weight: 500;
  line-height: 150%;
  /* 21px */
  letter-spacing: 0.7px;
}

.box-content .box-center .edit_btn {
  width: 24px;
  height: 24px;
  border-radius: 0px 6px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0px;
  display: none;
}

.box-center:hover .edit_btn {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  /* margin-right: -70px;
  margin-left: -10px; */
}

.item-mask.mains_head_portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  margin-left: -450px;
}

.item-mask .introduce {
  border-radius: 8px;
  border: 1.5px solid rgba(252, 254, 255, 0.5);
  background: linear-gradient(3deg, #fff 2.75%, #ecf2ff 115.15%);
  padding: 13px 20px;
  position: relative;
  width: 266px;
}

.item-mask .introduce .img {
  position: absolute;
  right: 2px;
  top: 2px;
}

.item-mask .introduce .name {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  /* 24px */
  text-align: center;
  margin-bottom: 10px;
}

.item-mask .introduce .conten {
  color: #1e1d1e;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  /* 18px */
  text-align: center;
}

.item-mask .mains {
  position: relative;
  margin-top: 26px;
  width: 615px;
  height: 389px;
}

element.style {
  transform: translateX(0px) scale(1);
  height: 100%;
  display: flex;
  justify-content: flex-start;
}

.item-mask .mains .main-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.item-mask .mains .main-item .item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  cursor: pointer;
  /* width: 138px;
  height: 138px; */
}

/* 右上角编辑 */
.item-mask .mains .main-item .item .edit_btn {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 5px;
  display: none;
}

.item-mask .mains .main-item .item:hover .edit_btn {
  display: block;
}

/* 点 */
.item-mask .mains .main-item .item .dot {
  width: 35px;
  height: 10px;
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.hint_box {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.hint_box > div[class*="hint"] {
  width: 345px;
  margin-top: 60px;
  position: relative;
}

.hint_box > div:last-child {
  width: 345px;
  height: 100px;
  margin-top: 120px;
  margin-left: 40px;
  display: flex;
}

.hint_box > div:last-child > div:first-child {
  width: 108px;
  height: 108px;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: 0px 2px 3px 0px #e0e0e0;
  position: relative;
}

.hint_box > div:last-child > div:last-child {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: 20px;
}

.hint_box > div:last-child > div:last-child div div:first-child {
  color: #000;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 18px */
}

.hint_box .hint_text {
  color: #60646b;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  position: absolute;
  top: 20px;
  left: 44px;
}

.item-mask .mains .main-item .item .but_list {
  position: absolute;
  top: 10px;
  left: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
}

.item-mask .but_list .but-item:hover span {
  color: #1f64ff;
}

.item-mask .mains .main-item .item:hover .but_list {
  display: flex;
}

.item-mask .mains .main-item .item .delete-mentor {
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 50%;
  padding: 2px;
  font-size: 14px;
  cursor: pointer;
  display: none;
}

.item-mask .mains .main-item .item:hover .delete-mentor {
  display: inline;
}

.item-mask .mains .main-item .bg {
  width: 136px;
  height: 136px;
  border-radius: 50%;
  position: absolute;
  z-index: -1;
}

.item-mask .mains .main-item .image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 10px;
}

.item-mask .mains .main-item .me_photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
}

.item-mask .mains .main-item .userEdit {
  background-color: #fff;
  border-radius: 50%;
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
}

.item-mask .mains .item:hover .userEdit {
  display: block;
}

.item-mask .mains .main-item .item .title {
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 5px;
  color: #1e1d1e;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 18px */
}

.item-mask .type_tag {
  color: #fff;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05);
  font-size: 20px;
  font-weight: 500;
  /* line-height: 150%; */
  border-radius: 50px;
  /* background: linear-gradient(273deg, #1F64FF 0.31%, #6C9AFF 100%); */
  /* width: 274px; */
  text-align: center;
  /* padding: 10px 0; */
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
}

.item-mask .type_manage {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  box-shadow: 0px 2.96296px 11.85185px 0px rgba(51, 51, 51, 0.05);
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: -80px;
  padding-top: 10px;
  box-sizing: border-box;
}

.item-mask .type_manage div {
  color: #1f64ff;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 18px */
}

.item-mask .btn_title {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.create_me {
  color: #1f64ff;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  /* 19.059px */
  background-color: #ffffff;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 20px 0px rgba(51, 51, 51, 0.05);
  cursor: pointer;
  margin-top: 20px;
}

.create_me i {
  font-size: 20px;
}
</style>

<style>
.el-carousel__container {
  height: 100%;
}

.mentor-carousel-item {
  /* width: 100%; */
  display: flex;
  justify-content: center;
}
</style>