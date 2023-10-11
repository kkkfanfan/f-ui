<template>
  <div class="container" :class="[validateState==='success'?'success':'',
          validateState==='error'?'error':'']">
    <div class="item">
      <label class="label">
        <slot name="label">{{props.label }}</slot>
      </label>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div class="errorMsg">
        {{ validMessage }}
    </div>
  </div>
  
</template>
  
<script setup lang='ts'>
import {ref,reactive,computed,provide,toRefs,inject, onMounted} from 'vue'
import {FormItemValidateStarte,formItemProps,formItemContextKey,FormItemContext,FormItemRule, Arrayable} from './form-item'
import {FormContextKey} from './form'
import AsyncValidator from 'async-validator'
defineOptions({
  name:'f-form-item'
})
//接受的上下文对象
const formContext=inject(FormContextKey)

//传递的属性
const props=defineProps(formItemProps)
//校验状态
const validateState=ref<FormItemValidateStarte>('')
const validMessage=ref('')
//得到过滤后的规则
const getRuleFiltered=(trigger:string)=>{
 
    const rules=_rules.value
    return rules.filter(rule=>{
      //无论如何都要校验
      if(!rule.trigger||!trigger) return true
      if(Array.isArray(rule.trigger)){
        return rule.trigger.includes(trigger)
      }else{
        return rule.trigger===trigger
      }
    })
  
}
//校验成功
const onValidateSuccess=()=>{
  validateState.value='success'
  validMessage.value=''
}
//校验失败
const onValidateFail=(error)=>{
  validateState.value="error"
  validMessage.value=error.errors?error.errors[0].message:''
  
}

//表单校验
const validate:FormItemContext['validate']=async(trigger:string,callback?)=>{
  //在表单比如input对应事件发生后，会触发进行校验
  //rules是对应的触发规则
  const rules=getRuleFiltered(trigger)

  
  //找到需要校验的prop属性
  const modelName=props.prop!
  
  //通过 async-validator库进行表单校验
  //拿到校验器
  const validator=new AsyncValidator({
    [modelName]:rules
  })
  //拿到需要校验的数据
  const model=formContext?.model !
  
  //进行校验
  return validator.validate({
    [modelName]:model[modelName]
  }).then(()=>{
    onValidateSuccess()
    
  }).catch((error)=>{
    onValidateFail(error)
  })
}

//将父级form的验证规则与子集合并，进行转换
const covertArray=(rules:Arrayable<FormItemRule>|undefined)=>{
  return rules?(Array.isArray(rules)?rules:[rules]):[]
}

const _rules=computed(()=>{
  const myRules:FormItemRule[]=covertArray(props.rules)
  let parentRules=formContext?.rules
  if(parentRules && props.prop){
     const _tmp= parentRules[props.prop]
     if(_tmp){
        myRules.push(...covertArray(_tmp))
     }
  }
  return myRules
})
//给子组件的context
const context:FormItemContext=reactive({
  ...props,
  validate
})
provide(formItemContextKey,context)

onMounted(()=>{
  formContext?.addField(context)
})
</script>
 
<style scoped lang='less'>
.item {
  display: flex;
  margin-left: 40px;
  width: 360px;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
}
.container{
  margin: 15px 0;
  .errorMsg{
    color: red;
    font-size: 14px;
    margin-left: 25px;
  }
}
</style>