export default interface PlaceInterface {
  uuid: string
  slug: string
  name: string
  type: string
  latitude: string
  longitude: string
  country_uuid: string
  is_active: boolean
  parent_uuid?: string | null
}
