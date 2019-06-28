import Vue from 'vue'
import Router from 'vue-router'
import FileManager from '@/views/FileManager/FileManager'
import DesktopContent from '@/views/Desktop/DesktopContent'
import DesktopTop from '@/views/Desktop/DesktopTop'
import DesktopTips from '@/views/Desktop/DesktopTips'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/file-manager',
      name: 'file-manager',
      component: FileManager
    },
    {
      path: '/',
      name: 'desktop-content',
      component: DesktopContent
    },
    {
      path: '/desktop-top',
      name: 'desktop-top',
      component: DesktopTop
    },
    {
      path: '/desktop-tips',
      name: 'desktop-tips',
      component: DesktopTips
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
