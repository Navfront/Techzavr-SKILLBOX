<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#"
        :class="{ 'pagination__link--disabled': page === 1 }" aria-label="Предыдущая страница"
        @click.prevent="paginate(page - 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link" :class="{ 'pagination__link--current': pageNumber === page }"
        href="#" @click.prevent="paginate(pageNumber)">
        {{ pageNumber }} </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }" href="#"
        aria-label="Следующая страница" @click.prevent="paginate(page + 1)">
        <svg width=" 8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  model: {
    prop: 'page',
    event: 'paginate',
  },
  methods: {
    paginate(page) {
      if (page !== 0 && page !== this.pages + 1 && page !== this.page) {
        this.$emit('paginate', page);
      }
    },
  },
};
</script>
