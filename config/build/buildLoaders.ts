import {BuildOptions} from './types';
import {ModuleOptions} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders({mode}: BuildOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development';

    const svgrLoader = {
        test: /\.svg$/i,
        loader: '@svgr/webpack',
        options: {
            icon: true,
            svgoConfig: {
                plugins: [
                    {
                        name: 'convertColors',
                        params: {
                            currentColor: true
                        }
                    }
                ]
            }
        }
    };

    const assetLoader = {
        type: 'asset/resource',
        test: /\.(png|jpg|jpeg|gif)$/i
    };

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]-[local]' : '[contenthash:base64:8]'
            }
        }
    };

    const cssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules
        ]
    };

    const tsLoader = {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            transpileOnly: true
        }
    };

    return [
        svgrLoader,
        assetLoader,
        cssLoader,
        tsLoader
    ];
}