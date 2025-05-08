<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import Breadcrumb from './partials/Breadcrumb/Index.vue';
  import Topbar from './partials/Topbar/Index.vue';
  import Sidebar from './partials/Sidebar/Index.vue';
  import Footer from './partials/Footer/Index.vue';
  import ThemeSettings from './partials/ThemeSettings.vue';
</script>

<template>
  <!-- Begin page -->
  <div class="wrapper">
    <!-- ========== Topbar Start ========== -->
    <Topbar />
    <!-- ========== Topbar End ========== -->

    <!-- ========== Left Sidebar Start ========== -->
    <Sidebar />
    <!-- ========== Left Sidebar End ========== -->

    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
      <!-- <div class="content"> -->

      <div class="container-fluid">

      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="bg-flower">
            <img src="@/assets/images/flowers/img-3.png">
          </div>

          <div class="bg-flower-2">
            <img src="@/assets/images/flowers/img-1.png">
          </div>

          <div class="page-title-box">
            <div class="page-title-right">
              <!-- <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><a href="javascript: void(0);">Powerx</a></li>
                <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                <li class="breadcrumb-item active">Starter</li>
              </ol> -->
              <Breadcrumb v-if="$route.name !== 'dashboard'" />
            </div>

            
            <h4 class="page-title" v-if="$route?.meta?.title" style="text-decoration: none;">
              <!-- <i class="ri-shield-keyhole-line"></i> -->
              {{ $t($route?.meta?.title, 2) }}
            </h4>
            
          </div>
        </div>
      </div>
      <!-- end page title -->

      </div>

      <!-- Start Content-->
      <RouterView />
      <!-- container -->

      <!-- </div> -->
      <!-- content -->

      <!-- Footer Start -->
      <Footer />
      <!-- end Footer -->
    </div>

    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->
  </div>
  <!-- END wrapper -->

  <!-- Theme Settings -->
  <ThemeSettings />
</template>
