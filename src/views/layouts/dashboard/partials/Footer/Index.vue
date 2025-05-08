<script setup lang="ts">
  import { ref } from 'vue';

  const fullYear = ref(new Date().getFullYear())
  // document.write(new Date().getFullYear().toString());
</script>

<template>
  <footer class="footer m-1" style="max-width: none;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          {{ fullYear }} © Powerx - Coderthemes.com
        </div>
        <div class="col-md-6">
          <div class="text-md-end footer-links d-none d-md-block">
            <a href="javascript: void(0);">About</a>
            <a href="javascript: void(0);">Support</a>
            <a href="javascript: void(0);">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>