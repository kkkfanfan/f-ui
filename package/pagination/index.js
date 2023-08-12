import fPagination from './index.vue'

fPagination.install = (app) => {
  app.component(fPagination.name, fPagination)
}

export default fPagination