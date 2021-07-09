<template>
  <!-- eslint-disable -->
  <div align="center">
    <div id="mainForm">
      <form
        method="POST"
        id="transForm"
        target="trans_iframe"
        name="colectoForm"
        action="https://testcolecto.banregio.com/ecm/"
      >
        <!-- https://testcolecto.banregio.com/ecm/-->
        <label for="">Cantidad</label>
        <b-form-input type="text" name="monto" requiered> </b-form-input>

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
        <input
          type="submit"
          value="Procesar"
          class="enviar btn btn-primary"
        />
      </form>
      <b-card variant="light" bg-variant="white" no-body>
        <iframe name="trans_iframe" width="100%" height="500" src="" frameBorder="0"></iframe>
      </b-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  BButton,
  BFormInput,
  BCard,
} from "bootstrap-vue";
export default {
  components: {
    BButton,
    BFormInput,
    BCard,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.iframe {
  border: 0px;
}
</style>
