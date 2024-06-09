import { buildCssLoaders } from './loaders/buildCssLoaders'
import { buildFileLoader } from './loaders/buildFileLoader'
import { buildTypescriptLoader } from './loaders/buildTypescriptLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import webpack from 'webpack'

export const buildLoaders = (isDev: boolean): webpack.RuleSetRule[] => {
    const svgLoader = buildSvgLoader()
    const typescriptLoader = buildTypescriptLoader()
    const fileLoader = buildFileLoader()
    const cssLoader = buildCssLoaders(isDev)

    return [
        svgLoader,
        cssLoader,
        fileLoader,
        typescriptLoader
    ]
}
