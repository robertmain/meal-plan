<template>
  <div id="app">
    <el-header>
      <Navigation />
    </el-header>
    <el-main>
      <h1>{{ pageTitle | titleCase }}</h1>
      <router-view />
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
h1{ margin-bottom: 20px }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';
import { Header, Main } from 'element-ui';

@Component({
  components: {
    Navigation,
    'el-header': Header,
    'el-main': Main,
  },
  filters: {
    titleCase: (text: string) => text.split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  },
})
export default class App extends Vue {
  private get pageTitle(): string {
    return this.$route.name || '';
  }
}
</script>
