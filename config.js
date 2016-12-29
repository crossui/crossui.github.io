/**
 * 文件路径
 */



module.exports = {
    Asset: {
        css: {
            'watch': './src/scss/**',
            'src': [
                './src/scss/exports/**.scss'
            ],
            'dist': './dist/css'
        },
        iconfont: {
            'src': './src/iconfont/**',
            'dist': './dist/iconfont'
        },
        json: {
            'src': './src/json/**',
            'dist': './dist/json'
        },
        docs: {
            html: {
                'src':'./src/docs/**',
                'dist':'./dist/docs'
            },
            js : {

            }
        },
        js: {
            docs: {
                'src':'./src/js/docs/**',
                'dist':'./dist/js'
            },
            libs: {
                'src':'./src/js/libs/**',
                'dist':'./dist/js'
            },
            cross: {
                'src':'./src/js/cross/**',
                'dist':'./dist/js'
            }
        },
        widget:{
            'src':'./src/widget/**/*.js',
            'dist':'./dist/js/'
        }
    },
    opts: {
        base64: {
            baseDir: './src/images',
            extensions: ['png','gif','jpg'],
            maxImageSize: 200 * 1024,
            debug: true
        },
        htmlmin: {
            removeComments:true,                            //清除HTML注释
            collapseWhitespace:false,                        //压缩HTML
            collapseBooleanAttributes:false,                //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes:false,                    //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes:false,               //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes:false,            //删除<style>和<link>的type="text/css"
            minifyJS:false,                                  //压缩页面JS
            minifyCSS:false                                  //压缩页面CSS
        }
    },
    banner: '/*!\n' +
    ' * =====================================================\n' +
    ' * cross version 2.0\n' +
    ' * =====================================================\n' +
    ' */\n'
};