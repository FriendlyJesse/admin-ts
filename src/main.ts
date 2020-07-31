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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
