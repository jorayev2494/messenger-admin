import { ref, type Ref } from 'vue'
import defaultAvatar from '@/assets/images/default/avatar.jpg'
import helpers from '@/utils/helpers/helpers'
// import { useUrlPattern } from "../utils/UrlPattern";

export default function useChangeImage(defaultPreview: string | null = null) {
  const originalImage: Ref<File | null> = ref(null)

  const { mimeTypeToExtension } = helpers()

  const defaultImageFactory = (image: string | null): string => {
    switch (image) {
      case 'avatar':
        return defaultAvatar
      default:
        return `Image not found ${image}!`
    }
  }

  const preview: Ref<string | null> = ref(defaultImageFactory(defaultPreview))

  const upload = (event: object, callback: Function): void => {
    const [image] = event.target.files
    changePreview((originalImage.value = image), callback)
  }

  const changePreview = (image: Blob, callback: Function) => {
    if (image) {
      callback(image)
      preview.value = URL.createObjectURL(image)
    }
  }

  const makeOriginalImageName = (): string | null => {
    if (isNull()) {
      return null
    }

    const name = originalImage.value.name
    const extension = mimeTypeToExtension(originalImage.value.type)

    return `${name}.${extension}`
  }

  const isNull = (): boolean => originalImage.value === null
  const isNotNull = (): boolean => !isNull()

  return {
    preview,
    upload,
    changePreview,
    makeOriginalImageName,
    isNull,
    isNotNull,
  }
}
