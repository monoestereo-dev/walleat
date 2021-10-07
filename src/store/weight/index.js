let port = () => {}

export default {
  namespaced: true,
  state: {
    weight: '0.0 kg',
  },
  getters: {
    weight(state) {
      return state.weight
    },
  },
  mutations: {
    setWeight(state, payload) {
      state.weight = payload
    },
  },
  actions: {
    async startSerial(ctx) {
      port = await navigator.serial.requestPort()
      await port.open({
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: 'none',
      })
      const reader = port.readable.getReader()
      // eslint-disable-next-line
      while (true) {
        // eslint-disable-next-line
        const { value, done } = await reader.read()
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock()
          break
        }
        // value is a Uint8Array.
        const string = new TextDecoder().decode(value)
        console.log(string)
        ctx.commit('setWeight', string)
      }
    },
    async stopSerial() {
      await port.close()
    },

    getWeight() {
      return new Promise(resolve => {
        const writer = port.writable.getWriter()
        const data = new Uint8Array([80])
        writer.write(data).then(() => {
          writer.releaseLock()
        })
        resolve()
      })
    },
  },
}
