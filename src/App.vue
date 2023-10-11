<template>
  
  <f-virtual-list-plus :data="data" :dynamic="true" >
    <template v-slot="{item}">
      <div class="item">
        <span :style="{color:'red',marginRight:10+'px'}">{{ item.id }}</span><span>{{ item.value }}</span>
      </div>
    </template>
  </f-virtual-list-plus>
  <!-- <f-form :model="state" :rules="{
    username:{required:true,message:'请输入用户名',trigger:'blur'},
  }" ref="form">

    <f-form-item prop="username" label="请输入用户名" :rules="[
      {min:5,max:10,message:'用户名应该为5-10位',trigger:['change','blur']}
    ]">
      <f-input placeholder="请输入用户名" v-model="state.username"></f-input>
      <template #label></template>
    </f-form-item>

    <f-form-item prop="password" label="请输入密码" :rules="[
      {min:4,max:12,message:'密码为4-12位',trigger:['change','blur']},
      {required:true,message:'请输入密码',trigger:['blur']}
    ]">
      <f-input type="password" placeholder="请输入密码" v-model="state.password"></f-input>
      <template #label></template>
    </f-form-item>
    <f-button round @click="validate">校验</f-button>
  </f-form> -->
  <f-verify :imgSrc="img" v-if="visible" @refresh="refresh"></f-verify>
</template>
  
<script setup >
import {reactive,ref} from 'vue'
import img from '@/assets/bg.png'
// const state=reactive({username:'',password:''})
// const form=ref()
// const visible=ref(true)
// const refresh=()=>{
//   setTimeout(()=>{
//     refresh.value=true
//   })
//   refresh.value=false
// }
// const validate=()=>{
//   form.value.validate()
// }
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