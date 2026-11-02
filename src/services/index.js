import { requestService as mockRequestService } from './requestService.js'
import { requestApi } from './requestApi.js'

const serviceMode = import.meta.env.VITE_API_MODE || 'mock'

export const requestService =
  serviceMode === 'api'
    ? requestApi
    : mockRequestService