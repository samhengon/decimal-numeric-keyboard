import Vue from 'vue'

import dnKeyboard from './KeyboardInput'

import './fonts/iconfont.css'

export default {
	install (Vue, options = {}) {
		Vue.component('dnKeyboard', Vue.extend(dnKeyboard));
	}
}