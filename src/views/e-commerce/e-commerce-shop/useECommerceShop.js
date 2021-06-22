import { ref } from '@vue/composition-api'
import store from '@/store'

export const useShopFiltersSortingAndPagination = () => {
  const filters = ref({
    q: '',
    priceRangeDefined: 'all',
    priceRange: [0, 100],
    categories: [],
    brands: [],
    ratings: null,
    page: 1,
    perPage: 9,
  })

  const filterOptions = {
    priceRangeDefined: [
      { text: 'All', value: 'all' },
      { text: '<= $10', value: '<=10' },
      { text: '$10 - $100', value: '10-100' },
      { text: '$100 - $500', value: '100-500' },
      { text: '>= $500', value: '>=500' },
    ],
    categories: [],
    brands: ['Insignia™', 'Samsung', 'Metra', 'HP', 'Apple', 'GE', 'Sony', 'Incipio', 'KitchenAid', 'Whirlpool'],
    ratings: [
      { rating: 5, count: 666 },
      { rating: 4, count: 160 },
      { rating: 3, count: 176 },
      { rating: 2, count: 291 },
      { rating: 1, count: 190 },
      { rating: 0, count: 65551 },
    ],
  }

  // Sorting
  const sortBy = ref({ text: 'Featured', value: 'featured' })
  const sortByOptions = [
    { text: 'Featured', value: 'featured' },
    { text: 'Lowest', value: 'price-asc' },
    { text: 'Highest', value: 'price-desc' },
  ]

  return {
    // Filter
    filters,
    filterOptions,

    // Sort
    sortBy,
    sortByOptions,
  }
}

export const useShopUi = () => {
  const itemView = 'grid-view'
  const itemViewOptions = [
    { icon: 'GridIcon', value: 'grid-view' },
    { icon: 'ListIcon', value: 'list-view' },
  ]

  // Pagination count <= required by pagination component
  const totalProducts = ref(null)

  return {
    itemView,
    itemViewOptions,
    totalProducts,
  }
}

export const useShopRemoteData = () => {
  const products = ref([])
  const categories = ref([])
  const fetchProducts = (...args) => store.dispatch('products/fetchProducts', ...args)
  const fetchCategories = (...args) => store.dispatch('categories/fetchCategories', ...args)

  return {
    products,
    fetchProducts,
    categories,
    fetchCategories,
  }
}
