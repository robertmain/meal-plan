<template>
  <nav>
    <Brand
      :logo="require('@/assets/logo.png')"
      primary="Meal"
      secondary="Plan"
    />
    <el-button icon="el-icon-menu" />
  </nav>
</template>

<style lang="scss" scoped>
nav{
  padding: var(--spacing-md);
  display: grid;
  grid-template-columns: max-content auto;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
  button{
    justify-self: right;
  }
  ul{
    display: block;
    li{
      float: left;
      a{
        font-family: 'Open Sans';
        text-decoration: none;
        color: var(--text-dark);
        padding: var(--spacing-md);
        &:hover {
          color: #AAA;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { Button } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import Brand from '@/components/Brand.vue';

@Component({
  components: {
    'el-button': Button,
    Brand,
  },
})
export default class MyRecipes extends Vue {
  private routes = [
    {
      title: 'Home',
      icon: 'el-icon-house',
      routerConfig: { name: 'home' },
    },
    {
      title: 'Recipes',
      icon: 'el-icon-fork-spoon',
      routerConfig: { name: 'recipes' },
    },
  ];
}
</script>
