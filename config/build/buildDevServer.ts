import { Configuration } from 'webpack-dev-server'

export const buildDevServer = (port: number): Configuration => {
    return {
        port,
        open: true,
        historyApiFallback: true,
        hot: true
    }
}
