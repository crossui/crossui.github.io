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
        }
    },
    opts: {
        base64: {
            baseDir: './src/images',
            extensions: ['png','gif','jpg'],
            maxImageSize: 20 * 1024,
            debug: true
        }
    },
    banner: '/*!\n' +
    ' * =====================================================\n' +
    ' * cross version 2.0\n' +
    ' * =====================================================\n' +
    ' */\n'
};