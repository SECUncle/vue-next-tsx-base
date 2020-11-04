import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => (
      <div>
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/test">test</router-link>
          <router-link to="/input">input</router-link>
          <router-link to="/select">select</router-link>
          <router-link to="/form">form</router-link>
          <router-link to="/table">table</router-link>
        </div>
        <router-view id="content"></router-view>
      </div>
    );
  },
});
