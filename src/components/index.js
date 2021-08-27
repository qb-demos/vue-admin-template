import Vue from 'vue'
import upperFirst from 'lodash/upperFirst' // 首字母大写
import camelCase from 'lodash/camelCase' // 转换为驼峰命名

const ComponentContext = require.context('./', true, /\.vue$/i, 'lazy')
ComponentContext.keys().forEach((componentFilePath) => {
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      componentFilePath
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  // 挂载到全局，不需要再单独引入
  Vue.component(componentName, () => ComponentContext(componentFilePath))
})
