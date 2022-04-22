<template>
    <Loading :active="isLoading" />
    <!-- banner -->
    <section class="banner">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="text-light text-center">
              <p>Welcome to TaipeiTaipei Travel </p>
              <h2 class="display-4 fw-bold">Taipei Travel，Travel Go</h2>
              <p class="fs-4 mb-5">
                多給自己一點時間享受生活，走出戶外感受大自然
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row ">
        <div class="col d-flex flex-column flex-md-row justify-content-center my-5">
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getData">全部活動</button>
          <button type="button" class="btn btn-outline-secondary hover-color mx-md-2 mb-2 mb-md-2" @click.prevent="getCategory('節慶活動')">節慶活動</button>
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
      <div class="row  row-cols-12 row-cols-sm-2 row-cols-md-2 row-cols-lg-4">
        <div class=" mb-4" v-for="item in activity" :key="item.ActivityID">
          <div class="card ">
            <a href="#" class="img-card rounded-top">
              <img :src="item?.Picture?.PictureUrl1" v-if="!JSON.stringify(item.Picture) === '{}' || 'PictureUrl1' in item.Picture" class="card-imageUrl card-height w-100 object-fit" alt="節慶活動">
              <img v-else class="card-imageUrl card-height w-100 object-fit" alt="圖片施工中">
            </a>
            <div class="card-body">
              <h5 class="card-title text-center m-0">{{ item.ActivityName }}</h5>
            </div>
            <div v-if="item?.Picture?.PictureUrl1 !== undefined" class="card-body d-flex d-grid gap-2 mx-auto p-0">
              <!-- <a href="#" class="btn btn-outline-secondary card-link hover-color" @click.prevent="openModal(item)">查看詳情</a> -->
            </div>
            <div class="card-footer border-0 d-grid bg-white">
              <button class="btn btn-outline-secondary card-link hover-color stretched-link" type="button" @click.prevent="openModal(item)">查看詳情</button>
              <!-- <a href="#" class="btn btn-outline-secondary card-link hover-color">查看詳情</a> -->
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
      activity: [],
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
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?%24format=JSON';
      this.$http.get(url, {
        headers: getAuthorizationHeader(),
      })
        .then((response) => {
          console.log(response);
          this.activity = response.data;
          console.log(this.activity);
          this.isLoading = false;
        });
    },
    // 取得分類
    getCategory(category) {
      this.isLoading = true;
      //  const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?%24format=JSON';
      //  const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?%24filter=Class1%20eq%20'${category}'%20&%24top=30&%24format=JSON`;
      const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?%24filter=Class1%20eq%20'${category}'&%24format=JSON`;
      this.$http.get(url, {
        headers: getAuthorizationHeader(),
      })
        .then((response) => {
          console.log(response.data);
          this.activity = response.data;
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
      const category = this.activity.map((item) => item.Class1);
      console.log(this.category);
      // 過濾出重複的元素，重複的會被剔除掉
      return [...new Set(category)];
    },
  },
  mounted() {
    this.getData();
    console.log(this.category);
    // this.getCategory();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: calc(50vh - 73px);
  background-image: url("https://images.unsplash.com/photo-1511225070737-5af5ac9a690d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-position: center center;
  background-size: cover;
}
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
