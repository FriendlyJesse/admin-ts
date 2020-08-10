<template>
  <div
    id="app"
    :class="theme"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class App extends Vue {
  @State theme!: string
}
</script>