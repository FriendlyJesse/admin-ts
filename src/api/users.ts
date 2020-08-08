import http from '@/utils/http'

export const getUsers = (data?: any) => http.get('/api/users', data)