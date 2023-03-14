<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name"
              placeholder="Введите ваше полное имя" />

            <BaseFormText v-model="formData.address" title="Адрес доставки" :error="formError.address"
              placeholder="Введите ваш адрес" />

            <BaseFormText v-model="formData.phone" title="Телефон" :error="formError.phone"
              placeholder="Введите ваш телефон" type="tel" />

            <BaseFormText v-model="formData.email" title="Email" :error="formError.email"
              placeholder="Введите ваш Email" type="email" />

            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу"
              :error="formError.comment" placeholder="Ваши пожелания" />

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                    v-model.number="deliveryCost" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500"
                    v-model.number="deliveryCost">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" checked>
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" disabled>
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartInfoBlock :delivery-cost="deliveryCost" :products="cartProducts">
          <button class="cart__button cart__button--preloader button button--primery" type="submit"
            :disabled="formSending">
            Оформить заказ
            <svg class="cart__button-preloader" width="45" height="45" fill="currentColor"
              v-if="formSending">
              <use xlink:href="#preloader"></use>
            </svg>
          </button>
        </CartInfoBlock>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import CartInfoBlock from '@/components/CartInfoBlock.vue';
import { API_BASE_URL, TIMEOUT_DELAY } from '@/config';
import normalizeWord from '@/helpers/normalizeWord';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
    CartInfoBlock,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formSending: false,
      deliveryCost: 500,
    };
  },
  computed: {
    ...mapState(['cartProducts']),
    ...mapGetters(['cartTotalPrice', 'cartTotalProducts']),

  },
  filters: {
    numberFormat,
    normalizeWord,
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formSending = true;
      new Promise((res) => {
        setTimeout(res, TIMEOUT_DELAY);
      }).then(() => axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, { params: { userAccessKey: this.$store.state.userAccessKey } })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .then(() => {
          this.formSending = false;
        }));
    },
  },
};
</script>
<style lang="stylus">
.cart__button--preloader
  position relative
.cart__button-preloader
  position absolute
  top 50%
  right 10px
  transform translateY(-50%)

</style>
