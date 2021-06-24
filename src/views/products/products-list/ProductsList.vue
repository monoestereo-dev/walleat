<template>

  <div>

    <product-list-add-new
      :is-add-new-product-sidebar-active.sync="isAddNewProductSidebarActive"
      @new-products="setUsers($event)"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Mostrar</label>
            <v-select
              v-model="pagination.per_page"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
              @input="(value)=>{handlePagination({ per_page: value, page: 1 })}"
            />
            <label>resultados</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Buscar..."
              />
              <b-button
                variant="primary"
                @click="isAddNewProductSidebarActive = true"
              >
                <span class="text-nowrap">Agregar producto</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="products"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: User -->
        <template #cell(name)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                square
                rounded="lg"
                size="32"
                :src="`${apiUrl}${data.item.logo}`"
                :text="avatarText(data.item.name)"
                :to="{ name: 'product-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'product-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
            <small class="text-muted">{{ data.item.variant }}</small>
          </b-media>
        </template>

        <!-- Column: Nutritional info -->
        <template #cell(nutritional_info)="data">
          <nutri-score :nutritional-info="data.item.nutritional_info" />
        </template>
        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.active_status)}`"
            class="text-capitalize"
          >
            {{ data.item.active_status }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'product-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'apps-products-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ pagination.total_objects }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="pagination.page"
              :total-rows="pagination.total_objects"
              :per-page="pagination.per_page"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="(value)=>{handlePagination({ page: value, per_page: pagination.per_page })}"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import _ from 'underscore'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { mapActions, mapGetters } from 'vuex'
import NutriScore from '@/@core/components/NutriScore.vue'
import useProductsList from './useProductsList'
import ProductListAddNew from './ProductListAddNew.vue'

export default {
  components: {
    ProductListAddNew,
    NutriScore,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },
  setup() {
    const isAddNewProductSidebarActive = ref(false)

    const statusOptions = [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false },
    ]

    const {
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      statusFilter,
    } = useProductsList()

    return {

      // Sidebar
      isAddNewProductSidebarActive,

      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      statusOptions,

      // Extra Filters
      statusFilter,
    }
  },
  data() {
    return {
      products: [],
      pagination: {},
    }
  },
  computed: {
    ...mapGetters(['apiUrl']),
  },
  watch: {
    // eslint-disable-next-line
    searchQuery: _.debounce(function(query){
      if (/^\d*$/.test(query) && query !== null && query !== '') {
        this.fetchProducts({
          by_sku: query || null,
          by_active_status: true,
          meta: {
            pagination: {
              per_page: this.pagination.per_page,
            },
          },
        })
          .then(response => {
            this.products = response.data
            this.pagination = response.meta.pagination
          })
      } else if (query !== null && query !== '') {
        this.fetchProducts({
          by_name: query || null,
          by_active_status: true,
          meta: {
            pagination: {
              per_page: this.pagination.per_page,
            },
          },
        })
          .then(response => {
            this.products = response.data
            this.pagination = response.meta.pagination
          })
      } else if (query === null || query === '') {
        this.fetchProducts({
          by_active_status: true,
          meta: {
            pagination: {
              per_page: this.pagination.per_page,
            },
          },
        })
          .then(response => {
            this.products = response.data
            this.pagination = response.meta.pagination
          })
      }
    }, 500),
  },
  beforeMount() {
    this.fetchProducts({ by_active_status: true })
      .then(response => {
        this.products = response.data
        this.pagination = response.meta.pagination
      })
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
    setProducts(products) {
      this.products = products.data
      this.pagination = products.meta.pagination
    },
    handlePagination({ page, per_page }) {
      this.fetchProducts({
        by_active_status: true,
        meta: {
          pagination: {
            page,
            per_page,
          },
        },
      })
        .then(response => {
          this.products = response.data
          this.pagination = response.meta.pagination
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
