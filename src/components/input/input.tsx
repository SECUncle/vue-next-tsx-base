import { defineComponent,ref } from 'vue';
export default defineComponent({
  name: 'DInput',
  props: {

  },
  setup(props,ctx){
    const input = ref(null)
    const textarea =ref(null)
    


    return {
      input,
      textarea
    }

  }
})