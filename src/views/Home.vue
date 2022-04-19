<template>
  <!-- banner -->
  <section class="banner mb-4 mb-md-5">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="text-light text-center">
            <p>Welcome to Taiwan Travel </p>
            <h2 class="display-4 fw-bold">Taiwan Travel，Travel Go</h2>
            <p class="fs-4 mb-5">
              多給自己一點時間享受生活，走出戶外感受大自然
            </p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <router-link
              to="/activity"
              class="btn btn-light fs-5 px-5 py-2 me-2"
              >立即出發</router-link
            >
            <router-link to="/location" class="btn btn-primary fs-5 px-5 py-2"
              >景點介紹</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- intro -->
  <div class="container mb-4 mb-md-5 text-center">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100 border-0">
          <a href="#" class="img-card rounded-3">
            <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            class="card-imageUrl"
            alt="景點"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">精選景點</h5>
            <p class="card-text">
              英丁西久主走放而位荷。皮意弓婆你停可行占您車波新牙雨種也，會房也；尼才花詞。
            </p>
          </div>
          <div class="card-footer bg-primary rounded-3 rounded-0">
            <a href="#" class="text-white ">Let's Go</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 border-0">
          <a href="#" class="img-card rounded-3">
            <img
              src="https://images.unsplash.com/photo-1565806946529-e9500c4eb4d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="card-imageUrl "
              alt="景點"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">嚴選活動</h5>
            <p class="card-text">
              英丁西久主走放而位荷。皮意弓快發清羊對月也，會房也；尼才花詞。
            </p>
          </div>
          <div class="card-footer bg-primary rounded-3 rounded-0">
            <a href="#" class="text-white ">Let's Go</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 border-0">
          <a href="#" class="img-card rounded-3">
            <img
              src="https://images.unsplash.com/photo-1630151352491-7db1466e4bfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="card-imageUrl"
              alt="景點"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">立即出發</h5>
            <p class="card-text">
              英丁西久主走放而位荷。尤浪何夏見快發清羊對月也，會房也；尼才花詞。
            </p>
          </div>
          <div class="card-footer bg-primary rounded-3">
            <a href="#" class="text-white ">Let's Go</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- top -->
  <div class="container">
    <div class="row row-cols-12 row-cols-md-4">
      <div class="col" v-for="item in scenic_spot" :key="item.ScenicSpotID">
        <div class="card" style="width: 18rem;">
          <img :src="item?.Picture?.PictureUrl1" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{item.ScenicSpotName}}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getAuthorizationHeader from '../methods/getAuthorizationHeader';

export default {
  data() {
    return {
      scenic_spot: [],
      tourCategory: [],
      isLoading: false,
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=8&%24format=JSON';
      this.$http.get(url, {
        headers: getAuthorizationHeader(),
      })
        .then((response) => {
          this.scenic_spot = response.data;
          console.log(this.scenic_spot);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 73px);
  background-image: url("https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-position: bottom center;
  background-size: cover;
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
</style>
