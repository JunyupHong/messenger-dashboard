import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/styles/_defaultStyle.scss';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { locale, size: 'small' });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
