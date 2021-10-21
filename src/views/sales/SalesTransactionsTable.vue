<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >
    <div class="m-2">
      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          sm="auto"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <h3>Ventas</h3>
        </b-col>

        <!-- Search -->
        <b-col>
          <div class="d-flex align-items-center justify-content-end">
            <slot />
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block ml-1 mr-1 search-input"
              placeholder="Buscar por folio..."
            />
            <v-select
              v-model="statusFilter"
              :dir="'ltr'"
              :options="statusOptions"
              class="invoice-filter-select"
              placeholder="Tipo de pago"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="orders"
      responsive
      :fields="tableColumns"
      primary-key="id"
      show-empty
      empty-text="No matching records found"
      class="position-relative"
    >

      <template #head(invoiceStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(folio)="data">
        <b-link
          :to="{ name: 'order-view', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          #{{ data.item.auto_inc_folio }}
        </b-link>
      </template>

      <!-- Column: Invoice Status -->
      <template #cell(invoiceStatus)="data">
        <b-avatar
          :id="`invoice-row-${data.item.id}`"
          size="32"
          :variant="`light-${resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).variant}`"
        >
          <feather-icon
            :icon="resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).icon"
          />
        </b-avatar>
        <b-tooltip
          :target="`invoice-row-${data.item.id}`"
          placement="top"
        >
          <p class="mb-0">
            {{ data.item.invoiceStatus }}
          </p>
          <p class="mb-0">
            Balance: {{ data.item.balance }}
          </p>
          <p class="mb-0">
            Due Date: {{ data.item.dueDate }}
          </p>
        </b-tooltip>
      </template>

      <!-- Column: store clerk -->
      <template #cell(store_clerk)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="32"
              :src="data.item.store_clerk.logo"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.store_clerk.name }}
          </span>
          <small class="text-muted">{{ data.item.store_clerk.email }}</small>
        </b-media>
      </template>

      <!-- Column: Issued Date -->
      <template #cell(created_at)="data">
        <span class="text-nowrap mr-2">
          {{ data.value | dateNtime }}
        </span>
      </template>

      <!-- Column: Total -->
      <template #cell(total)="data">
        <div>
          <feather-icon
            :icon="data.item.order_type === 'sell' ? 'TrendingUpIcon':'TrendingDownIcon'"
            :class="data.item.order_type === 'sell' ? 'text-success':'text-danger'"
            class="mr-1"
          />
          ${{ data.value | money }}
        </div>
      </template>

      <!-- Column: Payment type -->
      <template #cell(payment_type)="data">
        <template>
          <b-badge
            pill
            :variant="data.value === 'cash' ? 'light-success':'light-info'"
          >
            {{ data.value }}
          </b-badge>
        </template>
      </template>

      <!-- Column: Actions -->
      <template #cell(tools)="data">

        <div class="text-nowrap">
          <feather-icon
            :id="`invoice-row-${data.item.id}-send-icon`"
            icon="SendIcon"
            class="cursor-pointer"
            size="16"
          />
          <b-tooltip
            title="Send Invoice"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.id}-send-icon`"
          />

          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="$router.push({ name: 'order-view', params: { id: data.item.id }})"
          />
          <b-tooltip
            title="Preview Invoice"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />

        </div>
      </template>

    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <!-- <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span> -->
          <label># de resultados</label>
          <v-select
            v-model="entriesPerPage"
            :dir="'ltr'"
            :options="perPage"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
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
              <b-spinner
                v-if="loading"
                small
                label="Loading"
              />
              <feather-icon
                v-else
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  // BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  // BDropdown,
  // BDropdownItem,
  BPagination,
  BTooltip,
  BSpinner,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    // BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    // BDropdown,
    // BDropdownItem,
    BPagination,
    BTooltip,
    vSelect,
    BSpinner,
  },
  data() {
    return {
      loading: false,
      entriesPerPage: '10',
      searchQuery: '',
      statusFilter: '',
      statusOptions: [
        'Todos',
        'Walleats',
        'Efectivo',
        'Tarjetas bancarias',
      ],
      tableColumns: [
        'folio',
        'store_clerk',
        'created_at',
        'total',
        'payment_type',
        'tools',
      ],
      perPage: ['10', '20', '50', '100'],
    }
  },
  computed: {
    ...mapGetters('orders', [
      'pagination',
      'orders',
    ]),
  },
  watch: {
    entriesPerPage() {
      this.loading = true
      this.fetchOrders({
        meta: {
          pagination: {
            page: this.pagination.page,
            per_page: this.entriesPerPage,
          },
        },
      }).then(() => {
        this.loading = false
      })
    },
  },
  methods: {
    ...mapActions('orders', [
      'fetchOrders',
    ]),
    handlePagination({ page, per_page }) {
      this.loading = true
      this.fetchOrders({
        meta: {
          pagination: {
            page,
            per_page,
          },
        },
      })
        .then(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';

.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}

.search-input{
  max-width: 200px;
}
</style>
