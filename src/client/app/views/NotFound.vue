<template>
  <div>
    <page-section class="section">
      <p class="emoji">
        🕵️
      </p>
      <h2>We Couldn't Find That Page :(</h2>
      <p>
        It may have moved, been deleted, or been kidnapped by a
        secret government organization.
      </p>
      <p>
        Either way, it's gone - that's all we know.
      </p>
    </page-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageSection from '@/components/PageSection.vue';

@Component({
  components: {
    PageSection,
  },
})
export default class Home extends Vue { }
</script>

<style lang="scss" scoped>
.section{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 0fr;
  align-content: center;
  text-align: center;
  .emoji{
    font-size:85px;
  }
  h2{
    color: var(--text-dark)
  }
}
</style>
