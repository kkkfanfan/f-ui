<template>
  
  <f-virtual-list-plus :data="data" :dynamic="true" >
    <template v-slot="{item}">
      <div class="item">
        <span :style="{color:'red',marginRight:10+'px'}">{{ item.id }}</span><span>{{ item.value }}</span>
      </div>
    </template>
  </f-virtual-list-plus>
</template>
  
<script setup >
import faker from 'faker'

let data = [];
for (let id = 0; id < 10000; id++) {
  data.push({
    id,
    value:faker.lorem.sentences() // 长文本
  })
}

</script>
 
<style scoped lang='less'>
 .item{
  padding: 20px;
    border: 1px solid #ccc;
  span{
   
    font-size: 20px;
  }
 }
</style>