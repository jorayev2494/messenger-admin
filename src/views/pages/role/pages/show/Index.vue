<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue'
  import useBehavior from './useBehavior';

  const {
    inputs,
    form,
  } = useBehavior()
</script>

<template>
  <div class="row">
    <div class="col-md-5">
      <div class="card">
        <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <InputsAndEditors :form="form" :inputs="inputs" />
        </div>
      </div>
    </div>
  </div>
</template>

