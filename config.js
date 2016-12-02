/**
 * 文件路径
 */
module.exports = {
    Asset : {
        css :{
            'watch':'./src/scss/**',
            'src':[
                './src/scss/exports/**.scss'
            ],
            'dist' :'./dist/css'
        },
        iconfont: {
            'src':'./src/iconfont/**',
            'dist':'./dist/iconfont'
        },
        json: {
            'src':'./src/json/**',
            'dist':'./dist/json'
        },
        docs: {
            html : {
                'src':'./src/docs/**',
                'dist':'./dist/docs'
            },
            js : {

            }
        }
    },
    banner: '/*!\n' +
    ' * =====================================================\n' +
    ' * cross version 2.0\n' +
    ' * =====================================================\n' +
    ' */\n'
};