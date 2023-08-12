<template>
  <div class="bg" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <Transition name="fade" >
      <f-icon v-if="arrowShow" icon="left-circle" class="left-circle" @click="front"></f-icon>
    </Transition>
    <Transition name="fade" >
      <f-icon v-if="arrowShow" icon="right-circle" class="right-circle" @click="next"></f-icon>
    </Transition>
    <ul class="content">
      <li class="content-item"  :style="`background:url(${url}) 100%/cover`" ></li>
    </ul>
    <ul class="bottom">
      <li :key="index" v-for="(item,index) in list" :class="index===currentNum?'active':''" class="bottom-li"
      @click="changeNum(index)"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref ,reactive,computed} from 'vue'
defineOptions({
  name: 'f-carousel'
})

const props=defineProps({
  list:{
    type:Array,
    default:[]
  }
})

let arrowShow = ref(false)
let currentNum=ref(0)
let url=computed(()=>{
  return props.list[currentNum.value]
})
const front=()=>{
  currentNum.value=(currentNum.value-1)>=0?(currentNum.value-1):props.list.length-1
}

const next=()=>{
  currentNum.value=(currentNum.value+1)%(props.list.length)
}
const changeNum=(index)=>{
  currentNum.value=index
}
const createInterval=()=>{
  currentNum.value=(currentNum.value+1)%props.list.length
}
let timer=setInterval(createInterval,1500)
const mouseEnter=()=>{
  arrowShow.value=true
  clearInterval(timer)
}
const mouseLeave=()=>{
  arrowShow.value=false
  timer=setInterval(createInterval,1500)
}
</script>

<style scoped lang="less">
*{
  padding: 0;
  margin: 0;
}
.bg{
  position: relative;
  width: 500px;
  height: 150px;
  overflow: hidden;
  .left-circle{
    position: absolute;
    font-size: 50px;
    z-index: 10;
    color: #999;
    top: 50%;
    transform: translateY(-50%);
  }
  .right-circle{
    position: absolute;
    font-size: 50px;
    z-index: 10;
    color: #999;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
.fade-enter-active,.fade-leave-active {
    transition:all .8s;
  }
.fade-enter-to,.fade-leave{
  opacity: 1;
}
.fade-enter,.fade-leave-to {
    opacity:0;
  }

  ul,li{
    list-style: none;
  }
  ul.bottom{
    position: absolute;
    bottom:10px ;
    left: 50%;
    transform: translateX(-50%);
    display: flex;

    .bottom-li{
      margin-right: 10px;
      height: 4px;
      border-radius: 30%;
      border-right: 38px solid #a19d9d;
      cursor: pointer;
    }
    .bottom-li:hover{
      border-right: 38px solid #fff;
    }
    .active{
      border-right: 38px solid #fff !important;
    }
  }

  .content,.content-item{
    width: 100%;
    height: 100%;
    background-color: #999;
 
  }
</style>
