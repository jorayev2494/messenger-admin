<template>
  <div>
    <span class="text-danger">{{ message }}</span>
    <ul class="list-unstyled">
      <div v-for="(attributeErrors, attribute) in errors" :key="attribute">
        <li v-for="(attrError, key) in attributeErrors" :key="key">
          <small v-html="attrError"></small>
        </li>
      </div>
    </ul>
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
        message,
        errors
      } = props.toastProps.data;

      return {
        message,
        errors,
      };
    }
  };
</script>