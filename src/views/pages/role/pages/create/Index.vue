<script setup lang="ts">
  import InputsAndEditors from '@/views/components/InputsAndEditors/Index.vue'
  import useBehavior from './useBehavior';

  const {
    inputs,
    form,
    create,
  } = useBehavior()
</script>

<template>
  <div class="row">
    <div class="col-md-5">
      <div class="card">
        <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <form action="#" method="POST" @submit.prevent="create">
            <InputsAndEditors :form="form" :inputs="inputs" />
            <button type="submit" class="btn btn-primary">{{ $t('system.create') }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

