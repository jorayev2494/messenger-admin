export default function helpers(): object {
  const mimeTypeToExtension = (mimeType: string | null) => mimeType?.split('/').pop()

  return {
    mimeTypeToExtension,
  }
}
