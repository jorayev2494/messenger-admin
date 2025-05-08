<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue';
  import useBehavior from './useBehavior';
import { RouteName } from '../../routes/RouteName';

  const {
    form,
    inputs,
  } = useBehavior()
</script>

<template>
  <div class="row">
    <div class="row mb-2">
      <div class="d-flex flex-wrap gap-2">
        <router-link :to="$tMakeRoute({ name: RouteName.EDIT })" type="button" class="btn btn-primary">
          {{ $t('system.edit') }}
        </router-link>
      </div>
    </div>

    <div class="col-md-5">
      <div class="card">
        <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <InputsAndEditors :form="form" :inputs="inputs" />
        </div>
      </div>
    </div>

    <div class="col-md-5">
      <div class="card">
        <h5 class="card-header bg-light-subtle">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="javascript: void(0);" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>
