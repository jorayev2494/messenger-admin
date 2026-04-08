<script lang="ts" setup>
  import { Cropper, Preview } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'
  import useBehavior from './useBehavior'

  const props = defineProps({
    file: {
      type: Blob,
      default: () => null,
    },
    cropperHandler: {
      type: Function,
      default: (image: Blob): void => {}
    },
    stencil: {
      type: Object,
      default: () => ({
        // aspectRatio: 6/6,
		    movable: true,
		    resizable: false
      }),
    },
    size: {
      type: Object,
      default: () => ({
        width: 400,
				height: 400,
      }),
    },
  })

  const {
    img,
    cropperBtnRef,
    cropperRef,
    closeRef,
    crop,
  } = useBehavior({ props })
</script>

<template>
  <div>
    <button ref="cropperBtnRef" type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#full-width-modal">Standard Modal</button>
    <div id="full-width-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="fullWidthModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-full-width">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="standard-modalLabel">Modal Heading</h4>
            <button ref="closeRef" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <code>{{ { type: img.type, ...props.size } }}</code>
          <div class="modal-body">
            <Cropper
              ref="cropperRef"
              class="cropper"
              :src="img.src"
              :stencil-props="props.stencil"
              :default-size="props.size"
              default-boundaries="fill"
	            priority="visibleArea"
            />

            <!-- <preview
              :width="120"
              :height="120"
              :image="result.image"
              :coordinates="result.coordinates"
            /> -->
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button> -->
            <button type="button" class="btn btn-primary" @click="crop">Crop</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .cropper {
    width: 100%;
    height: 100%;
  }
</style>
