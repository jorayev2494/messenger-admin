<script setup lang="ts">
  import Permissions from '../../components/permission/Permissions.vue';
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue'
  import useBehavior from './useBehavior';

  const {
    inputs,
    form,
    permissionIds,
    update,
  } = useBehavior()
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <!-- permissionIds permissionIds: <pre>{{ permissionIds }}</pre> -->
            <form action="#" method="POST" @submit.prevent="update">
              <InputsAndEditors :form="form" :inputs="inputs" />
              <button type="submit" class="btn btn-primary">{{ $t('system.update') }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <Permissions :permission-ids="permissionIds" />
      </div>
    </div>
  </div>
</template>

