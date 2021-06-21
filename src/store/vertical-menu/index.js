import { $themeConfig } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
  },
  getters: {
    isVerticalMenuCollapsed(state) {
      return state.isVerticalMenuCollapsed
    },
  },
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val
    },
  },
  actions: {},
}
