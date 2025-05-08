<script setup lang="ts">
  import { defineProps, type PropType } from 'vue'
  import useBehavior from './useBehavior';

  const props = defineProps({
    permissionIds: {
      type: Array as PropType<number[]>,
      default: () => ([]),
    }
  })

  const {
    cols,
    rows,
    permissions,
    groupedActions,
    slots,
    permissionIds,
    hasInPermissionIds,
    changePermissions,
  } = useBehavior({ props })
</script>

<template>
  <div class="card">
    <!-- <h5 class="card-header bg-light-subtle">Featured</h5> -->
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <!-- Cols: <pre>{{ cols }}</pre> -->
      <!-- Rows: <pre>{{ rows }}</pre> -->
      <!-- Permissions: <pre>{{ permissions }}</pre> -->
      <!-- Grouped actions: <pre>{{ groupedActions }}</pre> -->
      <!-- Slots: <pre>{{ slots }}</pre> -->
      <!-- Permission ids: <pre>{{ permissionIds }}</pre> -->

      <data-table
        :rows="groupedActions"
        :columns="cols"
        :loading="false"
        :totalRows="10"
        :isServerMode="true"
        skin="bh-table-hover"
        :pagination="false"
        cloneHeaderInFooter
        stickyHeader
        stickyFirstColumn
      >

      <!-- <template v-for="(slot, sIdx) of slots">
        <slot :name="slot.slug" v-bind="data">
          <pre :key="sIdx">{{ data }} awd</pre>
        </slot>
      </template> -->

      <!-- <template #logo="data">
        
      </template> -->

      <!-- <template v-for="(slot, sIdx) of slots">
        <slot :name="`cell(${slot.slug})`" v-bind="data">
          <pre :key="sIdx">{{ data }} awd</pre>
        </slot>
      </template> -->sIdx
      <template v-for="(slot, sIdx) of slots" #[`actions.${slot.slug}.action`]="data">
        <div class="form-check mb-2" :key="`actions.${slot.slug}.action-${sIdx}`">
          <center>
            <input
              v-if="data.value.actions[slot.slug]?.id"
              type="checkbox"
              class="form-check-input permission-checkbox border"
              style="opacity: 1;"
              :checked="hasInPermissionIds(parseInt(data.value.actions[slot.slug]?.id))"
              :value="data.value.actions[slot.slug]?.id"
              @click.stop="changePermissions(data.value.actions[slot.slug], $event?.target?.checked)"
            >
          </center>
        </div>
      </template>

      <!-- <template #['actions.index.action']="data">
        <div class="avatar-showcase">
          <pre>{{ data }}</pre>
        </div>
      </template> -->

      <!-- <template #logo="data">
        <div class="avatar-showcase">
          <div class="avatars">
            <div class="avatar">
              <img class="img-50 avatar-img rounded b-r-15" :src="data.value.logo" :alt="data.value.logo">
            </div>
          </div>
        </div>
      </template> -->

      <!-- <template #actions="data">
        <router-link
          class="btn btn-sm bg-primary-light me-2 text-primary"
          :to="$tMakeRoute({ name: RouteName.SHOW, params: { uuid: data.value.uuid } })"
        >
          <i class="ri-information-line"></i>
        </router-link>

        <router-link
          class="btn btn-sm bg-success-light me-2 text-success"
          :to="$tMakeRoute({ name: RouteName.EDIT, params: { uuid: data.value.uuid } })"
        >
          <i class="ri-ball-pen-line"></i>
        </router-link>
        
        <span
          class="btn btn-sm bg-danger-light text-danger"
          @click="remove(data)"
        >
          <i class="ri-delete-bin-2-line"></i>
        </span>
      </template> -->

    </data-table>  
    </div>
  </div>
</template>
