<template>
  <button class="f-button" type="button" :class="styleClass" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup >
import {computed} from 'vue'
defineOptions({
  name:'f-button'
})
const props= defineProps({
type:{
  type:String,
  default:"default"
},
round:{
  type:Boolean,
  default:false
},
disabled:{
  type:Boolean,
  default:false
}
})
const styleClass=computed(()=>{
return [`f-button--${props.type}`,props.round ?'is-round' :'',props.disabled ? 'disabled' :'']
})
</script>

<style scoped lang="less">
.f-button{
display: inline-flex;
justify-content: center;
align-items: center;
height: 32px;
padding: 20px;
text-align: center;
color: #606266;
background-color: #ffffff;
border: 1px solid #dcdfe6;
cursor: pointer;
&--primary{
  background-color: #409EFF;
  color:#FFF
}
&--primary:hover{
  background-color: #68b1fa;
  color:#FFF
}
&--success{
  background-color: #67C23A;
  color:#FFF
}
&--success:hover{
  background-color: #82c461;
  color:#FFF
}
&--info{
  background-color: #909399;
  color:#FFF
}
&--info:hover{
  background-color: #989899;
  color:#FFF
}
&--warning{
  background-color: #E6A23C;
  color:#FFF
}
&--warning:hover{
  background-color: #ebb769;
  color:#FFF
}
&--danger{
  background-color: #E6A;
  color:#FFF
}
&--danger:hover{
  background-color: rgb(233, 140, 186);
  color:#FFF
}

}
.is-round{
  border-radius: 20px;
}
.disabled:hover,.disabled{
  cursor: not-allowed;
  color: #ffffff;
  border-color: #e4e7ed;
}
</style>