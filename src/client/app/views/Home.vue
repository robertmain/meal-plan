<template>
  <div>
    <page-section background-color="var(--app-primary)" title="Sign In">
      <card v-for="index2 in Array(1).fill('')" :key="index2">
        <h2>Hello World</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eaque,
          sapiente a odio blanditiis eos unde minima adipisci consectetur,
          exercitationem eligendi culpa soluta perferendis quaerat nisi.
          Eos quidem rerum soluta! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit.
        </p>
      </card>
    </page-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageSection from '@/components/PageSection.vue';
import Card from '@/components/Card.vue';

@Component({
  components: {
    PageSection,
    Card,
  },
})
export default class Home extends Vue { }
</script>

<style lang="scss" scoped>
/deep/ section{
  display: grid;
}
</style>
