<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue';
  import Cropper from '@/views/components/Cropper/Index.vue';
  import useBehavior from './useBehavior';

  const {
    // form,
    imagePreview,
    inputBuilder,
    update,
    selectedImage,
    imageCropperHandler,
  } = useBehavior()
</script>

<template>
  <div class="row">
    <Cropper :file="inputBuilder.form.image" :cropper-handler="imageCropperHandler" :size="{ width: 400, height: 400 }" />

    <div class="col-md-5">
      <div class="card">
        <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
        <div class="card-body">
          <!-- <h5 class="card-title">Special title treatment</h5> -->
          <form action="#" method="POST" @submit.prevent="update">
            <div class="form-group row">
              <div class="row">
                <center>
                  <label for="avatar">
                    <img :src="imagePreview" :alt="imagePreview" class="img-fluid avatar-lg rounded-circle" />
                  </label>
                </center>
                <center>
                  <div class="col-lg-6">
                    <input class="form-control mt-4" id="avatar" type="file" accept="image/*" @change="selectedImage">
                  </div>
                </center>
              </div>
            </div>

            <hr class="mx-2 my-4">

            <!-- <pre>
              {{ inputBuilder.forms }}
              {{ inputBuilder.getInputs() }}
            </pre> -->

            <InputsAndEditors :form="inputBuilder.form" :inputs="inputBuilder.getInputs()" />
            <button type="submit" class="btn btn-primary">{{ $t('system.update') }}</button>
          </form>
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
