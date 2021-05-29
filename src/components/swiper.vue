<!-- 轮播组件 -->
<template>
 <div class="swiper-container" :style="{ height: height, width: width }">
  <div class="swiper-wrapper">
   <div class="swiper-slide"  :class="[isEsports ? 'isEsports' :'',{ swiperactive: index === swiperActive }]"  v-for="(data, index) in swiperData" :key="index" @click="swiperclick(data,index)">
    <slot :options="data"></slot>
   </div>
  </div>
  <!-- swiper分页 -->
  <!-- <div :class="swiperPage" v-if="swiperPage"></div> -->
  <!-- 轮播上一页下一页的 插槽样式自定义 -->
  <div class="prevButton">
   <slot name="prevButton"></slot>
  </div>
  <div class="nextButton">
   <slot name="nextButton"></slot>
  </div>
  <div class="swiper_pages"></div>
 </div>
</template>

<script>
import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.min.css'
import 'swiper/swiper-bundle.css'
export default {
 props: {
  view: {
   // 显示所少个视图
   type: [Number, String],
   default: 1,
  },
  option: {
   type: [Object, Array, Number],
   default: function () {
    return []
   },
  },
  name: {
   // swiper 的实例化的名称 唯一
   type: String,
   default: 'swiperss',
  },
  loop: {
   type: Boolean,
   default: false,
  },
  isEsports: {
   type: Boolean,
   default: false,
  },
  autoplay: {
   type: Number | Boolean,
   default: 2000,
  },
  swiperPage: {
   // 分页class 为空不显示分页
   type: String,
   default: '',
  },
  slidesPerGroup: {
   // 在carousel mode下定义slides的数量多少为一组
   type: Number,
   default: 1,
  },
  width: {
   // swiper 的高度 游戏页面一般会使用
   type: String | Number,
   default: '100%',
  },
  height: {
   // swiper 的高度 游戏页面一般会使用
   type: String,
   default: '100%',
  },
  nextButton: {
   // 下一页的class名称
   type: String,
   default: '',
  },
  prevButton: {
   // 上一页的class名称
   type: String,
   default: '',
  },
  color: {
   // 小圆点默认颜色
   type: String,
   default: '#000',
  },
  activeColor: {
   // 选中状态默认颜色
   type: String,
   default: 'red',
  },
 },
 data() {
  return {
   swiperData: this.option,
   currentIndex: 0,
   swiperActive:0
  }
 },
 watch: {
  option(to) {
   if (to && to.length) {
    this.swiperData = to
    this.install()
   }
  },
  currentIndex: function (val, oldVal) {
   this.$emit('onSwiperIndexChanged', val)
  },
 },
 created() {},
 beforeDestroy() {
  window[this.name] = null
 },
 mounted() {
  if (this.option) {
   this.install()
  }
 },
 methods: {
   swiperclick(data,index){
     this.swiperActive = index
     console.log(data,index)
   },
  install() {
   if (this.option && this.option.length) {
    this.$nextTick(() => {
     let _this = this
     window[this.name] = new Swiper(this.$el, {
      pagination: {
       el: this.swiperPage && this.option.length > 1 ? '.' + this.swiperPage : '',
       clickable: true,
      },
      navigation: {
       nextEl: '.prevButton',
       prevEl: '.nextButton',
      },
      paginationClickable: true,
      centeredSlides: this.view > 1 ? false : true, // 是否居中显示
      autoplayDisableOnInteraction: false,
      slidesPerView: this.view, // 视图
      nextTick: true,
      autoplay: this.autoplay
       ? {
          delay: this.autoplay,
          disableOnInteraction: false,
         }
       : false, // 自动轮播时间
      loop: this.option.length > 1 ? this.loop : false, // 是否开启循环轮播
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      on: {
       init(swiper) {
        let smallBtn_active = document.getElementsByClassName('swiper-pagination-bullet-active')[0]
        let smallBtn = document.getElementsByClassName('swiper-pagination-bullet')
        if (smallBtn) {
         for (var i = 0; i <= smallBtn.length; i++) {
          if (smallBtn[i]) {
           smallBtn[i].style.backgroundColor = _this.color
          }
         }
         if (smallBtn_active) {
          smallBtn_active.style.backgroundColor = _this.activeColor
         }
        }
       },
       tap: (event) => {
        // this.$emit('click', event.target.getAttribute('data-object'))
        //  console.log(event.target.getAttribute('data-object'))
        //用户点击有链接就新窗口打开
        // console.log(this.name)
        // console.log(window[this.name])
        // if (window[this.name].clickedSlide) {
        //  this.$emit('click', window[this.name].clickedSlide.children[0].getAttribute('data-object'))
        // }
       },
       slideChangeTransitionStart: function (swiper) {
        let smallBtn_active = document.getElementsByClassName('swiper-pagination-bullet-active')[0]
        if (smallBtn_active) {
         let smallBtn = document.getElementsByClassName('swiper-pagination-bullet')
         for (var i = 0; i <= smallBtn.length; i++) {
          if (smallBtn[i]) {
           smallBtn[i].style.backgroundColor = _this.color
          }
         }
         if (smallBtn_active) {
          smallBtn_active.style.backgroundColor = _this.activeColor
         }
        }
       },
      },
     })
    })
   }
  },
  swiperSlideTo(index) {
   window[this.name].slideTo(index)
  },
  swiperSnapIndex() {
   //  console.log('snapIndex', window[this.name].snapIndex)
   return window[this.name].snapIndex
  },
  handlePrev() {
   window[this.name].slidePrev()
  },
  handleNext() {
   window[this.name].slideNext()
  },
 },
}
</script>

<style lang="stylus" scoped>
.swiper-container {
 width: 100%;
 height: 100%;
 .swiper-slide {
  cursor: pointer;
 }
 .isEsports {
  width: 155px !important;
  margin-right: 12px;
 }

 .swiper-pagination-bullets {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  margin: auto;
  z-index: 3;
  display: flex;
  justify-content: center;
 }
}
</style>
