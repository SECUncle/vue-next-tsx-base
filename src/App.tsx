import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <div id="nav">
          <div class="article_test">
            vue-next test
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/button">button</router-link>
          </div>
          <div class="article_componment">
            componment
            <router-link to="/input">input</router-link>
            <router-link to="/select">select</router-link>
            <router-link to="/icon">icon</router-link>
            <router-link to="/tag">tag</router-link>
            <router-link to="/popper">popper</router-link>
            <router-link to="/form">form</router-link>
            <router-link to="/table">table</router-link>
          </div>
        </div>
        <router-view id="content"></router-view>
      </div>
    )
  },
})
