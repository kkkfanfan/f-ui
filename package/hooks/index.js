
import { onMounted } from 'vue'
//Base64
export function useBase64(option) {
  return new Promise((resolve) => {
    onMounted(() => {
      const img = document.querySelector(option)
      img.onload = () => {
        resolve({
          url: base64(img)
        })
      }
    })
    const base64 = (element) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = element.width
      canvas.height = element.height
      ctx.drawImage(element, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/png')
    }
  })
}

//防抖
export function debounce(fn, delay = 200) {
  if (!(fn instanceof Function)) throw new Error('参数需要是函数')
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this)
    }, delay)
  }
}
//节流
export function throttle(fn, delay = 200) {
  if (!(fn instanceof Function)) throw new Error('参数需要是函数')
  let flag = true
  return function () {
    if (!flag) return
    flag = false
    fn.apply(this)
    setTimeout(() => {
      flag = true
    }, delay);
  }
}
