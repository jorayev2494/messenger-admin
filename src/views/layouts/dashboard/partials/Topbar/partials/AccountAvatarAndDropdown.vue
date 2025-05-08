<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import useAuth from '@/services/auth/useAuth'
  import { RouteName as ProfileRouteName } from '@/views/pages/profile/routes/RouteName'
  import { useAuthStore } from '@/views/pages/auth/store/auth'
  import { RouteName } from '@/views/pages/auth/routes/RouteName'

  const store = useAuthStore()
  const router = useRouter()

  const dropdownItems = [
    {
      label: 'profile.context_title',
      icon: 'ri-account-circle-line',
      route: {
        name: ProfileRouteName.SHOW,
      },
    },
    {
      label: 'Settings',
      icon: 'ri-settings-4-line',
      route: {
        name: 'dashboard',
      },
    },
    {
      label: 'Support',
      icon: 'ri-account-circle-line',
      route: {
        name: 'dashboard',
      },
    },
    {
      label: 'Lock Screen',
      icon: 'ri-lock-password-line',
      route: {
        name: 'dashboard',
      },
    },
  ]

  const logout = () => {
    useAuth.logout().then(() => {
      router.push({ name: RouteName.PREFIX })
    })
  }
</script>

<template>
  <div>
    <a
      v-if="store.getAuthData"
      class="nav-link dropdown-toggle arrow-none nav-user px-2"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
      aria-haspopup="false"
      aria-expanded="false"
    >
      <span class="account-user-avatar">
        <img
          src="@/assets/images/users/avatar-1.jpg"
          alt="user-image"
          width="32"
          class="rounded-circle"
        />
      </span>
      <span class="d-lg-flex flex-column gap-1 d-none">
        <h5 class="my-0">{{ store.getAuthData?.first_name }} {{ store.getAuthData?.last_name }}</h5>
        <h6 class="my-0 fw-normal">{{ store.getRole?.value }}</h6>
      </span>
    </a>
    <div
      class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown"
    >
      <!-- item-->
      <div class="dropdown-header noti-title">
        <h6 class="text-overflow m-0">Welcome!</h6>
      </div>

      <!-- item-->
      <!-- <a href="pages-profile.html" class="dropdown-item">
        <i class="ri-account-circle-line fs-18 align-middle me-1"></i>
        <span>My Account</span>
      </a> -->

      <!-- item-->
      <!-- <a href="pages-profile.html" class="dropdown-item">
        <i class="ri-settings-4-line fs-18 align-middle me-1"></i>
        <span>Settings</span>
      </a> -->

      <!-- item-->
      <!-- <a href="pages-faq.html" class="dropdown-item">
        <i class="ri-customer-service-2-line fs-18 align-middle me-1"></i>
        <span>Support</span>
      </a> -->

      <!-- item-->
      <!-- <a href="auth-lock-screen.html" class="dropdown-item">
        <i class="ri-lock-password-line fs-18 align-middle me-1"></i>
        <span>Lock Screen</span>
      </a> -->

      <router-link
        v-for="({ route, icon, label }, idx) in dropdownItems" :key="idx"
        :to="route"
        class="dropdown-item"
      >
        <i :class="icon" class="fs-18 align-middle me-1"></i>
        <span>{{ $t(label) }}</span>
      </router-link>

      <!-- item-->
      <a href="#" class="dropdown-item" @click="logout">
        <i class="ri-logout-box-line fs-18 align-middle me-1"></i>
        <span>Logout</span>
      </a>
    </div>
  </div>
</template>