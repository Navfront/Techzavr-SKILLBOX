<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img v-bind:src="product.image" v-bind:alt="product.title" width="270" height="350" />
    </router-link>
    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>
    <span class="catalog__price">{{ product.price | numberFormat }} &#8381;</span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="colorItem in product.colors" :key="colorItem.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="selectedColor"
            :value="colorItem.code" v-model="color" />
          <span class="colors__value" :title="colorItem.title"
            :style="{ backgroundColor: colorItem.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  data() {
    return {
      color: this.product.colors[0],
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
};
</script>
