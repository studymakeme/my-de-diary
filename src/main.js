import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../rem'
import VueAxios from "vue-axios";
import axios from 'axios'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
