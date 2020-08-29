// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './styles/font.css'
import router from './router'
// import zhCN from 'ant-design-vue/locale-provider/zh_CN';
//   import { Modal } from 'ant-design-vue';
//   import moment from 'moment';
//   import 'moment/locale/zh-cn';
//   moment.locale('en');

Vue.use(Antd)
// Vue.component(Layout.name, Layout);
// Vue.component(Menu.name, Menu);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
