<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconContent"></use>
</svg>
</template>

<script setup >
import "../icon/iconfont"
import {computed} from 'vue'
defineOptions({
  name:'f-icon'
})
const props= defineProps({
  icon:{
    name:String,
    default:""
  }
})
const iconContent=computed(()=>{
  return `#icon-${props.icon}`
})
</script>
 
<style type="text/css" scoped>
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>