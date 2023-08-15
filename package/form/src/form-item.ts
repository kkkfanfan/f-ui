//用来定义form-item中所需要的属性
//prop 校验的输入框的属性
//label 输入框（表单）的标题
//rules 校验规则
//show-message 是否显示校验错误信息

//事件 change blur


import type {RuleItem} from 'async-validator'
import { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export interface FormItemRule extends RuleItem{
  trigger?:Arrayable<String>
}

export type Arrayable<T>=T | T[]

export const formItemValidateState=['success','error',''] as const 
export type FormItemValidateStarte=typeof  formItemValidateState[number]

export const formItemProps={
  prop:String,
  label:String,
  rules:[Object,Array] as PropType<Arrayable<FormItemRule>>,
  showMessage:{
    type:Boolean,
    default:true
  }
} as const

export type FormItem=Partial<ExtractPropTypes<typeof formItemProps>>

export interface FormItemContext extends FormItem{
  validate:(trigger:string,callback?:(isValid:boolean)=>void)=>Promise<void>
}

export const formItemContextKey:InjectionKey<FormItemContext>=Symbol()