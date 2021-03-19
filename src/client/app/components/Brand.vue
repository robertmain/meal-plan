<template>
  <div>
    <img
      v-if="logo"
      :src="logo"
      :alt="`${primary + secondary} Logo`"
    >
    <h1>
      {{/* eslint-disable-next-line max-len */ }}
      <span class="primary">{{ primary }}</span><span class="tertiary">{{ secondary }}</span>
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/breakpoints.scss';
div{
  display: grid;
  align-items: center;
  grid-template-columns: 30px auto;
  column-gap: 5px;
  h1{
    font-family: 'Roboto';
    font-size: 30px;
    font-weight: 800;
    .primary{ color: var(--app-primary) }
    .tertiary{ color: var(--text-dark) }
    @include for-phone-only {
      display: none;
    }
  }
  img{
    object-fit: contain;
    max-width: 100%;
    text-align: right;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component()
export default class Brand extends Vue {
  @Prop({ required: false, default: '' })
  public logo: string;

  @Prop({ required: false, default: '' })
  public primary: string;

  @Prop({ required: false, default: '' })
  public secondary: string;
}
</script>
