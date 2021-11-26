<template>
<div>
  <TodoList v-model="todos"/>
  <button @click="addTodo">Ajouter</button>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from './components/TodoList.vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      todos: [{ name: 'demo', completed: true }]
    }
  },
  components: {
    TodoList
  },
  methods: {
    addTodo () {
      this.todos.push({ name: 'Jean', completed: false })
    }
  }
})
</script>

<style lang="scss">

</style>
