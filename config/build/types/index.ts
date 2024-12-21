export interface BuildOptions {
    mode: BuildMode;
    port: number;
    paths: BuildPaths;
    analyzer: boolean;
}

export interface BuildPaths {
    entry: string;
    output: string;
    html: string;
    favicon: string;
    src: string;
}

export type BuildMode = 'development' | 'production';