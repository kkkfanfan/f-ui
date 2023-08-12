<template>
  <input  @input="inputChange" class="f-input" :placeholder="pla" :class="styleCss"/>
</template>
  
<script setup >

import {computed} from 'vue'
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
}
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