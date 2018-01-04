const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    // ARCHIVO DE ENTRADA
    entry: {
        'index': path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer:{
        port: 9000,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // AQUI VAN LOS LOADERS
            {
                // QUE ARCHIVO QUIERO RECONOCER
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ['es2015']
                    }
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(jpg|png|gif|woff|eot|svg|pdf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000000,
                        fallback: 'file-loader',
                        name: 'images/[name].[hash].[ext]'
                    }
                }
            },
            {
                // QUE ARCHIVO QUIERO RECONOCER
                test: /\.css$/,
                // QUE LOADER SE VA A ENCARGAR DEL ARCHIVO
                use: ExtractTextPlugin.extract({
                    //['style-loader', 'css-loader']
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
                // QUE ARCHIVO QUIERO RECONOCER
                test: /\.styl$/,
                // QUE LOADER SE VA A ENCARGAR DEL ARCHIVO
                use: ExtractTextPlugin.extract({
                    //['style-loader', 'css-loader']
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'stylus-loader',
                            options: {
                                use: [
                                    require('nib'),
                                    require('rupture')
                                ],
                                import: [
                                    '~nib/lib/nib/index.styl',
                                    '~rupture/rupture/index.styl',

                                ]
                            }
                        }
                    ]
                }),
            }
        ]
    },
    plugins: [
        // SE COLOCAN LOS PLUGIN PARA TAREAS ADICIONALES,
        // COMO GUARDAR LOS STYLES EN UN ARCHIVO APARTE
        new ExtractTextPlugin('css/[name].css')
    ]
}