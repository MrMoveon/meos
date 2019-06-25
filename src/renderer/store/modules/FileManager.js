import * as utils from '@/utils/utils'
const state = {
  home: '', // 主页路径
  history: [], // 历史纪录
  historyIndex: -1, // 当前索引
  locationUrl: '', // 当前路径
  disk: [], // 磁盘
  mode: 'list'
}

const mutations = {
  SET_HOME (state, payload) {
    state.home = payload
  },
  SET_DISK (state, payload) {
    state.disk = payload
  },
  INCREMENT_HISTORY (state, payload) {
    state.history.push(payload)
    state.historyIndex = state.historyIndex + 1
  },
  BACK_HISTORY (state, payload) {
    let historyIndex = state.historyIndex === 0 ? 0 : state.historyIndex - 1
    state.historyIndex = historyIndex
    state.locationUrl = state.history[historyIndex]
  },
  FORWARD_HISTORY (state, payload) {
    let index = state.historyIndex
    if (index < state.history.length - 1) {
      state.locationUrl = state.history[index + 1]
      state.historyIndex = index + 1
    }
  },
  CLEAR_HISTORY (state) {
    state.history = []
  },
  SET_LOCATION (state, payload) {
    state.locationUrl = payload
  },
  SET_MODE (state, payload) {
    state.mode = payload
  }

}

const actions = {
  getDisk ({ commit }) {
    utils.getDisk().then((data) => {
      commit('SET_DISK', data)
    }).then(err => {
      console.log(err)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
