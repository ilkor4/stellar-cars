import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

export const buildCssLoaders = (isDev: boolean): webpack.RuleSetRule => {
    return (
        {
            test: /\.s[ac]ss$/i,
            use: [
                isDev
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        esModule: false,
                        modules: {
                            auto: (resPath: string) => Boolean(
                                resPath.includes('.module.')
                            ),
                            localIdentName: isDev
                                ? '[path][name]__[local]'
                                : '[hash:base64:8]',
                            exportLocalsConvention: 'camelCase'
                        }
                    }
                },
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            'src/app/styles/variables/global.scss',
                            'src/app/styles/variables/mixins.scss'
                        ]
                    }
                }
            ]
        }
    )
}
