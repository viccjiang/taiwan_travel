<template>
    <Loading :active="isLoading" />
    <div class="container">
      <div class="row ">
        <div class="col d-flex flex-column flex-md-row justify-content-center my-5">
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getData">全部景點</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('自然風景類')">自然風景類</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('遊憩類')">遊憩類</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('溫泉類')">溫泉類</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('都會公園類')">都會公園類</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('藝術類')">藝術類</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('體育健身類')">體育健身類</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('其他')">其他</button>
        </div>
      </div>
    </div>
    <!-- <div class="container mb-4 mb-md-5">
      <div class="row row-cols-12 row-cols-md-2 row-cols-lg-4">
        <div class="col" v-for="item in category" :key="item.ScenicSpotID">
          <div class="card ">
            <a href="#" class="img-card rounded-top">
              <img :src="item?.Picture?.PictureUrl1" class="card-imageUrl card-height w-100 object-fit" alt="景點">
            </a>
            <div class="card-body d-flex d-grid gap-2 mx-auto ">
              <a href="#" class="btn btn-outline-secondary card-link hover-color">查看詳情</a>
              <a href="#" class="btn btn-secondary card-link text-white">立即出發</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="container"> -->
      <!-- <div class="row">
        <div class="div">
          <select class="categorySelect">
            <option value="category"  v-for="(item, index) in filterCategory" :key="index">{{item}}</option>
          </select>
          <input type="button" class="send" value="搜尋" @click="getCategory">
        </div>
      </div> -->
      <!-- <div class="row">
        <div class="div" v-for="(item, index) in filterCategory" :key="index">
          {{item}}
        </div>
      </div> -->
      <!-- <div class="row">
        <div class="div" v-for="(item) in filterCategoryClass" :key="item.ScenicSpotID">
            {{ item.ScenicSpotName }}
        </div>
      </div> -->
  <!-- </div> -->
  <div class="container mb-4 mb-md-5">
      <div class="row row-cols-12 row-cols-md-2 row-cols-lg-4">
        <div class="col" v-for="item in scenic_spot" :key="item.ScenicSpotID">
          <div class="card ">
            <a href="#" class="img-card rounded-top">
              <img :src="item?.Picture?.PictureUrl1" v-if="!JSON.stringify(item.Picture) === '{}' || 'PictureUrl1' in item.Picture" class="card-imageUrl card-height w-100 object-fit" alt="景點">
              <img v-else class="card-imageUrl card-height w-100 object-fit" alt="圖片施工中">
            </a>
            <!-- <div class="card-body">
              <h5 class="card-title">{{ item.ScenicSpotName }}</h5>
              <p class="card-text"><i class="bi bi-clock"></i> {{ item.OpenTime }}</p>
            </div>
            <ul class="list-group list-group-flush d-flex justify-content-center" style="height:80px">
              <li class="list-group-item"><i class="bi bi-geo-alt"></i> {{ item.Address }}</li>
            </ul> -->
            <div v-if="item?.Picture?.PictureUrl1 !== undefined" class="card-body d-flex d-grid gap-2 mx-auto " >
              <a href="#" class="btn btn-outline-secondary card-link hover-color" @click.prevent="openModal(item)">查看詳情</a>
            </div>
          </div>
        </div>
      </div>
  </div>
  <Modal ref="Modal" :data="tempData" />
</template>

<script>
import getAuthorizationHeader from '../methods/getAuthorizationHeader';
import Modal from '../components/Modal.vue';

export default {
  data() {
    return {
      scenic_spot: [],
      category: [],
      isLoading: false,
      tempData: {},
    };
  },
  components: {
    Modal,
  },
  methods: {
    // 取得全部
    getData() {
      this.isLoading = true;
      // const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24format=JSON';
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24format=JSON';
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
    // 取得分類
    getCategory(category) {
      this.isLoading = true;
      // const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24format=JSON';
      const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24filter=Class1%20eq%20'${category}'%20&%24top=30&%24format=JSON`;
      this.$http.get(url, {
        headers: getAuthorizationHeader(),
      })
        .then((response) => {
          console.log(response.data);
          this.scenic_spot = response.data;
        });
      this.isLoading = false;
    },
    openModal(item) {
      this.tempData = { ...item };
      this.$refs.Modal.showModal();
    },
  },
  computed: {
    // 提取出 Class1 的分類們
    filterCategory() {
      // 提取出 category
      const category = this.scenic_spot.map((item) => item.Class1);
      // 過濾出重複的元素，重複的會被剔除掉
      return [...new Set(category)];
    },
  },
  mounted() {
    this.getData();
    // this.getCategory();
  },
};
</script>

<style lang="scss" scoped>
.card-height{
  height: 200px;
}

.hover-color:hover{
  color: white;
}

.object-fit{
  object-fit:cover;
}

.img-card {
  width: 100%;
  overflow: hidden;
}
.card-imageUrl{
  overflow: hidden;
}
.card-imageUrl:hover{
  transform: scale(1.2);
  transition: .5s;
}
.hover-color:hover{
  color: white;
}
</style>
