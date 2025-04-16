<template>
	<view>
		
		<view class="top_cont">
			<view class="search_cont">
				<view class="search">
					<image class="search_img" src="@/static/user/search.png"></image>
					<input v-model="searchValue" placeholder="请输入搜索内容" type="text" class="search_input" @input="search" />
				</view>
			</view>
		</view>
		<view class="chat_cont" style="margin-top: 130upx;">
			
			<scroll-view class="list_ul" scroll-y="true" v-if="chatList.length > 0">
				<view class="ul_style" v-for="(item, index) in chatList" :key="index">
					<view class="li_style">
						<view class="ul_right">
							<view class="li_top">
								<text class="top_l">{{ item.title }}</text>
							</view>
							<view class="li_btn">
								<view class="btn_l">提问者</view>
								<view class="btn_r">{{ item.nick_name }}</view>
							</view>
							
							<view class="li_btn">
								<view class="btn_l">创建时间</view>
								<view class="btn_r">{{ item.create_time }}</view>
							</view>
							
							<view class="li_edit">
								<view class="edit_l" @click.stop="delPhoto(item.session_code)">删除</view>
								<view class="edit_r" @click="checkDetail(item.session_code, item.question_id)">继续对话</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<view class="on_order" v-else>
				<image class="order_img" :src="backImg"></image>
			</view>

			<view class="on_order_list" v-if="loadingType == 1">没有更多内容了!</view>
		</view>
<view class="idea" @click="toIdea">
			<image :src="ideaImg" mode=""></image>
			<view style="color: #0E39DE;font-size: 24upx;font-weight: 600;">意见反馈</view>
		</view>
	</view>
</template>

<script>
	import {
		chatList
	} from '@/apis/user.js'
	import {
		del_session
	} from '@/apis/chat.js'
	export default {
		data() {
			return {
				ideaImg: global.baseImg + '/xcx/com/message_center/%E6%84%8F%E8%A7%81%E5%8F%8D%E9%A6%88.png',
				active: 5,
				loadingType: 0,
				page_no: 1,
				page_count: 10,
				content: '',
				chatList: [],
				pageTotal: 0,
				searchValue: '',
				backImg: global.baseImg+'/xcx/8a3fda0a-67b9-4545-a297-2b516055f560.jpg',
				addImg: global.baseImg+'/xcx/01fece57-06c7-4eff-ab60-671230d86f80.jpg'
			}
		},
		components: {
		},
		onLoad(option) {
			
		},
		onShow() {
			this.getChatList();
		},
		methods: {
			version(val) {
				this.active = val;
				this.page_no = 1;
				this.loadingType = 0;
				this.searchValue = '';
				this.getChatList()
			},
			
			search() {
				this.page_no = 1;
				this.loadingType = 0;
				// this.searchValue = '';
				this.getChatList()
			},
			
			// 获取对话列表
			getChatList() {
				let val = {
					chat_type: this.active,
					scenario_type: 'document',
					page_size: this.page_count,
					title: this.searchValue,
					page: this.page_no
				}
				chatList(val).then(res => {
					if (res.code == 20000) {
						this.chatList = res.data.data;
			
						let total = res.data.total;
						if (total % this.page_count == 0) {
							this.pageTotal = total / this.page_count
						} else {
							this.pageTotal = parseInt(total / this.page_count) + 1
						}
						if (this.pageTotal == 1) {
							this.loadingType = 1;
						}
					} else {
						this.$api.msg(res.msg);
					}
				}).catch(err => {
					this.$api.msg('获取对话信息失败');
				})
			},
			
			//页面触底事件
			onReachBottom() {
				if (this.loadingType == 1) return
				this.page_no++
				let val = {
                    chat_type: 5,
                    scenario_type: 'document',
					page_size: this.page_count,
					title: this.searchValue,
					page: this.page_no
				}
				chatList(val).then(res => {
					if (res.code == 20000) {
			
						let total = res.data.total;
						if (total == 0) return
						let List = res.data.data;
						let addList = this.chatList;
						List.forEach(item => {
							addList.push(item);
						});
			
						if (total % this.page_count == 0) {
							this.pageTotal = total / this.page_count
						} else {
							this.pageTotal = parseInt(total / this.page_count) + 1
						}
						if (this.pageTotal <= this.page_no) {
							this.loadingType = 1
						}
					} else {
						this.$api.msg(res.msg);
					}
				}).catch(err => {
					this.$api.msg('获取对话信息失败');
				})
			},
			
			checkDetail(code, qs_id) {
				console.log(qs_id,996)
				let that = this
				uni.showModal({
					// title: '模态弹窗标题',
					content: '是否延续当前对话',
					success: function(res) {
						if (res.confirm) {
							uni.setStorageSync('doc_code', JSON.stringify({
								code,
								type: that.active
							}))
							uni.navigateTo({
								url: '/childPage/document/document_chat?qs_id=' + qs_id
							})
							
						} else if (res.cancel) {
							console.log('您点击了取消');
						}
					}
				});
			},
			
			delPhoto(code) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定删除该记录吗？',
					success(res) {
					  if (res.confirm) {
						  that.delCont(code)
					  }
					}
				});
			},
			
			// 删除信息
			delCont(code) {
				let data = [];
				data.push(code)
				let val = { 'session_codes': JSON.stringify(data) }
				// console.log(val,6666)
				del_session(val).then(res => {
					if(res.code == 20000) {
						this.$api.msg('删除成功')
						this.getChatList()
					} else {
						this.$api.msg(res.msg)
					}
					
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
	page {
		background: #f6f8fb;
	}

	.cont_title {
		color: #000;
		font-size: 30upx;
		font-style: normal;
		font-weight: 500;
        text-align: center;
		padding: 20upx 0;
	}
	.list_ul {
		padding: 15upx 10upx;
		margin-bottom: 30upx;
		width: calc(100% - 20upx);
	}

	.ul_style {
		display: flex;
		flex-direction: column;
		padding: 15upx 20upx;
	}

	.li_style {
		display: flex;
		align-items: center;
		box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.14);
		border-radius: 10upx;
		padding: 25upx;
		width: calc(100% - 50upx);
		background: #fff;
		.ul_right { flex: 1; }
		.ul_img {
			padding: 10upx;
			.avatar_img {
				width: 80upx;
				height: 80upx;
				border-radius: 8upx;
			}
		}
	}

	.li_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 18upx;
	}

	.top_l {
		font-weight: 500;
		font-size: 30upx;
		line-height: 42upx;
		color: #000;
		width: 80%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.top_r {
		font-weight: 400;
		font-size: 24upx;
		line-height: 30upx;
		color: #6E7480;
	}

	.li_btn {
		font-weight: 400;
		font-size: 28upx;
		line-height: 35upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.btn_l {
			color: #A4A4A4;
			font-size: 28upx;
			font-weight: 400;
			line-height: 150%;
			padding: 5upx 0upx;
			line-height: 48upx;
		}
		.btn_r {
			color: #000;
			font-size: 28upx;
			font-weight: 400;
			line-height: 150%;
			padding: 5upx 0upx;
			line-height: 48upx;
		}
	}

	.on_order {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
	}

	.order_img {
		width: 450upx;
		height: 450upx;

	}

	.on_order_list {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		height: 100upx;
		line-height: 100upx;
		width: 100vw;
		color: #C0C4CC;
	}
	
	.text_conts {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 20upx 30upx 0 30upx;
		.text_u {
			display: flex;
			align-items: center;
			.u_li{
				color: #9A9A9A;
				text-align: center;
				font-size: 22upx;
				font-style: normal;
				font-weight: 400;
				margin-right: 10upx;
			}
			.add_img {
				width: 38upx;
				height: 38upx;
			}
			.add_li {
				color: #1F64FF;
				font-size: 28upx;
				font-style: normal;
				font-weight: 500;
				line-height: 150%;
				padding-left: 10upx;
			}
			.qs_img {
				width: 40upx;
				height: 40upx;
				margin-left: 20upx;
			}
			.text_r {
				color: #000;
				font-size: 32upx;
				font-weight: 500;
				line-height: 50upx;
				margin-right: 10upx;
			}
		}
	}
	.li_edit {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 10upx;
		.edit_l {
			padding: 10upx 30upx;
			border-radius: 8upx;
			border: 1upx solid #1F64FF;
			color: #1F64FF;
			text-align: center;
			font-size: 28upx;
			font-style: normal;
			font-weight: 600; 
			margin-right: 20upx;
		}
		.edit_r {
			padding: 10upx 30upx;
			border-radius: 8upx;
			background:  #1F64FF;
			color: #fff;
			text-align: center;
			font-size: 28upx;
			font-style: normal;
			font-weight: 600; 
		}
	}
	
	
	.top_cont {
		width: 100%;
		height: 142upx;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 10;
	}
	
	.search_cont {
		width: calc(100% - 50upx);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 25upx 25upx 0 25upx;
		background: #fff;
	}
	
	.search {
		width: 90%;
		height: 72upx;
		background: #F6F6F6;
		border-radius: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 32upx;
		margin-bottom: 20upx;
	}
	
	.search_input {
		flex: 1;
	}
	
	.search_img {
		width: 36upx;
		height: 36upx;
	}
	
	.chat_type {
		display: flex;
		align-items: center;
		// justify-content: space-around;
		width: 100%;
		padding: 15upx 0;
		flex-wrap: wrap;
		flex: 1;
		.tabs {
			width: 22%;
			background: #F8F8F9;
			border-radius: 6upx;
			padding: 16upx 0;
			margin: 10upx 1.5%;
			font-style: normal;
			font-weight: 500;
			font-size: 28upx;
			line-height: 150%;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.active_tabs{
			width: 22%;
			background: rgba(31, 100, 255, 0.15);;
			border-radius: 6upx;
			padding: 16upx 0;
			margin: 10upx 1.5%;
			font-style: normal;
			font-weight: 500;
			font-size: 28upx;
			line-height: 150%;
			color: #1F64FF;
	        display: flex;
			align-items: center;
			justify-content: center;
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