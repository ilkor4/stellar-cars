import webpack from 'webpack'

export const buildFileLoader = (): webpack.RuleSetRule => {
    return {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/[name][ext]'
        }
    }
}
