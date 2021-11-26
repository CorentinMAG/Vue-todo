<template>
  <div>
    <h1>{{ title }}</h1>
    <Card>
      <template #content>
        <TodoInput/>
        <TodoList class="list"/>
      </template>
      <template #footer>
        <TodoFilter v-show="length"/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from './components/TodoList.vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilter from './components/TodoFilter.vue'

export default defineComponent({
  name: 'App',
  components: {
    TodoFilter,
    TodoList,
    TodoInput
  },
  data () {
    return {
      title: 'TODO LIST'
    }
  },
  computed: {
    length (): boolean {
      return !!this.$store.getters.todoLength
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

.list {
  margin-top: 10px;
}
</style>
