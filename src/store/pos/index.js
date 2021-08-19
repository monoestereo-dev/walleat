/* eslint-disable */

const state = () => ({
  loading: false,
  categories: [],
  products: [],
  cart: [],
  sales: [],
  isInventoryMode: false,
})

const getters = {
  loading(state) {
    return state.loading
  },
  categories(state){
    return state.categories
  },

  cart(state){
    return state.cart
  },
  cartTotal(state){
    let total = 0;
    state.cart.forEach(product => {
      total += product.unit_price * product.units;
    })
    return total;
  },
  inventoryCartTotal(state){
    let totalOfInventory = 0;
    state.cart.forEach(product => {
      totalOfInventory += product.unit_cost * product.units;
    })
    return totalOfInventory;
  },
  isInventoryMode(state){
    return state.isInventoryMode
  }
}

const mutations = {
  loading: (state, payload) => {
    state.loading = payload
  },
  pushProductToCart: (state, payload) =>{
    debugger
    payload.units=1;
    state.cart.unshift(payload.data[0])
  },
  incrementProductQuantity: (state, cartItem) =>{
    cartItem.units++;
  },
  decrementProductQuantity: (state, cartItem) =>{
    cartItem.units--;
  },
  deleteProductFromCarts: (state, cartItem) => {
    const index = state.cart.indexOf(cartItem);
    if (index > -1) {
      state.cart.splice(index, 1);
    }
  },
  decrementProductInventory(state, payload){
    payload.inventory--
  },
  emptyCart(state){
    state.cart = [];
  },
  addInventoryMode(state, payload){
    state.isInventoryMode = payload
  }
}

const actions = {

  addProductToCart(context, payload){
    const cartItem = context.state.cart.find(i => i.product_attributes.id === payload.data[0].product_attributes.id)
    if(!cartItem){
      context.commit('pushProductToCart', payload)
    }else{
      context.commit('incrementProductQuantity', cartItem)
    }
  },
  emptyCart(context){
    context.commit('emptyCart')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
