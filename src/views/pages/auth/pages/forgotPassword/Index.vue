<script setup lang="ts">
  import useBehavior from './useBehavior';

  const {
    form,
    sendRequest,
  } = useBehavior()
</script>

<template>
  <div class="col-xxl-5 col-lg-4">
    <div class="position-relative rounded-3 overflow-hidden"
      style="background-image: url(@/assets/images/flowers/img-3.png); background-position: top right; background-repeat: no-repeat;">
      <div class="card bg-transparent mb-0">

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
            <h4 class="text-dark-50 mt-0 fw-bold">{{ $t('auth.forgot_password.title') }}</h4>
            <p class="text-muted mb-4">{{ $t('auth.forgot_password.enter_your_email_address_and_we_will_send_you_an_email_with_instructions_to_reset_your_password') }}</p>
          </div>

          <form action="#" method="POST" @submit.prevent="sendRequest">
            <div class="mb-3">
              <label for="email" class="form-label">{{ $t('auth.forgot_password.form.email') }}</label>
              <input
                class="form-control"
                type="email"
                id="email"
                v-model="form.email"
                :placeholder="$t('auth.forgot_password.form.placeholder.email')"
                required
              >
            </div>

            <div class="mb-0 text-center">
              <button class="btn btn-primary w-100" type="submit">{{ $t('system.send') }}</button>
            </div>
          </form>
        </div>
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
