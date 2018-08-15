import Vue from 'vue'

import decimalNumericKeyboard from './KeyboardInput'

import './fonts/iconfont.css'

export default {
	install (Vue, options = {}) {
		Vue.component('decimalNumericKeyboard', Vue.extend(decimalNumericKeyboard));
	}
}