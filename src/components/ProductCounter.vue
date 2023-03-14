<template>
  <div class="item__row">
    <div class="form__counter" :class="isCartCounter && 'product__counter'">
      <button type="button" aria-label="Убрать один товар"
        :style="{ cursor: amount > 1 ? 'pointer' : 'not-allowed' }" @click="updateAmountByOne(true)"
        :disabled="amount < 2">
        <svg :width="isCartCounter ? 10 : 12" :height="isCartCounter ? 10 : 12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <label>
        <input id="product-count" type="text" v-model.number="amount">
      </label>
      <button type="button" aria-label="Добавить один товар" style="cursor: pointer;"
        @click="updateAmountByOne(false)">
        <svg :width="isCartCounter ? 10 : 12" :height="isCartCounter ? 10 : 12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCartCounter: {
      type: Boolean,
      required: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.product.id, amount: value });
      },
    },
  },
  methods: {
    updateAmountByOne(isDecrement = false) {
      const currentAmount = isDecrement ? this.amount - 1 : this.amount + 1;
      if (this.amount >= 1) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.product.id, amount: Number(currentAmount) });
      }
    },
  },

};
</script>
