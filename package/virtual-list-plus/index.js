import fVirtualListPlus from './index.vue'

fVirtualListPlus.install = (app) => {
  app.component(fVirtualListPlus.name, fVirtualListPlus)
}

export default fVirtualListPlus