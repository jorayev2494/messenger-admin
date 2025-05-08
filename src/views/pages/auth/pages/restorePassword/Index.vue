<script setup lang="ts">
  import useBehavior from './useBehavior';

  const {
    form,

    restorePassword,
  } = useBehavior()
</script>

<template>
  <div class="col-xxl-5 col-lg-4">
    <div class="position-relative rounded-3 overflow-hidden"
      style="background-image: url(@/assets/images/flowers/img-3.png); background-position: top right; background-repeat: no-repeat;">
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
            <h4 class="text-dark-50 mt-0 fw-bold">{{ $t('auth.restore_password.title') }}</h4>
            <!-- <p class="text-muted mb-4">Enter your email address and we'll send you an email with
              instructions to reset your password.</p> -->
          </div>

          <form action="#" method="POST" @submit.prevent="restorePassword">
            <div class="mb-3">
              <label for="code" class="form-label">{{ $t('auth.restore_password.form.code') }}</label>
              <input
                class="form-control"
                type="number"
                id="code"
                v-model="form.code"
                maxlength="6"
                min="0"
                :placeholder="$t('auth.restore_password.form.placeholder.code')"
              >
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">{{ $t('auth.restore_password.form.new_password') }}</label>
              <input
                class="form-control"
                type="password"
                id="password"
                v-model="form.password"
                :placeholder="$t('auth.restore_password.form.placeholder.new_password')"
              >
            </div>

            <div class="mb-3">
              <label for="password_confirmation" class="form-label">{{ $t('auth.restore_password.form.confirm_new_password') }}</label>
              <input
                class="form-control"
                type="password"
                id="password_confirmation"
                v-model="form.password_confirmation"
                :placeholder="$t('auth.restore_password.form.placeholder.confirm_new_password')"
              >
            </div>

            <div class="mb-0 text-center">
              <button class="btn btn-primary w-100" type="submit">Reset Password</button>
            </div>
          </form>
        </div> <!-- end card-body-->
      </div>

      <div class="row mt-3">
        <div class="col-12 text-center">
          <p class="text-muted bg-body">
            {{ $t('system.back_to') }}
            <router-link
              :to="{ name: 'login' }"
              class="text-muted ms-1 link-offset-3 text-decoration-underline"
            >
              <b>{{ $t('auth.login.title') }}</b>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
