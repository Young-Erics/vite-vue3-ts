// 单独的postcss配置文件
module.exports = {
  plugins: {
    // 允许你使用未来的CSS特性
    'postcss-preset-env': {
      stage: 2,
      browsers: 'last 2 versions'
    }
  }
}
