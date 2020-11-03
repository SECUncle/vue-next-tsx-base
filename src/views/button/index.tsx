import { defineComponent, withModifiers, ref } from 'vue';

export default defineComponent({
  setup() {
    const handleClick = () => {
      alert('点击测试');
      console.log('点解测试');
    };
    const count = ref(0);

    const inc = () => {
      count.value = 2;
      // count.value++;
    };
    return () => (
      <div>
        <button onClick={handleClick}>按钮</button><br/>
        <button onClick={withModifiers(inc, ['self'])}>{count.value}</button>
      </div>
    );
  },
});
