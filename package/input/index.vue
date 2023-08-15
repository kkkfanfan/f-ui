<template>
  <input @blur="blurEvent" :type="type"   @input="inputChange" class="f-input" :placeholder="pla" :class="styleCss"/>
</template>
  
<script setup >

import { inject } from 'vue';
import {computed} from 'vue'
import { formItemContextKey } from '../form/src/form-item';
import { watch } from 'vue';
defineOptions({
  name:'f-input'
})
 const props=defineProps({
  placeholder:{
    type:String,
    default:''
  },
  round:{
    type:Boolean,
    default:false
  },
  modelValue:{
    type:String,
    default:""
  },
  type:{
    type:String,
    default:'text'
  }
 })

const pla=computed(()=>{
  return props.placeholder
})

const styleCss=computed(()=>{
  return [props.round ? `f-input--round`:'']
})
const emits=defineEmits(['update:modelValue'])
const inputChange=(e)=>{
  emits('update:modelValue',e.target.value)
  formItemContext?.validate('change')
}

const blurEvent=(e)=>{
  formItemContext.validate('blur')
}
const formItemContext=inject(formItemContextKey)
</script>
 
<style scoped lang="less">
 .f-input{
  padding: 10px 15px;
  padding-right: 30px;
  outline: none;
  border: 1px solid #ccc;
  &--round{
    border-radius:10% ;
  }
 }
</style>