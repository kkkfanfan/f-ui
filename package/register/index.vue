<template>
  <div class="register-container">
    <div class="register-header">账号注册</div>
    <form action="" class="register-form">
      <div class="item">
        <i><f-icon icon="phone-fill"></f-icon></i>
        <input v-model="ruleForm.phone" type="text" placeholder="请输入您的手机号" />
      </div>
      <div class="valid-input item">
        <i><f-icon icon="dunpaibaowei"></f-icon></i>
        <input v-model="ruleForm.code" type="text" placeholder="请输入验证码" />
        <f-button type="primary" @click="sendCode" round>发送验证码</f-button>
      </div>
      <div class="item">
        <i><f-icon icon="person"></f-icon></i>
        <input v-model="ruleForm.username" type="text" placeholder="请输入用户名" />
      </div>
      <div class="item">
        <i><f-icon icon="password"></f-icon></i>
        <input v-model="ruleForm.password" type="text" placeholder="请输入您的密码" />
      </div>
      <div class="item">
        <i><f-icon icon="password"></f-icon></i>
        <input v-model="ruleForm.repassword" type="text" placeholder="请确认您的密码" />
      </div>
      <div class="login-text">
        <slot>注册即同意《小鹿线用户服务协议》《小鹿线隐私政策》。</slot>
      </div>
      <f-button @click.prevent="register" class="button" type="primary" round>立即注册</f-button>
    </form>
    <div class="go-register">
          <a href="/" @click="goHome" class="toHome">返回首页</a>|
          <span>还没有账号?
            <a href="/login" @click="goLogin" class="toReg">去登录</a>
          </span>
        </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
defineOptions({
  name: 'f-register',
})
interface Rule{
  phone:string,
  code:string,
  username:string,
  password:string,
  repassword:string
}
let ruleForm=reactive<Rule>({
  phone:'',
  code:'',
  username:'',
  password:'',
  repassword:''
})
const emits=defineEmits(['getRegister','sendCode','goHome','goLogin'])
const register=()=>{
  emits('getRegister',ruleForm)
}

//发送验证码
const sendCode=()=>{
  let phone=ruleForm.phone
  let reg=/^1[3456789]\d{9}$/
  if(!reg.test(phone)){
    alert('请输入正确的手机号')
    return
  }
  else{
    emits('sendCode',phone)
  }
}
const goHome=(e:Event)=>{
  e.preventDefault()
  emits('goHome')
}

const goLogin=(e:Event)=>{
  e.preventDefault()
  emits('goLogin')
}
</script>

<style scoped lang="less">
@import '../index.css';
.register-container {
  position: relative;
  width: 475px;
  height: 500px;
  padding: 20px 80px;
  background-color: #fff;
  .register-header {
    text-align: center;
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }
  .register-form {
    .item {
      position: relative;
      width: 100%;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #666;
      margin-top: 20px;
      button {
        position: absolute;
        bottom: 5px;
      }
      .icon {
        font-size: 18px;
      }
      i {
        margin-right: 8px;
      }
      input {
        border: 0;
        outline: 0;
      }
    }
    .valid-input {
      margin-top: 30px !important;
    }
    .login-text {
      margin-top: 15px;
      color: #666;
      text-align: justify;
      font-size: 14px;
    }
    .button{
      margin-top:5px ;
      width: 100%;
      height: 35px;
      letter-spacing: 18px;
    }
  }
  .go-register{
    position: absolute;
    bottom: 25px;
    left: 150px;
    .toHome,.toReg{
      color: #388eff !important;
    }
  }
}
</style>
