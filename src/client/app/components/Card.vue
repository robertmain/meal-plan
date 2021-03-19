<template>
  <div class="card">
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
.card{
  padding: var(--spacing-md);
  background-color: white;
  border-radius: 2px;
  &:last-of-type{
    margin-bottom: 0px;
  }
}
</style>
