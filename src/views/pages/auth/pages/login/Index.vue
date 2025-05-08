<script setup lang="ts">
  import useBehavior from './useBehavior';

  const {
    form,
    login,
  } = useBehavior()
</script>

<template>
  <div class="col-xxl-5 col-lg-4">
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
          <div class="w-75">
            <h4 class="pb-0 fw-bold">{{ $t('auth.login.title') }}</h4>
            <p class="fw-semibold mb-4">{{ $t('auth.login.enter_your_email_address_and_password_to_access_admin_panel') }}</p>
          </div>

          <form action="#" @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">{{ $t('auth.login.form.email') }}</label>
              <input class="form-control" type="email" v-model="form.email" id="email" required :placeholder="$t('auth.login.form.placeholder.email')">
            </div>

            <div class="mb-3">
              <router-link :to="{ name: 'forgot-password' }" class="float-end fs-12">
                {{ $t('auth.login.forgot_your_password?') }}
              </router-link>
              <label for="password" class="form-label">{{ $t('auth.login.form.password') }}</label>
              <div class="input-group input-group-merge">
                <input type="password" id="password" v-model="form.password" class="form-control" required :placeholder="$t('auth.login.form.placeholder.password')">
                <div class="input-group-text" data-password="false">
                  <span class="password-eye"></span>
                </div>
              </div>
            </div>

            <!-- <div class="mb-3 mb-3">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="checkbox-signin" checked>
                <label class="form-check-label" for="checkbox-signin">Remember me</label>
              </div>
            </div> -->

            <div class="mb-3 mb-0 text-center">
              <button type="submit" class="btn btn-primary w-100"> {{ $t('auth.login.sign_in') }} </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- <div class="row mt-3">
      <div class="col-12 text-center">
        <p class="text-muted bg-body">Don't have an account?
          <a href="auth-register.html" class="text-muted ms-1 link-offset-3 text-decoration-underline">
            <b>Sign Up</b>
          </a>
        </p>
      </div>
    </div> -->

  </div>
</template>

