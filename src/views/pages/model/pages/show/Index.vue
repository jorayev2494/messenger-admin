<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue';
  import useBehavior from './useBehavior';

  const {
    form,
    logoPreview,
    inputBuilder,
  } = useBehavior()
</script>

<template>
  <div class="row">
    <div class="col-md-5">
      <div class="card">
        <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <div class="form-group row">
            <div class="row">
              <div class="col-lg-3">
                <label for="avatar">
                  <img :src="logoPreview" :alt="logoPreview" class="img-fluid avatar-lg rounded-circle" />
                </label>
              </div>
              <div class="col-lg-6">
                
              </div>
            </div>
          </div>

          <hr class="mx-2 my-4">

          <InputsAndEditors :form="form" :inputs="inputBuilder.getInputs()" />
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
