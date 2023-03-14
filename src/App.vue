<template>
  <div class="app-wrapper">
    <PageHeader />
    <router-view />
    <PageFooter />
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import PageFooter from './components/PageFooter.vue';
import PageHeader from './components/PageHeader.vue';

export default {
  name: 'app',
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
  components: {
    PageHeader, PageFooter,
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
.app-wrapper
  display contents
</style>
