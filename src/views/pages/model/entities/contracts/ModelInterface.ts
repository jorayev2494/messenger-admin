export interface ModelInterface {
  uuid: string
  slug: string
  name: string
  generation: string | null
  bodyType: string | null
  engineType: string | null
  seatsCount: number | null
  founded_year: number
  image: string | null
  is_active: boolean
}
