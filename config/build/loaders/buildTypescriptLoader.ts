import webpack from 'webpack'

export const buildTypescriptLoader = (): webpack.RuleSetRule => {
    return {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }
}
