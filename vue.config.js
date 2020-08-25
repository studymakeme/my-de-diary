
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,

        proxy: {
            "/calen": {
                target: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv",
                changeOrigin: true,
                pathRewrite:{
                    "^/calen":"",
                }

                // 1f4e39cd1a034401850eba16610f6ad1
            },
            "/api": {
                // target: "http://pv.sohu.com/cityjson",
                target: "https://apis.map.qq.com/ws/location/v1/ip?ip=223.74.192.224&key=VYIBZ-JE2K4-YN2UN-XDPLZ-3B7WJ-YTFJJ",
                changeOrigin: true,
                pathRewrite:{
                    '^/api': '',
                }
                // https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=db86a5196f304e52a4369818c5182e60
                // https://api.heweather.net/s6/weather/forecast?location=beijing&key=1f4e39cd1a034401850eba16610f6ad1
                // 1f4e39cd1a034401850eba16610f6ad1
            },
            "/dmzj": {
                target: "http://v2.api.dmzj.com",
                changeOrigin: true,
                // 路径重写之前请求 "/dmzj/recommend.json" => http://v2.api.dmzj.com/dmzj/recommend.json
                pathRewrite: { // 路径重写
                    '^/dmzj': '', // rewrite path
                    // 路径重写之后 /api 被替换成了空字符 请求 "/dmzj/recommend.json" => http://v2.api.dmzj.com/recommend.json
                }
            }
        }
    }
}