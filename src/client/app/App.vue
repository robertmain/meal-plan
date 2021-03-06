<template>
  <div id="app">
    <header>
      <Navigation />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import '@/assets/scss/breakpoints.scss';
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@500;900&display=swap');
*{ box-sizing: border-box; }
a, p, span, li{
  font-family: 'Open Sans';
}

h1, h2, h3, h4, h5, h6{
  font-family: 'Roboto';
}
</style>
