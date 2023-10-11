import fFormItem from './src/form-item.vue'
import fForm from './src/form.vue'
fFormItem.install=(app)=>{
  app.component(fFormItem.name,fFormItem)
}
fForm.install=(app)=>{
  app.component(fForm.name,fForm)
}
export type {formItemProps} from './src/form-item'
export default {fFormItem,fForm}

declare module 'vue'{
  export interface GlobalComponents{
    FFormItem:typeof fFormItem
  }
}