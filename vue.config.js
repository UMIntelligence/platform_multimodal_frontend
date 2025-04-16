module.exports = {
  devServer: {
    proxy: {
      ws: false
    },
    open: true,
    historyApiFallback: {
        index: '/index.html' 
        //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    }
  }
}