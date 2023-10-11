import fCarousel from './carousel.vue'

fCarousel.install = (app) => {
  app.component(fCarousel.name, fCarousel)
}

export default fCarousel