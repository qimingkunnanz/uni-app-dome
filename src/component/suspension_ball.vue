<template name="suspensionBall">
  <view :class="{move:'maskView'}" @touchmove.stop='ture'>
    <view class="slot" v-if="isSlot" @touchmove.stop="touchstart" @touchend.stop='bindtouchend' :style="{top:top+'px',right:right+'px',width: width+'px',height: width+'px'}">
      <slot></slot>
    </view>
    <view class="SuspendedFrame" v-else @touchmove.stop="touchstart" @touchend.stop='bindtouchend' :style="{top:top+'px',right:right+'px','border-radius':borderRadius}">
      <view class="heart" @click="jumpToServiceCenter">
        <view v-if="show == 'myPoints'">
          <image src="../images/vip_center/huiuanzhongxin2@2x.png" class="icon1"/>
          会员活动
        </view>
        <view v-else-if="show == 'metinfo'">
          <image src="../images/vip_center/icon_fw_1@2x.png" class="icon"/>
          服务大厅
        </view>
        <view v-else>
          <image src="../images/vip_center/icon_vip_1@2x.png" class="icon2"/>
          会员中心
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
name: "suspensionBall",
data() {
  return {
    windowHeight: "", // 屏幕宽度
    windowWidth: "", // 屏幕高度
    top: "",
    right: "",
    borderRadius: "", //样式
    move: false //触摸时遮罩
  };
},
props: {
  show: {
    type: String,
    required: true
  },
  isMove:{// 是否可拖拽
    type: Boolean,
    default: true
  },
  isAdsorbent:{// 是否有吸附效果（true：有/false：无）默认false
    type: Boolean,
    default: false
  },
  isSlot:{// 是否使用插槽（true：使用/false：不是呀）默认false 显示默认样式
    type: Boolean,
    default: false
  },
  stopRange:{// 定义活动范围（停止时距离屏幕边框的px大小）
    type: Number,
    default:0
  },
  //初始化时悬浮球的位置
  // top: String, 
  // right: String,
  width: {
    type: Number,
    default:60
  }
},
methods: {
  touchstart(e) {
    console.log("开始触摸");
    if (!this.isMove) return false;
    wx.stopPullDownRefresh();
    let left = e.touches[0].clientX;
    // x轴移动距离
    this.right = this.windowWidth - left + (this.width/2);
    // y轴移动距离
    this.top = e.touches[0].clientY - (this.width/2);
    // 移动的时候显示为圆圈
    this.borderRadius = "50%";
    // 最大高度
    let maxwh = this.windowHeight;
    // 最大宽度
    this.maxww = this.windowWidth;
    // 限制移动范围
    if (this.top >= maxwh) {
      this.top = maxwh;
    } else if (this.top <= 0) {
      this.top = 0;
    } else if (this.right <= 0) {
      this.right = 0;
    } else if (this.right >= this.maxww) {
      this.right = this.maxww;
    }
    // 移动时弹出遮罩层
    this.move = true;
  },
  /**
   * @module SuspensionBall
   * @author: lwh
   * @description: 当用户松开悬浮球
   * @since: 2019-09-19 15:22:22
   */
  bindtouchend() {
    if (!this.isMove) return false;
    console.log("触摸结束");
    let minww = this.maxww / 2;
    // 结束时取消遮罩层
    this.move = false;
    // 回弹
    if (this.right > minww) {
      this.right = this.maxww - this.stopRange;
    } else {
      this.right = 0 + this.stopRange;
    }
    if (this.right == 0) {
      this.borderRadius = "50% 0 0 50%";
    } else if (this.right == this.maxww) {
      this.borderRadius = "0 50% 50% 0";
    }
  },
  jumpToServiceCenter() {
    console.log(this.show);
    if (this.show == "myPoints") {
      wx.navigateTo({
        url: "/pages/member_activity"
      });
    } else if (this.show == "metinfo") {
      wx.navigateTo({
        url: "/pages/serviceCenter?index=2"
      });
    } else {
      wx.navigateTo({
        url: "/pages/serviceCenter?index=1"
      });
    }
  }
},
created(){
  let that = this;
  // 获取屏幕的宽高
  uni.getSystemInfo({
    success(res) {
      // 高度,宽度 单位为px
      // 这个地方的60是基于拖动块级元素大小而定，不然触摸结束后停下的位置容易产生偏差
      that.windowHeight = res.windowHeight - that.width;
      that.windowWidth = res.windowWidth - that.width;
    }
  });
}
}
</script>

<style>
.maskView {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 998;
}
.SuspendedFrame {
  position: fixed;
  top: 165rpx;
  right: 0rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50% 0 0 50%;
  background-color: #eee;
  z-index: 999;
}
.slot {
  position: fixed;
  top: 165rpx;
  right: 0rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.heart {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #259edf;
  color: #259edf;
  border-radius: 50%;
  text-align: center;
  line-height: 15px;
  font-size: 8px;
}
.icon,
.icon1,
.icon2 {
  display: block;
  margin: 10px auto 0;
  width: 25px;
  height: 20px;
}
.icon1,
.icon2 {
  margin: 9px auto 0;
  width: 22px;
  height: 22px;
}
.icon2 {
  width: 20px;
  height: 22px;
}
</style>