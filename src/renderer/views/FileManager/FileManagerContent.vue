<template>
    <a-layout-content class="file-manager-content">
        <!-- <file-icon type="icon-folder"></file-icon> -->
        <a-table class="file-manager-content-table"
          ref="file-manager-content-table"
          :loading="loading" 
          :columns="columns" 
          :dataSource="fileListFilter" 
          :pagination='false'
          :locale='{emptyText:"该文件夹为空"}'
          v-if="mode==='list'"
          >
          <template slot="name" slot-scope="text, record">
            <div class="table-file-name" @click="handleClick(record)"><file-icon class="table-file-icon" :type="record.extIcon"></file-icon> {{text}}</div>
          </template>

        </a-table>
        <div  v-if="mode==='thumb'">
          缩略图模式
        </div>
      </a-layout-content>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { getDirList, getStats, fileGroup, getIndex } from '@/utils/utils'
import { exec } from 'child_process'
import { Layout, Icon, Table } from 'ant-design-vue'

const os = require('os')
const path = require('path')
// const fs = require('fs-extra')
Vue.use(Layout)
Vue.use(Table)
Vue.use(Icon)

const FileIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1252560_mflmgbp6dx.js' // 在 iconfont.cn 上生成
})

const columns = [{
  title: '文件名',
  dataIndex: 'name',
  sorter: (a, b) => a.name.length - b.name.length,
  scopedSlots: { customRender: 'name' }
}, {
  title: '大小',
  width: 130,
  dataIndex: 'size',
  sorter: (a, b) => a.size - b.size
}, {
  title: '修改日期',
  width: 240,
  dataIndex: 'ctimeMs',
  sorter: (a, b) => a.ctimeMs - b.ctimeMs
}]

export default {
  name: 'file-manager-menu',
  data () {
    return {
      columns,
      fileList: [],
      loading: true
    }
  },
  computed: {
    ...mapState({
      history: state => state.FileManager.history,
      locationUrl: state => state.FileManager.locationUrl,
      mode: state => state.FileManager.mode
    }),
    // 过滤文件，分组
    fileListFilter () {
      let dir = []
      let other = []
      let fileList = [...this.fileList]
      let len = fileList.length

      if (len > 0) {
        for (let index = 0; index < len; index++) {
          if (fileList[index].isDirectory) {
            dir.push(fileList[index])
          } else {
            other.push(fileList[index])
          }

          if (index >= len - 1) {
            let fileGroupObj = fileGroup(other)
            let group = []
            for (const key in fileGroupObj) {
              group = group.concat(fileGroupObj[key])
            }
            return dir.concat(group)
          }
        }
      } else {
        return []
      }
    }
  },
  watch: {
    locationUrl: async function (val) {
      await this.getFileList(val)
    }
  },
  async created () {
    let desktop = path.resolve(os.homedir(), 'Desktop')
    this.SET_HOME(os.homedir())
    this.INCREMENT_HISTORY(desktop)
    await this.getFileList(desktop)
  },
  methods: {
    ...mapMutations('FileManager', ['SET_HOME', 'INCREMENT_HISTORY', 'SET_LOCATION']),
    async handleClick (item) {
      // 如果是文件，打开文件
      console.log(item.path)
      var self = this

      if (item.isFile) {
        exec(`${item.path}`, (err) => {
          if (err) return self.$message.error('文件不存在，或文件名称不能存在特殊符号')
        })

        return false
      }
      // 目录，获取子目录

      if (item.isDirectory) {
        try {
          // 获取索引
          let index = getIndex(this.history, this.locationUrl)
          console.log(index)
          // 增加历史记录
          this.INCREMENT_HISTORY(item.path)
          // 设置当前路径
          this.SET_LOCATION(item.path)
          return false
          // 滚动到顶部
        } catch (error) {

        }
      }
    },
    async getFileList (dirPath) {
      let self = this
      self.loading = true
      let list = await getDirList(dirPath)
      let filterName = ['$RECYCLE.BIN', 'System Volume Information', 'MSOCache', 'PerfLogs', 'Recovery', 'pagefile.sys', 'swapfile.sys', '$WINDOWS.~BT', '$Recycle.Bin', 'Windows.old', '$WINRE_BACKUP_PARTITION.MARKER']
      list = list.filter(item => {
        if (filterName.indexOf(item) === -1) {
          return item
        }
      })
      if (list.length > 0) {
        let self = this
        let len = list.length
        let all = []
        for (let index = 0; index < len; index++) {
          let current = await getStats(dirPath, list[index])
          if (current) {
            all.push(current)
          }
          if (index >= len - 1) {
            self.fileList = all
            self.loading = false
            // 回到顶部
            self.$refs['file-manager-content-table'].$el.scrollTop = 0
          }
        }
      } else {
        self.fileList = []
        self.loading = false
      }
    }
  },
  components: {
    FileIcon
  }
}
</script>

<style>

</style>
