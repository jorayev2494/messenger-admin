import type { AxiosInstance } from 'axios'
import JwtService from './jwtService'

interface Interface {
  jwt: JwtService
}

export default function useJwt(httpClientIns: AxiosInstance, jwtOverrideConfig: object): Interface {
  const jwt = new JwtService(httpClientIns, jwtOverrideConfig)

  return {
    jwt,
  }
}
