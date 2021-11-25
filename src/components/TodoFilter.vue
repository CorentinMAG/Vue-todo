<template>
    <div class="p-d-flex">
        <div class="p-text-bold"> {{ length }} task{{ length > 1 ? 's': '' }}</div>
        <Button class="p-button-text" label="All" @click="$emit('filter', 'all')"/>
        <Button class="p-button-text" label="Active" @click="$emit('filter', 'active')" />
        <Button class="p-button-text" label="Completed" @click="$emit('filter', 'completed')"/>
        <Button class="p-button-text" label="Clear completed" style="margin-left: .5em" @click="$emit('clear')"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TodoFilter',
  props: {
    length: {
      type: Number,
      required: true,
      default: 0
    }
  },
  emits: ['filter', 'clear']
})
</script>
<style lang="scss" scoped>
.p-text-bold {
    padding: 20px
}
</style>
