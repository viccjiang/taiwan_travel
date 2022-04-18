<template>
  <section class="banner">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="text-light text-center">
            <h2 class="display-4 fw-bold ">Taiwan Travel，旅遊趣</h2>
            <p class="fs-4 mb-5">多給自己一點時間享受生活，走出戶外感受大自然</p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <router-link to="/activity" class="btn btn-light fs-5 px-5 py-2 me-2">立即出發</router-link>
            <router-link to="/location" class="btn btn-primary fs-5 px-5 py-2">景點介紹</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
    height: calc( 100vh - 73px );
    background-image: url('https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    background-position: bottom center;
    background-size: cover;
}
</style>
