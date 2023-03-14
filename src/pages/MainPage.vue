<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} {{ normalizedProductWord }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" />
      <section class="catalog">
        <div v-if="productsLoading" class="loading-info">Загрузка товаров
          <svg class="loading-info__preloader" width="25" height="25" fill="currentColor">
            <use xlink:href="#preloader"></use>
          </svg>
        </div>
        <div v-if="productsLoadingFailed" class="loading-info">
          <p>Произошла ошибка при загрузке товаров</p>
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    ProductList,
    ProductFilter,
    BasePagination,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: null,
      filterVolumes: [],
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {

    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() { this.loadProducts(); },
    filterPriceTo() { this.loadProducts(); },
    filterCategoryId() { this.loadProducts(); },
    filterColorId() { this.loadProducts(); },
    filterVolumes() { this.loadProducts(); },
  },
  computed: {

    products() {
      return this.productsData ? this.productsData.items.map((product) => ({ ...product, image: product.image.file.url })) : [];
    },

    normalizedProductWord() {
      const count = this.countProducts;
      const cases = [2, 0, 1, 1, 1, 2];
      const titles = ['товар', 'товара', 'товаров'];
      return titles[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
};
</script>

<style lang="stylus">
  .loading-info
    display flex
    align-items center
    justify-content center
    font-size 30px
  .loading-info__preloader
    width 100px
    height 100px
</style>
