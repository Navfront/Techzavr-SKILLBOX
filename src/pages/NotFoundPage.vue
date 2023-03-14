<template>
  <div class="container not-found">
    <h1 class="not-found__title">Страница не найдена</h1>
    <p class="not-found__code">404</p>
    <router-link class="not-found__back-link" :to="{ name: 'main' }">{{ '<- Назад в каталог'
    }}</router-link>
  </div>
</template>
<script>

export default {
};

</script>
<style lang="stylus">
.not-found
  display: grid
  justify-content center
  padding 10%

.not-found__title
  font-size 5vmin

.not-found__code
  margin 0
  margin-bottom 5%
  text-align center
  font-size 15vmin
  opacity 0.3

.not-found__back-link
  justify-self end
  font-size 20px
  color: #333
</style>
