<template>
  <div class="p-inputgroup">
    <Button v-model="isSelected" :class="{'p-button-success': isSelected, 'p-button-danger': !isSelected}" :icon="{'pi pi-check': isSelected, 'pi pi-times': !isSelected}" @click="isSelected = !isSelected,toggle()" :disabled="!length"/>
    <Input type="text" v-model.trim="value" @keypress.enter="addTodo(value), value=''" placeholder="What is it about?"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Todo } from '../models/todo'
import { ADD_TODO, TOGGLE_ALL } from '../utils/constantes'
export default defineComponent({
  name: 'TodoInput',
  data () {
    return {
      value: '',
      isSelected: false
    }
  },
  methods: {
    addTodo (value: string) {
      const todo = new Todo(value)
      this.$store.dispatch(ADD_TODO, todo)
    },
    toggle () {
      this.$store.dispatch(TOGGLE_ALL, this.isSelected)
    }
  },
  computed: {
    length (): boolean {
      return !!this.$store.getters.todoLength
    }
  }
})
</script>
