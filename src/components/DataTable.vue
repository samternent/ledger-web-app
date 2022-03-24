<template>
  
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    headers: {
      type: Array,
      default: () => ([]),
    },
  },
  setup() {
    return { format }
  }
}
</script>