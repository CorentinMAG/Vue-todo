<template>
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input type="text" class="new-todo" placeholder="Ajouter une tache" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <section class="main">
      <input type="checkbox" class="toggle-all" id="toggle-all" v-model="allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :key="todo" :class="{completed: todo.completed, editing: todo === editing}">
          <div class="view">
            <input type="checkbox" v-model="todo.completed" class="toggle"/>
            <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @blur="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length > 0">
      <span class="todo-count"><strong>{{ remaining }}</strong> tâches à faire</span>
      <ul class="filters">
        <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
        <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
        <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
      </ul>
      <button v-show="completed" class="clear-completed" @click.prevent="deleteCompleted">Supprimer les taches finies</button>
    </footer>
  </section>
</template>

<script lang="js">
import Vue, { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default () {
        return []
      }
    }
  },
  directives: {
    focus (el, value) {
      if (value) {
        Vue.nextTick(() => {
          el.focus()
        })
      }
    }
  },
  data () {
    return {
      todos: this.modelValue,
      newTodo: '',
      filter: 'all',
      editing: null,
      oldTodo: null
    }
  },
  watch: {
    modelValue (value) {
      this.todos = value
    }
  },
  methods: {
    addTodo () {
      this.todos.push({ completed: false, name: this.newTodo })
      this.newTodo = ''
    },
    deleteTodo (todo) {
      this.todos = this.todos.filter(t => t !== todo)
      this.$emit('update:modelValue', this.todos)
    },
    deleteCompleted () {
      this.todos = this.todos.filter(t => !t.completed)
      this.$emit('update:modelValue', this.todos)
    },
    editTodo (todo) {
      this.oldTodo = todo.name
      this.editing = todo
    },
    doneEdit () {
      this.editing = null
    },
    cancelEdit () {
      this.editing.name = this.oldTodo
      this.doneEdit()
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(t => !t.completed).length
    },
    completed () {
      return this.todos.filter(t => t.completed).length
    },
    filteredTodos () {
      if (this.filter === 'todo') {
        return this.todos.filter(t => !t.completed)
      } else if (this.filter === 'done') {
        return this.todos.filter(t => t.completed)
      } else {
        return this.todos
      }
    },
    allDone: {
      get () {
        return this.remaining === 0
      },
      set (value) {
        this.todos.forEach(t => { t.completed = value })
      }
    }
  }
})
</script>

<style lang="scss" src="./todos.scss"></style>
