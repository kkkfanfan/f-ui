//form 表单的属性
import {FormItemRule,Arrayable,FormItemContext} from './form-item'
import { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const formProps={
  model:Object,
  rules:{
    type:Object as PropType<Record<string,Arrayable<FormItemRule>>>
  },
  showMessage:{
    type:Boolean,
    default:true
  }
} as const

export type FormProps=Partial<ExtractPropTypes<typeof formProps>>

//父级的上下文对象
export interface FormContext extends FormProps{
  //把儿子的子实例传进来
  addField:(filed:FormItemContext)=>void
}

//上下文的key
export const FormContextKey:InjectionKey<FormContext>=Symbol()


