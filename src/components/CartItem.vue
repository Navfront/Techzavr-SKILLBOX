<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <div class="product__info">
    </div>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <ProductCounter :is-cart-counter="true" :item="item" />

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
      @click="deleteItem" :style="{ cursor: 'pointer' }" :disabled="deleting">
      <svg width="20" height="20" fill="currentColor" v-if="deleting" style="transform: scale(2)">
        <use xlink:href="#preloader"></use>
      </svg>
      <svg width="20" height="20" fill="currentColor" v-else>
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductCounter from './ProductCounter.vue';

export default {
  data() {
    return {
      deleting: false,
    };
  },
  components: {
    ProductCounter,
  },
  props: ['item'],
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteProductFromCart' }),

    deleteItem() {
      this.deleting = true;
      const response = this.deleteProduct(this.item.product.id);
      response.then(() => {
        this.deleting = false;
      });
    },
  },
};

</script>
