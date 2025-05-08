<template>
  <div v-if="title" class="text-primary">🔔 <strong>{{ title }}</strong></div>

  <div>{{ message }}</div>

  <div class="row mt-2">
    <div class="col-6 pe-0">
      <button type="button" class="btn btn-danger btn-sm w-100 p-0" style="margin-right: 5px">Close</button>
    </div>

    <div class="col-6 ps-0">
      <button type="button" class="btn btn-success btn-sm w-100 p-0" style="margin-left: 5px">Show</button>
    </div>

    <!-- <div class="col-12">
      <button type="button" class="btn btn-outline-success btn-sm w-100 p-0">Show</button>
    </div> -->
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ServerValidate',
    props: {
      closeToast: Function,
      toastProps: Object,
    },
    setup(props) {
      const {
        title,
        message,
      } = props.toastProps.data;

      return {
        title: title ?? null,
        message,
      };
    }
  };
</script>
