<template>
  <div class="file-manager-breadcrumb">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item>
        <a-icon type="desktop"/> 我的电脑
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="item.text">
        <span :class="{'hasLink':index!==breadcrumbList.length-1}" @click="handleBreadcrumbClick(item.href)">{{item.text}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="file-manager-breadcrumb-right">
      <a-button type="primary" ghost>
        新增文件
        <a-icon type="plus"/>
      </a-button>
      <a-dropdown placement="bottomRight">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="bold"/>大小
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="clock-circle"/>修改日期
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="clock-circle"/>创建日期
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          排序
          <a-icon type="sort-ascending"/>
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { Button, Menu, Icon, Breadcrumb, Dropdown } from 'ant-design-vue'
const path = require('path')
Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Dropdown)

export default {
  name: 'file-manager-breadcrumb',
  data () {
    return {

    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      locationUrl: state => state.FileManager.locationUrl
    }),
    breadcrumbList () {
      var self = this
      var list = this.locationUrl.split('\\')
      var breadcrumbList = []
      if (list.length > 0 && list[0]) {
        list.forEach((item, index) => {
          let prefix = ''
          let href = ''
          if (index === 0) {
            prefix = path.join(item, '/')
            href = path.join(prefix, '/')
          } else {
            prefix = self.locationUrl.split(item)[0]
            href = path.join(prefix, item)
          }

          if (item !== '') {
            breadcrumbList.push({
              text: item,
              href: href
            })
          }
        })
      }
      return breadcrumbList
    }
  },
  methods: {
    ...mapMutations('FileManager', ['INCREMENT_HISTORY', 'SET_LOCATION']),
    handleMenuClick () {

    },
    handleBreadcrumbClick (href) {
      let url = path.join(href, '/')
      this.setHistoryLocation(url)
    },

    setHistoryLocation (url) {
      if (url === this.locationUrl) {
        return
      }
      // 增加历史记录
      this.INCREMENT_HISTORY(url)
      // 设置当前路径
      this.SET_LOCATION(url)
    }
  }
}
</script>
