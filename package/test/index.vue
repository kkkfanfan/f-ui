<template>
  <div>
    <button @click="cic">111</button>
  </div>
</template>
  
<script setup lang='ts'>
defineOptions({
  name:'f-test'
})
const cic=()=>{
  console.log(111);
  
  return ()=>{
    console.log(222);
    
  }
}

</script>
 
<style scoped lang='less'>
 
</style>