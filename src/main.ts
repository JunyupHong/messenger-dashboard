import Vue from 'vue';
import store from '@/store';
import App from './App.vue';
import router from './router';
import '@/assets/styles/_defaultStyle.scss';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

import Loading from '@/plugins/loading/loading';

Vue.use(ElementUI, { locale, size: 'small' });
Vue.use(Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
