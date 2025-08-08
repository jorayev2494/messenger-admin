<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue';
  import useBehavior from './useBehavior';

  const {
    form,
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
            <InputsAndEditors :form="form" :inputs="inputs" />
            <div class="form-group row">
              <label for="avatar" class="col-lg-3 col-form-label my-2">
                Avatar
              </label>
              <div class="my-2 col-lg-9">
                <input class="form-control" id="avatar" type="file" accept="image/*" @change="event => uploadAvatar(event, (avatar: File) => form.avatar = avatar)">
              </div>
            </div>
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
            <img class="avatar-img rounded" role="button" alt="Client Avatar" :src="avatarPreview" width="100%">
          </p>
          <a href="javascript: void(0);" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>
