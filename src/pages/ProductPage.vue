<template>
  <main class="content container" v-if="productLoading">
    <p class="loading-info">Загрузка корзины
      <svg class="loading-info__preloader" width="25" height="25" fill="currentColor">
        <use xlink:href="#preloader"></use>
      </svg>
    </p>
  </main>
  <main class="content container" v-else-if="productLoadingFailed">
    <p class="loading-info">Ошибка запроса..</p>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
        </div>

      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" :value="color.id"
                      v-model="currentColor">
                    <span class="colors__value" :title="color.title"
                      :style="{ backgroundColor: color.code }">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                  :style="{ cursor: productAmount > 1 ? 'pointer' : 'not-allowed' }"
                  @click="decrementAmount" :disabled="productAmount < 2">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label for="product-count" style="display: none;">Количество товара</label>
                <input id="product-count" type="text" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар" style="cursor: pointer;"
                  @click="incrementAmount">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded" style="padding-top: 30px; text-align: center;">Товар добавлен в
              корзину!</div>
            <div v-show="productAddSending" style="padding-top: 30px; text-align: center;">Добавляем
              товар в корзину..
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Еда быстрого приготовления<br>
            Вкус студенчества<br>
            Различные цветовые решения<br>
          </p>
          <a href="#">
            Все характеристики
          </a>
          <h3>Что это?</h3>
          <p>
            Лапша
          </p>
          <h3>Дизайн</h3>
          <p>
            Вечный
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      currentColor: null,
      currentSize: null,
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },

  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .catch(() => { this.productLoadingFailed = true; })
        .then(() => { this.productLoading = false; });
    },
    incrementAmount() {
      this.productAmount += 1;
    },
    decrementAmount() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
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
