/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-10-29 15:40:58
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-03 11:41:04
 */
import { createApp } from 'vue';
import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';

createApp(App).use(store).use(router)
  .mount('#app');
