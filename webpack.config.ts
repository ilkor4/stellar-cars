import webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { BuildEnv, Mode } from './config/build/types/config'
import * as path from 'path'

const paths = {
    src: path.resolve(__dirname, 'src'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'dist'),
    nodeModules: path.resolve(__dirname, 'node_modules')
}

export default (env: BuildEnv): webpack.Configuration => {
    const mode: Mode = env.mode ?? 'development'
    const isDev = mode === 'development'
    const PORT = env.port ?? 3000

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT
    })
}
