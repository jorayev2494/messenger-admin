<template>
  <ol class="breadcrumb m-0" v-if="$route.meta.breadcrumbs">
    <template v-for="({ label, route }, idx) in $route.meta.breadcrumbs">
      <li class="breadcrumb-item" v-if="++idx !== $route.meta.breadcrumbs.length" :key="idx">
        <router-link :to="$tMakeRoute(route)">{{ $t(label, 2) }}</router-link>
      </li>
      <li class="breadcrumb-item active" v-else :key="idx + 1">{{ $t(label, 2) }}</li>
    </template>
  </ol>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
