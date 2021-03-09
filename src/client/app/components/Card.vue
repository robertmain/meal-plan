<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Home extends Vue { }
</script>

<style lang="scss" scoped>
div{
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background-color: white;
  border-radius: 2px;
  &:last-of-type{
    margin-bottom: 0px;
  }
}
</style>
