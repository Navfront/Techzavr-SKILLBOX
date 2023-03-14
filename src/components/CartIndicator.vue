<template>
  <router-link class="header__cart" :to="{ name: 'cart' }" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров" v-if="!cartLoading">{{
      cartTotalProducts }}</span>
    <svg class="preloader" width="25" height="25" fill="currentColor"
      :style="{ opacity: cartLoading ? 1 : 0 }">
      <use xlink:href="#preloader"></use>
    </svg>
  </router-link>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({ cartLoading: 'cartLoading' }),
    ...mapGetters({ cartTotalProducts: 'cartTotalProducts' }),
  },
};
</script>

<style lang="stylus">
  .header__cart
    position relative
  .preloader
    position absolute
    top -12px
    right -10px
    opacity 0
</style>
