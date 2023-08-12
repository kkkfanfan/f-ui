<template>
  <div class="big-box">
    <div class="innner-box">
      <!-- <h2 class="title">
        <div class="hot">
          <div class="hot-left"></div>
          <div class="hot-right"></div>
        </div>
        <div class="txt">
          <div class="txt-top"></div>
          <div class="txt-bottom"></div>
        </div>
      </h2> -->
      <div class="course-content">
        <ul class="course-ul">
          <li class="course-ul-item" v-for="item in count">
            <div class="item-img">
              <img src="@/assets/absent.png" alt="" width="50" height="50" style="border-radius: 10px 10px 0 0;">
            </div>
            <div class="item-name"></div>
            <div class="item-description">
              
            </div>
            <div class="item-price"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { computed } from 'vue';
 defineOptions({
  name:'f-skeleton'
 })
 const props=defineProps({
  row:{
    type:Number,
    default:2
  }
 })
let count=computed(()=>{
  return 4*props.row
})

</script>
 
<style scoped lang="less">
*{
  box-sizing: border-box;
}
 .big-box{
  width: 100%;
  display: flex;
  justify-content: center;
.title{
  display: flex;
  width: 1140px;
  height: 38px;
  .hot{
    display: flex;
    &-left{
      line-height: 37px;
      width: 75px;
      color: #ffffff;
      border-radius: 8px 0 8px 8px;
      text-align: center;
      background: #F2F2F2;
    }
    &-right{
      width: 0;
      height: 0;
      border: 6px solid #F2F2F2;
      border-right-color:transparent;
      border-bottom-color:transparent ;
    }
  }
  .txt{
    background-color: #F2F2F2;
    &-top{
      width: 100px;
      height: 30px;
      background-color: #F2F2F2;
    }
    &-bottom{
      position: relative;
      top: 15px;
      z-index: -1;
      height: 13px;
      width: 100%;
      border-radius: 7px;
    }
  }
}
.course-content{
  width: 1200px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .course-ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    width: 100%;
    height:100%;
    
    &-item{
      width: 270px;
      height: 275px;
      margin:0 20px 20px 0;
      border-radius: 10px;
      overflow: hidden;
      background-color: #ffffff;
      box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
    &:hover{
      transform: translateY(-8px);
    }
      img{
        cursor: pointer;
      }
      .item-name{
        margin: 10px 10px 0 10px;
        width: 40px;
        height: 20px;
        background-color: #F2F2F2;
      }
 
      .item-description{
        margin: 10px 10px 0 10px;
        width: 100px;
        height: 20px;
        background-color: #F2F2F2;
      }
      .item-price{
        margin: 10px 10px 0 10px;
        width: 50px;
        height: 20px;
        background-color: #F2F2F2;
      }
    }
  }
}
 }
 .item-img{
  width: 270px;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F2F2F2;
 }
</style>