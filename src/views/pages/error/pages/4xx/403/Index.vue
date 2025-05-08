<script setup lang="ts">
  
</script>

<template>
  <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xxl-6 col-lg-5">
          <div class="position-relative rounded-3 overflow-hidden" style="background-image: url(@/assets/images/flowers/img-3.png); background-position: top right; background-repeat: no-repeat;">
            <div class="card bg-transparent mb-0">
              <!-- Logo-->
              <div class="auth-brand">
                <a href="index.html" class="logo-light">
                  <img src="@/assets/images/logo.png" alt="logo" height="22">
                </a>
                <a href="index.html" class="logo-dark">
                  <img src="@/assets/images/logo-dark.png" alt="dark logo" height="22">
                </a>
              </div>

              <div class="card-body p-4">
                <div class="">
                  <h1 class="text-error">4<i class="ri-emotion-sad-line"></i>3</h1>
                  <h4 class="text-uppercase text-danger mt-3">{{ $t('error.4xx.403.label') }}</h4>
                  <p class="text-muted mt-3">{{ $t('error.4xx.403.description') }}</p>

                  <router-link class="btn btn-primary w-100 mt-3" :to="{ name: 'index' }">
                    <i class="ri-home-4-line"></i>
                    {{ $t('error.back_to_home') }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>