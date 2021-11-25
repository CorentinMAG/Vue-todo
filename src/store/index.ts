import { State } from '@/models/state'
import { Todo } from '@/models/todo'
import { createStore } from 'vuex'
import { ADD_TODO, CLEAR, DELETE_TODO, TOGGLE_ALL } from '@/utils/constantes'

export default createStore<State>({
  state: {
    todos: []
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
      state.todos.forEach(t => { t.selected = toggle })
    },
    [CLEAR] (state: State) {
      state.todos = state.todos.filter(t => t.selected)
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
    }
  },
  modules: {
  },
  getters: {
    todoLength (state: State): number {
      return state.todos.length
    },
    todoCompledLength (state: State, getters): number {
      return getters.todoCompleted.length
    },
    todoActiveLength (state: State, getters): number {
      return getters.todoActive.length
    },
    todoCompleted (state: State): Todo[] {
      return state.todos.filter(t => t.selected)
    },
    todoActive (state: State): Todo[] {
      return state.todos.filter(t => !t.selected)
    },
    findAtIndex: (state: State) => (idx: number): Todo | undefined => {
      return state.todos[idx]
    },
    filter: (state: State) => (filter: string): Todo[] => {
      switch (filter) {
        case 'active':
          return state.todos.filter(t => !t.selected)
        case 'completed':
          return state.todos.filter(t => t.selected)
        default:
          return state.todos
      }
    }
  }
})
