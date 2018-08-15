import Vue from 'vue'
import App from './App'

import KeyBoard from './decimal-numeric-keyboard';
Vue.use(KeyBoard);

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
