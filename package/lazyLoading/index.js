import fLazy from './index.vue'

fLazy.install = (app) => {
  app.component(fLazy.name, fLazy)
}

export default fLazy