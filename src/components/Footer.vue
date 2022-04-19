<template>
  <section class="banner">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="text-light text-center">
            <figure>
                <blockquote class="blockquote fs-3 fw-bold">
                    <p>To travel is to live.</p>
                </blockquote>
                <figcaption class="blockquote-footer text-white">
                    Hans Christian Anderson
                </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
    <footer class="bg-light py-4 py-md-3 text-primary">
        <div class="container row g-0 mx-auto px-3 fs-7  text-center">
        <div class="mt-2 mb-2">本網站僅供個人作品使用，不提供商業用途 <span class="d-none d-md-inline-block"><router-link class="p-0 nav-link link-primary" to="/">｜Taiwan Travel</router-link> </span></div>
        <div class="d-flex  justify-content-center align-items-center">
            <div class="mx-2">© 2022 taiwan travel COPYRIGHT</div>
            <ul class="text-center d-flex justify-content-center align-items-center list-unstyled ">
                <li>
                    <a href="#" class="mx-2"><i class="bi bi-github"></i></a>
                </li>
                <li>
                    <a href="#" class="mx-2"><i class="bi bi-instagram"></i></a>
                </li>
                <li>
                    <a href="#" class="mx-2"><i class="bi bi-messenger"></i></a>
                </li>
            </ul>
        </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.banner {
  height: 300px;
  background-image: url("https://images.unsplash.com/photo-1650292068299-3524ed138414?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80");
  background-position: bottom center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
