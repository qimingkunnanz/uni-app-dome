<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		
		<suspension-ball :isSlot="true" :isAdsorbent='false' :width='50' top='300' right='0'>
			<image class="icon" src="/static/snow.png" />
		</suspension-ball>
	</view>
</template>

<script>
import suspension_ball from 'component/suspension_ball.vue';
	export default {
		data() {
			return {
				title: 'Hello',
				isSlot:true
			}
		},
		components: {
			'suspension-ball':suspension_ball
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>

.content {
	text-align: center;
	height: 100vh;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}

.title {
	font-size: 36upx;
	color: #8f8f94;
}
.icon{
	width: 50px;
	height: 50px;
}
</style>
