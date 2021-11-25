<template>
  <div>
    <h1>{{ title }}</h1>
    <Card>
      <template #content>
        <TodoInput/>
        <TodoList v-if="length" :todos="filteredTodos"/>
      </template>
      <template #footer>
        <TodoFilter :length="length" @filter="onFilterChange($event)" @clear="onClear"/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from './components/TodoList.vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilter from './components/TodoFilter.vue'
import { CLEAR } from './utils/constantes'
import { Todo } from './models/todo'

export default defineComponent({
  name: 'App',
  components: {
    TodoFilter,
    TodoList,
    TodoInput
  },
  mounted () {
    this.length = this.$store.getters.todoLength
  },
  data () {
    return {
      title: 'TODO LIST',
      length: 0,
      filter: 'all'
    }
  },
  methods: {
    onFilterChange (filter: string) {
      this.filter = filter
    },
    onClear () {
      this.$store.dispatch(CLEAR)
    }
  },
  computed: {
    filteredTodos (): Todo[] {
      return this.$store.getters.filter(this.filter)
    }
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body, html {
  font-size: 18px;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
