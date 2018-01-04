const path = require('path')
const  ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (env) => {
    const plugins = [
        new ExtractTextPlugin("css/[name].[hash].css")
    ]

    if(env.NODE_ENV === 'production') {
        plugins.push(
            new CleanWebpackPlugin(['dist'], { root: __dirname })
        )
    }

    return{


        // ARCHIVO DE ENTRADA
        entry: {
            'index': path.resolve(__dirname, 'src/js/index.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[hash].js',
            publicPath: path.resolve(__dirname, 'dist') + "/",
            chunkFilename: 'js/[id].[chunkhash].js',
        },
        module: {
            rules: [
                // AQUI VAN LOS LOADERS
                {
                    // QUE ARCHIVO QUIERO RECONOCER
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [ 'es2015' ]
                        }
                    }
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.(jpg|png|gif|woff|eot|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 400000,
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
            new ExtractTextPlugin('css/[name].[hash].css')
        ]
    }
}