import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './plugins/vsvg'
import './styles/index.scss'


// 地图数据
import '../node_modules/echarts/map/js/world.js'
import '../node_modules/echarts/map/js/china.js'

Vue.config.productionTip = false

declare module 'vue/types/vue' {
  interface Vue {
    $filterEmptyValue: any;
  }
}

// 合并两个对象，并过滤掉值为空的属性
Vue.prototype.$filterEmptyValue = (...rest: any[]) => {
  const query = Object.assign({}, ...rest)
  for (const key in query) {
    if (!query[key] && query[key] !== 0 && typeof query[key] !== 'boolean') {
      delete query[key]
    }
  }
  return query
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
