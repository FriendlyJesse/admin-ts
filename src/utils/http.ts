import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
// import state from '@/store/state'

export default new class Interceptors {

  public instance: any

  constructor () {
    // 创建 axios 实例
    this.instance = axios.create({ baseURL: process.env.VUE_APP_API_URL })
    this.initInterceptors()
  }

  public initInterceptors () { // 初始化拦截器

    // 请求拦截器
    this.instance.interceptors.request.use((config: any) => {
      // if (state.token && state.userInfo) {
      //   config.headers.Authorization = `Bearer ${state.token}`
      //   config.headers.memberId = state.userInfo.id
      // }
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })

    // 响应拦截器
    this.instance.interceptors.response.use((response: any) => {
      this.responseLog(response)
      this.errorHandle(response)
      return response
    }, (error: any) => {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    })
  }

  public async post (url: string, data: any = {}, config: object = {}) {
    try {
      const result = await this.instance.post(url, data, config)
      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  public async delete (url: string, config: object = {}) {
    try {
      await this.instance.delete(url, config)
    } catch (error) {
      console.error(error)
    }
  }

  public async put (url: string, data: any = {}, config: object = {}) {
    try {
      await this.instance.put(url, data, config)
    } catch (error) {
      console.error(error)
    }
  }

  public async get (url: string, parmas: any = {}, config: object = {}) {
    try {
      await this.instance.get(url, parmas, config)
    } catch (error) {
      console.error(error)
    }
  }

  /**
  *http 握手错误
  *@param res  响应回调 , 根据不同响应进行不同操作
  */
  private errorHandle (res: any) { // 状态码判断
    switch (res.status) {
    case 401:
      break
    case 403:
      break
    case 404:
      Message.error('请求的资源不存在')
      break
    case 1002:
      Message.error('请登录')
      router.replace('/login') // 如果返回 1002 表示未登录
      break
    default:
        // Message.error(' 连接错误 ')
    }
  }

  protected responseLog (response: any): void {
    if (process.env.NODE_ENV === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求参数：', response.config.data)
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }

}