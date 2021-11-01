<template>
  <div>
    <div class="d-flex align-items-center justify-content-center ">
      <b-img
        v-if="cropped"
        width="120"
        class="cursor-pointer soft-border"
        rounded
        :src="cropped"
        @click="chooseFile()"
      />
      <b-img
        v-else
        key="img2"
        width="120"
        class="cursor-pointer soft-border"
        rounded
        :src="model.logo != null ? model.logo : `/logo.png`"
        @click="chooseFile()"
      />
    </div>
    <b-form-file
      id="fileInput"
      class="d-none"
      placeholder="Logotipo de la empresa"
      drop-placeholder="Arrastrar aquí..."
      accept="image/*"
      @change="croppie"
    />
    <b-modal
      :id="`croppieModal-${model.id}`"
      @ok="handleEmit()"
    >
      <vue-croppie
        ref="cropRef"
        :enable-resize="false"
        :enable-orientation="false"
        :mouse-wheel-zoom="true"
        :boundary="{ width: 300, height: 300 }"
        :viewport="{ width: 150, height: 150, type: 'square' }"
        @result="result"
        @update="crop"
      />
    </b-modal>
  </div>
</template>

<script>
import {
  BModal,
  BFormFile,
  BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BFormFile,
    BImg,
  },
  props: {
    model: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cropped: null,
    }
  },
  methods: {
    croppie(e) {
      this.$bvModal.show(`croppieModal-${this.model.id}`)
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      const reader = new FileReader()
      reader.onload = el => {
        this.$refs.cropRef.bind({
          url: el.target.result,
        })
      }
      reader.readAsDataURL(files[0])
    },
    crop() {
      const options = {
        format: 'png',
        square: true,
      }
      this.$refs.cropRef.result(options, output => {
        const newLogo = {
          data: null,
        }
        this.model.logo = newLogo
        this.cropped = output
        this.model.logo.data = output
      })
    },

    result(output) {
      this.cropped = output
    },
    chooseFile() {
      document.getElementById('fileInput').click()
    },
    handleEmit() {
      let cropCopy

      if (!this.cropped) {
        cropCopy = {
          data: null,
        }
      } else {
        cropCopy = {
          data: this.cropped,
        }
      }
      this.$emit('croppedImage', cropCopy)
    },
    imgToDisplay() {

    },
  },
}
</script>

<style lang="scss" scoped>
.cursor-pointer{
  cursor: pointer;
}
.soft-border {
  border: 4px solid rgba(122,122,122,0.1)
}
</style>
