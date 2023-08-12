import fLogin from './index.vue'

fLogin.install = (app) => {
  app.component(fLogin.name, fLogin)
}

export default fLogin