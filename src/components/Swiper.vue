<template>
  <Loading :active="isLoading" />
  <!-- :slides-per-view="3" :space-between="50" -->
  <div class="container mb-5">
    <h3 class="text-start">HOT TOUR</h3>
    <h4 class="text-start mb-5 border-bottom pb-3 ">熱門打卡景點</h4>
    <swiper
      class="swiper-container "
      :loop="true"
      :autoplay="autoplay"
      :breakpoints="breakpoints"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
    >
      <swiper-slide
        class="card border-0 "
        v-for="item in scenic_spot"
        :key="item.id"
      >
        <div
          class="position-relative "
          style="
            height: 300px;
            background-position: center center;
            background-size: cover;
          "
          :style="{ backgroundImage: `url(${item?.Picture?.PictureUrl1})` }"
        >
          <div class="box bg-secondary text-white position-absolute">
            <p class="m-0">熱門</p>
          </div>
        </div>
        <div class="card-body">
          <h5
            class="btn card-title stretched-link p-0"
            @click="goSitePage(item.ScenicSpotID)"
          >
            {{ item.title }}
          </h5>
          <!-- <h5 class="btn card-title stretched-link p-0" >{{item.title}}</h5> -->
          <!-- <button class="btn btn-outline-secondary rounded-0 border " type="button"
                        @click="getProduct(item.id)">查看更多</button> -->
        </div>
      </swiper-slide>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.min.css';

import getAuthorizationHeader from '../methods/getAuthorizationHeader';

// 相同產品取得隨機數
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
getRandomInt();

export default {
  data() {
    return {
      nature: '',
      scenic_spot: {},
      id: '',
      isLoading: false,
      qty: 1, // 畫面上的輸入欄位顯示的預設值
      // swiper rwd
      breakpoints: {
        1: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 3.5,
          spaceBetween: 30,
        },
      },
      autoplay: {
        disableOnInteraction: false, // 使用者操作swiper之後，是否禁止autoplay
        delay: 3000, // 自動切換的時間間隔（單位ms）
      },
      modules: [Autoplay, Navigation],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    // 取得全部
    getData() {
      this.isLoading = true;
      const category = '自然風景類';
      //  const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24format=JSON';
      const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24filter=Class1%20eq%20'${category}'&%24top=10&%24format=JSON`;
      this.$http.get(url, {
        headers: getAuthorizationHeader(),
      })
        .then((response) => {
          console.log(response);
          this.scenic_spot = response.data;
          console.log(this.scenic_spot);
          this.isLoading = false;
        });
    },
    goSitePage() {
      this.$router.push('/Location');
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" >
.box {
  /*   border:1px solid #000; */
  font-size: 16px;
  // font-weight: 700;
  width: 60px;
  height: auto;
  left: 0px;
  justify-content: center;
  text-align: center;
  padding: 10px;
}
.swiper-container {
  --swiper-navigation-color: #fff;
  --swiper-navigation-size: 40px; /* 设置按钮大小 */
}
.swiper-img {
  filter: brightness(1);
  overflow: hidden;
}
.swiper-img:hover {
  filter: brightness(0.8);
  transition: 0.5s;
}
.hover-view {
  filter: brightness(0.8);
  transition: 0.5s;
}
.hover-view:hover {
  filter: brightness(0.8);
  transition: 0.5s;
}
</style>
