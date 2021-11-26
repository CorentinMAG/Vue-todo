<template>
  <div class="p-inputgroup">
    <ToggleButton v-model="checked" onIcon="pi pi-check" offIcon="pi pi-times"/>
    <Input v-model.trim="value" type="text" placeholder="What is it about?" @keyup.enter="addTodo"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Todo } from '../models/todo'
import { ADD_TODO, TOGGLE_ALL } from '../utils/constantes'
export default defineComponent({
  name: 'TodoInput',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    addTodo (): void {
      const newTodo = new Todo(this.value)
      this.$store.dispatch(ADD_TODO, newTodo)
      this.value = ''
    }
  },
  computed: {
    checked: {
      get (): boolean {
        /* eslint-disable */
        return !!!this.$store.getters.todoActiveLength
      },
      set (isChecked: boolean): void {
        this.$store.dispatch(TOGGLE_ALL, isChecked)
      }
    }
  }
})
</script>
