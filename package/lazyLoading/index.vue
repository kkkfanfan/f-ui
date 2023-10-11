<template>
  <div class="lazy-list" :style="{height:screenHeight+'px'}">
    <div class="lazy-list-item" :key="item.id" v-for="item in props.data">
        <img class="lazy-list-item-img" v-lazy="item.img" alt="" :style="{width:imgWidth+'px',height:imgHeight+'px'}">
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import img from '@/assets/absent.png'
defineOptions({
  name:'f-lazy-loading'
})
const props=defineProps({
  data:{
    type:Array<any>,
    default:[]
  },
  screenHeight:{
    type:Number,
    default:500
  },
  imgHeight:{
    type:Number,
    default:300
  },
  imgWidth:{
    type:Number,
    default:300
  }
})

let vLazy=(el,bingding)=>{
  el.src=img
  const observer=new IntersectionObserver((entry)=>{
    if(entry[0].intersectionRatio!=0){
      el.src=bingding.value
      observer.unobserve(el)
    }
  })
  observer.observe(el)
}

</script>
 
<style scoped lang='less'>
 .lazy-list{
  overflow: auto;
 }
</style>