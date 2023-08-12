<template>
  <div class="virtual-list" :style="{ height: screenHeight + 'px' }" ref="virtual">
    <div class="virtual-open" :style="{ height: listHeight + 'px' }"></div>
    <div class="item-list" ref="list" :style="{ transform: `translate(-50%,${offSet}px)` }">
      <div class="virtual-item" :vid="item._id" :_index="index" ref="items" :key="item._id" v-for="(item, index) in dataList">
        <slot :item="item.item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated, nextTick, toRaw, onMounted, watch } from 'vue'
defineOptions({
  name: 'f-virtual-list-plus',
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
//初始化数据
let myData = props.data.map((item, index) => {
  return {
    _id: index,
    item,
  }
})
//自行计算item,防止用户传入的固定高度有误
let myItem = ref(props.itemSize)
//起始索引
let start = ref(0)
//列表高度（对于interSectionObserver这种方法，列表高度要足够高，让头尾不能同时出现）
let itemCount = ref(Math.ceil(props.screenHeight / myItem.value) * 3)
// 结束索引
let end = ref(0 + itemCount.value)
//真实数据
let dataList = computed(() => {
  return myData.slice(start.value, end.value)
})
//列表高度
let listHeight=ref(myItem.value * props.data.length)
//位置数组
let positions = props.data.map((item, index) => {
  return {
    height: myItem.value,
    top: index * myItem.value,
    bottom: (index + 1) * myItem.value,
  }
})
//偏移量
let offSet = ref(0)
//dom
let items = ref()
let list = ref()
let virtual = ref()
onMounted(() => {
  let itemDom: HTMLElement = items.value[0]
  myItem.value = itemDom.getBoundingClientRect().height
  listHeight.value=myItem.value * props.data.length
  updatePosition()
})
//观察end的变化
watch(end, () => {
  // clearObserver()
  initObserver()
})
//观察者对象
let observerObj = ref<IntersectionObserver>()
//清空观察器
function clearObserver() {
  nextTick(() => {
    observerObj.value?.unobserve(items.value[0])
    observerObj.value?.unobserve(items.value[items.value.length - 1])
  })
}
//初始化观察器
function initObserver() {
  observerObj.value = new IntersectionObserver(updateObserver)
  nextTick(() => {
    observerObj.value?.observe(items.value[0])
    observerObj.value?.observe(items.value[items.value.length - 1])
  })
}
initObserver()
//更新观察器
function updateObserver(entries) {
  entries.forEach((entry) => {
    let dom: HTMLElement = entry.target
    let id = Number(dom.getAttribute('_index'))
    if (id === 0 && entry.isIntersecting) {
      //向上滑动
      start.value = start.value === 0 ? 0 : start.value - 1
      end.value = start.value + itemCount.value
    }
    if (id === items.value.length - 1 && entry.isIntersecting) {
      //向下滑动
      end.value = end.value === props.data.length ? items.value.length : end.value + 1
      start.value = end.value - itemCount.value
    }
    if (props.dynamic) {
      offSet.value = positions[start.value].top
    } else {
      offSet.value = start.value * myItem.value
    }
    // let scrollTop = virtual.value.scrollTop
    // let tmpStart = Math.floor(scrollTop / myItem.value)
    // //简单差值
    // if (Math.abs(tmpStart - start.value) > itemCount.value) { 
    //   console.log('触发了');
      
    //   start.value = tmpStart >= props.data.length - itemCount.value ? props.data.length - itemCount.value : tmpStart
    //   end.value = start.value + itemCount.value
    //   offSet.value = start.value * myItem.value
    // }
  })
}
//更新位置数组
function updatePosition() {
  nextTick(() => {
    items.value.forEach((item: HTMLElement) => {
      let height = item.getBoundingClientRect().height
      let id = Number(item.getAttribute('vid'))
      let oldHeight = positions[id].height
      let val = height - oldHeight
      if (val !== 0) {
        positions[id].height = height
        positions[id].bottom = positions[id].bottom + val
        for (let i = id + 1; i < props.data.length; i++) {
          positions[i].top = positions[i - 1].bottom
          positions[i].bottom = positions[i].bottom + val
        }
      }
    })
    listHeight.value=positions[props.data.length-1].bottom
  })
}
onUpdated(() => {
  updatePosition()
})
</script>

<style scoped lang="less">
.virtual-list {
  position: relative;
  width: 100%;
  overflow: auto;
  .item-list {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
//伪元素
::-webkit-scrollbar{
  display: none;
}
</style>
