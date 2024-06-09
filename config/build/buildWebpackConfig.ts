import { BuildOptions } from './types/config'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { buildPlugins } from './buildPlugins'
import { buildDevServer } from './buildDevServer'
import webpack from 'webpack'

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
    const {
        paths,
        mode,
        isDev,
        port
    } = options

    return {
        mode,
        entry: paths.entry,
        resolve: buildResolvers(paths),
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(isDev)
        },
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/'
        },
        devServer: isDev ? buildDevServer(port) : undefined,
        devtool: isDev ? 'inline-source-map' : undefined
    }
}
