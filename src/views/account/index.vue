<template>
  <section class="account">
    123
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Account extends Vue {
  created () {
    this.$message.success('ok')
  }
}
</script>

<style lang="scss" scoped>
.account {
  color: #fff;
}
</style>