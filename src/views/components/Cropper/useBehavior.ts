import { onMounted, ref, watch, reactive, toRefs, useTemplateRef } from 'vue'
import { type Coordinates } from 'vue-advanced-cropper'

// This function is used to detect the actual image type,
function getMimeType(file: any, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}

export default function ({ props }: { props: any }) {
  const result = ref<string | null>(null)
  const cropData = ref<any>(null)
  const cropperRef = ref()
  const closeRef = ref()
  const cropperBtnRef = useTemplateRef('cropperBtnRef')

  // const { file, cropperHandler }: { file: Blob; cropperHandler: Function } = toRefs(props)

  const img = reactive<{ src: string; type: string | null }>({
    src: '',
    type: null,
  })

  const setFile = (file: Blob | null) => {
    if (!file) {
      URL.revokeObjectURL(img.src)
      return
    }

    // console.log('File - Blob: ', file)

    const reader = new FileReader()
    reader.onload = (e) => sImg(URL.createObjectURL(file), getMimeType(e.target.result, file.type))
    reader.readAsArrayBuffer(file)
  }

  const sImg = (src: string, type: string | null) => {
    img.src = src
    img.type = type
  }

  const refreshModal = (): void => {
    const modal = document.getElementById('full-width-modal')
    modal?.addEventListener('shown.bs.modal', () => {
      cropperRef.value?.refresh()
    })
  }

  watch(
    () => props.file,
    (newFile): void => {
      if (newFile) {
        setFile(newFile)
        cropperBtnRef.value.click()
      }
    },
    { immediate: true },
  )

  const crop = (): void => {
    const { canvas } = cropperRef.value.getResult()
    canvas.toBlob((blob: Blob) => props.cropperHandler(blob), img.type)
    closeRef.value.click()
  }

  onMounted(() => {
    refreshModal()
  })

  return {
    img,
    cropperBtnRef,
    cropperRef,
    closeRef,
    crop,
    result, // если захочешь использовать результат
  }
}
