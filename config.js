/**
 * 文件路径
 */
module.exports = {
    Asset : {
        crossCss :{
            'watch':'./src/scss/**',
            'src':[
                './src/scss/base/cross.scss'
            ],
            'dist' :'./dist/lib/css'
        }
    },
    banner: '/*!\n' +
    ' * =====================================================\n' +
    ' * cross version 2.0\n' +
    ' * =====================================================\n' +
    ' */\n'
};