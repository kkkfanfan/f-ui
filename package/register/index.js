import fRegister from './index.vue'

fRegister.install = (app) => {
  app.component(fRegister.name, fRegister)
}

export default fRegister