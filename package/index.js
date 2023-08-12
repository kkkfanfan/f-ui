import fSkeleton from "./skeleton/index";
import fButton from "./button/index";
import fIcon from './icon/index.js'
import fInput from "./input/index";
import fCarousel from "./Carousel/carousel";
import fPagination from "./pagination/index";
import fLogin from "./login/index";
import fRegister from "./register/index";
import fVerify from "./verify/index";
import fVirtualList from './virtual-list/index'
import Test from './test/index'
import fLazy from "./lazyLoading/index";
import fVirtualListPlus from "./virtual-list-plus";
import { useBase64 } from './hooks/index'

const install = (app) => {
  app.use(fSkeleton)
  app.use(fButton)
  app.use(fIcon)
  app.use(fInput)
  app.use(fCarousel)
  app.use(fPagination)
  app.use(fLogin)
  app.use(fRegister)
  app.use(fVerify)
  app.use(fVirtualList)
  app.use(Test)
  app.use(fLazy)
  app.use(fVirtualListPlus)
}
export {
  fSkeleton, useBase64, fButton, fIcon, fInput, fCarousel, fPagination, fLogin
  , fRegister, fVerify, fVirtualList, fLazy, fVirtualListPlus
}

export default {
  install
}