<template>
	<view id="chat">
		<scroll-view ref="box" class="u-page" scroll-with-animation scroll-y="true" id="textadd" :style='{ height: msgListHeight}'>
			<u-row align="top" gutter="5">
				<u-col span="1.5" textAlign="center" align="top" justify="top">
					<image style="height: 38px;width: 38px;  border-radius: 50%;"
						:src="glmImg">
					</image>
				</u-col>
				<u-col soan='9'>
					<view class="tips">
						<view style="font-size: 17px;">欢迎来到文档对话，上传文档我即可进行文档内容的学习，开始上传文档试试吧！</view>
						<view class="document_btn" v-if="isDoc" @click="uploadFile">上传文档</view>
						<view class="document_type" v-if="isDoc">支持文件类型:pdf，txt，doc，md</view>
						<view class="document_name" v-if="!isDoc">
							<image style="height: 26px;width: 26px;" :src="glmImg">
							</image>
							<text class="document_text">{{ documetName }}</text>
							<!-- <u-icon name="trash" color="#999" size="20" @click="delDocument"></u-icon> -->
						</view>
					</view>
				</u-col>
			</u-row>
			<view scroll-with-animation  v-for="item,index in messageList[listName]" :key="index" class="listItem" :anchor="index">

				<u-row align="top" gutter="5">
					<u-col span="1.5" textAlign="center" align="top" justify="top">
						<image style="height: 38px;width: 38px;  border-radius: 50%;"
							:src="item.type=='assistant'? glmImg :avatar">
						</image>
					</u-col>
					<u-col soan='9'>
						<view v-if="item.type=='assistant'">
							<!-- {{item.code}} -->
							<view class="tips" v-html='item.talk' v-if='index===0'></view>

							<view v-else>
								<span class="loadingTalk" v-if="item.talk.indexOf('思考中')!=-1">
									<view class="flexs">
										<image :src="waitImg" mode="" class="loadingImages"></image>
										<text style="vertical-align: top; word-break:break-all;" v-text="item.talk"></text>
									</view>
									<u-col span="4"  v-if="index===messageList[listName].length-1"><u-button
											type='primary' :customStyle='{"color":"#1F64FF","height":"28px","margin-top": "10px","background-color": "#fff","color": "#1F64FF","border": "1px solid #1F64FF"}'
											size="mini" color="rgba(31, 100, 255, 0.1)" @click="stopStart">
											停止回答
											</u-button>
									</u-col>
								</span>
								
								<view class="tips" v-else-if="item.code==40022">
									<text style="font-size:17px; word-break:break-all;">{{item.talk}}</text>
									<view style="display: flex; justify-content: space-around;">
										<u-button type="error" color="#FF9B17" v-if="listName == 'one'"
											:customStyle="{'border-radius':'8px','margin-top':'10px', 'width':'48%'}"
											@click='goToVip'>升级会员</u-button>
										<u-button type="error" color="#1F64FF"
											:customStyle="{'border-radius':'8px','margin-top':'10px', 'width':'48%'}"
											@click='goToVip'>开通流量包</u-button>
									</view>
								</view>
								
								<view class="tips" v-else-if="item.code==40021">
									<text style="font-size:17px; word-break:break-all;">{{item.talk}}</text>
								</view>
								
								<view v-else>
									<view class="tips">

										<!-- <text style="font-size:32upx; word-break:break-all;" v-if="!item.loading">{{item.talk}}</text> -->
										<!-- <ua-markdown :source="item.talk" :showLine="false" v-if="item.loading" /> -->
										<ua-markdown :source="item.talk" :showLine="false" />
										<!-- 时间 和 字数 -->
										<u-row class='edit'>
											<u-col span="6" style="font-size: 14px;">
												字数:{{item.textNumber}}
											</u-col>
											<u-col span="6" style="font-size: 14px;" v-if="item.loading">
												消耗:{{item.integral }}w算力
											</u-col>
											
										</u-row>
										<u-row class='edit' v-if="item.loading && listName != 'six'">
											<u-col span="6" align="left" style="font-size: 14px;">
												上行:{{item.prompt_tokens}} token
											</u-col>
											<u-col span="6" align="left" style="font-size: 14px;">
												下行:{{item.completion_tokens}} token
											</u-col>
										</u-row>
										<u-row class='edit' v-if="item.loading && listName == 'six'">
											<u-col span="6" align="left" style="font-size: 14px;">
												消耗:{{item.all_tokens}} token
											</u-col>
										</u-row>
										<u-row class='edit'>
											<u-col span="7.5" v-if="item.history"></u-col>
											<u-col span="1" v-if="!item.history">
												<view>
													<image v-if="item.loading" src="@/static/images/time.png" mode="" width="16px"
														height="16px" style="vertical-align: top;"></image>
													<image v-else :src="waitImg" mode="" width="16px" height="16px"
														class="loadingImages">
													</image>
												</view>
											
											</u-col>
											<u-col span="6.5" style="font-size: 14px;" v-if="!item.history">
												<view>
													<text v-if="item.loading"> 耗时：{{item.time}}秒</text>
													<text v-else> 思考中:{{item.time}}秒</text>
												</view>
											
											</u-col>
											<u-col span="3.5"></u-col>
											<u-col span="1" @click="copyFun(item.talk)">
												<image src="@/static/images/balckCopy.png" mode=""></image>
											</u-col>
										</u-row>
										<view class="btn_tab">
											<text class="tab_left">当前内容为AI生成，不做任何决策使用！由此引发的一切后果，需自行承担，请知悉,已通过阿里云内容安全审核</text>
										</view>
								
									</view>
									<u-row gutter="20" style="flex-wrap: wrap;width: 100%; margin-bottom: 50px;">
									<!-- 	<u-col span="4" v-if="index===messageList[listName].length-1 && item.loading" ><u-button
												type='primary' :customStyle='{"color":"#1F64FF","height":"28px","margin-top": "10px","background-color": "#fff","color": "#1F64FF","border": "1px solid #1F64FF"}'
												size="mini" color="rgba(31, 100, 255, 0.1)" @click="show=true">优化本次回答</u-button></u-col> -->
												
										<u-col span="4" v-if="index===messageList[listName].length-1 && !item.history && !item.loading"><u-button
												type='primary' :customStyle='{"color":"#1F64FF","height":"28px","margin-top": "10px","background-color": "#fff","color": "#1F64FF","border": "1px solid #1F64FF"}'
												size="mini" color="rgba(31, 100, 255, 0.1)" @click="endController">
												停止回答
												</u-button>
										</u-col>
										
										<u-col span="4" v-if="index===messageList[listName].length-1">
											<view style="margin-bottom: 100px;"></view>
										</u-col>
										<!-- <u-col span="4" v-if="index===messageList[listName].length-1 && !item.history && item.loading">
											<u-button
												type='primary' :customStyle='{"color":"#1F64FF","height":"28px","margin-top": "10px","background-color": "#fff","color": "#1F64FF","border": "1px solid #1F64FF"}'
												size="mini" color="rgba(31, 100, 255, 0.1)" @click="againQs(messageList[listName][messageList[listName].length - 2].talk)">
												<image src="@/static/images/ArrowsCounterClockwise.png" style="width: 40upx;height: 40upx;margin-right: 16upx" mode=""></image>
												重试
											</u-button>
										</u-col> -->
										
									</u-row>
								</view>
							</view>
						</view>

						<view v-else>

							<!-- <text class="talk" style="background: #1F64FF;color:#fff">{{item.talk}}</text> -->
							<view class="talk" style="background: #1F64FF;color:#fff">

								<view style="word-break:break-all;">
									{{item.talk}}
								</view>
								
								<view v-if="item.images.length > 0">
									<image :src="getImgUrl(item.images[0])" style="height: 500rpx; width: 500rpx" mode="aspectFit" @click="checkImg(item.images[0])"></image>
								</view>


								<image src="@/static/images/copy.png" mode="" @click="copyFun(item.talk)"></image>
							</view>
							<!-- <view @click="againQs(item.talk)" class="reset-question" v-if="messageList[listName][messageList[listName].length - 1].loading && !item.history">
								<image src="@/static/images/ChatCircleDots.png" mode="" style="margin-right: 16upx;width: 40upx;height: 40upx;margin: 8upx;"></image>
								<view>
									重新提问
								</view>
							</view> -->

						</view>
					</u-col>
				</u-row>
			</view>
			
		</scroll-view>

		
		<view class="bottomInput bottom_p" :style="{bottom:bottomTop+'px'}">
           
			<view class="btn_link">
				<view class="link_l">
					<view class="l_chat" style="margin-right: 15rpx;"
					 @click="newChatSpeak" v-if="messageList[listName].length > 1 && messageList[listName][messageList[listName].length - 1].loading">
						 <u-icon name="plus" color="#1F64FF" size="14"></u-icon>
						 <text class="l_text">开启新会话</text>
					 </view>
					<view class="l_chat" @click="toHistory">
						<u-icon name="clock" color="#1F64FF" size="16"></u-icon>
						<text class="l_text">历史会话</text>
					</view>
				</view>
				
			</view>
			<u-row align='bottom' gutter="5">
				<u-col span="9.5">
					<view class="chat_input">
						<u-textarea v-model="chatInputValue" placeholder="在此输入您想了解的内容" @confirm="sendInfo" autoHeight
							:showConfirmBar='false' :adjustPosition='false' maxlength='-1'
							:disableDefaultPadding='true' @keyboardheightchange='keyboardheightchange' border='none' :focus="false">
						</u-textarea> 
						<view v-if="imgList.length > 0">
							<view class="input_right" v-for="(val, index) in imgList" :key="index" >
								<image :src="getImgUrl(val)" class="inputImg"></image>
								<text class="input_text"></text>
								<u-icon name="close" size="18" @click="imgList.splice(index,1)"></u-icon>
							</view>
						</view>
						
						
					</view>
					
				</u-col>
				<u-col span="2.5" align="bottom">
					<u-button type="primary" color="#1F64FF" @click="sendInfo">发送</u-button>
				</u-col>
			</u-row>
			
		</view>
		<u-modal :show="show" @cancel="show = false" confirmText="确定" confirmColor="#1F64FF"
			:showCancelButton='true' @confirm="showFun">
			<view class="modal">
				<view class="edit">

					<view class="changes"></view> 优化本次回答
				</view>
				<view class="content">
					<u--textarea v-model="complete" placeholder="在此输入你想优化的内容" border="none" height='110px'></u--textarea>
					<!-- {{content.prompts_name}} -->
				</view>
			</view>
		</u-modal>
		<view class="idea" @click="toIdea">
			<image :src="ideaImg" mode=""></image>
			<view style="color: #0E39DE;font-size: 24upx;font-weight: 600;">意见反馈</view>
		</view>
	</view>
</template>

<script>
	import {
		creatChat,
		chat_likes,
		chat_session,
        xfChat
	} from "@/apis/chat.js"
	import { upDocument, getDocument, getAnswer, delDocument } from "@/apis/user.js"
	import * as TextEncoding from 'text-encoding-shim';
	import uaMarkdown from '@/components/ua2-markdown/ua-markdown.vue'

	export default {
		data() {
			return {
				ideaImg: global.baseImg + '/xcx/com/message_center/%E6%84%8F%E8%A7%81%E5%8F%8D%E9%A6%88.png',
				scrollTop: '573',
				isfinish: true, // 会话中
				
				//讯飞星火
				stop_four: false,
				four_shi: 0,
				four_time: 0,
				requestTask_four: '',
				
				selectDone: "",
				msgListHeight: 0,
				// barHeight: 50,
				userInfo: '',

				current: 0,
				key: 0,
				upDownText: false,
				show: false,
				transitionShow: false,
				complete: "",
				
				chatInputValue: "",
				chatType: '讯飞星火',
				chat_type: 5,
				loading: true,
				session_code: "",
				chat_group_code: "",
				supplement: {}, // 请求参数
				listName: 'four',
				imgList: [],
				messageList: {
					'four': []
				},
				content: '',
				message_covert: '',
				me_id: '',
				tutor_id:'',
				avatar: '',
				bottomTop: 0,
				
				documetName: '',
				isDoc: true,
				file_id: '',
				
				glmImg: global.baseImg+'/xcx/com/message_center/%E6%96%87%E6%A1%A3%E5%A4%B4%E5%83%8F.png',
				waitImg: global.baseImg+'/xcx/c4a8054e-50bd-4790-a3cb-ec585412daa7.jpg',
			}
		},
		components: {
			uaMarkdown
		},
		onLoad(option) {
            // console.log(option,4578)
			if(option.qs_id != undefined) {
				// console.log(option.qs_id,5556)
				this.file_id = option.qs_id
				this.getDocument()
			}
			// 获取屏幕高度
			uni.getSystemInfo({
				success: res => {
					this.screenHeight = res.windowHeight
					// 100为底部输入栏高度，单位rpx，需要先转成px
					this.msgListHeight = this.screenHeight - uni.upx2px(100)
					
				}
			})
			
		},
		
		onShow() {
			
			// console.log('加载1121', uni.getStorageSync('history_code'));
			if (uni.getStorageSync('doc_code') != '') {
				console.log('获取到了')
				this.historySession(uni.getStorageSync('doc_code'))
			}

			let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			// console.log(uni.getStorageSync("avatarUrl"), 2222)
			let avatarUrl = global.baseImg+ '/'+ uni.getStorageSync("avatarUrl");
			this.avatar = avatarUrl;
		
		},
		
		onHide() {
		  
		},
		
		methods: {
			
			historySession(session_code) {
				let chat_tip = ''; // 对话类型
				let data = JSON.parse(session_code)
				if(data.type == 5) {
					this.listName = 'four';
					chat_tip = 5
					this.chatType = '讯飞星火'
					this.chat_type = 5 
				}
				this.messageList[this.listName].splice(1, this.messageList[this.listName].length - 1)
				this.$forceUpdate()
				
				
				chat_session(data.code).then(res => {
					//初始化信息
					this.supplement = {
						chat_type: chat_tip,
						// action_type: 3,
						// session_code: this.session_code,
						// chat_group_code: this.chat_group_code,
						// stream_str: 1,
						// is_decode: 1,
						msg_list: []
					}
				
				   res.data.map((item, tip) => {
						this.supplement.session_code = item.session_code
						this.supplement.chat_group_code = item.chat_group_code
						
						if(item.images == null) {
							item.images = []
						}
						this.messageList[this.listName].push({
							talk: item.content,
							type: item.role,
							integral: item.integral,
							completion_tokens: item.completion_tokens,
							prompt_tokens: item.prompt_tokens,
							time: 0,
							code: 200,
							// status,
							loading: true,
							all_tokens: item.total_tokens,
							textNumber: item.content.replace(/[\r\n]/g, "").length,
							history: true,
							session_code: item.session_code,
							chat_group_code: item.chat_group_code,
							images: item.images
						})
						this.session_code = item.session_code;
						this.supplement.msg_list.push({
							role: item.role,
							content: item.content
						})
						
						this.toBottom()
						this.$forceUpdate()
					})
					uni.setStorageSync('doc_code', '')
				})
			},

			copyFun(val) {
				uni.setClipboardData({
					data: val, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				})

			},
			
			radioChange(e) {
				if (e) {
					
					this.upDownText = false
					this.selectDone = true
					this.messageList[this.listName].splice(1, this.messageList[this.listName].length -1)
					this.sendMessage(this.chatInputValue)
				} else {
					let arr = []
					this.messageList[this.listName].map((item, index) => {
						if(index > 0) {
							arr.push({
								role: item.type,
								content: item.talk,
								images: item.images
							})
						}
						
					})
					this.supplement.msg_list = arr
					this.supplement.chat_group_code = ''
					this.upDownText = true
					this.selectDone = true
					this.sendMessage(this.chatInputValue)
				}
				this.transitionShow = false
			},
			
			base64ToString(encodedString) {
				// console.log(encodedString,'encodedString');
				// Convert the Base64 string to a Uint8Array
				var decodedData = Uint8Array.from(this.atob(encodedString), c => c.charCodeAt(0));
			
				// Create a TextDecoder instance with the appropriate character encoding
				var decoder = new TextEncoding.TextDecoder('utf8');
			
				// Decode the Uint8Array to a string
				var decodedString = decoder.decode(decodedData);
			
				// console.log(decodedString, 'decodedStringdecodedString');
				// console.log(decodedString, 'decodedStringdecodedString');
				return decodedString;
			},
			
			//解码
			atob(string) {
				string = String(string).replace(/[\t\n\f\r ]+/g, "");
				var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
				if (!b64re.test(string))
					throw new TypeError(
						"Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
				string += "==".slice(2 - (string.length & 3));
				var bitmap, result = "",
					r1, r2, i = 0;
				for (; i < string.length;) {
					bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
						(r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));
					result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
						r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
						String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
				}
				return result;
			
			},
			

			//信息回调方法
			async creatChatFun(data, state) {
				if(this.listName == 'four') {
					let four_num = 0;
					this.messageList.four.push({
						talk: `思考中,耗时${four_num}秒`,
						type: 'assistant'
					})
					
					this.four_shi = setInterval(() => {
						four_num++
					}, 1000)
					this.four_time = setInterval(() => {
						this.messageList.four[this.messageList.four.length - 1] = {
							talk: `思考中,耗时${four_num}秒`,
							type: 'assistant'
						}
						this.$forceUpdate()
					}, 1000)
					
					
					this.toBottom()
					// ==========================================
					const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
					// // console.log(userInfo,'userInfo');
					data.model = 'v1.1';
					this.requestTask_four = uni.request({
						// url: global.baseUrl + '/api/chat/new_chat_session',
						url: global.baseUrl + '/api/chat/async_chat_completion',
						data,
						header: {
							'source': global.source,
							'Authorization': userInfo.token,
							'role': userInfo.role,
						},
						method: 'POST',
						// responseType: 'ArrayBuffer',
						enableChunked: true,
						success: response => {
							// 开启enableChunked后，成功的回调一般用不到，因为响应数据不在这里返回
							// console.log(response, 'ssss6')
							this.messageList.four[this.messageList.four.length - 1].loading = true
							// console.log('数据长度：', this.messageList[tabType][this.messageList[tabType].length - 1].loading);
							clearInterval(this.four_shi)
							
							this.$forceUpdate()
						},
					
						fail(err) {
							console.log(err, 'err');
						},
						complete: (complete) => {
					       clearInterval(this.four_shi)
					        // console.log(complete,777)
					
							if (complete.statusCode != 200) {
					
								// let code
								clearInterval(this.four_time)
					            
								// 非手动停止才执行
					            if(!this.stop_four) {
									xfChat(data).then(res => {
										if(res.code < 49999) {
											let userInfo = JSON.parse(uni.getStorageSync('userInfo'));								
											if(res.code == 40013) {
												this.$api.msg('登录信息已过期，请重新登录')
												this.messageList[this.listName].pop()
												setTimeout(() => {
													uni.navigateTo({
														url: '/pages/login/login',
													})
												}, 1500)
												
											} else {
												this.userRole = userInfo.role
												this.messageList[this.listName][this.messageList[this.listName].length - 1] = {
													talk: res.msg,
													type: 'assistant',
													time: 0,
													code: res.code == 40022 ? res.code : 40021,
													status: "stop",
													textNumber: 0,
													history: false,
													loading: true
												}
											}			
											this.$forceUpdate()
											this.toBottom()
										} else if(res.code > 49999) {
											this.messageList[this.listName].pop()
											this.$api.msg('网络异常，请稍后重试')
											// this.$api.msg(res.msg)
										} else {
											this.messageList[this.listName].pop()
											this.$api.msg(res.msg)
										}
									
									})
									
									this.toBottom()
									this.$forceUpdate()
								}
								
							}
						}
					})
					let strArr = []
					let info = ''
					let integral = 0
					let completion_tokens = 0
					let prompt_tokens = 0
					let tabType = this.listName
					
					this.requestTask_four.onChunkReceived(response => {
						const arrayBuffer = response.data;
						const uint8Array = new Uint8Array(arrayBuffer);
						const str = new TextEncoding.TextDecoder('utf8').decode(uint8Array);
					
						let status = ''
						let session_code = ''
						let chat_group_code = ''
						let arr = str.match(/\{(.+?)\}/g)
					
						arr.map((item => {
							// console.log(item, 'item');
							if (JSON.parse(item).content != 'null' && JSON.parse(item).content != null)
								// info += this.base64ToString(JSON.parse(item).content)
								info += JSON.parse(item).content		
							if(JSON.parse(item).code) { 
								if(JSON.parse(item).code < 49999) {
									let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
									// console.log(userInfo.role == 'guess' ,'panduan');								
									this.userRole = userInfo.role
									this.messageList[this.listName][this.messageList[tabType].length - 1] = {
										talk: JSON.parse(item).msg,
										type: 'assistant',
										time: 0,
										code: JSON.parse(item).code == 40022 ? JSON.parse(item).code : 40021,
										status: "stop",
										textNumber: 0,
										history: false,
										loading: true
									}
									this.$forceUpdate()
									this.toBottom()
									clearInterval(this.four_time)
									clearInterval(this.four_shi)
									return
								} else {
									this.$api.msg('网络异常，请稍后重试')
								}
							} else {
								
								this.session_code = JSON.parse(item).session_code
								this.chat_group_code = JSON.parse(item).chat_group_code
								status = JSON.parse(item).finish_reason
								integral = JSON.parse(item).integral
								completion_tokens = JSON.parse(item).completion_tokens
								prompt_tokens = JSON.parse(item).prompt_tokens
								let load_state = false
								
								if(status == 2) {
									load_state = true
								} else {
									load_state = false
								}
								if (state == 'first') {
									this.supplement = {
										chat_type: 5,
										action_type: 3,
										session_code: this.session_code,
										chat_group_code: this.chat_group_code,
										stream_str: 1,
										is_decode: 1,
										msg_list: [{
												role: 'user',
												content: data.content,
											},
											{
												role: 'assistant',
												content: info,
											}
										]
									}
								}
													
								//继续提问和补充
								if (state == 'continue') {
									//把数据变成Array
									try {
										// console.log('进来了', info);	
										this.supplement.msg_list = JSON.parse(this.supplement.msg_list)
									} catch (e) {
										console.log('我不是JSON');
									}
													
									this.supplement.msg_list.push({
										role: 'assistant',
										content: info,
									})
								}
								clearInterval(this.four_time)
								
													
								//重置最后一条信息
								this.messageList[tabType][this.messageList[tabType].length - 1] = {
									talk: info,
									type: 'assistant',
									time: four_num,
									code: 200,
									history: false,
									status,
									integral,
									completion_tokens,
									prompt_tokens,
									textNumber: info.replace(/[\r\n]/g, "").length,
									loading: load_state,
									session_code: this.session_code,
									chat_group_code: this.chat_group_code,
								}
							}
							this.toBottom()
							this.$forceUpdate()
											
						}))
											
					})
				} 
			},
			//补充提问
			showFun() {
				
				if(this.complete.trim() == '') {
					return this.$api.msg('补充内容不能为空')
				}
				
				this.show = false
				
				if(this.listName == 'three' || this.listName == 'five' || this.listName == 'three' || this.listName == 'seven') {
					this.supplement.msg_list = [
						{
							role: 'user',
							content: this.messageList[this.listName][this.messageList[this.listName].length - 2].talk,
							images: this.messageList[this.listName][this.messageList[this.listName].length - 2].images,
							covert_content: this.messageList[this.listName][this.messageList[this.listName].length - 2].message_covert
						},
						{
							role: 'assistant',
							content: this.messageList[this.listName][this.messageList[this.listName].length - 1].talk,
							images: []
						},
						{
							role: 'user',
							content: this.complete,
							images: []
						}
					]
				} else {
					this.supplement.msg_list = [
						{
							role: 'assistant',
							content: this.messageList[this.listName][this.messageList[this.listName].length - 1].talk,
							images: []
						},
						{
							role: 'user',
							content: this.complete,
							images: []
						}
					]
				}
				this.messageList[this.listName].push({
					talk: this.complete,
					type: 'user',
					images: []
				})
				//把数据变成JSON
				this.supplement.msg_list = JSON.stringify(this.supplement.msg_list)

				this.complete = ""

				this.creatChatFun(this.supplement, 'continue')


			},
			
			sendInfo() {
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				let val = { 
					'user_id': userInfo.user_id,
					'file_id': this.file_id,
					'question_content': this.chatInputValue
				}
				uni.showLoading({ title: '思考中' });
				getAnswer(val).then(res => {
					if(res.code == 20000) {
						this.message_covert = res.data.prompt
						this.sendMessage()
						uni.hideLoading()
					} else {
						this.$api.msg(res.msg)
						uni.hideLoading()
					}
					
				})
			},
			sendMessage() {

				// let send_talk = this.messageList[this.listName][this.messageList[this.listName].length - 1].talk;
				// let send_loading = this.messageList[this.listName][this.messageList[this.listName].length - 1].loading;
				// let send_time = this.messageList[this.listName][this.messageList[this.listName].length - 1].time;
				// let history = this.messageList[this.listName][this.messageList[this.listName].length - 1].history;
				
				// if (send_talk.indexOf('思考中') != -1) {

				// 	this.$api.msg('当前问题还没回答完毕，请稍后再提问！')
				// 	return
				// }

				// if (send_loading == false && send_time > 0) {

				// 	this.$api.msg('当前问题还没回答完毕，请稍后再提问！')
				// 	return
				// }
				// if(send_time == 0 && !history) {
				// 	this.messageList[this.listName].pop()
				// }
				if (this.chatInputValue.trim() == '') return this.$api.msg('请输入您要发送的内容')

				let img_url = ''
				if(this.imgList.length > 0) {
					img_url = this.imgList
				} else {
					img_url = ''
				}
				this.messageList[this.listName].push({
					talk: this.chatInputValue,
					type: 'user',
					images: img_url,
					message_covert: this.message_covert 
				})
				
				
				let chat_cont = this.chatInputValue
				let data = {
					chat_type: this.chat_type,
					action_type: '3',
					scenario_type: 'document',
					question_id: this.file_id,
					session_code: this.session_code,
					chat_group_code: "",
					content: this.chatInputValue,
					msg_list: [{
						role: 'user', 
						covert_content: this.message_covert , 
						content: chat_cont
					}]
				}
				if(this.imgList.length > 0) {
					data.msg_list[0].images = this.imgList
				}
				data.msg_list = JSON.stringify(data.msg_list)
                this.creatChatFun(data, 'first')
				this.toBottom()

				this.selectDone = false
				this.chatInputValue = ''
				this.message_covert = ''
				this.imgList = []

			},
			
			toBottom() {
				
				let that = this
				this.$nextTick(() => {
					setTimeout(() => {
						
						uni.createSelectorQuery().select("#textadd").boundingClientRect(function(
							res) { //定位到你要的class的位置
							// console.log(res,330);
							// console.log(res.height,410)
							uni.pageScrollTo({
								scrollTop: res.height,
								duration: 0
							});
						}).exec()
					}, 1500)
					
				})
			},
			
			goToVip() {
				const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				if (userInfo.role == 'guess') {
					uni.navigateTo({
						url: '/pages/login/login',
					})
				} else {
					uni.navigateTo({
						url: '/pages/user/vip/vip',
					})
				}

			},
			
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			},
			
			// 停止会话
			endController() {
				if(this.listName == 'four')  {
					this.stop_four = true
					this.requestTask_four.abort();
					clearInterval(this.four_shi)
					clearInterval(this.four_time)
					this.messageList[this.listName][this.messageList[this.listName].length - 1].loading = true
				}
				this.$forceUpdate()
			},
			
			// 停止开始回答
			stopStart() {
				if(this.listName == 'four') {
					this.stop_four = true
					this.requestTask_four.abort();
					clearInterval(this.four_shi)
					clearInterval(this.four_time)
					this.messageList.four.pop()
				}
				this.$forceUpdate()
			},
			
			newChatSpeak() {
				// let send_talk = this.messageList[this.listName][this.messageList[this.listName].length - 1].talk;
				// let send_loading = this.messageList[this.listName][this.messageList[this.listName].length - 1].loading;
				// let send_time = this.messageList[this.listName][this.messageList[this.listName].length - 1].time;
				
				// // console.log(this.messageList[this.listName][this.messageList[this.listName].length - 1].time, 888);
				// if (send_talk.indexOf('思考中') != -1 && send_time > 0) {
				
				// 	this.$api.msg('当前问题还没回答完毕，请稍后再操作！')
				// 	return
				// }
				
				// if (send_loading == false && send_time > 0) {
				
				// 	this.$api.msg('当前问题还没回答完毕，请稍后再操作！')
				// 	return
				// }
				// this.askShow = true; // 显示热搜提问
				this.messageList[this.listName] = [];
				this.session_code = '';
				this.chat_group_code = ''
				this.imgList = []
				this.file_id = ''
				this.documetName = ''
				this.isDoc = true
			},
			
			toHistory() {
				uni.navigateTo({
					url: '/childPage/document/document_history'
				})
			},
			
			getImgUrl(url){
			   return global.baseImg+'/'+url;
			},
			
			keyboardheightchange(e) {
				// console.log(e, '键盘高度变化');
				this.bottomTop = e.detail.height
				this.$forceUpdate()
				this.toBottom()
			},
			
			// 上传文档
			uploadFile() {
				let that = this;
				wx.chooseMessageFile({
				  count: 9,
				  type: 'file',
				  extension: [ "doc","txt", "md","pdf"],
				  success (res) {
				    // tempFilePath可以作为img标签的src属性显示图片
					// console.log(res,7458)
				    const tempFilePaths = res.tempFiles[0].path
					const image_name = res.tempFiles[0].name
					// console.log(image_name,774)
					uni.showLoading({ title: '上传中' });
					uni.uploadFile({
						url: global.loginUrl + '/api/user/oss_upload', 
						filePath: tempFilePaths,
						name: 'image',
						formData: {
							"image": tempFilePaths,
							"image_name": image_name,
							"oss_dir": 'static',
							"cate": 'create_character'
						},
						success: (uploadFileRes) => {
							let imgData = JSON.parse(uploadFileRes.data)
							console.log(imgData,1258)
							
							if(imgData.code == 20000) {
								let name = imgData.data.name
								let url = imgData.data.new_url
								that.upDocument(name, url)
								
							} else {
								that.$api.msg(imgData.msg)
								uni.hideLoading()
							}
						}
					});
				  }
				})
			},
			
			//上传文档
			upDocument(name, url) {
			   let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			   let val = {
				  'user_id': userInfo.user_id,
			   	  'file_url': url,
				  'file_name': name
			   }
			
			   upDocument(val).then(res => {
				  if (res.code == 20000) {
					  this.file_id = res.data.file_id;
					  this.documetName = res.data.file_name;
					  this.isDoc = false;
					 uni.hideLoading()
				  } else {
					  this.$api.msg(res.msg);
					  uni.hideLoading()
				  }
			   }).catch(err => {
			   		  this.$api.msg('上传失败');
					  uni.hideLoading()
			   })	
			},
			
			//获取文档信息
			getDocument() {
			   let val = {
			   	  'file_id': this.file_id,
			   }
			
			   getDocument(val).then(res => {
				  if (res.code == 20000) {
					 this.file_id = res.data[0].file_id
					 this.documetName = res.data[0].file_name
					 this.isDoc = false
				  } else {
					  this.$api.msg(res.msg);
				  }
			   }).catch(err => {
			   		  this.$api.msg('获取失败');
			   })	
			},
			toIdea(){
				uni.navigateTo({
					url:'/childPage/answer/answer'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "@/static/css/chat.less";
	.u-page {
		margin-top: 28upx !important;
	}
	.btn_link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		.link_l {
			display: flex;
			.l_chat {
				border-radius: 6upx;
				border: 1upx solid #1F64FF;
				padding: 5upx 10upx;
				color: #1F64FF;
				font-size: 24upx;
				font-style: normal;
				font-weight: 400;
				line-height: 150%;
				margin-bottom: 10upx;
				display: flex;
				align-items: center;
				.l_text {
					padding-left: 8upx;
				}
			}
		}
	}
	
	.chat_input {
		border-radius: 6upx;
		border: 1upx solid #E5E6EB;
		/* padding: 10upx; */
		.input_right {
			display: flex;
			align-items: center;
			border-radius: 6upx;
			border: 1upx solid #E5E5E5;
			padding-right: 20upx;
			width: 148rpx;
			margin: 0 0 10upx 10upx;
			.inputImg {
				width: 90upx;
				height: 90upx;
				border-radius: 6upx 0 0 6upx;
			}
			.input_text {
				height: 90upx;
				width: 20upx;
				border-left: 1upx solid #E5E5E5;
			}
		}
	}
	
	.bottom_p {
		padding: 40upx 18upx !important;
	}
	.document_btn {
		border: 1upx solid #1F64FF;
		border-radius: 6upx;
		padding: 15upx 20upx;
		font-size: 28upx;
		line-height: 30upx;
		color: #1F64FF;
		margin: 20upx auto;
		text-align: center;
	}
	.document_type {
		padding: 10upx 0;
		font-size: 24upx;
		line-height: 30upx;
		color: #999;
		margin: auto;
	}
	
	.document_name {
		display: flex;
		align-items: center;
		padding: 20upx 0;
		.document_text {
			font-size: 26upx;
			color: #333;
			width: 70%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin: 0 10upx;
		}
	}
	.idea {
		display: flex;
		position: fixed;
		top: 0%;
		right: 4%;
		text-align: center;
		align-items: center;
	
		image {
	
			width: 28rpx;
			height: 28rpx;
			margin-right: 6rpx;
		}
	}
</style>
<style>
	page {
		background: #f6f8fb;
	}
</style>