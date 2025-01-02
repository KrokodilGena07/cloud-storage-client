import path from 'path';
import {Configuration, ProgressPlugin} from 'webpack';
import {BuildMode, BuildPaths} from './config/build/types';
import {buildWebpack} from './config/build/buildWebpack';

interface IEnvVariables {
    mode: BuildMode | null;
    port: number | null;
    analyzer: boolean | null;
}

export default (env: IEnvVariables): Configuration => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        src: path.resolve(__dirname, 'src')
    };

    return buildWebpack({
        mode: env.mode ?? 'development',
        port: env.port ?? 3000,
        paths,
        analyzer: env.analyzer ?? false,
        api: 'http://localhost:5000/api'
    });
};