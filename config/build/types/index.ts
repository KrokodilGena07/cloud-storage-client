export interface BuildOptions {
    mode: BuildMode;
    port: number;
    paths: BuildPaths;
    analyzer: boolean;
    api: string;
}

export interface BuildPaths {
    entry: string;
    output: string;
    html: string;
    favicon: string;
    src: string;
}

export type BuildMode = 'development' | 'production';