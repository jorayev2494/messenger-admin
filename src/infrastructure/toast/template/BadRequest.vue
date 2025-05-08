<template>
  <div v-if="title" class="text-danger">
    <strong>{{ title }}</strong>
  </div>
  <span>{{ message }}</span>
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