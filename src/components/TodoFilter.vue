<template>
    <div class="p-d-flex">
        <div class="p-text-bold"> {{ length }} task{{length > 1 ? 's' : ''}} </div>
        <Button class="p-button-text" label="All" :class="{active: filter === 'all'}"  @click.prevent="filter = 'all'"/>
        <Button class="p-button-text" label="Active" :class="{active: filter === 'active'}"  @click.prevent="filter = 'active'" />
        <Button class="p-button-text" label="Completed" :class="{active: filter === 'completed'}" @click.prevent="filter ='completed'"/>
        <Button class="p-button-text" label="Clear completed" style="margin-left: .5em" @click.prevent="clear" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Filter } from '../models/state'
import { CLEAR, UPDATE_FILTER } from '../utils/constantes'
export default defineComponent({
  name: 'TodoFilter',
  methods: {
    clear (): void {
      this.$store.dispatch(CLEAR)
    }
  },
  computed: {
    filter: {
      get (): Filter {
        return this.$store.state.filter
      },
      set (filter: Filter): void {
        this.$store.dispatch(UPDATE_FILTER, filter)
      }
    },
    length (): number {
      return this.$store.getters.filteredLength
    }
  }
})
</script>
<style lang="scss" scoped>
.p-text-bold {
    padding: 20px;
}

.active {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
