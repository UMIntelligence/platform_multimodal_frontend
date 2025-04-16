<template>
  <!-- 分享页面 -->
  <div style="position: relative;width: 100%;height: calc(100% - 105px);">
    <div class="go-back" style="z-index: 10;">
      <div @click="$router.go(-1)" class="go_back-item-on">
        <img style="width: 10px;transform: rotateZ(180deg);margin: auto 0;" src="../assets/images/right.png" alt="">
        <span style="margin-left: 8px;">返回</span>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <div class="left-title">
          <div>邀请新朋友，算力免费得</div>
          <div>每邀请1位新好友注册，好友首次授权打开注册后，您可立即获得高达100万的算力值!</div>
        </div>
        <!-- 卡片 -->
        <div class="left-card">
          <div class="card-title">
            <!-- <img src="" alt=""> -->
            <i class="el-icon-present"></i>
            <div>邀请有礼</div>
          </div>
          
          <div>每邀请一个好友首次授权打开，您将获得高达100万的算力值！</div>
          <div>好友打开后完成注册并充值成功，您还将获得额外佣金奖励！</div>
          <div>*受邀请的好友注册后可立即获得50万通用算力使用！</div>
        </div>
        <!-- 立即升级 -->
        <div class="left-prompt">
          <div>
            <i class="el-icon-present"></i>
            <div>快来升级成为分销，尊享更多佣金与收益</div>
          </div>
          <el-button plain>立即升级</el-button>
        </div>
        <!-- 分享步骤 -->
        <div class="left-step">
          <div>流程介绍</div>
          <div>
            <el-steps :active="0" align-center>
              <el-step title="发送链接或二维码给好友" icon="el-icon-share"></el-step>
              <el-step title="好友首次授权打开" icon="el-icon-user"></el-step>
              <el-step title="您立即获得专属算力值" icon="el-icon-present"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
      <div class="right">
        <el-carousel @change="handleCarousel" indicator-position="none" :autoplay="false" :interval="4000" type="card"
          height="320px">
          <el-carousel-item>
            <!-- 海报 -->
            <div class="poster" ref="imageWrapperOne">
              <img :src='httpUrls.ossUrl + "static/picture/197f9351-a796-4697-90e2-3c2074c44646.png"' alt="">
              <div class="poster-item">
                <div class="item-title">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 42 35" fill="none">
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M10.2286 32.9687C8.55412 32.6099 6.95941 31.5335 6.24179 30.8159C5.52417 30.0982 2.37462 26.5898 2.37462 26.5898C2.01581 26.2709 1.37793 25.5533 1.37793 24.5964C1.37793 23.0814 2.17528 16.3039 2.69356 13.7922C3.21184 11.2805 5.37802 8.83519 5.37802 8.83519C9.75525 4.12118 15.1124 2.54934 15.1124 2.54934C15.511 2.35 15.4363 2.02938 16.109 1.81178C18.1124 1.16392 20.953 1.07422 20.953 1.07422C20.953 1.07422 23.7936 1.16392 25.7969 1.81178C26.4697 2.02938 26.3949 2.35 26.7936 2.54934C26.7936 2.54934 32.1507 4.12118 36.5279 8.83519C36.5279 8.83519 38.6941 11.2805 39.2124 13.7922C39.7307 16.3039 40.528 23.0814 40.528 24.5964C40.528 25.5533 39.8901 26.2709 39.5313 26.5898C39.5313 26.5898 36.3818 30.0982 35.6642 30.8159C34.9465 31.5335 33.3518 32.6099 31.6774 32.9687C30.0029 33.3276 23.8434 34.1648 20.953 34.1648C18.0626 34.1648 11.903 33.3276 10.2286 32.9687ZM16.036 10.3503C13.8566 10.43 11.2253 10.935 10.5343 11.2274C9.8432 11.5198 6.86102 12.5438 6.38803 16.9684C6.14962 19.1989 6.00514 24.5035 6.32161 26.4769C6.83119 29.6546 10.2387 30.9345 13.3184 31.5601C17.1457 32.3375 20.9531 32.198 20.9531 32.198C20.9531 32.198 24.7603 32.3375 28.5876 31.5601C31.6673 30.9345 35.0748 29.6546 35.5844 26.4769C35.901 24.5035 35.7564 19.1988 35.518 16.9684C35.045 12.5438 32.0628 11.5198 31.3718 11.2274C30.6807 10.935 28.0494 10.43 25.87 10.3503C23.6905 10.2705 21.4812 10.2805 20.953 10.2805C20.4247 10.2805 18.2154 10.2705 16.036 10.3503Z"
                          fill="#1F64FF" />
                      </g>
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M2.78541 24.9916C2.78541 24.9916 4.20566 14.5213 4.36513 12.3286C4.5246 10.1358 4.48473 1.7635 4.36513 0.926271C4.24553 0.0890399 3.39834 -0.409312 3.12923 1.20535C2.97167 2.15078 2.00361 8.51406 0.830218 14.1093C0.657431 14.9332 0.378357 16.3552 0.325254 17.219C0.154859 19.9883 0.0675487 22.0601 0.0295947 22.465C-0.0900085 23.7408 0.203418 23.8516 0.433215 24.2143C0.68215 24.607 1.59887 25.6409 1.77373 25.8041C1.96063 25.9785 2.4884 26.3181 2.60098 25.9037C2.72665 25.4412 2.78541 24.9916 2.78541 24.9916Z"
                          fill="#1BDAFF" />
                      </g>
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M39.2181 24.9916C39.2181 24.9916 37.7979 14.5213 37.6384 12.3286C37.4789 10.1358 37.5188 1.7635 37.6384 0.926271C37.758 0.0890399 38.6052 -0.409312 38.8743 1.20535C39.0319 2.15078 39.9999 8.51406 41.1733 14.1093C41.3461 14.9332 41.6252 16.3552 41.6783 17.219C41.8487 19.9883 41.936 22.0601 41.974 22.465C42.0936 23.7408 41.8002 23.8516 41.5704 24.2143C41.3215 24.607 40.4047 25.6409 40.2299 25.8041C40.043 25.9785 39.5152 26.3181 39.4026 25.9037C39.2769 25.4412 39.2181 24.9916 39.2181 24.9916Z"
                          fill="#1BDAFF" />
                      </g>
                      <mask id="mask0_8371_24802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="13" y="17"
                        width="6" height="9">
                        <path
                          d="M15.8839 17.3398C14.4391 17.3398 13.2686 18.5104 13.2686 19.9553V22.5707C13.2686 24.0156 14.4391 25.1861 15.8839 25.1861C17.3288 25.1861 18.4993 24.0156 18.4993 22.5707V19.9553C18.4993 18.5104 17.3288 17.3398 15.8839 17.3398Z"
                          fill="white" />
                      </mask>
                      <g mask="url(#mask0_8371_24802)">
                        <path d="M41.4032 2.30566H1.89355V41.816H41.4032V2.30566Z" fill="#1F64FF" />
                      </g>
                      <mask id="mask1_8371_24802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="24" y="17"
                        width="6" height="9">
                        <path
                          d="M26.63 17.4082C25.1852 17.4082 24.0146 18.5787 24.0146 20.0236V22.6391C24.0146 24.084 25.1852 25.2545 26.63 25.2545C28.0749 25.2545 29.2454 24.084 29.2454 22.6391V20.0236C29.2454 18.5787 28.0749 17.4082 26.63 17.4082Z"
                          fill="white" />
                      </mask>
                      <g mask="url(#mask1_8371_24802)">
                        <path d="M40.5614 2.37988H1.05176V41.8903H40.5614V2.37988Z" fill="#1F64FF" />
                      </g>
                    </svg>
                  </div>
                  <div>无忧秘书智脑</div>
                </div>
                <div class="item-nav">
                  <div>全新AI工具箱</div>
                  <div>简单易上手</div>
                </div>
                <div class="item-content">
                  <div>
                    <div>
                      <div>超多功能</div>
                      <div>任意挑选</div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>用AI帮你</div>
                      <div>降本增效</div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>拆解多行业</div>
                      <div>垂直新玩法</div>
                    </div>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="bottom-left">
                    <img :src="httpUrls.ossUrl + userInfo.avatar_url" alt="">
                    <div>
                      <div>我是{{ userInfo.nick_name }}</div>
                      <div>我为无忧秘书智脑代言</div>
                    </div>
                  </div>
                  <div class="bottom-right">
                    <img :src="qrCode" alt="">
                    <div>长按识别二维码即刻体验</div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <!-- 海报 -->
            <div class="poster" ref="imageWrapperTwo">
              <img :src='httpUrls.ossUrl + "static/picture/1f323fc7-374c-45c9-bd85-4dd3d6fdb3cf.png"' alt="">
              <div class="poster-item">
                <div class="item-title">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 42 35" fill="none">
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M10.2286 32.9687C8.55412 32.6099 6.95941 31.5335 6.24179 30.8159C5.52417 30.0982 2.37462 26.5898 2.37462 26.5898C2.01581 26.2709 1.37793 25.5533 1.37793 24.5964C1.37793 23.0814 2.17528 16.3039 2.69356 13.7922C3.21184 11.2805 5.37802 8.83519 5.37802 8.83519C9.75525 4.12118 15.1124 2.54934 15.1124 2.54934C15.511 2.35 15.4363 2.02938 16.109 1.81178C18.1124 1.16392 20.953 1.07422 20.953 1.07422C20.953 1.07422 23.7936 1.16392 25.7969 1.81178C26.4697 2.02938 26.3949 2.35 26.7936 2.54934C26.7936 2.54934 32.1507 4.12118 36.5279 8.83519C36.5279 8.83519 38.6941 11.2805 39.2124 13.7922C39.7307 16.3039 40.528 23.0814 40.528 24.5964C40.528 25.5533 39.8901 26.2709 39.5313 26.5898C39.5313 26.5898 36.3818 30.0982 35.6642 30.8159C34.9465 31.5335 33.3518 32.6099 31.6774 32.9687C30.0029 33.3276 23.8434 34.1648 20.953 34.1648C18.0626 34.1648 11.903 33.3276 10.2286 32.9687ZM16.036 10.3503C13.8566 10.43 11.2253 10.935 10.5343 11.2274C9.8432 11.5198 6.86102 12.5438 6.38803 16.9684C6.14962 19.1989 6.00514 24.5035 6.32161 26.4769C6.83119 29.6546 10.2387 30.9345 13.3184 31.5601C17.1457 32.3375 20.9531 32.198 20.9531 32.198C20.9531 32.198 24.7603 32.3375 28.5876 31.5601C31.6673 30.9345 35.0748 29.6546 35.5844 26.4769C35.901 24.5035 35.7564 19.1988 35.518 16.9684C35.045 12.5438 32.0628 11.5198 31.3718 11.2274C30.6807 10.935 28.0494 10.43 25.87 10.3503C23.6905 10.2705 21.4812 10.2805 20.953 10.2805C20.4247 10.2805 18.2154 10.2705 16.036 10.3503Z"
                          fill="#1F64FF" />
                      </g>
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M2.78541 24.9916C2.78541 24.9916 4.20566 14.5213 4.36513 12.3286C4.5246 10.1358 4.48473 1.7635 4.36513 0.926271C4.24553 0.0890399 3.39834 -0.409312 3.12923 1.20535C2.97167 2.15078 2.00361 8.51406 0.830218 14.1093C0.657431 14.9332 0.378357 16.3552 0.325254 17.219C0.154859 19.9883 0.0675487 22.0601 0.0295947 22.465C-0.0900085 23.7408 0.203418 23.8516 0.433215 24.2143C0.68215 24.607 1.59887 25.6409 1.77373 25.8041C1.96063 25.9785 2.4884 26.3181 2.60098 25.9037C2.72665 25.4412 2.78541 24.9916 2.78541 24.9916Z"
                          fill="#1BDAFF" />
                      </g>
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M39.2181 24.9916C39.2181 24.9916 37.7979 14.5213 37.6384 12.3286C37.4789 10.1358 37.5188 1.7635 37.6384 0.926271C37.758 0.0890399 38.6052 -0.409312 38.8743 1.20535C39.0319 2.15078 39.9999 8.51406 41.1733 14.1093C41.3461 14.9332 41.6252 16.3552 41.6783 17.219C41.8487 19.9883 41.936 22.0601 41.974 22.465C42.0936 23.7408 41.8002 23.8516 41.5704 24.2143C41.3215 24.607 40.4047 25.6409 40.2299 25.8041C40.043 25.9785 39.5152 26.3181 39.4026 25.9037C39.2769 25.4412 39.2181 24.9916 39.2181 24.9916Z"
                          fill="#1BDAFF" />
                      </g>
                      <mask id="mask0_8371_24802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="13" y="17"
                        width="6" height="9">
                        <path
                          d="M15.8839 17.3398C14.4391 17.3398 13.2686 18.5104 13.2686 19.9553V22.5707C13.2686 24.0156 14.4391 25.1861 15.8839 25.1861C17.3288 25.1861 18.4993 24.0156 18.4993 22.5707V19.9553C18.4993 18.5104 17.3288 17.3398 15.8839 17.3398Z"
                          fill="white" />
                      </mask>
                      <g mask="url(#mask0_8371_24802)">
                        <path d="M41.4032 2.30566H1.89355V41.816H41.4032V2.30566Z" fill="#1F64FF" />
                      </g>
                      <mask id="mask1_8371_24802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="24" y="17"
                        width="6" height="9">
                        <path
                          d="M26.63 17.4082C25.1852 17.4082 24.0146 18.5787 24.0146 20.0236V22.6391C24.0146 24.084 25.1852 25.2545 26.63 25.2545C28.0749 25.2545 29.2454 24.084 29.2454 22.6391V20.0236C29.2454 18.5787 28.0749 17.4082 26.63 17.4082Z"
                          fill="white" />
                      </mask>
                      <g mask="url(#mask1_8371_24802)">
                        <path d="M40.5614 2.37988H1.05176V41.8903H40.5614V2.37988Z" fill="#1F64FF" />
                      </g>
                    </svg>
                  </div>
                  <div>无忧秘书智脑</div>
                </div>
                <div class="item-nav">
                  <div>AIGC智能创作平台</div>
                  <div>用无忧秘书智脑就够了</div>
                </div>
                <div class="item-ting">
                  <div>致力于助力企业降本增效</div>
                  <img :src='httpUrls.ossUrl + "static/picture/11c572d7-4835-4101-ae04-eb2582c59b3a.png"' alt="">
                </div>
                <div class="item-content two">
                  <img :src='httpUrls.ossUrl + "static/picture/67ffb03c-0aa7-4bdd-8db2-3208b18a6727.png"' alt="">
                  <div>
                    <img :src='httpUrls.ossUrl + "static/picture/433fbd59-8b6d-4f80-ab6d-9d84b5980c90.png"' alt="">
                    <div>
                      <div>对话,绘画，专属助理</div>
                      <div>应有尽有，释放无限可能</div>
                    </div>
                  </div>
                  <!-- <div>
                    <div>
                      <div>用AI帮你</div>
                      <div>降本增效</div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>拆解多行业</div>
                      <div>垂直新玩法</div>
                    </div>
                  </div> -->
                </div>
                <div class="item-bottom">
                  <div class="bottom-left">
                    <img :src="httpUrls.ossUrl + userInfo.avatar_url" alt="">
                    <div>
                      <div>我是{{ userInfo.nick_name }}</div>
                      <div>我为无忧秘书智脑代言</div>
                    </div>
                  </div>
                  <div class="bottom-right">
                    <img :src="qrCode" alt="">
                    <div>长按识别二维码即刻体验</div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <!-- 海报 -->
            <div class="poster" ref="imageWrapperThree" style="background-color: rgb(4, 8, 3);">
              <!-- <img :src='httpUrls.ossUrl + "static/picture/197f9351-a796-4697-90e2-3c2074c44646.png"' alt=""> -->
              <div class="poster-item">
                <div class="item-title">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 42 35" fill="none">
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M10.2286 32.9687C8.55412 32.6099 6.95941 31.5335 6.24179 30.8159C5.52417 30.0982 2.37462 26.5898 2.37462 26.5898C2.01581 26.2709 1.37793 25.5533 1.37793 24.5964C1.37793 23.0814 2.17528 16.3039 2.69356 13.7922C3.21184 11.2805 5.37802 8.83519 5.37802 8.83519C9.75525 4.12118 15.1124 2.54934 15.1124 2.54934C15.511 2.35 15.4363 2.02938 16.109 1.81178C18.1124 1.16392 20.953 1.07422 20.953 1.07422C20.953 1.07422 23.7936 1.16392 25.7969 1.81178C26.4697 2.02938 26.3949 2.35 26.7936 2.54934C26.7936 2.54934 32.1507 4.12118 36.5279 8.83519C36.5279 8.83519 38.6941 11.2805 39.2124 13.7922C39.7307 16.3039 40.528 23.0814 40.528 24.5964C40.528 25.5533 39.8901 26.2709 39.5313 26.5898C39.5313 26.5898 36.3818 30.0982 35.6642 30.8159C34.9465 31.5335 33.3518 32.6099 31.6774 32.9687C30.0029 33.3276 23.8434 34.1648 20.953 34.1648C18.0626 34.1648 11.903 33.3276 10.2286 32.9687ZM16.036 10.3503C13.8566 10.43 11.2253 10.935 10.5343 11.2274C9.8432 11.5198 6.86102 12.5438 6.38803 16.9684C6.14962 19.1989 6.00514 24.5035 6.32161 26.4769C6.83119 29.6546 10.2387 30.9345 13.3184 31.5601C17.1457 32.3375 20.9531 32.198 20.9531 32.198C20.9531 32.198 24.7603 32.3375 28.5876 31.5601C31.6673 30.9345 35.0748 29.6546 35.5844 26.4769C35.901 24.5035 35.7564 19.1988 35.518 16.9684C35.045 12.5438 32.0628 11.5198 31.3718 11.2274C30.6807 10.935 28.0494 10.43 25.87 10.3503C23.6905 10.2705 21.4812 10.2805 20.953 10.2805C20.4247 10.2805 18.2154 10.2705 16.036 10.3503Z"
                          fill="#1F64FF" />
                      </g>
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M2.78541 24.9916C2.78541 24.9916 4.20566 14.5213 4.36513 12.3286C4.5246 10.1358 4.48473 1.7635 4.36513 0.926271C4.24553 0.0890399 3.39834 -0.409312 3.12923 1.20535C2.97167 2.15078 2.00361 8.51406 0.830218 14.1093C0.657431 14.9332 0.378357 16.3552 0.325254 17.219C0.154859 19.9883 0.0675487 22.0601 0.0295947 22.465C-0.0900085 23.7408 0.203418 23.8516 0.433215 24.2143C0.68215 24.607 1.59887 25.6409 1.77373 25.8041C1.96063 25.9785 2.4884 26.3181 2.60098 25.9037C2.72665 25.4412 2.78541 24.9916 2.78541 24.9916Z"
                          fill="#1BDAFF" />
                      </g>
                      <g style="mix-blend-mode:multiply">
                        <path
                          d="M39.2181 24.9916C39.2181 24.9916 37.7979 14.5213 37.6384 12.3286C37.4789 10.1358 37.5188 1.7635 37.6384 0.926271C37.758 0.0890399 38.6052 -0.409312 38.8743 1.20535C39.0319 2.15078 39.9999 8.51406 41.1733 14.1093C41.3461 14.9332 41.6252 16.3552 41.6783 17.219C41.8487 19.9883 41.936 22.0601 41.974 22.465C42.0936 23.7408 41.8002 23.8516 41.5704 24.2143C41.3215 24.607 40.4047 25.6409 40.2299 25.8041C40.043 25.9785 39.5152 26.3181 39.4026 25.9037C39.2769 25.4412 39.2181 24.9916 39.2181 24.9916Z"
                          fill="#1BDAFF" />
                      </g>
                      <mask id="mask0_8371_24802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="13" y="17"
                        width="6" height="9">
                        <path
                          d="M15.8839 17.3398C14.4391 17.3398 13.2686 18.5104 13.2686 19.9553V22.5707C13.2686 24.0156 14.4391 25.1861 15.8839 25.1861C17.3288 25.1861 18.4993 24.0156 18.4993 22.5707V19.9553C18.4993 18.5104 17.3288 17.3398 15.8839 17.3398Z"
                          fill="white" />
                      </mask>
                      <g mask="url(#mask0_8371_24802)">
                        <path d="M41.4032 2.30566H1.89355V41.816H41.4032V2.30566Z" fill="#1F64FF" />
                      </g>
                      <mask id="mask1_8371_24802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="24" y="17"
                        width="6" height="9">
                        <path
                          d="M26.63 17.4082C25.1852 17.4082 24.0146 18.5787 24.0146 20.0236V22.6391C24.0146 24.084 25.1852 25.2545 26.63 25.2545C28.0749 25.2545 29.2454 24.084 29.2454 22.6391V20.0236C29.2454 18.5787 28.0749 17.4082 26.63 17.4082Z"
                          fill="white" />
                      </mask>
                      <g mask="url(#mask1_8371_24802)">
                        <path d="M40.5614 2.37988H1.05176V41.8903H40.5614V2.37988Z" fill="#1F64FF" />
                      </g>
                    </svg>
                  </div>
                  <div>无忧秘书智脑</div>
                </div>
                <div class="item-nav">
                  <div>找我帮你解决问题</div>
                </div>
                <img class="content-img"
                  :src='httpUrls.ossUrl + "static/picture/932c6c7d-a295-4e17-aa8b-1894ef59af41.png"' alt="">
                <div class="item-bottom">
                  <div class="bottom-left">
                    <img :src="httpUrls.ossUrl + userInfo.avatar_url" alt="">
                    <div>
                      <div>我是{{ userInfo.nick_name }}</div>
                      <div>我为无忧秘书智脑代言</div>
                    </div>
                  </div>
                  <div class="bottom-right">
                    <img :src="qrCode" alt="">
                    <div>长按识别二维码即刻体验</div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="shareBtn">
          <el-button type="primary" @click="handleDownload">分享海报</el-button>
        </div>
        <div class="right-Link">
          <div>{{ codeLink }}</div>
          <el-button plain style="position: relative;left: 50%;transform: translate(-50%);"
            @click="copyText">复制邀请链接</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUrls from '../api/requestURL';
import { queryQRCode } from '../api/distribution';
import html2canvas from "html2canvas";
export default {
  name: "share",
  data() {
    return {
      httpUrls,
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      qrCode: "",  //二维码
      codeLink: '', //链接
      captureIndex: 0, //海报下标
    }
  },
  created() {
    this.queryQRCode(1)
    this.queryQRCode(2)
  },
  methods: {
    //生成二维码和链接
    queryQRCode(type) {
      queryQRCode({ "q_type": type, source: httpUrls.source }).then(res => {
        if (type == 1) {
          this.qrCode = httpUrls.ossUrl + res.data;
        } else {
          let data = res.data.split('?')
          this.codeLink = data[0] + '/#/index?' + data[1]
        }

      })
    },
    // 复制链接
    copyText() {
      var input = document.createElement("input"); // 创建input对象
      input.value = this.codeLink; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message.success('复制成功！');
    },
    //切换走马灯
    handleCarousel(a, b) {
      this.captureIndex = a;
    },
    // 下载海报
    handleDownload() {
      let ref = null;
      if (this.captureIndex == 0) {
        ref = this.$refs.imageWrapperOne;
      } else if (this.captureIndex == 1) {
        ref = this.$refs.imageWrapperTwo;
      } else if (this.captureIndex == 2) {
        ref = this.$refs.imageWrapperThree;
      }
      html2canvas(ref, { useCORS: true, scale: 2, dpi: 300, }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        // this.imgUrl = dataURL
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "无忧秘书智脑"; // 设置图片名称
        a.href = dataURL; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      });
    }
  },
}
</script>

<style scoped>
.el-icon-present{
  /* background: red; */
  font-size:25px;
}
.go-back {
  cursor: pointer;
  position: relative;
  left: 56px;
  top: 50px;
}

.go_back-item-on {
  display: flex;
  transition: all .2s;
}

.main {
  width: 100%;
  height: 100%;
  padding: 50px;
  margin-top: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 70%;
  height: 100%;
}

.left-title div:first-child {
  font-size: 30px;
  font-weight: bold;
  font-family: PingFang SC;
}

.left-title div:last-child {
  font-size: 20px;
}

.left-card {
  margin-top: 60px;
  width: 100%;
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgb(255, 253, 245);
}

.card-title {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-title img {
  width: 25px;
  height: 20px;
  background: green;
}
.left-card >div:first-child div {
  margin-left: 5px;
}
.left-card>div:last-child {
  margin: 15px 0px;
}

.left-prompt {
  margin: 20px 0px;
}

.left-prompt>div:first-child {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 10px;
}

.left-prompt>div:first-child .el-icon-present {
  /* width: 25px;
  height: 20px; */
  margin-right: 5px;
}

.left-step>div:first-child {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.right {
  width: 27%;
  height: 100%;
}

.el-carousel__item {
  width: 167px !important;
}

.poster {
  width: 167px;
  height: 100%;
  position: relative;
}

.poster>img {
  width: 100%;
  height: 100%;
  position: absolute;
}

.poster-item {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  color: white;

}

/* .poster-item>img {
  width: 100%;
  height: 60px;
  position: absolute;
} */

.item-title {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
}

.item-title>div:first-child {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: #FFF;
  padding: 1px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.item-title>div:last-child {
  color: #FFF;
  font-family: PingFang SC;
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 42px */
}

.item-nav {
  margin: 8px auto;
  width: 100%;
  text-align: center;
  font-family: YouSheBiaoTiHei;
  font-weight: 600;
  font-size: 16px;
}

.item-nav>div:first-child {
  background: linear-gradient(90deg, #D2FFFA 0.02%, #78FF84 22.45%, #30FFD7 55.78%, #BDF8FD 102.37%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
}

.item-nav>div:last-child {
  color: #D2FFFA;
}

.item-ting {
  width: 100%;
  height: 116px;
  position: relative;
  z-index: 10;
}

.item-ting div:first-child {
  width: 65%;
  /* height: 15px; */
  padding: 3px 5px;
  box-sizing: border-box;
  position: relative;
  font-size: 7px;
  text-align: center;
  background: #1F64FF;
  left: 50%;
  transform: translate(-50%);
}

.item-ting img {
  width: 100%;
  height: 140px;
  position: absolute;
  /* left: 58%; */
  top: -5px;
  /* transform: translate(-50%); */
}

.content-img {
  position: relative;
  width: 100%;
  height: 168px;
}

.item-content.two {
  margin-top: 0px;
}

.item-content {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #1F64FF;
  font-family: PingFang SC;
  font-size: 7px;
  margin-top: 125px;
  position: relative;
}

.item-content>div {
  width: 30%;
  height: 35px;
  background-color: white;
  border-radius: 3px;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.item-content.two>div {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 8px 5px;
  background-color: rgb(2, 13, 38);
  color: white;
  position: relative;
}

.item-content.two>img {
  position: absolute;
  z-index: 10;
  right: 10px;
  bottom: 0px;
  width: 30px;
  height: 26px;
}

.item-content.two>div img {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}

.item-content.two>div>div:last-child {}

.item-bottom {
  width: 100%;
  height: 70px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 7px;
  display: flex;
  justify-content: space-between;
}

.bottom-left {
  width: 65%;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
}

.bottom-left img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
}

.bottom-left>div div:first-child {
  color: white;
  font-size: 7px;
  margin-bottom: 5px;
}

.bottom-left>div div:last-child {
  font-size: 5px;
  color: rgba(255, 255, 255, 0.80);
}

.bottom-right {
  width: 30%;
  height: 100%;
  font-size: 4px;
  position: relative;
}

.bottom-right img {
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  top: 0px;
  right: 0px;
}

.bottom-right>div:last-child {
  position: absolute;
  bottom: 3px;
  right: 0px;
  width: 50px;
}

.shareBtn {
  margin-top: 20px;
  text-align: center;
}

.right-Link {
  width: 100%;
  margin-top: 60px;
  position: relative;
}

.right-Link>div:first-child {
  width: 60%;
  margin: auto;
  padding: 5px 8px;
  background-color: #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-bottom: 20px;
}
</style>


<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>