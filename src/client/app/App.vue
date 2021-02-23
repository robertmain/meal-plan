<template>
  <div id="app">
    <el-header>
      <Navigation />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
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
})
export default class App extends Vue { }
</script>
