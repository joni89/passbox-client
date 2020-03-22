import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from '@/vuetify';
import '@/assets/styles.css';
import VueEventBus from '@/plugin/event-bus';

Vue.config.productionTip = false;

Vue.use(VueEventBus);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
