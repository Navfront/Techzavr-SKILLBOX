import { API_BASE_URL, TIMEOUT_DELAY } from '@/config';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
    cartLoadingFailed: false,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartLoading(state, boolean) {
      state.cartLoading = boolean;
    },
    updateCartLoadingFailed(state, boolean) {
      state.cartLoadingFailed = boolean;
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
        product: {...item.product, image: item.product.image.file.url},
      }));
    },
    updateCartProductAmount(state, { productId, amount }) {
      const findedItem = state.cartProducts.find((item) => item.productId === productId);
      if (findedItem) {
        findedItem.amount = amount;
      }
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts;
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalProducts(state) {
      return state.cartProducts.length;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(
        `${API_BASE_URL}/api/orders/${orderId}`,
        { params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      context.commit('updateCartLoading', true);
      context.commit('updateCartLoadingFailed', false);
      return new Promise((res) => {
        setTimeout(res, TIMEOUT_DELAY);
      }).then(() => axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('updateCartLoadingFailed', true);
        })
        .then(() => {
          context.commit('updateCartLoading', false);
        }));
    },
    addProductToCart(context, {productId, amount}) {
      return new Promise((res) => {
        setTimeout(res, TIMEOUT_DELAY);
      }).then(() => axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        }));
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', {productId, amount});
      return new Promise((res) => {
        setTimeout(res, TIMEOUT_DELAY);
      }).then(() => axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        }));
    },
    deleteProductFromCart(context, productId) {
      return new Promise((res) => {
        setTimeout(res, TIMEOUT_DELAY);
      }).then(() => axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: { productId },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        }));
    },
  },
});
