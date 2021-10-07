<template>
  <section class="invoice-preview-wrapper">
    <b-row
      v-if="order"
      class="invoice-preview"
    >

      <!-- Col: Left (Invoice Container) -->
      <b-col
        cols="12"
        xl="9"
        md="8"
      >
        <b-card
          no-body
          class="invoice-preview-card"
        >
          <!-- Header -->
          <b-card-body class="invoice-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <b-img
                    id="logo"
                    :src="appLogoImage"
                    height="50"
                    alt="logo"
                  />
                </div>
                <p class="card-text mb-25">
                  {{ order.store.establishment_attributes.name }}
                </p>
                <p class="card-text mb-25">
                  {{ order.store.name }}
                </p>
              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <h4 class="invoice-title">
                  Ticket
                  <span class="invoice-number">
                    #{{ order.auto_inc_folio }}
                  </span>
                  <span
                    v-if="order.bracelet_attributes"
                    class="invoice-number"
                  >
                    -{{ order.bracelet_attributes.orders_count }}
                  </span>
                </h4>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Fecha:
                  </p>
                  <p class="invoice-date">
                    {{ order.created_at | fullDate }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Hora:
                  </p>
                  <p class="invoice-date">
                    {{ order.created_at | time }}
                  </p>
                </div>
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing">

          <!-- Invoice Client & Payment Details -->
          <b-card-body
            v-if="order.bracelet_attributes"
            class="invoice-padding pt-0"
          >
            <b-row class="invoice-spacing">

              <!-- Col: Invoice To -->
              <b-col
                cols="12"
                xl="6"
                class="p-0"
              >
                <h6 class="mb-2">
                  Cliente:
                </h6>
                <h6 class="mb-25">
                  {{ userData.name }}
                </h6>
                <p class="card-text mb-25">
                  {{ userData.email | hideMail }}
                </p>
                <p class="card-text mb-0">
                  walleat: {{ order.bracelet_attributes.name }}
                </p>
              </b-col>

              <!-- Col: Payment Details -->
              <b-col
                xl="6"
                cols="12"
                class="p-0 mt-xl-0 mt-2 d-flex justify-content-xl-end"
              >
                <div>
                  <h6 class="mb-2">
                    Detalles:
                  </h6>
                  <table>
                    <tbody>
                      <tr>
                        <td class="pr-1">
                          Total:
                        </td>
                        <td><span class="font-weight-bold">${{ order.total | money }}</span></td>
                      </tr>
                      <tr>
                        <td class="pr-1">
                          Tipo:
                        </td>
                        <td>{{ order.order_type === 'sell' ? 'Compra':'Venta' }}</td>
                      </tr>
                      <tr>
                        <td class="pr-1">
                          Tipo de pago:
                        </td>
                        <td>{{ order.payment_type === 'credit' ? 'Walleat':'Efectivo' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
          <!-- Spacer -->
          <hr class="invoice-spacing">
          <!-- Invoice Description: Table -->
          <b-table-lite
            responsive
            :items="order.order_store_products_attributes"
            :fields="['name', 'unit_price', 'units', 'total']"
          >
            <template #cell(name)="data">
              <b-card-text class="font-weight-bold mb-25 d-flex">
                <b-img
                  width="40px"
                  height="40px"
                  :src="`${data.item.store_product_attributes.product_attributes.logo}`"
                  rounded
                  class="mr-1"
                />
                <div>
                  {{ data.item.store_product_attributes.product_attributes.name }}
                  <div>
                    <b-badge
                      v-for="category in data.item.store_product_attributes.product_attributes.categories_names"
                      :key="`category-${category}`"
                      variant="light-primary"
                    >
                      {{ category }}
                    </b-badge>
                  </div>
                </div>
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Total -->
          <b-card-body class="invoice-padding pb-0">
            <b-row>

              <!-- Col: Sales Persion -->
              <b-col
                cols="12"
                md="6"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Te atendió:</span>
                  <span class="ml-75">{{ order.store_clerk.name }}</span>
                </b-card-text>
              </b-col>

              <!-- Col: Total -->
              <b-col
                cols="12"
                md="6"
                class="mt-md-6 d-flex justify-content-end"
                order="1"
                order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Subtotal:
                    </p>
                    <p class="invoice-total-amount">
                      ${{ order.subtotal | money }}
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      IVA:
                    </p>
                    <p class="invoice-total-amount">
                      $ {{ order.iva | money }}
                    </p>
                  </div>
                  <hr class="my-50">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Total:
                    </p>
                    <p class="invoice-total-amount">
                      ${{ order.total | money }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
          <!-- Note -->
          <b-card-body class="invoice-padding pt-3">
            <span class="font-weight-bold">Nota: </span>
            <span>Gracias por tu preferencia! ✌</span>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="invoice-actions"
      >
        <b-card>

          <!-- Button: Send Invoice -->
          <!-- <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            v-b-toggle.sidebar-send-invoice
            variant="primary"
            class="mb-75"
            block
          >
            Enviar por correo
          </b-button> -->

          <!-- Button: DOwnload -->
          <!-- <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
          >
            Descargar
          </b-button> -->

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printInvoice"
          >
            Imprimir
          </b-button>

        </b-card>
      </b-col>
    </b-row>

  </section>
</template>

<script>
/* eslint-disable */
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton,
  BAlert, BLink, VBToggle, BImg, BBadge,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { $themeConfig } from '@themeConfig'
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
    BImg,
    Logo,
    BBadge,
  },
  setup() {
    const invoiceData = ref(null)
    const paymentDetails = ref({})

    // Invoice Description
    // ? Your real data will contain this information
    const invoiceDescription = [
      {
        taskTitle: 'Native App Development',
        taskDescription: 'Developed a full stack native app using React Native, Bootstrap & Python',
        rate: '$60.00',
        hours: '30',
        total: '$1,800.00',
      },
      {
        taskTitle: 'UI Kit Design',
        taskDescription: 'Designed a UI kit for native app using Sketch, Figma & Adobe XD',
        rate: '$60.00',
        hours: '20',
        total: '$1200.00',
      },
    ]

    const printInvoice = () => {
      window.print()
    }

    const {  appLogoImage } = $themeConfig.app

    return {
      invoiceData,
      paymentDetails,
      invoiceDescription,
      printInvoice,
      appLogoImage,
    }
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      order: undefined,
    }
  },
  beforeMount() {
    this.fetchOrder(this.$route.params.id)
      .then(response => {
        this.order = response
      })
  },
  methods: {
    ...mapActions('orders', ['fetchOrder']),
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {
  #logo {
    filter: invert(1);
  }
  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }

  .hide-print,
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
