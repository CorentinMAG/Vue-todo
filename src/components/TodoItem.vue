<template>
  <Card class="card" @dblclick.prevent="editTodo">
    <template #content>
      <div class="p-d-flex wrapper p-jc-between">
        <ToggleButton :modelValue="todo.completed" onIcon="pi pi-check" offIcon="pi pi-times" @click.prevent="updateTodo" />
        <div :style="{display: editing ? 'none' : 'block'}"> {{ todo.value }} </div>
        <Input v-focus="editing" v-model="editing" class="edit" type="text" :style="{display: editing ? 'inline' : 'none'}" @blur.prevent="doneEdit" @keydown.esc.prevent="cancelEdit" @keydown.enter.prevent="doneEdit"/>
        <Button class="trash" icon="pi pi-trash" @click.prevent="deleteTodo" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, nextTick } from 'vue'
import { Todo } from '../models/todo'
import { DELETE_TODO, TOGGLE, UPDATE_TODO } from '../utils/constantes'
export default defineComponent({
  name: 'TodoItem',
  directives: {
    focus (el, binding) {
      if (binding) {
        nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  data () {
    return {
      editing: null
    } as { editing: null | string }
  },
  methods: {
    deleteTodo (): void {
      this.$store.dispatch(DELETE_TODO, this.todo)
    },
    editTodo (): void {
      this.editing = this.todo.value
    },
    doneEdit (): void {
      if (this.editing) {
        this.$store.dispatch(UPDATE_TODO, { editing: this.editing, todo: this.todo })
        this.editing = null
      }
    },
    cancelEdit (): void {
      this.editing = null
    },
    updateTodo (): void {
      this.$store.dispatch(TOGGLE, this.todo)
    }
  }
})
</script>

<style lang="scss" scoped>

.edit {
  position:relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {

  .trash {
  visibility: hidden;
  }
  &:hover .trash {
    visibility: visible;
  }
}
</style>
