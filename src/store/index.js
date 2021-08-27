/**
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
import Vue from 'vue'
import Vuex from 'vuex'
import set from 'lodash/set'

Vue.use(Vuex)

const modules = {}
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key) => {
  modules[key.replace(/(modules|\/|\.|js)/g, '')] = {
    ...files(key).default,
    namespaced: true
  }
})

const store = new Vuex.Store({
  mutations: {
    setState (state, payload) {
      for (const [k, v] of Object.entries(payload)) {
        set(state, k, v)
      }
    }
  },
  modules
})
export default store
