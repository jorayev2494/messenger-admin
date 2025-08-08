<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue';
  import useBehavior from './useBehavior';

  const {
    // form,
    avatarPreview,
    inputs,
    update,
    uploadAvatar,
  } = useBehavior()
</script>

<template>
  <div class="row">
    <div class="col-md-5">
      <div class="card">
        <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <form action="#" method="POST" @submit.prevent="update">

            <div class="form-group row">
              <div class="row">
                <div class="col-lg-3">
                  <label for="avatar">
                    <img :src="avatarPreview" :alt="avatarPreview" class="img-fluid avatar-lg rounded-circle" />
                  </label>
                </div>
                <div class="col-lg-6">
                  <input class="form-control mt-4" id="avatar" type="file" accept="image/*" @change="event => uploadAvatar(event, (avatar: File) => inputs.form.avatar = avatar)">
                </div>
              </div>
            </div>

            <hr class="mx-2 my-4">

            <InputsAndEditors :form="inputs.form" :inputs="inputs.getInputs()" />

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
          <p class="card-text">
            <!-- <img class="avatar-img rounded" role="button" alt="Client Avatar" :src="avatarPreview" width="100%"> -->
          </p>
          <a href="javascript: void(0);" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>
