import { Store } from '@/store'
import { Todo } from '@/models/todo'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }

  interface State {
    todos: Todo[]
  }
}