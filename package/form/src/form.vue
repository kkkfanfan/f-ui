<template>
  <form class="form-container">
    <slot></slot>
  </form>
</template>
  
<script setup lang='ts'>
import { provide,reactive } from 'vue';
import {formProps,FormContextKey} from './form'
import { FormContext } from './form';
import { FormItemContext } from './form-item';
 defineOptions({
  name:'f-form'
 })
 //属性
 const props=defineProps(formProps)
 //form的校验(在父级调用所有表单项的校验)
 const validate=async(callback?:(valid:boolean,fileds?)=>void)=>{
  let errors={}
  fileds.forEach(async item=>{
    await item.validate('blur')
    await item.validate('change')
  })  
  // if(Object.keys(errors).length===0) return callback?.(true)
  // callback?.(false,errors)
 }
 const fileds:FormItemContext[]=[]
 //把子实例添加到父类的内部，便于父类管理（最终让父类组件调用子类组件的validate）
 const addField:FormContext['addField']=context=>{
  fileds.push(context)
 }
 //上下文对象，给子组件的
 const context=reactive({
  ...props,
  addField
 })
 provide(FormContextKey,context)

 //暴露方法
defineExpose({
  validate
})
</script>
 
<style scoped lang='less'>
 
</style>