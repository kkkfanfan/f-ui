import fVerify from './index.vue'

fVerify.install = (app) => {
  app.component(fVerify.name, fVerify)
}

export default fVerify