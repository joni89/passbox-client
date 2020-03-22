import Vue from 'vue';
import Vuetify from 'vuetify';
import en from 'vuetify/src/locale/en';
import es from 'vuetify/src/locale/es';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

// Cambiar locale de Vuetify en un componente: this.$vuetify.lang.current = 'sv'

export default new Vuetify({
	lang: {
		locales: {
			es,
			en
		},
		current: 'es'
	}
});
