import { createApp } from 'vue';
import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './index.scss';

const app = createApp(App);

/**
 * 全局注册组件
 */

const components = require.context('@/packages/', true, /index\.tsx$/);
components.keys().forEach((key) => {
  const { name, component, plugin } = require(`@/packages/${key.slice(2)}`).default;
  if (component) {
    app.component(name, component);
  }
  if (plugin) {
    app.use(plugin);
  }
});
app.use(store).use(router)
  .mount('#app');
