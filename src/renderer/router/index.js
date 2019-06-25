import Vue from 'vue'
import Router from 'vue-router'
import FileManager from '@/views/FileManager/FileManager'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'file-manager',
      component: FileManager
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
