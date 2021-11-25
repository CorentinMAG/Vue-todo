<template>
  <Card class="card">
    <template #content>
      <div class="p-d-flex wrapper p-jc-between">
        <Button :icon="{'pi pi-check': todo.selected, 'pi pi-times': !todo.selected}" class="p-button-text p-button-rounded" :class="{'p-button-success': todo.selected, 'p-button-danger': !todo.selected}"/>
        <div>{{todo.value}}</div>
        <Button icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger trash" @click="onDelete()"/>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Todo } from '../models/todo'
import { DELETE_TODO } from '../utils/constantes'
export default defineComponent({
  name: 'TodoItem',
  props: {
    todo: {
      type: Object as PropType<Todo>
    }
  },
  methods: {
    onDelete () {
      this.$store.dispatch(DELETE_TODO, this.todo)
    }
  }
})
</script>

<style lang="scss" scoped>

.card {

  .trash {
  visibility: hidden;
  }
  &:hover .trash {
    visibility: visible;
  }
}
</style>
