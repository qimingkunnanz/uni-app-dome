<template>
  <view class="scroll-list">
    <!-- tab列表 -->
    <scroll-view class="tab-scroll" scroll-x :scroll-left="scrollLeft" enable-flex @scroll="bindscroll">
      <block v-for="(item,index) in tabList" :key="index">
        <view :class="[tabIndex==index?'blue':'grey','scroll'+index]" :data-index='index' @tap='swichNav'> {{item}} </view>
      </block>
    </scroll-view> 
    <!-- 内容滑动列表 -->
    <swiper class="tab-content" :style="{ height: winHeight + 'rpx'}" :current="tabIndex" @change="swiperTab">
      <swiper-item v-for="(item,index) in tabList" :key="index">
        <scroll-view scroll-y style="height:100%">
          <!-- 内容列表 -->
          <block v-for="(item,index) in 50" :key="index">
            <view class="tab-content-box">
              <view class="tab-content-text">
                <view>1.纯水机为什么要排废水？</view>
                <view class="eee">因为排除废水有利于纯水机的使用周期。</view>
              </view>
              <image class="urlImg" src="https://img.ougo.ltd/FhVWZoMVFYGLwLR7wYO3X62CzvaT"/>
            </view>
          </block>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
data() {
  return {
    winHeight:0,//swiper高度
    tabList:['全部','关注','今日推荐','热点','热门话题','超话','直播','同城'],//tab列表
    tabIndex:0,
    scrollLeft:0,//滑动列表时滑动tab标签
  }
},
methods:{
// 点击tab
swichNav(e){
  console.log(e.currentTarget.dataset.index);
  this.tabIndex=e.currentTarget.dataset.index;
},
// 滑动内容列表时触发
swiperTab(e){
  console.log(this.tabIndex,e.detail.current);
  let current = e.detail.current,
      index = this.tabIndex,
      textWidth = '';
  const query = uni.createSelectorQuery();
  query.select(`.scroll${index < current?index:current}`).boundingClientRect();
  query.exec( rect => {
    console.log('1');
    textWidth=rect[0].width+10;
    console.log('2');
    if (index == current) return;
    if (index==0) this.scrollLeft=0;
    if (index < current) {
      console.log(this.scrollLeft,textWidth);
      // 向右滑动
      if (current>this.tabList.length) return
      this.scrollLeft += textWidth;
    } else {
      console.log('4');
      // 向左滑动
      if (current<0) return
      this.scrollLeft -= textWidth;
    }
    this.tabIndex=e.detail.current;
  })
},
// tab滑动时触发
bindscroll(e){
  console.log(e.detail.scrollLeft);
  this.scrollLeft=e.detail.scrollLeft
}
},
onLoad(){
  let that = this;
  wx.getSystemInfo({
    success: function (res) {
      let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
      let  calc = clientHeight * rpxR - 90;
      // 计算出内容的高度
      that.winHeight = calc;
    }
  });
},
}
</script>

<style scoped>
page{
  width: 100vw;
}
.scroll-list{
}
.tab-scroll{
  position: fixed;
  top: 0;
  left: 0;
  padding: 30rpx;
  padding-right: 0;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  font-size: 26rpx;
}
.tab-scroll view{
  display: inline-block;
  width: auto;
  padding: 10rpx 25rpx;
  margin-right: 20rpx;
  border-radius: 25rpx;
  background-color: #fff;
}
.grey{
  color: #b3b3b3;
}
.blue{
  color: #209bde;
}
.tab-content{
  margin-top: 110rpx;
  background-color: #fff;
}
.tab-content-box{
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  font-size: 28rpx;
}
.tab-content-text{
  display: grid;
  grid-template-columns: repeat(1,1fr);
}
.eee{
  font-size: 24rpx;
  color: #d8d8d8;
}
.urlImg{
  width: 120rpx;
  height: 120rpx;
}
</style>