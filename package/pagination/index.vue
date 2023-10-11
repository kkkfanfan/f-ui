<template>
  <div class="pagination">
    <ul class="pagination-ui">
      <li @click="toFirst" class="li" :class="currentNum===1?'dis':''"><a>首页</a></li>
      <li @click="toPrew" class="li" :class="currentNum===1?'dis':''"><a>上一页</a></li>
      <li class="number">
        <ul class="number-ul">
          
          <li v-if="pageNumber<=8" :key="item" v-for="(item,index) in pageNumber" 
          :class="item===currentNum?'active':''" @click="toNum(item)">{{ item }}</li>
          <li v-else v-for="item in numberLst" :class="item===currentNum?'active':''" @click="toNum(item)">
            {{ item }}
          </li>
        </ul>
      </li>
      <li @click="toNext" class="li" :class="currentNum===pageNumber?'dis':''"><a>下一页</a></li>
      <li @click="toLast" class="li" :class="currentNum===pageNumber?'dis':''"><a>尾页</a></li>
    </ul>
  </div>
</template>
  
<script setup lang='ts'>
import {ref,reactive,watch,computed} from 'vue'
 defineOptions({
  name:'f-pagination'
 })
 const emits=defineEmits(['current-change'])

 const props=defineProps({
  pageSize:{
    type:Number,
    default:10 //表示一页上有多少个图行
  },
  total:{
    type:Number,
    default:80 //数据总数
  }
 })
 let pageNumber=computed(()=>{
  return Math.ceil(props.total/props.pageSize)
 })
 let currentNum=ref(1)
 let numberLst=reactive<number[]>([])
 const initNumberLst=()=>{
  numberLst=reactive<number[]>([])
  for(let i=1;i<=8;i++){
    numberLst.push(i)
  }
 }
 initNumberLst()

const toFirst=()=>{
 if(currentNum.value===1) return
  currentNum.value=1
 }
 const toLast=()=>{
  if(currentNum.value===pageNumber.value) return
  currentNum.value=pageNumber.value
 }
 const toPrew=()=>{
  if(currentNum.value===1) return
  currentNum.value--
 }
 const toNext=()=>{
  if(currentNum.value===pageNumber.value) return
  currentNum.value++
 }

 const toNum=(val)=>{
  currentNum.value=val
 }
 const changeNumLstPlus=(val)=>{
  numberLst=reactive<number[]>([])
  if(pageNumber.value-currentNum.value>=8){
    for(let i=val;i<val+8;i++){
    numberLst.push(i)
  }
}else{
    for(let i=pageNumber.value-7;i<=pageNumber.value;i++){
      numberLst.push(i)
    }
  }
 }
 watch(currentNum,(newVal,oldValue)=>{
  if(numberLst.indexOf(newVal)===-1 || pageNumber.value-newVal==7){
     changeNumLstPlus(newVal)
  }
  emits('current-change',currentNum.value)
 
 })
</script>
 
<style scoped lang='less'>
*{
  padding: 0;
  margin: 0;
}
ul,li{
  list-style: none;
}
li{
  cursor: pointer;
}
a{
  text-decoration: none;
}
.pagination{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #212529;
  .pagination-ui{
    li{
      a{
        color: #212529;
      }
    }
  }
}
 .pagination-ui{
  display: flex;

  .number{
    width: auto;
    max-width: 330px;
    .number-ul{
      display: flex;
      justify-content: space-between;
    }
    .other-ul{
      display: flex;
      width: auto;
      li{
        width: 30px;
      }
    }
    li{
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
      text-align: center;
      font-size: 15px;
    }
    li:last-child{
      margin: 0;
    }
  }
  .li{
    font-size: 14px;
    width: 45px;
    margin: 0 10px;
  }
 }
 .active{
  background: #388fff !important;
  border: 1px solid #388fff !important;
  color: #fff;
 }
 .dis{
  cursor:not-allowed !important;
 }
</style>