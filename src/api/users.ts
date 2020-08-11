import http from '@/utils/http'

export const getUsers = (data?: any) => http.get('/api/users', data)
export const removeUser = (data?: any) => http.delete('/api/users', data)