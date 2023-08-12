<template>
  <div class="virtual-list" :style="{ height: screenHeight + 'px' }" ref="virtual">
    <div class="virtual-open" :style="{ height: listHeight + 'px' }"></div>
    <div class="item-list" ref="list">
      <div class="virtual-item" :vid="item.id" ref="items" :key="item.id" v-for="item in dataList">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed,onUpdated,nextTick,toRaw,onMounted} from 'vue'
import {throttle} from '../hooks'
defineOptions({
  name: 'f-virtual-list',
})
const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true,
  },
  itemSize: {
    type: Number,
    default: 200,
  },
  screenHeight: {
    type: Number,
    default: 500,
  },
  reservedSize: {
    type: Number,
    default: 1,
  },
  dynamic: {
    type: Boolean,
    default: false,
  },
})
//如果用户在固定列表高度时传错了itemSize或者没传，则自己计算赋值
let myItemSize=ref(props.itemSize)
// dom
let virtual=ref()
//开始索引
let start = ref(0)
//上面预留个数
let prevCount = computed(() => {
  return Math.min(props.reservedSize * listCount, start.value)
})
//下面预留个数
let belowCount = computed(() => {
  return Math.min(props.reservedSize * listCount, props.data.length - end.value)
})
//容纳项数
let listCount = Math.ceil(props.screenHeight / props.itemSize)
//结束索引
let end = ref(0 + listCount)
//实际数据
let dataList = computed<any>(() => {
  return props.data.slice(start.value - prevCount.value, end.value + belowCount.value)
})
//dom对象
let list = ref()
let items=ref()
//偏移量
let offSet = ref(0)
//位置数组
let positions=ref()
//初始化位置数组
const initPositions=()=>{
  positions.value=props.data.map((item,index)=>{
    return {
      top:index*props.itemSize,
      height:props.itemSize,
      bottom:(index+1)*props.itemSize
    }
  })
}
initPositions()
//列表高度
let listHeight = ref(positions.value[positions.value.length-1].bottom)
//滚动事件
const ScrollEvent = () => {
  let scrollTop = virtual.value.scrollTop
  if (!props.dynamic) {
    start.value = Math.floor(scrollTop / myItemSize.value)
    end.value = start.value + listCount
    offSet.value = (start.value - prevCount.value) * myItemSize.value
  } else {
    //找到起始的索引
    start.value=binarySearch(toRaw(positions.value),scrollTop)
    end.value=start.value+listCount
    offSet.value=positions.value[start.value-prevCount.value].top
    
  }
  list.value.style.transform = `translate(-50%,${offSet.value}px)`
}
onMounted(()=>{
  //如果用户忘记传固定item的高度，或错误的传，那我就自己算
  if(!props.dynamic){
    let itemDom:HTMLElement=items.value[0]
    myItemSize.value=itemDom.getBoundingClientRect().height
  }
  //对csroll进行节流
  let dom:HTMLDivElement =virtual.value
  dom.addEventListener('scroll',throttle(ScrollEvent,200))
})
//更新位置数组
onUpdated(()=>{
  nextTick(()=>{
    items.value.forEach((item:HTMLElement)=>{
      let {height}=item.getBoundingClientRect()
      let id=item.getAttribute('vid')as any -0
      //vid作为每个item的唯一标识，用于对应于position数组的值，绑定的时候要注意
      let oldHeight=positions.value[id].height
      let val=height-oldHeight
      if(val!==0){
        positions.value[id].height=height
        positions.value[id].bottom=positions.value[id].bottom+val
        for(let i=id+1;i<positions.value.length;i++){
          positions.value[i].top=positions.value[i-1].bottom
          positions.value[i].bottom=positions.value[i].bottom+val
        }
      }
    })
    listHeight.value=positions.value[positions.value.length-1].bottom
  })
})
//二分查找
function binarySearch(list,value){
  let start=0
  let end=list.length-1
  let index=-1
  while(start<=end){
    let mid=Math.floor((start+end)/2)
    let midVal=list[mid].bottom
    if(midVal===value) return mid+1
    if(midVal<value){
      start=mid+1
    }
    if(midVal>value){
      if(index===-1 || index>mid){
        index=mid
      }
      end=mid-1
    }
  }
  return index
}
</script>

<style scoped lang="less">
.virtual-list {
  position: relative;
  width: 100%;
  overflow: scroll;

  .item-list {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
::-webkit-scrollbar{
  display: none;
}
</style>
