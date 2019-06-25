<template>
    <a-layout-header class="file-manager-header" :style="{ background: '#fff', padding: '0 20px 0 20px' }">
        <div>
          <a-button-group>
            <a-button icon="left" @click="BACK_HISTORY" :disabled="backStatus"></a-button>
            <a-button icon="right" @click="FORWARD_HISTORY" :disabled="forwardStatus"></a-button>
          </a-button-group>
          <a-button icon="reload"></a-button>
        </div>
        <div class="file-manager-header-right">
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
            @search="onSearch"
          />
          <a-button-group>
            <a-button icon="ordered-list" :type="mode==='list'?'primary':'default'" @click="SET_MODE('list')"></a-button>
            <a-button icon="appstore"  :type="mode==='thumb'?'primary':'default'"  @click="SET_MODE('thumb')"></a-button>
          </a-button-group>
        </div>
        
      </a-layout-header>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { Layout, Menu, Input, Icon } from 'ant-design-vue'
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Icon)
export default {
  name: 'file-manager-menu',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      mode: state => state.FileManager.mode,
      history: state => state.FileManager.history,
      historyIndex: state => state.FileManager.historyIndex
    }),
    backStatus () {
      if (this.historyIndex > 0) {
        return false
      } else {
        return true
      }
    },
    forwardStatus () {
      if (this.historyIndex < this.history.length - 1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapMutations('FileManager', ['BACK_HISTORY', 'FORWARD_HISTORY', 'SET_MODE']),
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style>

</style>
