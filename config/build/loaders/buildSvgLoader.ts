import webpack from 'webpack'

export const buildSvgLoader = (): webpack.RuleSetRule => {
    return {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
    }
}
