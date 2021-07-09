<template>
  <!-- eslint-disable -->
  <div>
    <b-card
      v-show="!isHidden"
    >
      <form
        method="POST"
        id="transForm"
        target="trans_iframe"
        name="colectoForm"
        action="https://testcolecto.banregio.com/ecm/"
      >
        <h3 class="text-center display-1 mb-2">🤑</h3>
        <h4 class="text-center">¿Cuánto quieres depositar?</h4>
        <b-form-input
          type="number"
          requiered
          size="lg"
          v-model="amount"
          class="text-center"
        />
        <input
          type="text"
          name="monto"
          requiered
          size="lg"
          v-model="amountWithFee"
          v-show="false"
          class="text-center"
        />
        <b-row v-if="amount" class="mt-1">
          <b-col>
            Comision: ${{ fee(amount) | money }}
          </b-col>
          <b-col>
            Total: ${{ Number(amount) + Number(fee(amount)) | money }}
          </b-col>
        </b-row>

        <div class="formData" style="display: none">
          <select id="transType" onchange="transTypeCombo()">
            <option value="VENTA" selected="">Venta</option>
            <option value="VENTA_PROMO">Venta con promoción</option>
          </select>

          <select id="enviroment" onchange="transEnv()">
            <option value="sandbox" selected>Sandbox</option>
            <option value="prod">Producción</option>
          </select>
        </div>
        <input
          type="hidden"
          name="respuestaURL"
          value="https://api.mywalleat.com/v1/resultadoBanregio"
        />
        <!-- El motor de pagos envía la respuesta a la URL especificada mediante un POST-->
        <input
          type="hidden"
          name="idAfiliacion"
          id="idAfiliacion"
          value="8090005"
        />
        <!-- 7091914 - 8090005 -->
        <input type="hidden" name="idMedio" id="idMedio" value="RzZr2zfH" />
        <!-- yw5tAZa7 - YYTN6gGG -->
        <input
          type="hidden"
          name="refCliente1"
          id="refCliente1"
          value="f29b8665"
        />
        <input type="hidden" name="folio" id="folio" value="folio180919" />
        <input type="hidden" name="3dSecure" value="true" />
        <b-button
          class="mt-1"
          type="submit"
          @click="isHidden = true"
          variant="primary"
          block
        >
          Continuar
        </b-button>
      </form>
    </b-card>
    <b-card v-show="isHidden" variant="light" bg-variant="white" no-body>
      <iframe name="trans_iframe" width="100%" height="500" src="" frameBorder="0"></iframe>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable */
import {
  BButton,
  BFormInput,
  BCard,
  BRow,
  BCol,
} from "bootstrap-vue";
export default {
  components: {
    BButton,
    BFormInput,
    BCard,
    BRow,
    BCol,
  },
  data() {
    return {
      isHidden: false,
      amount: null,
      amountWithFee: null,
    }
  },
  methods: {
    fee(amount) {
      const min = 2
      const max = 20
      this.amountWithFee = Number(Math.min(Math.max(min, 0.01 * amount), max)) + Number(amount)
      return Math.min(Math.max(min, 0.01 * amount), max)
    },
  },
};
</script>

<style lang="scss" scoped>
.iframe {
  border: 0px;
}
</style>
