<template>
  <main class="content container" v-if="cartLoading">
    <p class="loading-info">Загрузка корзины
      <svg class="loading-info__preloader" width="25" height="25" fill="currentColor">
        <use xlink:href="#preloader"></use>
      </svg>
    </p>
  </main>
  <main class="content container" v-else-if="cartLoadingFailed">
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
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProducts }} {{ 'товар' | normalizeWord(totalProducts) }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{ name: 'order' }"
            class="cart__button button button--primery" type="submit" :disabled="!totalPrice">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import normalizeWord from '@/helpers/normalizeWord';
import { mapGetters, mapState } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  components: {
    CartItem,
  },
  filters: {
    numberFormat,
    normalizeWord,
  },
  computed: {
    ...mapState({ cartLoading: 'cartLoading', cartLoadingFailed: 'cartLoadingFailed' }),
    ...mapGetters({ products: 'cartDetailProducts' }),
    ...mapGetters({ totalPrice: 'cartTotalPrice' }),
    ...mapGetters({ totalProducts: 'cartTotalProducts' }),
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
