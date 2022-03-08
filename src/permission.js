import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const hasUserInfo = store.getters.user;

  if(to.meta.auth){
    //鉴权
    if(hasUserInfo){
      next();
    }else{
      // 没有用户信息，是否有token
      const hasToken = localStorage.getItem("adminToken");
      if(hasToken){
        try{
          await store.dispatch("user/getInfo");
          next();
        }catch(error){
          await store.dispatch("user/resetToken");
          Message.error('登录过期,请重新登录')
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }else{
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }else{
    // 不需要鉴权
    if(to.path === "/login" && hasUserInfo){
      next("/")
    }else{
      next()
    }
    NProgress.done();
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
