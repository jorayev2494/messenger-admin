import { ref, type Ref } from 'vue'
// import { useUrlPattern } from "../utils/UrlPattern";

export default function useChangeImage(defaultPreview: string | null = null) {
  // const { image } = useUrlPattern();
  // const defaultImg =
  // npm i --save-dev @types/node
  // const defaultImg: string | null =
  //   defaultPreview !== null ? require(`@/assets/images/default/${defaultPreview}.jpg`) : null
  const defaultImg: string | null =
    defaultPreview !== null ? `@/assets/images/default/${defaultPreview}.jpg` : null
  const preview: Ref<string | null> = ref(defaultImg)

  const upload = (event: object, callback: Function): void => {
    const [image] = event.target.files

    if (image) {
      callback(image)
      preview.value = URL.createObjectURL(image)
    }
  }

  return {
    preview,
    upload,
  }
}
