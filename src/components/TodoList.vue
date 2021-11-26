<template>
    <div>
        <TodoItem class="item" v-for="todo in filteredTodos" :todo="todo" :key="todo.id"></TodoItem>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Todo } from '../models/todo'
import TodoItem from './TodoItem.vue'
export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
  },
  computed: {
    filteredTodos (): Todo[] {
      return this.$store.getters.filteredTodos
    }
  }
})
</script>

<style lang="scss">

.item {
  margin-top: 10px;
}

</style>
