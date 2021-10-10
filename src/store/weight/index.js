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
      navigator.serial.addEventListener('connect', () => {
        // Add |e.port| to the UI or automatically connect.
      })

      navigator.serial.addEventListener('disconnect', () => {
        // Remove |e.port| from the UI. If the device was open the
        // disconnection can also be observed as a stream error.
      })
      port = await navigator.serial.requestPort()
      await port.open({
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: 'none',
      })
      while (port.readable) {
        const reader = port.readable.getReader()
        try {
          /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
          while (true) {
            /* eslint-disable-next-line */
            const { value, done } = await reader.read()
            if (done) {
              // Allow the serial port to be closed later.
              reader.releaseLock()
              break
            }
            if (value) {
              const string = new TextDecoder().decode(value)
              console.log(string)
              ctx.commit('setWeight', string)
            }
          }
        } catch (error) {
          // TODO: Handle non-fatal read error.
        }
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
