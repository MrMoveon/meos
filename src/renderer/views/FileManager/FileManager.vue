<template>
  <a-layout class="file-manager">
    <file-manager-sider></file-manager-sider>
    <a-layout>
      <file-manager-header></file-manager-header>
      <file-manager-breadcrumb></file-manager-breadcrumb>
      <file-manager-content></file-manager-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Vue from 'vue'
import { Layout } from 'ant-design-vue'
import FileManagerSider from './FileManagerSider'
import FileManagerHeader from './FileManagerHeader'
import FileManagerBreadcrumb from './FileManagerBreadcrumb'
import FileManagerContent from './FileManagerContent'

Vue.use(Layout)
export default {
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {

  },
  components: {
    FileManagerSider,
    FileManagerHeader,
    FileManagerBreadcrumb,
    FileManagerContent
  }

}
</script>

<style lang='less'>
.file-manager {
  height: 100%;
  // 侧边栏
  &-sider{
    height: 100%;
    overflow-y:auto ;
    
  }
  &-menu-item{
      font-weight: bold;
      color:#545454;
  }
  // 头部
  &-header{
    display: flex;
    justify-content: space-between;
    &-rihgt{

    }
  }
  // 面包屑
  &-breadcrumb{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:#fff;
    height: 60px;
    padding: 0 20px;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 5px 10px rgba(230,230,230,0.3);
    z-index: 2;
    .hasLink{
      cursor: pointer;
    }
  }
  // content
  &-content{
    background: #fff;
    height: 100%;
    .ant-table-thead > tr > th{
      background: #fff;
    }
    &-table{
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      .table-file-name{
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      .table-file-icon{
        font-size: 30px;
        margin-right: 10px;
        
      }
    }
  }
}
</style>
