import { BuildPaths } from './types/config'
import webpack from 'webpack'

export const buildResolvers = (paths: BuildPaths): webpack.ResolveOptions => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [paths.src, paths.nodeModules],
        mainFiles: ['index'],
        alias: {}
    }
}
