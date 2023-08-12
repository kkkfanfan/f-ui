<template>
  <div class="canvas-content" :style="{width:width+'px',height:height+'px'}">
    <canvas ref="canvas1" :width="width" :height="height"></canvas>
    <canvas id="canvas2" ref="canvas2" :width="width" :height="height"></canvas>
  </div>
  <div class="slider" :style="{width:width+'px',height:50+'px'}">
    <div class="slider-left" ref="slider_left"></div>
    <div class="move-box" 
    @mousedown="handleDown"
    ref="move_box"
    >
      <f-icon icon="cc-arrow-right"></f-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'f-verify',
})
const props=defineProps({
  imgSrc:{
    type:String,
    required:true
  },
  imgWidth:{
    type:Number,
    default:500
  },
  imgHeight:{
    type:Number,
    default:300
  }
})
const emits=defineEmits(['refresh','success'])
//画布宽高
let width = props.imgWidth
let height = props.imgHeight
//屏幕宽度
let screenWidth=window.innerWidth
//画布dom
const canvas1 = ref()
const canvas2 = ref()
const slider_left=ref()
let sliderWidth=ref('')
onMounted(() => {
  document.addEventListener('mouseup',handleUp)
  document.addEventListener('mousemove',handleMove)
  sliderWidth.value=window.getComputedStyle(move_box.value).width
  const ctx1 = canvas1.value.getContext('2d') //绘制拼图
  const ctx2 = canvas2.value.getContext('2d') //抠出拼图

  drawImg(ctx1, ctx2)
  drawPath(ctx1, false)
  drawPath(ctx2, true)
})
//生成位置
const getXY = () => {
  const x = Math.floor((1 + Math.random()) * (width / 3))
  const y = Math.floor((1 + Math.random()) * (height / 3))
  return { x, y }
}
let l = 50 //正方形边长
let r = 9 //圆的半径
let { x, y } = getXY()
let currentX=ref(0)
//绘制图片
const drawImg = (ctx1, ctx2) => {
  const img = new Image()
  img.src = props.imgSrc
  img.onload = () => {
    ctx1.drawImage(img, 0, 0)

    ctx2.drawImage(img, 0, 0)
    // getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布
    // const ImageData=ctx2.getImageData(100,82,68,68)
    const ImageData = ctx2.getImageData(x, y - 2 * r, x + 2 * r, y + 2 * r)
    canvas2.value.width = l + 2 * r
    ctx2.putImageData(ImageData, 0, y - 2 * r)
  }
}
//绘制路径
const drawPath = (ctx, flag) => {
  //beginPath() 开始路径绘制
  //moveTo() 移动笔触到指定点
  // arc() 画弧形
  // lineTo() 画直线
  //stroke() 描边
  //fill() 填充
  //clip()裁剪

  // 开始绘制
  ctx.beginPath()

  //绘制拼图形状
  // ctx.moveTo(100,100)
  ctx.moveTo(x, y)
  // ctx.arc(125,93,9,0.72*Math.PI,2.26*Math.PI)
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * Math.PI, 2.26 * Math.PI)
  // ctx.lineTo(150,100)
  ctx.lineTo(x + l, y)
  // ctx.arc(157,125,9,1.2*Math.PI,2.8*Math.PI)
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.2 * Math.PI, 2.8 * Math.PI)
  // ctx.lineTo(150,150)
  ctx.lineTo(x + l, y + l)
  // ctx.lineTo(100,150)
  ctx.lineTo(x, y + l)
  // ctx.arc(105,125,9,0.68*Math.PI,1.3*Math.PI,true)
  ctx.arc(x + r - 2, y + l / 2, r, 0.77 * Math.PI, 1.22 * Math.PI, true)
  // ctx.lineTo(100,100)
  ctx.lineTo(x, y)
  //线宽
  ctx.lineWidth = 1
  //填充颜色
  ctx.fillStyle = 'rgba(255,255,255,1)'
  //轮廓颜色
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  //绘制
  ctx.stroke()
  //叠在原图上方
  ctx.globalCompositeOperation = 'destination-over'
  //填充 或裁剪（包括移动部分）
  if (flag) {
    ctx.clip()
  } else {
    ctx.fill()
  }
}
//是否鼠标放下
let isUp=ref(true)
let move_box=ref()
let isClick=ref(false)
const handleDown=()=>{
  isUp.value=false
  isClick.value=true
}
//刷新
const refresh=()=>{
  setTimeout(() => {
    emits('refresh',false)
  }, 200);
 
}
const handleUp=()=>{
  if(!isClick.value) return
  isUp.value=true
  isClick.value=false
  //验证
  if(Math.abs(currentX.value-x)<=1) {
    //校验通过
    emits('success',true)
  }
  //校验未通过
  else{
    move_box.value.style.backgroundColor='#F56C6C'
    // console.log(move_box.value);
    slider_left.value.style.backgroundColor='#F9E2E2'
    //刷新组件
    refresh()
  }
  
}
const handleMove=(e:MouseEvent)=>{
  e.preventDefault()
  if(isUp.value) return ;
  //获取slider的宽度
  let w1=Number(sliderWidth.value.slice(0,2))
  let left=(screenWidth-width)/2
  let x=e.clientX-left-w1/2
  if(x>width-w1/2) x=width-w1
  if(x<0) x=0  
  move_box.value.style.left=x+'px'
  canvas2.value.style.left=x+'px'

  slider_left.value.style.width=x+'px'
  slider_left.value.style.backgroundColor='#79BBFF'
  currentX.value=x
  
}
</script>

<style scoped lang="less">
.canvas-content {
  position: relative;
  margin: 0 auto;
  #canvas2 {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.slider{
  position: relative;
  margin: 20px auto;
  background-color: #eee;
  border: 1px solid #ccc;
  .slider-left{
    z-index: 1;
    position: absolute;
    height: 100%;
    background-color: pink;
  }
  .move-box{
    z-index: 10;
    position: absolute;
    cursor: pointer;
    left: 0;
    width: 70px;
    line-height: 50px;
    font-size: 25px;
    height: 100%;
    text-align: center;
    background-color: #409EFF;
    .icon{
      color: #eee;
    }
  }
}
</style>
