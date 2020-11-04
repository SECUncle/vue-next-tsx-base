import { createApp } from 'vue'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.scss'

/**
 * 全局注册组件
 */

// const components = require.context('@/packages/', true, /index\.tsx$/);
// components.keys().forEach((key) => {
//   console.log(key, key.slice(2));
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const { name, component, plugin } = require(`@/packages/${key.slice(2)}`).default;
//   if (component) {
//     app.component(name, component);
//   }
//   if (plugin) {
//     app.use(plugin);
//   }
// });
import DUI from './packages'

const app = createApp(App)
console.log(DUI, 'DUI')
app.use(DUI).use(store).use(router)
  .mount('#app')
