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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@500;900&display=swap');
*{ box-sizing: border-box; }
main {
  p, li, h1, h2, h3, h4, h5, h6{
    color: var(--text-dark);
  }
  p, li{
    font-family: 'Open Sans';
    font-size: var(--paragraph-text-size-normal);
  }
  h1, h2, h3, h4, h5, h6{
    font-family: 'Roboto';
  }
  p{
    &:last-of-type{
      margin-bottom: 0px;
    }
  }
  h1{font-size: var(--heading1-size)}
  h2{font-size: var(--heading2-size)}
  h3{font-size: var(--heading3-size)}
  h4{font-size: var(--heading4-size)}
  h5{font-size: var(--heading5-size)}
  h6{font-size: var(--heading6-size)}
}
</style>
