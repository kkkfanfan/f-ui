<template>
  <div class="login-form">
    <ul class="login-tab">
      <li class="item-left" :class="tabIndex===0?'active':''" @click="TabChange(0)">账号登录</li>
      <li class="item-right" :class="tabIndex===1?'active':''" @click="TabChange(1)" >短信登录</li>
    </ul>
    <div class="tab-content">
      <div class="tab-main">
        <form action="" :method="props.method" v-if="tabIndex===0">
          <div class="login-username">
            <i class="icon"><f-icon icon="person"></f-icon></i>
            <input type="text" v-model="ruleFormOne.username" placeholder="请输入您的账号">
          </div>
          <div class="login-password">
            <i class="icon"><f-icon icon="password"></f-icon></i>
            <input type="password" v-model="ruleFormOne.password" placeholder="请输入您的密码">
          </div>
          <div class="submit">
            <f-button type="primary" @click="userLogin" round>登录</f-button>
          </div>
          <a href="" class="forget-pwd">忘记密码？</a>
          <div class="login-text">
            <slot>登录即同意《小鹿线用户服务协议》《小鹿线隐私政策》。</slot>
          </div>
        </form>
        <form action="" :method="props.method" v-else>
          <div class="login-phone">
            <i class="icon"><f-icon icon="phone-fill"></f-icon></i>
            <input type="text"  v-model="ruleFormTwo.phone" placeholder="请输入您的手机号">
          </div>
          <div class="login-valid">
            <input type="number" v-model="ruleFormTwo.code" placeholder="请输入验证码">
            <f-button @click="sendCode" round type="primary">发送验证码</f-button>
          </div>
          <div class="submit">
            <f-button type="primary" @click="phoneLogin" round>登录</f-button>
          </div>
          <a href="" class="forget-pwd">忘记密码？</a>
          <div class="login-text">
            <slot>登录即同意《小鹿线用户服务协议》《小鹿线隐私政策》。</slot>
          </div>
        </form>
        <div class="go-register">
          <a href="javascript:;" @click="goHome" class="toHome">返回首页</a>|
          <span>还没有账号?
            <a href="javascript:;" @click="goRegister" class="toReg">去注册</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import {ref,reactive} from 'vue'
 defineOptions({
  name:'f-login'
 })
const emits=defineEmits(['userLogin','phoneLogin','goHome','goRegister','sendCode'])
const props=defineProps({
  action:{
    type:String,
    default:''
  },
  method:{
    type:String,
    default:'post'
  }
})
interface RuleOne{
  username:string,
  password:string,
}
interface RuleTwo{
  phone:string,
  code:string
}
let tabIndex=ref(0)
let ruleFormOne=reactive<RuleOne>({
  username:'',
  password:''
})
let ruleFormTwo=reactive<RuleTwo>({
  phone:'',
  code:''
})

const TabChange=(index)=>{
  if((index===0 && tabIndex.value===0)||(index===1 && tabIndex.value===1)) return
  tabIndex.value=index
}
//账号登录
const userLogin=(e)=>{
  e.preventDefault()
  emits('userLogin',ruleFormOne)
}
//短信登录
const phoneLogin=(e)=>{
  e.preventDefault()
  emits('phoneLogin',ruleFormTwo)
}
//发送验证码
const sendCode=()=>{
  let phone=ruleFormTwo.phone
  let reg=/^1[3456789]\d{9}$/
  if(!reg.test(phone)){
    alert('请输入正确的手机号')
    return
  }
  else{
    emits('sendCode',phone)
  }

}
// 去主页
const goHome=(e:Event)=>{
  e.preventDefault()
  emits('goHome')
}
// 去注册
const goRegister=(e:Event)=>{
  e.preventDefault()
  emits('goRegister')
}
</script>
 
<style scoped lang='less'>
 @import '../index.css';
 .login-form{
  position: relative;
  width: 350px;
  height: 440px;
  background:#fff;
  padding: 10px 40px;
  box-shadow: 0 0 8px #ccc;
  border-radius: 8px;
  .login-tab{
    display: flex;
    justify-content: space-between;
    width: 270px;
    height: 49px;
    li{
      width: 108px;
      text-align: center;
      height: 45px;
      line-height: 45px;
      color: #333;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .tab-content{
    width: 270px;
    height: 360px;
    .login-username,.login-password,.login-phone,.login-valid{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #666;
      margin-top: 30px;
      i{
        margin: 0 15px 0 5px;
      }
      input{
        border: 0;
        outline: 0;
      }
    }
    .submit{
      button{
        width: 100%;
        height: 40px;
        margin-top: 30px;
        font-size: 14px;
        letter-spacing: 10px;
      }
    }
    .forget-pwd{
      float: right;
      color: #888;
      font-size: 14px;
    }
    .login-text{
      margin-top: 30px;
      color: #666;
      text-align: justify;
      font-size: 14px;
    }

  }
  .login-valid{
    position: relative;
    button{
      position: absolute;
      width: 115px;
      bottom: 5px;
      right: 5px;
    }
  }
  .go-register{
    position: absolute;
    bottom: 25px;
    left: 70px;
    .toHome,.toReg{
      color: #388eff !important;
    }
  }
 }
 .active{
  color: #388cff !important;
  border-bottom: 4px solid #388eff;
 }
</style>