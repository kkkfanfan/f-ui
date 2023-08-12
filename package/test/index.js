import Test from './index.vue'

Test.install = (app) => {
  app.component(Test.name, Test)
}

export default Test