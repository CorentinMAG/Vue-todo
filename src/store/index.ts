import { Filter, State } from '@/models/state'
import { Todo } from '@/models/todo'
import { createStore } from 'vuex'
import { ADD_TODO, CLEAR, DELETE_TODO, UPDATE_TODO, TOGGLE, TOGGLE_ALL, UPDATE_FILTER } from '@/utils/constantes'

export default createStore<State>({
  state: {
    todos: [],
    filter: 'all'
  },
  mutations: {
    [ADD_TODO] (state: State, todo: Todo) {
      state.todos.push(todo)
    },
    [DELETE_TODO] (state: State, todo: Todo) {
      const idx = state.todos.indexOf(todo)
      state.todos.splice(idx, 1)
    },
    [TOGGLE_ALL] (state: State, toggle: boolean) {
      state.todos.forEach(t => { t.completed = toggle })
    },
    [CLEAR] (state: State) {
      state.todos = state.todos.filter(t => !t.completed)
    },
    [UPDATE_FILTER] (state: State, filter: Filter) {
      state.filter = filter
    },
    [TOGGLE] (state: State, todo: Todo) {
      /* eslint-disable */
      state.todos.forEach(t =>  t === todo ? t.completed = !t.completed : t )
    },
    [UPDATE_TODO] (state: State, payload: any) {
      const todo = payload.todo
      const newValue = payload.editing
      state.todos.forEach(t => t.id === todo.id ? t.value = newValue : t)
    }
  },
  actions: {
    [ADD_TODO] ({ commit }, todo: Todo) {
      commit(ADD_TODO, todo)
    },
    [DELETE_TODO] ({ commit }, todo: Todo) {
      commit(DELETE_TODO, todo)
    },
    [TOGGLE_ALL] ({ commit }, toggle: boolean) {
      commit(TOGGLE_ALL, toggle)
    },
    [CLEAR] ({ commit }) {
      commit(CLEAR)
    },
    [UPDATE_FILTER] ({ commit }, filter: Filter) {
      commit(UPDATE_FILTER, filter)
    },
    [TOGGLE] ({ commit }, todo: Todo) {
      commit(TOGGLE, todo)
    },
    [UPDATE_TODO] ({ commit }, payload: any) {
      commit(UPDATE_TODO, payload)
    }
  },
  modules: {
  },
  getters: {
    todoLength (state: State): number {
      return state.todos.length
    },
    todoCompledLength (_, getters): number {
      return getters.todoCompleted.length
    },
    todoActiveLength (_, getters): number {
      return getters.todoActive.length
    },
    todoCompleted (state: State): Todo[] {
      return state.todos.filter(t => t.completed)
    },
    todoActive (state: State): Todo[] {
      return state.todos.filter(t => !t.completed)
    },
    findAtIndex: (state: State) => (idx: number): Todo | undefined => {
      return state.todos[idx]
    },
    filteredTodos: (state: State, getters): Todo[] => {
      const filter = state.filter
      switch (filter) {
        case 'active':
          return getters.todoActive
        case 'completed':
          return getters.todoCompleted
        default:
          return state.todos
      }
    },
    filteredLength: (_, getters): number => {
      return getters.filteredTodos.length
    }
  }
})
