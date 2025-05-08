import useJwt from '@/services/auth/jwt/useJwt'
import httpClient from '@/infrastructure/http/index'

const { jwt } = useJwt(httpClient, {})

export default jwt
