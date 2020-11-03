import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  setup() {
    return () => (
      <div>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>|
          <router-link to="/test">test</router-link>
        </div>
        <router-view />
      </div>
    );
  },
});
