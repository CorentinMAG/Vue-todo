<template>
    <div>
        <TodoItem v-for="todo in mytodos" :key="todo.id" :todo="todo"></TodoItem>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Todo } from '../models/todo'
import TodoItem from './TodoItem.vue'
export default defineComponent({
  name: 'TodoList',
  props: {
    todos: {
      type: Array as PropType<Todo[]>
    }
  },
  data () {
    return {
      mytodos: this.todos
    }
  },
  components: {
    TodoItem
  }
})
</script>

<style lang="sass">

</style>
