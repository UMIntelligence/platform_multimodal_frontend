<template>
  <div class="version" id="version">
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
    <div class="header">
      <el-radio-group v-model="tabRadios">
        <el-radio-button label="版本信息"></el-radio-button>
        <el-radio-button label="消息中心"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="list" v-if="tabRadios == '版本信息'">
      <div class="box" v-for="(item,index) in versionList" :key="index">
        <div class="left">
          <div class="left-circle"></div>
          <div class="left-line"></div>
        </div>
        <div class="right">
          <div class="time">{{item.title}}</div>
          <div class="describe">
            <div class="describe-title"><span v-if="index == 0" class="describe-circle"> </span>{{item.version}}版本</div>
            <div class="describe-text" v-for="(text,index) in item.content" :key="index">{{text.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="list" v-else>
      <div class="box" v-for="(item, index) in noticeList" :key="index">
        <div class="left">
          <div class="left-circle"></div>
          <div class="left-line"></div>
        </div>
        <div class="right" @click="readNotice(item)">
          <div class="time">{{ handlerTime(item) }}</div>
          <div class="describe">
            <div class="describe-title">
              <span v-if="index == 0" class="describe-circle"> </span
              >{{ item.title }}
            </div>
            <div
              class="describe-text"
            >
              {{ item.desc }}...
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { messageCenter, messageCenterState } from "@/api/notice";
import { mapGetters } from "vuex";
import httpUrls from "@/api/requestURL";
export default {
  name: "notice-index",
  data() {
    return {
      tabRadios:'版本信息',
      noticeList: [],
      userInfo: {},
      pageNum: 1,
      pageSize: 10,
      totalPage: 0,
      versionList: [
      {
          title: '2024/8/16',
          version:"v11.0.0",
          content: [
            { title: '1.无忧秘书智脑完成全新界面改版，实现功能分类更聚合、更清晰。', style: '' },
            { title: '2.首页成功新增智能体板块，拥有多种不同场景能力', style: '' },
            { title: '3.已将图片处理相关功能集成至 “绘画” 分区。', style: '' },
            { title: '4.新增 “音频”“视频” 分区，全面囊括 AI 音频、AI 视频、短视频创作能力。', style: '' },
            { title: '5.新增 “AI 创作” 分区，包含 AI PPT、AI 文档理解、语音合成等多个 AI 创作功能', style: '' },
            { title: '6.实验室相关功能集成至 “更多” 分区。', style: '' },
            { title: '7.实验室板块新增 “视频”“音频” 分类，涵盖 AI 创作视频（runway、pika、pixverse）、AI 创作音乐（Suno）。', style: '' },
          ]
        },
        {
          title: '2024/7/30',
          version:"v7.2.6",
          content: [
            { title: '1.智能体功能全新升级，支持具备多种AI能力的智能体。', style: '' },
            { title: '2.全新上线AI PPT功能，输入提示词或上传文档即可一键生成PPT', style: '' },
          ]
        },
        {
          title: '2024/7/23',
          version:"v7.2.5",
          content: [
            { title: '1、算力计价体系已全面升级为会员功能。', style: '' },
            { title: '2、商城全新上线会员套餐，用户可在商城内一站式购买会员服务与 AI 创作服务。', style: '' },
            { title: '3、AI 对话模型迎来更新，目前涵盖了多款免费的 AI 对话模型，同时还有更为强大的多款付费 AI 模型，以及多款无忧秘书 umi bot 模型。', style: '' },
            { title: '4、智能体功能升级，即将支持具备多种 AI 能力的智能体。修复了 AI 绘画功能的部分 bug 。', style: '' },
          ]
        },
        {
          title: ' 2024/2/29',
          version:"V7.2.4",
          content: [
            { title: '1、优化了声音克隆付费后未使用情况下再次进入的一些bug', style: '' },
            { title: '2、提升了对话和绘画页面的UI体验', style: '' },
            { title: '3、优化了AI数字孪生中的一些问题', style: '' },
            { title: '4、若干细节优化', style: '' },
          ]
        },
        {
          title: ' 2024/2/21 ',
          version:"V7.2.3 ",
          content: [
            { title: '1、优化了语音合成中的一些问题 新增计价规则', style: '' },
            { title: '2、修复了左侧导航栏有时默认展开的问题', style: '' },
            { title: '3、优化了一些按钮的交互体验', style: '' },
            { title: '3、修复了若干bug', style: '' },
          ]
        },
        {
          title: '2024/2/3',
          version:"V7.2.2  ",
          content: [
            { title: '1、优化了对话完之后的引导细节，包括继续提问和关联选择等', style: '' },
            { title: '2、调整了部分按钮和图标的UI细节，提升视觉体验', style: '' },
            { title: '3、修改了AI绘画中百度绘画和火山引擎的展示问题，包括极简模式和文生图', style: '' },
          ]
        },
        {
          title: '2024/1/29',
          version:"V7.2.1  ",
          content: [
            { title: '1、优化了声音克隆功能相关细节，调整了一些布局', style: '' },
            { title: '2、修改了AI直播数字人里面的问题，包括首次进入后的显示记录错误等', style: '' },
            { title: '3、修改了实名认证无法使用的问题', style: '' },
            { title: '4、修复了若干bug，提升了使用体验', style: '' },
          ]
        },
        {
          title: '2024/1/24',
          version:"V7.2.0  ",
          content: [
            { title: '1、全新升级了声音克隆功能，轻松3步复刻高品质真人声音', style: '' },
            { title: '2、优化了AI知识库创建智能体时的相关细节，保障使用体验', style: '' },
            { title: '3、调整了AI资讯的排版和丰富内容', style: '' },
            { title: '4、优化了多模型对话中的一些细节，包括对话完的提醒和引导', style: '' },
            { title: '5、修复了之前若干的bug', style: '' },
          ]
        },
        {
          title: '2024/1/22',
          version:"V7.1.1   ",
          content: [
            { title: '1、优化了AI知识库、智能体的相关功能，提升了体验感', style: '' },
            { title: '2、修复了之前的若干bug，包括部分功能首页的入口优化，图片/视频处理的展示升级，新增了AI资讯的相关联系方式等', style: '' },
          ]
        },
        {
          title: '2024/1/20',
          version:"V7.1.0   ",
          content: [
            { title: '1、全新上线AI知识库功能，包含智能体、库管理等多种玩法，高效出圈', style: '' },
            { title: '2、优化了绘画页面的分类展示和布局 删除了无法使用的两类风格（人像写真、摄影）及其他细节优化', style: '' },
            { title: '3、部分功能的图标优化升级', style: '' },
            { title: '4、首页AI实验室新增了DALL.E3绘图模型', style: '' },
            { title: '5、修复了之前的bug 提升产品的体验', style: '' },
          ]
        },
        {
          title: '2023/1/13',
          version:"V7.0.5  ",
          content: [
            { title: '1、看图说话的模型替换为讯飞图片理解，全面提升速度', style: '' },
            { title: '2、新增了视频处理的功能-视频封面生成，一键生成有吸引力的封面', style: '' },
            { title: '3、修复了一些以前的问题，AI实验室中计价和开启新会话的位置调整，提示词大全中部分页面的展示异常等', style: '' },
          ]
        },
        {
          title: '2023/1/11',
          version:"V7.0.4",
          content: [
            { title: '1、新增了16个图片处理的功能，图像理解、智能美颜等能力应有尽有', style: '' },
            { title: '2、首页全新优化，对导航栏进行了调整', style: '' },
            { title: '3、修复了一些存在的bug，解决了看图说话有时候无法使用的问题，对话页面选择继续该对话的调整等', style: '' },
          ]
        },
        {
          title: '2024/1/10',
          version:"V7.0.3  ",
          content: [
            { title: '1、优化了首页内的功能分类 热门推荐/优选能力/AI工具集/AI超级能力/AI实验室应有尽有', style: '' },
            { title: '2、优化了绘画页面的分享按钮位置和历史记录的收起展开按钮', style: '' },
            { title: '3、丰富了AI资讯内的栏目下新闻种类数量', style: '' },
            { title: '4、新增了某些场景如登录时的安全保障，解决了部分按钮点击无反应及其他若干bug', style: '' },
          ]
        },
        {
          title: '2024/1/9',
          version:"V7.0.2 ",
          content: [
            { title: '1、优化了看图说话的展示效果', style: '' },
            { title: '2、丰富了视频/图片处理的功能种类和内容', style: '' },
            { title: '3、修复了其他的一些bug', style: '' },
          ]
        },
        {
          title: '2024/1/8 ',
          version:"V7.0.1 ",
          content: [
            { title: '1、首页细节调整优化', style: '' },
            { title: '2、优化了对话和绘画页面的展示效果', style: '' },
            { title: '3、其他若干细节优化，提升使用体验', style: '' },
            { title: '4、修复了已知的问题', style: '' },
          ]
        },
        {
          title: '2024/1/6',
          version:"V7.0.0 ",
          content: [
            { title: '1、首页导航栏全新升级 功能更加清晰丰富', style: '' },
            { title: '2、优化了火山云雀和腾讯混元模型的页面兼容问题', style: '' },
            { title: '3、优化了最近访问的展示效果', style: '' },
            { title: '4、新增了AI工具集和AI超级能力 超多实用工具', style: '' },
            { title: '5、修复了已知bug，优化了产品体验', style: '' },
          ]
        },
        {
          title: '2024/1/4',
          version:"V6.5.1",
          content: [
            { title: '1、首页细节优化 新增最近访问', style: '' },
            { title: '2、新增ai对话的两个语言模型', style: '' },
            { title: '3、丰富了提示词广场的内容', style: '' },
            { title: '4、优化了若干bug', style: '' },

          ]
        },
        {
          title: '2024/1/3',
          version:"V6.5.0 ",
          content: [
            { title: '1、首页及导航栏全新升级优化', style: '' },
            { title: '2、优化了提示词广场 内容丰富开启畅聊', style: '' },
            { title: '3、购买页面全新升级为AI商城', style: '' },
            { title: '4、修复了一些其他的问题', style: '' },

          ]
        },
        {
          title: '2023/12/30',
          version:"V6.4.4 ",
          content: [
            { title: '1、优化了多模型对话的页面', style: '' },
            { title: '2、新增了AI资讯分类 速览AI实事', style: '' },
            { title: '3、修复了一些已知的问题', style: '' },
          ]
        },
        {
          title: '2023/12/23',
          version:"V6.4.3 ",
          content: [
            { title: '1、优化对话和绘画功能 ', style: '' },
            { title: '2、优化智能直播的藏头诗和艺术姓氏头像功能 畅享趣味玩法', style: '' },
            { title: '3、修改了若干问题 带给您更佳的使用体验', style: '' },
          ]
        },
        {
          title: '2023/12/15',
          version:"V6.4.2 ",
          content: [
            { title: '1、新增能力页面 让想象力成为创作力！', style: '' },
            { title: '2、丰富视觉体验馆功能 释放视觉生产的无限可能', style: '' },
            { title: '3、新增多模型对话页面  沉浸式体验群聊', style: '' },
            { title: '4、新增语音合成 一键畅听！', style: '' },
            { title: '5、修复了若干问题，优化使用', style: '' },
          ]
        },
        {
          title: '2023/12/13',
          version:"V6.4.1  ",
          content: [
            { title: '1、优化文档对话功能', style: '' },
            { title: '2、购买套餐页面问题修复', style: '' },
          ]
        },
        {
          title: '2023/12/10',
          version:"V6.4.0 ",
          content: [
            { title: '1、首页视觉全面优化，等你来体验', style: '' },
            { title: '2、新增视觉馆部分功能', style: '' },
            { title: '3、优化了服务商页面，畅享尊贵身份', style: '' },
            { title: '4、修复了若干bug', style: '' },
          ]
        },
        {
          title: '2023/12/6',
          version:"V6.3.2 ",
          content: [
            { title: '1、视觉体验馆更名AI视觉馆，并优化体验', style: '' },
            { title: '2、修复了若干问题，优化使用', style: '' },

          ]
        },
        {
          title: '2023/12/3',
          version:"V6.3.1 ",
          content: [
            { title: '1、优化AI顾问  畅享全新生活助理', style: '' },
            { title: '2、修复了若干bug，提升你的使用体验', style: '' },

          ]
        },
        {
          title: '2023/11/30',
          version:"V6.3 ",
          content: [
            { title: '1、首页视觉优化升级', style: '' },
            { title: '2、新增视觉体验馆功能 释放想象力', style: '' },
            { title: '3、新增AI顾问 畅想无忧生活', style: '' },
            { title: '4、修复了以前的问题 改善体验 ', style: '' },

          ]
        },
        {
          title: '2023/11/26',
          version:"V6.2.3 ",
          content: [
            { title: '1、优化AI资讯功能  畅快浏览AI时事', style: '' },
            { title: '2、优化了一些页面的细节', style: '' },
            { title: '3、修复了若干bug，提升你的使用体验', style: '' },
          ]
        },
        {
          title: '2023/11/21',
          version:"V6.2.2 ",
          content: [
            { title: '1、优化AI绘画功能', style: '' },
            { title: '2、优化了一些页面的细节', style: '' },
            { title: '3、修复了若干bug，提升你的使用体验', style: '' },
          ]
        },
        {
          title: '2023/11/17',
          version:"V6.2.1 ",
          content: [
            { title: '1、优化AI实验室功能 保障您的体验', style: '' },
            { title: '2、优化对话页面', style: '' },
            { title: '3、修复了其他的一些问题，改善体验', style: '' },
          ]
        },
        {
          title: '2023/11/14',
          version:"V6.2.0 ",
          content: [
            { title: '1、首页视觉全新升级', style: '' },
            { title: '2、新增AI实验室功能', style: '' },
            { title: '3、导师模块优化', style: '' },
            { title: '4、AI对话新增360智脑模型', style: '' },
            { title: '5、AI绘画新增通义万相、火山引擎模型', style: '' },
            { title: '6、计费中心优化', style: '' },
            { title: '7、问题修复及性能优化，改进用户体验', style: '' },

          ]
        },
        {
          title: '2023/09/07',
          version:"V5.3 ",
          content: [
            { title: '1、新增企业AI定制', style: '' },
            { title: '2、修复一些已知bug', style: '' },
          ]
        }, {
          title: '2023/08/25',
          version:"V5.2 ",
          content: [
            { title: '1、应用助理页面优化', style: '' },
            { title: '2、首页优化+使用记录', style: '' },
            { title: '3、优化展示会员VIP支付，通用包流量包隐藏', style: '' },
            { title: '4、识万物功能', style: '' },
          ]
        }, {
          title: '2023/08/18',
          version:"V5.1 ",
          content: [
            { title: '1、音视频转写（文件转写）', style: '' },
            { title: '2、四维彩超', style: '' },
            { title: '3、数字人定制（形象克隆、声音克隆）', style: '' },
            { title: '4、修复一些bug', style: '' },
          ]
        }, {
          title: '2023/08/10',
          version:"V5.0 ",
          content: [
            { title: '1、新增SD图生图功能', style: '' },
            { title: '2、新增AI识图功能', style: '' },
            { title: '3、新增通义千问、商汤日日新模型', style: '' },
            { title: '4、优化一些问题（首页优化、聊天优化、彩虹绘画优化、用户信息修改等）', style: '' },
          ]
        }, {
          title: '2023/07/31',
          version:"V3.2.0 ",
          content: [
            { title: '1、新增企业营销资产模块', style: '' },
            { title: '2、新增名人互动模块', style: '' },
            { title: '3、新增用户创建问题集模块', style: '' },
            { title: '4、新增Stable Diffusion模型', style: '' },
            { title: '4、优化一些问题（阿里云敏感词过滤、应用助理详细页优化、绘画图片预览等）', style: '' },
            { title: '5、修复一些bug', style: '' },
          ]
        }, {
          title: '2023/07/14',
          version:"V3.1.0 ",
          content: [
            { title: '1、新增Claude、chatGLM模型', style: '' },
            { title: '2、优化应用助理场景模块功能', style: '' },
            { title: '3、新增问答广场功能', style: '' },
            { title: '4、优化一些问题', style: '' },
            { title: '5、修复一些bug', style: '' },
          ]
        }, {
          title: '2023/07/07',
          version:"V3.0 ",
          content: [
            { title: '1、web新增首页', style: '' },
            { title: '2、公告管理', style: '' },
            { title: '3、聊天新增问题集词库', style: '' },
            { title: '4、彩虹绘画新增图片案例', style: '' },
            { title: '5、用户助理新增详情功能', style: '' },
            { title: '5、优化计费中心页面', style: '' },
            { title: '6、新增积分换算功能', style: '' },
            { title: '7、优化历史对话页', style: '' },
            { title: '8、优化一些问题', style: '' },
          ]
        }, {
          title: '2023/6/30',
          version:"V2.2.2 ",
          content: [
            { title: '1、新增文心一言、讯飞火星、Midjourney功能', style: '' },
            { title: '2、优化一些问题', style: '' },
            { title: '个人中心菜单栏优化', style: 'margin-left: 18px' },
            { title: '订单记录显示优化', style: 'margin-left: 18px' },
            { title: '剩余次数显示优化', style: 'margin-left: 18px' },
            { title: '3、修复一些体验bug', style: '' },
          ]
        }, {
          title: '2023/6/27',
          version:"V2.2.1 ",
          content: [
            { title: '1、新增通用包功能', style: '' },
            { title: '购买通用包全平台通用包，各模型均可使用', style: 'margin-left: 18px' },
            { title: '2、优化一些问题', style: '' },
            { title: '我要分销的图标更新', style: 'margin-left: 18px' },
            { title: 'web页面自适应问题', style: 'margin-left: 18px' },
            { title: '升级钻石分销页面plus改为钻石', style: 'margin-left: 18px' },
            { title: '钻石分销展示有效期时间等信息', style: 'margin-left: 18px' },
            { title: '我要分销页面，更多内容排序（分销邀请、升级分销、分佣说明、提佣记录、分拥说明）', style: 'margin-left: 18px' },
            { title: '分销邀请提示登入', style: 'margin-left: 18px' },
            { title: 'web端对话时复制回答内容，内容排版优化', style: 'margin-left: 18px' },
            { title: '个人中心添加卡密、商务合作等模块', style: 'margin-left: 18px' },
            { title: '次数用尽提示语优化', style: 'margin-left: 18px' },
            { title: '剩余次数模块优化等问题', style: 'margin-left: 18px' },
          ]
        }, {
          title: "2023/6/25",
          version:"V2.2 ",
          content: [
            { title: "1、新增分销模块包含", style: '' },
            { title: "新增营销入口功能（用户通过营销入口进入到营销页面）", style: 'margin-left: 18px' },
            { title: "升级钻石分销功能", style: 'margin-left: 18px' },
            { title: "佣金统计记录功能（包含统计全部佣金总和，分销用户成员统计，可提现金额统计）", style: 'margin-left: 18px' },
            { title: "提现功能（包含绑定银行卡功能，提现金额申请，提现历史记录）", style: 'margin-left: 18px' },
            { title: "我的成员功能（展示分销用户头像、昵称、分销时间）", style: 'margin-left: 18px' },
            { title: "我的订单列表和订单明细功能", style: 'margin-left: 18px' },
            { title: "分销分享功能（分销二维码或分销链接两种分销方式）", style: 'margin-left: 18px' },
            { title: "2、分享功能", style: '' },
            { title: "分销二维码或分销链接两种分销方式", style: 'margin-left: 18px' }]
        }, {
          title: "2023/6/20",
          version:"V2.1.1 ",
          content: [
            { title: "1、优化流量包数量价格用量联动，新增有效期时间、剩余次数优化，新增流量加购等超链接。", style: '' },
          ]
        }, {
          title: "2023/6/19",
          version:"V2.1 ",
          content: [
            { title: "1、新增流量包：我们对（AI35、AI40、百度绘画、DALL E2)产品单独推出流量包购买服务，用户单独购买无限制使用流量包", style: '' },
            { title: "2、优化订单页面：优化套餐类型（VIP订单、流量包订单），新增订单详情页，可查看订单详情。", style: '' },
            { title: "3、优化使用记录页面：优化WEB端菜单栏图标，优化（AI35、AI40、百度绘画、DALL E2)图标，优化输入框按钮居中，新增本次回答(优化按钮)、修改618结束活动价格等", style: '' },
            { title: "4、修复一些问题：1、彩虹绘画中点击切换到百度绘画，上方历史记录不会自动跳转，2、彩虹绘画，生成图片点赞，再当前页面再生成图片时，上方点赞自动消失等", style: '' }]
        }, {
          title: "2023/6/13",
          version:"V2.0 ",
          content: [
            { title: "1、添加应用助理功能模块", style: '' }
          ]
        }, {
          title: "2023/6/8",
          version:"V1.4 ",
          content: [
            { title: "1、修复一些问题", style: '' },
            { title: "2、去掉2天2.9会员卡逻辑功能", style: '' }]
        }, {
          title: "2023/6/6",
          version:"V1.3 ",
          content: [
            { title: "1、添加2天2.9会员卡逻辑功能", style: '' },
            { title: "2、商务合作页面改版即添加合作类型选择功能", style: '' },
            { title: "3、优化页面整体样式和页面适配功能", style: '' }]
        }, {
          title: "2023/6/5",
          version:"V1.2.1 ",
          content: [{ title: "1、修复一些问题", style: '' },]
        }, {
          title: "2023/6/1",
          version:"V1.2 ",
          content: [
            { title: "1、修复一些问题", style: '' },
            { title: "2、添加对话中‘重新提问’、‘重新回答’、‘停止回答’按钮功能", style: '' }]
        }, {
          title: "2023/5/31",
          version:"V1.1 ",
          content: [
            { title: "1、优化对话、绘画", style: '' },
            { title: "2、绘画模块添加图文生图、下载功能", style: '' },
            { title: "3、添加游客、非游客赠送次数以及登录注册、开通Vip提示功能", style: '' },
            { title: "4、添加卡密兑换功能", style: '' },
            { title: "5、添加操作指南页面、商务合作页面功能", style: '' },
            { title: "6、修复适配和部分页面样式", style: '' }]
        }, {
          title: "2023/5/26",
          version:"V1.01 ",
          content: [
            { title: "1、修复一些问题", style: '' },
            { title: "2、优化页面样式及适配", style: '' }]
        }, {
          title: "2023/5/25",
          version:"V1.0 ",
          content: [{ title: "1、登录/注册、对话、绘画、个人中心、升级Vip、订单记录、回答历史、升级会员手机号绑定主流程、联系客服功能", style: '' }]
        }]
    };
  },
  computed: {
    ...mapGetters(["noticeReadAll"]),
  },
  watch: {
    noticeReadAll: {
      deep: true,
      handler() {
        if (this.noticeReadAll == 1) {
          this.queryMessageCenter();
        }
      },
    },
    tabRadios: {
      deep: true,
      handler() {
        // if (this.tabRadios == '版本信息') {
        //    this.$router.push('/version/version')
        // }
      },
    },
  },
  mounted() {
    document.title = httpUrls.name;
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.queryMessageCenter();
  },
  methods: {
    readAll() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      messageCenterState({ user_id: userInfo.user_id }).then((res) => {
        if (res.code == 20000) {
          this.$store.dispatch("user/changeNoticeReadAll", 1);
        } else {
          this.$message.error("网络异常，请稍后重试");
        }
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryMessageCenter();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.queryMessageCenter();
    },
    handlerTime(item){
      let date = new Date(item.create_time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return year + '-' + month + '-' + day
    },

    // 公告列表
    queryMessageCenter() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let data = {
        user_id: userInfo.user_id,
        page_index: this.pageNum,
        page_count: this.pageSize,
      };
      messageCenter(data).then((res) => {
        console.log(res);
        this.noticeList = res.data;
        this.totalPage = Number(res.total);
        res.data.forEach((v) => {
          if (v.is_read == "0") {
            this.$store.dispatch("user/changeNoticeReadAll", 0);
          }
        });
      });
    },

    // 前往公告详情
    readNotice(item) {
      let data = {
        user_id: this.userInfo.user_id,
        message_ids: [item.message_id],
      };
      if (item.is_read != 1) {
        messageCenterState(data).then((res) => {
          if (res.code == 20000) {
          } else {
            this.$message.error("网络异常，请稍后重试");
          }
        });
      }
      this.$router.push({
        path: "/noticeIndex/detail",
        query: { id: item.message_id },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header{
  display: flex;
  justify-content: center;
}
.go-back {
  cursor: pointer;
  position: absolute;
  left: 40px;
  top: 30px;
}

.go_back-item-on {
  display: flex;
  transition: all .2s;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
}

.version {
  width: 100%;
  position: relative;
  background: #F5F5F7;
  padding-top: 30px;
}
.list{
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  margin: auto;
  padding-bottom: 40px;
  .box:first-child{
    .left-circle{
      border: 2px solid #003FFF !important;
    }
  }
  .box:last-child{
    .left-line{
      opacity: 0;
    }
  }
  .box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .left{
      position: relative;
      .left-circle{
        width: 8px;
        height: 8px;
        background: #FFFFFF;
        border-radius: 50%;
        border: 2px solid #E5E5E5;
        z-index: 10;
        margin-top: 5px;
      }
      .left-line{
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 110%;
        top: 17px;
        border-left: 2px solid #E5E5E5;
      }
    }
    .right{
      width: calc(100% - 12px - 21px);
      .time{
        font-weight: bold;
        font-size: 14px;
        color: #797B80;
        margin-bottom: 8px;
        line-height: 21px;
      }
      .describe{
        width: 100%;
        padding: 14px 20px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 16px 16px 16px 16px;
        .describe-title{
          font-weight: bold;
          font-size: 16px;  
          color: #000000;
          margin-bottom: 5px;
          .describe-circle{
            width: 6px;
            height: 6px;
            background: #F40000;
            display: inline-block;
            border-radius: 50%;
            position: relative;
            top: -2px;
            margin-right: 8px;
          }
        }
        .describe-text{
          font-weight: 400;
          font-size: 14px;
          color: #797B80;
          line-height: 21px;
        }
      }
    }
  }
}
</style>
<style>
.version_mask {
  margin: 20px 10% 0 10%;
  padding: 0 10px;
  padding-bottom: 10px;
  border-radius: 4px;
}

.version_mask .el-collapse-item__header {
  background-color: #F6F8FB;
}

.version_mask .text {
  font-size: 14px;
}

.version_mask .item {
  margin-bottom: 18px;
}

.version_mask .clearfix:before,
.version_mask .clearfix:after {
  display: table;
  content: "";
}

.version_mask .clearfix:after {
  clear: both
}

.version_mask .box-card {
  width: 480px;
}

.version_mask .stepsStep .el-step__icon {
  width: 20px;
  height: 20px;
}

.version_mask .stepsStep .el-step__icon i {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #409EFF;
}

.version_mask .stepsStep .el-step__icon i::before {
  content: '';
}

.version_mask .stepsStep .el-step__main .el-step__title {
  color: #000000;
}

.version_mask .stepsStep .el-step__main .el-step__description {
  color: #aaaaaa;
}
</style>