import { Todo } from "./todo";

export type Filter = 'all' | 'completed' | 'active'

export interface State {
    todos: Todo[],
    filter: Filter
}