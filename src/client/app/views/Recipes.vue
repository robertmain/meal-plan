<template>
  <div>
    <page-section background-color="#444" title="Find Recipes">
      <text-input
        type="text"
        prefix-icon="el-icon-search"
        clearable
        placeholder="Search"
        v-model="searchQuery"
      />
      <el-button
        icon="el-icon-refresh"
        type="default"
        plain
        :loading="loading"
        @click="getRecipes"
      >
        Refresh Data
      </el-button>
    </page-section>
    <page-section background-color="var(--app-primary)">
      <div class="cards" ref="cards">
        <recipe-card
          v-for="({
            id,
            name,
            description,
            events,
            link,
            image,
          }) in filteredRecipes"
          :key="id"
          :name="name"
          :description="description"
          :link="link"
          :image="image"
          :occurances="events"
        />
      </div>
    </page-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  Card, Row, Col, Input, Button,
} from 'element-ui';
import axios, { AxiosInstance } from 'axios';
import RecipeCard from '@/components/RecipeCard.vue';
import PageSection from '@/components/PageSection.vue';

const { create } = axios;

@Component({
  components: {
    card: Card,
    row: Row,
    column: Col,
    RecipeCard,
    textInput: Input,
    elButton: Button,
    PageSection,
  },
})
export default class Home extends Vue {
  private searchQuery = '';

  private axios: AxiosInstance;

  private recipes: Record<string, unknown>[] = [];

  public loading = true;

  public constructor() {
    super();
    this.axios = create({
      baseURL: process.env.BASE_URL + 'api',
    });
  }

  public get filteredRecipes(): Record<string, unknown>[] {
    if (this.searchQuery.length > 0) {
      return this.recipes
        .filter(({ name }) => name.toString()
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()));
    }
    return this.recipes;
  }

  public async getRecipes(): Promise<void> {
    this.loading = true;
    const { data: recipes } = await this.axios.get('recipe');
    this.$nextTick(() => {
      this.loading = false;
    });
    this.recipes = recipes;
  }

  public async mounted(): Promise<void> {
    await this.getRecipes();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/breakpoints.scss';

.cards{
  display: grid;
  grid-column-gap: var(--spacing-md);
  grid-row-gap: var(--spacing-md);
  grid-template-columns: repeat(1, 2fr);
  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
  }
  @include for-tablet-landscape-up {
    grid-template-columns: repeat(4, 1fr);
  }
  @include for-desktop-up {
    grid-template-columns: repeat(5, 1fr);
  }
    @include for-big-desktop-up {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
