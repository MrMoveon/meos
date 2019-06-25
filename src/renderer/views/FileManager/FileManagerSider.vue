<template>
  <a-layout-sider class="file-manager-sider" theme="light">
    <a-menu mode="inline" v-model="current" :openKeys="openKeys" style="width: 100%;height:100%">
      <a-menu-item disabled key="quick">
        <a-icon type="xx"/>快速访问
      </a-menu-item>
      <a-menu-item
        class="file-manager-menu-item"
        v-for="item in QuickDir"
        :key="item.key"
        @click="handleDirClick"
      >
        <a-icon :type="item.icon"/>
        {{item.text}}
      </a-menu-item>

      <a-menu-item disabled key="my-computed">
        <a-icon type="xx"/>我的电脑
      </a-menu-item>
      <a-menu-item class="file-manager-menu-item" @click="handleDiskClick" :key="item.en" v-for="item in disk">
        <a-icon type="instagram"/>
        本地磁盘({{item.en}})
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Menu, Icon } from 'ant-design-vue'
// import { exec } from 'child_process'
const path = require('path')
// const fs = require('fs')
Vue.use(Menu)
Vue.use(Icon)
export default {
  name: 'file-manager-sider',
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2'],
      openKeys: ['sub1', 'sub2'],
      current: ['desktop'],
      QuickDir: [
        { key: 'Desktop', icon: 'desktop', text: '桌面' },
        { key: 'Downloads', icon: 'download', text: '下载' },
        { key: 'Documents', icon: 'file-text', text: '文档' },
        { key: 'Pictures', icon: 'picture', text: '图片' }
      ]
    }
  },
  created () {
    this.getDisk()
  },
  computed: {
    ...mapState({
      home: state => state.FileManager.home,
      disk: state => state.FileManager.disk,
      locationUrl: state => state.FileManager.locationUrl
    })
  },
  methods: {
    ...mapMutations('FileManager', ['INCREMENT_HISTORY', 'SET_LOCATION']),
    ...mapActions('FileManager', ['getDisk']),
    handleDirClick ({ key }) {
      let url = path.resolve(this.home, key)
      this.setHistoryLocation(url)
    },
    handleDiskClick ({key}) {
      let url = path.join(key, '/')
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

<style>
</style>
