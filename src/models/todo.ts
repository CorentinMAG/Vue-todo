export class Todo {
  static count = 0
  id = 0
  selected = false
  value: string

  constructor (value: string) {
    this.value = value
    this.id = Todo.count
    Todo.count++
  }
}
