<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.productId">
        <h3>{{ item.product.title }} {{ item.amount > 1 ? `(${item.amount})` : '' }}</h3>
        <b>{{ item.product.price * item.amount | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p v-if="deliveryCost">Доставка: <b>{{ deliveryCost | numberFormat }} ₽</b></p>
      <p>Итого: <b>{{ cartTotalProducts }}</b> {{ 'товар' | normalizeWord(cartTotalProducts) }}
        на
        сумму <b>{{ totalPrice |
          numberFormat
        }} ₽</b></p>
    </div>
    <slot />
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import normalizeWord from '@/helpers/normalizeWord';

export default {
  props: {
    deliveryCost: {
      default: 500,
      type: Number,
    },
    products: {
      required: true,
      type: Array,
    },
  },
  computed: {
    totalPrice() {
      return this.deliveryCost ? this.cartTotalPrice + this.deliveryCost : this.cartTotalPrice;
    },
    cartTotalProducts() {
      return this.products.length;
    },
    cartTotalPrice() {
      return this.products.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  filters: {
    numberFormat,
    normalizeWord,
  },
};
</script>
