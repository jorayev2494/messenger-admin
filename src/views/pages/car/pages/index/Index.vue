<script setup lang="ts">
  import { ResourceAction } from '../../acl/ACLEnum';
import { RouteName } from '../../routes/RouteName';
import useBehavior from './useBehavior';

  const {
    loader,
    columns,
    cars,
    paginator,
    changeServer,
    remove,
  } = useBehavior()
</script>

<template>
  <div>
    <div class="row mb-2">
      <div class="d-flex flex-wrap gap-2">
        <router-link
          v-permission="ResourceAction.RESOURCE_CREATE"
          :to="$tMakeRoute({ name: RouteName.CREATE })"
          type="button"
          class="btn btn-primary"
        >
          {{ $t('system.create') }}
        </router-link>
      </div>
    </div>

    <data-table
      :rows="cars"
      :columns="columns"
      :loading="loader.value"
      :totalRows="paginator.total.value"
      :pageSize="paginator.perPage.value"
      :showNumbersCount="3"
      :pageSizeOptions="paginator.perPageOptions"
      :isServerMode="true"
      :paginationInfo="$t('system.pagination.info', { zero: '{0}', first: '{1}', two: '{2}' })"
      skin="bh-table-hover"
      :cellClass="'text-muted'"
      @change="changeServer"
    >

      <template #info="data">
        <div class="row">
          <div class="col-md-3">
            <img :src="data.value.avatar" :alt="data.value.avatar" class="img-fluid avatar-md rounded-circle" />
          </div>
          <div class="col-md-4">
            <p class="mt-0">
              {{ data.value.first_name }} {{ data.value.last_name }}
            </p>
            <div class="col-mt-1">
              {{ data.value.email }}
            </div>
          </div>
        </div>
      </template>

      <template #actions="data">
        <!-- <router-link
          v-permission="ResourceAction.RESOURCE_SHOW"
          class="btn btn-sm bg-primary-light me-2 text-primary"
          :to="$tMakeRoute({ name: RouteName.SHOW, params: { uuid: data.value.uuid } })"
        >
          <i class="ri-information-line"></i>
        </router-link> -->

        <router-link
          v-permission="ResourceAction.RESOURCE_UPDATE"
          class="btn btn-sm bg-success-light me-2 text-success"
          :to="$tMakeRoute({ name: RouteName.EDIT, params: { uuid: data.value.uuid } })"
        >
          <i class="ri-ball-pen-line"></i>
        </router-link>
        
        <span
          v-permission="ResourceAction.RESOURCE_DELETE"
          class="btn btn-sm bg-danger-light text-danger"
          @click="remove(data)"
        >
          <i class="ri-delete-bin-2-line"></i>
        </span>
      </template>

    </data-table>
  </div>
</template>