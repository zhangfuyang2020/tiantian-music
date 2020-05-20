// vue.config.js
module.exports = {
    configureWebpack: {
        devServer: {
            proxy:{
                // 获取最新新闻
                "/music":{
                    target:"https://autumnfish.cn", 
                    changeOrigin:true,
                    pathRewrite:{"^/music":""}
                }
            }
        }
    }
}
