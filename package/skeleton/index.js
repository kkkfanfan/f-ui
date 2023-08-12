import fSkeleton from './index.vue'

fSkeleton.install = (app) => {
  app.component(fSkeleton.name, fSkeleton)
}

export default fSkeleton