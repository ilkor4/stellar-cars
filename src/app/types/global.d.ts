declare module '*.scss'{
    type IClassNames = Record<string, string>

    const classNames: IClassNames
    export = classNames
}

declare module '*.png' {
    const value: string
    export default value
}
declare module '*.jpg' {
    const value: string
    export default value
}
declare module '*.jpeg' {
    const value: string
    export default value
}

declare module '*.woff';
declare module '*.woff2';
declare module '*.mp4';
declare module '*.svg' ;
