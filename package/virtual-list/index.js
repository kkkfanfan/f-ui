import fVirtualList from './index.vue'

fVirtualList.install = (app) => {
  app.component(fVirtualList.name, fVirtualList)
}

export default fVirtualList