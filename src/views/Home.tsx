import {
  ref,
  defineComponent,
  watch,
  toRefs,
  reactive,
  isReactive,
  computed,
  watchEffect,
  onUpdated,
  onMounted,
  onUnmounted,
  getCurrentInstance,
} from 'vue';

export default defineComponent({
  components: {
    // HelloWorld,
    // Test,
  },
  props: {
    user: {
      type: String,
    },
  },
  setup(props, context) {
    const { user } = toRefs(props);
    console.log(user, context);

    const counter = ref(0);
    console.log('counter is ', isReactive(counter));
    watch(counter, () => {
      console.log('fgfg', counter.value);
    });
    const count = ref(0);
    const plusOne = computed(() => count.value + 1);
    console.log(plusOne, 'plusOne');
    const object = reactive({
      foo: 'bar',
    });
    watchEffect(() => console.log(count.value));

    const readefrsNumber = ref(0);
    const book = reactive({
      title: 'vue 3 guide',
    });

    onMounted(() => {
      console.log('mounted');
    });
    onUpdated(() => {
      console.log('updated');
    });
    onUnmounted(() => {
      getCurrentInstance();
      console.log('unmounted');
    });
    // const useComponentId = () => getCurrentInstance().uid;
    const handleClick = () => {
      getCurrentInstance();
      // useComponentId();
      // internalInstance;
    };
    const internalInstance = getCurrentInstance();
    // const id = useComponentId();
    // return {
    //   counter,
    //   count,
    //   object,
    // };
    const logoImg = require('../assets/logo.png');

    return () => (
      <div class="home">
        测试专用
        <img alt="Vue logo" src="../assets/logo.png" />
        counter: {counter.value}
        <br></br>
        count: {count.value}
        <br></br>
        readefrsNumber: {readefrsNumber.value}
        <br></br>
        book: {book.title}
        <br></br>
        plusOne:{plusOne}
        <br></br>
        object:{object.foo}
        <br></br>
      </div>
    );
  },
});
