// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Flower from './Flower'
import router from './router'
import FlowerUI from '../packages/index'
Vue.use(FlowerUI)

import './assets/css/index.scss'
import '../packages/themes/default/lib/index.css'
import demoBlock from './components/demo.vue'

Vue.component('demo-block', demoBlock)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#flower',
  router,
  components: { Flower },
  template: '<Flower/>'
})
