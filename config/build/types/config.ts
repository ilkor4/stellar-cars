export type Mode = 'development' | 'production'

export interface BuildPaths {
    html: string
    entry: string
    build: string
    src: string
    nodeModules: string
}

export interface BuildOptions extends BuildEnv {
    paths: BuildPaths
    isDev: boolean
}

export interface BuildEnv {
    mode: Mode
    port: number
}
