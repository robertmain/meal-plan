<template>
  <card>
    <h4>{{ name }}</h4>
    <p>
      <em>Made: {{ occurances.length }} time(s)</em><br>
    </p>
    <div v-html="htmlDescription" />
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import { parseJSON, format } from 'date-fns';
import marked from 'marked';

@Component({
  components: {
    card: Card,
  },
  filters: {
    formatDate: (date: string) => format(parseJSON(date), 'PPPP'),
  },
})
export default class Home extends Vue {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: false, default: '' })
  public link: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ default: [] })
  public occurances: string[]

  public get htmlDescription(): string {
    return marked(this.description, {
      gfm: true,
    });
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #EAEAEA;
  overflow: hidden;
  .card-body{
    overflow: hidden;
  }
  h2{
    line-height: 1.5;
  }
  a{
    word-break: break-all;
  }
}

em{
  color: #AAA;
}
</style>
