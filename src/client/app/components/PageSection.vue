<template>
  <section :style="{ backgroundColor: backgroundColor }">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Home extends Vue {
  @Prop({ required: false })
  public title: string;

  @Prop({ required: false })
  public backgroundColor: string;
}
</script>

<style lang="scss" scoped>
section{
  padding: var(--spacing-md);
  line-height: 2;
  h2{
    margin-bottom: var(--spacing-md);
    color: white;
  }
}
</style>
