import { createApp } from 'vue'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.scss'
import DDesign from './packages'

const app = createApp(App)
console.log(DDesign, 'DUI')
app.use(DDesign).use(store).use(router)
  .mount('#app')
